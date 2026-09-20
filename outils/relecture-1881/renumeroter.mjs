#!/usr/bin/env node
// Renuméroter une maison, ou déplacer une famille dans une autre maison —
// partout où le numéro de maison sert de clé. C'est le geste que fondre.mjs
// refuse de faire seul (« le numéro de maison est un identifiant ») : ici on
// le fait avec tout ce qui s'y rattache, et on dit ce qu'on a touché.
//
//   node outils/relecture-1881/renumeroter.mjs maison 1871 2 "131 [?]" 147
//   node outils/relecture-1881/renumeroter.mjs famille 1871 2 137 175 138
//   … --essai : montre sans écrire.
//
// « maison » change le numéro d'une maison. « famille » sort une famille de
// sa maison et la met dans la maison visée — créée juste après l'ancienne si
// elle n'existe pas encore, puisque l'ordre des maisons est celui du parcours
// du recenseur. Les identifiants de personnes (page et ligne du manuscrit) ne
// bougent pas.
//
// Touché : data/recensement-<a>-d<d>-data.js ; data/annexe-*-data.js
// (ref_maison — pour une famille, seulement ses lignes du manuscrit) ;
// data/annexe-rapport-data.js (clé « maison-famille », 1871 D2 seulement) ;
// data/lieux-data.js (occupations annee/division/no_maison).
//
// Non touché, et dit : data/travail-personnel.json, archive de la main — les
// clés qui portent l'ancien numéro y restent, et fondre.mjs reconnaît la
// maison sous son nouveau numéro ; data/filiation-data.js, à recalculer
// (node outils/analyse-filiation.mjs) ; les fiches du site, à régénérer
// (node outils/generer-site.mjs). L'opération est idempotente : refaite, elle
// constate que c'est fait.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const AUJOURDHUI = new Date().toISOString().slice(0, 10);

const argv = process.argv.slice(2);
const essai = argv.includes('--essai');
const args = argv.filter(a => a !== '--essai');
const verbe = args[0];

function usage(message) {
  if (message) console.error(message);
  console.error('Emploi :\n' +
    '  node outils/relecture-1881/renumeroter.mjs maison <annee> <division> <ancien> <nouveau> [--essai]\n' +
    '  node outils/relecture-1881/renumeroter.mjs famille <annee> <division> <maison> <famille> <maison visée> [--essai]');
  process.exit(2);
}

const texte = (v) => String(v === undefined || v === null ? '' : v).trim();
const meme = (a, b) => texte(a) === texte(b);
const sansDoute = (v) => texte(v).replace(/\s*\[\?\]\s*$/, '').trim();

/* Un fichier de données : « window.X = … ; ». On garde le préfixe et le
   suffixe tels quels, et on réécrit le JSON minifié, comme fondre.mjs. */
function lire(chemin) {
  const raw = fs.readFileSync(path.join(RACINE, chemin), 'utf8');
  const eg = raw.indexOf('=');
  const debut = eg + 1 + raw.slice(eg + 1).search(/\S/);
  const fin = raw.lastIndexOf(raw[debut] === '[' ? ']' : '}') + 1;
  return { chemin, raw, debut, fin, D: JSON.parse(raw.slice(debut, fin)) };
}
function ecrire(f) {
  // Les recensements et les annexes tiennent sur une ligne ; lieux-data.js est
  // indenté (outils/lieux/fondre.mjs). On rend chaque fichier comme on l'a pris.
  const indente = f.raw.slice(f.debut, f.fin).includes('\n');
  const json = indente ? JSON.stringify(f.D, null, 2) : JSON.stringify(f.D);
  fs.writeFileSync(path.join(RACINE, f.chemin), f.raw.slice(0, f.debut) + json + f.raw.slice(f.fin));
}
function ajouterRemarque(existante, ajout) {
  const e = texte(existante);
  return e ? `${e} ; ${ajout}` : ajout;
}

if (!['maison', 'famille'].includes(verbe)) usage();
const annee = texte(args[1]), division = texte(args[2]);
if (!/^\d{4}$/.test(annee) || !/^[12]$/.test(division)) usage('année (AAAA) ou division (1 ou 2) invalide');

const FICHIER = `data/recensement-${annee}-d${division}-data.js`;
const ANNEXES = ['foncier', 'terres', 'animaux', 'forets', 'navigation', 'etablissements'].map(n => `data/annexe-${n}-data.js`);
const RAPPORT = 'data/annexe-rapport-data.js';
const LIEUX = 'data/lieux-data.js';
const TRAVAIL = 'data/travail-personnel.json';

const rec = lire(FICHIER);
const maisons = rec.D.maisons || [];
const faits = [];        // ce qui change
const pourMemoire = [];  // ce qui reste ailleurs, et pourquoi
const touches = new Map(); // chemin -> fichier lu, à réécrire

