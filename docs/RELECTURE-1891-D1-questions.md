# Recensement de 1891, division 1 — relecture au manuscrit

**En cours.** Patrick fournit les images du manuscrit page par page ; chaque page est
confrontée aux données de `data/recensement-1891-d1-data.js`.

**Les lectures les plus probables sont appliquées au fichier**, à la demande de
Patrick, qui fera la relecture d'ensemble à la fin. Chacune porte `incertain: true`
et conserve la lecture d'origine dans sa `remarque` : filtrer sur ce drapeau donne
exactement la liste à revoir. Ce document garde la trace de ce qui a été décidé et
de ce qui ne l'a pas été.

Pages confrontées : **1 à 62**. Corrections appliquées : **83** (77 noms ou prénoms,
6 âges). Lignes signalées sans correction : **56**.

## Ce qui est confirmé

La structure est juste sur les 56 pages : 25 lignes chacune, familles 1 à 243 dans
l'ordre, numéros de maison alignés, liens de parenté et professions conformes.
Le dépouillement de 1891 est nettement plus fiable que celui de 1881 — les écarts
ci-dessous sont des variantes de lecture, non des inventions.

Détails vérifiés au passage : le code de logement de la colonne 4 (« B 2/6 » = bois,
2 étages, 6 chambres) est bien enregistré ; les origines étrangères sont exactes
(Ahern né en Irlande p. 13, Fox né aux États-Unis p. 18) ; les liens rares sont
justes (belle-sœur, bru, gendre, petit-fils, pensionnaire, cousine).

## « Éléonarde » n'existait pas : c'est Elmire — réglé

Le fichier contenait **cinq « Éléonarde »** pour **huit « Elmire »**. L'hypothèse était
qu'il s'agissait du même mot manuscrit rendu de deux façons ; **la page 48 l'a
démontrée**.

Sur cette page, le dépouilleur écrit **« Éléonarde » à la ligne 1 et « Elmire » à la
ligne 3** — deux lignes d'écart, le même tracé, la même main qui transcrit. La preuve
est dans le document lui-même.

Les cinq occurrences sont corrigées en **Elmire**. Quatre l'ont été sur images (pages
44, 45, 46, 48) et sont tenues pour établies ; la cinquième (page 66 ligne 15) est
appliquée par cohérence et reste marquée `incertain` faute d'image.

Il ne reste **aucun « Éléonarde »** dans le fichier.

## Question n° 3 — une ligne biffée au manuscrit, transcrite quand même

**Page 42, ligne 8 — Thibodeau Clara, 24 ans, fille de Louis et Olympe.**

Le recenseur a tracé **un trait horizontal sur toute la ligne** : il l'a retirée de
son dénombrement, sans doute après avoir appris qu'elle ne vivait plus au foyer. Le
dépouillement l'a transcrite comme les autres.

**Elle est conservée telle quelle.** La retirer changerait le total de la division
(3548 personnes) et relève d'une décision de Patrick, pas d'une lecture. Trois voies
possibles :

1. la supprimer, pour coller au dénombrement officiel ;
2. la garder en la marquant « biffée au manuscrit » — elle a existé, et l'information
   vaut pour la recherche généalogique ;
3. la garder sans rien changer.

C'est la première ligne biffée rencontrée en 45 pages.

## Question n° 1 — les colonnes 21 et 22 (Sait lire / Sait écrire)

**C'est la question la plus lourde, et elle vaut pour toute la division.**

Le fichier annonce « pages 1-142 : complet » pour les colonnes 17 à 25. Or sur les
neuf premières pages, **54 personnes sur 225 seulement portent une valeur** ; les
171 autres n'ont aucun champ `sait_lire` / `sait_ecrire`. Les images de Patrick
montrent pourtant des coches sur la plupart des lignes.

De plus, **16 personnes de ces neuf pages sont enregistrées « sait écrire mais ne
sait pas lire »** — ce qui n'a guère de sens à une époque où la lecture s'apprenait
avant l'écriture. Sur l'ensemble de la division, ces cas sont au nombre de 59.

Ces coches ne sont pas lisibles avec certitude sur des images de page entière : elles
font quelques pixels. **Il faut une passe dédiée**, avec des recadrages serrés sur les
colonnes 16 à 25 — en incluant la colonne des noms comme ancre, faute de quoi une
lecture peut être décalée d'une ligne (le fichier met lui-même en garde contre ce
risque).

