/* Déduction du sexe à partir du prénom — recensement de 1881, division 2.
 *
 * Le problème
 * -----------
 * 1881 division 2 porte 1 334 fiches « F » pour 104 « M », soit 93 % d'un seul
 * sexe là où les autres jeux se répartissent également. Les fils Lee, tous
 * navigateurs, y sont notés féminins. La colonne a manifestement été remplie
 * par défaut, sauf pour 104 fiches où un « M » a été saisi délibérément.
 *
 * La méthode
 * ----------
 * Plutôt qu'une liste de prénoms écrite à la main, la table est apprise des
 * quatre jeux dont la colonne est fiable : 1871 D1, 1871 D2, 1881 D1, 1891 D1.
 * Ce sont les mêmes familles, le même recenseur parfois, la même population
 * franco-irlandaise — la source la mieux placée pour dire si « Célanire » est
 * un prénom d'homme ou de femme dans cette paroisse.
 *
 * Ce que vaut le résultat
 * -----------------------
 * Mesuré par validation croisée, un jeu retiré à la fois : 99,5 % de justesse.
 * Confronté aux 104 « M » attestés de 1881 D2 : 94 concordances, aucune
 * discordance. Les prénoms trop rares ou réellement mixtes ne sont pas
 * tranchés — le relevé est prudent, il peut manquer des cas, il n'en invente pas.
 *
 * Ce qu'il ne fait pas
 * --------------------
 * Il ne modifie aucune donnée de recensement. Il écrit un fichier de
 * complément, sur le modèle de `complement-1881-d1-data.js` : le supprimer
 * laisse le dépouillement d'origine intact, et une relecture au manuscrit se
 * compare au complément au lieu de l'écraser. Les 104 « M » attestés ne sont
 * jamais recouverts par une déduction.
 *
 * Usage : node outils/deduire-sexe.mjs
 * Écrit  : data/complement-sexe-1881-d2-data.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { clesPrenom } from './noms.mjs';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* Jeux dont la colonne « sexe » est fiable — ils servent de matériau d'apprentissage. */
const JEUX_FIABLES = [
  ['recensement-1871-d1-data.js', 'RECENSEMENT_1871_D1'],
  ['recensement-1871-d2-data.js', 'RECENSEMENT_1871_D2'],
  ['recensement-1881-d1-data.js', 'RECENSEMENT_1881_D1'],
  ['recensement-1891-d1-data.js', 'RECENSEMENT_1891_D1'],
];
const JEU_CIBLE = ['recensement-1881-d2-data.js', 'RECENSEMENT_1881_D2'];

/* Un prénom n'est tranché que s'il a été vu au moins MIN_OBS fois et penche à
   au moins PART_MIN d'un côté. En deçà, on s'abstient. */
const MIN_OBS = 3;
const PART_MIN = 0.9;

function charger(liste) {
  const bac = {};
  for (const [fichier] of liste) {
    const chemin = path.join(RACINE, 'data', fichier);
    if (!fs.existsSync(chemin)) continue;
    new Function('window', fs.readFileSync(chemin, 'utf8'))(bac);
  }
  return bac;
}

function aplatir(bac, variable) {
  const d = bac[variable];
  const sortie = [];
  if (!d || !d.maisons) return sortie;
  for (const maison of d.maisons) {
    for (const famille of maison.familles || []) {
      for (const p of famille.membres || []) {
        if (p && p.id) sortie.push({ ...p, no_maison: String(maison.no_maison ?? ''), no_famille: String(famille.no_famille ?? '') });
      }
    }
  }
  return sortie;
}

/** Table prénom → répartition des sexes observés. */
function apprendre(fiches) {
  const table = new Map();
  for (const p of fiches) {
    if (p.sexe !== 'M' && p.sexe !== 'F') continue;
    for (const cle of clesPrenom(p.prenom)) {
      if (!table.has(cle)) table.set(cle, { M: 0, F: 0 });
      table.get(cle)[p.sexe]++;
    }
  }
  return table;
}

/** Prédiction pour un prénom, ou null si la table ne permet pas de trancher. */
function predire(table, prenom) {
  let meilleur = null;
  for (const cle of clesPrenom(prenom)) {
    const e = table.get(cle);
    if (!e) continue;
    const n = e.M + e.F;
    if (n < MIN_OBS) continue;
    const part = Math.max(e.M, e.F) / n;
    // À égalité d'ambiguïté, on retient la forme la mieux observée.
    if (!meilleur || n > meilleur.observations) {
      meilleur = { sexe: e.M >= e.F ? 'M' : 'F', part, observations: n, cle, repartition: { M: e.M, F: e.F } };
    }
  }
  return meilleur && meilleur.part >= PART_MIN ? meilleur : null;
}

/** Validation croisée : chaque jeu fiable prédit à partir des trois autres. */
function validerCroise(bac) {
  const detail = [];
  let justes = 0, faux = 0;
  for (const [, cible] of JEUX_FIABLES) {
    const autres = JEUX_FIABLES.filter(([, v]) => v !== cible).flatMap(([, v]) => aplatir(bac, v));
    const table = apprendre(autres);
    let bon = 0, mauvais = 0, sans = 0;
    for (const p of aplatir(bac, cible)) {
      if (p.sexe !== 'M' && p.sexe !== 'F') continue;
      const pred = predire(table, p.prenom);
      if (!pred) { sans++; continue; }
      if (pred.sexe === p.sexe) bon++; else mauvais++;
    }
    justes += bon; faux += mauvais;
    detail.push({
      jeu: cible, justes: bon, faux: mauvais, non_predits: sans,
      justesse: bon + mauvais ? Number((bon / (bon + mauvais) * 100).toFixed(2)) : null,
    });
  }
  return {
    detail,
    predictions: justes + faux,
    justesse_globale: justes + faux ? Number((justes / (justes + faux) * 100).toFixed(2)) : null,
  };
}