const numeros = (m) => (m.familles || []).map(f => f.no_famille).join(', ');

/* Les tableaux annexes : ref_maison, pour l'année et la division ; pour une
   famille, seulement les lignes (page, ligne) de ses membres. */
function renvoyerAnnexes(ancien, nouveau, positions) {
  for (const chemin of ANNEXES) {
    if (!fs.existsSync(path.join(RACINE, chemin))) continue;
    const f = lire(chemin);
    let n = 0;
    for (const l of f.D) {
      if (texte(l.annee) !== annee || texte(l.division) !== division || !meme(l.ref_maison, ancien)) continue;
      if (positions && !positions.has(`${texte(l.page)}|${texte(l.ligne)}`)) continue;
      l.ref_maison = nouveau;
      n++;
    }
    if (n) { faits.push(`${chemin} : ${n} ligne(s), ref_maison « ${ancien} » -> « ${nouveau} »`); touches.set(chemin, f); }
  }
}

/* Le Rapport de 1871 (division 2) est rattaché par une clé « maison-famille »
   aux numéros sans marque de doute. On ne renomme que les clés des familles
   concernées : « 131-168 » n'est pas la maison « 131 [?] ». */
function renvoyerRapport(ancien, nouveau, familles) {
  if (annee !== '1871' || division !== '2' || !fs.existsSync(path.join(RACINE, RAPPORT))) return;
  const de = sansDoute(ancien), vers = sansDoute(nouveau);
  const fams = new Set(familles.map(sansDoute));
  const f = lire(RAPPORT);
  let n = 0;
  const entrees = Object.entries(f.D).map(([cle, e]) => {
    const tiret = cle.indexOf('-');
    const mk = cle.slice(0, tiret), fk = cle.slice(tiret + 1);
    if (mk !== de || !fams.has(fk)) return [cle, e];
    const nouvelle = `${vers}-${fk}`;
    if (nouvelle === cle) return [cle, e];
    n++;
    return [nouvelle, { ...e, maison_rapport: vers }];
  });
  if (n) {
    f.D = Object.fromEntries(entrees);
    faits.push(`${RAPPORT} : ${n} clé(s) « ${de}-… » -> « ${vers}-… »`);
    touches.set(RAPPORT, f);
  }
}

/* Les lieux : une occupation rattache un lieu à une maison entière. */
function renvoyerLieux(ancien, nouveau) {
  if (!fs.existsSync(path.join(RACINE, LIEUX))) return;
  const f = lire(LIEUX);
  let n = 0;
  for (const l of f.D.lieux || []) for (const o of l.occupations || []) {
    if (texte(o.annee) !== annee || texte(o.division) !== division || !meme(o.no_maison, ancien)) continue;
    o.no_maison = nouveau;
    if (o.cle_maison) o.cle_maison = `${annee}-D${division}-M${nouveau}`;
    if (o.maisonnee && o.maisonnee.cle) o.maisonnee.cle = `${annee}-D${division}-M${nouveau}`;
    faits.push(`${LIEUX} : lieu ${l.id}, occupation ${annee} D${division} maison « ${ancien} » -> « ${nouveau} »`);
    n++;
  }
  if (n) touches.set(LIEUX, f);
}

/* Les lieux rattachés à une maison dont une famille sort : rien n'est déplacé,
   c'est à la main de dire si le lieu suit la famille ou reste à la maison. */
function lieuxDeLaMaison(no) {
  if (!fs.existsSync(path.join(RACINE, LIEUX))) return;
  const f = lire(LIEUX);
  for (const l of f.D.lieux || []) for (const o of l.occupations || []) {
    if (texte(o.annee) === annee && texte(o.division) === division && meme(o.no_maison, no)) {
      pourMemoire.push(`lieu ${l.id} rattaché à la maison ${no} (${o.statut}) : la famille en est sortie, à revoir à la main si le lieu la suit`);
    }
  }
}

/* L'archive de la main n'est pas réécrite ; on dit ce qui y porte l'ancien numéro. */
function memoireTravail(prefixeMaison) {
  if (!fs.existsSync(path.join(RACINE, TRAVAIL))) return;
  const donnees = JSON.parse(fs.readFileSync(path.join(RACINE, TRAVAIL), 'utf8')).donnees || {};
  const cle = `${annee}-${division}-${prefixeMaison}`;
  for (const nom of ['suivi-corr-maison', 'suivi-corr-famille', 'suivi-familles-notes']) {
    for (const k of Object.keys(donnees[nom] || {})) {
      if (k === cle || k.startsWith(cle + '-')) pourMemoire.push(`${TRAVAIL} : ${nom} « ${k} » garde l'ancien numéro (archive de la main, non réécrite)`);
    }
  }
}

