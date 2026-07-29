/* Normalisation des noms et prénoms — recensements de Saint-Romuald.
 *
 * Le recenseur écrit tantôt en français tantôt en anglais, selon sa main et
 * selon la famille : Marguerite devient Margaret puis Maggie, Guillaume
 * devient William. Sans table d'équivalence, un rapprochement d'une décennie
 * à l'autre manque la moitié des cas.
 *
 * Ce fichier ne décide rien : il ramène deux graphies à une même clé quand
 * l'usage québécois et irlandais du 19e siècle les traite comme un seul nom.
 * Tout ce qui reste douteux est laissé distinct — mieux vaut un lien manqué,
 * que le chercheur retrouvera, qu'un lien inventé qu'il croira établi.
 */

/** Retire accents, ponctuation et marques d'incertitude « [?] ». */
export function normaliser(texte) {
  return String(texte || '')
    .replace(/\[\s*\?\s*\]/g, ' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* Classes d'équivalence des prénoms. Chaque ligne est un seul prénom vécu,
   écrit de plusieurs façons par le recenseur. La première forme sert de clé. */
const CLASSES_PRENOMS = [
  ['marguerite', 'margaret', 'margarette', 'maggie', 'maggy', 'margot', 'peggy', 'marg', 'margt'],
  ['marie', 'mary', 'maria', 'may', 'mariane', 'marianne', 'mary anne', 'mary ann', 'maryann', 'marie anne'],
  ['george', 'georges', 'georgie'],
  ['guillaume', 'william', 'willie', 'will', 'bill', 'willm'],
  ['jean', 'john', 'johnny', 'jonh', 'jno'],
  ['jacques', 'james', 'jimmy', 'jim', 'jas'],
  ['joseph', 'josef', 'joe', 'jos'],
  ['elisabeth', 'elizabeth', 'eliza', 'betsy', 'lizzie', 'liza', 'bessie'],
  ['catherine', 'katherine', 'kate', 'katie', 'cathrine', 'cathe', 'kathleen'],
  ['michel', 'michael', 'mike', 'mick'],
  ['patrice', 'patrick', 'paddy', 'pat', 'patk'],
  ['pierre', 'peter'],
  ['charles', 'charlie', 'chas'],
  ['henri', 'henry', 'harry'],
  ['edouard', 'edward', 'eddie', 'edwd', 'ned'],
  ['francois', 'francis', 'frank', 'frs'],
  ['antoine', 'anthony', 'antony', 'tony'],
  ['andre', 'andrew', 'andy'],
  ['etienne', 'stephen', 'steven'],
  ['louis', 'lewis'],
  ['philippe', 'philip', 'phillip', 'phil'],
  ['thomas', 'tom', 'tommy', 'thos'],
  ['robert', 'bob', 'bobby', 'robt'],
  ['richard', 'dick', 'richd'],
  ['alexandre', 'alexander', 'alex', 'alexr'],
  ['daniel', 'dan', 'danny'],
  ['samuel', 'sam', 'saml'],
  ['benjamin', 'ben'],
  ['nicolas', 'nicholas', 'nick'],
  ['anne', 'ann', 'anna', 'annie', 'hannah', 'nancy'],
  ['sarah', 'sara', 'sally'],
  ['jeanne', 'jane', 'jenny', 'janet', 'jennie'],
  ['helene', 'ellen', 'helen', 'nellie', 'nelly'],
  ['brigitte', 'bridget', 'biddy', 'bridgt'],
  ['julie', 'julia', 'julienne'],
  ['sophie', 'sophia'],
  ['emilie', 'emily', 'emelie', 'emma'],
  ['rose', 'rosalie', 'rosa', 'rosanna'],
  ['victoire', 'victoria'],
  ['lucie', 'lucy', 'luce'],
  ['virginie', 'virginia'],
  ['angele', 'angela', 'angelique'],
  ['flore', 'flora'],
  ['claire', 'clara', 'clarisse'],
  ['eugenie', 'eugenia'],
  ['agnes', 'agnese'],
  ['therese', 'theresa', 'tessie'],
  ['madeleine', 'magdeleine', 'magdelaine'],
  ['genevieve', 'genevive'],
  ['adelaide', 'adele', 'adela'],
  ['christine', 'christina'],
  ['isabelle', 'isabella', 'isabel', 'bella'],
  ['matthieu', 'mathew', 'matthew', 'mathieu'],
  ['timothee', 'timothy', 'tim'],
  ['denis', 'dennis'],
  ['martin'],
  ['edmond', 'edmund'],
  ['augustin', 'augustus', 'austin'],
  ['ferdinand'],
  ['narcisse'],
  ['napoleon'],
  ['octave'],
  ['olivier', 'oliver'],
  ['theophile'],
  ['zephirin'],
  ['damase'],
  ['cyrille'],
  ['hubert'],
  ['israel'],
  ['moise', 'moses'],
  ['abraham', 'abram'],
  ['isidore'],
  ['honore'],
  ['alfred'],
  ['arthur'],
  ['albert'],
  ['ernest'],
  ['eugene'],
  ['gustave'],
  ['leon'],
  ['maxime'],
  ['raoul'],
  ['wilfrid', 'wilfred'],
  ['xavier'],
];

const INDEX_PRENOMS = new Map();
for (const classe of CLASSES_PRENOMS) {
  for (const forme of classe) INDEX_PRENOMS.set(forme, classe[0]);
}

/* Particules et suffixes qui ne distinguent pas deux patronymes.
   « Roberge dit Lacroix » et « Roberge » sont la même souche. */
const PARTICULES = new Set(['de', 'du', 'des', 'le', 'la', 'l', 'mc', 'mac', 'o', 'st', 'ste', 'saint', 'sainte', 'van', 'von']);

/**
 * Clé de prénom. Un prénom composé (« Marie Louise ») rend la clé de son
 * premier élément significatif ; les formes secondaires sont retournées à
 * part pour permettre un rapprochement plus souple.
 */
export function clesPrenom(prenom) {
  const brut = normaliser(prenom);
  if (!brut) return [];
  const mots = brut.split(' ').filter(m => m && !PARTICULES.has(m));
  const cles = new Set();

  // Le prénom entier, au cas où il forme une classe à lui seul (« mary anne »).
  const entier = INDEX_PRENOMS.get(brut) || brut;
  cles.add(entier);

  for (const mot of mots) {
    cles.add(INDEX_PRENOMS.get(mot) || mot);
  }
  return [...cles];
}

/** Clé de patronyme : particules recollées, graphie normalisée. */
export function clePatronyme(nom) {
  const brut = normaliser(nom);
  if (!brut) return '';
  // « dit X » : on garde la souche, pas le surnom.
  const sansDit = brut.split(/\bdit\b/)[0].trim() || brut;
  return sansDit.replace(/[\s'-]/g, '');
}

/** Distance de Levenshtein, bornée : au-delà de `max`, renvoie max + 1. */
export function distance(a, b, max = 3) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let precedent = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const courant = [i];
    let meilleur = i;
    for (let j = 1; j <= b.length; j++) {
      const cout = a[i - 1] === b[j - 1] ? 0 : 1;
      courant[j] = Math.min(courant[j - 1] + 1, precedent[j] + 1, precedent[j - 1] + cout);
      if (courant[j] < meilleur) meilleur = courant[j];
    }
    if (meilleur > max) return max + 1;
    precedent = courant;
  }
  return precedent[b.length];
}

/**
 * Similarité de patronyme, entre 0 et 1.
 * 1 = graphie identique une fois normalisée ; 0 = à rejeter.
 */
export function similarPatronyme(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const d = distance(a, b, 2);
  const longueur = Math.max(a.length, b.length);
  if (d === 1 && longueur >= 4) return 0.85;
  if (d === 2 && longueur >= 7) return 0.6;
  return 0;
}

/** Similarité de prénom, entre 0 et 1, via les classes d'équivalence. */
export function similarPrenom(clesA, clesB) {
  if (!clesA.length || !clesB.length) return 0;
  for (const a of clesA) {
    for (const b of clesB) {
      if (a === b) return 1;
    }
  }
  let meilleure = 0;
  for (const a of clesA) {
    for (const b of clesB) {
      if (a.length < 3 || b.length < 3) continue;
      const d = distance(a, b, 2);
      if (d === 1) meilleure = Math.max(meilleure, 0.75);
      else if (d === 2 && Math.max(a.length, b.length) >= 6) meilleure = Math.max(meilleure, 0.5);
    }
  }
  return meilleure;
}

/**
 * Âge en années. « 6 mois » vaut 0, « 85 [?] » vaut 85.
 * Renvoie null si rien de lisible — l'âge ne pourra pas servir de preuve.
 */
export function ageEnAnnees(age) {
  // Attention : on ne passe pas par `normaliser`, qui supprime les chiffres.
  const brut = String(age || '')
    .replace(/\[\s*\?\s*\]/g, ' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
  if (!brut) return null;
  if (/\bmois\b|\bmonth/.test(brut)) return 0;
  if (/\bjour\b|\bday\b|\bsemaine\b|\bweek\b/.test(brut)) return 0;
  const m = brut.match(/\d+/);
  if (!m) return null;
  const n = parseInt(m[0], 10);
  return Number.isFinite(n) && n >= 0 && n <= 120 ? n : null;
}
