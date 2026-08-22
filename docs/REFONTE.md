# Refonte du site — analyse, décisions et plan de travail

> **État (août 2026) : la refonte est exécutée.** Les trois lots de travail
> décrits plus bas sont livrés — le site public actuel (`site.css`, les pages
> `index/personne/maison/carte/stats/methode.html`) en est le résultat. Ce
> document reste la référence de l'identité visuelle (jetons, typographie,
> motifs) ; son plan de travail est historique.

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
`docs/archive/TRANSFERT.md` (intentions du projet).

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
