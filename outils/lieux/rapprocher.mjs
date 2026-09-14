#!/usr/bin/env node
// Reprend les rattachements lieu ↔ maison de recensement sur les données
// d'aujourd'hui.
//
// Les occupations de data/lieux-data.js viennent, pour la plupart, des
// `propositions` figées de data/bussiere1990-data.js, établies en août 2026.
// Depuis, les recensements ont été relus au manuscrit : des sexes rétablis,
// des prénoms tranchés, des colonnes reprises. Un rapprochement qui échouait
// sur une graphie fautive réussit aujourd'hui — et personne ne l'a rejoué.
//
// Le cas qui a ouvert la question : le 1604, chemin du Fleuve tient son nom
// d'Albert Forcade. Il porte 1871 (maison 43) et 1891 (maison 509), mais rien
// en 1881 — où Albert est pourtant là, maison 70 de la division 2, marchand,
// avec la même Rosalie. Sa ligne portait « F » au sexe ; elle a été corrigée
// depuis. Le maillon manquait pour une raison qui n'existe plus.
//
// Deux passes :
//
//   continuité — un lieu déjà rattaché désigne un ménage ; on cherche ce même
//                ménage dans les années où le lieu n'a rien. C'est le cas
//                Forcade, et c'est la passe la plus sûre : l'ancre est un
//                rattachement déjà admis, pas un nom lu dans une brochure.
//
//   amorce     — un lieu sans aucun rattachement porte souvent un nom dans son
//                titre ou ses personnages. On cherche ce nom au recensement.
//                Ces pistes se rapportent, jamais ne s'écrivent : « Maison
//                d'Albert Forcade » nomme celui qui l'a bâtie, pas forcément
//                celui qu'on y recense.
//
//   node outils/lieux/rapprocher.mjs            rapport seul, n'écrit rien
//   node outils/lieux/rapprocher.mjs --ecrire   verse les propositions de continuité
//
// La main l'emporte, ici comme ailleurs : une occupation déjà présente n'est
// jamais réécrite, et une occupation `rejete` vaut décision — on ne repropose
// pas ce qui a été écarté.

import fs from 'node:fs';
import path from 'node:path';
import { chargerDonnees, cleMaison, RACINE } from '../lib/charger-donnees.mjs';
import {
  normaliser, clesPrenom, clePatronyme,
  similarPatronyme, similarPrenom, ageEnAnnees
} from '../noms.mjs';

const ECRIRE = process.argv.includes('--ecrire');
const CIBLE = path.join(RACINE, 'data', 'lieux-data.js');
const RAPPORT = path.join(RACINE, 'docs', 'RAPPROCHEMENTS-LIEUX.md');
const AUJOURD_HUI = new Date().toISOString().slice(0, 10);

// Les cinq recensements dépouillés. 1891 n'a qu'une division : le formulaire
// n'en porte pas (docs/DIVISIONS-1891.md).
const CORPUS = [
  { annee: '1871', division: '1' }, { annee: '1871', division: '2' },
  { annee: '1881', division: '1' }, { annee: '1881', division: '2' },
  { annee: '1891', division: '1' }
];
const ANNEES = ['1871', '1881', '1891'];

const d = chargerDonnees();
const lieux = d.lieux;

// ───────────────────────── index des personnes ─────────────────────────

const parPatronyme = new Map(); // clé de patronyme -> [personne, ...]
for (const p of d.personnes.values()) {
  const cle = clePatronyme(p.nom);
  if (!cle) continue;
  if (!parPatronyme.has(cle)) parPatronyme.set(cle, []);
  parPatronyme.get(cle).push(p);
}

const PATRONYMES = new Set(parPatronyme.keys());

function fiche(p) {
  return {
    id: p.id, nom: p.nom, prenom: p.prenom,
    age: ageEnAnnees(p.age), profession: p.profession || '',
    annee: p.annee, division: p.division, no_maison: p.no_maison,
    chef: !!p.chef,
    cle: cleMaison(p.annee, p.division, p.no_maison)
  };
}

/** Les personnes d'une maison, dans l'ordre du registre. */
function habitants(cle) {
  const m = d.maisons.get(cle);
  if (!m) return [];
  const out = [];
  for (const f of m.familles) for (const id of f.membres) {
    const p = d.personnes.get(id);
    if (p) out.push(p);
  }
  return out;
}

