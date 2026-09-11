# Recensement de 1871, division 1 — relecture au manuscrit

**Division 1 terminée.** Les 78 pages ont été relues ligne à ligne sur les
recueils PDF du sous-district C (Etchemin). Le fichier compte désormais
**1543 personnes — le total que le recenseur a lui-même inscrit en marge de sa
page 78** — et chaque page porte exactement le nombre de lignes du manuscrit.

Ce document dit ce qui a été fait, ce qu'il faut savoir de ce manuscrit avant
d'y toucher, et ce qui reste ouvert.

## Ce que portent les recueils

Vérifié en-tête par en-tête sur les 98 cadres des cinq PDF :

| | |
|---|---|
| Division 1 | **pages 1 à 78 — en entier** |
| Division 2 | **pages 1 à 15 seulement** — la dernière page PDF répète les pages 14 et 15 |
| En plus | le tableau no 2 — les morts des douze derniers mois — pour la division 1 |

**Les 58 dernières pages de la division 2 — 16 à 73 — ne sont pas dans ces recueils.**

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
   faible grossissement une marque paraît appartenir à la rangée suivante. Deux
   parades : `lecture()`, la page entière redressée à une échelle où les vingt
   rangées tiennent d'un coup ; et `paire()`, qui accole la colonne des noms aux
   colonnes 15 à 22 en gardant les numéros de rangée des deux marges — c'est
   avec elle qu'on relève les coches sans jamais se tromper d'un rang.

Contrôlé sur deux pages à vérité connue avant d'écrire quoi que ce soit : la
page 4, dont les marques tombent bien sur Vermette Louis et Julienne comme le
portait le fichier, et la page 9, dont les professions Notaire et Charron se
posent enfin sur Légaré et Beaulieu.

## Les outils de la campagne

| | |
|---|---|
| `recueil71.py` | localise, redresse et rend les images du manuscrit |
| `page71.mjs` | affiche une page du fichier, toutes colonnes alignées |
| `pat71.mjs` | ossature d'écriture : filtre les champs de la main de Patrick, n'écrit que ce qui change |
| `lot71.mjs` | applique un lot de lectures — voir les chaînes de vingt caractères plus bas |
| `insere71.mjs` | réinsère une personne omise et renumérote sa page, ou une plage de pages |
| `repar71.mjs` | la réparation ponctuelle des pages 28 à 31 |

Les lots sont dans `outils/relecture-1881/lots71/`, un fichier par tranche de
pages, plus les trois fichiers d'insertion. Ils sont **rejouables** : chacun dit
exactement ce qui a été lu et pourquoi.

## Ce que la relecture change

**Quatre colonnes que le dépouillement avait laissées de côté ou mal servies.**

- **Colonne 11, le lieu de naissance.** Le fichier n'en portait **qu'un seul sur
  1540**. Le manuscrit le donne à chaque ligne : « Q. » écrit une fois par page
  puis repris au guillemet, avec les exceptions écrites en toutes lettres —
  Irlande, Angleterre, Écosse, États-Unis. La relecture le verse partout.
- **Colonne 17, l'école.** Le dépouillement en avait relevé 253 sur toute la
  division ; le manuscrit en porte davantage, et pas toujours aux mêmes lignes.
- **Colonnes 18 et 19, l'incapacité de lire et d'écrire.** Le fichier n'en portait
  que 13 sur toute la division ; le manuscrit en porte des centaines.
- **Colonne 10, les nés dans les douze mois.** Le dépouillement a mis « 7 mois »
  à tous les nourrissons — une valeur par défaut, jamais une lecture. Le
  manuscrit donne la fraction exacte (1/12, 3/12, 8/12…) et le mois de naissance,
  et les deux se recoupent : un enfant de 4/12 porte « D. » pour décembre, à
  quatre mois du 2 avril 1871.

Depuis le lot 3, les colonnes à marques — 15, 17, 18 et 19 — s'écrivent en
**chaînes de vingt caractères par page**, une par colonne. La forme oblige à se
prononcer sur les vingt lignes plutôt que sur les seules qui changent : c'est
ce qui garantit que la colonne est *relue*, et non seulement corrigée là où
l'œil a accroché.