## Laissé en l'état, faute de lecture — à reprendre au manuscrit

Ces cinq lignes portent `incertain: true` et une remarque expliquant pourquoi rien
n'a été appliqué.

- **Page 1 ligne 15** : « Telieria » conservé — le manuscrit se lit « Feliria » ou
  « Zeliria », l'initiale ne se laisse pas trancher.
- **Page 1 ligne 22** : « Pierre Abringe » conservé — le second élément se lit
  « Abrigge » ou « Abridge ».
- **Page 1 ligne 13** : la colonne 7 de Camille Gosselin ressemble à « M. » alors que
  la colonne 10 porte « E. » (épouse). Anomalie du manuscrit ; sexe F conservé.
- **Page 10 ligne 5** : Ferland Narcisse conservé à **51 ans**. Le manuscrit se lit
  plutôt « 81 », mais un contre-maître de scierie de 81 ans ayant des filles de 24 et
  26 ans et une épouse de 58 est peu vraisemblable. **Non tranché — à vérifier.**
- **Page 13 ligne 17** : prénom laissé vide, voir ci-dessous.
- **Page 20 ligne 3** : prénom « Savard » — c'est un patronyme, vraisemblablement le
  nom de jeune fille de l'épouse porté à la place du prénom.
- **Page 20 ligne 5** · **page 21 ligne 3** : un âge en mois et un « 19 » qui se lit
  plutôt 13, tous deux non tranchés.
- **Page 21 ligne 1** : « Leo Michal » ou « Leo Michel » ou « Leodrick ».
- **Page 24 ligne 11** : patronyme « Dinan » — le manuscrit se lit « Daugh » ou
  « Dangh ». Ménage né en Angleterre et en Irlande.
- **Page 26 ligne 13** : « Losie », « Rosie » ou « Lucie ».
- **Page 27 lignes 19 et 20** : « Berrel » et « Aber », famille anglophone.
- **Page 29 ligne 12** : « Exida » ou « Elida ».
- **Page 28 lignes 12 et 13** : deux sœurs Morneau portées toutes deux à 13 ans au
  manuscrit. Jumelles ou erreur du recenseur.
- **Page 32 ligne 1** : « Telesphore » ou « Stephen ». La fratrie est francophone
  (Amarilda, Joséphine, Octave, Graziela), ce qui plaide pour Télesphore, mais le
  tracé ne le confirme pas.
- **Page 37 ligne 2** : Terrien « Leonard », fille d'un an — forme masculine, sans
  doute Léonie ou Léonarde.
- **Page 38 ligne 1** : Gagné « Reme Celestin » — René ou Reine ?
- **Page 37 ligne 18** : Daigle J. Baptiste, 57 ans dans les données, plutôt 52 au
  manuscrit.
- **Page 33 ligne 3** : Dagenais Oscar, fraction de mois non lisible.
- **Page 41 ligne 14** : « Delard » — la même forme a été lue Adelard page 29, mais
  ici le manuscrit porte bien Delard. Non harmonisé.
- **Page 44 ligne 11** : « Aterne » ou « Alerne ».
- **Page 43 ligne 17** : « Desoada » ou « Deroada ».
- **Page 48 ligne 10** : « Elmine » ou « Elvine ».
- **Page 49 ligne 8** : « Aubel », « Anbel » ou « Isabel ».
- **Page 49 ligne 13** : « Alpidre » ou « Alcide ».
- **Page 49 ligne 21** : « Eddie » ou « Edelie », pour une fille de 6 ans — une
  « Landry Eddy » de 7 ans figure déjà page 18 ligne 2, également au féminin.
- **Page 49 ligne 25** : « Elodie » ou « Elaie ».
- **Page 50 ligne 23** : « Jany » ou « Fany », dans une famille irlandaise où Fanny
  serait attendu.
- **Page 51 ligne 12** : « Narcisse » dans les données, « Norbège » au manuscrit.
- **Page 48 ligne 15** · **page 55 ligne 1** : fractions de mois non lisibles.
- **Page 53 lignes 8 et 9** : deux sœurs Demers portées toutes deux à 5 ans au
  manuscrit. Jumelles ou erreur du recenseur — c'est le second cas de ce genre,
  après les sœurs Morneau de la page 28.
