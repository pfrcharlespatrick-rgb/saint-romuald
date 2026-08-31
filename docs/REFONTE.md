# Refonte du site — analyse, décisions et plan de travail

Août 2026. Ce document transfère à une prochaine session tout ce qu'il faut pour
exécuter la refonte **sans redécouvrir le contexte**. Les décisions de design y
sont prises et closes ; le travail restant est de l'exécution.

**La référence de design est `maquettes/refonte-2026.html`** — un fichier
autonome, ouvrable directement dans un navigateur. Il montre les cinq écrans
sur données réelles, en mode clair et sombre, sur écran large et sur téléphone.
Fidélité attendue : haute. Les couleurs, la typographie et la structure sont
définitives ; reproduis-les, ne les réinvente pas.

Avant de commencer, lire aussi `docs/SCHEMA.md` (conventions de données —
identifiants, champs vides, disponibilité des colonnes par année) et
`docs/README.md` (intentions du projet).

---

## Pourquoi une refonte

L'analyse d'août 2026 (menée en confrontant le site rendu, ses interactions,
son poids réseau et son code) a établi ceci, par ordre d'importance :

1. **La personne n'existe pas comme page.** Le site est organisé selon la
   structure de l'archive (année → division → maison) alors que le visiteur
   arrive avec un nom. La recherche renvoie à des listes, pas à des fiches, et
   aucune URL ne pointe vers une personne — rien n'est partageable ni citable.
2. **Dépendance à des serveurs externes.** `Suivi des maisons et familles.dc.html`
   charge React depuis unpkg.com et ses polices depuis Google Fonts. **Vérifié
   en test : si unpkg ne répond pas, la page est entièrement blanche.**
3. **Poids.** La base charge 5,4 Mo de scripts avant d'afficher quoi que ce
   soit ; Filiations, 7,8 Mo. Tous les recensements sont chargés d'un coup,
   même pour consulter une seule famille.
4. **Le travail d'édition vit en localStorage** avec export manuel — fragile.
5. **Deux applications aux navigations disjointes** (base de données et
   filiations), que le visiteur ne perçoit pas comme un même corpus.
6. **Potentiel dormant** : aucune statistique, pas de carte, pas d'export de
   fiches, et les annotations de relecture ne sont pas montrées au lecteur.

Les forces à préserver : la rigueur « calculé ≠ prouvé », la traçabilité des
incertitudes (`incertain`, `remarque`), les annexes par maison, le manifeste
documentaire, et l'outil d'édition existant qui fait bien son travail.

---

## L'identité visuelle décidée : « le registre du recenseur »

L'anatomie de la page de recensement — papier réglé, filets rouges de
grand-livre, numéros de ligne en marge, annotations marginales — devient le
langage du site.

### Jetons de couleur (définitifs)

| Jeton | Clair | Sombre | Rôle |
|---|---|---|---|
| `--papier` | `#FAFAF7` | `#17181B` | fond de page |
| `--surface` | `#FFFFFE` | `#1F2024` | cartes, registres |
| `--encre` | `#26221C` | `#E7E3DA` | texte |
| `--sepia` | `#6B6357` | `#A59D8F` | texte secondaire, marginalia |
| `--regle` | `#C9D1DB` | `#3A3E45` | bordures, réglure |
| `--regle-faible` | `#E3E8EE` | `#2B2E33` | réglure fine, survols |
| `--madder` | `#A4343A` | `#D9666E` | accent — filet rouge du registre |
| `--madder-encre` | `#8E2E33` | `#E07B82` | accent sur texte |
| `--lien` | `#1A6FA8` | `#4C9BD6` | hyperliens |

Le mode sombre est piloté par `prefers-color-scheme` **et** surchargé par
`:root[data-theme="dark"]` / `:root[data-theme="light"]` (voir la maquette).

### Couleurs de graphiques (validées daltonisme + contraste, ne pas changer)