/** Une personne est-elle la même qu'une autre, une décennie plus tard ? */
function memePersonne(a, b) {
  const pat = similarPatronyme(clePatronyme(a.nom), clePatronyme(b.nom));
  if (pat < 0.85) return null;
  const pre = similarPrenom(clesPrenom(a.prenom), clesPrenom(b.prenom));
  if (pre < 0.75) return null;
  const ageA = ageEnAnnees(a.age), ageB = ageEnAnnees(b.age);
  const ecartAns = Number(b.annee) - Number(a.annee);
  let ecartAge = null;
  if (ageA != null && ageB != null) {
    ecartAge = Math.abs((ageB - ageA) - ecartAns);
    // Les âges du 19e siècle sont déclarés, souvent arrondis : quatre ans de
    // battement sur une décennie, pas davantage — au-delà on ne prouve rien.
    if (ecartAge > 4) return null;
  }
  if (a.sexe && b.sexe && a.sexe !== b.sexe) return null;
  return { pat, pre, ecartAge };
}

/** Candidats d'une année pour une personne donnée. */
function candidatsPour(personne, annee) {
  const cle = clePatronyme(personne.nom);
  const seaux = new Set();
  for (const k of PATRONYMES) if (similarPatronyme(cle, k) >= 0.85) seaux.add(k);
  const out = [];
  for (const k of seaux) {
    for (const q of parPatronyme.get(k)) {
      if (q.annee !== annee) continue;
      const m = memePersonne(personne, q);
      if (m) out.push({ personne: q, ...m });
    }
  }
  return out;
}


// ───────────────────────── garde-fous ─────────────────────────
//
// Suivre un homme n'est pas suivre un lieu. C'est la leçon fondatrice de
// docs/LIEUX.md : Edward Benson habite le manoir Longwood en 1871 et la maison
// neuve du 1871, chemin du Fleuve en 1881. Un rapprochement qui se contente de
// retrouver le nom rattacherait les deux au même emplacement, et se tromperait
// une fois sur deux. Trois questions arrêtent la proposition avant qu'elle
// n'existe.

/** L'année de construction, et ce qu'elle vaut. « v.1884 » n'est pas « 1884 ». */
function construction(lieu) {
  const t = String(lieu.construit || '');
  const m = t.match(/(\d{4})/);
  if (!m) return null;
  // « v. » (vers) et « fin 19e siècle » : la date est approchée. Cinq ans de
  // battement, pas davantage — au-delà on cesse de dater quoi que ce soit.
  return { annee: Number(m[1]), tolerance: /v\.|vers|circa|env/i.test(t) ? 5 : 0, texte: t };
}

/** Le lieu existait-il à cette date ? */
function existaitEn(lieu, annee) {
  const c = construction(lieu);
  if (!c) return { verdict: 'ok' };
  const an = Number(annee);
  if (an >= c.annee) return { verdict: 'ok' };
  if (an >= c.annee - c.tolerance) {
    return { verdict: 'limite', dit: `${c.texte} — la date est approchée, ${annee} tombe dans son battement` };
  }
  return { verdict: 'impossible', dit: `bâti en ${c.texte}, soit ${c.annee - an} an(s) après le recensement de ${annee}` };
}

/** Les maisons déjà rattachées à un lieu — une maison n'a qu'un emplacement. */
const occupeePar = new Map(); // cleMaison -> [idLieu, ...]
for (const l of lieux) {
  for (const o of l.occupations || []) {
    if (o.statut === 'rejete') continue;
    const cle = cleMaison(o.annee, o.division, o.no_maison);
    if (!occupeePar.has(cle)) occupeePar.set(cle, []);
    occupeePar.get(cle).push(l.id);
  }
}

const conflits = [];
const impossibles = [];

