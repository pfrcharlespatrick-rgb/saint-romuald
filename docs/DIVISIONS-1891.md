# Les deux divisions en 1891 — une frontière reconstituée

*Journal de la reconstitution. Outil : `outils/relecture-1881/divisions91.mjs`.
Champs écrits : `maison.division_reconstituee`, `maison.appui_division`, et le
bloc `divisions_reconstituees` à la racine de `data/recensement-1891-d1-data.js`.*

## Ce que le manuscrit dit — et ne dit pas

Le fichier de 1891 s'appelle « division 1 » et le jeu « division 2 » est vide.
Ce n'est pas un dépouillement inachevé : **le formulaire de 1891 n'a pas de case
« division »**. L'en-tête imprimé porte « Census of Canada, 1891 — Province de
Québec — District No. 163, Lévis — S. District L, St Romuald », un seul
recenseur, Olivier Lambert, et une seule suite de pages, 1 à 142, du 6 avril
(page 1) au 11 mai (page 137). Les numéros de famille forment une seule série,
1 à 642. En 1891, Saint-Romuald est un seul sous-district ; les 3 548 personnes
du fichier sont la paroisse entière, et il n'y a rien à dépouiller pour une
« division 2 ».

La coupure en deux divisions n'existe donc **qu'en 1871 et 1881**, où chaque
division avait son recenseur et sa numérotation. Pour comparer les trois
recensements territoire par territoire, il faut la projeter sur 1891. C'est une
reconstitution, et elle est présentée comme telle : le champ `division` (« 1 »)
et les identifiants `1891-D1-…` restent ceux du dépouillement.

## La méthode : suivre le parcours du recenseur

La table des filiations (`data/filiation-data.js`) relie 1 398 personnes de 1891
à leur ligne de 1881 par 1 410 liens de confiance forte ou moyenne — 863 vers la division 1,
547 vers la division 2 (les liens « faibles » sont écartés). Chaque maison de 1891
reçoit donc, par ses habitants, un vote pour l'une ou l'autre division de 1881.
Les 95 liens directs 1871 → 1891, et les liens 1871 → 1881 remontés par la chaîne
1871 → 1881 → 1891, donnent le même vote pour 1871.

Une maison isolée qui vote pour l'autre division n'est pas une frontière : c'est
un ménage qui a déménagé. **Le recenseur de 1891 marche rue par rue** ; une
frontière se voit quand plusieurs maisons de suite changent de bord. La table
maison par maison (`--table`) fait apparaître **sept blocs** de parcours, et
c'est la division majoritaire du bloc qui est retenue pour toutes ses maisons.

| Maisons (1891) | Pages | Territoire | Maisons | Personnes | Liens 1881 D1 / D2 | Liens 1871 D1 / D2 |
|---|---|---|---:|---:|---:|---:|
| 1 – 307 | 1 – 69 | **division 1** | 306 | 1 721 | 593 / 79 | 216 / 64 |
| 308 – 325 | 69 – 74 | **division 2** | 18 | 124 | 4 / 49 | 11 / 12 |
| 326 – 400 | 74 – 90 | **division 1** | 71 | 409 | 126 / 21 | 38 / 19 |
| 401 – 414 | 91 – 93 | **division 2** | 14 | 67 | 3 / 22 | 3 / 8 |
| 415 – 444 | 93 – 100 | **division 1** | 30 | 164 | 59 / 5 | 20 / 10 |
| 445 – 611 | 100 – 137 | **division 2** | 167 | 919 | 31 / 351 | 9 / 213 |
| 612 – 642 | 137 – 142 | **division 1** | 31 | 144 | 46 / 9 | 19 / 8 |

Soit **438 maisons et 2 438 personnes sur le territoire de la division 1, 199
maisons et 1 110 personnes sur celui de la division 2** (les deux lignes biffées
comprises ; 2 436 et 1 110 sans elles).

Le script vérifie la décision avant d'écrire : dans chaque bloc, les liens de 1881
doivent désigner la division retenue au moins trois fois plus souvent que l'autre,
et les maisons liées « pour » doivent être au moins deux fois plus nombreuses que
celles « à contre-courant ». Les sept blocs passent largement.

### Où tombent les bornes

- **307 / 308** (page 69) : Jérémie Demers (5 liens vers 1881 D1, page 6) puis
  Joseph Boucher (5 liens vers 1881 D2, page 11). Net.
