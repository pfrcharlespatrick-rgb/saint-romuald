# La colonne 14 de 1881 division 1 — journal de la passe

**Ce n'est pas une vérification, c'est une lecture.** La colonne des professions
n'avait jamais été dans le cadre : la relecture de 1881 s'est faite sur la
fenêtre `REF_X0F, REF_X1F = 0.075, 0.420` de `outils/relecture-1881/d1.py`, qui
s'arrête juste après la colonne des âges. Les 667 professions du fichier
viennent donc du dépouillement seul — et les 1 522 cases vides n'ont pas plus
été regardées que les autres. **Une profession que le dépouillement a manquée
est une perte au même titre qu'une profession mal lue.**

## L'outillage

Les deux constantes ne bougent pas : elles servent au recalage entre pages
(`geometry`, `_shift`). `outils/relecture-1881/prof1.py` passe donc par des
fenêtres à soi, **décalées page à page du même `dx` que le cadre**, et recolle
côte à côte les trois morceaux utiles — qui sont aux deux bouts du formulaire :

    nom (7) | profession (14) | marié ou en veuvage (15) | nos de ligne

La marge des numéros de ligne vient du bord droit de la page. C'est elle qui
rend la planche lisible seule : le numéro imprimé en bout de rangée dit à quelle
ligne on est, sans avoir à recaler à l'œil sur des noms qui sont à l'autre bout.
Une page tient sur une image, ses vingt-cinq rangées d'un coup.

`outils/relecture-1881/prof1.mjs` verse un lot de `outils/relecture-1881/lots81/`.
Deux gardes y sont posées :

- il **refuse de s'exécuter** si le fichier porte une profession sur une ligne
  que le lot laisse vide sans la nommer dans `vider`. Une suppression est une
  décision, elle s'écrit — et c'est ce qui empêche une page lue à moitié de
  passer pour une page lue ;
- la colonne 15 est **lue et rapportée, mais pas écrite** tant qu'on ne passe pas
  `--etat` (voir ci-dessous).

## Le signal des « V » — confirmé au manuscrit dès la première page

**La colonne 15 porte bien des veufs et des veuves en division 1, et le
dépouillement les a tous perdus.** Sur les six premières pages — 150 rangées —
la colonne 15 du manuscrit s'accorde au fichier **partout où elle porte un
« M »**, et s'en écarte **partout où elle porte un « Ve. »** : huit fois.

Le détail est plus bas, sous chaque lot. Rien n'est écrit dans
`etat_matrimonial` tant que Patrick n'a pas tranché.

## Lot pages 1-6 — 150 rangées

`outils/relecture-1881/lots81/d1-001-006.json`

Quatre écritures :

| | |
|---|---|
| p3 L16 — McQuilkel William | « Meunier » → **« Mouleur »**. La deuxième lettre est un o, et le mot finit en « -eur » comme le « Colleur » de la ligne 19. |
| p4 L11 — Dubois Pierre, 20 ans | case vide → **« Batelier »**, repris au guillemet du père (ligne 10). |
| p4 L12 — Dubois Joseph, 18 ans | case vide → **« Batelier »**, même guillemet. |
| p6 L15 — Slater William, 37 ans | « Chrémeur » (marqué incertain) → **« Arrimeur »**, même main et même tracé que l'« Arrimeur » de la page 2 ligne 12. Le doute est levé. |

Les 146 autres rangées concordent au mot près.

Deux cas laissés tels quels, pour mémoire :

- **p2 L14, Hamelin Pierre** : « Journalier » est repassé d'un trait plus noir au
  milieu du mot. Ce n'est pas une rature — le mot reste entier et la coche du
  greffier est là. Lu « Journalier », comme le dépouillement.
- **p6 L7, Demers François, 17 ans** : la colonne 14 porte un tiret, et « fils »
  est écrit par-dessus en travers, d'une autre encre. Le tiret est la réponse ;
  le mot « fils » était déjà consigné en remarque par le dépouillement.

Les huit « Ve. » du lot : p2 L10 (Dubé Ursule, 59), p3 L7 (Taylor Anastasie,
62 — le dépouillement notait déjà « veuve [?] » en remarque), p3 L23 (Wilson
Bibianne, 80), p4 L5 (Boucher Esther, 62 — remarque « veuve »), p5 L2 (Lepard
Marie, 73), p5 L22 (Cantin Josette, 80), p6 L9 (Nicolle Sophie, 74), p6 L15
(Slater William, 37).

