# Transfert vers Claude Code — Recensements de Saint-Romuald

## Ce que c'est

Un atelier de recherche historique sur les recensements nominatifs de Saint-Romuald
(comté de Lévis, Etchemin) pour 1871, 1881 et 1891. Il sert à dépouiller les
manuscrits page par page, corriger les lectures, suivre l'avancement famille par
famille, relier une même personne d'un recensement à l'autre, et rattacher les
maisons du recensement aux adresses actuelles du chemin du Fleuve.

Chercheur : Patrick Blanchet. Le projet est en cours de dépouillement — les données
ne sont pas figées, elles se compilent en continu.

## Objectif du transfert

Reconstruire cet atelier comme un site web où :

1. **la consultation est publique** — n'importe qui peut chercher une personne, une
   famille, une adresse ;
2. **la saisie est réservée** à Patrick (et éventuellement à quelques collaborateurs) ;
3. **les données continuent de se compiler** — la saisie est l'usage principal, pas
   une fonction secondaire.

Priorités déclarées, dans l'ordre : saisir et corriger vite ; chercher une personne,
une famille, une adresse ; voir une personne à travers 1871-1881-1891 ; rattacher les
maisons aux adresses actuelles ; cartographier les maisons sur le chemin du Fleuve ;
imprimer ou exporter des fiches.

## À propos des fichiers de design

Les fichiers HTML de ce dossier sont des **références de design**, pas du code de
production à copier. `Suivi des maisons et familles.dc.html` est un prototype
fonctionnel : il montre la mise en page voulue, le vocabulaire visuel, et surtout
**le comportement exact attendu** de chaque écran. Le travail consiste à recréer ces
écrans dans l'environnement cible avec ses propres conventions.

**Fidélité : haute (hifi).** Couleurs, typographie, espacements et interactions sont
définitifs. Le prototype est utilisable tel quel — il ne s'agit pas de maquettes
approximatives. Reproduis-le fidèlement.

Aucun environnement n'existe encore côté production : à toi de choisir la pile. Voir
`HEBERGEMENT.md` pour la recommandation, qui tient compte du fait que Patrick veut
« le plus simple possible, même si c'est limité ».

## Les données

Toutes les données sont dans des fichiers `.js` qui posent un objet sur `window`.
Le dictionnaire complet — chaque table, chaque champ, chaque valeur admise — est dans
`SCHEMA.md`. **Lis-le avant de coder quoi que ce soit.**

Volume actuel : 1 629 maisons, 1 851 familles, 10 170 personnes, 195 lignes de
tableaux agricoles et industriels, 169 recoupements avec le Rapport de 1871,
20 décès, 38 bâtiments patrimoniaux identifiés.