- **325 / 326** (page 74) : François Morin (6 liens D2) puis James Conroy (2 liens
  D1). Net.
- **400 / 401** (page 90 → 91) : Victor Blais (D1), deux maisons sans lien, puis
  Henri Cantin (2 liens D2) ouvrant douze maisons liées à D2 sur quatorze.
- **414 / 415** (page 93) : Thomas Montigny (5 liens D2), puis quatre maisons sans
  lien vers 1881 (Gagnière, Convill, May, Faucher — la maison Faucher a 2 liens
  1871 D1), puis Damase Beaulieu (5 liens D1). La borne est posée à 415 ; les
  maisons 415 à 418 sont donc D1 « par continuité » et pourraient aussi bien
  fermer le bloc D2.
- **444 / 445** (page 100) : Jean Nicol (6 liens D1), puis F. Lambert dont les
  deux liens se partagent (1881 D1 page 57, D2 page 44) — et la page 44 de 1881 D2
  est justement celle par où le grand bloc commence (maisons 448 à 450 : pages 44
  et 43). Lambert ouvre donc le bloc D2 ; Vallière (sans lien 1881, 1 lien 1871 D2)
  et Martineau (D2) suivent.
- **611 / 612** (page 137) : Fred Smith (4 liens D2, page 55) puis Germain Cantin
  (2 liens D1, page 48). Net.

## Ce que dit 1871

Les deux frontières concordent. Le long des pages de 1881, les gens de 1871 se
répartissent ainsi : **la division 2 de 1881 est peuplée de gens de la division 2
de 1871** presque sans exception — seules ses pages 2 à 6 et 52 à 58 mêlent
quelques ménages venus de la division 1 —, et la division 1 de 1881 de gens de
la division 1 de 1871, avec des poches (pages 4 à 6, 15 et 16, 30, 43, 80, 88) qui
sont des ménages déplacés, non un morceau de territoire. La reconstitution suit
1881, plus proche et mieux liée ; 1871 la confirme dans six blocs sur sept.

**Le seul bloc où 1871 hésite est le bloc 308 – 325** (pages 69 à 74 : 11 liens
1871 D1 contre 12 D2). C'est le début du parcours du recenseur de 1881 D2 (ses
pages 2 à 11), et ces pages-là de 1881 comptent déjà des gens de 1871 D1. Le
territoire est bien celui de la division 2 de 1881 ; en 1871 la limite passait
peut-être un peu plus loin. Le champ `appui_division` porte les deux comptes.

## Les 49 maisons à contre-courant ou partagées

Quarante-trois maisons ont des liens qui pointent vers l'autre division que celle
de leur bloc, six ont des liens partagés. Elles sont éparses — jamais plus de deux
de suite (346 et 348, 366 et 367, 580 et 581, 588 et 589) —, et leurs liens
renvoient à des pages de 1881 éloignées les unes des autres : ce sont des
déménagements, non des morceaux de frontière oubliés. Le champ `appui_division`
le dit pour chacune (« ménage venu de l'autre division »). Le sens des
déplacements est parlant : **114 liens partent de 1881 D2 vers des maisons
placées en territoire D1, 38 seulement dans l'autre sens.**

## Une division 2 qui se vide

Rapportées aux divisions de 1881 (2 189 et 1 452 personnes), les populations
reconstituées de 1891 (2 438 et 1 110) montrent la division 2 en recul d'un quart
et la division 1 en hausse. Ce n'est pas un artefact de la méthode :

- les taux de rattachement sont les mêmes des deux côtés (39 % des personnes de
  1881 D1 retrouvées en 1891, 38 % de 1881 D2) ;
- aucun bloc de 1891 étiqueté D1 ne cache un territoire D2 : les gens de 1881 D2
  qui se retrouvent en territoire D1 y sont dispersés, une maison par-ci par-là ;
- plusieurs pages de 1881 D2 n'ont presque plus personne en 1891 (pages 7, 17, 19,
  21, 22, 24, 56, 58 : de 1 à 4 personnes retrouvées sur 25) — des ménages partis
  de la paroisse, ou dispersés vers le territoire de la division 1.

C'est une observation, à rapprocher de l'histoire des chantiers navals ; le
journal la note sans l'expliquer.

## Ce qui est écrit, et où

