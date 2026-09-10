# Recensement de 1871, division 1 — relecture au manuscrit

**Campagne en cours.** Les cinq recueils PDF du sous-district C (Etchemin) sont
joints à la session. Ce document dit ce qui a été vérifié, ce qui reste, et ce
qu'il faut savoir de ce manuscrit avant d'y toucher.

## Ce que portent les recueils

Vérifié en-tête par en-tête sur les 98 cadres des cinq PDF :

| | |
|---|---|
| Division 1 | **pages 1 à 78 — en entier** |
| Division 2 | **pages 1 à 17 seulement** |
| En plus | le tableau no 2 — les morts des douze derniers mois — pour la division 1 |

**Les 56 dernières pages de la division 2 ne sont pas dans ces recueils.**

Le tableau des morts est une trouvaille en soi : `docs/README.md` notait que la
division du tableau des décès avait été *inférée* et restait « à confirmer par
Patrick ». Le manuscrit porte « Sous-District C. Etchemin **Division 1** » en
toutes lettres, et ses vingt lignes correspondent aux vingt décès du fichier.
**L'inférence est confirmée.**

## L'outillage, et pourquoi il est ce qu'il est

`outils/relecture-1881/recueil71.py`. Quatre choses ont dû être comprises avant
qu'une ligne soit lisible sans risque — chacune m'a d'abord fait lire de travers.

1. **Le formulaire de 1871 compte 20 lignes**, non 25.

2. **La détection de cadres de 1891 ne transfère pas.** Le contraste de ces
   microfilms fait prendre les lignes de texte pour des filets. Ce qui marche est
   plus simple : les cadres sont des rectangles clairs sur fond noir, et c'est la
   **texture** — l'écart-type par ligne — qui les sépare de la marge blanche du
   gabarit lettre. La luminance seule coupe en deux la page qui ne porte qu'un
   cadre, celle de la division 2 page 1.

3. **Les prises sont de travers**, d'un demi-degré à un degre et quart. Sur la
   largeur d'une page cela déporte le côté droit **d'une rangée entière**. Une
   coche de la colonne 17 lue en face du nom de la colonne 7 tombe alors sur le
   mauvais habitant. La première version cherchait l'angle qui rend les filets
   les plus nets : mauvais critère. On mesure maintenant directement le
   déphasage gauche/droite par corrélation, et on tourne de quoi l'annuler.

   Reste que cette corrélation se cale une fois sur dix sur la rangée **voisine**.
   Deux garde-fous, fondés sur le fait qu'un film ne change pas d'inclinaison
   d'une prise à l'autre : déroulage par le pas des rangées, puis lissage sur les
   six pages voisines.

4. **Le recenseur pose son écriture bas dans la case**, presque sur le filet. À
   faible grossissement une marque paraît appartenir à la rangée suivante. La
   parade est `lecture()` : la page entière, colonnes 5 à 22, redressée, à une
   échelle où les vingt rangées tiennent d'un coup sans devenir illisibles.

Contrôlé sur deux pages à vérité connue avant d'écrire quoi que ce soit : la
page 4, dont les marques tombent bien sur Vermette Louis et Julienne comme le
portait le fichier, et la page 9, dont les professions Notaire et Charron se
posent enfin sur Légaré et Beaulieu.

## Ce que la relecture change

**Quatre colonnes que le dépouillement avait laissées de côté ou mal servies.**

- **Colonne 11, le lieu de naissance.** Le fichier n'en portait **qu'un seul sur
  1540**. Le manuscrit le donne à chaque ligne : « Q. » écrit une fois par page
  puis repris au guillemet, avec les exceptions écrites en toutes lettres —
  Irlande, États-Unis. La relecture le verse partout.
- **Colonne 17, l'école.** Le dépouillement en avait relevé 253 sur toute la
  division ; le manuscrit en porte bien davantage, et pas toujours aux mêmes
  lignes. La page 9 est le cas le plus net : le fichier cochait les lignes 3
  et 6, le manuscrit coche les lignes 1, 2 et 5.
