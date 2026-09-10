import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { filtrer } from './atelier.mjs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Ossature d'édition des fichiers de 1871, sur le modèle de pat1.mjs et
   pat91.mjs. Deux différences tiennent au formulaire de 1871 :

   — **20 lignes par page**, non 25 ;
   — les colonnes 10 à 13 et 15 à 22 sont *présentes mais incomplètes* dans la
     division 1, là où elles étaient absentes de 1881. On les écrit donc dans le
     recensement lui-même, comme le fait déjà la division 2, plutôt que dans un
     fichier de complément séparé.

   Règle intangible, comme partout : **une correction faite à la main dans
   l'atelier l'emporte.** Un champ que Patrick a corrigé n'est jamais réécrit,
   et la ligne qui en porte une est tenue pour tranchée — elle perd son drapeau
   `incertain` et les remarques empilées par les relectures précédentes.

     import { apply } from './pat71.mjs';
     apply(1, ({ set, R }) => {
       set(40, [2], { nom: 'Milaire' }, { inc: true, rem: R('le patronyme se lit…') });
       set(40, [1, 2, 3], { lieu_naissance: 'Québec' });        // sans drapeau
     });
*/
export function apply(division, fn, { essai = false } = {}) {
  const FILE = `${RACINE}/data/recensement-1871-d${division}-data.js`;
  const raw = fs.readFileSync(FILE, 'utf8');
  const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
  const D = JSON.parse(raw.slice(a, b + 1));
  const idx = new Map();
  for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || [])
    idx.set(`${p.page_ms}:${p.ligne}`, { m, f, p });

  let lignes = 0, champs = 0;
  const refuses = [];
  const R = (o) => `Relecture du manuscrit : ${o}`;

  const set = (page, numeros, valeurs, o = {}) => {
    for (const l of numeros) {
      const r = idx.get(`${page}:${l}`);
      if (!r) throw new Error(`ligne absente ${page}:${l} (division ${division})`);
      const { retenus, refuses: laisses, tranchee } = filtrer(r.p, valeurs, `p${page}:${l}`);
      refuses.push(...laisses);
      // N'écrire que ce qui change réellement : une valeur déjà juste ne doit
      // ni compter comme une correction ni faire poser un drapeau.
      const neufs = Object.fromEntries(
        Object.entries(retenus).filter(([k, v]) => JSON.stringify(r.p[k]) !== JSON.stringify(v)));
      if (!Object.keys(neufs).length && !o.rem) continue;
      Object.assign(r.p, neufs);
      champs += Object.keys(neufs).length;
      if (!tranchee) {
        if (o.inc !== undefined) r.p.incertain = o.inc;
        if (o.rem) r.p.remarque = r.p.remarque ? `${r.p.remarque} ${o.rem}` : o.rem;
      }
      // Le chef de famille est du texte libre : le tenir d'accord avec la
      // première personne quand on lui corrige son nom.
      if ((neufs.nom || neufs.prenom) && r.f.membres[0] === r.p && r.f.chef)
        r.f.chef = `${r.p.nom} ${r.p.prenom}`.trim();
      lignes++;
    }
  };

  /** Les numéros de ligne réellement présents sur une page, de 1 à 20. */
  const lignesDe = (page) => {
    const n = [];
    for (let l = 1; l <= 20; l++) if (idx.get(`${page}:${l}`)) n.push(l);
    return n;
  };

  fn({ set, R, lignesDe, idx });

  if (!essai) fs.writeFileSync(FILE, raw.slice(0, a) + JSON.stringify(D) + raw.slice(b + 1));
  console.log(`${champs} champ(s) écrit(s) sur ${lignes} ligne(s)${essai ? ' — essai, rien écrit' : ''}`);
  if (refuses.length) {
    console.log(`\n${refuses.length} champ(s) laissé(s) à la main de Patrick :`);
    for (const m of refuses) console.log('  ' + m);
  }
  return { champs, lignes };
}
