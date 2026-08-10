#!/usr/bin/env node
// Générateur du site public (chantier 2 de la refonte — voir docs/REFONTE.md).
// Lit data/*.js et documents/manifeste.json, produit :
//   recherche-index.json           — index compact, chargé par index.html
//   fiches/personne/<annee-D>.json — fiches de personne, par lot annee-division
//   fiches/maison/<annee-D>.json   — fiches de maison, par lot annee-division
//   fiches/lieux.json              — lieux résolus, pour carte.html et lieu.html
//   stats-donnees.json             — statistiques précalculées pour stats.html
//
// Rejouer après toute mise à jour de data/* : `node outils/generer-site.mjs`.
// Ne modifie jamais data/* ni documents/* — lecture seule.

import fs from 'node:fs';
import path from 'node:path';
import { chargerDonnees, RACINE, cleMaison } from './lib/charger-donnees.mjs';
import { colonnesDe, nettoyerRemarque, nomComplet, etatCivil } from './lib/colonnes.mjs';

const d = chargerDonnees();

function ecrireJson(cheminRelatif, valeur) {
  const chemin = path.join(RACINE, cheminRelatif);
  fs.mkdirSync(path.dirname(chemin), { recursive: true });
  fs.writeFileSync(chemin, JSON.stringify(valeur));
  return chemin;
}

// ───────────────────────── index de recherche ─────────────────────────
// [id, "Prénom Nom", profession] — l'année et la division se lisent dans
// l'id (AAAA-Ddivision-...). Volontairement minimal : sous les 500 Ko pour
// les 10 000+ personnes (critère du chantier 2).

const index = [];
for (const p of d.personnes.values()) {
  index.push([p.id, nomComplet(p), p.profession || '']);
}
const cheminIndex = ecrireJson('recherche-index.json', index);
const octetsIndex = fs.statSync(cheminIndex).size;
console.log(`recherche-index.json : ${index.length} personnes, ${(octetsIndex / 1024).toFixed(1)} Ko`);
if (octetsIndex > 500 * 1000) {
  console.warn('  ATTENTION : dépasse le budget de 500 Ko fixé par docs/REFONTE.md');
}

// ───────────────────────── trajectoire d'une personne ─────────────────────────

function mentionDe(id) {
  const p = d.personnes.get(id);
  if (!p) return null;
  const attributs = [];
  if (p.age) attributs.push(`${p.age} ans`);
  attributs.push(`maison ${p.no_maison}, famille ${p.no_famille}`);
  if (p.chef) attributs.push('chef(fe) de ménage');
  return {
    id, annee: p.annee, division: p.division,
    nom: nomComplet(p), attribut: attributs.join(' · '),
    page_ms: p.page_ms, ligne: p.ligne
  };
}

function trajectoireDe(id) {
  const chaine = [id];
  const liaisons = [];
  let cur = id;
  while (true) {
    const pred = (d.liensVers.get(cur) || [])[0];
    if (!pred || chaine.includes(pred.de)) break;
    chaine.unshift(pred.de);
    liaisons.unshift(pred);
    cur = pred.de;
  }
  cur = id;
  while (true) {
    const succ = (d.liensDe.get(cur) || [])[0];
    if (!succ || chaine.includes(succ.vers)) break;
    chaine.push(succ.vers);
    liaisons.push(succ);
    cur = succ.vers;
  }
  if (chaine.length < 2) return null;
  return {
    mentions: chaine.map(mentionDe).filter(Boolean),
    liaisons: liaisons.map((l) => ({
      confiance: l.confiance, motifs: l.motifs || [], score: l.score
    }))
  };
}

// ───────────────────────── fiches de personne ─────────────────────────

const parLotPersonne = new Map(); // "annee-Ddivision" -> { id: fiche }