## Pièges d'écriture de ce recenseur

- **Le 7 s'ouvre en haut et se confond avec un 4.** Page 2 ligne 11, une Camille
  de 7 ans était devenue une Camille de 4 ans — et sa marque d'école avec.
- **Le 9 et le 3 se ressemblent**, et c'est le piège le plus coûteux : le 9 ferme
  une boucle et descend droit sous la ligne, le 3 fait deux bosses et s'arrête
  sur la ligne. À la page 66, deux corrections que je m'apprêtais à écrire
  étaient de fausses corrections.
- **Le 8 ferme ses deux boucles, le 9 non.** C'est ce qui sépare un 28 d'un 29.
- **Les guillemets de reprise portent loin.** Une origine « Irlandaise » écrite
  une fois vaut pour toute la famille, et parfois jusqu'au bas de la page
  suivante : le dépouillement a rendu « Français » des dizaines d'enfants
  irlandais, anglais et écossais.
- **Une profession écrite entre deux lignes appartient à la première.** Le cas
  revient une dizaine de fois — « Couturière », « Menuisier », « Journalier »,
  « Servante », « Commis » glissés d'un rang.
- **Le F majuscule pris pour un H**, le piège même de la division 2 de 1881 :
  page 25 ligne 14, un « H. Xavier » qui est un **Fˢ Xavier**.
- **Le sexe suit le prénom mal lu**, ou le contredit. Six fois, une personne a
  changé de sexe avec son prénom. Et trois fois le manuscrit lui-même se
  contredit — une épouse portée « M » en colonne 8 (pages 70 et 71) : ces
  lignes-là sont signalées, non suivies.
- **Un nourrisson pris pour un vieillard.** Deux fois, une fraction sur douze
  lue comme un nombre d'années : Mathilda Gosselin, cinq mois, devenue une
  Mathilde de 75 ans (page 56), et Albert Charbonneau, onze mois, devenu un
  vieillard de 70 ans (page 62).

## Avancement

| Lot | Pages | État |
|---|---|---|
| 1 à 6 | 1 à 34 | fait |
| 7 | 35 à 40 | fait |
| 8 | 41 à 46 | fait |
| 9 | 47 à 52 | fait |
| 10 | 53 à 58 | fait |
| 11 | 59 à 64 | fait |
| 12 | 65 à 70 | fait |
| 13 | 71 à 78 | fait |

**Les 78 pages sont relues.**

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
seul tenant les pages 28 à 31. Vérifié aux cinq charnières — Montigny François
en tête de la 28, Lépine Philomène en tête de la 29, Clavette Luce en 29
ligne 16, Leclerc Philippe en tête de la 31, Gosselin Bénoni en 31 ligne 16.

## Les huit personnes rendues au registre

Le manuscrit portait 1543 lignes, le fichier 1535. Les huit manquantes sont
retrouvées et réinsérées, chacune à sa place dans l'ordre des visites :