- Clair : séries `#1A6FA8` (hommes/série principale) et `#C13A42` (femmes).
- Sombre : `#4C9BD6` et `#D9666E`.
- Séquentiel (barres simples) : la série bleue seule.
- Toujours : légende dès deux séries, table de valeurs repliable sous chaque
  graphique, infobulle au survol, chiffres en `tabular-nums`.

### Typographie (piles système, pas de police téléchargée)

- Titres et corps : `'Iowan Old Style','Palatino Linotype','Book Antiqua',Georgia,serif`
- Étiquettes/colonnes : `'Avenir Next Condensed','Helvetica Neue',Arial,sans-serif`,
  capitales, `letter-spacing` .08–.14em
- Chiffres alignés : `font-variant-numeric: tabular-nums`

### Motifs signatures

- **L'extrait de registre** : table avec numéros de ligne en marge séparés par
  un **double filet rouge** (`border-right: 3px double var(--madder)`), en-têtes
  de colonnes en capitales condensées, chef de ménage en gras.
- **La marginale** : bloc italique sépia à filet gauche, portant les remarques
  de relecture et les renvois — le doute fait partie de la donnée, on l'affiche.
- **La pastille de confiance** : `forte · 6 indices` en capsule bordée, entre
  les mentions d'une trajectoire.
- Bandeau, masthead à double filet, onglets soulignés au madder : voir maquette.

---

## Les cinq écrans

1. **Accueil** — la recherche d'abord : une grande barre (nom ou métier),
   chiffres du corpus, photo des chantiers, quatre portes d'entrée.
2. **Fiche de personne** (la nouveauté centrale) — identité en une phrase,
   trajectoire 1871→1891 en cartes reliées par pastilles de confiance,
   événements (veuvage, essaimage), liste des indices, maisonnée en extrait de
   registre, marginalia de relecture, emplacement des preuves documentaires.
   **URL permanente par personne** (ex. `personne.html#1871-D2-P030-L13`).
3. **Fiche de maison** — extrait de registre complet, renvois aux tableaux
   annexes (foncier, animaux, forêts…), devenir de la maisonnée d'un
   recensement à l'autre, emplacement adresse actuelle/photo/carte.
4. **Statistiques** — pyramide des âges, métiers, origines, trajectoires ;
   recalculées depuis les données à chaque génération.
5. **Méthode** — table de disponibilité des colonnes par année (voir
   `SCHEMA.md` : relevé / à dépouiller / hors formulaire), la relecture et ses
   chiffres, les sources.

L'exemple qui traverse la maquette est réel et vérifié : les **Lee de la
maison 78 (1871 D2), aujourd'hui le 1616 chemin du Fleuve** — Thomas,
navigateur anglais, meurt entre 1871 et 1881 ; Margaret mène ensuite le ménage
(maison 106 en 1881, maison 540 en 1891).

---

## Architecture cible

