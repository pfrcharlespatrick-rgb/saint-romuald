#!/usr/bin/env node
// Amorce (et complète) data/lieux-data.js — la couche « lieux » du site.
//
// Un lieu, c'est un emplacement au sol : un point sur la carte, un état
// (debout, disparu, remplacé), et la liste des maisons de recensement qui y
// ont été recensées, année par année. C'est la pièce qui manquait pour dire
// « en 1871 Edward Benson habite le manoir Longwood ; en 1881 il habite la
// maison neuve du 1871, chemin du Fleuve » — deux lieux distincts pour un
// même homme, et un lieu qui n'existe plus aujourd'hui.
//
// Ce script est NON DESTRUCTIF, et c'est délibéré : il n'ajoute que les lieux
// absents et ne touche jamais à un lieu déjà présent. On peut donc le rejouer
// après une mise à jour de data/bussiere1990-data.js sans perdre une ligne du
// travail de Patrick. Voir docs/LIEUX.md.
//
//   node outils/lieux/amorcer.mjs            écrit data/lieux-data.js
//   node outils/lieux/amorcer.mjs --essai    montre ce qu'il ferait, n'écrit rien

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const CIBLE = path.join(RACINE, 'data', 'lieux-data.js');
const ESSAI = process.argv.includes('--essai');
const AUJOURD_HUI = new Date().toISOString().slice(0, 10);

function chargerGlobal(fichier, nom) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(RACINE, 'data', fichier), 'utf8'), ctx);
  return ctx.window[nom];
}

// ───────────────────────── placement approximatif ─────────────────────────
// Aucune coordonnée n'est relevée : le géocodage n'est pas accessible depuis
// l'outillage, et de toute façon un géocodage à l'adresse actuelle placerait
// au mauvais endroit les bâtiments démolis ou renumérotés — c'est l'avis qui
// figurait déjà sur carte.html.
//
// On pose donc un point de départ, jamais une position établie : les numéros
// civiques du chemin du Fleuve croissent d'ouest en est (le 2560 est « à
// l'entrée est du chemin », près du pont Etchemin), et l'on interpole entre
// quelques repères d'axe. Chaque point ainsi posé porte
// `precision: "secteur"` ; la carte le dessine en creux et l'atelier permet
// de le déplacer à la main. Un point corrigé passe à `precision: "releve"`.
//
// Axe recalé le 17 août 2026 : la première version, écrite de mémoire, était
// décalée d'environ 2 km vers le sud-ouest. Deux adresses réelles du chemin
// actuel servent d'ancrage — la marina de la Chaudière (1250, à l'embouchure
// de la Chaudière) et le parc de l'Anse-Benson (1851) — et bornent le chemin
// entre la Chaudière et le pont de l'Etchemin, sur un relèvement de 70°.

const AXE_FLEUVE = [
  { no: 1250, lat: 46.7458, lon: -71.2792 },
  { no: 1500, lat: 46.7489, lon: -71.2667 },
  { no: 1851, lat: 46.7533, lon: -71.2491 },
  { no: 2000, lat: 46.7543, lon: -71.2453 },
  { no: 2250, lat: 46.7558, lon: -71.2390 },
  { no: 2560, lat: 46.7578, lon: -71.2311 }
];

// Les rues transversales montent vers l'intérieur des terres (le fleuve est
// au nord). On les rattache au numéro du chemin du Fleuve le plus proche de
// leur embranchement, puis on décale vers le sud.
const RUES_TRANSVERSALES = {
  'rue du Juvénat': { ancre: 2400, decalage: 0.0016 },
  'rue du Collège': { ancre: 2110, decalage: 0.0013 },
  "rue de l'Église": { ancre: 2040, decalage: 0.0011 },
  'Côte Rouge': { ancre: 1930, decalage: 0.0018 },
  'rue Saint-Damase': { ancre: 1710, decalage: 0.0012 },
  'rue Hardy': { ancre: 1620, decalage: 0.0014 }
};

function surAxe(no) {
  const pts = AXE_FLEUVE;
  if (no <= pts[0].no) return { lat: pts[0].lat, lon: pts[0].lon };
  if (no >= pts[pts.length - 1].no) return { lat: pts[pts.length - 1].lat, lon: pts[pts.length - 1].lon };
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    if (no >= a.no && no <= b.no) {
      const t = (no - a.no) / (b.no - a.no);
      return { lat: a.lat + t * (b.lat - a.lat), lon: a.lon + t * (b.lon - a.lon) };
    }
  }
  return { lat: pts[0].lat, lon: pts[0].lon };
}

