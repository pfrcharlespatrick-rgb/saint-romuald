# Les plans anciens

Quatre feuilles de l'atlas d'assurance de Charles E. Goad, « Quebec Coves.
South Shore » (mars 1876), sont posées en surimpression de la carte
(`carte.html`). Elles y sont revenues le 12 novembre 2026, **calculées** depuis
les lieux que Patrick a rattachés à leur numéro Goad, et non plus posées à
l'œil. Le cadastre de 1879 reste retiré (voir à la fin). Trois autres plans sont posés à part, à titre
provisoire (voir plus bas) : le croquis de l'Hétrière de 1844 et les plans de
l'embouchure de la Chaudière de 1842 et de 1866.

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

Les feuilles Goad sont posées d'un bloc (trois coins : échelle, orientation,
position). Posée ainsi, une feuille ne peut pas être juste partout à la fois,
et deux feuilles bien posées **ne se rejoignent pas forcément à leur
lisière**. On a choisi la justesse près des repères — là où sont les maisons
qu'on cherche — plutôt qu'un raccord propre entre feuilles.

**Un plan peut aussi être étiré.** Les trois coins sont indépendants : les
déplacer séparément change les proportions et les angles de l'image. La règle
qui l'interdisait (« on n'étire pas une feuille ») a été levée par Patrick le
17 novembre 2026. Un plan étiré le dit dans sa note, avec ses deux échelles
et l'angle de ses axes, parce que ses distances et ses angles ne sont plus
ceux du dessin ; c'est le cas des deux plans de l'embouchure de la Chaudière
(voir plus bas). Les feuilles Goad, elles, sont encore posées d'un bloc :
`caler-plans.mjs` ne les étire pas.

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

## Plan de l'Hétrière (1844) : posé à titre provisoire, atelier seulement

- **Fichier** : `assets/plans/st-jean-chrysostome-1844-hetriere.jpg`
- **Plan** : `hetriere-1844` dans `data/plans-data.js`, `cale: false`.
- **Fiche** : `plan-1844-02-05-hetriere-riviere-bruyante` dans
  `documents/manifeste.json` — l'image, la transcription et les réserves ; on
  la lit à `filiation.html#doc-plan-1844-02-05-hetriere-riviere-bruyante`.
- **Ce que c'est** : croquis de l'arpenteur P. Lambert, 5 février 1844 — une
  étendue A-B-C-D de la paroisse de Saint-Jean-Chrysostome, entre la
  concession de l'Hétrière, le Premier rang et la « rivière Bruyante »,
  partagée entre cinq occupants (Côté, Cantin, Hallé, veuve Cantin, Cantin).

**La rivière Bruyante est la Chaudière** (indication de Patrick, 16 novembre
2026 ; le plan de l'embouchure dressé par Pierre Lambert en octobre 1854
l'écrit : « Rivière Bruyante ou Chaudière »). Le terrain est donc sur la rive est de la Chaudière.

Ce croquis n'est pas un plan à l'échelle et aucun lieu de
`data/lieux-data.js` ne lui sert de repère : il ne passe pas par
`caler-plans.mjs` (il n'est pas dans `data/plans-reperes.json`, l'outil le
laisse tel quel). Ses trois coins ont été calculés une fois, sur trois
hypothèses :

| Ce qu'il fallait | D'où on le tire | Valeur |
|---|---|---|
| un point d'ancrage | le point B (pixel 917, 380), où des hachures barrent la rivière, mis **aux chutes de la Chaudière** | 46,7147 N, 71,2825 O |
| l'échelle | les 16 arpents et demi de front écrits entre A et D (964,8 m), mesurés sur l'image | 2,3 m par pixel (2,2 à 2,4 selon les bandes) |
| l'orientation | la flèche « Vrai Nord », pointe au nord | le haut de l'image regarde le sud-est (azimut 134°) |

Ce qui plaide pour cette pose : la rivière y vient du sud et repart au
nord-nord-ouest, comme la Chaudière sous ses chutes ; la ligne A-B court à
55° du nord, comme le fleuve et les rangs de la seigneurie ; le Premier rang
tombe du côté du fleuve, l'Hétrière du côté des terres. Ce qui manque : **un
seul point relevé sur le terrain**. « B aux chutes » est une lecture des
hachures — probable, selon Patrick (16 novembre 2026), qui lit aussi les
flèches de la rivière comme le sens de l'eau vers le fleuve — mais rien ne
l'écrit sur le plan ; l'ensemble peut être décalé de
plusieurs centaines de mètres.

Comparé au fond de carte le 16 novembre 2026 : ainsi posé, la rivière du
croquis suit bien la Chaudière des chutes jusqu'au Petit Bassin, à 150 m près,
et le terrain A-B-C-D tombe au nord-est des chutes, dans le haut de Charny.
C'est cohérent, sans être une preuve.

Il reste donc dans l'atelier (`carte.html?atelier=1`, bloc « Plans anciens »,
marqué « à caler »), et ne doit pas être présenté comme établi. Pour le
resserrer : retrouver au cadastre un coin de terre de la ligne A-B ou de la
ligne A-D, ou régler les poignées sur la rive de la Chaudière.