Les schémas ont été uniformisés juste avant ce transfert (identifiants, noms de
clés, polarité de l'alphabétisation, colonnes de provenance). Les fichiers d'origine
sont conservés dans `_archive-avant-normalisation/` à la racine du projet — utiles
seulement pour vérifier qu'une valeur n'a pas bougé.

## Écrans

### 1. Barre de commande (persistante, en haut)

Deux rangées, fond `--color-surface`, filet inférieur 2 px `--color-accent-900`,
`position:sticky`.

Rangée 1 :
- Plaque « SR » — fond `--color-accent-900`, texte `--color-accent-100`,
  Barlow Condensed 19 px, interlettrage .04em, padding 5px 10px.
- Titre « SAINT-ROMUALD » — Barlow Condensed 17 px, majuscules, interlettrage .03em.
- Sous-titre « Comté de Lévis, Etchemin · recensements nominatifs » — 11,5 px,
  `--color-neutral-700`, `white-space:nowrap`.
- Sélecteur d'année : 1861, 1871, 1881, 1891, 1901, 1911. Les années sans données
  (1861, 1901, 1911) sont à `opacity:.42` — cliquables, elles mènent à un écran
  « aucune donnée ». L'année active prend `.btn-primary`.
- Séparateur vertical 1×22 px `--color-neutral-400`.
- Sélecteur de division : « Div. 1 », « Div. 2 », même logique d'opacité selon la
  disponibilité pour l'année courante.
- Bouton « Adresses (n) » — n = nombre de concordances enregistrées ; ouvre l'annexe.

Rangée 2 :
- Champ de recherche globale, pleine largeur, icône loupe 15 px positionnée à 9 px
  du bord gauche, `padding-left:30px`, hauteur 32 px, fond `--color-bg`.
  Placeholder : « Trouver une personne ou un métier dans les trois recensements… ».
- Boutons « Vue détaillée / Vue compacte », « En-tête / Masquer l'en-tête »,
  « Sauvegarde ».

### 2. Recherche globale (panneau, sous la barre)

Apparaît dès 2 caractères saisis. Cherche dans les six jeux à la fois, sur le nom
complet **et** la profession, en tenant compte des corrections locales. Plafond de
150 résultats.

Chaque résultat est un bouton pleine largeur, grille `auto 1fr auto`, filet gauche
2 px `--color-neutral-300` qui passe à `--color-accent-600` au survol avec fond
`--color-accent-100` :
- gauche : « 1871 · D1 » en Barlow Condensed 14 px `--color-accent-700`, min-width 58px ;
- centre : nom en gras, puis « 42 ans · Journalier » en `--color-neutral-700` ;
- droite : « Maison 104 · famille 147 · p. 39, l. 5 » en 12 px `--color-neutral-600`.

Au clic : bascule vers la bonne année et division, remplit le filtre local avec le
patronyme, remet la pagination à 1, déplie la famille visée, vide la recherche
globale. C'est la fonction la plus utilisée — soigne-la.

### 3. Cartouche (repliable)

Bandeau `--color-accent-900`, grille `1.5fr 1fr`. À gauche : titre « Maisons &
familles » (Barlow Condensed 34 px, blanc), une phrase de contexte, puis trois
chiffres (maisons / familles / personnes) en Barlow Condensed 27 px blanc avec
étiquettes 10,5 px majuscules interlettrage .1em `--color-accent-300`.
À droite : photo d'archive 124 px de haut, `object-fit:cover`,
`filter:saturate(.5)`, légende en surimpression sur fond `--color-accent-900` à 82 %.

L'état replié doit être mémorisé — Patrick travaille tous les jours dans cet outil
et n'a pas besoin de revoir l'en-tête chaque fois.

### 4. Bande d'avancement (toujours visible)

Fond `--color-surface`, filet inférieur 1 px `--color-neutral-300`.
Étiquette « AVANCEMENT DU DÉPOUILLEMENT » 10,5 px majuscules interlettrage .1em.
Barre empilée de 8 px de haut, segments proportionnels séparés de 1 px :
confirmées `--color-accent-700`, en cours `--color-accent-400`,
à vérifier `--color-neutral-300`. Puis la légende chiffrée et le pourcentage de
confirmées en Barlow Condensed 14 px `--color-accent-700`.

Calculé sur la division affichée uniquement.

### 5. Filtres locaux

Carte, grille `2fr 1.4fr auto` : nom de famille (filtre la division affichée),
liste déroulante des professions (construite dynamiquement à partir des données
corrigées, triée), bouton bascule « Enfants à l'école ».

À ne pas confondre avec la recherche globale : celle-ci trouve et transporte,
celle-là restreint la liste courante.

### 6. Barre d'édition (collante sous l'en-tête)

Filet gauche 3 px `--color-accent-700`. Bascule « Mode édition », phrase d'aide,
compteur de corrections, bouton « Exporter mon travail ».

Hors mode édition, les champs des tableaux de personnes restent modifiables
(c'est voulu : corriger une lecture est l'action la plus fréquente). Le mode édition
ouvre en plus les numéros de maison et de famille, les colonnes 2-4, le logement,
l'adresse actuelle, et les formulaires de liens entre recensements.

### 7. Liste des maisons

Une carte par maison. En-tête : le numéro dans une plaque
`--color-accent-900` / `--color-accent-100`, Barlow Condensed 22 px, min-width 44 px,
padding 6px 10px — il se lit comme un numéro civique estampé. Puis « MAISON » en
10,5 px majuscules et le nombre de familles. À droite, une rangée d'étiquettes :
numéro porté au manuscrit, logement (matériau · étages · pièces), colonne 2/3/4 si
ce n'est pas 4, avertissement de lecture incertaine.

Chaque famille est une ligne dépliable, filet gauche 3 px **coloré selon le statut**
(confirmé `--color-accent-700`, en cours `--color-accent-400`,
à vérifier `--color-neutral-300`) — l'avancement est lisible sans rien ouvrir.
La ligne porte : le numéro de famille, le nom du chef, les étiquettes des tableaux
annexes rattachés, et le statut. Sous le nom, une ligne par tableau annexe résumant
ses valeurs en clair (« Tableau 3 — Propriété foncière — 70 arpents, 1 maisons
possédées, 1 granges/écuries, 3 voitures, 10 charrettes »). En vue compacte, ces
résumés sont masqués, les étiquettes restent.

Dépliée, la famille montre : le tableau nominatif complet avec tous les champs
modifiables ; pour 1891 un second tableau (canadien-français, naissance des parents,
patron, employé, chômage, nombre d'employés) ; les liens vers d'autres recensements ;
l'extrait du Rapport de 1871 s'il existe, avec ses notes d'énumérateur ; le statut de
suivi et les notes personnelles.

Pagination : 20 maisons par page.

### 8. Annexe — concordances adresse-maison

Écran séparé (bouton « Adresses »). Liste les bâtiments patrimoniaux identifiés,
filtrables par source (Bussière 1990, Patrick Blanchet, autres) et par recherche
libre sur l'adresse, la désignation et les personnes.

Pour chaque bâtiment : adresse actuelle, désignation, année de construction,
personnes associées, notes ; autres adresses historiques (rue/numéro anciens) sous
forme d'étiquettes supprimables ; données cadastrales (n° de lot, année la plus
ancienne, feuillet Goad 1876, n° d'enregistrement) ; jusqu'à cinq photos avec
légende ; les propositions de concordance issues des sources, à retenir ou écarter ;
les hypothèses de Patrick (année, division, n° de maison, statut, note).

Les bâtiments ajoutés par Patrick sont modifiables et supprimables ; ceux qui
viennent d'une source publiée ne le sont pas.

### 9. Sauvegarde

Panneau dépliable depuis la barre de commande. Inventaire chiffré de tout le travail
personnel (corrections, statuts, corrections de maisons, liens, bâtiments,
concordances, fiches cadastrales, photos), puis trois actions : télécharger une
sauvegarde complète (JSON, photos incluses en data URL), restaurer un fichier,
exporter les corrections seules.

**C'est le pansement sur le vrai problème** : dans le prototype, tout le travail vit
dans le navigateur (`localStorage` + `IndexedDB`). Le site doit remplacer ça par une
base de données réelle. Voir `HEBERGEMENT.md`.

### 10. Tableaux de bas de page

Bâtiments spéciaux (constructions, maisons inhabitées, navires, logements
temporaires), institutions, et décès des 12 derniers mois. Le tableau des décès a sa
propre pagination, indépendante du rôle nominatif ; cliquer un nom lance une
recherche sur ce patronyme.

## Interactions

- **Dépliage** : chevron 14 px qui pivote de 0 à 90° en 150 ms. L'état est mémorisé
  par famille.
- **Survol de ligne** : fond `--color-neutral-100`.
- **Corrections** : chaque champ modifié colore sa ligne en `--color-accent-100` et
  fait apparaître un bouton d'annulation (icône de retour). La correction est
  enregistrée immédiatement, sans bouton « enregistrer ».
- **Passage au statut « confirmé »** : lève automatiquement le drapeau « lecture
  incertaine » sur toutes les personnes de la famille. Comportement voulu, à conserver.
- **Photos** : n'importe quel format en entrée ; l'application produit une vignette
  JPEG de 480 px de côté maximum, qualité 0.8, et nomme le fichier
  `<adresse-en-slug>-NN.<ext>`.
- **Aucune animation décorative.** C'est un outil de travail.

## Écueils à connaître

1. **Les jointures des tableaux annexes se font sur (annee, division, page, ligne).**
   La ligne annexe est rattachée à la famille si **au moins un** de ses membres est à
   cette page et cette ligne. Les 195 lignes tombent toutes juste aujourd'hui —
   vérifie que ça reste vrai après migration.
2. **1891 n'a pas de tableau 3** (lieu de résidence) : impossible de confirmer où
   vivait chaque famille. Les numéros de maison de 1891 sont ceux de l'ordre du
   recenseur, pas des numéros civiques. L'avertissement à l'écran doit rester.
3. **1891 division 2 est vide** mais déclarée disponible. Soit tu la retires de la
   liste, soit tu affiches un état vide explicite.
4. **Deux bâtiments font doublon** dans l'annexe : « 1617-1619 » (Maison Louis
   Demers, celui qui porte la photo) et « 1616, chemin du Fleuve » (Maison de Louis
   Demers, créé automatiquement par le prototype). À faire trancher par Patrick, pas
   par toi.
5. **Le tableau des décès n'a pas de division déclarée.** Elle a été inférée
   (division 1 : 11 patronymes sur 20 exclusifs à la division 1, aucun à la
   division 2) et l'inférence est marquée dans les données par `division_inferee`.
   À confirmer par Patrick.
6. **La numérotation des maisons n'est pas unique** entre années et divisions. Toute
   clé de famille doit porter (annee, division, no_maison, no_famille). Le prototype
   a longtemps oublié l'année, ce qui faisait partager la même fiche de suivi à la
   maison 1 famille 1 de 1871 et à celle de 1891.

   Corrigé, avec une migration progressive : la lecture retombe sur l'ancienne clé
   quand la nouvelle n'existe pas, et **toute écriture reprend la fiche héritée puis
   supprime l'ancienne clé** — une fiche se déplace donc vers le bon format dès qu'on
   y touche. Attention si tu reprends ce code : lecture et écriture doivent être
   traitées ensemble. Une version intermédiaire ne rendait que la lecture consciente
   de l'ancienne clé, et modifier la note d'une famille confirmée remettait
   silencieusement son statut à « à vérifier ».

   **Attention au piège suivant** : une ancienne clé est un simple
   `maison-famille`, et ces paires ne sont pas uniques d'un recensement à l'autre.
   `2-2` désigne une famille réelle dans **cinq** des six jeux. Deux conséquences,
   toutes deux traitées dans le prototype :

   - **En écriture**, consommer l'ancienne clé sans vérifier l'unicité déplacerait la
     fiche vers le premier recensement ouvert. Elle n'est donc supprimée que lorsque
     la paire ne peut désigner qu'un seul recensement.
   - **En lecture**, un repli aveugle sur l'ancienne clé fait afficher « Confirmé »
     sur cinq familles à la fois, dans cinq divisions, et gonfle chaque compteur
     d'avancement. Le repli est donc lui aussi restreint aux clés sans ambiguïté.

   Les fiches ambiguës n'apparaissent nulle part tant qu'elles ne sont pas rattachées ;
   elles sont listées dans le panneau Sauvegarde, avec le nom du chef de famille de
   chaque candidat, pour que le chercheur tranche lui-même. Reprends ce mécanisme :
   c'est la seule façon de ne pas inventer de données à sa place.

   Les six fiches de suivi actuelles, toutes au statut « confirmé » et sans note :

   | Ancienne clé | Rattachement | Chef de famille |
   |---|---|---|
   | `9-10` | 1871 D2 — certain | Joseph Roberge |
   | `58-71` | 1871 D2 — certain | John Macready |
   | `2-3` | 1871 D1 — certain | Pierre Boucher |
   | `162-227` | 1871 D1 — certain | Joseph Charbonneau |
   | `1-1` | **ambigu** (5 jeux) | à trancher par Patrick |
   | `2-2` | **ambigu** (5 jeux) | à trancher par Patrick |

   Note bien que `2-3` et `162-227` sont en division **1**, pas 2. Ne migre jamais
   ces fiches en masse vers une division supposée : reprends la table ci-dessus, et
   pour les deux cas ambigus attends la décision de Patrick.

## Jetons de design

Système « industry ». Fichier complet :
`_ds/industry-a64db930-8bb1-41cb-8804-b46972981240/styles.css`.

Couleurs de fond et de texte : `--color-bg` #f2f2f3, `--color-surface` #e9e9ea,
`--color-text` #1d1f20.

Accent (bleu ardoise) : 100 #eef6ff, 200 #d6ebff, 300 #b5d9fd, 400 #94bce3,
500 #749dc4, 600 #597ea3, 700 #416180, 800 #2c455d, 900 #1d2d3d.

Accent 2 (avertissements) : 200 #d6ebff, 500 #7e9cb8, 900 #1f2d3a.

Neutres : 100 #f5f5f8, 200 #e7e7ea, 300 #d4d4d7, 400 #b7b7ba, 500 #98989b,
600 #7a7a7d, 700 #5d5d60, 800 #424244, 900 #2b2b2d.

Typographie : titres « Barlow Condensed » 600 ; texte « Barlow » 400, 15 px,
interligne 1.55. Les chiffres et les étiquettes de section sont en Barlow Condensed —
c'est ce qui donne au projet son air de document technique.

Espacements : 3.4 / 6.8 / 10.2 / 13.6 / 20.4 / 27.2 px (échelle de 1.5).
Rayons : 2 / 4 / 7 px. Densité serrée, angles nets — pas de coins arrondis mous.

## Ressources

- `assets/chantiers-new-liverpool.jpg` — chantiers navals et commerce du bois, anse
  de New Liverpool (1847-1868). Photo d'archive du cartouche.
- `assets/photos/1617-1619-chemin-du-fleuve-01.png` — famille Louis Demers devant la
  maison, 480×360. Légende complète dans `assets/photos/photos-manifeste.json`.
  Les originaux pleine résolution sont dans Drive, « Perso_Patrick / 1616 chemin du
  Fleuve ».
- `scan-pages*/`, `scan-1891/` — scans des pages manuscrites, à la racine du projet.
  Non copiés ici (volume). Une visionneuse page à page reliée aux familles serait un
  gain considérable pour la saisie.

## Fichiers de ce dossier

- `README.md` — ce document.
- `SCHEMA.md` — dictionnaire des données, champ par champ, et schéma SQL proposé.
- `HEBERGEMENT.md` — comment mettre le site en ligne gratuitement.
- `Suivi des maisons et familles.dc.html` — le prototype complet.
- `donnees/` — tous les fichiers de données.
- `styles.css` — le système visuel.