Site **entièrement statique**, GitHub Pages, **zéro dépendance réseau
externe** : pas de CDN, pas de Google Fonts, pas de framework requis pour la
partie publique (la maquette est en HTML/CSS/JS nu — c'est suffisant).

- **Fiches générées** : un script Node dans `outils/` lit `data/*.js` et
  produit les fiches de personne et de maison (pages ou fragments JSON chargés
  à la demande). Jamais 5 Mo au chargement : l'index de recherche d'abord
  (quelques centaines de Ko), le reste à la demande.
- **Index de recherche** : nom normalisé (sans accents), prénom, métier →
  id de personne. Découpé en fragments si nécessaire.
- **L'outil d'édition actuel n'est pas touché** : `Suivi des maisons et
  familles.dc.html` reste l'atelier de Patrick. La refonte est la façade
  publique. Ne pas fusionner les deux ; ne pas casser l'existant pendant la
  transition.
- **Les données ne changent pas** : `data/*.js` reste la source de vérité,
  au format documenté dans `SCHEMA.md`.

---

## Les trois chantiers, dans l'ordre

### 1. Consolidation (petit, sans risque — commencer par là)
- Copier React 18.3.1 et ReactDOM (UMD, production) dans `lib/` et pointer
  `Suivi des maisons et familles.dc.html` et `filiation.html` dessus au lieu
  d'unpkg. Héberger les polices Barlow (woff2) localement ou accepter la pile
  système.
- Critère : les deux pages s'affichent complètement **sans aucune requête vers
  un domaine externe** (tester hors ligne ou proxy coupé).

### 2. Refonte publique (le cœur)
- Générer index de recherche + fiches ; construire accueil, personne, maison,
  statistiques, méthode dans l'identité de la maquette.
- `index.html` devient l'accueil de la maquette ; liens discrets vers
  l'atelier d'édition et l'app Filiations existante.
- Critères : recherche qui couvre les 10 170 personnes en moins de 500 Ko
  chargés ; chaque personne a une URL stable ; lisible sur téléphone ; modes
  clair et sombre.

### 3. Enrichissements
- Carte du chemin du Fleuve (rattachement maisons → adresses actuelles).
- Export PDF/impression des fiches.
- Sauvegarde du travail d'édition vers le dépôt (remplacer l'export manuel
  localStorage), en concertation avec Patrick.

---

## Pièges connus — lire avant de coder

- **unpkg déjà mordu** : ne réintroduire aucune dépendance CDN nulle part.
- **Champs par année** : une case absente peut vouloir dire « relevé vide »,
  « pas encore dépouillé » ou « hors formulaire ». `SCHEMA.md` fait foi ;
  l'écran Méthode de la maquette montre comment l'afficher honnêtement.
- **1891 division 2 n'est pas dépouillée** (fichier quasi vide). Origines et
  religion absentes du dépouillement 1881. Ne pas « corriger » ces vides.
- **Les remarques sont une richesse, pas du bruit** : 1 715 lignes annotées en
  1881, 338 incertaines conservant la lecture d'origine. Les afficher en
  marginalia sur les fiches.
- **`window.RECENSEMENT_*`** : chaque fichier de données pose un objet global ;
  format JSON minifié sur une ligne après le préfixe — voir les scripts
  existants dans `outils/relecture-1881/` pour la façon de les lire.
- **Ne rien pousser sur `main` sans PR**, et ne jamais modifier les valeurs
  recensées depuis le code du site.

## Note sur le choix de modèle (pour Patrick)

Les chantiers 1 à 3 sont de l'exécution sur spécification : un modèle
économique (Sonnet) convient. Revenir à un modèle fort pour la **lecture de
manuscrits** (relecture 1871, passe des professions 1881, dépouillement 1891
div. 2) et pour tout nouveau choix d'architecture ou de design.

## Référence

- Maquette : `maquettes/refonte-2026.html` (fichier autonome, données réelles)
- Version publiée : https://claude.ai/code/artifact/bdfd7682-fbea-472d-9282-15027f5fa4f8
- Analyse détaillée : conversation d'août 2026 (relecture 1881 + refonte)

---

## Affinage esthétique (passe de finition)

La refonte avait posé la structure ; cette passe travaille la **matière**. Les
jetons de couleur du tableau ci-dessus n'ont pas bougé, ni le vocabulaire —
papier, filets fins, madder, capitales condensées, chiffres alignés. Ce qui a
changé, et pourquoi :

- **Jetons dérivés** (`site.css`) : `--creux` (fond en retrait), `--voile-madder`
  (survol et sélection teintés), `--lueur` (dégradé chaud en haut de page),
  `--ombre` / `--ombre-levee` (deux niveaux au lieu d'un), `--rayon` (2px),
  `--grain`. Tous se déduisent des jetons définitifs ; les redéfinir en mode
  sombre suffit.
- **Le grain du papier** : bruit SVG fin en surimpression fixe
  (`body::before`), dosé à la limite du perceptible. C'est lui qui distingue
  une feuille d'un aplat gris. Masqué à l'impression.
- **Échelle typographique** : corps à 17px, titres en `clamp()`, interlignage
  respiré, `text-wrap: balance` / `pretty`. Le masthead porte un filet madder
  en tête de page — la signature éditoriale du site.
- **L'ouverture de l'accueil** : la photo des chantiers n'est plus un encart au
  milieu de page, c'est le seuil du site — bandeau pleine largeur, voile chaud,
  titre et guichet de recherche posés dessus. La légende imprimée au bas du
  cliché est rognée par CSS (`.ouverture-fond`), l'original n'est pas touché.
- **Le bandeau de chiffres** : les quatre tuiles forment une réglure de
  grand-livre (grille à `gap:1px` sur fond `--regle`), plus quatre boîtes
  séparées. Sert aussi aux tuiles de `stats.html`.
- **Les portes** : trois en tête, deux en pied (grille de 6 colonnes), jamais
  une carte orpheline ; numérotées en chiffres romains.
- **Le fil des trajectoires** : pastille de confiance au-dessus d'un pointillé
  fléché — le lien est calculé, jamais prouvé, et le pointillé le dit.
- **Pages de lecture suivie** (`methode.html`) : `.cadre-texte` ramène la
  colonne à la mesure du texte ; `.deborde` laisse un tableau reprendre la
  pleine page.
- **`filiation.html`** : bâtie sur le système de jetons `_ds`, elle n'a pas été
  réécrite — ses jetons sont **remappés** sur la palette du registre en tête de
  son `<style>` (clair et sombre), et sa barre de titre reprend le masthead
  public. Le gabarit de l'application ne bouge pas.

Vérifié au rendu sur les sept pages publiques, en clair et en sombre, à 1280px
et à 390px : aucune erreur console, feuille d'impression conservée. La passe
téléphone ci-dessous a repris cette vérification plus largement et corrigé ce
qu'elle avait laissé passer.

## Passe téléphone

Un audit mesuré (320, 390 et 430px, contexte tactile, les sept pages publiques
plus Filiations) a relevé des défauts que la vérification à l'œil n'avait pas
vus. Ce qui a été corrigé, et la règle à retenir :

- **Grilles `auto-fit`** : `minmax(320px,1fr)` force une colonne plus large que
  l'écran et fait déborder la page. Toutes passent en
  `minmax(min(320px,100%),1fr)` — le `min()` est ce qui rend la grille
  réellement fluide. C'est ce qui faisait déborder `stats.html` de 24px à
  320px.
- **`.filtre-annees`** (carte) ne se repliait pas : « Sans rattachement » était
  coupé net au bord. `flex-wrap:wrap`.
- **Ombres de défilement** sur `.registre`, `.deborde` et les tables de valeurs :
  un extrait de registre a huit colonnes, il défile forcément sur un téléphone,
  et rien ne le disait. Motif classique — deux voiles en `background-attachment:
  local` (ils s'effacent au bord atteint) et deux ombres en `scroll`. Sur un
  écran large où le tableau tient, le motif se masque tout seul.
- **Cibles tactiles** sous `@media (pointer:coarse)` — et seulement là, la
  densité du bureau reste celle d'un outil de travail. Les commandes montent à
  44px ; dans un registre c'est la cellule entière qui devient cliquable
  (`.registre td a{display:block;margin:-9px -12px;padding:9px 12px}`), et dans
  la frise c'est le titre du lieu. Les commandes de zoom de Leaflet demandent
  `.leaflet-touch .leaflet-bar a.leaflet-control-zoom-in` : moins spécifique, la
  règle perd contre celle de la bibliothèque.
- **Filiations** : `.titre-rangee{padding: X 0 Y}` écrasait la gouttière de
  `.enveloppe` — sur un écran plus étroit que `max-width`, la barre de titre
  collait au bord. Corrigé en `padding-top`/`padding-bottom`. La chaîne des
  mentions s'empile désormais avec sa flèche tournée, au lieu de laisser une
  colonne de flèches vide sur le côté ; les boutons Confirmer / Écarter
  passaient de 19px de haut à 40px.

- **La barre de rubriques sur une seule ligne.** Sous 760px elle repliait sur
  deux à quatre lignes et repoussait le contenu (environ 100px gagnés à 320px).
  Elle devient une ligne qui défile à l'horizontale, en pleine largeur d'écran
  (`margin-inline: calc(var(--gouttiere) * -1)`), avec les mêmes ombres que les
  registres et la barre de défilement masquée. **Conséquence à ne pas oublier :**
  sur les dernières rubriques, l'onglet courant se retrouve hors du champ et
  aucun onglet actif n'est visible — `nav.js` (site public) et
  `recadrerOnglets()` (Filiations) le ramènent au chargement, au changement de
  rubrique et au redimensionnement. Une barre défilante sans ce recadrage est
  pire que le repli qu'elle remplace.
- **Le survol collant.** Sur un écran tactile, `:hover` reste appliqué après la
  tape : un onglet non courant gardait son soulignement à côté du vrai, un
  bouton restait inversé, une porte restait soulevée. Tous les effets
  *décoratifs* de survol passent sous `@media (hover:hover)`. Les états qui
  portent de l'information (survol de ligne dans un registre) restent hors de
  cette garde.

Restent volontairement inchangés : les liens en incise dans une phrase (leur
hauteur est celle du texte, c'est normal) et le crédit d'attribution de Leaflet.
Vérifié après correction : aucun débordement horizontal à 320, 390 ni 430px,
l'onglet courant visible sur chacune des huit pages, et le rendu au bureau
identique à avant la passe — barre de rubriques non défilante, survols intacts.

Une seule source pour la gouttière depuis cette passe : `--gouttiere` (24px,
18px sous 560px), dont `.cadre`, l'ouverture et la barre défilante se servent.
Ne pas y réintroduire de valeur en dur.

### Rejouer l'audit

`node outils/audit-telephone.mjs` sert le site en local, l'ouvre dans un
Chromium en contexte tactile à 320, 390 et 430px, et vérifie les règles
ci-dessus sur les huit pages : débordement horizontal, taille des commandes
autonomes, barre de rubriques sur une ligne avec sa rubrique courante dans le
champ, présence des ombres sur ce qui défile, plancher de lisibilité du texte.
Il sort en code 1 au premier manquement, ne touche à rien, et prend ses
identifiants de fiche dans les fichiers produits par `generer-site.mjs` — il
suit donc les données plutôt qu'un exemple figé.

    node outils/audit-telephone.mjs --page methode        # une seule page
    node outils/audit-telephone.mjs --largeurs 360        # une seule largeur
    node outils/audit-telephone.mjs --captures /tmp/audit # + copies d'écran

Il demande Playwright (`npm install -g playwright && npx playwright install
chromium`), qui reste **hors du site** : les pages publiques ne chargent
toujours rien depuis le réseau.

Ce qu'il n'attrape pas : le laid. Une page peut passer l'audit et rester mal
composée — il tient les régressions mesurables, pas le coup d'œil.

Deux pièges relevés en l'écrivant, à connaître avant de « corriger » ses
signalements :

- **Un style inline gagne toujours.** Les gabarits JS de `filiation.html`
  posaient des `font-size` en dur ; la règle CSS écrite pour les relever
  n'avait aucun effet tout en ayant l'air d'agir. Corriger à la source.
- **Une grille en réglure ne doit pas porter ses filets dans ses gouttières.**
  Avec `gap:1px` sur un fond coloré, une cellule vide en fin de grille (quatre
  tuiles sur trois colonnes, entre 700 et 850px) vire au gris. Les filets sont
  donc portés par les cases elles-mêmes, en `box-shadow`, et le débord rogné
  par `overflow`.
