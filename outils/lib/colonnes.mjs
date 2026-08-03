// Colonnes du registre affichées par année — reflète strictement ce qui est
// réellement dépouillé (voir docs/SCHEMA.md). 1881 n'a que les champs
// communs : ne pas y afficher de colonnes vides à 100% des fiches.

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
    entetes: ['Nom', 'Sexe', 'Âge', 'État civil', 'Profession'],
    valeurs: (p) => [nomComplet(p), p.sexe || '', p.age || '', etatCivil(p), p.profession || '—']
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
