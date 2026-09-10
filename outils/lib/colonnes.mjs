// Colonnes du registre affichées par année — reflète strictement ce qui est
// réellement dépouillé (voir docs/SCHEMA.md). Ne pas y afficher une colonne
// vide sur 100 % des fiches.
//
// 1881 n'a longtemps porté que les champs communs. Depuis que le complément est
// versé aux fiches (voir complement-1881.mjs), les colonnes 11 à 13 et 16 du
// formulaire — naissance, origine, religion, école — sont là elles aussi : les
// 59 pages de la division 2 en entier, 86 des 88 pages de la division 1, les
// pages 82 et 83 restant suspendues faute d'alignement établi.
//
// 1871 division 1 fait exception en sens inverse : son lieu de naissance n'a
// jamais été dépouillé (1 fiche sur 1540 en porte un). La colonne « Né(e) »
// reste donc quasi vide sur cette division — voir docs/BILAN-RELECTURE.md.

const MOTS_ETAT_CIVIL = { M: 'Marié(e)', C: 'Célibataire', V: 'Veuf/veuve' };

function etatCivil(p) {
  return MOTS_ETAT_CIVIL[p.etat_matrimonial] || '—';
}
function coche(v) {
  return v ? '✓' : '';
}
function nomComplet(p) {
  return [p.prenom, p.nom].filter(Boolean).join(' ') || '—';
}

export const COLONNES_PAR_ANNEE = {
  1871: {
    entetes: ['Nom', 'Sexe', 'Âge', 'Né(e)', 'Origine', 'Profession', 'École'],
    valeurs: (p) => [nomComplet(p), p.sexe || '', p.age || '', p.lieu_naissance || '', p.origine || '', p.profession || '—', coche(p.ecole)]
  },
  1881: {
    entetes: ['Nom', 'Sexe', 'Âge', 'État civil', 'Né(e)', 'Origine', 'Religion', 'Profession', 'École'],
    valeurs: (p) => [nomComplet(p), p.sexe || '', p.age || '', etatCivil(p), p.lieu_naissance || '',
      p.origine || '', p.religion || '', p.profession || '—', coche(p.ecole)]
  },
  1891: {
    entetes: ['Nom', 'Sexe', 'Âge', 'Lien avec le chef', 'Né(e)', 'Religion', 'Profession'],
    valeurs: (p) => [nomComplet(p), p.sexe || '', p.age || '', p.lien_parente || '', p.lieu_naissance || '', p.religion || '', p.profession || '—']
  }
};

export function colonnesDe(annee) {
  return COLONNES_PAR_ANNEE[annee] || COLONNES_PAR_ANNEE[1881];
}

export function nettoyerRemarque(texte) {
  if (!texte) return '';
  return texte
    .replace(/pos=\d+;\s*/g, '')
    .replace(/^\s*;\s*/, '')
    .trim();
}

export { nomComplet, etatCivil };