for (const p of d.personnes.values()) {
  const cleAD = `${p.annee}-D${p.division}`;
  if (!parLotPersonne.has(cleAD)) parLotPersonne.set(cleAD, {});
  const lot = parLotPersonne.get(cleAD);

  const cleM = cleMaison(p.annee, p.division, p.no_maison);
  const maison = d.maisons.get(cleM);
  const famille = maison?.familles.find((f) => String(f.no_famille) === String(p.no_famille));
  const cols = colonnesDe(Number(p.annee));
  const maisonnee = famille ? {
    entetes: cols.entetes,
    lignes: famille.membres.map((mid) => {
      const m = d.personnes.get(mid);
      if (!m) return null;
      return { id: mid, ligne: m.ligne, chef: !!m.chef, courante: mid === p.id, valeurs: cols.valeurs(m) };
    }).filter(Boolean)
  } : null;

  const evenements = (d.evenementsParPersonne.get(p.id) || [])
    .filter((e) => e.resume)
    .map((e) => ({ type: e.type, resume: e.resume, confiance: e.confiance }));

  const documents = (d.documentsParPersonne.get(p.id) || []).map((doc) => ({
    id: doc.id, titre: doc.titre, type: doc.type,
    affirmations: (doc.affirmations || [])
      .filter((a) => (a.personnes || []).includes(p.id))
      .map((a) => ({ enonce: a.enonce, certitude: a.certitude, type: a.type }))
  }));

  lot[p.id] = {
    id: p.id, nom: p.nom, prenom: p.prenom, sexe: p.sexe, age: p.age,
    profession: p.profession, etat_matrimonial: p.etat_matrimonial,
    etat_civil: etatCivil(p),
    annee: p.annee, division: p.division,
    no_maison: p.no_maison, no_famille: p.no_famille, chef: !!p.chef,
    page_ms: p.page_ms, ligne: p.ligne,
    incertain: !!p.incertain,
    remarque: nettoyerRemarque(p.remarque),
    cle_maison: cleM,
    // Où cette personne habitait, quand le rattachement au sol est fait.
    lieux: (d.lieuxParMaison.get(cleM) || []).map((l) => ({
      lieu_id: l.lieu_id, nom: l.nom, adresse_actuelle: l.adresse_actuelle,
      etat: l.etat, statut: l.statut
    })),
    trajectoire: trajectoireDe(p.id),
    maisonnee,
    evenements,
    documents
  };
}

let totalOctetsPersonne = 0;
for (const [cleAD, lot] of parLotPersonne) {
  const chemin = ecrireJson(`fiches/personne/${cleAD}.json`, lot);
  totalOctetsPersonne += fs.statSync(chemin).size;
}
console.log(`fiches/personne/*.json : ${parLotPersonne.size} lots, ${(totalOctetsPersonne / 1024).toFixed(0)} Ko au total`);

// ───────────────────────── fiches de maison ─────────────────────────

// Devenir de la maisonnée : les événements « menage_continu » et « veuvage »
// donnent la suite d'un ménage (identifié par sa clé annee-Ddivision-Mno-Fno).
const parLotMaison = new Map();

for (const [cleM, maison] of d.maisons) {
  const cleAD = `${maison.annee}-D${maison.division}`;
  if (!parLotMaison.has(cleAD)) parLotMaison.set(cleAD, {});
  const lot = parLotMaison.get(cleAD);

  const cols = colonnesDe(Number(maison.annee));
  const familles = maison.familles.map((f) => {
    const menageCle = `${maison.annee}-D${maison.division}-M${maison.no_maison}-F${f.no_famille}`;
    const membres = f.membres.map((mid) => {
      const m = d.personnes.get(mid);
      if (!m) return null;
      return { id: mid, ligne: m.ligne, chef: !!m.chef, valeurs: cols.valeurs(m) };
    }).filter(Boolean);

    const devenir = (d.evenementsParMenage.get(menageCle) || [])
      .filter((e) => ['menage_continu', 'veuvage'].includes(e.type) && e.resume)
      .map((e) => ({ type: e.type, resume: e.resume, confiance: e.confiance }));

    return {
      no_famille: f.no_famille, chef: f.chef, no_famille_ms: f.no_famille_ms,
      remarque_nom: f.remarque_nom,
      entetes: cols.entetes, membres, devenir
    };
  });

  // Renvois aux tableaux annexes (foncier, terres, animaux, forêts,
  // navigation, établissements, décès) — toute ligne rattachée à cette maison.
  const renvois = {};
  for (const [nomTableau, lignes] of Object.entries(d.annexes)) {
    const trouvees = lignes.filter((l) => String(l.ref_maison) === String(maison.no_maison)
      && l.annee === maison.annee && String(l.division) === String(maison.division));
    if (trouvees.length) renvois[nomTableau] = trouvees;
  }

  lot[cleM] = {
    cle: cleM, annee: maison.annee, division: maison.division, no_maison: maison.no_maison,
    no_famille_ms: maison.no_famille_ms,
    logement: maison.logement, logement_partage: maison.logement_partage,
    remarque_logement: nettoyerRemarque(maison.remarque_logement),
    remarque_nom: nettoyerRemarque(maison.remarque_nom),
    remarque: nettoyerRemarque(maison.remarque),
    familles, renvois,
    concordances: d.concordancesParMaison.get(cleM) || [],
    lieux: d.lieuxParMaison.get(cleM) || []
  };
}

