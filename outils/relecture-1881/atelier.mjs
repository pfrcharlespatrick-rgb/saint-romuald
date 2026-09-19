import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Ce que Patrick a corrigé à la main dans l'atelier.

   L'atelier (« Suivi des maisons et familles.dc.html ») ne réécrit pas les
   recensements : il garde les corrections à part, dans
   `data/travail-personnel.json`. Quatre clés y disent ce qu'une main a tranché :

     suivi-familles-corrections   une entrée par personne, ne contenant que les
                                  champs effectivement touchés :
                                    { "1891-D1-P132-L01": { "prenom": "Abraham" } }
     suivi-corr-maison            une entrée par maison, clé « annee-division-no » :
                                    { "1871-2-25": { "colonne": "3" } }
     suivi-corr-famille           une entrée par famille, clé « annee-division-maison-no »
                                  — le numéro d'origine dans la clé, le nouveau en valeur :
                                    { "1871-2-25-31 [?]": { "no_famille": "31" } }
     suivi-liens                  des rapprochements entre recensements posés à la
                                  main, par identifiant de personne (voir resoudreLiens)

   C'est donc la trace exacte de ce qui a été décidé à la main, champ par champ.
   Une main humaine sur une case l'emporte sur toute relecture automatique :
   ce module est ce qui permet aux outils de le savoir. */

const FICHIER = RACINE + '/data/travail-personnel.json';

/* Les cases de l'atelier gardent les espaces qu'une frappe y laisse — « Peltier  »,
   « 36  ». Ce n'est pas une décision, c'est du clavier : on rogne à la lecture,
   sans toucher au fichier, pour que « Peltier » ne devienne jamais « Peltier  »
   dans un recensement ni ne repasse pour un changement à chaque versement. */
function rogner(entree) {
  const propre = {};
  for (const [k, v] of Object.entries(entree || {})) propre[k] = typeof v === 'string' ? v.trim() : v;
  return propre;
}

function rognerTout(brut) {
  return Object.fromEntries(Object.entries(brut || {}).map(([cle, e]) => [cle, rogner(e)]));
}

let cacheTravail = null;
function travail() {
  if (cacheTravail) return cacheTravail;
  try {
    cacheTravail = JSON.parse(fs.readFileSync(FICHIER, 'utf8')).donnees || {};
  } catch (e) {
    // Pas de fichier de travail : rien n'est protégé, et ce n'est pas une erreur.
    cacheTravail = {};
  }
  return cacheTravail;
}

/* ─── Personnes ───────────────────────────────────────────────────────── */

let cache = null;
export function corrections() {
  if (!cache) cache = rognerTout(travail()['suivi-familles-corrections']);
  return cache;
}

/** Les champs qu'une main a fixés sur cette personne, ou un objet vide. */
export function manuel(id) {
  return corrections()[id] || {};
}

/** Vrai si ce champ précis a été corrigé à la main. */
export function protege(id, champ) {
  return Object.prototype.hasOwnProperty.call(manuel(id), champ);
}

/** Vrai si cette personne a reçu au moins une correction manuelle. */
export function touche(id) {
  return Object.keys(manuel(id)).length > 0;
}

/* Les remarques que la relecture automatique a empilées, à retirer d'une ligne
   qu'une main a tranchée : « plus besoin de conserver les validations passées ».
   Ce qui a été écrit à la main dans le champ « remarque », lui, est conservé. */
export function sansRelecture(remarque) {
  if (!remarque) return '';
  return remarque.replace(/Relecture du manuscrit\s*(?:\([^)]*\))?\s*:.*$/s, '').trim();
}

/** Écarte d'un lot de champs ceux qu'une main a fixés.

    Renvoie ce qui reste à écrire, le compte-rendu de ce qui a été laissé, et si
    la ligne est tenue pour tranchée — auquel cas elle ne reçoit plus ni drapeau
    `incertain` ni remarque de relecture.

    **Tous** les champs corrigés à la main sont écartés de `retenus`, sans
    exception. Mais le compte-rendu ne retient que ceux où la main et la
    relecture ne disent pas la même chose : un refus sur lequel les deux
    s'accordent n'apprend rien et noie les vrais désaccords. */
export function filtrer(p, champs, etiquette) {
  const garde = Object.keys(champs).filter(k => protege(p.id, k));
  const main = manuel(p.id);
  const different = (k) => JSON.stringify(main[k]) !== JSON.stringify(champs[k]);
  return {
    retenus: Object.fromEntries(Object.entries(champs).filter(([k]) => !garde.includes(k))),
    refuses: garde.filter(different)
      .map(k => `${etiquette} ${k} — la main a écrit « ${main[k]} », la relecture proposait « ${champs[k]} »`),
    tranchee: touche(p.id),
  };
}

/* ─── Maisons et familles ─────────────────────────────────────────────── */

/* L'atelier n'utilise pas les identifiants du site (« 1871-D2-M25 ») mais ses
   propres clés : l'année, la division et le numéro, séparés par des tirets ;
   pour une famille, le numéro de la famille en plus, tel que le recensement le
   porte au moment de la correction — « 31 [?] » reste « 31 [?] » dans la clé
   même quand la main a écrit « 31 » en valeur. Voir cleFamille et updateMaison
   dans « Suivi des maisons et familles.dc.html ». */

/** Clé d'une maison dans l'atelier : « 1871-2-25 ». */
export function cleMaisonAtelier(annee, division, noMaison) {
  return `${annee}-${division}-${noMaison}`;
}