- **Page 54 ligne 9** : « Ulfedge » ou « Alfedge ».
- **Page 54 ligne 23** : « Wallstand » ou « Wolstand ».
- **Page 56 ligne 13** : « Clarilda » ou « Clarida ».
- **Page 58 ligne 17** : patronyme « Palin » — le tracé donne plutôt « Polin » ou
  « Paulin ». Il n'apparaît que dans cette famille de trois personnes, et nulle part
  ailleurs dans les trois recensements : c'est exactement le profil de la variante
  isolée décrite plus bas, mais l'image ne permet pas de trancher.
- **Page 60 ligne 1** : Côté « Césolie », un an — le tracé se lit « Cisolie » ;
  « Cécilia » est possible. Prénom unique dans la division.
- **Page 60 ligne 13** : Fradette « Johney », quatre ans — tracé non résolu.
- **Page 61 ligne 14** : Bégin « Pergina », dix ans — « Régina » (5 occurrences dans
  la division) est plausible, le tracé ne le confirme pas.
- **Page 61 ligne 18** : Dumas « Adleston », neuf ans — le manuscrit se lit plutôt
  « Adlestan ». La division 1 de 1881 porte un « Adelstan ».
- **Page 62 lignes 18-21** : les quatre enfants Wilson portent « Irlande » comme lieu
  de naissance de la mère, alors que leur mère Mary Jane (ligne 17) est née au
  Québec — c'est son *père* à elle qui est né en Irlande. Soit le recenseur a reporté
  l'origine familiale, soit les guillemets de répétition des colonnes 13-14 ont été
  mal attribués au dépouillement. Indéchiffrable à cette résolution ; à trancher sur
  une meilleure image avant d'y toucher.

Les trois fractions de mois douteuses (p. 4 l. 23, p. 6 l. 11, p. 15 l. 22) sont
laissées telles quelles : elles relèvent de la passe dédiée aux colonnes serrées.

## Question n° 2 — un prénom manquant

**Page 13, ligne 17** : le fils Lefebvre, 16 ans, étudiant, n'a **aucun prénom** dans
les données. Le manuscrit en porte un, que je ne déchiffre pas avec certitude
(« Léo » ? « Cléo » ?). C'est le seul trou de ce genre relevé sur 19 pages.

## Corrections appliquées — noms et prénoms

Toutes portent `incertain: true` et gardent la lecture d'origine en remarque.

