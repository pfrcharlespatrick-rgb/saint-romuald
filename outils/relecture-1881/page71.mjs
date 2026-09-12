import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
/* Dump aligné d'une page du manuscrit de 1871, toutes colonnes dépouillées.

     node page71.mjs <division> <page> [page...]

   Le formulaire de 1871 compte 20 lignes. Les colonnes affichées suivent
   l'ordre du manuscrit : maison/famille, nom, sexe, âge, né dans les douze
   mois, lieu de naissance, religion, origine, profession, état matrimonial,
   école, sait lire / sait écrire (colonnes 18-19, en polarité positive), et
   les infirmités quand il y en a. */
const div = process.argv[2];
const pages = process.argv.slice(3);
const FILE = `${RACINE}/data/recensement-1871-d${div}-data.js`;
const raw = fs.readFileSync(FILE, 'utf8');
const D = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
const b = (v) => v === true ? 'o' : v === false ? '-' : '.';
let lm = null, lf = null;
for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || []) {
  if (!pages.includes(String(p.page_ms))) continue;
  const mm = m.no_maison !== lm ? 'M' + m.no_maison : '';
  const ff = f.no_famille !== lf ? 'F' + f.no_famille : '';
  lm = m.no_maison; lf = f.no_famille;
  const inf = ['sourd_muet', 'aveugle', 'aliene'].filter((k) => p[k] === true).join(',');
  console.log([
    String(p.page_ms).padStart(2), String(p.ligne).padStart(2),
    mm.padStart(5), ff.padStart(5),
    (p.nom || '').padEnd(15), (p.prenom || '').padEnd(17),
    (p.sexe || '').padEnd(2), (p.age || '').padStart(5),
    (p.lieu_naissance || '').slice(0, 10).padEnd(10),
    (p.religion || '').slice(0, 11).padEnd(11),
    (p.origine || '').slice(0, 10).padEnd(10),
    (p.profession || '').slice(0, 14).padEnd(14),
    (p.etat_matrimonial || '').padEnd(2),
    'éc' + b(p.ecole), 'l' + b(p.sait_lire) + 'é' + b(p.sait_ecrire),
    p.incertain ? 'INC' : '   ', inf,
    (p.remarque || '').replace(/pos=\d+;\s*/, '').slice(0, 34)
  ].join('|'));
}
