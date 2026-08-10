import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Ce que Patrick a corrigé à la main dans l'atelier.

   L'atelier (« Suivi des maisons et familles.dc.html ») ne réécrit pas les
   recensements : il garde les corrections à part, dans
   `data/travail-personnel.json`, sous `suivi-familles-corrections` — une entrée
   par personne, ne contenant que les champs effectivement touchés :

     { "1891-D1-P132-L01": { "prenom": "Abraham" } }

   C'est donc la trace exacte de ce qui a été décidé à la main, champ par champ.
   Une main humaine sur une case l'emporte sur toute relecture automatique :
   ce module est ce qui permet aux outils de le savoir. */

const FICHIER = RACINE + '/data/travail-personnel.json';

let cache = null;
export function corrections() {
  if (cache) return cache;
  try {
    const j = JSON.parse(fs.readFileSync(FICHIER, 'utf8'));
    cache = (j.donnees || {})['suivi-familles-corrections'] || {};
  } catch (e) {
    // Pas de fichier de travail : rien n'est protégé, et ce n'est pas une erreur.
    cache = {};
  }
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
    `incertain` ni remarque de relecture. */
export function filtrer(p, champs, etiquette) {
  const garde = Object.keys(champs).filter(k => protege(p.id, k));
  return {
    retenus: Object.fromEntries(Object.entries(champs).filter(([k]) => !garde.includes(k))),
    refuses: garde.map(k => `${etiquette} ${k} — la main a écrit « ${manuel(p.id)[k]} », la relecture proposait « ${champs[k]} »`),
    tranchee: touche(p.id),
  };
}