| Page·ligne | Avant | Appliqué |
|---|---|---|
| 1 L6 | Alphonse | Alphon**c**e |
| 3 L4 | Alair Abel | Alain ? |
| 3 L7 | Cantin **Micher** | Michel ? |
| 3 L11 | Cantin **Susie** | **Lucie** |
| 3 L17 | Vermette **Aleais** | Alexis ? |
| **4 L3** | **Vermette « Marie », M, 75, Père** | **Alain** — un homme prénommé Marie inscrit « père » |
| 4 L6 | Marguriete | Marguerite |
| 4 L22 | Augusta (fils) | Auguste |
| 4 L23 | Rosaria (fils) | Rosario |
| 4 L25 | Aurelia | Aurélie |
| 5 L20 | Rochelle | Rachelle |
| 6 L8 | Emelin | Emelie ? |
| 6 L21 | Sirois Maria | Marie |
| 7 L2 | Sirois **Lee** | **Léa** |
| 7 L18 | Phelomena | Philomène |
| **8 L3** | **Letarte Maude** | **Manda** |
| 8 L18 / L21 | Peteline / Petaline | même personne, deux graphies |
| 8 L24 | Deoma | Diana ? |
| 9 L8 | **Boily** Mary | **Baily** ? |
| 10 L9 | Roberge **Anastaria** | Anastasie |
| 10 L11 | Marguriete | Marguerite |
| 10 L14 | Fecteau Clerida | Clarida ? |
| 11 L11 · 11 L13 | « France » (deux personnes) | François ? Francis ? |
| 13 L15 | Sofrania | Sofranie ? |
| 14 L5 | Marie **Luie** | Marie **Luce** |
| 14 L12 | Cantin **Seserie** | Cesarie ? Sesorie ? |
| 15 L3 | Hamel **Cardule** | **Cordule** |
| 17 L2 | Lambert **Rosias** | Rosalie ? |
| 18 L10 | Gingras **Efa** | **Eva** |
| 18 L13 | Robitaille **Mathalie** | **Nathalie** |
| 19 L9 | Bedard **Silfred** | Wilfrid ? Silfrid ? |
| **20 L18** | Lambert **« Los Edouard »** | **Jos Edouard** — l'abréviation de Joseph |
| 21 L15 | Boucher Colina | Celina |
| 22 L1 | Deslauriers Antonie | Antoine |
| 22 L2 | Morency **Josep** | Joseph |
| 22 L11 | Rochette Fabian | Fabien |
| 23 L10 | Remillard Done | Dona |
| **23 L11** | **Giroux « Oliver », F, 67, belle-mère** | **Olive** |
| 23 L24 | Robitaille Delvin | Delvina |
| 24 L12 | Dinan **Margueret** | **Margaret** (ménage irlandais) |
| 24 L19 | Gendron Odena | Odina |
| 25 L14 | Demers **Archile** | **Achille** |
| 27 L18 | Peters **Etel** | **Ethel** (famille anglophone) |
| 27 L22 | Peters Minie Ida | Minnie Ida |
| **28 L18** | Robitaille **« Eugene », F, 22, fille** | **Eugénie** |
| 29 L2 | Boucher Delard | Adelard |
| 30 L6 | Boucher Mary Jene | Mary Jane |
| **31 L18** | **Lefèvre « Ameline », M, 45, chef** | **Anselme** |
| 32 L8 | Wells Leacadi | Léocadie |
| 33 L4 | Groleau **Francis** | François |
| 33 L9 | Groleau Alphones | Alphonse |
| 34 L1 | Fecteau Duleina | Delvina |
| 34 L7 | Lemieux **Rose de Lima** | Rose Delima |
| 36 L3 | Senechale Cardelia | Cordelia |
| 39 L4 | Huard Margerite | Marguerite |
| 40 L10 | Côté Perpetude | Perpétue |
| **40 L24** | Lebel **« S Baptiste »** | **J.Baptiste** — le J de ce recenseur |
| 42 L1 | Parent **Moly** | Molly (famille anglophone) |
| **44 L24 · 45 L2 · 46 L15 · 48 L1 · 66 L15** | **« Éléonarde »** ×5 | **Elmire** — voir ci-dessus |
| 47 L2 | Boucher **Lulie** | Julie |
| **52 L21-24** | **« Dennes »** ×4 | **Demers** — 88 Demers au fichier contre 4 Dennes |
| **56 L17-19** | **« Clauston »** ×3 | **Clouston** — 12 Clouston au fichier contre 3 Clauston |
| 53 L16 | Nadeau **Jean** | Léon |
| 58 L7 | Boucher **Pitaline** | **Vitaline** — même tracé que la Vitaline Côté de la page 59 ligne 18 |
| **59 L14-16** | **« Lévesque »** ×3 | **Levasseur** — la finale « -sseur » est lisible ; 4 Levasseur ici et 8 en 1881-D1, aucun Lévesque ailleurs |

## Corrections appliquées — âges

| Page·ligne | Avant | Appliqué | Remarque |
|---|---|---|---|
| **5 L9-L10** | Joseph 4 ans **et** Roch 4 ans | Roch semble **2 ans** | deux frères du même âge |
| 8 L3 | 10 ans | **12 ans** | |
| 17 L24 | Letarte Paul, 29 ans | 27 ans ? | |
| 19 L18 | Roberge Louis, 25 ans | 23 ans ? | épouse de 34 ans |
| 46 L22 | Lavertu Alexis, 15 ans | **18 ans** | le place avant son frère Joseph, 16 ans |
| **58 L5** | Gagnon Ema, 21 ans | **31 ans** | le tracé donne 31, et l'index BAC lit 31 lui aussi |

## Écarts relevés dans le manuscrit lui-même (pas des fautes de dépouillement)

À conserver tels quels, mais bons à connaître :

- **Page 1 ligne 13** : la colonne 7 de Camille Gosselin ressemble à « M. » alors que
  la colonne 10 porte « E. » (épouse). Erreur du recenseur ou lecture douteuse.
