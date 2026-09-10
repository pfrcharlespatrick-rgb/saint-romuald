import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { apply } from './pat91.mjs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Colonnes 21 et 22 de 1891 division 1 : rendre explicite le tiret du manuscrit.

   La passe des colonnes 21-22 a relu les pages 42 à 83 case par case. Sur cette
   bande, `cols2122.mjs` ne touchait que les lignes divergentes : une case vide
   du fichier en face d'un tiret du manuscrit était tenue pour conforme et
   laissée telle quelle. L'absence de valeur y encode donc une lecture, et non
   une lacune — c'est ce que dit le journal :

     « Aux pages 42 à 83, une absence de valeur dans le fichier correspond à un
       tiret dans le manuscrit : le dépouillement avait bien tout lu, et les
       personnes sans valeur ne savaient ni lire ni écrire. »

   Le site, lui, ne peut pas le deviner : un champ absent signifie « information
   non relevée » (voir docs/SCHEMA.md), si bien qu'une personne dont le
   recenseur a écrit qu'elle ne sait pas lire s'affiche comme non renseignée.
   Ce script écrit le `false` que le tiret veut dire, et le marque
   `alphabetisation_source: 'tiret_manuscrit'` pour que la provenance reste
   distincte d'une lecture de coche.

   Ce n'est pas une relecture : rien n'est deviné, aucune ligne ne reçoit de
   drapeau `incertain` ni de remarque. Une case corrigée à la main dans
   l'atelier n'est jamais touchée — `pat91.mjs` s'en charge.

   La bande est volontairement bornée aux pages 42 à 83. Pour les pages 1 à 41
   et 84 à 142, la même passe a été faite depuis, mais le journal n'y a jamais
   écrit la règle noir sur blanc : l'étendre est une décision à prendre, pas une
   conséquence de ce qui est écrit.

     node tirets91.mjs [--essai]
*/
const ESSAI = process.argv.includes('--essai');
const PAGE_MIN = 42, PAGE_MAX = 83;
const SRC = 'tiret_manuscrit';

const raw = fs.readFileSync(RACINE + '/data/recensement-1891-d1-data.js', 'utf8');
const D = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));

const aCombler = [];
let lignes = 0, deja = 0;
for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || []) {
  const page = Number(p.page_ms);
  if (page < PAGE_MIN || page > PAGE_MAX) continue;
  lignes++;
  const champs = {};
  if (p.sait_lire === undefined) champs.sait_lire = false;
  if (p.sait_ecrire === undefined) champs.sait_ecrire = false;
  if (!Object.keys(champs).length) { deja++; continue; }
  champs.alphabetisation_source = SRC;
  aCombler.push({ page: p.page_ms, ligne: p.ligne, nom: `${p.nom} ${p.prenom}`, age: p.age,
    source: p.alphabetisation_source, champs });
}

console.log(`pages ${PAGE_MIN} à ${PAGE_MAX} : ${lignes} lignes, ${deja} déjà renseignées, ${aCombler.length} à expliciter`);

// Une seule des deux colonnes absente signalerait une passe incomplète, pas un
// tiret : cols2122.mjs écrit toujours les deux ensemble. On le vérifie.
const partielles = aCombler.filter((c) => Object.keys(c.champs).length < 3);
if (partielles.length) {
  console.log(`\n${partielles.length} ligne(s) où une seule des deux colonnes manque — à regarder avant d'écrire :`);
  for (const c of partielles) console.log(`  p${c.page}:${c.ligne} ${c.nom} (${c.age}) — ${JSON.stringify(c.champs)} — source « ${c.source} »`);
}
const avecSource = aCombler.filter((c) => c.source);
if (avecSource.length) {
  console.log(`\n${avecSource.length} ligne(s) portent déjà une provenance d'alphabétisation :`);
  for (const c of avecSource.slice(0, 20)) console.log(`  p${c.page}:${c.ligne} ${c.nom} — « ${c.source} »`);
}

const parAge = { 'moins de 5 ans': 0, '5 ans et plus': 0, 'âge non chiffré': 0 };
for (const c of aCombler) {
  const n = Number(c.age);
  if (/\//.test(String(c.age)) || (Number.isFinite(n) && n < 5)) parAge['moins de 5 ans']++;
  else if (Number.isFinite(n)) parAge['5 ans et plus']++;
  else parAge['âge non chiffré']++;
}
console.log('\nrépartition :', JSON.stringify(parAge));

if (ESSAI || !aCombler.length) process.exit(0);

apply(({ set }) => {
  for (const c of aCombler) set(c.page, [c.ligne], c.champs);
});