| Page | Ligne | Qui | Ce que l'omission avait fait |
|---|---|---|---|
| 4 | 1 à 3 | Vermette **Ambroise** 35, **Olivier** 31, **Joseph** 21, journaliers, fils d'Olivier et Thérèse | trois lignes de moins, sans décalage |
| 49 | 1 | **Lecours Catherine**, 80 ans, veuve, ne sachant ni lire ni écrire, dans la maisonnée Gelly | toute la page décalée d'un rang |
| 60 | 4 | **Richard Stanislas**, 10 ans, à l'école, entre son père et son frère George | la page décalée, et la Léda Landry de la 61 passée sur la 60 |
| 64 | 2 | **Godbout Joséphine**, 7 ans, à l'école, entre sa mère et sa sœur Adèle | le fichier sautait le numéro 4 ; le trou était deux lignes plus haut |
| 75 | 1 et 2 | **King Croford** 7 ans (à l'école) et **King Maggie** 5 ans, derniers enfants de Samuel King | deux lignes de moins |

`insere71.mjs` fait ce travail : il pose la personne à sa place dans l'ordre des
visites — l'ancre est la personne qu'elle suit, jamais un numéro de ligne — puis
renumérote la page, ou la plage de pages quand l'insertion déborde, et vérifie
qu'elle retombe à vingt lignes sans identifiant en double.

**Le compte est juste au caractère près** : 77 pages de vingt lignes plus les
trois de la page 78 font 1543, et c'est ce que le fichier porte.

## Ce qui reste ouvert

- **Les numéros de maison du manuscrit ne se raccordent pas.** C'est le
  recenseur lui-même qui le dit : en marge de la page 41, « **erreur page 39** »,
  avec le 92 biffé et 109 récrit ; en marge de la page 52, « **erreur page 46** »,
  avec le 112 biffé et 136 récrit. Et il se trompe encore en se corrigeant : à la
  page 46 il numérote 100 et 101 là où la suite appelle 126 et 127, et sa
  correction de la page 52 ne rattrape pas l'écart. Les numéros de **famille**,
  eux, concordent partout avec le fichier — c'est sur eux qu'il faut s'appuyer.
  Le dépouillement a renuméroté les maisons d'un seul tenant : sa série est
  cohérente, celle du manuscrit ne l'est pas. **Rien n'a été touché.** Une passe
  dédiée reste à faire si Patrick veut que le site porte les numéros du
  manuscrit plutôt qu'une série continue.
- **Deux familles que le dépouillement a logées dans une maison à elles** alors
  que le manuscrit ne leur en donne pas : les Doherty (famille 180, page 49) et
  les Syrois (famille 217, page 59) partagent le toit de la maisonnée
  précédente. Cela suppose de déplacer une famille d'un objet maison à un autre,
  ce que l'outil de lot ne sait pas faire.
- **Deux numérotations à reprendre à part**, du même ordre : la **famille 52**
  manque au fichier — la page 14 ligne 9 porte 53 là où le manuscrit porte 52, et
  la page 15 ligne 2 a dû recevoir un « 53b » de fortune ; et la **maison 55**
  manque de même — la page 22 ligne 15 porte 56 au fichier quand le manuscrit
  porte 55.
- **Un patronyme indéchiffrable**, page 69 ligne 10 : le dépouillement portait
  « Sébrity », mais la majuscule est celle du « Léda » trois lignes plus bas —
  le nom commence donc vraisemblablement par L. Sept fiches en dépendent ;
  laissé tel quel, signalé sur la ligne.
- **« Boumier »**, page 48 ligne 5 : le mot de la colonne 14 n'est pas
  « Boulanger » — il n'a ni la haste du l ni la jambe du g, que le vrai
  « Boulanger » de la page 47 montre tous deux. Métier non identifié.
- ~~**« Laird » ou « Lord »**, page 3 ligne 6 et sa famille.~~ **Tranché : le
  manuscrit porte « Lord »** — L, o, r, d, sans le i pointé qu'exigerait
  « Laird ». Les quatre fiches sont récrites, marquées `incertain`, la lecture du
  dépouillement gardée en remarque. Leur **origine** est bien « Française » au
  manuscrit, et non « Écossaise » comme le déduisait le dépouillement du seul
  patronyme.
- **« Peltier » sans la syllabe du milieu** : tranché aux pages 55 et 73, où le
  tracé est net. Les pages 5, 8, 15, 16 et 65 portent encore « Peltier » ou
  « Pelletier » selon les lignes ; la page 65 est réglée (c'est **Belleau**), les
  autres restent à trancher au tracé.
- **Les trois épouses portées « M » en colonne 8** (pages 70, 71 et 76) : le
  manuscrit se contredit lui-même. Signalé sur la ligne, non suivi, sauf pour
  Fany Bear (page 76) dont le métier de jardinier corrobore le M.

## Le contrôle de cohérence — et le piège des chaînes de vingt caractères

Les colonnes à marques se lisent comme des **chaînes de vingt caractères**, une par
page et par colonne. C'est la bonne forme : elle oblige à se prononcer sur les vingt
lignes plutôt que sur les seules qui changent. Mais elle a un défaut, et il est
sournois — **une chaîne décalée d'un rang reste une chaîne valide.** Rien, dans le
fichier, ne dit qu'elle est fausse.

Un contrôle systématique a donc été passé sur les 78 pages, une fois tous les lots
appliqués : `outils/relecture-1881/controle71.mjs`. Il ne cherche pas des marques, il
cherche **ce qu'un décalage produit** — un enfant de cinq ans porté marié, un chef de
ménage dont seule la femme est dite mariée, un nourrisson qui ne sait pas lire.

### Neuf chaînes décalées, toutes en bas de page

Le contrôle en a débusqué neuf : les pages **22, 29, 30, 31, 38, 39, 40, 54** de la
division 1 et la page **33** de la division 2. Toutes en colonne 15, toutes sur les
derniers couples de la page. La cause est dans l'image, non dans la lecture : le
déphasage des prises de vue s'accumule vers le bas du cadre, et l'œil qui compare des
milieux de cellule saute un rang.

Le signal le plus sûr est le **couple de tête dissymétrique** : le chef perd son « M »,
la ligne suivante en gagne un. Ainsi page 31, où Bénoni Gosselin, 35 ans, chef de la
famille 119, n'était plus marié tandis que sa fille Éléonore, cinq ans, l'était.

Dix-huit champs ont été rendus à leur ligne, plus un en division 2. La **page 10**, qui
n'avait reçu aucune chaîne de colonne 15, a reçu la sienne : Charles Brother, 37 ans,
retrouve son « M ».

Deux chaînes d'alphabétisation de la **page 42** avaient le même défaut, trouvé au même
contrôle : les marques tombaient sur Pierre Garant, quinze ans, et Françoise, treize,
au lieu des Lavertu, vingt-trois ans tous les deux. Corrigées.

### Cinq frontières de famille ouvertes une ligne trop tôt

Le formulaire n'écrit les numéros des colonnes 5 et 6 **qu'à la première ligne du
ménage**. Ouvrir une famille une ligne trop tôt décroche du ménage précédent ce qui lui
restait. Le contrôle repère une famille dont la tête ne porte pas le patronyme
dominant ; le manuscrit tranche, numéro de famille à l'appui.

| Page | Qui était décroché | Rendu à |
|---|---|---|
| 12 L3 | Marcelline Cantin, 18 ans, servante | les McNaughton, famille 42 |
| 37 L1-3 | Mary, Robert et Pepsi Clouston, 8, 4 et 2 ans | leur père Francis, famille 137 |
| 64 L5 | Adèle Croteau, 23 ans, servante | Joséphine Godbout, famille 236 |
| 66 L1 | Daniel Campbell, 26 ans, millwright | les Belleau, famille 244 |
| 74 L1-2 | Malvina Paradis, servante, et Mary Ritchie, 17 ans | les Ritchie, famille 279 |

Huit personnes replacées, par `outils/relecture-1881/recoller71.mjs`, qui les reconnaît
au nom, au prénom, à l'âge, à la page et à la ligne — jamais au seul rang.

**Le bruit de ce contrôle est instructif** : il signale aussi huit familles dont la tête
porte un autre nom que les siens, et ce ne sont pas des erreurs. Ce sont des **veuves
inscrites sous leur nom de fille**, avec des enfants au nom du père — Julie Paradis chez
les Roberge, Angélique Boutin chez les Topping, Ann Manahan chez les Lemoine. L'usage
québécois. L'outil montre ; il ne tranche pas.

### Ce qui reste signalé, et pourquoi

Quinze signalements survivent sur les 2 242 personnes relues, tous vérifiés au
manuscrit et tous légitimes : quatorze personnes qui savent lire sans savoir écrire —
la colonne 19 se coche parfois sans la 18 —, deux nourrissons dont le recenseur a
oublié le mois (pages 29 et 45), deux fils mariés vivant chez leurs parents, et les
huit veuves ci-dessus. **Aucun mineur porté illettré, aucun enfant porté marié, aucun
âge absent, aucune valeur entre crochets.**

## Et la division 2

Faite aussi, et racontée à part : `docs/RELECTURE-1871-D2.md`. Les recueils en
portent les **pages 1 à 35** : le cinquième s'arrête à la page 15 — sa dernière
page PDF répète les pages 14 et 15 au lieu de porter les 16 et 17 — et un
sixième, joint plus tard, reprend exactement aux pages 16 à 35. Les 38 pages
suivantes demanderont d'autres images.