- **Colonnes 18 et 19, l'incapacité de lire et d'écrire.** Le fichier n'en portait
  que 13 sur toute la division. Les dix premières pages en donnent déjà autant.
- **Colonne 10, les nés dans les douze mois.** Le dépouillement a mis « 7 mois »
  à tous les nourrissons — une valeur par défaut, jamais une lecture. Le
  manuscrit donne la fraction exacte (1/12, 3/12, 8/12…) et le mois de naissance.

## Pièges d'écriture de ce recenseur

- **Le 7 s'ouvre en haut et se confond avec un 4.** Page 2 ligne 11, une Camille
  de 7 ans était devenue une Camille de 4 ans — et sa marque d'école avec.
- **Les guillemets de reprise portent loin.** Une origine « Irlandaise » écrite
  une fois vaut pour toute la famille : le dépouillement a plusieurs fois rendu
  les enfants « Français » alors que le père est Irlandais (page 8 ligne 16,
  page 10 lignes 6 à 8).
- **Une profession écrite entre deux lignes appartient à la première.** Page 3,
  le « Couturière » de Julie, 43 ans, avait glissé sur la Suzanne de 3 ans de la
  ligne suivante ; page 15, l'origine irlandaise et le métier d'institutrice
  d'Ann Manahan étaient passés à la ligne d'en dessous ; page 22, le « Commis »
  d'Adèle Baudry avait glissé sur Damase Roberge, marchand.
- **Le F majuscule pris pour un H**, le piège même de la division 2 de 1881 :
  page 25 ligne 14, un « H. Xavier » qui est un **Fˢ Xavier**.
- **Le sexe suit le prénom mal lu.** Quatre fois en vingt-huit pages, une
  personne a changé de sexe avec son prénom : « Cook Clarisse » qui est **Coté
  Narcisse** (p20), « Marie » qui est **Moïse** (p25 L3), « Marie » qui est
  **Rémi** (p25 L16), « Victor » qui est **Victoire** (p27 L1). La colonne 8 du
  manuscrit tranche à chaque fois.

## Avancement

| Lot | Pages | État |
|---|---|---|
| 1 | 1 à 4 | fait |
| 2 | 5 à 10 | fait |
| 3 | 11 à 16 | fait |
| 4 | 17 à 22 | fait |
| 5 | 23 à 28 | fait |
| 6 | 29 à 34 | fait |

Depuis le lot 3, les colonnes à marques — 15, 17, 18 et 19 — s'écrivent en
**chaînes de vingt caractères par page**, une par colonne. La forme oblige à se
prononcer sur les vingt lignes plutôt que sur les seules qui changent : c'est
ce qui garantit que la colonne est *relue*, et non seulement corrigée là où
l'œil a accroché.

## Le décalage des pages 28 à 31 — trouvé et réparé

C'est la trouvaille structurelle de la campagne, et elle explique du même coup
le **seul conflit de position des cinq recensements du site**.

Le dépouillement portait, page 28 lignes 1 à 5, cinq enfants Paradis rattachés à
la famille 104 — celle de Léon Paradis, **28 ans**, et d'Emélie, **23 ans**. Ce
sont les mêmes cinq personnes, aux mêmes âges, que les enfants de Paradis
François et Marie à la page 34 : Malvina 20, Louis 17, Cyprienne 15, Marie 12 et
Catherine 26. Un couple de 28 et 23 ans n'a pas de fille de 26 ans, et le
manuscrit, à la page 28, ne porte rien de tel : il ouvre sur Montigny François,
85 ans.

Ces cinq lignes de trop poussaient de cinq rangs tout ce qui suit, sur quatre
pages. Arrivé à la page 31, le dépouillement s'est resynchronisé en réutilisant
les numéros 16 à 20, déjà pris : d'où les cinq identifiants en « -2 » et la
remarque « lignes 16-20 en conflit avec la maison 80 », qui traînait dans les
données comme une énigme.

