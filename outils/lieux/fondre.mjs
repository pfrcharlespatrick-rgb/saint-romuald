#!/usr/bin/env node
// Verse le travail sur les lieux dans data/lieux-data.js.
//
// L'atelier de la carte (carte.html, mode Atelier) écrit ses modifications
// dans localStorage sous `suivi-lieux`, et cette clé voyage avec le reste du
// travail personnel dans data/travail-personnel.json. Ce script prend cet
// instantané et l'applique au fichier de données — après quoi le site public,
// qui ne lit pas le fichier de travail, montre enfin ce que Patrick a établi.
//
// Même règle que outils/relecture-1881/fondre.mjs : la main l'emporte. Un champ
// présent dans `suivi-lieux` écrase celui du fichier de données, sans discuter ;
// un champ absent est laissé tel quel.
//
//   node outils/lieux/fondre.mjs           applique
//   node outils/lieux/fondre.mjs --essai   montre sans écrire
//
// Une fois versé, on peut relancer `node outils/generer-site.mjs` pour que
// fiches/lieux.json et les fiches de maison suivent.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const CIBLE = path.join(RACINE, 'data', 'lieux-data.js');
const TRAVAIL = path.join(RACINE, 'data', 'travail-personnel.json');
const ESSAI = process.argv.includes('--essai');

const CHAMPS = ['nom', 'voie', 'adresse_actuelle', 'designe_aujourdhui', 'etat', 'construit', 'disparu',
  'coord', 'source', 'source_ref', 'personnages', 'resume', 'notes', 'occupations',
  'adresses_anciennes', 'cadastre', 'photos', 'documents'];

// Les champs calculés par le générateur n'ont rien à faire dans le fichier de
// données : ils y feraient double emploi et vieilliraient mal.
const CHAMPS_CALCULES = ['cle_maison', 'maisonnee'];

function chargerLieux() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(CIBLE, 'utf8'), ctx);
  return ctx.window.LIEUX;
}

function nettoyerOccupation(o) {
  const c = {};
  for (const [k, v] of Object.entries(o)) if (!CHAMPS_CALCULES.includes(k)) c[k] = v;
  return c;
}

if (!fs.existsSync(TRAVAIL)) {
  console.error(`${TRAVAIL} est absent — rien à fondre.`);
  process.exit(1);
}

const travail = JSON.parse(fs.readFileSync(TRAVAIL, 'utf8'));
const suivi = (travail.donnees || {})['suivi-lieux'] || {};
const base = chargerLieux();
const parId = new Map(base.lieux.map((l) => [l.id, l]));

const rapport = { modifies: [], ajoutes: [], supprimes: [] };

for (const [id, mod] of Object.entries(suivi)) {
  if (mod._supprime) {
    if (parId.delete(id)) rapport.supprimes.push(id);
    continue;
  }
  const existant = parId.get(id);
  const cible = existant || { id, notes: [], occupations: [], adresses_anciennes: [], cadastre: {}, photos: [], documents: [] };
  const touches = [];
  for (const champ of CHAMPS) {
    if (!(champ in mod)) continue;
    const valeur = champ === 'occupations' ? (mod[champ] || []).map(nettoyerOccupation) : mod[champ];
    if (JSON.stringify(cible[champ]) === JSON.stringify(valeur)) continue;
    cible[champ] = valeur;
    touches.push(champ);
  }
  if (!existant) { parId.set(id, cible); rapport.ajoutes.push(`${id} (${touches.length} champs)`); }
  else if (touches.length) rapport.modifies.push(`${id} — ${touches.join(', ')}`);
}

const lieux = [...parId.values()];
const sortie = { ...base, mis_a_jour: new Date().toISOString().slice(0, 10), lieux };
const contenu = '// Couche « lieux » du site — voir docs/LIEUX.md.\n' +
  "// Amorcé par outils/lieux/amorcer.mjs, tenu à jour par l'atelier de la carte\n" +
  '// (carte.html, mode Atelier) puis outils/lieux/fondre.mjs.\n' +
  'window.LIEUX = ' + JSON.stringify(sortie, null, 2) + ';\n';

const rien = !rapport.modifies.length && !rapport.ajoutes.length && !rapport.supprimes.length;
const prefixe = ESSAI ? '[essai] ' : '';
if (rien) {
  console.log(`${prefixe}data/lieux-data.js est déjà d'accord avec le travail personnel.`);
} else {
  rapport.ajoutes.forEach((x) => console.log(`${prefixe}  + ${x}`));
  rapport.modifies.forEach((x) => console.log(`${prefixe}  ~ ${x}`));
  rapport.supprimes.forEach((x) => console.log(`${prefixe}  − ${x}`));
}
if (!ESSAI && !rien) {
  fs.writeFileSync(CIBLE, contenu);
  console.log(`data/lieux-data.js écrit : ${lieux.length} lieux.`);
  console.log('Pensez à rejouer `node outils/generer-site.mjs`.');
} else if (ESSAI) {
  console.log(`[essai] ${CIBLE} non modifié.`);
}
