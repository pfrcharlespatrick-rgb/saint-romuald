/* Relais de sauvegarde de l'atelier — Cloudflare Worker.
 *
 * Le panneau « Pousser vers GitHub » de l'atelier peut fonctionner en deux
 * modes : jeton GitHub gardé dans le navigateur (mode direct), ou ce relais.
 * Ici, le jeton reste côté Cloudflare : le navigateur n'en voit jamais la
 * couleur, il ne détient qu'une clé d'atelier qui n'ouvre que ce relais.
 *
 * Et ce relais ne sait faire qu'une seule chose : la sauvegarde de l'atelier.
 * Chaque requête est confrontée à une liste fermée d'opérations — écrire
 * data/travail-personnel.json sur la branche atelier-sauvegarde et tenir la
 * pull request associée. Même si la clé d'atelier fuyait, elle ne permettrait
 * ni de toucher à main, ni de lire ou d'écrire quoi que ce soit d'autre.
 *
 * Deux variables d'environnement obligatoires (« Secrets » côté Cloudflare) :
 *   GITHUB_TOKEN        — jeton fin limité au dépôt, permissions Contents et
 *                         Pull requests en lecture/écriture
 *   CLE_ATELIER         — la clé que Patrick saisit dans le panneau (une longue
 *                         phrase de passe fait très bien l'affaire)
 * Et une facultative :
 *   ORIGINES_AUTORISEES — origines séparées par des virgules
 *                         (ex. « https://pfrcharlespatrick-rgb.github.io »)
 *
 * Déploiement : voir README.md de ce dossier.
 */

const DEPOT = 'pfrcharlespatrick-rgb/saint-romuald';
const BRANCHE = 'atelier-sauvegarde';
const BASE = 'main';
const FICHIER = 'data/travail-personnel.json';
const TAILLE_MAX = 2 * 1024 * 1024; // le paquet de travail encodé en base64

/* La liste fermée. `chemin` est le suffixe après /repos/<depot>, exactement
   tel que l'atelier l'envoie ; `corps` reçoit le corps JSON (ou null) et dit
   si la requête est conforme. */
const OPERATIONS = [
  { methode: 'GET', chemin: '/git/ref/heads/' + BASE, corps: (c) => c === null },
  {
    methode: 'POST', chemin: '/git/refs',
    corps: (c) => !!c && c.ref === 'refs/heads/' + BRANCHE && typeof c.sha === 'string'
      && Object.keys(c).every((k) => k === 'ref' || k === 'sha')
  },
  {
    methode: 'PATCH', chemin: '/git/refs/heads/' + BRANCHE,
    corps: (c) => !!c && typeof c.sha === 'string'
      && Object.keys(c).every((k) => k === 'sha' || k === 'force')
  },
  { methode: 'GET', chemin: '/contents/' + FICHIER + '?ref=' + BRANCHE, corps: (c) => c === null },
  {
    methode: 'PUT', chemin: '/contents/' + FICHIER,
    corps: (c) => !!c && c.branch === BRANCHE
      && typeof c.content === 'string' && c.content.length <= TAILLE_MAX
      && typeof c.message === 'string'
      && Object.keys(c).every((k) => ['message', 'content', 'branch', 'sha'].includes(k))
  },
  {
    methode: 'GET',
    chemin: '/pulls?head=' + DEPOT.split('/')[0] + ':' + BRANCHE + '&state=open',
    corps: (c) => c === null
  },
  {
    methode: 'POST', chemin: '/pulls',
    corps: (c) => !!c && c.head === BRANCHE && c.base === BASE
      && Object.keys(c).every((k) => ['title', 'head', 'base', 'body'].includes(k))
  }
];

function entetes(requete, env) {
  const autorisees = (env.ORIGINES_AUTORISEES || '').split(',').map((s) => s.trim()).filter(Boolean);
  const origine = requete.headers.get('Origin') || '';
  const permise = !autorisees.length || autorisees.includes(origine);
  return {
    permise,
    cors: {
      'Access-Control-Allow-Origin': autorisees.length ? origine : '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Max-Age': '86400'
    }
  };
}

const json = (donnees, statut, cors) =>
  new Response(JSON.stringify(donnees), {
    status: statut,
    headers: { 'content-type': 'application/json; charset=utf-8', ...cors }
  });

/* Comparaison en temps constant, pour ne pas laisser deviner la clé
   caractère par caractère au chronomètre. */
function memesCles(a, b) {
  const ta = new TextEncoder().encode(String(a));
  const tb = new TextEncoder().encode(String(b));
  if (ta.length !== tb.length) return false;
  let diff = 0;
  for (let i = 0; i < ta.length; i++) diff |= ta[i] ^ tb[i];
  return diff === 0;
}

export default {
  async fetch(requete, env) {
    const { permise, cors } = entetes(requete, env);

    if (requete.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (!permise) return json({ message: 'Origine non autorisée.' }, 403, cors);
    if (requete.method !== 'POST') return json({ message: 'Méthode non autorisée.' }, 405, cors);
    if (!env.GITHUB_TOKEN || !env.CLE_ATELIER) return json({ message: 'Relais non configuré.' }, 500, cors);

    let demande;
    try {
      demande = await requete.json();
    } catch (e) {
      return json({ message: 'Corps de requête illisible.' }, 400, cors);
    }

    if (!memesCles(demande.cle || '', env.CLE_ATELIER)) {
      return json({ message: 'Clé d’atelier refusée.' }, 401, cors);
    }

    const corps = demande.corps === undefined ? null : demande.corps;
    const operation = OPERATIONS.find(
      (op) => op.methode === demande.methode && op.chemin === demande.chemin && op.corps(corps)
    );
    if (!operation) {
      return json({ message: 'Opération hors de la liste permise par le relais.' }, 403, cors);
    }

    const reponse = await fetch('https://api.github.com/repos/' + DEPOT + demande.chemin, {
      method: demande.methode,
      headers: {
        Authorization: 'Bearer ' + env.GITHUB_TOKEN,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'atelier-saint-romuald-relais',
        ...(corps !== null ? { 'Content-Type': 'application/json' } : {})
      },
      ...(corps !== null ? { body: JSON.stringify(corps) } : {})
    });

    /* On rejoue le statut et le corps de GitHub tels quels : le panneau de
       l'atelier s'appuie sur les 404 (premier envoi) et 422 (branche ou PR
       déjà là) pour dérouler sa logique. */
    if (reponse.status === 204) return new Response(null, { status: 204, headers: cors });
    const texte = await reponse.text();
    return new Response(texte, {
      status: reponse.status,
      headers: { 'content-type': 'application/json; charset=utf-8', ...cors }
    });
  }
};
