import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { manuel, protege } from './atelier.mjs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* **Le seul outil qui passe par-dessus la main de Patrick — et il ne se lance
   que sur son ordre exprès.**

   La règle du projet est sans exception : une correction faite à la main dans
   l'atelier l'emporte sur toute relecture, et une relecture qui propose autre
   chose le signale et passe son chemin. `lot71.mjs` s'y tient : il refuse
   d'écrire un champ protégé et rend compte de l'écart.

   Il arrive pourtant que Patrick, ayant lu ce compte rendu, tranche en faveur
   du manuscrit. Il faut alors corriger **là où la décision vit**, c'est-à-dire
   dans `data/travail-personnel.json` : écrire seulement dans le recensement ne
   servirait à rien, `fondre.mjs` remettrait l'ancienne valeur au passage
   suivant.

     node trancher71.mjs lot.json                    # montre, n'écrit rien
     node trancher71.mjs lot.json --tranche          # écrit
     node trancher71.mjs lot.json --tranche --pages 1-3

   L'outil relit le lot, repère les champs protégés dont la lecture diffère de
   la main, et remplace la valeur de la main par celle du manuscrit — en gardant
   trace de l'ancienne dans le compte rendu. Rien d'autre n'est touché : les
   champs sur lesquels la main et la relecture s'accordent, et ceux que la
   relecture ne propose pas, restent tels quels.

   Passer ensuite `node outils/relecture-1881/fondre.mjs` pour verser les
   nouvelles valeurs dans le recensement. */

const FICHIER = process.argv[2];
const TRANCHE = process.argv.includes('--tranche');
const iPages = process.argv.indexOf('--pages');
const PAGES = iPages === -1 ? null : process.argv[iPages + 1];
if (!FICHIER) {
  console.error('usage : node trancher71.mjs lot.json [--tranche] [--pages 1-3]');
  process.exit(1);
}
const [pMin, pMax] = PAGES ? PAGES.split('-').map(Number) : [-Infinity, Infinity];

const lot = JSON.parse(fs.readFileSync(FICHIER, 'utf8'));
const TRAVAIL = RACINE + '/data/travail-personnel.json';
const brut = fs.readFileSync(TRAVAIL, 'utf8');
const travail = JSON.parse(brut);
const corr = (travail.donnees || {})['suivi-familles-corrections'];
if (!corr) throw new Error('aucune correction manuelle dans data/travail-personnel.json');

/** Les valeurs proposées par le lot, ligne à ligne — même dépliage que lot71. */
function propositions(fiche) {
  const par = {};
  for (const [cle, champ, valeur] of [
    ['ecole', 'ecole', (c) => c === '1'],
    ['lire', 'sait_lire', (c) => c !== '1'],
    ['ecrire', 'sait_ecrire', (c) => c !== '1'],
    ['etat', 'etat_matrimonial', (c) => (c === '-' ? '' : c)],
  ]) {
    const chaine = fiche[cle];
    if (chaine === undefined) continue;
    for (let i = 0; i < 20; i++) (par[i + 1] = par[i + 1] || {})[champ] = valeur(chaine[i]);
  }
  for (const [l, champs] of Object.entries(fiche.ligne || {})) {
    par[Number(l)] = par[Number(l)] || {};
    for (const [k, v] of Object.entries(champs)) if (!k.startsWith('_')) par[Number(l)][k] = v;
  }
  return par;
}

const div = lot.division;
const change = [];
for (const [page, fiche] of Object.entries(lot.pages)) {
  if (Number(page) < pMin || Number(page) > pMax) continue;
  for (const [ligne, champs] of Object.entries(propositions(fiche))) {
    const id = `1871-D${div}-P${String(page).padStart(3, '0')}-L${String(ligne).padStart(2, '0')}`;
    for (const [k, v] of Object.entries(champs)) {
      if (!protege(id, k)) continue;
      const avant = manuel(id)[k];
      if (JSON.stringify(avant) === JSON.stringify(v)) continue;
      change.push({ id, k, avant, apres: v, page: Number(page), ligne: Number(ligne) });
    }
  }
}

if (!change.length) { console.log('rien à trancher : la main et la relecture s\'accordent partout'); process.exit(0); }

const parPage = {};
for (const c of change) (parPage[c.page] = parPage[c.page] || []).push(c);
for (const page of Object.keys(parPage).sort((a, b) => a - b)) {
  const l = parPage[page];
  console.log(`\npage ${page} — ${l.length} champ(s)`);
  for (const c of l) console.log(`  L${String(c.ligne).padStart(2)} ${c.k.padEnd(17)} « ${c.avant} » -> « ${c.apres} »`);
}
console.log(`\n${change.length} champ(s) sur ${new Set(change.map(c => c.id)).size} ligne(s), ${Object.keys(parPage).length} page(s)`);

if (!TRANCHE) { console.log('\nrien écrit — relancer avec --tranche pour trancher'); process.exit(0); }

for (const c of change) corr[c.id][c.k] = c.apres;
// L'atelier exporte avec un espace d'indentation : on rend le fichier dans la
// même forme, pour que le diff ne montre que les valeurs tranchées.
fs.writeFileSync(TRAVAIL, JSON.stringify(travail, null, 1) + (brut.endsWith('\n') ? '\n' : ''));
console.log('\ndata/travail-personnel.json récrit. Passer ensuite : node outils/relecture-1881/fondre.mjs');