## Lot pages 7-12 — 175 rangées (la page 6 reprise au passage)

`outils/relecture-1881/lots81/d1-007-012.json`, `…/d1-006-fils.json`

Cinq écritures :

| | |
|---|---|
| p7 L12 — Kigly James, 34 ans | « Cabaretier » → **« Capitaine de bateau »**. Le manuscrit porte « Capitaine de b.at. », les deux dernières lettres en exposant. Marqué incertain : c'est l'abréviation qui reste à confirmer, pas le mot « Capitaine ». |
| p8 L5 — Nolin Joseph, 21 ans | case vide → **« Menuisier »**. La colonne porte « do », le ditto anglais du recenseur, sous le « Menuisier » de la ligne 4. |
| p8 L6 — Nolin Edouard, 18 ans | case vide → **« Menuisier »**, même ditto. |
| p10 L7 — Cantin Narcisse, 17 ans | case vide → **« Fils »**. |
| p6 L7 — Demers François, 17 ans | case vide → **« Fils »** (rectification du lot précédent). |

### « fils » est une valeur de colonne, pas une remarque

Les quatre cases sont de la même main et du même tracé — un « fils » à longue
hampe, avec la coche du greffier. Aux lignes 16 et 17 de la page 87, **le
dépouillement l'a bien relevé comme profession** ; aux pages 6 et 10, il l'avait
versé en remarque. Les quatre disent la même chose : le fils majeur qui travaille
sur la terre du père. Le lot les remet dans la colonne.

### La coche du greffier, et pourquoi elle compte

Chaque entrée de la colonne 15 est suivie d'un trait de pointage qui **déborde
sur le bord gauche de la colonne 16**. Il ne faut pas le lire comme une marque
d'école : il est plus gras, plus à gauche, et il suit toujours un « M. » ou un
« Ve. ». À l'inverse, il confirme la lecture — une marque de la colonne 15 sans
son trait de pointage mérite un second regard.

C'est pour trancher ce genre de question que `prof1.py` sait désormais empiler
la **réglette imprimée des numéros de colonne** au-dessus de la planche
(`reglette=True`). Les colonnes 15 et 16 sont voisines et étroites ; une marque
lue d'une colonne à côté est une erreur qu'aucune relecture ultérieure ne
rattrape.

### Ce que la colonne 15 a rendu sur ce lot

Onze « Ve. » de plus — p8 L1, p8 L19, p9 L10, p10 L1, p10 L2, p10 L5, p11 L4,
p11 L5, p11 L17, p11 L25, p12 L16 — et **un couple qui n'en est pas un** :

> **Page 12, Bégin Rigobert, 38 ans.** Le manuscrit le porte « Ve. ». La ligne
> suivante, « Bégin Marie », que le fichier donne pour son épouse de 40 ans avec
> un « M » qui n'est nulle part au manuscrit, porte un tiret en colonne 15 — et
> **une marque d'école en colonne 16**. Le complément notait déjà, sans pouvoir
> conclure : « l'âge se lit « 6 », le dépouillement porte 40 ». Les trois signes
> se répondent : Marie a six ans, elle est sa fille, et la mère est morte — la
> petite Virginie de la ligne 13 est née en décembre.

Rien n'est écrit dans `etat_matrimonial`, là non plus.

## Lot pages 13-18 — 150 rangées

`outils/relecture-1881/lots81/d1-013-018.json`

Six écritures, dont **deux cases à vider** — ce qui n'était pas arrivé jusqu'ici :

| | |
|---|---|
| p13 L20 — Pelletier Philippe, 16 ans | « Commis » → **« Cultivateur fils »**. Le « Commis » du dépouillement est le mot de la **ligne 21** ; le manuscrit porte ici « Cult. fils », le t de l'abréviation en exposant. |
| p14 L11 — Guay George, 26 ans | « Boulanger » → **case vide**. Voir ci-dessous. |
| p14 L16 — Caouette Rosalie, 53 ans | « Journalier » → **case vide**. Le manuscrit porte un tiret ; le « Journalier » est à la ligne 17, celle de son fils Jérémie. Elle est veuve et chef de ménage — l'un n'entraîne pas l'autre. |
| p17 L16 — Larochelle Adelore | case vide → **« Charretier »**, au ditto « do » sous la ligne 15. |
| p17 L25 — Gauvreau Antoine | « Prêtre[?] » → **« Prêtre Curé »**, en toutes lettres. Le point d'interrogation tombe. |
| p18 L1 — Beaudet Alphonse | « Prêtre » → **« Prêtre Vicaire »**, en toutes lettres. |

