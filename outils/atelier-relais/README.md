# Relais de sauvegarde de l'atelier

Le panneau « Pousser vers GitHub » de l'atelier
(`Suivi des maisons et familles.dc.html`) sait fonctionner en deux modes :

- **Mode direct** (l'historique) : un jeton GitHub saisi dans le panneau,
  gardé dans le `localStorage` du navigateur. Simple, mais le jeton — qui
  donne l'écriture sur tout le dépôt — est lisible par quiconque accède à
  l'appareil, et par tout script qui s'exécuterait sur l'origine du site.
- **Mode relais** (recommandé) : le jeton vit dans un petit Cloudflare
  Worker, jamais dans le navigateur. Le panneau ne détient qu'une *clé
  d'atelier*, et le relais n'accepte qu'une liste fermée d'opérations :
  écrire `data/travail-personnel.json` sur la branche `atelier-sauvegarde`
  et tenir la pull request associée. Une clé qui fuit ne peut rien faire
  d'autre — ni toucher `main`, ni lire le reste du dépôt.

## Déployer (une fois, ~10 minutes)

1. **Créer le jeton côté GitHub** — un jeton fin (« fine-grained »), limité
   au dépôt `saint-romuald`, permissions *Contents* et *Pull requests* en
   lecture/écriture. C'est le même genre de jeton que pour le mode direct ;
   la différence est qu'il ne quittera plus Cloudflare.
2. **Créer le Worker** — sur [dash.cloudflare.com](https://dash.cloudflare.com),
   *Workers & Pages → Create → Worker*, n'importe quel nom
   (ex. `atelier-saint-romuald`), puis coller le contenu de `worker.js`
   de ce dossier et déployer.
3. **Poser les secrets** — dans les réglages du Worker,
   *Variables and Secrets*, type **Secret** :
   - `GITHUB_TOKEN` — le jeton de l'étape 1 ;
   - `CLE_ATELIER` — la clé que tu saisiras dans le panneau. Une longue
     phrase de passe inventée fait très bien l'affaire ;
   - `ORIGINES_AUTORISEES` (recommandé) —
     `https://pfrcharlespatrick-rgb.github.io`.
4. **Brancher l'atelier** — dans le panneau Sauvegarde, section « Pousser
   vers GitHub », renseigner l'adresse du Worker
   (`https://<nom>.<compte>.workers.dev`) et la clé d'atelier. Si un jeton
   direct était enregistré, « Oublier le jeton », puis le révoquer sur
   GitHub : il ne sert plus.

Le comportement du panneau ne change pas : même branche, même fichier,
même pull request ouverte ou mise à jour automatiquement.

## Renouveler ou révoquer

- Jeton GitHub expiré : en refaire un (étape 1) et remplacer le secret
  `GITHUB_TOKEN`. Rien à changer dans le navigateur.
- Clé d'atelier compromise : remplacer le secret `CLE_ATELIER` et saisir
  la nouvelle clé dans le panneau. Le jeton GitHub n'a pas été exposé.
