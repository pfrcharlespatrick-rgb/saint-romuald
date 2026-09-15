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
// Mais la main ne parle qu'une fois. Chaque entrée versée est consignée au
// registre `verse` du fichier de données — son empreinte, la même que calcule
// lieux-commun.js dans le navigateur — et n'est plus jamais réappliquée : une
// entrée déjà versée est sautée, quoi que le fichier de données dise entre-temps.
// Le registre part sur le site avec fiches/lieux.json, et l'atelier retire de
// son travail local ce qui y figure. Sans cela, une modification d'août
// reviendrait en novembre écraser ce qu'une autre main a établi depuis dans le
// dépôt ; c'est exactement ce qui est arrivé le 14 septembre 2026.
//
//   node outils/lieux/fondre.mjs                     applique
//   node outils/lieux/fondre.mjs --essai             montre sans écrire
//   node outils/lieux/fondre.mjs --tenir-pour-verse  consigne au registre, sans
//                                                    rien appliquer : pour un
//                                                    travail déjà intégré à la
//                                                    main, à ne plus rejouer
//
// Une fois versé, on peut relancer `node outils/generer-site.mjs` pour que
// fiches/lieux.json et les fiches de maison suivent.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const CIBLE = path.join(RACINE, 'data', 'lieux-data.js');
const CIBLE_PLANS = path.join(RACINE, 'data', 'plans-data.js');
const TRAVAIL = path.join(RACINE, 'data', 'travail-personnel.json');
const ESSAI = process.argv.includes('--essai');
const TENIR = process.argv.includes('--tenir-pour-verse');

const CHAMPS = ['nom', 'voie', 'adresse_actuelle', 'designe_aujourdhui', 'etat', 'construit', 'disparu',
  'coord', 'source', 'source_ref', 'personnages', 'resume', 'notes', 'occupations',
  'adresses_anciennes', 'cadastre', 'photos', 'documents'];

// Un champ de liste où la main peut avoir retiré quelque chose : on l'applique
// tel quel — la main l'emporte — mais on dit ce qui s'en va.
const LISTES = ['notes', 'occupations', 'adresses_anciennes', 'photos', 'documents'];

// Les champs calculés par le générateur n'ont rien à faire dans le fichier de
// données : ils y feraient double emploi et vieilliraient mal.
const CHAMPS_CALCULES = ['cle_maison', 'maisonnee'];

function chargerGlobal(fichier, nom) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(fichier, 'utf8'), ctx);
  return ctx.window[nom];
}

// Le code du navigateur, tel quel : c'est lui qui calcule les empreintes, et il
// n'y a qu'une façon de les calculer.
const LX = chargerGlobal(path.join(RACINE, 'lieux-commun.js'), 'LX');

function nettoyerOccupation(o) {
  const c = {};
  for (const [k, v] of Object.entries(o)) if (!CHAMPS_CALCULES.includes(k)) c[k] = v;
  return c;
}

function decrire(champ, x) {
  if (champ === 'notes') return `note « ${String(x.texte || '').replace(/\s+/g, ' ').slice(0, 60)}… »`;
  if (champ === 'occupations') return `rattachement ${x.annee} D${x.division} maison ${x.no_maison} (${x.statut})`;
  if (champ === 'photos') return `photo ${x.fichier || ''}`;
  return String(x);
}

if (!fs.existsSync(TRAVAIL)) {
  console.error(`${TRAVAIL} est absent — rien à fondre.`);
  process.exit(1);
}

const travail = JSON.parse(fs.readFileSync(TRAVAIL, 'utf8'));
const suivi = (travail.donnees || {})['suivi-lieux'] || {};
const base = chargerGlobal(CIBLE, 'LIEUX');
const parId = new Map(base.lieux.map((l) => [l.id, l]));
const verse = { ...(base.verse || {}) };
const aujourdhui = new Date().toISOString().slice(0, 10);

const rapport = { modifies: [], ajoutes: [], supprimes: [], retires: [], deja: [], tenus: [] };

for (const [id, mod] of Object.entries(suivi)) {
  const emp = LX.empreinte(mod);
  if (verse[id] && verse[id].empreinte === emp) { rapport.deja.push(id); continue; }
  if (TENIR) { verse[id] = { le: aujourdhui, empreinte: emp }; rapport.tenus.push(id); continue; }

  if (mod._supprime) {
    if (parId.delete(id)) rapport.supprimes.push(id);
    verse[id] = { le: aujourdhui, empreinte: emp };
    continue;
  }
  const existant = parId.get(id);
  const cible = existant || { id, notes: [], occupations: [], adresses_anciennes: [], cadastre: {}, photos: [], documents: [] };
  const touches = [];
  for (const champ of CHAMPS) {
    if (!(champ in mod)) continue;
    const valeur = champ === 'occupations' ? (mod[champ] || []).map(nettoyerOccupation) : mod[champ];
    if (JSON.stringify(cible[champ]) === JSON.stringify(valeur)) continue;
    if (existant && LISTES.includes(champ)) {
      const restants = new Set((valeur || []).map((x) => JSON.stringify(champ === 'occupations' ? nettoyerOccupation(x) : x)));
      for (const x of cible[champ] || []) {
        const cle = JSON.stringify(champ === 'occupations' ? nettoyerOccupation(x) : x);
        if (!restants.has(cle)) rapport.retires.push(`${id} — ${decrire(champ, x)}`);
      }
    }
    cible[champ] = valeur;
    touches.push(champ);
  }
  if (!existant) { parId.set(id, cible); rapport.ajoutes.push(`${id} (${touches.length} champs)`); }
  else if (touches.length) rapport.modifies.push(`${id} — ${touches.join(', ')}`);
  verse[id] = { le: aujourdhui, empreinte: emp };
}

