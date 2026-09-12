/* Ce que le fichier porte déjà aux colonnes 17 à 20, page par page.

   Les colonnes 21 et 22 sont imprimées à droite **comme témoin de calage** :
   leur relevé est clos et vérifié case par case. Si la lecture des ticks 21-22
   sur l'image ne tombe pas sur les mêmes lignes que cette colonne-ci, c'est
   que la bande est décalée — et il faut recaler avant de lire quoi que ce soit
   d'autre.

       node vu1725.mjs 110 111 112
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const brut = fs.readFileSync(RACINE + '/data/recensement-1891-d1-data.js', 'utf8');
const D = JSON.parse(brut.slice(brut.indexOf('{'), brut.lastIndexOf('}') + 1));
const tous = [];
for (const m of D.maisons) for (const f of m.familles) for (const p of f.membres) tous.push(p);
const b = (v) => (v === true ? '1' : v === false ? '-' : '.');
for (const pg of process.argv.slice(2)) {
  const P = tous.filter((p) => p.page_ms === String(pg)).sort((a, b2) => +a.ligne - +b2.ligne);
  console.log(`\n=== page ${pg} — ${P.length} lignes`);
  console.log('L   nom                        âge  profession            17 18 19 20   | 21 22');
  for (const p of P) console.log(
    String(p.ligne).padStart(2), (p.nom + ' ' + p.prenom).padEnd(26).slice(0, 26),
    String(p.age).padStart(4), (p.profession || '').padEnd(21).slice(0, 21),
    b(p.patron), ' ' + b(p.employe), ' ' + b(p.chomage),
    ' ' + String(p.nb_employes ?? '·').padEnd(3),
    (p.mois_metier !== undefined ? ' m' + p.mois_metier : '  ') + (p.mois_manufacture !== undefined ? ' f' + p.mois_manufacture : '   '),
    '|', b(p.sait_lire), b(p.sait_ecrire));
}
