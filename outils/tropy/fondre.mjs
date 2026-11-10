#!/usr/bin/env node
// Verse le travail de Patrick dans Tropy (export JSON-LD des images du greffe
// Tremblay) dans les fiches d'actes notariés de documents/manifeste.json.
//
//   node outils/tropy/fondre.mjs --essai   # montre, n'écrit rien
//   node outils/tropy/fondre.mjs           # écrit les images et le rapport
//
// Entrées :
//   documents/tropy/tropy-notaires.json  — l'export de Tropy, tel quel
//                                          (Fichier › Exporter › JSON-LD)
//   documents/tropy/images-drive.json    — n° de fichier → identifiant Google Drive
//
// Ce que l'outil fait :
//   1. Chaque image de Tropy est rangée sous l'acte que son « identifier » nomme
//      (« CN401,S124 — acte Nº 34 »). La fiche de cet acte reçoit un champ
//      `images` : [{ fichier, microfilm, drive, legende }], dans l'ordre des pages.
//      Numéro de microfilm = numéro de fichier + 944.
//   2. Il écrit documents/tropy/RAPPORT.md : ce que Tropy décrit et que le site
//      n'a pas, ce que le site a et que Tropy ne décrit pas, et les écarts de
//      date ou de noms entre les deux.
//
// Ce que l'outil ne fait PAS : il ne réécrit ni titre, ni date, ni transcription,
// ni personnes. Les descriptions de Tropy sont un résumé des fiches ; quand
// elles apportent du neuf, le rapport le signale et l'acte se relit sur le
// manuscrit avant d'être versé à la main. Opération idempotente.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const P_MANIFESTE = path.join(RACINE, 'documents/manifeste.json');
const P_TROPY = path.join(RACINE, 'documents/tropy/tropy-notaires.json');
const P_DRIVE = path.join(RACINE, 'documents/tropy/images-drive.json');
const P_RAPPORT = path.join(RACINE, 'documents/tropy/RAPPORT.md');
const ESSAI = process.argv.includes('--essai');

const manifeste = JSON.parse(fs.readFileSync(P_MANIFESTE, 'utf8'));
const tropy = JSON.parse(fs.readFileSync(P_TROPY, 'utf8'))['@graph'] || [];
const drive = JSON.parse(fs.readFileSync(P_DRIVE, 'utf8')).images || {};

const sansAccent = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const noFichier = (nom) => (/(\d{5})\.\w+$/.exec(nom || '') || [])[1] || null;
const microfilm = (f) => String(Number(f) + 944).padStart(6, '0');

// ── Les images de Tropy, par acte ──
const parActe = new Map();       // n° → [{ fichier, legende, item }]
const horsSerie = [];            // images dont l'identifiant porte une réserve
const fichiersTropy = new Set();
for (const item of tropy) {
  const m = /acte\s*N\D*(\d+)\s*(\(.*\))?\s*$/.exec(item.identifier || '');
  for (const photo of item.photo || []) {
    const fichier = noFichier(photo.filename);
    if (!fichier) continue;
    fichiersTropy.add(fichier);
    const legende = ((/\[([^\]]+)\]([^[]*)$/.exec(item.title || '') || [])[1] || '') +
      (((/\]\s*\(([^)]+)\)\s*$/.exec(item.title || '') || [])[1]) ? ' (' + /\]\s*\(([^)]+)\)\s*$/.exec(item.title)[1] + ')' : '');
    if (!m) { horsSerie.push({ fichier, item, raison: 'identifiant sans numéro d\'acte' }); continue; }
    if (m[2]) { horsSerie.push({ fichier, item, raison: m[2] }); continue; }
    const no = Number(m[1]);
    if (!parActe.has(no)) parActe.set(no, []);
    parActe.get(no).push({ fichier, legende, item });
  }
}

// ── Les fiches du site, par acte ──
const fiches = (manifeste.documents || []).filter((d) => String(d.id).startsWith('notarie-') &&
  /Tremblay/.test(d.source || ''));
const ficheParActe = new Map();
for (const f of fiches) {
  const m = /Minute n°\s*(\d+)/i.exec(f.cote || '');
  if (m) ficheParActe.set(Number(m[1]), f);
}

// ── 1. Les images ──
let changees = 0;
const sansDrive = [];
for (const [no, imgs] of parActe) {
  const fiche = ficheParActe.get(no);
  if (!fiche) continue;
  const images = imgs
    .sort((a, b) => a.fichier.localeCompare(b.fichier))
    .map(({ fichier, legende }) => {
      if (!drive[fichier]) sansDrive.push(fichier);
      return { fichier, microfilm: microfilm(fichier), ...(drive[fichier] ? { drive: drive[fichier] } : {}), ...(legende ? { legende } : {}) };
    });
  if (JSON.stringify(fiche.images || null) !== JSON.stringify(images)) {
    fiche.images = images;
    changees++;
  }
}