### « Not given » — la seule case du lot où le manuscrit refuse de répondre

Page 14 ligne 11, Guay George. Le dépouillement lisait « Boulanger ». Le mot n'y
est pas : la case porte, **d'une autre main que celle du recenseur — plus grasse,
à la plume**, une annotation lue **« Not given »**. Ce n'est pas un métier, c'est
un constat de bureau : la profession n'a pas été déclarée.

C'est l'écart signalé de longue date dans `BILAN-RELECTURE.md` sous « un mot en
"Not-" ». La case est vidée et la ligne marquée incertaine, la lecture de
l'annotation n'étant pas hors de doute — mais **« Boulanger » n'est en aucun cas
ce qui est écrit**.

### Le ditto, deuxième et troisième fois

Le recenseur reprend la valeur du dessus de trois façons, toutes rencontrées
maintenant : le **guillemet** français (p4 L11-12, p18 L8-10), le **« do »**
anglais (p8 L5-6, p15 L6, p17 L16, p18 L15), et le mot **répété en entier**
(p15 L24-25, p17 L20). Aucune des trois n'a de sens hors de son contexte : c'est
pourquoi la planche porte les vingt-cinq rangées d'un coup plutôt que des
bandes.

Trois « Ve. » de plus, non écrits : p14 L2 (Cameron Sophy, 65), p14 L16
(Caouette Rosalie, 53), p16 L13 (Huard Lucie).

## Lot pages 19-24 — 150 rangées

`outils/relecture-1881/lots81/d1-019-024.json`

Cinq écritures, dont **quatre cases que le dépouillement avait laissées vides** :

| | |
|---|---|
| p19 L18 — Lambert Joseph | → **« Journalier »**, au « do » sous la ligne 17. |
| p21 L5 — Levasseur Olive, 57 ans | « Ménagère » → **« Manchonnière »**. Voir ci-dessous. |
| p22 L7 — Morin Joséphine | → **« Chapelière »**, écrit en toutes lettres. |
| p22 L15 — Boutin Louise | → **« Domestique »**, au guillemet sous la ligne 14. |
| p24 L17 — Toussaint Benjamin | → **« Journalier »**, au guillemet sous la ligne 16. |

### « Manchonnière » — un métier que le dépouillement avait remplacé par un autre

Page 21 ligne 5, Levasseur Olive, 57 ans, femme de Jérémie. Le fichier porte
« Ménagère ». Le mot du manuscrit en compte douze lettres et commence par un M
majuscule : **« Manchonnière »** — celle qui fait les manchons de fourrure.
Marqué incertain, la lecture n'étant pas hors de doute ; mais « Ménagère »,
huit lettres, n'est en aucun cas ce qui est écrit.

Avec la « Chapelière » de la page 22, ce sont deux métiers de femme que la
colonne rendait et que le fichier ne portait pas.

Une case reste illisible : **p22 L23, Demers Pierre** — le mot est effacé au
point qu'on n'en tire que sa longueur, compatible avec le « Boulanger » du
dépouillement. Laissé tel quel.

Sept « Ve. » de plus, non écrits, dont un **contre** le fichier : p19 L17
(Lambert J.Baptiste, 45, que le fichier donne pour marié), p20 L14, p21 L10,
p22 L3, p22 L4, p23 L1, p23 L12.

## Le découpage des recueils — un piège qui ne se voit pas

**Arrivé à la page 30, la planche a rendu une carte de titre.** `d1.locate`
plaçait les pages 30 à 59 dans le deuxième recueil à l'index `ms - 29` ; or le
fichier déposé dans cette session sous ce nom **porte le manuscrit entier, pages
1 à 89**, à l'index `ms + 1`. Le même nom de fichier, d'un dépôt à l'autre, a
désigné tantôt un tiers du manuscrit, tantôt le tout.

Ce qu'il faut en retenir : **une erreur d'un rang sur ce découpage ne se voit
pas.** Si la carte de titre n'avait pas été là, la planche aurait rendu la page
1 à la place de la page 30 — une page qui a l'air d'une page. Et tout ce qui
aurait été lu ensuite aurait été juste, au manuscrit près.

Trois choses sont donc en place :