let totalOctetsMaison = 0;
for (const [cleAD, lot] of parLotMaison) {
  const chemin = ecrireJson(`fiches/maison/${cleAD}.json`, lot);
  totalOctetsMaison += fs.statSync(chemin).size;
}
console.log(`fiches/maison/*.json : ${parLotMaison.size} lots, ${(totalOctetsMaison / 1024).toFixed(0)} Ko au total`);

// ───────────────────────── fiches de lieu ─────────────────────────
// Un seul fichier pour les 39 lieux : la carte les veut tous à la fois pour
// poser ses points, et la fiche n'a alors plus rien à charger. Quelques
// dizaines de Ko — le même raisonnement que pour bussiere1990-data.js.

function menageeDe(cleM) {
  const maison = d.maisons.get(cleM);
  if (!maison) return null;
  return {
    cle: cleM,
    familles: maison.familles.map((f) => {
      const membres = f.membres.map((id) => d.personnes.get(id)).filter(Boolean);
      const chef = membres[0];
      return {
        no_famille: f.no_famille,
        chef: f.chef || (chef ? nomComplet(chef) : ''),
        chef_id: chef ? chef.id : '',
        chef_profession: chef ? chef.profession || '' : '',
        chef_age: chef ? chef.age || '' : '',
        effectif: membres.length
      };
    }),
    logement: maison.logement || null
  };
}

const ORDRE_STATUT = { confirme: 0, a_verifier: 1, hypothese: 2, propose: 3, rejete: 4 };

const lieuxSortie = d.lieux.map((l) => {
  const occupations = l.occupations.map((occ) => {
    const cleM = cleMaison(occ.annee, occ.division, occ.no_maison);
    return { ...occ, cle_maison: cleM, maisonnee: menageeDe(cleM) };
  }).sort((a, b) => (a.annee === b.annee
    ? (ORDRE_STATUT[a.statut] ?? 9) - (ORDRE_STATUT[b.statut] ?? 9)
    : Number(a.annee) - Number(b.annee)));

  const documents = (l.documents || []).map((id) => {
    const doc = (d.manifeste.documents || []).find((x) => x.id === id);
    return doc ? { id: doc.id, titre: doc.titre, type: doc.type } : null;
  }).filter(Boolean);

  return {
    id: l.id, nom: l.nom, voie: l.voie || '', adresse_actuelle: l.adresse_actuelle,
    designe_aujourdhui: l.designe_aujourdhui || '',
    etat: l.etat || 'inconnu', construit: l.construit || '', disparu: l.disparu || '',
    coord: l.coord || null,
    source: l.source || '', source_ref: l.source_ref || '',
    personnages: l.personnages, resume_source: l.resume_source, resume: l.resume,
    notes: l.notes, adresses_anciennes: l.adresses_anciennes, cadastre: l.cadastre,
    photos: l.photos, documents, occupations
  };
});

// Index des maisons par chef de ménage — c'est ce qui permet, dans l'atelier
// de la carte, de rattacher un lieu à une maison en tapant un nom plutôt qu'en
// se rappelant un numéro. « Peut-être est-ce déjà possible via les noms du
// recensement » : oui, à condition de fournir l'index.
const maisonsIndex = [];
for (const [cleM, maison] of d.maisons) {
  const chefs = maison.familles.map((f) => {
    const premier = d.personnes.get(f.membres[0]);
    return f.chef || (premier ? nomComplet(premier) : '');
  }).filter(Boolean);
  const effectif = maison.familles.reduce((s, f) => s + f.membres.length, 0);
  maisonsIndex.push([cleM, maison.annee, maison.division, maison.no_maison, chefs.join(' ; '), effectif]);
}
const cheminMaisonsIndex = ecrireJson('fiches/maisons-index.json', maisonsIndex);
console.log(`fiches/maisons-index.json : ${maisonsIndex.length} maisons, ${(fs.statSync(cheminMaisonsIndex).size / 1024).toFixed(0)} Ko`);

const cheminLieux = ecrireJson('fiches/lieux.json', {
  mis_a_jour: d.lieuxMeta.mis_a_jour,
  lieux: lieuxSortie
});
const nAncres = lieuxSortie.filter((l) => l.coord).length;
const nReleves = lieuxSortie.filter((l) => l.coord && l.coord.precision === 'releve').length;
const nRattaches = lieuxSortie.filter((l) => l.occupations.some((o) => o.statut !== 'rejete')).length;
console.log(`fiches/lieux.json : ${lieuxSortie.length} lieux, ${(fs.statSync(cheminLieux).size / 1024).toFixed(0)} Ko` +
  ` — ${nAncres} placés (dont ${nReleves} relevés à la main), ${nRattaches} rattachés à au moins une maison.`);

