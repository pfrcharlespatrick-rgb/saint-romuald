import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { apply } from './pat91.mjs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Colonnes 21 et 22 de 1891 division 1 : rendre explicite le tiret du manuscrit.

   La passe des colonnes 21-22 a relu les 142 pages case par case, et
   `cols2122.mjs` ne touchait que les lignes divergentes : une case vide du
   fichier en face d'un tiret du manuscrit était tenue pour conforme et laissée
   telle quelle. L'absence de valeur encode donc une lecture, et non une
   lacune — c'est ce que dit le journal de la bande 42-83, la première close :

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

   **La règle vaut sur les 142 pages** — décision de Patrick, prise une fois la
   bande 42-83 faite. Le journal ne l'avait écrite noir sur blanc que pour cette
   bande, mais la passe des colonnes 21-22 a depuis couvert le recensement
   entier : les pages 1 à 41 par les dix lots du recueil `1891_01_DIV12`, les
   pages 84 à 142 par le lot du dernier recueil. Vérifié avant d'écrire :
   **aucune page du recensement n'est vide ni quasi vide** de ces colonnes — les
   pages 84 et 85, que le journal donnait pour franchement lacunaires, portent
   depuis 16 et 21 valeurs, ce dernier chiffre étant exactement le nombre de
   lignes cochées au manuscrit.

     node tirets91.mjs [premièrePage dernièrePage] [--essai]
*/
const ESSAI = process.argv.includes('--essai');
const bornes = process.argv.slice(2).filter((a) => /^\d+$/.test(a)).map(Number);
const [PAGE_MIN, PAGE_MAX] = bornes.length === 2 ? bornes : [1, 142];
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
// Un tel cas doit arrêter la main, pas être écrit au jugé.
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

// Une page entièrement dépourvue de valeurs signifierait que la passe des
// colonnes 21-22 ne l'a pas atteinte : son silence ne vaudrait alors pas tiret.
const parPage = new Map();
for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || []) {
  const page = Number(p.page_ms);
  if (page < PAGE_MIN || page > PAGE_MAX) continue;
  if (!parPage.has(page)) parPage.set(page, { total: 0, valeurs: 0 });
  const c = parPage.get(page);
  c.total++; if (p.sait_lire !== undefined) c.valeurs++;
}
const muettes = [...parPage.entries()].filter(([, c]) => c.valeurs === 0).map(([n]) => n);
if (muettes.length) {
  console.error(`\nARRÊT — ${muettes.length} page(s) sans aucune valeur en colonnes 21-22 : ${muettes.join(', ')}.`);
  console.error("Une page que la passe n'a pas atteinte ne porte pas des tirets, elle porte un trou.");
  process.exit(1);
}

if (ESSAI || !aCombler.length) process.exit(0);

apply(({ set }) => {
  for (const c of aCombler) set(c.page, [c.ligne], c.champs);
});
