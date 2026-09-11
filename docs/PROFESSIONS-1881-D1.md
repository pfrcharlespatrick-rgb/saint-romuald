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