function voieDe(adresse) {
  const s = String(adresse || '');
  for (const rue of Object.keys(RUES_TRANSVERSALES)) if (s.includes(rue)) return rue;
  return 'chemin du Fleuve';
}

function numeroDe(adresse) {
  const m = String(adresse || '').match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}

// Deux bâtiments voisins tomberaient au même point : on écarte légèrement les
// doublons pour qu'ils restent cliquables. L'écart est de l'ordre de 8 m.
const dejaPose = new Map();
function ecarter(p) {
  const cle = p.lat.toFixed(5) + ',' + p.lon.toFixed(5);
  const n = dejaPose.get(cle) || 0;
  dejaPose.set(cle, n + 1);
  if (!n) return p;
  const angle = n * 2.399;
  const r = 0.00007 * Math.ceil(n / 6);
  return { lat: p.lat + r * Math.cos(angle), lon: p.lon + r * Math.sin(angle) * 1.46 };
}

function placer(adresse) {
  const voie = voieDe(adresse);
  const no = numeroDe(adresse);
  if (voie === 'chemin du Fleuve') {
    if (no == null) return null;
    return ecarter(surAxe(no));
  }
  const t = RUES_TRANSVERSALES[voie];
  const base = surAxe(t.ancre);
  // Le numéro civique de la transversale règle la distance au chemin.
  const pas = Math.min(1, (no || 60) / 220);
  return ecarter({ lat: base.lat - t.decalage * (0.35 + 0.65 * pas), lon: base.lon + 0.0004 * pas });
}

// ───────────────────────── lieux ajoutés à la main ─────────────────────────
// Ceux qui ne viennent d'aucune source publiée : disparus, donc absents de la
// brochure Bussière, qui ne répertorie que du bâti encore debout en 1990.

const LIEUX_MANUELS = [
  {
    id: 'manoir-longwood',
    nom: 'Manoir Longwood',
    voie: 'chemin du Fleuve',
    adresse_actuelle: '',
    designe_aujourdhui: "Emplacement ayant fait l'objet de fouilles archéologiques ; le manoir ne subsiste pas.",
    etat: 'disparu',
    construit: '',
    disparu: '',
    coord: { lat: 46.7507, lon: -71.2591, precision: 'secteur', pose_par: 'amorce automatique', pose_le: AUJOURD_HUI },
    source: 'Patrick Blanchet',
    personnages: 'Famille Benson — William John Chapman Benson et ses fils Edward et William',
    resume: '',
    notes: [
      {
        auteur: 'Patrick Blanchet',
        date: AUJOURD_HUI,
        texte: "Résidence de la famille Benson au moment du recensement de 1871 : Edward Benson, 25 ans, « bourgeois », y est recensé chez son père. Le manoir a disparu ; l'emplacement a fait l'objet de fouilles archéologiques. La maison du 1871, chemin du Fleuve, où on le retrouve en 1881, ne sera bâtie qu'en 1878."
      },
      {
        auteur: 'Amorce automatique',
        date: AUJOURD_HUI,
        texte: "Position à replacer. Le point posé ici n'est qu'un repère de secteur, dans les anses Benson à l'ouest du chemin ; il n'a pas été relevé. Le rapport de fouille donnerait la position exacte."
      }
    ],
    occupations: [
      {
        annee: '1871', division: '2', no_maison: '115',
        statut: 'hypothese', confiance: 'moyenne', origine: 'chercheur',
        motif: "Edward Benson, 25 ans, bourgeois, recensé seul à la maison 115 — la maison du 1871, chemin du Fleuve, n'existe pas encore en 1871.",
        ajoute_le: AUJOURD_HUI
      }
    ],
    adresses_anciennes: [],
    cadastre: {},
    photos: [],
    documents: []
  }
];

// Corrections à appliquer aux lieux issus de Bussière lors de l'amorce
// seulement — elles ne se rejouent jamais sur un lieu déjà présent.
const AMENDEMENTS = {
  '1871-cf': {
    etat: 'debout',
    construit: '1878',
    notes: [
      {
        auteur: 'Patrick Blanchet',
        date: AUJOURD_HUI,
        texte: "Maison bâtie en 1878 pour les frères Benson : elle ne peut pas être le logis d'Edward Benson au recensement de 1871. La proposition de Bussière pour 1871 est donc écartée, et la maison 115 de 1871 rattachée au manoir Longwood."
      }
    ],
    occupations: (occ) => occ.map((o) => (o.annee === '1871'
      ? { ...o, statut: 'rejete', motif: o.motif + " — écartée : la maison n'est bâtie qu'en 1878, Benson habite alors le manoir Longwood." }
      : { ...o, statut: 'confirme' }))
  }
};

// ───────────────────────── construction ─────────────────────────

