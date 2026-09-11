import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { apply } from './pat1.mjs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Verse un lot de la passe des professions de 1881 division 1.

   CE QUE C'EST. La colonne 14 n'avait jamais été dans le cadre des rendus de la
   relecture (voir `prof1.py`). Cette passe-ci n'est donc pas une vérification
   mais une **lecture** : les 1 522 cases vides du fichier n'ont pas plus été
   regardées que les 667 remplies, et une profession que le dépouillement a
   manquée est une perte au même titre qu'une profession mal lue.

   LE LOT. Un fichier par lot de pages, dans `lots81/`, qui porte pour chaque
   page la lecture de la colonne 14 et, quand elle a été lue en même temps,
   celle de la colonne 15 :

     { "pages": {
         "1": { "prof": { "1": "Cultivateur", "13": "Domestique" },
                "etat": "MM-------------MM-----MM-",
                "vider": [7],
                "inc":   [13],
                "notes": { "13": "le mot se lit …" } } } }

   `prof` ne porte que les cases écrites ; toutes les autres sont réputées vides
   au manuscrit. C'EST LE POINT IMPORTANT : l'outil **refuse de s'exécuter** si
   le fichier porte une profession sur une ligne que le lot laisse vide sans la
   nommer dans `vider`. Une suppression est une décision, elle s'écrit ; et cette
   garde est ce qui empêche une page lue à moitié de passer pour une page lue.

   `etat` est la colonne 15 rangée par rangée — `M`, `V`, `-` pour une case vide,
   `.` pour « pas lue ». Une page sans `etat` ne touche pas à l'état matrimonial.

     node prof1.mjs lots81/d1-001-006.json [--essai]
*/
const ESSAI = process.argv.includes('--essai');
const LOTS = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!LOTS.length) { console.error('usage : node prof1.mjs lots81/d1-001-006.json [--essai]'); process.exit(1); }

const FILE = RACINE + '/data/recensement-1881-d1-data.js';
const brut = fs.readFileSync(FILE, 'utf8');
const D = JSON.parse(brut.slice(brut.indexOf('{'), brut.lastIndexOf('}') + 1));
const actuel = new Map();
for (const m of D.maisons) for (const f of m.familles) for (const p of f.membres)
  actuel.set(`${p.page_ms}:${p.ligne}`, p);

const lignesDe = (page) => [...actuel.keys()]
  .filter((k) => k.split(':')[0] === String(page))
  .map((k) => Number(k.split(':')[1])).sort((a, b) => a - b);

const plan = [];   // { page, ligne, champs, inc, note }
let lu = 0, pagesLues = 0;

for (const chemin of LOTS) {
  const lot = JSON.parse(fs.readFileSync(chemin, 'utf8'));
  for (const [page, p] of Object.entries(lot.pages)) {
    const lignes = lignesDe(page);
    if (!lignes.length) throw new Error(`page ${page} absente du recensement`);
    pagesLues++;
    const prof = p.prof || {};
    const vider = new Set((p.vider || []).map(Number));
    const inc = new Set((p.inc || []).map(Number));
    const notes = p.notes || {};
    const etat = p.etat || '';
    if (etat && etat.length !== lignes.length)
      throw new Error(`page ${page} : « etat » porte ${etat.length} rangées, la page en compte ${lignes.length}`);

    for (const l of lignes) {
      lu++;
      const pers = actuel.get(`${page}:${l}`);
      const champs = {};
      const veut = Object.prototype.hasOwnProperty.call(prof, String(l)) ? String(prof[l]).trim() : '';
      const a = String(pers.profession || '').trim();
      if (veut !== a) {
        // Une case que le lot laisse vide alors que le fichier porte un métier :
        // c'est une suppression, et elle doit avoir été décidée, pas subie.
        if (!veut && !vider.has(l))
          throw new Error(`p${page}:${l} — le fichier porte « ${a} » et le lot ne dit rien. `
            + `Nommer la ligne dans « vider » si le manuscrit ne porte rien, sinon la lire.`);
        champs.profession = veut;
      }
      if (etat) {
        const c = etat[lignes.indexOf(l)];
        if (c !== '.') {
          const veutE = c === '-' ? '' : c;
          if (veutE !== String(pers.etat_matrimonial || '').trim()) champs.etat_matrimonial = veutE;
        }
      }
      const note = notes[String(l)];
      if (!Object.keys(champs).length && !note && !inc.has(l)) continue;
      plan.push({ page, ligne: l, champs, inc: inc.has(l), note, avant: { profession: a, etat_matrimonial: pers.etat_matrimonial || '' } });
    }
  }
}

console.log(`${pagesLues} page(s), ${lu} rangée(s) lue(s) — ${plan.length} ligne(s) à écrire`);
for (const e of plan) {
  const d = Object.entries(e.champs).map(([k, v]) => `${k} : « ${e.avant[k]} » → « ${v} »`).join(' ; ');
  console.log(`  p${e.page}:${e.ligne}  ${d || '(remarque seule)'}${e.note ? '  — ' + e.note : ''}`);
}
if (ESSAI) { console.log('\n--essai : rien n\'a été écrit.'); process.exit(0); }
if (!plan.length) process.exit(0);

apply(({ set, R }) => {
  for (const e of plan) {
    const o = {};
    if (e.inc) o.inc = true;
    if (e.note) o.rem = R(e.note);
    set(Number(e.page), [e.ligne], e.champs, o);
  }
});
