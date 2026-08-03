# Recensement de 1881, division 1 — état de la relecture

**La division 1 est intégralement relue.** Les 88 pages du manuscrit ont été
confrontées ligne à ligne aux données de `data/recensement-1881-d1-data.js`.

Ce document dit ce qui a été vérifié, ce qui ne l'a pas été, et pourquoi.
Il ne certifie pas que chaque valeur du fichier est exacte : il dit où l'on
peut s'appuyer sur le fichier et où il faut retourner au manuscrit.

## Chiffres

| | |
|---|---|
| Personnes | **2189** (2187 au dépouillement, +2 réinsérées aux pages 4 et 43) |
| Pages | 88 |
| Maisons | 349, séquence continue de 1 à 349 |
| Familles | **400**, séquence continue de 1 à 400 |
| Lignes portant une remarque de relecture | 547 |
| Lignes marquées `incertain: true` | 154 |
| Répartition du champ `sexe` | 1091 hommes / 1098 femmes |

## Ce qui a été corrigé

**Structure.**

- Une maison et une famille numérotées « ? » servaient de fourre-tout : sept
  personnes qu'il n'avait pas su rattacher, une de la page 30 et six de la
  page 60, réunies sous un même toit. Toutes replacées, la maison fictive est
  supprimée.
- Deux numéros de famille en double (9 et 145), tous deux nés d'une rature du
  recenseur que le dépouillement avait suivie. Le cas 145 séparait James Kelly,
  60 ans, et Sophée Kelly, 53 ans, en deux ménages d'une seule personne.
- **La famille 222 était perdue** (voir plus bas), ce qui décalait d'un rang
  toutes les familles jusqu'à 226 et faisait croire à un trou dans la série.

**Deux personnes réellement omises, retrouvées par le comptage des lignes.**

- Page 4 : **Beaulieu Damase, 7 ans**. Son omission décalait toute la page.
- Page 43 : **Robin Angèle, 22 ans**. Son omission décalait la fin de la page.

Dans les deux cas la ligne a été réinsérée et la page renumérotée, identifiants
compris.

**Pages 82 et 83.** Le manuscrit n'y comporte aucune omission : sa page 82
s'arrête à la ligne 24, et c'est la page 83 qui s'ouvre par Gauthier Hélomina.
Le dépouillement l'avait rattachée à la fin de la page 82, ce qui décalait
toute la page 83. Elle a été déplacée en page 83 ligne 1 — sans quitter sa
famille — et la page 83 renumérotée. Aucune personne créée ni supprimée.

**Une soixantaine de patronymes**, dont une bonne part que le dépouillement
n'avait pas mal orthographiés mais purement inventés : Duro pour **Sirois**,
Bichette pour **Rochette**, Amical pour **Sénécal**, Bernier pour **Bérubé**,
Plamondon pour **Plaisance**, Boulet pour **Pouliot**, Morman pour
**Morneau**, Claveau pour **Clavette**, Pauldrfabri pour **Nault dit Labrie**.

**Environ deux cents prénoms et une centaine d'âges.**

## La famille 226 existait

C'est la trouvaille structurelle de la relecture, et elle contredit ce que ce
document affirmait auparavant.

Le manuscrit numérote la maison 191 avec **deux** familles : la 221, celle de
Boucher Joseph (page 48, lignes 23-25), et la 222, celle de Boucher Urbain,
81 ans, qui ouvre la page 49. Le dépouillement les avait fondues en une seule.
Toutes les familles suivantes s'en trouvaient décalées d'un rang — Demers 223
numérotée 222, Landry 224 en 223, Isabel 225 en 224, Paquet 226 en 225 — et la
numérotation se resynchronisait d'elle-même à la famille 227, page 50.

Le « trou » à 226 n'était donc pas une lubie du recenseur : c'était une famille
perdue au dépouillement. La famille 222 est rétablie et les quatre suivantes
renumérotées.

**Leçon de méthode :** une anomalie qu'on attribue au recenseur mérite d'être
revérifiée au manuscrit avant d'être classée. Celle-ci figurait depuis des
semaines dans la liste des choses « à ne pas corriger ».

## Ce qui n'est pas vérifié

**154 lignes portent `incertain: true`.** Chacune conserve la lecture d'origine
dans son champ `remarque`. Elles relèvent de trois cas :

- **Écriture illisible.** La valeur du dépouillement a été conservée faute de
  mieux. Exemple : page 79 ligne 24, le manuscrit se lit plutôt « Foncine » que
  « Francine », sans qu'on puisse trancher.
- **Lecture proposée mais non certaine.** La valeur a été changée et la lecture
  d'origine est en remarque. Exemples : « Marceau » lu **Mariage** page 55,
  « Bridget » lu **Maggy** page 74 dans une maisonnée irlandaise.