const lieux = [...parId.values()];
const registreChange = JSON.stringify(verse) !== JSON.stringify(base.verse || {});
const sortie = { ...base, mis_a_jour: registreChange ? aujourdhui : base.mis_a_jour, lieux, verse };
const contenu = '// Couche « lieux » du site — voir docs/LIEUX.md.\n' +
  "// Amorcé par outils/lieux/amorcer.mjs, tenu à jour par l'atelier de la carte\n" +
  '// (carte.html, mode Atelier) puis outils/lieux/fondre.mjs.\n' +
  'window.LIEUX = ' + JSON.stringify(sortie, null, 2) + ';\n';

const rien = !rapport.modifies.length && !rapport.ajoutes.length && !rapport.supprimes.length && !rapport.tenus.length;
const prefixe = ESSAI ? '[essai] ' : '';
if (rapport.deja.length) console.log(`${prefixe}${rapport.deja.length} entrée(s) déjà versée(s), laissée(s) telles quelles.`);
if (rien && !registreChange) {
  console.log(`${prefixe}data/lieux-data.js est déjà d'accord avec le travail personnel.`);
} else {
  rapport.ajoutes.forEach((x) => console.log(`${prefixe}  + ${x}`));
  rapport.modifies.forEach((x) => console.log(`${prefixe}  ~ ${x}`));
  rapport.supprimes.forEach((x) => console.log(`${prefixe}  − ${x}`));
  rapport.tenus.forEach((x) => console.log(`${prefixe}  = ${x} — tenu pour versé`));
  if (rapport.retires.length) {
    console.log(`${prefixe}La main a retiré, et on la suit :`);
    rapport.retires.forEach((x) => console.log(`${prefixe}  ✕ ${x}`));
  }
}
if (!ESSAI && (registreChange || !rien)) {
  fs.writeFileSync(CIBLE, contenu);
  console.log(`data/lieux-data.js écrit : ${lieux.length} lieux, ${Object.keys(verse).length} entrée(s) au registre des versements.`);
  console.log('Pensez à rejouer `node outils/generer-site.mjs`.');
} else if (ESSAI) {
  console.log(`[essai] ${CIBLE} non modifié.`);
}

// ─── plans anciens ──────────────────────────────────────────────────────────
// Le calage d'un plan (carte.html, mode Atelier) vit sous `suivi-plans` et se
// verse dans data/plans-data.js — même règle : la main l'emporte, champ par
// champ. Les plans ne passent pas par generer-site.mjs : le fichier de données
// est chargé tel quel par carte.html.

const suiviPlans = (travail.donnees || {})['suivi-plans'] || {};
if (Object.keys(suiviPlans).length && fs.existsSync(CIBLE_PLANS)) {
  const basePlans = chargerGlobal(CIBLE_PLANS, 'PLANS');
  const CHAMPS_PLAN = ['titre', 'annee', 'fichier', 'source', 'note', 'points', 'opacite', 'cale'];
  const touchesPlans = [];
  for (const [id, mod] of Object.entries(suiviPlans)) {
    const plan = (basePlans.plans || []).find((p) => p.id === id);
    if (!plan) { console.warn(`  ? plan inconnu dans suivi-plans, ignoré : ${id}`); continue; }
    const touches = [];
    for (const champ of CHAMPS_PLAN) {
      if (!(champ in mod)) continue;
      if (JSON.stringify(plan[champ]) === JSON.stringify(mod[champ])) continue;
      plan[champ] = mod[champ];
      touches.push(champ);
    }
    if (touches.length) touchesPlans.push(`${id} — ${touches.join(', ')}`);
  }
  if (touchesPlans.length) {
    touchesPlans.forEach((x) => console.log(`${prefixe}  ~ plan ${x}`));
    if (!ESSAI) {
      basePlans.mis_a_jour = new Date().toISOString().slice(0, 10);
      fs.writeFileSync(CIBLE_PLANS,
        '// Plans anciens posés en surimpression de la carte — voir docs/LIEUX.md.\n' +
        '// Calés depuis carte.html (mode Atelier), versés par outils/lieux/fondre.mjs.\n' +
        'window.PLANS = ' + JSON.stringify(basePlans, null, 2) + ';\n');
      console.log(`data/plans-data.js écrit : ${basePlans.plans.length} plan(s).`);
    } else {
      console.log(`[essai] ${CIBLE_PLANS} non modifié.`);
    }
  } else {
    console.log(`${prefixe}data/plans-data.js est déjà d'accord avec le travail personnel.`);
  }
}