// ── ce que Patrick a refusé ──
//
// Une proposition supprimée du fichier ne laisse plus rien pour l'arrêter : la
// passe suivante la retrouverait et la réécrirait, indéfiniment. La règle du
// projet vaut ici comme ailleurs — la main l'emporte — mais elle a besoin d'un
// endroit où se souvenir. Le voici.
//
// Une ligne : [lieu, année, maison, la raison du refus, la date].
const ECARTES = [
  ['65-college', '1871', '9', 'trois Joseph Roberge chefs de ménage coexistent en 1871', '2026-09-13'],
  ['65-college', '1881', '32', 'deux Joseph Roberge chefs de ménage en 1881', '2026-09-13'],
  ['105-college', '1871', '94', 'deux Vallières chefs de ménage en 1871', '2026-09-13'],
  ['2052-cf', '1871', '18', 'ménage de Narcisse Cantin ; Pierre y a trois ans', '2026-09-13'],
  ['2052-cf', '1891', '291', 'ménage de Narcisse Cantin ; Pierre y est étudiant chez son père', '2026-09-13'],
  ['2058-2060-cf', '1871', '78', 'bâtiment commercial de v.1925', '2026-09-13'],
  ['2058-2060-cf', '1891', '405', 'bâtiment commercial de v.1925', '2026-09-13'],
  ['2071-2065-cf', '1881', '244', 'villas bâties en 1908-1909', '2026-09-13'],
  ['2071-2065-cf', '1891', '622', 'villas bâties en 1908-1909', '2026-09-13'],
  ['2416-cf', '1891', '67', 'maison de v.1910 ; Alphonse Villeneuve est chez son père', '2026-09-13'],
  ['2426-cf', '1891', '67', 'ménage de Ferdinand Villeneuve ; Joseph y est chez son père', '2026-09-13'],
];

const refuses = new Set(ECARTES.map(([id, an, no]) => `${id}|${an}|${no}`));
const refusesParLieuAnnee = new Set(ECARTES.map(([id, an]) => `${id}|${an}`));
const refusesRencontres = [];

// ───────────────────────── passe « continuité » ─────────────────────────
//
// L'ancre d'un lieu, c'est le chef de la maison qui y est déjà rattachée. On
// le suit d'un recensement à l'autre. Un corroborant — épouse, enfant, parent
// du même toit retrouvé au même toit — vaut mieux qu'un homonyme isolé : deux
// personnes qui déménagent ensemble ne sont plus une coïncidence.

function corroborants(ancreCle, cibleCle) {
  const source = habitants(ancreCle), cible = habitants(cibleCle);
  const noms = [];
  for (const a of source) {
    for (const b of cible) {
      if (a.id === b.id) continue;
      if (memePersonne(a, b)) { noms.push(`${b.prenom} ${b.nom}`); break; }
    }
  }
  return noms;
}

