# Outillage de relecture des recensements de 1881

Ces scripts servent à confronter ligne à ligne les données des recensements
aux images du manuscrit. Ils ont été mis au point sur la division 2, puis
adaptés à la division 1.

## Prérequis

```sh
python3 -m pip install pypdfium2 pillow numpy
```

**Joindre les PDF du manuscrit à la conversation.** Les scripts les retrouvent
tout seuls par leur nom, où que la session les ait déposés. Pour pointer
ailleurs : `export RELECTURE_PDF_DIR=/chemin/vers/les/pdf`.

## Repérage des pages — à ne pas refaire au jugé

Chaque page PDF contient **deux pages du manuscrit**, haut et bas. Le piège est
que les deux divisions s'ouvrent sur une page qui n'est pas la page 1.

| Division | PDF | Correspondance |
|---|---|---|
| 2 | partie 1 (15 p.) | 1re demi-page **blanche**, puis `demi-page = page + 1` → pages 1-29 |
| 2 | partie 2 (15 p.) | `demi-page = page - 29` → pages 30-59 |
| 1 | partie 1 (15 p.) | 1re demi-page = **page de titre**, puis `demi-page = page + 1` → pages 1-29 |
| 1 | partie 2 (15 p.) | `demi-page = page - 29` → pages 30-59 |
| 1 | partie 3 (15 p.) | `demi-page = page - 59` → pages 60-88 |

Vérifié sur les en-têtes imprimés « PAGE nn » du formulaire, et sur le contenu
des premières lignes. `locate()` implémente ces règles.

## Recalage

La grille des 25 lignes ne tombe pas au même endroit d'une demi-page à l'autre,
et elle est trop pâle pour être détectée directement. `geometry()` recale donc
chaque page sur une page de référence calibrée à la main, par corrélation du
profil de détail du formulaire imprimé. Ne pas toucher aux constantes
`REF_Y0F` / `REF_Y1F` sans revérifier visuellement qu'une bande commence bien à
la ligne 1.

## Scripts

| Fichier | Rôle |
|---|---|
| `sources.py` | localise les PDF |
| `render.py`, `align.py`, `strip.py`, `zoom.py` | division 2 : rendu, recalage, bandes, zooms |
| `render1.py`, `d1.py` | division 1 : idem, regroupés |
| `page.mjs`, `page1.mjs` | dump des données d'une page, format aligné |
| `verif.mjs` | contrôles d'intégrité de la division 2 |
| `diag1.mjs` | diagnostic structurel de la division 1 |
| `pat.mjs`, `pat1.mjs`, `pat91.mjs` | ossature d'édition du fichier de données |
| `r91.py`, `r91b.py` | 1891 division 1 : rendu des PDF de manuscrit (pages 62-83, puis 84-142) |

Exemples :

```sh
python3 -c "import d1; d1.strips(12)"        # bandes lisibles de la page 12 (D1)
python3 -c "import d1; d1.zoom(12,5,7,0.4,0.8,900)"   # zoom sur les lignes 5-7
node page1.mjs 12                            # données de la page 12 (D1)
node diag1.mjs                               # diagnostic complet (D1)
node verif.mjs                               # contrôles d'intégrité (D2)
```

Le fichier de données est du JSON minifié sur une ligne, précédé de
`window.RECENSEMENT_1881_Dn = `. Pour l'éditer : repérer le premier `{` et le
dernier `}`, `JSON.parse` le milieu, modifier, réécrire en conservant le
préfixe et le `;` final. C'est ce que font `pat.mjs` et `pat1.mjs`.

## Méthode

1. **Compter les lignes avant de lire.** Une page de recensement en compte 25.
   Une page qui en compte moins cache souvent une personne omise — et une
   omission décale tous les numéros de ligne suivants, ce qui fausse toute
   vérification ultérieure. C'est le contrôle le plus rentable.
2. **Dumper les données, puis rendre la page en bandes de 13 lignes**, marge
   des numéros de ligne comprise : c'est elle qui garantit l'alignement.
3. **Ne zoomer que sur les vraies ambiguïtés.** Les zooms coûtent cher.
4. **Ne jamais deviner.** Écriture illisible → valeur inchangée, `incertain:
   true`, et on le signale. Lecture proposée sans certitude → on l'applique
   avec `incertain: true` et on garde la lecture d'origine en remarque.
5. **Après chaque lot** : vérifier que le fichier se charge, que le total est
   inchangé, qu'aucun `id` ni `no_maison` n'est dupliqué, et que les
   références de `documents/manifeste.json` pointent toujours vers des
   personnes existantes.

