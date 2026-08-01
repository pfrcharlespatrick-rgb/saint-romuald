# Recensement de 1881, division 1 — état de la relecture

**Relecture en cours.** La structure est assainie et les pages 1 à 4, 43 et 66
sont relues. Il reste l'essentiel du balayage page par page.

Pour reprendre : joindre les trois PDF du manuscrit à la conversation et lire
`outils/relecture-1881/README.md`, qui documente le repérage des pages, le
recalage et les signaux d'erreur.

## Chiffres

| | |
|---|---|
| Personnes | **2189** (2187 au dépouillement, +2 réinsérées) |
| Pages | 88 |
| Maisons | 349, séquence continue de 1 à 349 |
| Familles | 399 |

## Ce qui est fait

**Structure — terminée.**

- Une maison et une famille numérotées « ? » servaient de fourre-tout : sept
  personnes qu'il n'avait pas su rattacher, une de la page 30 et six de la
  page 60, réunies sous un même toit. Toutes replacées, la maison fictive est
  supprimée.
- Deux numéros de famille en double (9 et 145), tous deux nés d'une rature du
  recenseur que le dépouillement avait suivie. Le cas 145 séparait James Kelly,
  60 ans, et Sophée Kelly, 53 ans, en deux ménages d'une seule personne.
- Quatre patronymes rétablis aux charnières de page : Dalbrand → **Baltrand**,
  Gadreau → **Godreau**, Moreney → **Morency**, Evrard → **Girard**.

**Deux personnes réellement omises, retrouvées par le comptage des lignes.**

- Page 4 : **Beaulieu Damase, 7 ans**. Son omission décalait toute la page.
- Page 43 : **Robin Angèle, 22 ans**. Son omission décalait la fin de la page.

Dans les deux cas la ligne a été réinsérée et la page renumérotée, identifiants
compris.

**Pages relues :** 1, 2, 3, 4, 43, 66.

## Ce qui reste

**Le balayage des pages 5 à 88**, hors 43 et 66 déjà faites.

**Les pages 82 et 83, à reprendre en priorité et avec soin.** Ce n'est pas une
omission mais un décalage de page, et une tentative maladroite y créerait un
doublon — c'est ce qui a failli arriver.

- Le manuscrit met **Hélomina en tête de la page 83** ; les données la placent
  en fin de page 82. Elle existe déjà : **ne pas l'insérer**.
- La page 82 des données porte donc une ligne de trop, la page 83 une de
  moins, et les numéros de ligne de la fin de la page 82 sont décalés.
- Ce que les données appellent « Caroline » à la page 82 ligne 23 se lit
  **Exilia** au manuscrit, à la ligne 24.
- Manuscrit page 82 : L21 = 328/374 Gauthier George 28, L22 Marie 27,
  L23 George 4, L24 Exilia 2, L25 Jos. Arthur 0 mars.
- Manuscrit page 83 : L1 Gauthier Helmina 0 mars, L2 Edmond Marie 71,
  L3 = 329/375 Montminy Joseph 48.

Marche à suivre : renuméroter la fin de la page 82, déplacer Hélomina en
page 83 ligne 1, décaler toute la page 83 de +1, puis appliquer les corrections
de lecture déjà relevées (numéros de ligne exprimés **après** décalage) :
L10 Alphonsine → Appolinaire ; L11 mois août → avril ; L14 Eugénie → Virginie ;
L16 âge 0/12 → 5/12 (juin) ; L24 âge 0/12 (avril) → 4/12 (nov.).

**Un filtre global à passer**, qui devrait révéler d'un coup une partie des
prénoms restants : en division 1 la colonne 8 est fiable, donc **toute
contradiction entre le prénom et le sexe désigne le prénom comme fautif**.
Trois cas déjà trouvés ainsi : Adélaïde → Adelstan, Marie → Xavier,
Ernest Elzéar → Harriet Eléonore.

## Ce qui n'a pas à être corrigé

Vérifié au manuscrit, à ne pas « réparer » lors d'un passage ultérieur.

- **La famille 226 n'existe pas** : la série passe de 225 à 227. C'est le
  recenseur.
- **Les maisons 342 et 343 abritent chacune deux familles**, listées aux
  pages 85 et 86, d'où l'ordre 388, 390, 389, 391.
- **La page 66 ne compte que 24 lignes** parce que la ligne 25 est vide au
  manuscrit, non parce qu'une personne manque.
- **Gagnon Frédéric et Gagnon Geneviève** relèvent de deux familles et de deux
  maisons distinctes, conformément au manuscrit.

## Différences avec la division 2

Le dépouillement de la division 1 est **nettement plus fiable**, et l'écriture
du recenseur bien plus nette.

- **Le champ `sexe` est déjà juste** : 1089 hommes pour 1098 femmes, et les 328
  couples mariés de deux personnes ont tous des sexes opposés. **Aucune passe
  dédiée n'est nécessaire**, contrairement à la division 2 où 608 valeurs ont
  dû être rétablies.
- Le piège du F pris pour un H n'existe pas ici : la colonne 8 porte des « M. »
  et des « F. » parfaitement distincts.
- En revanche le dépouilleur bute sur les **noms composés et anglophones** :
  « Pauldrfabri » pour **Nault dit Labrie**, « Quirket » pour un nom en Mc,
  « Mode Louisa » pour **Maud Louisa**. La division 1 compte beaucoup de
  familles irlandaises et écossaises — Taylor, Wilson, Kelly, McCarthy,
  McNaughton, Comming —, donc surveiller les patronymes en « Mc », « O' » et
  « dit ».