- **Page 16 ligne 21** : Gagnon Deline, 58 ans, épouse de Louis, 45 ans.
- **Page 12 ligne 24** : Gely Henriette, 52 ans, « fille » de Louis, 76 ans.
- **Page 18 ligne 2** : Landry Eddy, portée au féminin, 7 ans, pensionnaire.
- **Page 18 ligne 18** : Guay Odila, porté au masculin, 6 ans, fils.
- **Page 24 ligne 10** : Demers Ferdina, porté au masculin, 7 ans, neveu.
- **Page 29 lignes 21-22** : Roberge Marie, 27 ans, listée avant sa sœur Florida,
  29 ans.
- **Page 25 ligne 12** : Bertol Amanda, servante de 20 ans, **née en Allemagne** —
  la seule de la division jusqu'ici. Confirmé au manuscrit.
- **Page 59 ligne 8** : Picard Arthur, 22 ans, listé après ses cadets de 17, 15 et
  14 ans. Vérifié au manuscrit : c'est bien 22, l'ordre décroissant est rompu par le
  recenseur lui-même.

## Une limite des images : le 5 et le 8 ne se distinguent pas

Les cinq images des pages 57 à 61 sont des JPEG de 1785 × 1137 pixels, soit environ
**dix pixels par chiffre manuscrit**. Les noms restent lisibles, les chiffres isolés
aussi, mais **le 5 et le 8 de ce recenseur deviennent indiscernables** : les deux se
tracent d'une barre supérieure suivie d'une panse, et l'interpolation ne rend pas ce
qui n'a pas été capté.

Quatre âges restent donc tels quels, faute de pouvoir trancher :

- **Page 57 ligne 8** : Garant Joseph, 38 ans dans les données ; le tracé ressemble à
  celui de son épouse ligne 9, portée à 35.
- **Page 60 lignes 17 et 18** : Marois George 28 ans et Clara 38 ans — mêmes deux
  glyphes à l'œil.
- **Page 61 ligne 11** : Bégin Célina, 38 ans ; se lit aussi bien 35.
- **Page 58 lignes 22 et 25** : Roberge Rosana, 8 ans (l'ordre décroissant de la
  fratrie plaide pour 8, le tracé pour 5), et la fraction de mois de Wilfrid.

Ces cas se règleront d'un coup si les pages sont un jour fournies en PDF, comme
celles de 1881 : le rendu à 500 ppp les rendrait triviaux.

## Un piège évité : les colonnes de naissance

Aux pages 36 et 37, deux femmes — Roberge Sarah et Smith Mary — portent « Québec »
comme lieu de naissance alors que leurs lignes montrent « England » et « Ireland » au
manuscrit. Vérification faite, **ces mentions sont aux colonnes 13 et 14** (naissance
du père et de la mère), non à la colonne 11 : les données sont justes. C'est
exactement le décalage de colonnes contre lequel le fichier met en garde, et il aurait
fait naître deux immigrantes qui n'en sont pas. Les deux lignes portent désormais une
remarque disant que la vérification a été faite.

## Le signal le plus rentable : la variante isolée

Deux patronymes ont été corrigés d'un coup en comparant leur fréquence dans le
fichier plutôt qu'en scrutant le tracé : **« Dennes » (4 occurrences, une seule
famille) contre 88 « Demers »**, et **« Clauston » (3) contre 12 « Clouston »**. Dans
les deux cas le manuscrit confirme la forme majoritaire.

C'est un contrôle à passer sur toute la division à la fin : **tout patronyme présent
moins de cinq fois et proche d'un patronyme fréquent mérite un coup d'œil au
manuscrit.** Il trouve des fautes sans même ouvrir l'image.

## Méthode

Les images utiles sont les **pages entières** : elles portent la colonne des noms et
les colonnes 17 à 25 sur la même prise, ce qui garantit l'alignement des lignes. Les
recadrages partiels de la moitié droite sont à éviter — le fichier de données signale
que les cadres du bas du microfilm ne sont pas alignés d'une image à l'autre.

**La grille des 25 lignes ne tombe pas au même endroit d'une image à l'autre** : les
pages 57, 59 et 61 sont cadrées serré, les pages 58 et 60 portent tout l'en-tête et
descendent 200 pixels plus bas. Recaler avant de recadrer, sinon on lit la ligne d'à
côté — l'erreur classique de ce genre de travail. Le repère sûr est le filet noir
placé sous la rangée des numéros de colonnes : la première ligne commence une
douzaine de pixels dessous, et les 25 lignes se répartissent régulièrement jusqu'au
filet du bas.