// ── 2. Le rapport ──
const L = [];
const ligne = (s = '') => L.push(s);
const titreCourt = (item) => String(item.title || '').replace(/\s*\[[^\]]*\].*$/, '');
ligne('# Tropy et le site : ce qui concorde, ce qui manque');
ligne();
ligne('Produit par `node outils/tropy/fondre.mjs` à partir de l\'export de Tropy');
ligne('(`documents/tropy/tropy-notaires.json`). Ne pas modifier à la main : relancer l\'outil.');
ligne();
ligne(`- Images décrites dans Tropy : **${fichiersTropy.size}**, réparties sur **${parActe.size}** actes.`);
ligne(`- Fiches d'actes du greffe Tremblay sur le site : **${fiches.length}**.`);
ligne(`- Fiches qui ont reçu leurs images : **${[...ficheParActe.keys()].filter((n) => parActe.has(n)).length}**.`);
ligne();

ligne('## Actes décrits dans Tropy mais sans fiche sur le site');
ligne();
const sansFiche = [...parActe.keys()].filter((n) => !ficheParActe.has(n)).sort((a, b) => a - b);
if (!sansFiche.length) ligne('Aucun : chaque acte de Tropy a sa fiche.');
for (const n of sansFiche) {
  const it = parActe.get(n)[0].item;
  ligne(`- **n° ${n}** — ${titreCourt(it)} (fichiers ${parActe.get(n).map((x) => x.fichier).join(', ')})`);
}
ligne();

ligne('## Images que Tropy range hors de la série');
ligne();
if (!horsSerie.length) ligne('Aucune.');
const hsParTitre = new Map();
for (const h of horsSerie) {
  const k = titreCourt(h.item) + ' — ' + h.raison;
  if (!hsParTitre.has(k)) hsParTitre.set(k, []);
  hsParTitre.get(k).push(h.fichier);
}
for (const [k, fs_] of hsParTitre) ligne(`- ${k} (fichiers ${fs_.join(', ')}) : laissées sans fiche.`);
ligne();

ligne('## Fiches du site sans image dans Tropy');
ligne();
const sansImage = [...ficheParActe.keys()].filter((n) => !parActe.has(n)).sort((a, b) => a - b);
if (!sansImage.length) ligne('Aucune : chaque fiche a ses images.');
for (const n of sansImage) ligne(`- n° ${n} — ${ficheParActe.get(n).titre}`);
ligne();

ligne('## Fichiers de la série absents de Tropy');
ligne();
const nums = [...fichiersTropy].map(Number);
const max = Math.max(...nums, ...Object.keys(drive).map(Number));
const absents = [];
for (let i = 1; i <= max; i++) {
  const f = String(i).padStart(5, '0');
  if (!fichiersTropy.has(f)) absents.push(f + (drive[f] ? ' (présent dans le Drive)' : ' (absent du Drive aussi)'));
}
if (!absents.length) ligne('Aucun.');
for (const a of absents) ligne(`- ${a}`);
if (sansDrive.length) {
  ligne();
  ligne(`Images de Tropy introuvables dans le Drive (pas d'aperçu possible) : ${[...new Set(sansDrive)].join(', ')}.`);
}
ligne();

ligne('## Écarts entre Tropy et les fiches');
ligne();
ligne('Tropy n\'est pas versé tel quel dans le texte des fiches : chaque écart se relit sur le manuscrit.');
ligne();
let ecarts = 0;
for (const [no, fiche] of [...ficheParActe].sort((a, b) => a[0] - b[0])) {
  const imgs = parActe.get(no);
  if (!imgs) continue;
  const it = imgs[0].item;
  const notes = [];
  if (it.date && fiche.date && it.date !== fiche.date && !(fiche.date_incertaine && it.date.startsWith(fiche.date))) {
    notes.push(`date : Tropy « ${it.date} », fiche « ${fiche.date} »`);
  } else if (it.date && fiche.date_incertaine && it.date !== fiche.date) {
    notes.push(`date : Tropy précise « ${it.date} », la fiche est incertaine (« ${fiche.date} »)`);
  }
  const noms = (fiche.personnes || []).map((p) => sansAccent(p.nom));
  const absentsNoms = String(it.subject || '').split(/\s*;\s*/).filter(Boolean)
    .filter((s) => { const n = sansAccent(s.replace(/\s*\(.*?\)\s*/g, '')); return !noms.some((x) => x.includes(n) || n.includes(x)); });
  if (absentsNoms.length) notes.push(`noms dans Tropy, pas dans la fiche : ${absentsNoms.join(' ; ')}`);
  if (notes.length) { ecarts++; ligne(`- **n° ${no}** — ${notes.join(' · ')}`); }
}
if (!ecarts) ligne('Aucun écart de date ni de noms.');
ligne();

const rapport = L.join('\n');
console.log(`Images : ${changees} fiche(s) ${ESSAI ? 'seraient mises' : 'mises'} à jour sur ${fiches.length}.`);
console.log(`Sans fiche : ${sansFiche.join(', ') || 'aucun'} · hors série : ${horsSerie.length} image(s) · écarts : ${ecarts}.`);
if (ESSAI) {
  console.log('\n' + rapport);
} else {
  if (changees) fs.writeFileSync(P_MANIFESTE, JSON.stringify(manifeste, null, 2));
  fs.writeFileSync(P_RAPPORT, rapport);
  console.log(`Écrit : ${path.relative(RACINE, P_RAPPORT)}${changees ? ' et documents/manifeste.json' : ''}.`);
}
