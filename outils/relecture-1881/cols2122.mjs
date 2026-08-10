import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { apply } from './pat91.mjs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Applique une relecture des colonnes 21 et 22 (« Sait lire » / « Sait écrire »)
   de 1891 division 1.

   Le fichier de lectures est un JSON : à chaque page du manuscrit, deux chaînes
   de 25 caractères — « 1 » quand la case porte un un, « - » quand elle porte un
   tiret :

     { "46": { "lire": "1-1--...", "ecrire": "1----..." } }

   Seules les lignes où le fichier et le manuscrit divergent sont touchées : une
   ligne conforme est laissée telle quelle, sans drapeau ni remarque. Le fichier
   laisse le champ absent là où le manuscrit porte un tiret — cette absence vaut
   « ne sait pas », et n'est donc pas un écart.

     node cols2122.mjs lectures.json [--essai]
*/
const FICHIER = process.argv[2];
const ESSAI = process.argv.includes('--essai');
if (!FICHIER) { console.error('usage : node cols2122.mjs lectures.json [--essai]'); process.exit(1); }
const lectures = JSON.parse(fs.readFileSync(FICHIER, 'utf8'));

const raw = fs.readFileSync(RACINE + '/data/recensement-1891-d1-data.js', 'utf8');
const D = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
const idx = new Map();
for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || [])
  idx.set(p.page_ms + ':' + p.ligne, p);

const SRC = 'relecture_pdf_cols_21_22';
const ecarts = [];
let lignes = 0;
for (const [page, { lire, ecrire }] of Object.entries(lectures)) {
  if (lire.length !== 25 || ecrire.length !== 25)
    throw new Error(`page ${page} : il faut 25 caractères par colonne, reçu ${lire.length}/${ecrire.length}`);
  for (let i = 0; i < 25; i++) {
    const l = String(i + 1), p = idx.get(page + ':' + l);
    if (!p) continue;                       // la page 142 s'arrête à la ligne 23
    lignes++;
    const vl = lire[i] === '1', ve = ecrire[i] === '1';
    const al = p.sait_lire === true, ae = p.sait_ecrire === true;
    if (vl === al && ve === ae) continue;
    ecarts.push({ page, ligne: l, nom: `${p.nom} ${p.prenom}`, age: p.age,
      avant: (p.sait_lire === undefined ? '.' : al ? '1' : '0') + (p.sait_ecrire === undefined ? '.' : ae ? '1' : '0'),
      apres: (vl ? '1' : '0') + (ve ? '1' : '0'), vl, ve });
  }
}

console.log(`${lignes} lignes relues, ${ecarts.length} écarts`);
for (const e of ecarts)
  console.log(`  p${e.page}:${String(e.ligne).padStart(2)} ${(e.nom + ' (' + e.age + ')').padEnd(34)} ${e.avant} -> ${e.apres}`);
if (ESSAI || !ecarts.length) process.exit(0);

const mot = v => v ? 'un « 1 »' : 'un tiret';
apply(({ set, R }) => {
  for (const e of ecarts)
    set(e.page, [e.ligne], { sait_lire: e.vl, sait_ecrire: e.ve, alphabetisation_source: SRC },
      { inc: true, rem: R(`colonnes 21 et 22 relues sur le recueil PDF : la colonne 21 porte ${mot(e.vl)}, la colonne 22 ${mot(e.ve)}. Le dépouillement portait « ${e.avant} » (1 = sait, 0 = ne sait pas, . = champ absent).`) });
});