function lieuDepuisBussiere(b) {
  const point = placer(b.adresse);
  const occupations = (b.propositions || []).map((p) => ({
    annee: String(p.annee), division: String(p.division), no_maison: String(p.no_maison),
    statut: 'propose', confiance: p.confiance || '', origine: 'source',
    motif: p.motif || '', ajoute_le: AUJOURD_HUI
  }));
  const lieu = {
    id: b.id,
    nom: b.titre || b.adresse,
    voie: voieDe(b.adresse),
    adresse_actuelle: b.adresse,
    designe_aujourdhui: '',
    etat: 'inconnu',
    construit: b.annee || '',
    disparu: '',
    coord: point
      ? { lat: Number(point.lat.toFixed(6)), lon: Number(point.lon.toFixed(6)), precision: 'secteur', pose_par: 'amorce automatique', pose_le: AUJOURD_HUI }
      : null,
    source: 'Bussière 1990',
    source_ref: 'bussiere:' + b.id,
    personnages: '',
    resume: '',
    notes: [],
    occupations,
    adresses_anciennes: [],
    cadastre: {},
    photos: [],
    documents: []
  };
  const am = AMENDEMENTS[b.id];
  if (am) {
    for (const [k, v] of Object.entries(am)) lieu[k] = typeof v === 'function' ? v(lieu[k]) : v;
  }
  return lieu;
}

function chargerExistant() {
  if (!fs.existsSync(CIBLE)) return null;
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(CIBLE, 'utf8'), ctx);
  return ctx.window.LIEUX || null;
}

const bussiere = chargerGlobal('bussiere1990-data.js', 'BUSSIERE_1990_DATA') || [];
const existant = chargerExistant();
const lieux = existant ? existant.lieux.slice() : [];
const connus = new Set(lieux.map((l) => l.id));

// Les points déjà posés comptent dans l'écartement des doublons, sinon un
// ajout ultérieur retomberait sur un point existant.
for (const l of lieux) if (l.coord) dejaPose.set(l.coord.lat.toFixed(5) + ',' + l.coord.lon.toFixed(5), 1);

const ajoutes = [];
for (const b of bussiere) {
  if (connus.has(b.id)) continue;
  lieux.push(lieuDepuisBussiere(b));
  ajoutes.push(b.id + ' — ' + b.adresse);
}
for (const l of LIEUX_MANUELS) {
  if (connus.has(l.id)) continue;
  lieux.push(l);
  ajoutes.push(l.id + ' — ' + (l.adresse_actuelle || l.nom));
}

lieux.sort((a, b) => {
  const va = a.voie || '', vb = b.voie || '';
  if (va !== vb) return va === 'chemin du Fleuve' ? -1 : vb === 'chemin du Fleuve' ? 1 : va.localeCompare(vb, 'fr');
  return (numeroDe(a.adresse_actuelle) ?? 9999) - (numeroDe(b.adresse_actuelle) ?? 9999);
});

const sortie = {
  format: 'lieux-saint-romuald',
  version: 1,
  mis_a_jour: AUJOURD_HUI,
  note: "Couche « lieux » : un emplacement au sol, sa position, son état, et les maisons de recensement qui y ont été recensées année par année. Ne remplace jamais data/bussiere1990-data.js, qui reste la source publiée : un lieu portant source_ref hérite du titre, des personnages et du résumé de la brochure, et n'y ajoute que ce que le chercheur établit. Voir docs/LIEUX.md.",
  lieux
};

const contenu = '// Couche « lieux » du site — voir docs/LIEUX.md.\n' +
  "// Amorcé par outils/lieux/amorcer.mjs, tenu à jour par l'atelier de la carte\n" +
  '// (carte.html, mode Atelier) puis outils/lieux/fondre.mjs.\n' +
  'window.LIEUX = ' + JSON.stringify(sortie, null, 2) + ';\n';

if (ESSAI) {
  console.log(`[essai] ${lieux.length} lieux au total, ${ajoutes.length} ajoutés :`);
  ajoutes.forEach((a) => console.log('   + ' + a));
  console.log(`[essai] ${CIBLE} non modifié.`);
} else {
  fs.mkdirSync(path.dirname(CIBLE), { recursive: true });
  fs.writeFileSync(CIBLE, contenu);
  console.log(`data/lieux-data.js : ${lieux.length} lieux, ${ajoutes.length} ajoutés.`);
  const sansPoint = lieux.filter((l) => !l.coord).length;
  const aReplacer = lieux.filter((l) => l.coord && l.coord.precision !== 'releve').length;
  console.log(`  ${aReplacer} points approximatifs à replacer à la main, ${sansPoint} sans position.`);
}
