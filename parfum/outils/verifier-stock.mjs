/* Vérifie la palette de la maison (stock.js) : d'abord la forme de chaque
   matière, ensuite — et c'est le plus utile — que le moteur sait vraiment
   composer avec, en lui soumettant des demandes très différentes.

   Usage : node outils/verifier-stock.mjs        (depuis parfum/) */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = path.dirname(fileURLToPath(import.meta.url));
const racine = path.join(ici, '..');
const lire = (f) => fs.readFileSync(path.join(racine, f), 'utf8');

const contexte = new Function(
  lire('donnees.js') + '\n' + lire('stock.js') + '\n' + lire('moteur.js') +
  '\nreturn { STOCK_MAISON, MATIERES, FACETTES, EMOTIONS, CURSEURS, composer, palette };'
)();

const { STOCK_MAISON, FACETTES, composer } = contexte;

const erreurs = [];
const avertissements = [];
const ok = (m) => console.log('  ' + m);

if (!STOCK_MAISON.length) {
  console.log('stock.js est vide : l\'application utilise la palette de démonstration.');
  console.log('Remplissez-le à la main ou via outils/importer-stock.mjs.');
  process.exit(0);
}

/* --- 1. Forme de chaque matière -------------------------------------- */

const ROLES = ['tete', 'coeur', 'fond'];
const NATURES = ['naturelle', 'synthese'];
const vus = new Set();

STOCK_MAISON.forEach((m, i) => {
  const ou = `${m.nom || m.id || '#' + (i + 1)}`;
  const exiger = (cond, texte) => { if (!cond) erreurs.push(`${ou} : ${texte}`); };

  exiger(m.id && /^[a-z0-9_]+$/.test(m.id), 'identifiant manquant ou non conforme (a-z, 0-9, _)');
  exiger(!vus.has(m.id), `identifiant en double : ${m.id}`);
  vus.add(m.id);
  exiger(m.nom, 'nom manquant');
  exiger(m.famille, 'famille manquante');
  exiger(ROLES.includes(m.role), `rôle « ${m.role} » inconnu (tete, coeur ou fond)`);
  exiger(NATURES.includes(m.nature), `nature « ${m.nature} » inconnue (naturelle ou synthese)`);
  exiger(Number.isFinite(m.force) && m.force >= 1 && m.force <= 5, 'force hors de 1–5');
  exiger(Array.isArray(m.dose) && m.dose.length === 2, 'dose absente');

  if (Array.isArray(m.dose) && m.dose.length === 2) {
    const [a, b] = m.dose;
    exiger(Number.isFinite(a) && Number.isFinite(b), 'dose non numérique');
    exiger(a >= 0 && b > 0, 'dose nulle ou négative');
    exiger(a <= b, `dose inversée : [${a}, ${b}]`);
    if (b > 40) avertissements.push(`${ou} : dose maximale de ${b} % — inhabituel, à vérifier`);
  }

  const facettes = Object.entries(m.facettes || {});
  exiger(facettes.length > 0, 'aucune facette : le moteur ne pourra jamais la choisir');
  facettes.forEach(([f, p]) => {
    exiger(FACETTES[f], `facette inconnue « ${f} »`);
    exiger(Number.isFinite(p) && p >= 0 && p <= 1, `poids de « ${f} » hors de 0–1`);
  });

  if (!m.note) avertissements.push(`${ou} : pas de caractère — la fiche affichera une case vide`);
  if (m.famille === 'À CLASSER') avertissements.push(`${ou} : famille encore à classer`);
});

console.log(`Palette de la maison : ${STOCK_MAISON.length} matières.`);

/* --- 2. La palette peut-elle porter une formule ? --------------------- */

ROLES.forEach((r) => {
  const groupe = STOCK_MAISON.filter((m) => m.role === r);
  const nom = { tete: 'tête', coeur: 'cœur', fond: 'fond' }[r];
  if (!groupe.length) {
    erreurs.push(`aucune matière de ${nom} : le moteur ne peut pas bâtir de pyramide`);
    return;
  }
  const plafond = groupe.reduce((a, m) => a + m.dose[1], 0);
  const porteurs = groupe.filter((m) => m.dose[1] >= 4).length;
  ok(`${nom} : ${groupe.length} matières, plafond ${plafond.toFixed(1)} %, ${porteurs} porteuse(s)`);
  if (!porteurs) {
    avertissements.push(`${nom} : aucune matière ne se dose au-dessus de 4 % — cet étage restera famélique`);
  }
});

