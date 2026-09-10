import fs from 'fs';
import { apply } from './pat71.mjs';

/* Applique un lot de lectures du manuscrit de 1871.

     node lot71.mjs lot.json [--essai]

   Le fichier de lot est un JSON :

     { "division": 1,
       "defauts": { "lieu_naissance": "Québec" },
       "pages": {
         "1": { "ligne": {
                  "3":  { "ecole": true },
                  "5":  { "nom": "Laverty", "age": "23",
                          "_note": "le patronyme se lit Laverty ou Laverdy",
                          "_inc": true },
                  "20": { "lieu_naissance": "États-Unis",
                          "religion": "Église d'Angleterre" } } } } }

   `defauts` s'applique à **toutes les lignes de toutes les pages du lot**, sauf
   là où la ligne porte sa propre valeur pour le même champ : c'est ainsi qu'on
   verse le « Québec » de la colonne 11, que le recenseur note une fois puis
   reprend au guillemet, sans avoir à le réécrire quinze cents fois.

   Les clés préfixées d'un souligné sont de la mécanique, non des champs :
     _note  — remarque de relecture, ajoutée à la ligne
     _inc   — drapeau `incertain` (true ou false)

   Une ligne sans `_inc` garde le drapeau qu'elle avait : combler une colonne
   vide n'est pas une lecture douteuse, et ne doit pas jeter de doute sur le
   reste de la ligne.
*/
const FICHIER = process.argv[2];
const ESSAI = process.argv.includes('--essai');
if (!FICHIER) { console.error('usage : node lot71.mjs lot.json [--essai]'); process.exit(1); }
const lot = JSON.parse(fs.readFileSync(FICHIER, 'utf8'));
const defauts = lot.defauts || {};

const journal = [];
apply(lot.division, ({ set, R, lignesDe }) => {
  for (const [page, fiche] of Object.entries(lot.pages)) {
    const parLigne = fiche.ligne || {};
    const presentes = lignesDe(page);
    if (!presentes.length) throw new Error(`page ${page} : aucune ligne dans le fichier`);
    if (fiche.lignes && fiche.lignes !== presentes.length)
      journal.push(`p${page} : le manuscrit porte ${fiche.lignes} lignes, le fichier en a ${presentes.length}`);

    for (const l of presentes) {
      const propre = { ...(parLigne[String(l)] || {}) };
      const note = propre._note, inc = propre._inc;
      delete propre._note; delete propre._inc;
      const valeurs = { ...defauts, ...propre };
      const o = {};
      if (inc !== undefined) o.inc = inc;
      if (note) o.rem = R(note);
      set(page, [l], valeurs, o);
    }
    // Une ligne nommée dans le lot mais absente du fichier est un décalage :
    // mieux vaut s'arrêter que d'écrire à côté.
    for (const l of Object.keys(parLigne))
      if (!presentes.includes(Number(l))) throw new Error(`p${page}:${l} — ligne absente du fichier`);
  }
}, { essai: ESSAI });

if (journal.length) { console.log('\nÉcarts de comptage :'); journal.forEach((m) => console.log('  ' + m)); }
