// Charge les données du dépôt (data/*.js, documents/manifeste.json) et les
// met en forme pour le générateur de site (outils/generer-site.mjs).
//
// Chaque fichier data/*.js pose un objet global `window.X = {...}` en une
// ligne minifiée — voir outils/relecture-1881/lib.mjs pour le précédent.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ICI = path.dirname(fileURLToPath(import.meta.url));
export const RACINE = path.resolve(ICI, '..', '..');

function chargerObjetGlobal(fichier) {
  // window.NOM = <objet ou tableau JSON minifié>; — la valeur peut être un
  // objet ({) ou un tableau ([), selon le fichier (les annexes sont des
  // tableaux à la racine).
  const brut = fs.readFileSync(path.join(RACINE, 'data', fichier), 'utf8');
  const egal = brut.indexOf('=');
  let valeur = brut.slice(egal + 1).trim();
  if (valeur.endsWith(';')) valeur = valeur.slice(0, -1).trim();
  return JSON.parse(valeur);
}

const RECENSEMENTS = [
  'recensement-1871-d1-data.js',
  'recensement-1871-d2-data.js',
  'recensement-1881-d1-data.js',
  'recensement-1881-d2-data.js',
  'recensement-1891-d1-data.js',
  'recensement-1891-d2-data.js'
];

const ANNEXES = {
  foncier: 'annexe-foncier-data.js',
  terres: 'annexe-terres-data.js',
  animaux: 'annexe-animaux-data.js',
  etablissements: 'annexe-etablissements-data.js',
  forets: 'annexe-forets-data.js',
  navigation: 'annexe-navigation-data.js',
  deces: 'annexe-deces-data.js'
};

export function cleMaison(annee, division, noMaison) {
  return `${annee}-D${division}-M${noMaison}`;
}

export function chargerDonnees() {
  const recensements = RECENSEMENTS.map(chargerObjetGlobal);

  const personnes = new Map();      // id -> fiche enrichie
  const maisons = new Map();        // cleMaison -> { annee, division, no_maison, familles: [...], ... }
  const maisonsParAnneeDiv = new Map(); // "annee-Ddivision" -> [cleMaison, ...] dans l'ordre du registre

  for (const rec of recensements) {
    const { annee, division } = rec;
    const cleAD = `${annee}-D${division}`;
    const ordre = [];
    for (const maison of rec.maisons || []) {
      const cle = cleMaison(annee, division, maison.no_maison);
      ordre.push(cle);
      const familles = (maison.familles || []).map((famille) => {
        const membres = (famille.membres || []).map((p) => p.id).filter(Boolean);
        const premierId = (famille.membres || []).find((p) => p && p.id)?.id;
        for (const p of famille.membres || []) {
          if (!p || !p.id) continue;
          personnes.set(p.id, {
            ...p,
            annee, division,
            no_maison: String(maison.no_maison),
            no_famille: String(famille.no_famille),
            // Convention du registre : la personne inscrite en premier dans la
            // famille en est la ou le chef (voir famille.chef, texte libre).
            chef: p.id === premierId
          });
        }
        return {
          no_famille: famille.no_famille,
          chef: famille.chef || '',
          no_famille_ms: famille.no_famille_ms || '',
          remarque_nom: famille.remarque_nom || '',
          membres
        };
      });
      maisons.set(cle, {
        annee, division,
        no_maison: String(maison.no_maison),
        no_famille_ms: maison.no_famille_ms || '',
        logement: maison.logement || null,
        logement_partage: !!maison.logement_partage,
        remarque_logement: maison.remarque_logement || '',
        remarque_nom: maison.remarque_nom || '',
        remarque: maison.remarque || '',
        familles
      });
    }
    maisonsParAnneeDiv.set(cleAD, ordre);
  }

  const annexes = {};
  for (const [nom, fichier] of Object.entries(ANNEXES)) {
    annexes[nom] = chargerObjetGlobal(fichier) || [];
  }

  const filiationBrut = fs.readFileSync(path.join(RACINE, 'data', 'filiation-data.js'), 'utf8');
  const filiation = JSON.parse(
    filiationBrut.slice(filiationBrut.indexOf('{'), filiationBrut.lastIndexOf('}') + 1)
  );

  const manifeste = JSON.parse(
    fs.readFileSync(path.join(RACINE, 'documents', 'manifeste.json'), 'utf8')
  );

  // Index des liens et événements de filiation, par personne concernée.
  const liensDe = new Map();   // id -> [lien, ...]  (id est la source "de")
  const liensVers = new Map(); // id -> [lien, ...]  (id est la cible "vers")
  for (const lien of filiation.liens || []) {
    if (!liensDe.has(lien.de)) liensDe.set(lien.de, []);
    liensDe.get(lien.de).push(lien);
    if (!liensVers.has(lien.vers)) liensVers.set(lien.vers, []);
    liensVers.get(lien.vers).push(lien);
  }

  const evenementsParPersonne = new Map(); // id -> [evenement, ...]
  const evenementsParMenage = new Map();   // cle_menage -> [evenement, ...]
  for (const ev of filiation.evenements || []) {
    for (const champ of ['personne', 'personne_disparue', 'personne_veuve', 'personne_apres']) {
      const id = ev[champ];
      if (!id) continue;
      if (!evenementsParPersonne.has(id)) evenementsParPersonne.set(id, []);
      evenementsParPersonne.get(id).push(ev);
    }
    for (const champ of ['menage_avant', 'menage_apres', 'menage_origine', 'menage_fonde', 'menage']) {
      const cle = ev[champ];
      if (!cle) continue;
      if (!evenementsParMenage.has(cle)) evenementsParMenage.set(cle, []);
      evenementsParMenage.get(cle).push(ev);
    }
  }

  const documentsParPersonne = new Map(); // ref_personne -> [{document, affirmations concernées}]
  for (const doc of manifeste.documents || []) {
    const concernees = new Set();
    for (const p of doc.personnes || []) if (p.ref_personne) concernees.add(p.ref_personne);
    for (const aff of doc.affirmations || []) for (const id of aff.personnes || []) concernees.add(id);
    for (const id of concernees) {
      if (!documentsParPersonne.has(id)) documentsParPersonne.set(id, []);
      documentsParPersonne.get(id).push(doc);
    }
  }

  return {
    recensements, personnes, maisons, maisonsParAnneeDiv, annexes,
    filiation, manifeste,
    liensDe, liensVers, evenementsParPersonne, evenementsParMenage, documentsParPersonne
  };
}