- `verif_pages.py` monte en planche le **« PAGE n » imprimé** en tête des
  demi-pages demandées. Trois sondages par recueil fixent le découpage.
  `--tout` prend le premier, le deuxième, le troisième et le dernier de chacun ;
- `render1.half_raw` **refuse** une demi-page que le recueil ne porte pas, en
  nommant le recalibrage à faire, plutôt que de rendre autre chose ;
- le découpage relevé est écrit en tête de `d1.py`, avec la date de son relevé.

Relevé sur les recueils de cette session : partie1 → pages 1-29 (idx = ms+1),
partie2 → pages 1-89 (idx = ms+1, le recueil complet), partie3 → pages 60-89
(idx = ms-59). Les pages 1 à 29 déjà lues n'étaient pas touchées : leur
découpage était le bon, et les noms de chaque planche concordaient rangée par
rangée avec le registre.

## Lot pages 25-30 — 150 rangées

`outils/relecture-1881/lots81/d1-025-030.json`

| | |
|---|---|
| p25 L4 — Blais Marie Anne | → **« Domestique »**, écrit en toutes lettres. |
| p25 L25 — Paradis Joseph | → **« Journalier »**, au guillemet. |
| p27 L1 — Montigny François, 96 ans | « Rentier » → **case vide**. Le manuscrit porte un tiret ; il y est « Ve. » et sans métier. |
| p28 L25 — Roy Joseph | → **« Journalier »**, au guillemet. |

La colonne 15 rend quatre « Ve. » (p25 L22, p27 L1, p29 L9, p29 L22) et — c'est
nouveau — **trois « M » que le dépouillement n'avait pas relevés** : p27 L2 et L3
(Montigny Thomas, 61 ans, et Marie, mariés tous les deux), p28 L1 (Ménard Diana).
Le manque ne portait donc pas que sur les veufs.

## La marge de droite est un faux ami — c'est celle de gauche qui fait foi

Le formulaire numérote ses rangées **aux deux bords**. La planche s'appuyait sur
celle de droite, la plus loin de tout. À la page 32, les deux marges ne disent
pas la même chose : **la droite est d'une rangée plus bas que la gauche**. Un
degré de rotation à la prise de vue suffit — sur la largeur d'une page, un degré
vaut une rangée.

La marge de gauche, elle, **touche la colonne des noms** : rien ne peut glisser
entre les deux. La planche porte désormais les deux, la gauche en tête, et c'est
elle qui fait foi ; leur désaccord avertit au passage que la page est de
travers.

Les pages 1 à 31 n'étaient pas touchées : sur chacune, les professions lues
tombaient d'accord avec le registre à trois ou quatre cases près, ce qui serait
impossible avec un décalage d'une rangée — la garde de `prof1.mjs` aurait arrêté
le lot dès la première ligne.

## Lot pages 31-36 — 150 rangées

`outils/relecture-1881/lots81/d1-031-036.json`

Deux écritures seulement, les plus propres du chantier : **p32 L18 et L19**,
Hébert Emé et George, qui reçoivent le « Cordonnier » que la colonne reprend au
« do » de la ligne 17. Un seul « Ve. » à signaler, p34 L10 (Chamberland Pitale,
71 ans, pilote).

## Lot pages 37-42 — 150 rangées

`outils/relecture-1881/lots81/d1-037-042.json`

Une écriture : **p38 L16, Brochu Louis, 67 ans**, qui reçoit le « Journalier »
repris au guillemet de la ligne 15 — et que la colonne 15 porte « Ve. ». Trois
« Ve. » au total (p38 L16, p39 L4 Hamel Flore 51 ans, p41 L21 Boivin Michel).

Ces pages-là sont les plus fidèles du chantier : 149 rangées sur 150 d'accord au
mot près.

## Lot pages 43-48 — 150 rangées

`outils/relecture-1881/lots81/d1-043-048.json`

Deux écritures, toutes deux des cases vides remplies : **p45 L11** (Bourassa
Magloire, au guillemet du « Journalier » de la ligne 10) et **p46 L16** (Rotin
George, au « do » du « Menuisier » de la ligne 15).

Colonne 15 : deux « Ve. » (p46 L23 Simard Délina, p47 L21 Lockwell Flore), un
« M » manquant (p47 L10) et — pour la première fois — **un « M » de trop** :
p48 L2, Bilkey John, marchand de bois, que le fichier donne pour marié quand la
case est vide au manuscrit.