// ───────────────────────── statistiques ─────────────────────────

function ageEnAnnees(texte) {
  if (!texte) return null;
  const m = String(texte).match(/\d+/);
  if (!m) return null;
  if (/mois/i.test(texte)) return 0;
  return Number(m[0]);
}

function pyramideAges(annee) {
  const tranches = [];
  for (let i = 0; i < 17; i++) tranches.push(i === 16 ? '80 +' : `${i * 5}–${i * 5 + 4}`);
  const H = new Array(17).fill(0);
  const F = new Array(17).fill(0);
  let compte = 0;
  for (const p of d.personnes.values()) {
    if (p.annee !== String(annee)) continue;
    const age = ageEnAnnees(p.age);
    if (age === null) continue;
    const tranche = Math.min(16, Math.floor(age / 5));
    if (p.sexe === 'M') H[tranche]++;
    else if (p.sexe === 'F') F[tranche]++;
    else continue;
    compte++;
  }
  return { tranches, hommes: H, femmes: F, total: compte };
}

// Le recenseur écrit tantôt « French » tantôt « Française », tantôt avec
// l'accent tantôt sans — voir docs/SCHEMA.md, « Normalise les graphies à la
// saisie ». Sans ce regroupement, un même peuplement se disperse en
// plusieurs catégories qui semblent distinctes.
const VARIANTES_ORIGINE = {
  francaise: 'Française', francais: 'Française', french: 'Française',
  irlandaise: 'Irlandaise', irlandais: 'Irlandaise', irish: 'Irlandaise',
  anglaise: 'Anglaise', anglais: 'Anglaise', english: 'Anglaise',
  ecossaise: 'Écossaise', ecossais: 'Écossaise', scotch: 'Écossaise', scottish: 'Écossaise',
  americaine: 'Américaine', americain: 'Américaine', american: 'Américaine',
  allemande: 'Allemande', allemand: 'Allemande', german: 'Allemande',
  portugaise: 'Portugaise', portugais: 'Portugaise'
};
function normaliserOrigine(v) {
  const sansMarque = v.replace(/\s*\[\?\]\s*$/, '').trim();
  const cle = sansMarque.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  return VARIANTES_ORIGINE[cle] || sansMarque;
}

function frequences(annee, champ, limite, normaliser) {
  const compte = new Map();
  for (const p of d.personnes.values()) {
    if (p.annee !== String(annee)) continue;
    let v = (p[champ] || '').trim();
    if (!v) continue;
    if (normaliser) v = normaliser(v);
    compte.set(v, (compte.get(v) || 0) + 1);
  }
  return [...compte.entries()].sort((a, b) => b[1] - a[1]).slice(0, limite);
}

function comptesAnnee(annee) {
  const maisonsSet = new Set();
  const famillesSet = new Set();
  let personnesCompte = 0;
  for (const p of d.personnes.values()) {
    if (p.annee !== String(annee)) continue;
    personnesCompte++;
    maisonsSet.add(`${p.division}-${p.no_maison}`);
    famillesSet.add(`${p.division}-${p.no_maison}-${p.no_famille}`);
  }
  return { personnes: personnesCompte, maisons: maisonsSet.size, familles: famillesSet.size };
}

const comptesParAnnee = { 1871: comptesAnnee(1871), 1881: comptesAnnee(1881), 1891: comptesAnnee(1891) };
const stats = {
  genere_le: d.filiation.genere_le,
  totaux: {
    personnes: d.personnes.size, maisons: d.maisons.size,
    familles: Object.values(comptesParAnnee).reduce((s, c) => s + c.familles, 0)
  },
  par_annee: comptesParAnnee,
  pyramide_1891: pyramideAges(1891),
  metiers_1891: frequences(1891, 'profession', 10),
  origines_1871: frequences(1871, 'origine', 10, normaliserOrigine),
  trajectoires: {
    liens: d.filiation.comptes.liens,
    forte: d.filiation.comptes.liens_forte,
    moyenne: d.filiation.comptes.liens_moyenne,
    veuvage: d.filiation.comptes.veuvage,
    essaimage: d.filiation.comptes.essaimage
  }
};
ecrireJson('stats-donnees.json', stats);
console.log('stats-donnees.json écrit.');

console.log('\nGénération terminée.');