- `maison.division_reconstituee` : « 1 » ou « 2 », sur les 637 maisons.
- `maison.appui_division` : sur quoi repose l'attribution — « 5 liens vers 1881 D2 »,
  « par continuité du parcours du recenseur (aucun lien vers 1881) », « … ses 2
  liens vers 1881 pointent vers D1 — ménage venu de l'autre division », ou « liens
  partagés » —, suivi des comptes de 1871 quand il y en a.
- `divisions_reconstituees` à la racine : la note de méthode, les sept blocs avec
  leurs comptes, les totaux.
- Le site : la fiche de maison et la fiche de personne disent le territoire et
  son appui ; la trajectoire marque « (terr. D2) » à côté de la mention de 1891 ;
  la page des statistiques donne les deux populations sous la tuile de 1891.

Le script est idempotent. Si la table des filiations est recalculée, le relancer
recompte les appuis ; les bornes des blocs, elles, sont une décision consignée
ici, et ne changent que si l'on rouvre ce journal.

## Sur la carte

La carte (`carte.html`) porte la frontière en **ligne tiretée bleue**, avec une
étiquette de chaque côté — « Division 1 — le village » vers le nord-est,
« Division 2 — New Liverpool » vers le sud-ouest. Le tracé vit dans
`data/frontiere-divisions-data.js` (`window.FRONTIERE_DIVISIONS` : `trace`,
`etiquettes`, `precision`, `appuis`), chargé par la page comme les plans anciens.

Il est **approximatif**, et n'est appuyé qu'à deux endroits, là où des lieux placés
des deux divisions se font face :

- **le chemin du Fleuve, entre le 2052 et le 2058** — les maisons Cantin (2039 et
  2052 : 1871 D1 maison 18, 1881 D1 maison 33, 1891 maison 291) sont en division 1,
  le bâtiment Lee (2058-2060 : 1871 D2 maison 78, 1891 maison 405) en division 2 ;
- **la rue du Collège, entre le 65 et le 105** — le 65 (1891 maison 430) est en
  territoire de la division 1, le 105 (1891 maisons 446 et 457, Lauréat Vallière)
  ouvre le grand bloc de la division 2.

Les villas jumelles (2071-2065 : 1881 D2 maison 244, la dernière du parcours de la
division 2) et la maison Saint-Hilaire (2123 : 1881 D2 maison 161) disent que la
ligne serre le chemin de près à cet endroit ; leurs positions sont interpolées le
long du chemin, non relevées, et ne fixent rien de plus. Au-delà de ces deux
appuis, la ligne est prolongée à vue vers le fleuve et vers l'intérieur des
terres ; tout ce qui est placé à l'ouest du 1984 relève de la division 2, tout ce
qui est à l'est du 2104 de la division 1.

**La main l'emporte ici aussi.** En mode Atelier, les quatre sommets numérotés et
les deux étiquettes se glissent ; le geste passe la précision de « approximative »
à « posée à la main », part dans `localStorage` sous `suivi-frontiere`, voyage
avec la sauvegarde de l'atelier dans `data/travail-personnel.json`, et
`outils/lieux/fondre.mjs` le verse dans le fichier de données. La barre d'atelier
offre aussi le téléchargement direct du fichier.

La bulle de chaque lieu dit de quel côté ses maisons le placent (« côté
division 2, d'après ses maisons »), ou signale des maisons des deux divisions —
près de la frontière, ou un rattachement à revoir.

## Limites

- La frontière est celle des liens de filiation : une maison sans lien reçoit la
  division de son bloc, sans preuve propre (194 maisons sur 637, dites « par
  continuité »). Aux bornes 414/415 et 444/445, l'incertitude porte sur trois ou
  quatre maisons.
- Au sol, la ligne n'est appuyée qu'en deux points (voir « Sur la carte »).
  Chaque maison de 1881 ou de 1891 que la couche « lieux » (`docs/LIEUX.md`)
  placera près du chemin du Fleuve 2050-2130 ou de la rue du Collège
  précisera le tracé, et pourra le prolonger vers l'intérieur des terres.
- Les 2 150 personnes de 1891 sans lien vers 1881 ne pèsent pas dans le vote ; le
  recalcul de la filiation, s'il en rattache davantage, affinera les appuis sans
  déplacer les bornes, sauf à ce que le journal soit rouvert.
