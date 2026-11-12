# Les plans anciens

Quatre feuilles de l'atlas d'assurance de Charles E. Goad, « Quebec Coves.
South Shore » (mars 1876), sont posées en surimpression de la carte
(`carte.html`). Elles y sont revenues le 12 novembre 2026, **calculées** depuis
les lieux que Patrick a rattachés à leur numéro Goad, et non plus posées à
l'œil. Le cadastre de 1879 reste retiré (voir à la fin).

Trois fichiers :

| Fichier | Ce qu'il porte |
|---|---|
| `assets/plans/quebec-coves-1876-f12.jpg` … `f15.jpg` | les images des feuilles, telles que fournies |
| `data/plans-reperes.json` | les repères : un point lu sur la feuille (pixels) ↔ un lieu de `data/lieux-data.js` |
| `data/plans-data.js` | les plans tels que la carte les lit : titre, source, note, trois coins, `cale` |

`node outils/lieux/caler-plans.mjs` relit les repères et les lieux, calcule les
trois coins de chaque feuille, les écrit dans `data/plans-data.js` et dit les
écarts. `--essai` montre sans écrire.

## Ce qu'il faut savoir avant de s'y fier

**Ces feuilles ne sont pas dessinées à une échelle constante.** Chacune est
juste autour de ses repères ; mais entre deux repères éloignés d'un kilomètre,
le dessin est trop long ou trop court d'une centaine de mètres. C'est mesuré,
et c'est ce qui avait fait échouer les calages de l'été 2026 :

- du village de New Liverpool (feuille 14) à l'église anglicane de la côte
  Rouge (feuille 13), le dessin est **trop long de 133 m** ;
- de la maison du curé Sax (feuille 12) au raccord avec la feuille 13, il
  manque à l'inverse **76 m** ;
- l'église Saint-Romuald, sur le plateau, est dessinée à une centaine de
  mètres de sa place quand on cale la feuille 12 sur le chemin du Fleuve — le
  plateau n'intéressait pas l'assureur, il est esquissé.

Une feuille se pose d'un bloc (trois coins : échelle, orientation, position).
Elle ne peut donc pas être juste partout à la fois, et deux feuilles bien
posées **ne se rejoignent pas forcément à leur lisière**. On a choisi la
justesse près des repères — là où sont les maisons qu'on cherche — plutôt
qu'un raccord propre entre feuilles.

Ce qui tient, en revanche, d'une feuille à l'autre : l'échelle locale
(0,69 m par pixel de ces images, au village comme à la côte Rouge) et la
**flèche du nord**, qui indique le nord vrai à moins de 2° près. C'est ce qui
permet de poser une feuille sur un seul repère.

## État de chaque feuille

| Feuille | Ce qu'elle montre | Posée par | Justesse | Sur la carte publique |
|---|---|---|---|---|
| 12 | village d'Etchemin, église, moulins Atkinson, étangs | 3 repères : église Saint-Romuald, n° 68 (curé Sax), n° 142 (villa Atkinson) | 11 à 21 m aux repères ; 76 m au raccord ouest | non — atelier seulement |
| 13 | anse Hamilton, anse de New Liverpool, côte Rouge | 1 repère : l'église anglicane ; échelle de la 14, flèche du nord | vérifiée à l'œil autour de la côte Rouge et de l'éperon du manoir Longwood (27 m) ; 133 m au raccord ouest | non — atelier seulement |
| 14 | village de New Liverpool, scierie Ritchie and Cull | 14 maisons du village, nos 14 à 35 | **7 m en moyenne, 11 m au pire** ; incertaine à sa lisière est (nos 1 à 9) | **oui** |
| 15 | anse Albert, bassin de la Chaudière | aucun repère : accrochée à la 14 | inconnue | non — atelier seulement |

Le fleuve est en bas des feuilles : le nord est donc vers le bas, la gauche vers
l'aval. L'image de la feuille 12 est à l'envers ; cela ne change rien, les
trois coins portent l'orientation.

### Ce qui a servi à vérifier, au-delà des repères

Chaque feuille a été superposée à la carte OpenStreetMap et à l'imagerie
aérienne, agrandie. Feuille 14 : la route retombe sur le chemin du Fleuve d'un
bout à l'autre, la falaise sur la bande boisée, et les deux ruelles du plan
sur les rues Saint-Damase et Saint-Vincent. Feuille 13 : le chemin qui monte
retombe sur la côte Rouge, la courbe de la route autour de l'éperon sur celle
du parc du Manoir-Wade, le haut de la falaise sur la lisière du bois.

## Trois attributions à revoir sur la feuille 14

