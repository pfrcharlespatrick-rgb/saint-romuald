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
  ligne suivante.

## Avancement

| Lot | Pages | État |
|---|---|---|
| 1 | 1 à 4 | fait |
| 2 | 5 à 10 | fait |

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
- **La numérotation des maisons de la page 40** : le manuscrit y porte 95, 96,
  97 quand le fichier porte 106, 107, 108, alors que les numéros de **famille**
  concordent. Aux pages 1 à 10 les deux séries concordent. À reprendre en
  arrivant à la page 40.
