import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Replace les personnes que le dépouillement a décrochées de leur maisonnée.

   CE QU'ON CHERCHE. Le formulaire de 1871 n'écrit les numéros de maison et de
   famille (colonnes 5 et 6) **qu'à la première ligne de chaque ménage**. Tout ce
   qui suit appartient au ménage tant qu'un nouveau numéro n'apparaît pas. Quand
   le dépouillement ouvre une famille une ou deux lignes trop tôt — au haut d'une
   page, presque toujours —, il décroche du ménage précédent les personnes qui
   restaient : une servante, des enfants, un pensionnaire.

   COMMENT ON LE VOIT. Une famille dont la tête ne porte pas le patronyme
   dominant du reste. Le signal est bruyant : au Québec, la veuve qui mène le
   ménage est inscrite sous son nom de fille, et ses enfants sous celui du père —
   ce n'est pas une erreur. On ne retient donc que ce que le manuscrit confirme,
   numéro de famille à l'appui.

   CE QU'ON FAIT. On déplace la personne de sa famille vers celle qui précède,
   en queue — sa place dans l'ordre du registre. La famille d'origine garde son
   numéro et son chef ; si elle se vide, on la retire, et sa maison avec, si
   elle se vide aussi.

     node recoller71.mjs [--essai]

   Les personnes sont reconnues au nom, au prénom, à l'âge, à la page et à la
   ligne — jamais au seul rang, qu'un déplacement précédent aurait déjà bougé.
   Rejouer ensuite `node outils/generer-site.mjs`.
*/
const ESSAI = process.argv.includes('--essai');

/** Chacun : la personne à replacer, et la famille qui doit la recevoir. */
const DEPLACEMENTS = [
  { page: '12', ligne: '3',  nom: 'Cantin',   prenom: 'Marcelline', age: '18', de: '43',  vers: '42',
    pourquoi: 'le manuscrit écrit « 29 | 43 » à la ligne 4, chez Bégin George : la servante de la ligne 3 est encore chez les McNaughton' },
  { page: '37', ligne: '1',  nom: 'Clouston', prenom: 'Mary',       age: '8',  de: '138', vers: '137',
    pourquoi: 'le manuscrit écrit « 90 | 138 » à la ligne 4, chez Boivin Michel : les trois enfants Clouston des lignes 1 à 3 sont ceux de Francis et Rosalie, page 36' },
  { page: '37', ligne: '2',  nom: 'Clouston', prenom: 'Robert',     age: '4',  de: '138', vers: '137' },
  { page: '37', ligne: '3',  nom: 'Clouston', prenom: 'Pepsi',      age: '2',  de: '138', vers: '137' },
  { page: '64', ligne: '5',  nom: 'Croteau',  prenom: 'Adèle',      age: '23', de: '237', vers: '236',
    pourquoi: 'le manuscrit écrit « 135 | 237 » à la ligne 6, chez Côté Joseph : la servante de la ligne 5 est encore chez Godbout Joséphine' },
  { page: '66', ligne: '1',  nom: 'Campbell', prenom: 'Daniel',     age: '26', de: '245', vers: '244',
    pourquoi: 'le manuscrit écrit « 175 | 245 » à la ligne 2, chez Fréchette Alfred : le millwright de la ligne 1 loge encore chez les Belleau' },
  { page: '74', ligne: '1',  nom: 'Paradis',  prenom: 'Malvina',    age: '20', de: '280', vers: '279',
    pourquoi: 'le manuscrit écrit « 280 » à la ligne 3, chez Lemieux Gabriel : la servante et Mary Ritchie sont encore chez les Ritchie, page 73' },
  { page: '74', ligne: '2',  nom: 'Ritchie',  prenom: 'Mary',       age: '17', de: '280', vers: '279' },
];

const FILE = RACINE + '/data/recensement-1871-d1-data.js';
const raw = fs.readFileSync(FILE, 'utf8');
const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
const D = JSON.parse(raw.slice(a, b + 1));

const familles = [];
for (const m of D.maisons) for (const f of m.familles || []) familles.push({ m, f });
const trouver = (no) => familles.find((x) => String(x.f.no_famille) === String(no));

let bouges = 0;
for (const d of DEPLACEMENTS) {
  const source = trouver(d.de), cible = trouver(d.vers);
  if (!source) throw new Error(`famille ${d.de} introuvable`);
  if (!cible) throw new Error(`famille ${d.vers} introuvable`);
  const i = source.f.membres.findIndex((p) =>
    String(p.page_ms) === d.page && String(p.ligne) === d.ligne &&
    p.nom === d.nom && p.prenom === d.prenom && String(p.age) === d.age);
  if (i === -1) throw new Error(`${d.nom} ${d.prenom} (p${d.page} L${d.ligne}, ${d.age} ans) absent de la famille ${d.de}`);
  const [p] = source.f.membres.splice(i, 1);
  cible.f.membres.push(p);
  bouges++;
  console.log(`p${d.page} L${d.ligne} ${p.nom} ${p.prenom}, ${p.age} ans — maison ${source.m.no_maison} famille ${d.de} → maison ${cible.m.no_maison} famille ${d.vers}`);
  if (d.pourquoi) console.log(`    ${d.pourquoi}`);
}

// Une famille vidée n'a plus lieu d'être — ni la maison qui ne tenait qu'elle.
for (const m of D.maisons) m.familles = (m.familles || []).filter((f) => f.membres.length);
const avant = D.maisons.length;
D.maisons = D.maisons.filter((m) => (m.familles || []).length);
if (D.maisons.length !== avant) console.log(`${avant - D.maisons.length} maison(s) vidée(s), retirée(s)`);

// Le chef de famille est du texte libre. On ne le retouche que là où la
// première personne a vraiment changé — c'est-à-dire dans les familles qui
// viennent de perdre leur tête —, et dans la forme qu'emploie cette division :
// « Prénom Nom ».
const aRevoir = new Set(DEPLACEMENTS.map((d) => String(d.de)));
for (const m of D.maisons) for (const f of m.familles) {
  if (!aRevoir.has(String(f.no_famille))) continue;
  const c = f.membres[0];
  const nom = `${c.prenom} ${c.nom}`.trim();
  if (f.chef !== nom) { console.log(`famille ${f.no_famille} : chef « ${f.chef} » → « ${nom} »`); f.chef = nom; }
}

if (!ESSAI) fs.writeFileSync(FILE, raw.slice(0, a) + JSON.stringify(D) + raw.slice(b + 1));
console.log(`\n${bouges} personne(s) replacée(s)${ESSAI ? ' — essai, rien écrit' : ''}`);
