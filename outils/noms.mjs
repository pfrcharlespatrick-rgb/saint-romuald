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
  ['guillaume', 'william', 'willie', 'will', 'bill', 'willm', 'wm'],
  ['jean', 'john', 'johnny', 'johny', 'johnie', 'jonh', 'jno'],
  ['jacques', 'james', 'jimmy', 'jim', 'jas'],
  ['joseph', 'josef', 'joe', 'jos'],
  // Isabelle est la forme ancienne d'Élisabeth, et le recenseur passe de l'une
  // à l'autre : Elisabeth McNaughton (1871) est Isabella en 1881.
  ['elisabeth', 'elizabeth', 'eliza', 'elisa', 'elise', 'elize', 'betsy', 'lizzie', 'lizie', 'lizy', 'liza', 'bessie',
    'isabelle', 'isabella', 'isabel', 'bella'],
  ['catherine', 'katherine', 'kate', 'katie', 'cathrine', 'cathe', 'kathleen'],
  ['michel', 'michael', 'mike', 'mick'],
  ['patrice', 'patrick', 'paddy', 'pat', 'patk'],
  ['pierre', 'peter'],
  ['charles', 'charlie', 'chas'],
  ['henri', 'henry', 'harry'],
  ['edouard', 'edward', 'eddie', 'edwd', 'ned'],
  ['francois', 'francis', 'frank', 'frs', 'fs'],
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
  ['jeanne', 'jane', 'jenny', 'janet', 'jennie', 'jany'],
  ['helene', 'ellen', 'helen', 'nellie', 'nelly'],
  ['brigitte', 'bridget', 'biddy', 'bridgt'],
  ['julie', 'julia', 'julienne'],
  ['sophie', 'sophia'],
  ['emilie', 'emily', 'emelie', 'emma', 'ema'],
  ['rose', 'rosalie', 'roselie', 'rosa', 'rosanna', 'rosana', 'rosann', 'rose anna', 'roseanna'],
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
  ['phileas', 'philias', 'filias', 'felias', 'phelias'],
  ['theotiste', 'theotis', 'theotos'],
  ['belzemire', 'belzemir', 'belsimir', 'belzimire'],
  ['apolline', 'apoline', 'appoline', 'pauline'],
  ['frederic', 'frederick', 'fred', 'freddy', 'fredk'],
];

/* Marque d'une graphie gardée à côté de la clé de sa classe. */
const GRAPHIE = '=';

const INDEX_PRENOMS = new Map();
for (const classe of CLASSES_PRENOMS) {
  for (const forme of classe) INDEX_PRENOMS.set(forme, classe[0]);
}

/* Particules et suffixes qui ne distinguent pas deux patronymes.
   « Roberge dit Lacroix » et « Roberge » sont la même souche. */
const PARTICULES = new Set(['de', 'du', 'des', 'le', 'la', 'l', 'mc', 'mac', 'o', 'st', 'ste', 'saint', 'sainte', 'van', 'von']);

/**
 * Clés de prénom. Un prénom composé (« Marie Louise ») rend la clé de chacun
 * de ses éléments ; un rapprochement tient dès que deux fiches en partagent une.
 *
 * Trois choses que le recenseur fait varier d'une décennie à l'autre, et que
 * la clé doit absorber :
 *   - le trait d'union : « Jean-Baptiste » (1891) est « J.Baptiste » (1881) et
 *     « J. Baptiste » (1871). Le prénom se découpe donc aussi sur le trait
 *     d'union — sans quoi « jean-baptiste » restait un seul mot, qui ne
 *     rencontrait jamais ni « jean » ni « baptiste » ;
 *   - l'initiale : « J. » devant « Baptiste » est Jean. Une initiale seule
 *     n'est pas un prénom : elle ne sert de clé que si la fiche n'a rien
 *     d'autre, sinon « J.Baptiste » et « J.Louis » se rencontreraient sur « j » ;
 *   - la graphie : « Ema » pour « Emma ». La forme écrite est gardée à côté de
 *     la clé de sa classe, pour que la comparaison lettre à lettre de
 *     similarPrenom la voie — « emma » rangé sous « emilie » ne ressemblait
 *     plus à « ema ».
 */
