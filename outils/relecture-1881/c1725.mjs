/* Verse un lot de lecture des colonnes 17 à 20 de 1891 division 1.

   **Ce que disent vraiment ces colonnes.** Le formulaire de 1891 porte :

     17  Patron (Employer)
     18  Employé à gages (Wage earner)
     19  Sans emploi la semaine précédant le recensement
     20  Le patron dit le nombre moyen d'employés dans l'année

   Les colonnes 17, 18 et 19 se cochent ; la 20 porte un nombre. Le fichier
   portait, sur les pages 89 à 142, deux champs `mois_metier` et
   `mois_manufacture` qui prêtaient à la 19 et à la 20 un sens de durée que le
   formulaire ne leur donne pas — et `mois_metier` valait 1 sur ses 92 lignes,
   ce qui n'est pas une durée mais une coche. Ces deux champs sont retirés au
   profit de `chomage` et `nb_employes`, qui sont ceux de l'atelier.

   **Format d'un lot** — une entrée par page, trois chaînes d'autant de
   caractères que la page a de lignes (« 1 » coche, « - » tiret ou case vide),
   et pour la colonne 20 une table ligne → nombre :

     { "110": { "c17": "----…", "c18": "-1-1…", "c19": "-1-1…",
                "c20": { "3": "25" }, "notes": { "3": "…" } } }

   Passer `--essai` montre le relevé sans écrire.

   **Le piège à ne pas redécouvrir.** Le commis d'Ottawa a porté son code de
   métier dans la colonne 17, d'une plume grasse, et il l'écrit *au-dessus* de
   sa ligne — souvent plus près de la ligne précédente. Ce n'est pas une marque
   de patron. Un vrai « patron » est une coche fine, de la main du recenseur,
   pareille à celles des colonnes 18 et 21.
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { apply } from './pat91.mjs';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const essai = args.includes('--essai');
const fichier = args.find((a) => !a.startsWith('--'));
if (!fichier) { console.error('usage : node c1725.mjs lot.json [--essai]'); process.exit(1); }
const lot = JSON.parse(fs.readFileSync(fichier, 'utf8'));

const brut = fs.readFileSync(RACINE + '/data/recensement-1891-d1-data.js', 'utf8');
const D = JSON.parse(brut.slice(brut.indexOf('{'), brut.lastIndexOf('}') + 1));
const parPage = new Map();
for (const m of D.maisons) for (const f of m.familles) for (const p of f.membres) {
  if (!parPage.has(p.page_ms)) parPage.set(p.page_ms, []);
  parPage.get(p.page_ms).push(p);
}
for (const v of parPage.values()) v.sort((a, b) => +a.ligne - +b.ligne);

const coche = (s, i) => s[i] === '1';
const ecrits = [];   // { page, ligne, champ, avant, apres }
const plan = [];     // { page, ligne, champs, note }

for (const [page, l] of Object.entries(lot)) {
  const gens = parPage.get(page);
  if (!gens) throw new Error(`page ${page} absente du fichier`);
  for (const c of ['c17', 'c18', 'c19']) {
    if (typeof l[c] !== 'string') throw new Error(`page ${page} : ${c} manquant`);
    if (l[c].length !== gens.length)
      throw new Error(`page ${page} : ${c} fait ${l[c].length} caractères pour ${gens.length} lignes`);
    if (/[^1-]/.test(l[c])) throw new Error(`page ${page} : ${c} porte autre chose que « 1 » et « - »`);
  }
  const c20 = l.c20 || {};
  for (const k of Object.keys(c20))
    if (!gens.some((p) => String(p.ligne) === String(k)))
      throw new Error(`page ${page} : la colonne 20 vise la ligne ${k}, qui n'existe pas`);

  gens.forEach((p, i) => {
    const lu = {
      patron: coche(l.c17, i) || undefined,
      employe: coche(l.c18, i) || undefined,
      chomage: coche(l.c19, i) || undefined,
      nb_employes: c20[String(p.ligne)] !== undefined ? String(c20[String(p.ligne)]) : undefined,
    };
    const champs = {};
    for (const [k, v] of Object.entries(lu)) {
      const avant = p[k];
      if (JSON.stringify(avant) !== JSON.stringify(v)) {
        champs[k] = v;
        ecrits.push({ page, ligne: p.ligne, champ: k, avant, apres: v, nom: `${p.nom} ${p.prenom}` });
      }
    }
    // Les deux champs retirés : ils disaient la 19 et la 20 sous un nom faux.
    for (const k of ['mois_metier', 'mois_manufacture']) if (p[k] !== undefined) {
      champs[k] = undefined;
      ecrits.push({ page, ligne: p.ligne, champ: k, avant: p[k], apres: undefined, nom: `${p.nom} ${p.prenom}`, retrait: true });
    }
    champs.cols_17_25_verifiees = true;
    if (Object.keys(champs).length > 1 || p.cols_17_25_verifiees !== true)
      plan.push({ page, ligne: p.ligne, champs, note: (l.notes || {})[String(p.ligne)] });
  });
}

const vrais = ecrits.filter((e) => !e.retrait);
console.log(`${Object.keys(lot).length} page(s) — ${vrais.length} écart(s) avec le fichier, `
  + `${ecrits.length - vrais.length} champ(s) périmé(s) retiré(s).`);
const dit = (v) => v === undefined ? '·' : JSON.stringify(v);
for (const e of vrais)
  console.log(`  p${e.page} L${String(e.ligne).padStart(2)} ${e.nom.padEnd(26).slice(0, 26)} ${e.champ.padEnd(12)} ${dit(e.avant)} → ${dit(e.apres)}`);

if (essai) { console.log('\n(essai : rien n\'a été écrit)'); process.exit(0); }

apply(({ set, R }) => {
  for (const t of plan) {
    let note = t.note;
    const p = parPage.get(t.page).find((x) => String(x.ligne) === String(t.ligne));
    if (note && String(p.remarque || '').includes(note)) note = undefined;
    set(t.page, [t.ligne], t.champs, note ? { rem: R(note) } : {});
  }
});