function continuite(lieu) {
  const admises = (lieu.occupations || []).filter((o) => o.statut !== 'rejete');
  if (!admises.length) return [];
  const dejaVues = new Set((lieu.occupations || []).map((o) => o.annee));

  // Les ancres : le chef de chaque maison déjà rattachée.
  const ancres = [];
  for (const o of admises) {
    const cle = cleMaison(o.annee, o.division, o.no_maison);
    for (const p of habitants(cle)) if (p.chef) ancres.push(p);
  }
  if (!ancres.length) return [];

  const propositions = [];
  for (const annee of ANNEES) {
    if (dejaVues.has(annee)) continue;

    // Question préalable : l'année a-t-elle déjà été refusée pour ce lieu ?
    // Le refus porte sur l'année entière, non sur un numéro de maison. Quand
    // Patrick écarte un Joseph Roberge parce que trois hommes de ce nom tiennent
    // maison la même année, lui proposer le deuxième puis le troisième ne
    // répond pas à son objection : c'est la reposer.
    if (refusesParLieuAnnee.has(`${lieu.id}|${annee}`)) {
      refusesRencontres.push({ lieu: lieu.id, annee });
      continue;
    }

    // Première question : le lieu existait-il ? Une maison bâtie en 1878 ne
    // loge personne en 1871, quelque nom qu'on y retrouve.
    const age = existaitEn(lieu, annee);
    if (age.verdict === 'impossible') {
      impossibles.push({ lieu: lieu.id, annee, raison: age.dit, nature: 'proposition écartée' });
      continue;
    }

    const trouves = new Map(); // cleMaison -> meilleur candidat
    for (const ancre of ancres) {
      for (const c of candidatsPour(ancre, annee)) {
        const cle = c.personne.cle || cleMaison(c.personne.annee, c.personne.division, c.personne.no_maison);
        const precedent = trouves.get(cle);
        const score = (c.personne.chef ? 2 : 0) + (c.ecartAge != null ? Math.max(0, 2 - c.ecartAge / 2) : 0);
        if (!precedent || score > precedent.score) {
          trouves.set(cle, { ...c, score, ancre, cleAncre: cleMaison(ancre.annee, ancre.division, ancre.no_maison) });
        }
      }
    }
    if (!trouves.size) continue;

    const liste = [...trouves.entries()].map(([cle, c]) => ({
      cle, ...c, corroborants: corroborants(c.cleAncre, cle)
    })).sort((a, b) =>
      (b.corroborants.length - a.corroborants.length) || (b.score - a.score));

    // Deuxième question : cette maison est-elle déjà posée ailleurs ? Une
    // maison de recensement se tient à un seul endroit. Si elle est prise,
    // c'est que l'homme a déménagé — ou que l'un des deux rattachements est
    // faux. Dans les deux cas la question se pose à Patrick, pas au script.
    const libres = liste.filter((c) => {
      // Refusé à la main : on ne repropose pas ce qui a été tranché.
      if (refuses.has(`${lieu.id}|${annee}|${c.personne.no_maison}`)) {
        refusesRencontres.push({ lieu: lieu.id, annee, no_maison: c.personne.no_maison });
        return false;
      }
      const pris = (occupeePar.get(c.cle) || []).filter((id) => id !== lieu.id);
      if (!pris.length) return true;
      conflits.push({
        lieu: lieu.id, annee, cle: c.cle,
        no_maison: c.personne.no_maison, division: c.personne.division,
        pris, personne: c.personne, ancre: c.ancre
      });
      return false;
    });
    if (!libres.length) continue;

    const meilleur = libres[0];
    const seul = libres.length === 1;
    const chef = meilleur.personne.chef;
    const corr = meilleur.corroborants.length;

    // Troisième question : l'homme retrouvé tient-il maison ? Un fils de
    // vingt-trois ans recensé chez son père habite la maison de son père.
    // C'est une filiation, pas une occupation.
    if (!chef) {
      impossibles.push({
        lieu: lieu.id, annee,
        raison: `${meilleur.personne.prenom} ${meilleur.personne.nom} y est recensé sans être chef de ménage (${annee}, division ${meilleur.personne.division}, maison ${meilleur.personne.no_maison}) — il y loge, il n'y tient pas maison`,
        nature: 'proposition écartée'
      });
      continue;
    }

    // La confiance ne se décrète pas : elle dit combien de preuves tiennent.
    let confiance;
    if (seul && chef && corr >= 1) confiance = 'forte';
    else if (seul && chef) confiance = 'moyenne';
    else if (chef && corr >= 1) confiance = 'moyenne';
    else confiance = 'faible';
    if (age.verdict === 'limite' && confiance === 'forte') confiance = 'moyenne';

    propositions.push({
      limite: age.verdict === 'limite' ? age.dit : '',
      lieu: lieu.id, annee,
      division: meilleur.personne.division,
      no_maison: meilleur.personne.no_maison,
      confiance,
      personne: meilleur.personne,
      ancre: meilleur.ancre,
      corroborants: meilleur.corroborants,
      ecartAge: meilleur.ecartAge,
      concurrents: libres.slice(1).map((c) => `${c.personne.prenom} ${c.personne.nom} (maison ${c.personne.no_maison})`)
    });
  }
  return propositions;
}

// ───────────────────────── passe « amorce » ─────────────────────────
//
// Lire un nom dans « Maison d'Albert Forcade » ou dans la ligne des
// personnages. On n'accepte un mot comme patronyme que s'il existe au
// recensement : c'est le corpus qui arbitre, pas une liste écrite d'avance.

const MOTS_VIDES = new Set([
  'maison', 'la', 'le', 'les', 'de', 'du', 'des', 'd', 'l', 'et', 'ou', 'a', 'au', 'aux',
  'famille', 'familles', 'freres', 'frere', 'fils', 'fille', 'dit', 'dite', 'prop', 'puis',
  'son', 'sa', 'ses', 'leur', 'chez', 'par', 'pour', 'dans', 'sur', 'depuis', 'jusqu',
  'architecte', 'docteur', 'dr', 'me', 'madame', 'monsieur', 'mme', 'm', 'veuve',
  'premier', 'premiere', 'ancien', 'ancienne', 'nouveau', 'construites', 'construite',
  'terrains', 'terrain', 'cabinet', 'atelier', 'magasin', 'bureau', 'poste', 'ltd',
  'company', 'acquereur', 'achat', 'vendue', 'installation', 'venant', 'bâtisseur', 'batisseur',
  'proprietaire', 'propriete', 'maire', 'notaire', 'avocat', 'marchand', 'navigateur',
  'cultivateur', 'entrepreneur', 'sculpteur', 'forgeron', 'menuisier', 'tailleur',
  'mesureur', 'bois', 'ne', 'nee', 'decede', 'epouse', 'sr', 'jr', 'ii', 'iii'
]);