export function clesPrenom(prenom) {
  const brut = normaliser(prenom).replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  if (!brut) return [];
  const mots = brut.split(' ').filter(m => m && !PARTICULES.has(m));
  const cles = new Set();

  // Le prénom entier, au cas où il forme une classe à lui seul (« mary anne »).
  const entier = INDEX_PRENOMS.get(brut) || brut;
  cles.add(entier);

  const longs = mots.filter(m => m.length > 1);
  for (const mot of (longs.length ? longs : mots)) {
    const classe = INDEX_PRENOMS.get(mot);
    cles.add(classe || mot);
    // La graphie d'un prénom rangé dans une classe, marquée d'un « = » : elle
    // ne sert qu'à la comparaison lettre à lettre (voir similarPrenom).
    if (classe && classe !== mot) cles.add(GRAPHIE + mot);
  }
  // « J. Baptiste », « J.Bte » : l'initiale est celle de Jean.
  if (mots[0] === 'j' && /^(baptiste|bte|bapt)$/.test(mots[1] || '')) { cles.add('jean'); cles.add('baptiste'); }
  return [...cles];
}

/** Clé de patronyme : particules recollées, graphie normalisée. */
export function clePatronyme(nom) {
  const brut = normaliser(nom);
  if (!brut) return '';
  // « dit X » : on garde la souche, pas le surnom.
  const sansDit = brut.split(/\bdit\b/)[0].trim() || brut;
  let cle = sansDit.replace(/[\s'-]/g, '');
  /* Le préfixe irlandais et écossais s'écrit indifféremment Mac, Mc, M'c ou
     Mcc selon la main du recenseur : Robert « Macready » en 1871 est Robert
     « McCready » en 1881. Sans cette normalisation, les deux graphies ne se
     rencontrent jamais. On exige au moins trois lettres derrière pour ne pas
     rabattre un patronyme qui commencerait par « Mac » sans être un Mac. */
  cle = cle.replace(/^ma?c+(?=[a-z]{3})/, 'mc');
  return cle;
}

/**
 * Clés d'indexation d'un patronyme. Comparer toutes les paires coûterait des
 * dizaines de millions d'opérations ; on regroupe donc par seau. Un seul seau
 * (le préfixe) laisse passer les variantes qui divergent dès la première
 * lettre, d'où un second seau fondé sur la fin du nom.
 */
export function clesIndex(clePat) {
  if (!clePat) return [];
  const cles = new Set([clePat.slice(0, 3)]);
  if (clePat.length >= 4) cles.add('~' + clePat.slice(-4));
  return [...cles];
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

/**
 * Similarité de prénom, entre 0 et 1, via les classes d'équivalence.
 *
 * Une clé commune vaut 1. À défaut, deux clés à une lettre près valent 0,75,
 * à deux lettres près 0,5 (sur six lettres au moins). Les graphies marquées
 * — « =emma », gardée à côté de la clé « emilie » — ne comptent qu'à une
 * lettre près, et jamais pour une égalité : elles rattrapent « Ema » pour
 * « Emma » sans ouvrir la porte aux ressemblances lointaines.
 */
export function similarPrenom(clesA, clesB) {
  if (!clesA.length || !clesB.length) return 0;
  for (const a of clesA) {
    if (a[0] === GRAPHIE) continue;
    for (const b of clesB) {
      if (a === b) return 1;
    }
  }
  let meilleure = 0;
  for (const ka of clesA) {
    for (const kb of clesB) {
      const graphie = ka[0] === GRAPHIE || kb[0] === GRAPHIE;
      const a = ka[0] === GRAPHIE ? ka.slice(1) : ka;
      const b = kb[0] === GRAPHIE ? kb.slice(1) : kb;
      if (a.length < 3 || b.length < 3) continue;
      const d = distance(a, b, 2);
      if (d === 0 || d === 1) meilleure = Math.max(meilleure, 0.75);
      else if (!graphie && d === 2 && Math.max(a.length, b.length) >= 6) meilleure = Math.max(meilleure, 0.5);
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