Trois lieux portent un numéro de la feuille 14 que la géométrie ne confirme
pas : `1736-cf` (n° 1), `1720-chemin-du-fleuve` (n° 5) et `1719-1720-cf`
(n° 6). Posés sur le terrain, ils tombent à 77, 162 et 163 m des bâtiments
que la feuille porte sous ces numéros — et entre eux : 71 m séparent le 1736
du 1720 sur le terrain, 155 m séparent le n° 1 du n° 5 sur le plan. Ils ne
pèsent donc pas dans le calage (ils sont sous `controle`). Deux lectures
possibles, à trancher sur place : ce sont des bâtiments du bout ouest de la
feuille **13** (les nos 57 et 62 et la cour à bois M, où ils tombent quand on
cale la 13 sur l'église) ; ou le n° 1 de la feuille 14 est la maison du 1720.

De même, les lieux « … – Goad » de la feuille 15 (nos 15, 30, 32, 35, 40, 55)
ont été posés le 14 septembre 2026 d'après le calage d'alors : ils s'écartent
de 160 à 260 m de la feuille accrochée à la 14. On ne sait pas lequel des
deux a raison ; ils sont sous `controle`.

## Pour resserrer un calage

Le calage d'une feuille vaut ce que valent ses repères. Chaque maison encore
debout dont on connaît le numéro Goad en est un :

1. dans l'atelier de la carte, sur la fiche du lieu, inscrire le feuillet et
   le numéro Goad (c'est déjà fait pour une trentaine de lieux) ;
2. ajouter le repère à `data/plans-reperes.json`, sous la feuille : le lieu,
   et la position du bâtiment sur l'image, en pixels ;
3. relancer `node outils/lieux/caler-plans.mjs` et lire les écarts.

À partir de trois repères bien écartés, passer la `methode` de la feuille à
`similitude` : elle trouve alors sa propre échelle. Ce qui aiderait le plus
aujourd'hui : des maisons du chemin du Fleuve sur la feuille 12 (une douzaine
sont déjà relevées, sans numéro Goad), le 1871 et le 1900 chemin du Fleuve et
les maisons de l'anse Hamilton sur la feuille 13, et n'importe quel bâtiment
encore debout sur la feuille 15.

Quand une feuille provisoire paraît juste, cocher « calé, montrer au public »
dans l'atelier de la carte : elle apparaît alors sur la carte publique.

**La main l'emporte.** Un plan dont les coins ont été déplacés aux poignées
dans l'atelier n'est plus recalculé : `caler-plans.mjs` le reconnaît (ses
coins ne sont plus ceux du dernier calcul, gardés sous `calcul` dans le
fichier des repères), le laisse et le dit. `--forcer` passe outre.

Les plans portent de nouveaux identifiants (`quebec-coves-1876-f12`…) : les
anciens (`goad-1876-f12`…) pouvaient traîner dans le navigateur de Patrick
avec leurs coins de l'été, qui auraient repris le dessus.

## Source

Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuilles 12 à 15.
Plans d'assurance-incendie, échelle annoncée de 200 pieds au pouce. BAnQ,
Archives nationales à Québec, cote P600,S4,SS1,D67 —
https://collections.banq.qc.ca/ark:/52327/3121049

---

## Retiré : plan officiel de la paroisse de St-Romuald d'Etchemin (1879)

- **Identifiant** : `cadastre-1879` — **année** : 1879
- **Fichier** : `assets/plans/cadastre-1879.jpg` *(supprimé)*
- **Source** : Plan officiel de la paroisse de St-Romuald d'Etchemin, comté de Lévis, Québec, 11 juin 1879. Cadastre dressé après l'abolition du régime seigneurial ; porte en renvoi les numéros du cadastre seigneurial de la seigneurie de Lauzon (numéros encerclés) et des corrections ultérieures (lot 462 corrigé 22 oct. 1900, corrections de 1935).

### Ce que le calage avait appris

Fourni par Patrick Blanchet, août 2026. Trois échelles sur une même feuille : la paroisse entière en haut (5 arpents au pouce), le village du chemin du Fleuve au centre et en bas (1 arpent au pouce). Le calage ne peut donc être juste que pour une bande à la fois — caler sur la bande centrale, celle du chemin du Fleuve, où vivent les maisons du recensement.

### Dernier ancrage posé (approximatif — repère de départ, non une position établie)

| coin de l'image | latitude | longitude |
|---|---|---|
| NW | 46.7731 | -71.2997 |
| NE | 46.7731 | -71.2047 |
| SW | 46.7061 | -71.2997 |

Opacité : 0.6. Jamais marqué calé.

Retiré du dépôt le 14 septembre 2026 avec son image, faute d'un calage sûr.
Pour le reposer : retélécharger la feuille dans `assets/plans/`, créer son
entrée dans `data/plans-data.js`, puis ses repères — des lots identifiés sur
le terrain — dans `data/plans-reperes.json`.