function nomsDansTexte(texte) {
  const brut = String(texte || '');
  // On garde la casse : un prénom commence par une majuscule, un métier non.
  const jetons = brut.split(/[^A-Za-zÀ-ÿ'’-]+/).filter(Boolean);
  const trouves = [];
  for (let i = 0; i < jetons.length; i++) {
    const cle = clePatronyme(jetons[i]);
    if (!cle || cle.length < 3 || !PATRONYMES.has(cle)) continue;
    // Le mot précédent fait-il un prénom ? Majuscule, hors mots vides, et
    // reconnu comme prénom quelque part au recensement.
    let prenom = '';
    const avant = jetons[i - 1];
    if (avant && /^[A-ZÀ-Ÿ]/.test(avant) && !MOTS_VIDES.has(normaliser(avant))) {
      prenom = avant;
    }
    trouves.push({ prenom, nom: jetons[i], cle });
  }
  return trouves;
}

// Au-delà de quel nombre de ménages un patronyme cesse-t-il de renseigner ?
// « Roberge » en compte soixante-quatorze : la liste ne se lit plus, et proposer
// soixante-quatorze pistes n'est pas proposer une piste.
const TROP_REPANDU = 15;

function amorce(lieu) {
  // Le titre et les personnages nomment court ; les notes nomment au fil du
  // texte. Les deux valent, mais pas au même prix : dans une notice de la
  // Société d'histoire, un patronyme isolé est le plus souvent un homonyme de
  // passage, alors qu'un prénom accolé à un nom désigne quelqu'un. On n'y
  // retient donc que les noms complets — c'est ainsi que « Joseph Bourassa
  // père achète la propriété en 1859 » a rendu le 143, rue Demers.
  const brefs = nomsDansTexte([lieu.nom || '', lieu.personnages || ''].join(' ; '));
  const longs = nomsDansTexte((lieu.notes || []).map((n) => n.texte || '').join(' ; '))
    .filter((n) => n.prenom);
  const noms = [...brefs, ...longs];
  if (!noms.length) return [];
  const vus = new Set();
  const pistes = [];
  for (const n of noms) {
    const signature = n.cle + '/' + normaliser(n.prenom);
    if (vus.has(signature)) continue;
    vus.add(signature);
    const clesP = n.prenom ? clesPrenom(n.prenom) : null;
    const menages = new Map();
    for (const k of PATRONYMES) {
      if (similarPatronyme(n.cle, k) < 0.85) continue;
      for (const p of parPatronyme.get(k)) {
        if (clesP && similarPrenom(clesP, clesPrenom(p.prenom)) < 0.75) continue;
        if (!p.chef) continue; // on ne retient que les chefs de ménage
        const cle = cleMaison(p.annee, p.division, p.no_maison);
        if (!menages.has(cle)) menages.set(cle, p);
      }
    }
    if (!menages.size) continue;
    pistes.push({
      lieu: lieu.id,
      cherche: (n.prenom ? n.prenom + ' ' : '') + n.nom,
      repandu: menages.size > TROP_REPANDU,
      menages: [...menages.values()]
    });
  }
  return pistes;
}

// ───────────────────────── exécution ─────────────────────────

// ── audit des rattachements déjà en place ──
// Ils datent d'août, et personne ne les a confrontés aux dates de bâti depuis.
const contradictions = [];
for (const l of lieux) {
  for (const o of l.occupations || []) {
    if (o.statut === 'rejete') continue;
    const age = existaitEn(l, o.annee);
    if (age.verdict === 'impossible') {
      contradictions.push({ lieu: l.id, occupation: o, raison: age.dit });
    }
  }
}

// Une maison de recensement rattachée à plusieurs lieux : l'un des deux est faux.
const partagees = [];
for (const [cle, ids] of occupeePar) {
  if (ids.length > 1) partagees.push({ cle, ids });
}

const toutesContinuites = [];
const toutesAmorces = [];
for (const l of lieux) {
  const c = continuite(l);
  if (c.length) toutesContinuites.push(...c);
  if (!(l.occupations || []).some((o) => o.statut !== 'rejete')) {
    const a = amorce(l);
    if (a.length) toutesAmorces.push(...a);
  }
}

const parLieu = Object.fromEntries(lieux.map((l) => [l.id, l]));

// ───────────────────────── rapport ─────────────────────────

function lignesContinuite() {
  if (!toutesContinuites.length) return ['Aucune : chaque lieu rattaché l\'est déjà pour les trois recensements.\n'];
  const out = [];
  const ordre = { forte: 0, moyenne: 1, faible: 2 };
  for (const p of [...toutesContinuites].sort((a, b) => (ordre[a.confiance] - ordre[b.confiance]) || a.lieu.localeCompare(b.lieu))) {
    const l = parLieu[p.lieu];
    const ancre = p.ancre;
    out.push(`### ${l.nom || l.id} — ${p.annee}, division ${p.division}, maison ${p.no_maison}`);
    out.push('');
    out.push(`*Confiance : **${p.confiance}**.* Lieu \`${p.lieu}\`${l.adresse_actuelle ? ' — ' + l.adresse_actuelle : ''}.`);
    out.push('');
    out.push(`- **Ancre** : ${ancre.prenom} ${ancre.nom}, ${ancre.age || '?'} a.${ancre.profession ? ', ' + ancre.profession : ''} — ${ancre.annee}, division ${ancre.division}, maison ${ancre.no_maison} (rattachement déjà admis).`);
    out.push(`- **Retrouvé** : ${p.personne.prenom} ${p.personne.nom}, ${p.personne.age || '?'} a.${p.personne.profession ? ', ' + p.personne.profession : ''}${p.personne.chef ? ', chef de ménage' : ', **pas chef de ménage**'}.`);
    if (p.ecartAge != null) out.push(`- **Âge** : cohérent à ${p.ecartAge} an${p.ecartAge > 1 ? 's' : ''} près sur la décennie.`);
    else out.push('- **Âge** : illisible d\'un côté ou de l\'autre — ne prouve rien.');
    if (p.corroborants.length) out.push(`- **Sous le même toit** : ${p.corroborants.join(', ')} — ${p.corroborants.length} personne${p.corroborants.length > 1 ? 's' : ''} du ménage précédent s'y retrouve${p.corroborants.length > 1 ? 'nt' : ''}.`);
    else out.push('- **Sous le même toit** : personne du ménage précédent. Le rapprochement tient sur un seul nom.');
    if (p.concurrents.length) out.push(`- **Autres candidats** : ${p.concurrents.join(' ; ')}.`);
    out.push('');
  }
  return out;
}

function lignesAmorce() {
  if (!toutesAmorces.length) return ['Aucune piste : les lieux sans rattachement ne portent aucun nom lisible au recensement.\n'];
  const out = [];
  const groupes = new Map();
  for (const p of toutesAmorces) {
    if (!groupes.has(p.lieu)) groupes.set(p.lieu, []);
    groupes.get(p.lieu).push(p);
  }
  for (const [id, pistes] of groupes) {
    const l = parLieu[id];
    out.push(`### ${l.nom || id}${l.adresse_actuelle ? ' — ' + l.adresse_actuelle : ''}`);
    out.push('');
    if (l.personnages) out.push(`> ${l.personnages}`, '');
    for (const p of pistes) {
      if (p.repandu) {
        out.push(`- **${p.cherche}** → ${p.menages.length} ménages : nom trop répandu au village pour qu'une liste renseigne. Il faudra un prénom, une date d'acquisition ou un numéro de lot.`);
        continue;
      }
      const menages = p.menages
        .sort((a, b) => Number(a.annee) - Number(b.annee))
        .map((m) => `${m.annee} D${m.division} maison ${m.no_maison} (${m.prenom} ${m.nom}, ${ageEnAnnees(m.age) ?? '?'} a.${m.profession ? ', ' + m.profession : ''})`);
      out.push(`- **${p.cherche}** → ${menages.length} ménage${menages.length > 1 ? 's' : ''} : ${menages.join(' ; ')}`);
    }
    out.push('');
  }
  return out;
}

function lignesContradictions() {
  if (!contradictions.length) return ['Aucune : tous les rattachements en place sont compatibles avec la date de bâti.\n'];
  const out = [];
  for (const c of contradictions) {
    const l = parLieu[c.lieu];
    const o = c.occupation;
    out.push(`- **${l.nom || c.lieu}**${l.adresse_actuelle ? ' (' + l.adresse_actuelle + ')' : ''} — rattachement ${o.annee}, division ${o.division}, maison ${o.no_maison} : ${c.raison}.`);
    out.push(`  <br>Motif inscrit : « ${o.motif} »`);
  }
  out.push('');
  return out;
}

function lignesPartagees() {
  if (!partagees.length) return ['Aucune : chaque maison rattachée ne l\'est qu\'à un seul lieu.\n'];
  const out = [];
  for (const p of partagees) {
    const [, annee, div, no] = p.cle.match(/^(\d+)-D(\d+)-M(.+)$/) || [];
    const m = d.maisons.get(p.cle);
    const chef = m && m.familles[0] ? d.personnes.get(m.familles[0].membres[0]) : null;
    out.push(`- **${annee}, division ${div}, maison ${no}**${chef ? ' — ' + chef.prenom + ' ' + chef.nom + ', ' + (chef.age || '?') + ' a.' + (chef.profession ? ', ' + chef.profession : '') : ''}`);
    out.push(`  <br>rattachée à ${p.ids.length} lieux : ${p.ids.map((id) => (parLieu[id] || {}).nom || id).join(' · ')}`);
  }
  out.push('');
  return out;
}

function lignesEcartes() {
  const out = [];
  if (!impossibles.length && !conflits.length) return ['Rien : la reprise n\'a rencontré aucun cas douteux.\n'];
  if (impossibles.length) {
    out.push('**Dates et statuts.**', '');
    for (const i of impossibles) {
      const l = parLieu[i.lieu];
      out.push(`- ${l.nom || i.lieu} — ${i.annee} : ${i.raison}.`);
    }
    out.push('');
  }
  if (conflits.length) {
    out.push('**Maisons déjà prises ailleurs.** Le ménage s\'y retrouve, mais la maison appartient déjà à un autre emplacement : c\'est le signe d\'un déménagement, ou d\'une erreur à trancher.', '');
    for (const c of conflits) {
      const l = parLieu[c.lieu];
      out.push(`- ${l.nom || c.lieu} — ${c.annee}, division ${c.division}, maison ${c.no_maison} : ${c.personne.prenom} ${c.personne.nom} y est bien, mais la maison est déjà rattachée à ${c.pris.map((id) => (parLieu[id] || {}).nom || id).join(', ')}.`);
    }
    out.push('');
  }
  return out;
}

const rapport = [
  '# Reprise des rattachements lieu ↔ maison',
  '',
  `*Établi le ${AUJOURD_HUI} par \`outils/lieux/rapprocher.mjs\`, sur les cinq recensements dépouillés.*`,
  '',
  'Les occupations de la couche des lieux ont été posées en août 2026, à partir',
  'des propositions de la brochure Bussière. Les recensements ont été relus depuis :',
  'des sexes rétablis, des prénoms tranchés, des colonnes reprises. Ce rapport rejoue',
  'les rapprochements sur les données d\'aujourd\'hui.',
  '',
  '**Rien ici ne vaut décision.** Une proposition « forte » reste une proposition :',
  'elle dit qu\'un homme du même nom, du même âge, entouré des mêmes gens, se trouve',
  'là au recensement suivant. Elle ne dit pas qu\'il n\'a pas déménagé dans la maison',
  'd\'à côté. C\'est à Patrick de trancher, à l\'atelier de la carte.',
  '',
  '---',
  '',
  '## 1. Continuité — les maillons manquants',
  '',
  'Un lieu déjà rattaché désigne un ménage. On suit ce ménage dans les années où le',
  'lieu ne porte rien. L\'ancre est un rattachement déjà admis, non un nom lu dans une',
  'brochure : c\'est la passe la plus sûre.',
  '',
  ...lignesContinuite(),
  '---',
  '',
  '## 2. Ce qui ne tient plus — rattachements déjà en place',
  '',
  'Ces rattachements figurent aujourd\'hui dans la couche des lieux. Confrontés à',
  'la date de construction du bâtiment, ils sont impossibles. Ils viennent des',
  'propositions de la brochure, qui rattachait un nom à une adresse sans dater le',
  'rattachement — c\'est exactement le défaut que la couche des lieux a été écrite',
  'pour corriger.',
  '',
  ...lignesContradictions(),
  '---',
  '',
  '## 3. Une maison, deux emplacements',
  '',
  'Une maison de recensement se tient à un seul endroit. Quand elle est rattachée à',
  'plusieurs lieux, au moins un des rattachements est faux — le plus souvent parce',
  'qu\'un fils recensé chez son père a été porté au crédit de la maison qu\'il',
  'habitera plus tard.',
  '',
  ...lignesPartagees(),
  '---',
  '',
  '## 4. Écarté en chemin',
  '',
  ...(refusesRencontres.length ? [
    `**Refusés à la main** (${refusesRencontres.length}). La reprise les a retrouvés et s'est arrêtée : ils figurent dans \`ECARTES\`, en tête de \`outils/lieux/rapprocher.mjs\`, avec le motif du refus.`,
    '',
    ...ECARTES.map(([id, an, no, pourquoi, date]) =>
      `- ${(parLieu[id] || {}).nom || id} — ${an}, maison ${no} : ${pourquoi} *(refusé le ${date})*.`),
    ''
  ] : []),
  '',
  'Ce que la reprise a trouvé puis rejeté, et pourquoi. C\'est la part la plus utile',
  'du rapport : elle dit ce qu\'un rapprochement naïf aurait écrit.',
  '',
  ...lignesEcartes(),
  '---',
  '',
  '## 5. Amorce — les lieux sans aucun rattachement',
  '',
  'Ces lieux portent un nom dans leur titre ou leurs personnages, et ce nom se trouve',
  'au recensement. **Ce sont des pistes, pas des rapprochements** : « Maison d\'Albert',
  'Forcade » nomme celui qui l\'a bâtie ou qui l\'a marquée, pas nécessairement celui',
  'qu\'on y recense telle année. Rien n\'est versé automatiquement.',
  '',
  ...lignesAmorce()
].join('\n');

fs.writeFileSync(RAPPORT, rapport);

const forte = toutesContinuites.filter((p) => p.confiance === 'forte');
console.log(`Continuité : ${toutesContinuites.length} maillon(s) manquant(s) trouvé(s) — ${forte.length} de confiance forte.`);
console.log(`Amorce    : ${toutesAmorces.length} piste(s) sur ${lieux.filter((l) => !(l.occupations || []).some((o) => o.statut !== 'rejete')).length} lieu(x) sans rattachement.`);
console.log(`Rapport   : docs/RAPPROCHEMENTS-LIEUX.md`);

if (!ECRIRE) {
  console.log('\nRien n\'a été écrit. `--ecrire` verse les propositions de continuité dans data/lieux-data.js.');
  process.exit(0);
}

// ───────────────────────── versement ─────────────────────────
// Seule la passe « continuité » est versée, et toujours en `propose` : le
// fichier dit d'où vient chaque rattachement, et la décision reste à prendre.

const brut = fs.readFileSync(CIBLE, 'utf8');
const egal = brut.indexOf('=', brut.indexOf('window.'));
const LIEUX = JSON.parse(brut.slice(egal + 1).trim().replace(/;$/, ''));
const index = new Map(LIEUX.lieux.map((l) => [l.id, l]));
let verses = 0;

for (const p of toutesContinuites) {
  const l = index.get(p.lieu);
  if (!l) continue;
  // La main l'emporte : on ne touche pas à une année déjà tranchée, fût-ce
  // par un rejet.
  if ((l.occupations || []).some((o) => o.annee === p.annee)) continue;
  const preuves = [];
  if (p.ecartAge != null) preuves.push(`âge cohérent à ${p.ecartAge} an${p.ecartAge > 1 ? 's' : ''} près`);
  if (p.corroborants.length) preuves.push(`${p.corroborants.length} personne${p.corroborants.length > 1 ? 's' : ''} du même ménage retrouvée${p.corroborants.length > 1 ? 's' : ''} : ${p.corroborants.join(', ')}`);
  if (p.concurrents.length) preuves.push(`autres candidats : ${p.concurrents.join(' ; ')}`);
  l.occupations.push({
    annee: p.annee, division: p.division, no_maison: p.no_maison,
    statut: 'propose', confiance: p.confiance, origine: 'chercheur',
    motif: `${p.personne.prenom} ${p.personne.nom}, ${p.personne.age ?? '?'} a.${p.personne.profession ? ', ' + p.personne.profession : ''} — suivi depuis ${p.ancre.annee} (division ${p.ancre.division}, maison ${p.ancre.no_maison})${preuves.length ? ' ; ' + preuves.join(' ; ') : ''}`,
    ajoute_le: AUJOURD_HUI
  });
  l.occupations.sort((a, b) => Number(a.annee) - Number(b.annee));
  verses++;
}

LIEUX.mis_a_jour = AUJOURD_HUI;
const contenu = '// Couche « lieux » du site — voir docs/LIEUX.md.\n' +
  "// Amorcé par outils/lieux/amorcer.mjs, tenu à jour par l'atelier de la carte\n" +
  '// (carte.html, mode Atelier) puis outils/lieux/fondre.mjs.\n' +
  'window.LIEUX = ' + JSON.stringify(LIEUX, null, 2) + ';\n';
fs.writeFileSync(CIBLE, contenu);
console.log(`\ndata/lieux-data.js : ${verses} occupation(s) versée(s) en « propose ».`);