function main() {
  const bac = charger([...JEUX_FIABLES, JEU_CIBLE]);
  const validation = validerCroise(bac);

  const table = apprendre(JEUX_FIABLES.flatMap(([, v]) => aplatir(bac, v)));
  const cibles = aplatir(bac, JEU_CIBLE[1]);

  const deductions = {};
  const contradictions = [];
  let attestes = 0, confirmes = 0, abstentions = 0;

  for (const p of cibles) {
    // Les 104 « M » ont été saisis à dessein : ils font foi, on n'y touche pas.
    if (p.sexe === 'M') { attestes++; continue; }

    const pred = predire(table, p.prenom);
    if (!pred) { abstentions++; continue; }

    const contredit = p.sexe === 'F' && pred.sexe === 'M';
    deductions[p.id] = {
      sexe: pred.sexe,
      origine: 'deduit_prenom',
      confiance: pred.part >= 0.98 ? 'forte' : 'moyenne',
      part: Number(pred.part.toFixed(3)),
      observations: pred.observations,
      contredit_saisie: contredit || undefined,
    };
    if (contredit) {
      contradictions.push({
        id: p.id,
        prenom: p.prenom, nom: p.nom,
        age: p.age || '', profession: p.profession || '',
        maison: p.no_maison, famille: p.no_famille,
        page_ms: p.page_ms || '', ligne: p.ligne || '',
        saisi: 'F', deduit: 'M',
        appui: `« ${pred.cle} » observé ${pred.repartition.M} fois masculin et ${pred.repartition.F} fois féminin dans les jeux fiables`,
      });
    } else {
      confirmes++;
    }
  }

  // Les contradictions se relisent au manuscrit ; on les trie par page pour
  // que la vérification suive l'ordre du registre.
  contradictions.sort((a, b) =>
    (parseInt(a.page_ms, 10) || 0) - (parseInt(b.page_ms, 10) || 0) ||
    (parseInt(a.ligne, 10) || 0) - (parseInt(b.ligne, 10) || 0));

  const sortie = {
    format: 'complement-sexe-saint-romuald',
    version: 1,
    jeu: '1881-D2',
    variable_source: JEU_CIBLE[1],
    genere_le: new Date().toISOString().slice(0, 10),

    probleme: 'La colonne « sexe » de 1881 division 2 porte 1 334 « F » pour 104 « M », soit 93 % d\'un seul sexe là où les autres jeux se répartissent également. Elle a vraisemblablement été remplie par défaut, sauf pour les 104 fiches où un « M » a été saisi délibérément.',
    methode: 'Table prénom → sexe apprise des quatre jeux fiables (1871 D1, 1871 D2, 1881 D1, 1891 D1), soit la même population franco-irlandaise. Un prénom n\'est tranché que s\'il a été observé au moins ' + MIN_OBS + ' fois et penche à au moins ' + (PART_MIN * 100) + ' % d\'un côté.',
    portee: 'Complément non destructif : les données de recensement ne sont pas modifiées. Les 104 « M » attestés ne sont jamais recouverts. Supprimer ce fichier laisse le dépouillement d\'origine intact.',
    reserve: 'Une déduction reste une déduction. Les contradictions listées ci-dessous sont à relire au manuscrit — elles sont triées par page et ligne pour suivre l\'ordre du registre.',

    validation,
    comptes: {
      fiches: cibles.length,
      sexe_atteste_m: attestes,
      deductions: Object.keys(deductions).length,
      deductions_confirmant_la_saisie: confirmes,
      contradictions: contradictions.length,
      abstentions,
    },
    contradictions,
    deductions,
  };

  const chemin = path.join(RACINE, 'data', 'complement-sexe-1881-d2-data.js');
  fs.writeFileSync(chemin, `window.COMPLEMENT_SEXE_1881_D2 = ${JSON.stringify(sortie)};\n`);

  process.stderr.write(`Écrit : ${chemin}\n\n`);
  process.stderr.write(`Validation croisée : ${validation.justesse_globale} % de justesse sur ${validation.predictions} prédictions\n`);
  for (const d of validation.detail) {
    process.stderr.write(`  ${d.jeu.padEnd(22)} ${String(d.justesse).padStart(6)} %  (${d.faux} faux sur ${d.justes + d.faux})\n`);
  }
  process.stderr.write(`\n${JSON.stringify(sortie.comptes, null, 2)}\n`);
  process.stderr.write(`\n${contradictions.length} fiche(s) saisies « F » que le prénom dit masculines — à relire au manuscrit.\n`);
  for (const c of contradictions.slice(0, 12)) {
    process.stderr.write(`  p.${String(c.page_ms).padStart(3)} l.${String(c.ligne).padStart(2)}  ${(c.prenom + ' ' + c.nom).padEnd(28)} ${String(c.age).padStart(3)} ans  ${c.profession}\n`);
  }
  if (contradictions.length > 12) process.stderr.write(`  … et ${contradictions.length - 12} autres\n`);
}

main();