## L'embouchure de la Chaudière : plans de 1842 et de 1866, atelier seulement

Deux plans bornent le même terrain du Gouvernement, sur la pointe est de
l'embouchure : le quai, les grèves, le chemin public, le cap et la falaise qui
longe le Bassin. Ils ne passent pas par `caler-plans.mjs` (aucun lieu de
`data/lieux-data.js` n'est sur cette pointe) : leurs coins ont été calculés
une fois, comme dit ci-dessous. Tous deux restent `cale: false`.

| Plan | Fichier | Dans `data/plans-data.js` |
|---|---|---|
| Pierre Lambert, plan du 24 février 1842 et procès-verbal du 28 octobre 1841 | `assets/plans/embouchure-chaudiere-1842-lambert.jpg` (la page du plan) ; la double page entière, `…-lambert-page.jpg`, sert à la fiche `plan-1842-02-24-embouchure-chaudiere-lambert` | `embouchure-chaudiere-1842` |
| Alfred Hamel, plan annexé au procès-verbal des 6 et 7 août 1866, Québec, 11 août 1866 | `assets/plans/embouchure-chaudiere-1866-hamel.jpg` (l'image fournie, recomprimée sans changer ses dimensions) | `embouchure-chaudiere-1866` |

Les images ont été fournies par Patrick le 16 novembre 2026 sous les noms
« 03Q_CN301S323D04140R » (1842) et « 03Q_CA301S22D189 » (1866) — sans doute
des cotes de BAnQ Québec, à confirmer. Un troisième plan du même terrain,
dressé par Pierre Lambert en octobre 1854, n'est connu que par une
transcription ; il n'est pas versé.

### Le plan de 1866 : la pièce maîtresse — et un plan étiré

C'est un plan d'arpentage à l'échelle (150 pieds français au pouce). **Sa pose
actuelle l'étire : c'est une décision de Patrick (17 novembre 2026).** Elle
est venue en quatre temps, les 16 et 17 novembre :

1. « dans le plan de 1866 le chemin du fleuve mène dans l'eau du côté est » :
   incliner le plan en se fiant en partie au chemin d'aujourd'hui (37°) ;
2. aller jusqu'à ce que le chemin public suive le chemin du Fleuve (32°) ;
3. deux repères désignés par deux flèches sur la carte — le quai du plan
   (pixel 727, 554) est la pointe du Pont-Garneau, la grève à l'ouest du quai
   (pixel 684, 649) est la rive ouest de cette pointe, soit 46 m vers le
   sud-ouest — et réduire le plan de quelques pour cent (34°, 3 % de moins) ;
4. l'escarpement du Grand Bassin sortait alors sur l'eau, jusqu'à 71 m de la
   rive. Réduire davantage (10 %, 20 %) n'y changeait rien : l'écart venait de
   l'angle du plan, non de sa taille. Mis devant quatre solutions — laisser,
   réduire, tourner à 39°, étirer —, Patrick a choisi d'étirer.

| Ce qui pose le plan | Valeur |
|---|---|
| ajustement, les six inconnues libres, sur : les deux repères de Patrick (les plus lourds), l'axe du chemin du Fleuve (compté double), la rive du Bassin, la pointe du cap, le coin du ruisseau | trois coins indépendants dans `data/plans-data.js` |
| échelle dans la largeur de la feuille | 0,445 m par pixel |
| échelle dans sa hauteur | 0,403 m par pixel (la barre graphique du plan donne 0,420) |
| angle entre les deux axes | 85° au lieu de 90° |

Les poses qui se sont succédé, et ce que vaut chacune :

| Pose | Chemin public, à son bout est | Rive du Bassin | Quai sur la pointe du Pont-Garneau | Ligne C-D (procès-verbal : « Sud 32° Est », 39,3 m) |
|---|---|---|---|---|
| selon la flèche « Nord Astronomique » du plan (44°) | 48 m au nord, au bord de l'eau | 1 à 14 m | non | **sud 33° est, 39,0 m** |
| premier compromis (37°) | 25 m | 9 à 27 m | non | sud 26° est |
| incliné sur le chemin (32°) | 3 à 9 m | 11 à 42 m | non, à 46 m | sud 21° est |
| sur les deux repères, réduit de 3 % (34°) | 3 m | 3 à 14 m au nord, 42 à 71 m au sud, sur l'eau | oui, à 4 m | sud 23° est, 37,8 m |
| **étiré — pose retenue** | **2 à 12 m** | **4 à 25 m** | **oui, à 5 m** | sud 27° est, 36,8 m |

Ce qu'il faut en retenir : **posé d'un bloc, ce plan ne peut pas être juste
partout à la fois** — son chemin public fait avec l'escarpement du Bassin un
angle plus ouvert d'une quinzaine de degrés que le chemin du Fleuve avec la
rive d'aujourd'hui. L'étirer fait tenir le chemin, le quai et la rive ; cela
se paie sur ce que le plan a de plus sûr : **les angles et les distances lus
sur le plan étiré ne sont plus ceux de l'arpenteur.** Pour mesurer, se servir
de l'image du plan et de son échelle, non de sa pose sur la carte.

Deux lectures restent ouvertes, que seule une borne retrouvée trancherait :
le chemin de 1866 n'est plus où est le chemin du Fleuve (remblais, tracé
refait), et le plan, posé selon sa flèche, était juste ; ou la flèche et le
dessin du chemin sont fautifs. La pose reste provisoire ; les poignées de
l'atelier permettent de la reprendre.

**Ne pas « redresser » ce plan** (revenir à une pose non étirée) sans le
demander à Patrick.

### Le plan de 1842 : posé sur celui de 1866

Le dessin de 1842 est moins exact (la ligne C-D, 121 pieds au procès-verbal,
n'y fait que 29 m), mais il partage avec celui de 1866 six points sûrs : les
bornes A, B, C, D, la pointe du cap, et la borne du bas de la longue ligne qui
descend vers le Bassin (« Pierre Pichet » en 1842, « Pierre Pichette » en
1866 : 448 et 449 m). Il est rapporté au plan de 1866 par ces six points
(4 à 9 m d'écart), puis reçoit **la même déformation que lui** : 0,85 m par
pixel dans sa largeur, 0,77 dans sa hauteur, quand sa barre graphique de
900 pieds donne 0,80.

### Où sont les bornes aujourd'hui

Avec la pose retenue :

| Borne | Ce qu'en dit le procès-verbal de 1841 | Aujourd'hui | Coordonnées |
|---|---|---|---|
| A | angle nord du terrain de Thomas Hickey, côté sud-est du chemin public | au bord du chemin du Fleuve, au nord-est du bas de la côte Garneau | 46,74385 N, 71,27411 O |
| B | à 300 pieds de A le long du chemin, extrémité sud-ouest du terrain de Hickey | près du chemin du Fleuve, vers le bas de la côte Garneau | 46,74345 N, 71,27542 O |
| C | 62 pieds plus loin le long du chemin | idem | 46,74331 N, 71,27563 O |
| D | pied du cap, « Sud 32° Est », 121 pieds ; fin de l'emplacement d'Ignace Roberge | sur le versant de la côte Garneau | 46,74301 N, 71,27542 O |
| bas de la ligne Pichet | borne de chez Boucher (1866) | sur la rive du Bassin, au sud de la rue de l'Étang | 46,74034 N, 71,27199 O |

Entre la pose selon la flèche du plan et la pose retenue, ces bornes bougent
de 17 à 42 m : c'est la mesure de ce qu'on ne sait pas encore.

Le quai de 1841 est la pointe du Pont-Garneau (repère de Patrick) ; le lot
n° 2 est la bande de falaise qui longe le Bassin, au sud de la rue du
Curé-Dupont. La grève a été remblayée : le rivage d'alors ne se retrouve pas
sur le terrain.

Pour resserrer : retrouver une des bornes (pierre, avec des « morceaux de
faillance » dessous, selon la synthèse remise avec le plan de 1842), ou une
maison encore debout d'un des voisins nommés.

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