`outils/relecture-1881/repar71.mjs` retire les cinq doublons — reconnus au nom,
au prénom et à l'âge, jamais au seul numéro de ligne — puis renumérote d'un
seul tenant les pages 28 à 31. **Le compte retombe juste au caractère près** :
chacune des quatre pages reprend exactement vingt lignes, et chaque ligne
retrouve la personne que le manuscrit y porte. Vérifié aux cinq charnières —
Montigny François en tête de la 28, Lépine Philomène en tête de la 29, Clavette
Luce en 29 ligne 16, Leclerc Philippe en tête de la 31, Gosselin Bénoni en
31 ligne 16.

La division passe de 1540 à **1535 personnes**, et `analyse-filiation.mjs` a été
rejoué pour que les liens suivent les identifiants.

## Le compte du manuscrit, et ce qu'il dit

Le total inscrit en marge de la page 78 est **1543**. Il se vérifie : 77 pages
de vingt lignes, plus les trois de la page 78. Le fichier en compte 1535.

L'écart de huit s'explique ligne à ligne :

| Page | Lignes du manuscrit | Lignes du fichier | Manquantes |
|---|---:|---:|---|
| 4 | 20 | 17 | L1 à L3 — Vermette Ambroise, Olivier, Joseph |
| 49 | 20 | 19 | la dernière |
| 61 | 20 | 19 | L1 |
| 64 | 20 | 19 | L4 |
| 75 | 20 | 18 | L1 et L2 |

**Huit personnes manquent au dépouillement**, et cinq y figuraient en trop. Les
cinq sont retirées ; les huit restent à réinsérer, ce qui suppose de renuméroter
chaque page concernée.

## Ce qui reste ouvert

- **Trois personnes omises du dépouillement, page 4 lignes 1 à 3** : Vermette
  Ambroise, 35 ans, journalier ; Vermette Olivier, 31 ans ; Vermette Joseph,
  21 ans. Le manuscrit porte 20 lignes, le fichier 17. À réinsérer — ce qui
  décale les numéros de ligne de toute la page, donc à faire à part.
- **Le total du manuscrit est 1543**, écrit en marge de la page 78 ; le fichier
  en compte 1540. L'écart est exactement celui de la page 4.
- **Les patronymes « Peltier » et « Pelletier »** cohabitent dans le
  dépouillement là où le manuscrit semble n'écrire que « Peltier » (page 5
  ligne 9, page 8 lignes 3 à 9). Non tranché : le tracé est ambigu et sept
  fiches en dépendent.
- **« Laird » ou « Lord »**, page 3 ligne 6 et sa famille. Le manuscrit se lit
  « Lord » ; le dépouillement porte « Laird ». Laissé tel quel faute de
  corroboration — mais leur **origine** est bien « Française » au manuscrit, mot
  pour mot celui de la ligne 4, et non « Écossaise » comme le déduisait le
  dépouillement du seul patronyme. Corrigé, signalé.
- **Deux numérotations à reprendre à part**, qui ne sont pas des champs de
  personne et que l'outil de lot ne peut pas toucher :
  la **famille 52** manque au fichier — la page 14 ligne 9 porte 53 là où le
  manuscrit porte 52, et la page 15 ligne 2 a dû recevoir un « 53b » de fortune ;
  et la **maison 55** manque de même — la page 22 ligne 15 porte 56 au fichier
  quand le manuscrit porte 55, la 56 étant à la ligne 17.
- **La numérotation des maisons de la page 40** : le manuscrit y porte 95, 96,
  97 quand le fichier porte 106, 107, 108, alors que les numéros de **famille**
  concordent. Aux pages 1 à 10 les deux séries concordent. À reprendre en
  arrivant à la page 40.