- **Contradiction non tranchée.** Voir la section suivante.

## Contradictions prénom/sexe : où en est-on

Le filtre global — en division 1 la colonne 8 est fiable, donc toute
contradiction entre le prénom et le sexe désigne le prénom comme fautif — avait
laissé six cas ouverts. Le balayage page par page en a refermé plusieurs :

- **Page 59 ligne 18** : « Elzéar » sur une ligne portant F. Le manuscrit porte
  **Agnès** ; rien dans le tracé ne ressemble à Elzéar. Réglé.
- **Page 81 ligne 7** : « Marie Elizabeth » sur une ligne portant M. **La
  contradiction est dans le manuscrit lui-même** : le recenseur a bien écrit
  « M.A. Elizabeth » et bien porté M. Ce n'est pas une faute de dépouillement.
  Les deux valeurs sont conservées telles quelles.
- **Page 65 ligne 6** : « Alice » sur une ligne portant M. Le prénom, illisible
  à cet endroit, se lit **Alec** — le même tracé revient page 76 ligne 1, cette
  fois parfaitement net. Appliqué, toujours signalé.
- **Page 51 ligne 25** : « Pierre » porté F. Au grossissement la colonne 8 ne
  porte à cette ligne qu'une marque biffée ou reprise, illisible. **Non
  tranché.**
- **Page 48 ligne 17** : « Maxime », masculin, sur une ligne portant F. Le
  manuscrit se lit « Maxime », peut-être « Maxima ». **Non tranché.**
- **Page 46 ligne 3** et **page 31 ligne 3** : **non tranchés**.

Deux corrections de sexe ont par ailleurs été faites, la colonne 8 étant
lisible et le dépouillement fautif : page 63 ligne 14 (Lucien, porté F) et
page 65 ligne 6 (porté F).

## Ce qui n'a pas à être corrigé

Vérifié au manuscrit, à ne pas « réparer » lors d'un passage ultérieur.

- **Les maisons 191, 342 et 343 abritent chacune deux familles.** Pour 342 et
  343, listées aux pages 85 et 86, d'où l'ordre 388, 390, 389, 391.
- **La page 66 ne compte que 24 lignes** parce que la ligne 25 est vide au
  manuscrit, non parce qu'une personne manque.
- **La page 88 s'arrête à la ligne 16** : c'est la fin du recensement.
- **Gagnon Frédéric et Gagnon Geneviève** relèvent de deux familles et de deux
  maisons distinctes, conformément au manuscrit.

## Questions restées ouvertes

À soumettre à qui connaît les familles de la paroisse :

- **Page 29 ligne 9** : « Cordulie » se lit comme un patronyme, non comme un
  prénom.
- **Page 47 ligne 9** : trois champs divergent d'un coup — Laroche/Larochelle,
  « Gve. Alphina »/« épse Alphina », M/F. Quand trois champs d'une même ligne
  divergent, le risque est que ce soit la ligne entière qui ait glissé ; une
  correction champ par champ ne ferait que masquer le problème. Laissée en
  l'état.
- **Page 77 ligne 16** : « Exéar » désigne vraisemblablement un Elzéar, mais ni
  le l ni le z ne sont tracés.
- **La numérotation des maisons vers la page 40**, où le manuscrit porte deux
  séries — l'une au crayon, l'autre à l'encre. Les données suivent le crayon.
  L'ancrage « maison 188 » n'a pas pu être réconcilié ; à noter que la
  pagination diffère d'un lecteur à l'autre (page N ici = page N−2 pour
  Patrick).

## Différences avec la division 2

Le dépouillement de la division 1 est **nettement plus fiable**, et l'écriture
du recenseur bien plus nette.

- **Le champ `sexe` était déjà juste** : aucune passe dédiée n'a été
  nécessaire, contrairement à la division 2 où 608 valeurs ont dû être
  rétablies. Deux corrections ponctuelles seulement.
- Le piège du F pris pour un H n'existe pas ici : la colonne 8 porte des « M. »
  et des « F. » parfaitement distincts.
- En revanche le dépouilleur bute sur les **noms composés et anglophones** :
  « Pauldrfabri » pour Nault dit Labrie, « Quirket » pour un nom en Mc,
  « Mode Louisa » pour Maud Louisa. La division 1 compte beaucoup de familles
  irlandaises et écossaises — Taylor, Wilson, Kelly, McCarthy, McNaughton,
  Comming, Atkinson, Clouston —, donc surveiller les patronymes en « Mc »,
  « O' » et « dit ».
- Le **J majuscule de ce recenseur**, à boucle descendante, a été pris pour un
  F une dizaine de fois : autant de « F.Baptiste » qui sont des **J.Baptiste**
  (pages 50, 53, 54, 69, 73, 75).
