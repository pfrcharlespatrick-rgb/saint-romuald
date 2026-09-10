// Le complément de 1881 — les colonnes du formulaire que le dépouillement
// d'origine n'avait pas relevées.
//
// `recensement-1881-d*-data.js` ne porte que six champs : nom, sexe, âge, état
// matrimonial, profession, position au manuscrit. Les colonnes 10 à 13 (né dans
// les douze mois, pays de naissance, religion, origine) et 16 à 19 (école,
// infirmités) ont été dépouillées à part, page par page, dans
// `complement-1881-d1-data.js` et `complement-1881-d2-data.js` — 88 et 59 pages,
// complètes toutes les deux.
//
// Ce module verse ce dépouillement dans les fiches. **La logique est celle de
// l'atelier** (`Suivi des maisons et familles.dc.html`, `appliquerComplement`) :
// les deux vues doivent montrer la même chose, sans quoi la relecture page à
// page de Patrick ne porterait plus sur ce que le public voit.
//
// Trois règles, reprises telles quelles :
//
//   1. **Le complément ne remplace jamais une valeur existante.** Il ne comble
//      que les champs absents ou vides. Le dépouillement d'origine reste maître
//      de ses six colonnes.
//   2. **Le rattachement se fait par page et ligne du manuscrit**, avec
//      `decalage` / `decalage_depuis` là où le dépouillement avait sauté une
//      ligne (page 4 de la division 1, page 18 de la division 2). Une ligne
//      au-delà de `lignes` — le nombre de lignes réellement remplies au
//      manuscrit — ne reçoit rien.
//   3. **Chaque champ ajouté est marqué** dans `complement_champs`, et la
//      lecture douteuse d'une ligne dans `complement_note`, pour que la
//      provenance reste vérifiable jusque sur la fiche publique.

import fs from 'node:fs';
import path from 'node:path';

const FICHIERS = {
  '1881-D1': 'complement-1881-d1-data.js',
  '1881-D2': 'complement-1881-d2-data.js'
};

// Les deux fichiers sont écrits en littéral JavaScript (clés non guillemetées
// dans la division 1, en-tête en commentaire) et non en JSON minifié comme les
// recensements : on les évalue plutôt que de les parser.
function chargerFichier(racine, fichier) {
  const brut = fs.readFileSync(path.join(racine, 'data', fichier), 'utf8');
  const bac = {};
  new Function('window', brut)(bac);
  const cles = Object.keys(bac);
  if (cles.length !== 1) {
    throw new Error(`${fichier} : attendu une seule affectation à window, trouvé ${cles.length}`);
  }
  return bac[cles[0]];
}

export function chargerComplements(racine) {
  const complements = new Map();
  for (const [cleAD, fichier] of Object.entries(FICHIERS)) {
    complements.set(cleAD, chargerFichier(racine, fichier));
  }
  return complements;
}

// Une ligne marquée « né dans les douze derniers mois » doit porter un âge en
// fraction de l'année (« 4/12 (déc.) », « 0 (mars) »). Quand ce n'est pas le
// cas, le rattachement est faux quelque part et la valeur n'est pas versée —
// c'est ce garde-fou qui a fait apparaître le décalage de la page 4 et la
// marque de trop de la page 18 en division 2.
function nourrisson(age) {
  return /\/12|\(\s*(janv|févr|mars|avril|mai|juin|juil|août|sept|oct|nov|déc)/i.test(String(age || ''));
}

// Applique le complément à une personne et rend la fiche enrichie. Ne modifie
// pas l'objet reçu. `anomalies`, quand il est fourni, reçoit ce que le module a
// refusé de verser — le générateur le rapporte en fin de passe.
export function appliquerComplement(p, comp, anomalies) {
  if (!comp) return p;
  const pages = comp.pages || {};
  const fiche = pages[String(p.page_ms)] || pages[Number(p.page_ms)];
  if (!fiche) return p;
  // Page dont l'alignement sur le dépouillement n'est pas établi : on n'en verse
  // rien, pas même les valeurs par défaut. Mieux vaut une colonne vide qu'une
  // religion ou une origine attribuée à la mauvaise personne.
  if (fiche.alignement_incertain) return p;

  // Sur une page où le dépouillement a sauté une ligne, « decalage » rétablit la
  // correspondance avec le manuscrit ; « decalage_depuis » borne la correction
  // aux lignes qui suivent, quand la ligne sautée est en milieu de page.
  const decale = fiche.decalage_depuis === undefined || Number(p.ligne) >= fiche.decalage_depuis;
  const ligne = Number(p.ligne) + (decale ? (fiche.decalage || 0) : 0);
  if (fiche.lignes && ligne > fiche.lignes) return p;

  const ajout = { ...(comp.defauts || {}), ...((fiche.exceptions || {})[ligne] || {}) };
  if (Array.isArray(fiche.ecole)) ajout.ecole = fiche.ecole.indexOf(ligne) !== -1;

  const sortie = { ...p };
  const champs = [];
  for (const cle of Object.keys(ajout)) {
    const actuel = p[cle];
    if (!(cle in p) || actuel === '' || actuel === null || actuel === undefined) {
      sortie[cle] = ajout[cle];
      champs.push(cle);
    }
  }

  const mois = (fiche.ne12 || {})[ligne];
  if (mois && nourrisson(p.age)) { sortie.ne_douze_mois = mois; champs.push('ne_douze_mois'); }
  else if (mois && anomalies) {
    anomalies.push(`p${p.page_ms} L${p.ligne} — « né en ${mois} » refusé : ${p.prenom} ${p.nom} a ${p.age || 'un âge non relevé'}, ce n'est pas un nourrisson`);
  }

  // Colonne 20 du formulaire, « Observations » — la remarque du recenseur
  // lui-même. Elle ne chasse pas une remarque de dépouillement déjà écrite.
  const observation = (fiche.remarques || {})[ligne];
  if (observation && !sortie.remarque) { sortie.remarque = observation; champs.push('remarque'); }

  const doute = (fiche.incertain || {})[ligne];
  if (doute) sortie.complement_note = doute;
  if (champs.length) { sortie.complement = true; sortie.complement_champs = champs; }
  return sortie;
}