if (verbe === 'maison') {
  const ancien = texte(args[3]), nouveau = texte(args[4]);
  if (!ancien || !nouveau) usage('il faut l\'ancien numéro et le nouveau');
  const source = maisons.find(m => meme(m.no_maison, ancien));
  const deja = maisons.find(m => meme(m.no_maison, nouveau));
  if (!source && deja) { console.log(`Maison « ${ancien} » absente et « ${nouveau} » présente dans ${annee} D${division} : déjà fait, rien à changer.`); process.exit(0); }
  if (!source) { console.error(`Aucune maison « ${ancien} » dans ${annee} D${division}. Rien n'est écrit.`); process.exit(1); }
  if (deja) { console.error(`Une maison « ${nouveau} » existe déjà dans ${annee} D${division} (familles ${numeros(deja)}) : deux maisons ne peuvent pas porter le même numéro. Rien n'est écrit.`); process.exit(1); }
  faits.push(`${FICHIER} : maison « ${ancien} » -> « ${nouveau} » (familles ${numeros(source)})`);
  source.no_maison = nouveau;
  source.remarque = ajouterRemarque(source.remarque, `Numéro « ${ancien} » tranché en « ${nouveau} » à la main (${AUJOURDHUI})`);
  touches.set(FICHIER, rec);
  renvoyerAnnexes(ancien, nouveau, null);
  renvoyerRapport(ancien, nouveau, (source.familles || []).map(f => f.no_famille));
  renvoyerLieux(ancien, nouveau);
  memoireTravail(ancien);
}

if (verbe === 'famille') {
  const noMaison = texte(args[3]), noFamille = texte(args[4]), cible = texte(args[5]);
  if (!noMaison || !noFamille || !cible) usage('il faut la maison, la famille et la maison visée');
  if (meme(noMaison, cible)) usage('la maison visée est celle de départ');
  const source = maisons.find(m => meme(m.no_maison, noMaison));
  let visee = maisons.find(m => meme(m.no_maison, cible));
  const dansSource = source && (source.familles || []).find(f => meme(f.no_famille, noFamille));
  const dansVisee = visee && (visee.familles || []).find(f => meme(f.no_famille, noFamille));
  if (!dansSource && dansVisee) { console.log(`La famille ${noFamille} est déjà dans la maison « ${cible} » de ${annee} D${division} : déjà fait, rien à changer.`); process.exit(0); }
  if (!source) { console.error(`Aucune maison « ${noMaison} » dans ${annee} D${division}. Rien n'est écrit.`); process.exit(1); }
  if (!dansSource) { console.error(`Aucune famille ${noFamille} dans la maison « ${noMaison} » (familles ${numeros(source)}). Rien n'est écrit.`); process.exit(1); }
  if (dansVisee) { console.error(`La maison « ${cible} » a déjà une famille ${noFamille}. Rien n'est écrit.`); process.exit(1); }
  if ((source.familles || []).length === 1) { console.error(`La famille ${noFamille} est la seule de la maison « ${noMaison} » : la déplacer laisserait une maison vide. Renumérotez plutôt la maison. Rien n'est écrit.`); process.exit(1); }

  source.familles = source.familles.filter(f => f !== dansSource);
  if (!visee) {
    visee = { no_maison: cible, familles: [] };
    visee.remarque = `Maison créée à la main (${AUJOURDHUI}) pour la famille ${noFamille}, que le dépouillement laissait dans la maison ${noMaison}`;
    maisons.splice(maisons.indexOf(source) + 1, 0, visee);
    faits.push(`${FICHIER} : maison « ${cible} » créée juste après la « ${noMaison} »`);
  }
  visee.familles.push(dansSource);
  faits.push(`${FICHIER} : famille ${noFamille} (${texte(dansSource.chef) || 'sans chef nommé'}, ${(dansSource.membres || []).length} personne(s)) : maison « ${noMaison} » -> « ${cible} » ; la maison « ${noMaison} » garde les familles ${numeros(source)}`);
  touches.set(FICHIER, rec);

  const positions = new Set((dansSource.membres || []).map(p => `${texte(p.page_ms)}|${texte(p.ligne)}`));
  renvoyerAnnexes(noMaison, cible, positions);
  renvoyerRapport(noMaison, cible, [noFamille]);
  lieuxDeLaMaison(noMaison);
  memoireTravail(`${noMaison}-${noFamille}`);
}

console.log(`${essai ? '[essai] ' : ''}${faits.length} changement(s) :`);
faits.forEach(x => console.log('  ' + x));
if (pourMemoire.length) {
  console.log('Pour mémoire :');
  pourMemoire.forEach(x => console.log('  · ' + x));
}
if (essai) {
  console.log('Essai à blanc, rien écrit.');
} else {
  for (const f of touches.values()) ecrire(f);
  console.log(`${touches.size} fichier(s) réécrit(s). Ensuite : node outils/relecture-1881/fondre.mjs --essai ; node outils/analyse-filiation.mjs ; node outils/generer-site.mjs`);
}