/** Clé d'une famille dans l'atelier : « 1871-2-25-31 [?] ». */
export function cleFamilleAtelier(annee, division, noMaison, noFamille) {
  return `${cleMaisonAtelier(annee, division, noMaison)}-${noFamille}`;
}

/** Le recensement (« 1871-D2 ») que vise une clé de maison ou de famille, ou null. */
export function recensementDeCle(cle) {
  const m = /^(\d{4})-(\d)-/.exec(String(cle));
  return m ? `${m[1]}-D${m[2]}` : null;
}

let cacheMaisons = null;
/** Les corrections de maisons, par clé d'atelier, valeurs rognées. Champs
    possibles : colonne (2 construction, 3 inhabitée, 4 habitée), materiau,
    etages, chambres, adresse, no_maison. */
export function correctionsMaisons() {
  if (!cacheMaisons) cacheMaisons = rognerTout(travail()['suivi-corr-maison']);
  return cacheMaisons;
}

let cacheFamilles = null;
/** Les corrections de familles, par clé d'atelier, valeurs rognées. Seul
    champ : no_famille, le numéro corrigé. */
export function correctionsFamilles() {
  if (!cacheFamilles) cacheFamilles = rognerTout(travail()['suivi-corr-famille']);
  return cacheFamilles;
}

/** Les champs qu'une main a fixés sur cette maison, ou un objet vide. */
export function manuelMaison(annee, division, noMaison) {
  return correctionsMaisons()[cleMaisonAtelier(annee, division, noMaison)] || {};
}

/** Les champs qu'une main a fixés sur cette famille, ou un objet vide. */
export function manuelFamille(annee, division, noMaison, noFamille) {
  return correctionsFamilles()[cleFamilleAtelier(annee, division, noMaison, noFamille)] || {};
}

/* ─── Liens entre recensements ────────────────────────────────────────── */

let cacheLiens = null;
/** Les liens posés à la main, par identifiant de personne : une liste
    d'objets { relation, annee, division, page, ligne, nom, note }, rognés. */
export function liens() {
  if (cacheLiens) return cacheLiens;
  cacheLiens = {};
  for (const [id, liste] of Object.entries(travail()['suivi-liens'] || {})) {
    if (Array.isArray(liste)) cacheLiens[id] = liste.map(rogner);
  }
  return cacheLiens;
}

/** Les rapprochements écartés dans l'annexe des filiations, sous la forme
    « de__vers » — la clé que filiation.html écrit dans suivi-filiation-rejets. */
export function rejets() {
  const out = new Set();
  for (const [cle, v] of Object.entries(travail()['suivi-filiation-rejets'] || {})) if (v) out.add(cle);
  return out;
}

/* Un lien de l'atelier dit « la même personne, ailleurs » quand sa relation
   est un suivi : c'est ce qu'écrit l'annexe des filiations (« Suivi
   (Filiations) »), et ce qu'on entend par un lien sans relation précisée. Une
   relation de parenté — « veuve de… », « fils de… » — relie deux personnes
   distinctes : ce n'est pas un rapprochement d'identité, et il n'a rien à faire
   dans une trajectoire. */
export function estSuivi(relation) {
  const r = String(relation || '').trim().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  return r === '' || /^suivi/.test(r) || /meme personne|identite|identique|filiation/.test(r);
}

/** Résout les liens posés à la main en couples d'identifiants, du recensement
    le plus ancien (`de`) vers le plus récent (`vers`).

    `positions` : Map « annee|division|page|ligne » → identifiant, construite
    sur les recensements chargés ; `existe(id)` dit si une personne est connue.
    Renvoie les liens résolus et le compte-rendu de ceux qui sont laissés —
    relation de parenté, position introuvable, même recensement des deux côtés. */
export function resoudreLiens(positions, existe) {
  const resolus = [];
  const laisses = [];
  const vus = new Set();
  const annee = (id) => id.slice(0, 4);
  for (const [source, liste] of Object.entries(liens())) {
    for (const l of liste) {
      const ou = `${l.annee || '?'} D${l.division || '?'} p. ${l.page || '?'} l. ${l.ligne || '?'}`;
      const etiquette = `${source} → ${ou}${l.nom ? ' (' + l.nom + ')' : ''}`;
      if (!existe(source)) { laisses.push(`${etiquette} : personne source inconnue`); continue; }
      if (!estSuivi(l.relation)) {
        laisses.push(`${etiquette} : relation « ${l.relation} » — lien de parenté, pas un suivi de la même personne ; hors des filiations`);
        continue;
      }
      if (!l.annee || !l.page || !l.ligne) { laisses.push(`${etiquette} : position incomplète`); continue; }
      const cible = positions.get(`${l.annee}|${l.division || ''}|${l.page}|${l.ligne}`);
      if (!cible) { laisses.push(`${etiquette} : aucune personne à cette position`); continue; }
      if (cible === source || annee(cible) === annee(source)) {
        laisses.push(`${etiquette} : même recensement des deux côtés, pas une trajectoire`);
        continue;
      }
      const [de, vers] = annee(source) < annee(cible) ? [source, cible] : [cible, source];
      const cle = `${de}__${vers}`;
      if (vus.has(cle)) continue;
      vus.add(cle);
      resolus.push({ de, vers, source, relation: l.relation || '', nom: l.nom || '', note: l.note || '' });
    }
  }
  return { resolus, laisses };
}