const plafondTotal = STOCK_MAISON.reduce((a, m) => a + m.dose[1], 0);
if (plafondTotal < 100) {
  avertissements.push(
    `la palette entière plafonne à ${plafondTotal.toFixed(1)} % : toute formule sera complétée au solvant`);
}

const familles = new Set(STOCK_MAISON.map((m) => m.famille));
ok(`${familles.size} familles représentées`);
if (familles.size < 4) {
  avertissements.push('moins de quatre familles : les compositions se ressembleront toutes');
}

/* --- 3. Essais réels -------------------------------------------------- */

const base = {
  recit: '', emotions: [], curseurs: { lumiere: 0, temperature: 0, presence: 0, caractere: 0, texture: 0 },
  saison: 'toutes', moment: 'indifferent', exclusions: [], concentration: 'edp',
  facettesIA: null, imposees: [], ecartees: []
};

const essais = [
  ['clair et frais', { emotions: ['joie', 'liberte'], saison: 'ete',
    curseurs: { ...base.curseurs, lumiere: .8, temperature: -.7 } }],
  ['sombre et chaud', { emotions: ['mystere', 'desir'], moment: 'soir',
    curseurs: { ...base.curseurs, lumiere: -.8, temperature: .7, presence: .6 } }],
  ['tendre et poudré', { emotions: ['tendresse', 'nostalgie'],
    curseurs: { ...base.curseurs, texture: .8 } }],
  ['sans matières animales ni sucrées', { emotions: ['force'], exclusions: ['animal', 'gourmand'] }],
  ['tout naturel', { emotions: ['serenite'], exclusions: ['synthese'] }],
  ['une seule émotion', { emotions: ['purete'] }]
];

let solvantMax = 0;
essais.forEach(([nom, modif]) => {
  const etat = { ...base, ...modif };
  let c;
  try { c = composer(etat); }
  catch (e) { erreurs.push(`essai « ${nom} » : le moteur a échoué (${e.message})`); return; }

  const lignes = ROLES.flatMap((r) => c.pyramide[r]);
  const total = lignes.reduce((a, l) => a + l.pct, 0);

  if (Math.abs(total + c.diluant - 100) > .05) {
    erreurs.push(`essai « ${nom} » : le concentré fait ${total.toFixed(1)} % + ${c.diluant.toFixed(1)} % de solvant`);
  }
  lignes.forEach((l) => {
    if (l.pct > l.matiere.dose[1] + .05 || l.pct < l.matiere.dose[0] - .05) {
      erreurs.push(`essai « ${nom} » : ${l.matiere.nom} dosée à ${l.pct.toFixed(1)} %, hors de [${l.matiere.dose.join(', ')}]`);
    }
  });
  const vides = ROLES.filter((r) => !c.pyramide[r].length)
    .map((r) => ({ tete: 'tête', coeur: 'cœur', fond: 'fond' }[r]));
  if (vides.length) avertissements.push(`essai « ${nom} » : étage vide (${vides.join(', ')})`);

  solvantMax = Math.max(solvantMax, c.diluant);
  ok(`« ${nom} » → ${lignes.length} matières` +
     (c.diluant > .5 ? `, ${c.diluant.toFixed(0)} % de solvant` : ''));
});

if (solvantMax > 30) {
  avertissements.push(
    `jusqu'à ${solvantMax.toFixed(0)} % de solvant : la palette est trop étroite pour certaines demandes`);
}

/* --- verdict ---------------------------------------------------------- */

if (avertissements.length) {
  console.log('\nÀ regarder :');
  avertissements.forEach((a) => console.log('  · ' + a));
}
if (erreurs.length) {
  console.error('\nÀ corriger :');
  erreurs.forEach((e) => console.error('  ✕ ' + e));
  process.exit(1);
}
console.log('\nLa palette est utilisable' + (avertissements.length ? ', sous réserve de ce qui précède.' : '.'));