## Signaux d'erreur, par ordre de rendement

Établis sur les deux divisions. Ils permettent de trouver des fautes sans même
ouvrir le manuscrit.

- **Page de moins de 25 lignes** → personne omise, et page décalée.
- **Une famille à cheval sur deux pages portant deux patronymes** → presque
  toujours une erreur. C'est ainsi qu'ont été trouvés Bilodeau/Bisson,
  Béranger/Bergeron, Francis/Lefrançois, puis Dalbrand/Baltrand,
  Gadreau/Godreau, Moreney/Morency, Evrard/Girard.
- **Contradiction entre le prénom et le sexe** → en division 1, où la colonne 8
  est fiable, c'est le **prénom** qui est fautif (Adélaïde pour Adelstan,
  Ernest Elzéar pour Harriet Eléonore).
- **Âge incompatible avec la profession** → deux ans pour un journalier.
- **Âge aberrant** : 32/12, 0/12, un chef de famille de deux mois.
- **Prénom dupliqué dans une famille** → souvent légitime (père et fils), mais
  parfois le signe d'un prénom recopié à tort.
- **Patronyme qui ne ressemble à rien** → Pauldrfabri pour « Nault dit Labrie »,
  Ournais pour Dumais, Watrochou pour Desrochers.

## Pièges d'écriture

**Division 2.** Le recenseur trace le **7 en petite boucle surélevée** : le
dépouillement l'a pris pour une rature et n'a gardé que le premier chiffre, si
bien que « 17 » est devenu « 1 » et « 27 » « 2 ». Sa **majuscule F ressemble à
un H** — d'où « H.Xavier » pour François-Xavier, et surtout l'effondrement de
la colonne 8, qui note H (Homme) et F (Femme). Son **5 se confond avec le 6**
dans les colonnes de numéros.

**Division 1.** Écriture nettement plus nette, colonne 8 fiable. Trois pièges.

Sa **majuscule J, à boucle descendante, a été prise pour un F** une dizaine de
fois : autant de « F.Baptiste » qui sont en réalité des **J.Baptiste**
(pages 50, 53, 54, 69, 73, 75). C'est le pendant du F pris pour un H de la
division 2. Devant une initiale isolée, comparer avec les « Joseph » et
« Joséphine » écrits en toutes lettres sur la même page.

Le recenseur **rature souvent** : il inscrit un numéro de maison ou de famille
sur une ligne, se ravise, et le réécrit une ligne plus bas. Le dépouillement a
plusieurs fois suivi le numéro raturé, ce qui a produit des doublons de famille
et séparé des ménages.

Le manuscrit porte enfin **deux numérotations de maisons**, l'une au crayon et
l'autre à l'encre ; **les données suivent le crayon**, qui est celle de
l'énumérateur.

## Une anomalie attribuée au recenseur n'est pas une anomalie classée

La division 1 comportait un « trou » apparent dans la série des familles — 225
puis 227 — mis au compte du recenseur et inscrit comme tel dans la liste des
choses à ne pas corriger. C'était une erreur de dépouillement : deux familles
Boucher logées dans la même maison 191 avaient été fondues en une, décalant
d'un rang tout ce qui suivait jusqu'à ce que la numérotation se resynchronise.

Avant de classer une anomalie « c'est le recenseur », la vérifier au manuscrit.

## 1891, division 1 — les deux recueils PDF

Les pages de 1891 arrivent en PDF portant **deux pages de manuscrit par page PDF**,
haut et bas, comme ceux de 1881. `r91.py` couvre les pages 62 à 83, `r91b.py` les
pages 84 à 142 ; chacun expose `strip(page, l0, l1, x0f, x1f, echelle, nom)` qui
rend une bande de lignes recalée sur la grille.

Deux pièges propres à ces recueils :

1. **Le cadre ne tombe pas au même endroit d'une page à l'autre.** `r91b.py` détecte
   les deux filets pleine largeur qui bornent les 25 lignes ; ne pas revenir à des
   constantes en dur.
2. **Les cadres des pages 89 et 90 sont intervertis sur le microfilm.** L'en-tête
   imprimé « PAGE nn » de chaque cadre fait foi — les données suivent l'en-tête, et
   les numéros de famille manuscrits le confirment. L'échange est codé dans
   `r91b.ECHANGES`.

La différence de rendement avec les images JPEG est nette : sur JPEG, le 5 et le 8 de
ce recenseur sont indiscernables et une page prend un lot entier ; sur PDF rendu à
haute résolution, vingt pages passent dans le même temps et les lectures se tranchent.
