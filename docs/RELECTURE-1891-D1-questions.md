# Recensement de 1891, division 1 — relecture au manuscrit

**Relecture terminée pour les 142 pages.** Chaque page a été confrontée aux données de
`data/recensement-1891-d1-data.js`, sur les images fournies par Patrick puis, à partir
de la page 62, sur les recueils PDF du microfilm.

**Les lectures les plus probables sont appliquées au fichier**, à la demande de
Patrick, qui fera la relecture d'ensemble à la fin. Chacune porte `incertain: true`
et conserve la lecture d'origine dans sa `remarque` : filtrer sur ce drapeau donne
exactement la liste à revoir. Ce document garde la trace de ce qui a été décidé et
de ce qui ne l'a pas été.

Lignes corrigées : **312** — 193 portent un nom ou un prénom, 14 un âge, 112 un autre
champ (lieux de naissance, liens de parenté, sexe, religion, alphabétisation) ;
quelques-unes en cumulent plusieurs. **Cinq corrections antérieures annulées** : l'affaire
dite « Elmire », close plus bas. Lignes signalées sans correction : **92**.

**La passe sur les colonnes 21-22 est terminée** : pages 42 à 142, 2523 lignes relues case
par case, **152 corrigées**. Restaient, pour clore le chantier : les pages 1 à 41, qui
n'avaient pas alors de recueil PDF, et les quatre décisions d'ensemble qui appartiennent à
Patrick — la ligne biffée de la page 42, les variantes de patronymes, le vocabulaire des
religions, les paires de frères et sœurs au même âge.

**Le recueil des pages 1 à 41 est arrivé** (`1891_01_DIV12`, pris en charge par `r91a.py`) :
la reprise est en cours, par lots de quatre pages — voir la section « Le recueil des pages
1 à 41 » ci-dessous. **Lots 1 à 9 (pages 1-36) : faits.**

**Les pages 42 à 142 ont été lues sur PDF** (deux pages du manuscrit par page PDF) : le
rendu à haute résolution y règle en quelques minutes ce que les JPEG laissaient
indécidable. Restent en JPEG les pages 1 à 41 : c'est de là que viennent désormais presque
toutes les lectures en suspens — dont 54 des 56 « sait écrire mais ne sait pas lire ».
Le recueil des pages 42-83 porte en outre les colonnes 17 à 25 sur la même prise que les
noms, et **répète les numéros de ligne dans la marge droite** : c'est lui qui a permis la
passe sur les colonnes 21-22.

## Ce qui est confirmé

La structure est juste sur les 142 pages : 25 lignes chacune (23 à la dernière),
familles 1 à 642 dans l'ordre, numéros de maison alignés, professions conformes. Le dépouillement de 1891 est
nettement plus fiable que celui de 1881 — les écarts ci-dessous sont des variantes de
lecture, non des inventions.

Détails vérifiés au passage : le code de logement de la colonne 4 (« B 2/6 » = bois,
2 étages, 6 chambres) est bien enregistré ; les liens rares sont justes (belle-sœur,
bru, gendre, petit-fils, pensionnaire, cousine).

**Deux réserves, nées des pages 97 à 142.** Les **origines étrangères** ne sont pas
toutes exactes : quinze personnes en sont revenues, voir la question n° 4. Et les **liens
de parenté** demandent d'être lus au manuscrit plutôt que déduits de la structure des
familles — quatorze lignes y sont passées.

## « Éléonarde » / Elmire — l'affaire est close, et elle avait été mal jugée

Le fichier contenait **cinq « Éléonarde »** pour huit « Elmire ». Sur les images JPEG,
l'hypothèse d'un même mot rendu de deux façons semblait démontrée par la page 48, où le
dépouilleur écrit « Éléonarde » à la ligne 1 et « Elmire » à la ligne 3 : les cinq
occurrences avaient donc été corrigées en Elmire. Le PDF de la page 66 avait ensuite fait
annuler l'une des cinq. **Le recueil des pages 42 à 83 règle les quatre autres, et dans le
même sens : la correction était fausse.**

Les deux tracés n'ont rien de commun, et le grossissement le montre sans discussion :

- **« Eleonard »** — pages 44 L24, 45 L2, 46 L15, 48 L1, 66 L15 : un mot long, un **o**
  net après « El », une finale en **« -ard »** terminée par un trait horizontal ;
- **« Elmire »** — pages 48 L3 et 62 L12 : un mot court, un **m**, une finale en
  **« -ire »**, le point du i bien posé.

La ligne 3 de la page 48, qui passait pour la preuve, en est le contre-exemple : elle
porte un « Elmire » authentique, deux lignes sous un « Eleonard » tout aussi authentique.
Le dépouilleur avait raison les deux fois. L'index de BAC lit d'ailleurs « Eleonard » à
la page 45 ligne 2.

**Les cinq lignes portent désormais « Eleonard »** — la graphie que le dépouilleur emploie
lui-même pour ce tracé aux pages 115, 116, 117, 128 et 139. La forme accentuée
« Éléonarde », qui n'existe nulle part ailleurs, disparaît du fichier ; le prénom réel est
vraisemblablement Éléonore, mais ce n'est pas ce que porte le manuscrit.

C'est la deuxième fois que ce chantier corrige une de ses propres corrections. La leçon
tient en une ligne : **une lecture faite sur JPEG ne vaut pas contre le PDF**, et un
raisonnement de cohérence — « ce doit être le même mot » — ne remplace pas le tracé.

## Question n° 4 — le piège des colonnes de naissance joue aussi dans l'autre sens

**C'est la trouvaille des pages 97 à 124, et elle vaut d'être vérifiée sur les
96 premières pages, qui n'ont pas été relues sous cet angle.**

Le document notait déjà, aux pages 36-37, que deux femmes portées « Québec » l'étaient
à bon droit : les mentions « England » et « Ireland » de leurs lignes sont aux
colonnes 13 et 14, celles des parents. Le dépouillement avait alors bien lu.

**Il a lu à l'envers quinze fois entre les pages 97 et 124.** Chez les Atkinson
(page 99), chez Suzan French et sa servante (page 101), chez les McReady, les Lee, les
Linch, les Andrew, les St John, la **colonne 11 porte un simple signe de répétition** —
c'est-à-dire « Québec », valeur de la ligne au-dessus — et ce sont les colonnes 13 et 14
qui portent Angleterre, Écosse, Irlande. Le dépouillement a remonté le pays des parents
dans la case de l'intéressé, et **fabriqué quinze immigrants qui n'en sont pas** :

| Page·ligne | Personne | Dépouillement | Manuscrit (col. 11) |
|---|---|---|---|
| 99 L6 | Atkinson Henry, 59, marchand de bois | Angleterre | **Québec** (père anglais, mère écossaise) |
| 99 L7 | Atkinson Selina, 44 | Irlande | **Québec** (père irlandais) |
| 101 L15 | French Suzan, 42, maîtresse de pension | Angleterre | **Québec** (père anglais, mère irlandaise) |
| 101 L20 | Backet Rose, 36, servante | Angleterre | **Québec** (idem) |
| 97 L5 | Wilson Kate, 30 | Irlande | **Québec** |
| 105 L24 | Varlot Marie Louise, 24 | Belgique | **Québec** — voir plus bas |
| 110 L3 | Carrier Joan, 37 | Irlande | **Québec** (parents irlandais) |
| 110 L4 | Ahern Robert, 38, son frère | Irlande | **Québec** (idem) |
| 110 L17 | Dawson John, 38 | Irlande | **Québec** — ses trois cadets y sont déjà portés « Québec » |
| 113 L5 | McReady Delima, 66 | Irlande | **Québec**, et « 1 » en colonne 12 : Canadienne française |
| 113 L17 | McReady Éléonore, 56, marchande | Irlande | **Québec** (idem) |
| 115 L13 | Lee Robert, 29 | Angleterre | **Québec** (père anglais, mère irlandaise) |
| 124 L7 | Linch John, 47, mesureur de bois | Irlande | **Québec** — seule sa femme, ligne 8, porte « Irelande » en colonne 11 |
| 124 L15 | Andrew Margurit, 40 | Angleterre | **Québec** (père anglais, mère irlandaise) |
| 124 L19 | St John Marguerit, 65, couturière | Irlande | **Québec** (parents irlandais) |

La lecture n'est pas une conjecture : **les enfants la confirment**. Les six petits
Atkinson portent « Q » en colonne 13 — le lieu de naissance de leur père —, et le
recenseur a même biffé sa première écriture à la ligne 8 pour la corriger en « Q ». Les
quatre petits French portent « Q » en colonnes 13 **et** 14. Un ménage anglophone né au
Québec de parents venus des Îles Britanniques : c'est le profil ordinaire de la
communauté britannique de la région, pas une anomalie.

Le cas de Wilson Kate (page 97) est le seul qui reste **contradictoire** : sa ligne
porte « Q » en colonnes 11, 13 et 14, alors que sa mère Mary, ligne 4 juste au-dessus,
est bien née en Irlande — le manuscrit y écrit « Irelande » en toutes lettres, trois
fois. L'un des deux est fautif, et c'est le recenseur, pas le dépouilleur. La lecture du
manuscrit a été appliquée, la contradiction est signalée en remarque.

**Ce qu'il faut en retenir pour la suite** : devant une naissance étrangère, ne jamais
se fier au seul mot lisible sur la ligne — repérer d'abord la colonne. Le repère sûr est
la colonne 12 (« Canadiens français »), étroite, qui porte 1 ou un tiret : la colonne 11
est immédiatement à sa gauche, les colonnes 13 et 14 immédiatement à sa droite.

**La page 105 en donne la démonstration la plus nette.** Le dépouillement y logeait chez
David Hardy deux pensionnaires belges, Léandre et Marie Louise Varlot. Or la ligne de
Marie Louise porte « fl. » (fille) en colonne 10, le signe de Québec en colonne 11, « 1 »
en colonne 12 — Canadiens français — et « Q » aux colonnes 13 et 14, celles de ses
parents, qui sont précisément David Hardy et Rose Delima, lignes 15 et 16. C'est une fille
de la maison, née au Québec, mariée à un mécanicien belge ; et son mari, en colonne 10,
est écrit **gendre**. Le seul mot « Belgique » de la ligne 23 avait suffi à faire de la
femme une immigrante et du couple des étrangers de passage.

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

**Ce n'est pas la seule.** Le recueil des pages 1-41 en a révélé une seconde, plus haut
dans le recensement : **page 36, ligne 23 — Terrien Joseph, 9 ans, fils.** Même geste, un
long trait horizontal en travers de toute la ligne, et le prénom biffé par-dessus. Elle
figure elle aussi au fichier, avec la remarque « Ligne rayée au registre ».

**La décision de Patrick porte donc sur deux lignes, pas une** — et le choix doit être le
même pour les deux, sous peine d'incohérence. Les trois voies ci-dessus valent
inchangées ; seul le décompte change : retirer les deux ferait passer la division de 3548
à 3546 personnes.

## Le recueil des pages 1 à 41 — la relecture reprend, par lots de quatre pages

Patrick a fourni le PDF `1891_01_DIV12` : 21 pages, deux cadres par page, comme les
trois autres recueils. Le premier cadre est la carte-titre du microfilm (« 1891 Québec,
163 — Lévis, L — St. Romuald d'Etchemin Munc., pages 1-142 ») ; la page 1 du manuscrit
occupe le cadre du bas de la première page PDF, d'où `r91a.py` avec `base=0` — la
page *n* du manuscrit occupe le cadre *n*. La géométrie des filets est celle des autres
recueils, la marge droite répète les numéros de ligne, et les colonnes 17 à 25 sont sur
la même prise que les noms : chaque case se lit à l'ancre près. Ce sont précisément les
pages qui n'avaient jamais été lues que sur JPEG.

### Lot 1 — pages 1 à 4 (18 août 2026)

**Colonnes 21-22 : 75 écarts sur 100 lignes.** Le soupçon du chantier précédent est
confirmé, et au-delà : sur ces pages, les valeurs du dépouillement (`positif_1891`) ne
sont pas seulement lacunaires, elles sont **anti-alignées** avec le manuscrit. La page 2
en donne le cas le plus net : le dépouillement coche les lignes 6-12, 15, 16 et 18
(les Veilleux, les Boucher, Xavier Emond) — le manuscrit n'y porte que des tirets — et
laisse vides les lignes 1-5 et 19-24 (les Roy, Delina Emond et ses aînés), où le
manuscrit porte des « 1 » aux deux colonnes. Rien d'un simple décalage d'une ligne :
les blocs cochés du dépouillement ne recoupent pas ceux du manuscrit. Devant une valeur
d'alphabétisation des pages 1 à 41 qui n'a pas encore été relue au recueil, ne rien
conclure.

**Les « sait écrire mais ne sait pas lire » : sept cas sur ces quatre pages, aucun
n'a survécu.** Six étaient des « lit mais n'écrit pas » inversés (p. 1 L2 et L6,
p. 3 L23 et L24, p. 4 L2 et L4), le septième (p. 4 L3, Vermette Alain, 75 ans) ne porte
que des tirets. Restent 47 cas, pages 5 à 41 — même pronostic.

**Colonnes 17 à 20 et 23 à 25 : conformité parfaite, 25 cases sur 25.** Les vingt
« employé » (col. 18) des données correspondent un à un aux barres du manuscrit ; les
trois « sans emploi » (col. 19 — Damase Veilleux p. 2, Fréchette Louis et Olivier
Belanger p. 4) aussi ; et la colonne 23 porte, écrit en toutes lettres, le « muet »
d'Edouard Veilleux (p. 2 L14) que la remarque tenait de l'index BAC. Aucune marque du
manuscrit n'est absente des données. Le dépouillement de ces colonnes est irréprochable —
le naufrage est propre aux colonnes 21-22.

**Noms : six corrections, une annulation, neuf confirmations.**

- Corrigés (avec `incertain: true` et l'ancienne lecture en remarque) : Onisime →
  **Onésime** (p. 2 L3, l'accent net), Mari Anne → **Marie Anne** (p. 3 L2), Wilfred →
  **Wilfrid** (p. 3 L21, le i pointé), Edmond → **Edmund** (p. 4 L10, le u en creux),
  Stephenie → **Stéphanie** (p. 4 L17), Isac → **Isaï** (p. 4 L20, le i final pointé,
  pas de c).
- **Annulée : « Alain » à la page 3 ligne 4.** Le recueil PDF montre un **r** final du
  même tracé que celui d'« Arthur » à la ligne suivante : le manuscrit écrit bien
  **Alair**, comme le dépouillement. C'est la sixième correction faite sur JPEG que le
  PDF renverse — même leçon que l'affaire Elmire. Le père Vermette de la page 4 ligne 3,
  lui, est bien **Alain** (finale en n distincte).
- Confirmés au recueil : Alphonce (p. 1 L6), Michel (p. 3 L7), Lucie (p. 3 L11),
  Alexis (p. 3 L17 — le tracé porte « Aleais », le x formé comme un a, exactement
  comme le « Caliate » de Calixte p. 2 L5), Alain (p. 4 L3), Marguerite (p. 4 L6),
  Auguste (p. 4 L22), Rosario (p. 4 L23, finale fermée), Aurélie (p. 4 L25). Leurs
  drapeaux `incertain` restent posés pour la relecture d'ensemble de Patrick.
- « Telieria » (p. 1 L15) reste non tranché, mais la lecture est précisée : le tracé
  porte « -eléeria », et l'initiale a la forme du J de « Julien » deux lignes plus
  haut — le J pris pour un F est un piège documenté de ce recenseur. « Pierre Abringe »
  (p. 1 L22) : le PDF ne tranche pas davantage (« Abrigge »/« Abridge »).

**Colonne 4 (logement) : une correction, quatre consignations.** Le code de la
maison 8 se lit **« B 1/8 »** — le 8 à double boucle est net, du même tracé que le
numéro de famille 8 voisin ; le dépouillement portait « B 2/5 » (confusion 5/8
documentée). Les cases des maisons 2, 9 (raturée et récrite en interligne) et 12
(floue sur le microfilm) restent non tranchées, l'état de la lecture est consigné en
`remarque_logement`. Et à la page 2 ligne 6, la **colonne 3 (maisons inhabitées) porte
« B 1/4 »** : une maison vacante attenante à celle des Veilleux, que le dépouillement
n'a pas reprise.

**Signalé sans correction.** Le sexe de Camille Gosselin (p. 1 L13, « M. » au
manuscrit pour une épouse — déjà consigné plus bas, et la main de Patrick a fixé ses
colonnes 21-22 : le manuscrit lui donne raison, barre en 21, tiret en 22). Le prénom de
Damase Veilleux (p. 2 L6) s'écrit au manuscrit avec une seule s — « Damasse » des
données conservé, la ligature ʃ/ʃs ne se laissant pas trancher. « Hanri » (p. 3 L14)
n'est que le e ouvert du recenseur, comparé au « Henri » net de la page 2 L2 : Henri
conservé.

### Lot 2 — pages 5 à 8 (18 août 2026)

**Colonnes 21-22 : 64 écarts sur 100 lignes**, du même tissu qu'au lot 1 : les chefs
de ménage que le dépouillement disait lettrés portent des tirets (Bernier — pourtant
entrepreneur employant 25 personnes —, les fils Clouston, Gauthier, Montminy, les
Letarte, Couture, les Marcheterre, Duquet), et les femmes et aînés que le manuscrit
coche n'avaient rien. Six nouveaux « sait écrire mais ne sait pas lire » tombent,
tous inversés (p. 5 L17, p. 6 L9, L22 et L23, p. 7 L13 et L14).

**Colonnes 17 à 20 et 23 à 25 : conformité parfaite à nouveau — 26 marques, 26
concordances.** Les dix-huit « employé », les six « sans emploi » et, pièce
maîtresse, le **patron Bernier** (p. 5 L13) : « 1 » en colonne 17 et « **25** » en
colonne 20 — les vingt-cinq employés de son entreprise de bois, confirmés au
manuscrit. La colonne 12 des Clouston est elle aussi exacte, jusque dans son
étrangeté : la mère Geneviève porte « 1 » (canadienne-française), ses fils des
tirets.

**Noms et âges : trois corrections, deux annulations, sept confirmations.**

- Corrigés (avec `incertain: true`) : Louise → **Louisa** (p. 5 L6, le a final net),
  Floride → **Florida** (p. 5 L15), et le bébé Evangeline Montminy passe de 9 mois à
  **2 mois** (p. 6 L11) — le chiffre du haut de la fraction est un 2 sans boucle ;
  c'était l'une des trois « fractions douteuses » du chantier.
- **Annulées** : « Roch, 2 ans » (p. 5 L10) — le recueil montre **l'accolade de la
  colonne 8 reliant deux « 4 »** : Joseph et Roch sont jumeaux, tous deux 4 ans,
  comme au dépouillement ; et « Emelie » (p. 6 L8) — le tracé penche pour
  **« Emelin »**, finale plate sans la boucle du e de « Rosalie » deux lignes plus
  bas.
- Confirmés au recueil : Rachelle (p. 5 L20), Marie Sirois (p. 6 L21), Léa (p. 7
  L2), Manda — le nom **et** l'âge 12 (p. 8 L3), l'harmonisation Petaline (p. 8
  L18 et L21, même tracé aux deux lignes), Diana (p. 8 L24). « Philomène » (p. 7
  L18) reste indécis sur les voyelles, mais la finale n'est pas en a. « Augustin »
  (p. 7 L4) et « Victor » (p. 6 L6) se relisent comme la remarque BAC l'avait déjà
  établi. L'âge de Joseph Croteau (p. 6 L16) est bien un 9 à boucle fermée, dans
  l'ordre de la fratrie 10-9-7-4-1.

**Colonne 4 : rien à corriger** — les codes des maisons 16 à 32 sont compatibles,
M20 vérifié en super-zoom (un 4 à sommet ouvert, pas un 9). **Deux nouvelles maisons
vacantes en colonne 3** : « B 1/2 » à la page 7 ligne 4 (chez Marcheterre), et un
« B 1/3 » à la page 6 ligne 6 qui est soit une vacante, soit le code de M22 d'abord
écrit au mauvais endroit (rature familière du recenseur). Consignées en
`remarque_logement`.

### Lot 3 — pages 9 à 12 (18 août 2026)

**Colonnes 21-22 : 87 écarts sur 100 lignes** — le pire score des trois lots, et la
**page 10 en donne la raison** : le dépouillement y coche 19 lignes sur 25, le
manuscrit n'en coche que 5. Les Ferland, Pouliotte, Demers, la pensionnaire Roberge,
la petite Fecteau : tous portent deux tirets. C'est l'inverse exact de ce que le
fichier annonçait. Les pages 9, 11 et 12 sont, elles, largement cochées — la bascule
ne suit aucune logique de page, seulement celle des ménages.

**Colonnes 17 à 20 et 23 à 25 : conformité parfaite, quatrième lot de suite.** Les
vingt-deux « employé », les huit « sans emploi », les **deux sourds-muets Plaisance**
(p. 11 L8 et L9, marques nettes en colonne 23), l'**aliéné Ambroise Gely** (p. 12
L23, marque en colonne 25) et le **patron Louis Gely, cordonnier, avec son « 1 »
employé en colonne 20** : tout est au manuscrit, tout est dans les données.

**Noms et âges : deux corrections, une avancée, cinq confirmations.**

- Corrigés : Clerida → **Clérida** (p. 10 L14, accent aigu et i pointé) — et la
  distinction avec sa cousine **Clarida** (p. 10 L22, avec un a) est bien réelle au
  manuscrit, les deux graphies sont distinctes ; Rébecca → **Rébéca** (p. 12 L12,
  deux accents aigus, une seule c).
- **L'âge de Ferland Narcisse avance sans être tranché** (p. 10 L5) : le premier
  chiffre est une boucle fermée à panse basse, le tracé que ce recenseur donne au
  **5** — comparer le « 55 » de Demers Narcisse sept lignes plus bas — et non le 8 à
  double boucle. « 51 » est donc la lecture la plus probable, ce que la vraisemblance
  appuyait déjà (filles de 24 et 26 ans, épouse de 58). La lecture « 81 » des JPEG
  s'éloigne ; la ligne reste `incertain` pour Patrick.
- Confirmés : **Baily** (p. 9 L8 — et sa colonne 12 porte bien un tiret, accord avec
  le prénom Mary), Anastasie (p. 10 L9), Marguerite (p. 10 L11), et les **deux
  « France »** (p. 11 L11 et L13) : le tracé porte bien « France » aux deux lignes,
  sans e final ni s — François retenu, comme le veut le sexe M.

**Colonne 4 : deux vacantes de plus, un vide confirmé.** « B 1/12 » en colonne 3 à la
page 9 ligne 20 (attenante au pharmacien Martel) et « B 1/3 » à la page 10 ligne 9.
Et la **maison 39 n'a effectivement aucun code** au manuscrit — seul le numéro de
famille est porté, ce que le dépouillement avait déjà noté.

### Lot 4 — pages 13 à 16 (18 août 2026)

**Colonnes 21-22 : 80 écarts sur 100 lignes.** Rien de neuf sur le fond, mais la
page 15 donne le cas d'école du renversement : les six Clavette des lignes 15 à 19
portent au manuscrit une barre en colonne 21 et un tiret en colonne 22 — **ils lisent
sans écrire** —, et le dépouillement leur a donné exactement l'inverse. Six des
« sait écrire mais ne sait pas lire » du chantier partent d'un coup. Il en reste 31,
pages 17 à 41.

**Colonnes 17 à 20 et 23 à 25 : conformité parfaite, cinquième lot de suite.** Les
vingt et une marques « employé » tombent une à une sur les bonnes lignes.

**La colonne 12 est exacte jusque dans ses bizarreries**, et c'est notable après les
quinze faux immigrants des pages 97-142 : Morneau Marie (p. 13 L6) porte bien un tiret
au milieu d'un ménage tout en « 1 » ; et chez les Ahern (p. 13 L20 à p. 14 L3), le père
irlandais a un tiret avec « Irlande » aux colonnes 13 et 14, la mère Adeline un « 1 »
avec « Q. » — et les sept enfants suivent le père. Le dépouillement a tout rendu
correctement.

**Noms : trois corrections, une avancée, trois confirmations.**

- **« P Edmond » → « J Edmond »** (p. 13 L4) : c'est encore la majuscule J à boucle
  descendante de ce recenseur, le piège documenté — prise ici pour un P. Sans doute
  Joseph Edmond.
- **« Fredeline » → « Frédéline »** (p. 13 L10) : les deux accents aigus sont nets.
- **« Élisée » → « Étienne »** (p. 14 L4) : le PDF montre un i pointé et la barre
  d'abréviation sur la finale. **L'index BAC lisait « Etienne » depuis le début** ; les
  deux sources concordent enfin.
- **« Cesarie » (p. 14 L12) : la correction JPEG est fragilisée.** L'initiale n'a pas
  la forme du C de « Cezarie » (p. 14 L25, autre ménage) : c'est une grande boucle à
  descendante, plutôt un S — « Sésarie » possible. Les deux femmes ne sont pas écrites
  de la même façon, contrairement à ce qu'on avait supposé. Non tranché.
- Confirmés : Sofranie (p. 13 L15), Marie Luce (p. 14 L5), Cordule (p. 15 L3). Et la
  **fraction de la page 15 ligne 22 est nette : 9/12** — deuxième des trois fractions
  douteuses réglée, il ne reste que la page 4 ligne 23.

### La colonne 4 a un défaut systématique — cinq codes corrigés, une passe à prévoir

Le numérateur du code de logement (le nombre d'**étages**) est écrit en petit au-dessus
de la barre. **Le « 1 » est une hampe droite à empattement, le « 2 » une boucle en z** —
et à l'échelle des bandes ordinaires les deux se confondent. Relus à l'échelle 30, le
numéro de famille voisin servant d'étalon, **quatre codes de ce lot portent un 1 là où
le dépouillement a lu 2** :

| Maison | Dépouillement | Manuscrit | Ce qui tranche |
|---|---|---|---|
| **50** | B 2/4 | **B 2/9** | le dénominateur est une boucle fermée à hampe descendante — un 9, non le 4 anguleux à sommet ouvert de la maison 55 |
| 52 | B 2/8 | **B 1/8** | numérateur : hampe droite |
| 55 | B 2/4 | **B 1/4** | numérateur : hampe droite ; dénominateur : le 4 anguleux |
| **61** | B 2/2 | **B 1/2** | le numérateur a exactement la forme du 1 de « 61 » inscrit à côté — le cas le plus net |
| 62 | B 2/15 | **B 1/15** | numérateur : hampe droite |

Les cinq sont appliqués avec `incertain: true`. **Mais le vrai enseignement dépasse ce
lot** : si quatre codes sur dix-sept se trompent d'étage, la colonne 4 n'a jamais été
relue sérieusement — ni ici, ni sur les 126 autres pages. Les lots 1 à 3 la disaient
« compatible », ce qui était vrai à l'échelle où elle avait été regardée, et
insuffisant. **Il faut une passe dédiée à la colonne 4 sur toute la division**, au fort
grossissement et avec l'étalon du numéro de famille voisin ; c'est le pendant, pour le
logement, de ce qu'a été la passe des colonnes 21-22 pour l'alphabétisation.

### Lot 5 — pages 17 à 20 (18 août 2026)

**Colonnes 21-22 : 72 écarts sur 100 lignes**, et quatre « sait écrire mais ne sait pas
lire » de plus qui tombent — il en reste 27, pages 21 à 41.

**Une omission du dépouillement, la première du chantier.** Page 19 ligne 22,
**Robitaille Joseph, 71 ans, beau-père, est « Journalier » au manuscrit** : la colonne 16
porte le mot en toutes lettres et la colonne 18 la marque « employé ». Le dépouillement
avait laissé les deux cases vides. C'est la première fois, en vingt pages, que le PDF
révèle non pas une lecture fautive mais une donnée absente — et elle change le portrait
du ménage : un homme de 71 ans encore au travail.

**Deux âges, deux verdicts opposés.** Les deux corrections d'âge faites sur JPEG dans ces
pages se départagent :

| Page·ligne | Dépouillement | Correction JPEG | Manuscrit (PDF) | Verdict |
|---|---|---|---|---|
| 17 L24 | Letarte Paul, 29 ans | 27 ans ? | **27** — le 7 est net | correction **confirmée** |
| 19 L18 | Roberge Louis, 25 ans | 23 ans ? | **25** — le 5 porte sa barre supérieure | correction **annulée** |

La correction de la page 19 avait été proposée parce qu'un chef de 25 ans avec une épouse
de 34 semblait douteux ; le manuscrit maintient l'écart, qui est donc réel. **Le raisonnement
de vraisemblance s'est trompé là où le tracé décidait** — c'est le même piège que
l'affaire Elmire.

**Noms : une correction reprise, deux corrections JPEG fragilisées.**

- **« Rosalie » → « Rosina »** (p. 17 L2) : le PDF ne montre aucune haste montante là où
  « Rosalie » exigerait un l, mais un i pointé et une finale en -na.
- **« Nathalie » (p. 18 L13) est douteuse** : l'initiale a trois jambages — la forme du M
  de ce recenseur, non celle du N. « Mathalie », comme au dépouillement, voire
  « Mathilde ». Non tranché.
- **« Wilfrid » (p. 19 L9) : la finale se lit « -ried »**, l'initiale reste ambiguë entre
  S et W. « Wilfried » serait plus proche du tracé. Non tranché.

**Quatre confirmations qui closent des points en suspens** : le « Savard » de la page 20
ligne 3 est bien au manuscrit à la place du prénom — c'est le patronyme, pas une faute de
dépouillement ; la **fraction 7/12** de la page 20 ligne 5 est nette ; « Jos. Edouard »
(p. 20 L18) porte bien l'abréviation de Joseph, et « **Ont.** » en colonne 11 — la seule
naissance hors Québec du lot, exacte ; et « Damase » (p. 17 L16) est bien écrit au-dessus
d'un « Ferdinand » rayé.

**Colonnes 17 à 20 : les effectifs de patrons se vérifient à l'œil** — le « 5 » de
Villeneuve l'architecte (p. 17 L5), le « 2 » de Lambert le meublier (p. 20 L16), les « 1 »
de Nolette et de Gingras. Tous conformes.

### Lot 6 — pages 21 à 24 (18 août 2026)

**Colonnes 21-22 : 75 écarts sur 100 lignes**, et six « sait écrire mais ne sait pas
lire » de plus qui tombent — cinq sur la seule page 24. Il en reste 21, pages 25 à 41.

**Le patronyme « Dinan » n'existe pas : c'est « Sample ».** La maison 100 abritait, au
dépouillement, un ménage « Dinan » ; les images JPEG avaient fait renoncer, le tracé se
lisant « Daugh » ou « Dangh ». **Le recueil PDF le donne sans discussion : S initial, m
et p médians, finale en -le — Sample.** C'est aussi ce que porte l'index BAC. Les deux
sources concordent, et le patronyme cesse d'être une énigme : le ménage est anglo-irlandais
(l'épouse est née en Irlande, le père du chef en Angleterre). Les trois lignes du ménage
sont corrigées et le chef de famille resynchronisé.

**« Leo Michal » n'était pas deux prénoms.** Page 21 ligne 1, l'enfant Chamberland de
5 ans porte **« Léodrick »** — un seul mot d'un trait continu, i pointé, finale en -ick.
L'hypothèse « Leo Michel »/« Leodrick » du chantier précédent se tranche du bon côté.

**Une annulation, et elle instruit sur la méthode.** « Margueret » (p. 24 L12) avait été
corrigé en « Margaret » sur les images JPEG, au motif que le ménage est irlandais. Le PDF
montre le u après « Marg » et la finale en -et : **le recenseur, francophone, a bien écrit
« Margueret »**. La forme anglaise est sans doute celle que cette femme portait dans sa
vie — mais ce n'est pas ce que dit le manuscrit, et c'est le manuscrit que ce fichier
transcrit. Correction annulée.

**Un âge douteux qui se révèle juste.** Page 21 ligne 3, le « 19 » de Napoléon St Hilaire
était noté « se lit plutôt 13 ». Comparé au 9 certain de la ligne 6 et au 3 certain de la
ligne 9, **le second chiffre a bien la boucle fermée et la descendante du 9** ; et un
journalier pensionnaire de 19 ans est plus cohérent qu'un de 13. Le doute est levé, la
donnée était bonne.

**Cinq confirmations** : Celina (p. 21 L15), Fabien (p. 22 L11), Olive (p. 23 L11),
Delvina (p. 23 L24), Odina (p. 24 L19). **Colonnes 17 à 20 conformes** une septième fois,
dont le « 5 » de Robitaille Michel le charron (p. 23 L21).

### Lot 7 — pages 25 à 28 (18 août 2026)

**Colonnes 21-22 : 63 écarts sur 100 lignes**, et sept « sait écrire mais ne sait pas
lire » qui tombent. Il en reste 14, pages 29 à 41.

**Les sœurs Morneau : le dépouillement est fidèle.** Page 28, Ema et Elzia portent
toutes deux « 13 » au manuscrit, les chiffres nets sur les deux lignes — c'était l'une
des questions d'ensemble laissées à Patrick. **La transcription n'est pas en cause** :
reste à savoir si le recenseur a inscrit deux fois le même âge par inadvertance ou si
ce sont des jumelles, et cela ne se décidera pas sur l'image. La cadette s'écrit
**« Elzia »** et non « Elzie » — i pointé, a rond.

**Une annulation de plus, et toujours la même leçon.** « Minie Ida » (p. 27 L22) avait
été corrigé en « Minnie Ida » sur JPEG. **Le PDF ne porte qu'un seul n**, les deux i
nettement pointés. Comme pour « Margueret » au lot précédent, la forme anglaise est
sans doute celle que cette femme portait — mais ce n'est pas ce que le recenseur a
écrit. Correction annulée. **C'est la troisième fois qu'une graphie « corrigée » vers
la forme attendue d'un nom se révèle contraire au manuscrit** : le réflexe de
normaliser est le piège le plus régulier de ce chantier.

**Le prénom de la page 26 ligne 13 se resserre sans se trancher.** « Losie », « Rosie »
ou « Lucie » : **le tracé ne comporte aucun c, donc « Lucie » tombe** ; la finale est
en -ia et non -ie ; et l'initiale n'a pas la forme du F de « Fabiola » inscrit juste
au-dessus. Reste « Losia » ou « Rosia ». Trois hypothèses réduites à deux, la bonne
graphie de la finale acquise.

**Les prénoms anglais de la page 27, précisés.** Chez les Peters, « Berrel » (L19) a
une deuxième lettre à panse ronde — un u plutôt qu'un e : **« Burel » ou « Burrel »**,
patronyme anglais employé comme prénom. « Aber » (L20) est net et court, **sans le l
qu'exigerait Albert**. « Ethel » (L18) reste un tracé très ramassé, compatible avec
une abréviation sans la montrer. Les trois gardent leur drapeau.

**Deux confirmations** : Eugenie (p. 28 L18), forme féminine acquise, et Achille
(p. 25 L14). **Colonnes 17 à 20 conformes** une huitième fois, dont le « 2 » de Côté
le patron (p. 27 L10).

### Lot 8 — pages 29 à 32 (18 août 2026)

**Colonnes 21-22 : 71 écarts sur 100 lignes**, six « sait écrire mais ne sait pas lire »
de plus. Il en reste 8, pages 33 à 41.

**« Telesphore ou Stephen » : c'est Stephen.** Page 32 ligne 1, le doute traînait depuis
le premier chantier, la fratrie francophone — Amarilda, Joséphine, Octave, Graziela —
plaidant pour Télesphore contre un tracé qui ne le confirmait pas. **Le recueil PDF
tranche contre la vraisemblance** : le mot compte sept lettres quand « Telesphore » en
demande dix, l'initiale est un S ample, la finale se lit « -phen ». Un Stephen parmi ces
prénoms-là n'a rien d'impossible — la forme anglaise d'Étienne se rencontre dans les
familles canadiennes-françaises de la région. **Quatrième fois que le raisonnement de
vraisemblance perd contre le tracé.**

**Une annulation, toujours la même mécanique.** « Delard » (p. 29 L2) avait été corrigé
en « Adelard » sur JPEG. Le PDF montre une majuscule D nette, **sans A qui la précède**.
Adélard est très probablement le prénom réel de cet enfant de 3 ans ; ce n'est pas ce que
porte le manuscrit.

**Une correction JPEG qui ne tient pas.** « Ameline » (p. 31 L18) — prénom féminin pour un
mesureur de 45 ans, chef de famille — avait été corrigé en « Anselme ». **Le PDF montre que
l'initiale est un N à trois jambages, non un A** : « Anselme » tombe. Le tracé se lit
« Nazael », « Nazaire » abrégé ou « Noel », la finale portant une barre d'abréviation.
Non tranché — mais le champ des lectures a changé de camp.

**« Exida » ou « Elida » : c'est Exida.** La deuxième lettre est un x compact, sans la
haste montante qu'exigerait un l — la comparaison est immédiate avec le l de « Delard »
deux colonnes plus haut sur la même page. L'hypothèse Elida est écartée.

**Une correction du recenseur, bien suivie.** Page 32 ligne 9, l'âge de Lizie Wells :
le recenseur avait écrit **15**, l'a biffé et a inscrit **17** au-dessus. Le dépouillement
a suivi la correction, pas le chiffre biffé — précision d'autant plus notable que la
division 1 a par ailleurs plusieurs fois suivi des numéros raturés.

**Confirmations** : Mary Jane (p. 30 L6) ; et pour Léocadie (p. 32 L8), le **o est
confirmé** — « Leacadi » du dépouillement était bien fautif — mais le manuscrit s'arrête
sur un i pointé, sans e final. **Colonnes 17 à 20 conformes** une neuvième fois, dont le
« 7 » de Demers (p. 31 L12) et le « 1 » de Wells le cultivateur anglais (p. 32 L7).

### Lot 9 — pages 33 à 36 (18 août 2026)

**Ce lot a commencé par une erreur d'alignement, et c'est sa trouvaille principale.**

**Les cadres 35 et 36 du recueil sont intervertis sur le microfilm.** La page 36 de mes
premiers rendus ne correspondait à rien : elle montrait le ménage Auger et se terminait sur
Sénéchale Joseph, quand les données de la page 36 s'ouvrent sur Sénéchale Clara. La
comparaison du contenu sur six cadres consécutifs (34 à 39) l'a établi sans ambiguïté :
**le cadre 35 porte la page 36, le cadre 36 porte la page 35.** Les numéros de famille
manuscrits le confirment — la page 35 se termine sur la famille 149, dont la page 36
poursuit le ménage.

C'est **exactement le défaut des cadres 89 et 90** du recueil des pages 84-142, déjà
documenté. Deux recueils sur quatre portent un échange de cadres : ce n'est plus un
accident isolé mais un trait du microfilm, et **la première chose à faire devant un
nouveau recueil est de confronter le contenu du premier cadre de chaque page aux
données**, pas seulement le cadre de tête. L'échange est codé dans `r91a.py`
(`echanges={35: 36, 36: 35}`) et les pages 35 et 36 ont été relues après correction.

**Colonnes 21-22 : 50 écarts sur 100 lignes** — le taux le plus bas des neuf lots. Deux
« sait écrire mais ne sait pas lire » de plus tombent ; il en reste 6, pages 37 à 41.

**La dernière fraction douteuse est réglée.** Page 33 ligne 3, l'âge d'Oscar Dagenais : le
numérateur a le trait supérieur horizontal et la diagonale descendante du 7 de ce
recenseur. **7/12 tient.** Des trois fractions que le chantier avait laissées en suspens,
les trois sont maintenant lues — une corrigée (p. 6, 2/12 et non 9/12), deux confirmées
(p. 15 et p. 33).

**« Rose de Lima » s'écrit « Rose Delima ».** Page 34 ligne 7, le manuscrit porte Delima
d'un seul trait, sans coupure : c'est la graphie usuelle du prénom au Québec, et le
dépouillement l'avait scindée en trois mots.

**Une seconde ligne biffée.** Page 36 ligne 23 — Terrien Joseph, 9 ans : un long trait
horizontal barre la ligne entière, le prénom biffé par-dessus. **La question n° 3 ne
portait que sur une ligne ; elle en concerne deux**, et celle-ci vient la première dans
l'ordre du recensement. Voir la question n° 3, corrigée.

**Confirmations** : François (p. 33 L4), Cordelia (p. 36 L3), et la lecture des colonnes
11-13-14 de Sarah Roberge (p. 36 L14) — « England » et « Ireland » sont bien aux colonnes
des parents, la colonne 11 portant le signe de répétition. Le dépouillement avait vu juste,
là où quinze lignes des pages 97-142 s'étaient trompées sur le même piège.

## Question n° 1 — les colonnes 21 et 22 : la passe est terminée

**Pages 42 à 142 : 2523 lignes relues case par case, 152 corrigées.** Ne restaient que les
pages 1 à 41, sans recueil PDF à l'époque — leur recueil est depuis arrivé et la reprise
est en cours (voir « Le recueil des pages 1 à 41 » plus haut).

Ce document affirmait que le fichier était lacunaire : 1927 personnes sur 3548 — 54 % —
n'ont aucun champ `sait_lire` / `sait_ecrire`, « alors que les images montrent des coches
sur la plupart des lignes ». C'était vrai à moitié, et le partage se fait à la page 84.

Les recueils PDF portent les colonnes 17 à 25 sur la même prise que les noms, et
**répètent les numéros de ligne dans la marge droite** : chaque case se lit sans
ambiguïté, portant soit un « 1 », soit un tiret tracé à la main.

**Aux pages 42 à 83, une absence de valeur dans le fichier correspond à un tiret dans le
manuscrit** : le dépouillement avait bien tout lu, et les personnes sans valeur ne savaient
ni lire ni écrire — ce qui, pour une paroisse ouvrière de 1891 dont 554 habitants ont moins
de cinq ans, n'a rien d'invraisemblable.

**À partir de la page 84, ce n'est plus vrai.** Le dépouillement y devient inégal, et par
endroits il n'a rien enregistré du tout : la page 84 porte 0 valeur sur 25, la page 85 en
porte 3, alors que le manuscrit y coche respectivement 14 et 21 lignes. **Trente et une des
102 corrections de ce lot viennent de ces deux pages seules.** La couverture remonte
ensuite — 11 à 20 valeurs par page jusqu'à la 114, puis 25 sur 25 des pages 115 à 125 —
sans jamais redevenir aussi sûre qu'au début du recueil. **Devant une case vide des pages
84 à 142, il faut donc ouvrir l'image ; devant une case vide des pages 42 à 83, non.**

Ce que le dépouillement rate est toujours l'une de ces trois choses :

- une **coche déplacée d'une ligne** — la page 45 en donne le cas le plus net, sur sept
  lignes d'affilée ; la page 116 en donne un second, sur cinq lignes (voir plus bas) ;
- une **coche perdue**, le plus souvent celle de la colonne 22, qui fait basculer une
  personne de « lit et écrit » à « lit seulement » ;
- une **coche ajoutée** là où le manuscrit porte deux tirets.

**Le taux d'erreur baisse en descendant dans le recueil** : 8 % aux pages 42-65, 5,3 % aux
pages 66-142 — et seulement 3,8 % si l'on met de côté les pages 84-85, franchement
lacunaires. **Quarante-cinq des 77 pages du dernier lot se sont révélées exactes de bout en
bout**, et les 102 corrections se concentrent sur les 32 autres. La moitié aval du
recensement est la mieux tenue : les pages 126 à 135, puis 137, 139, 141 et 142, n'ont pas
demandé une seule retouche.

**La méthode.** Une seule image par page suffit : `python3 cols91.py 46` rend les colonnes
19 à 25 et la marge droite en une image de 900 × 1650 pixels, où chaque « 1 » est net. La
lecture s'écrit en deux chaînes de 25 caractères par page, que `cols2122.mjs` confronte au
fichier et applique — seules les lignes divergentes sont touchées. L'alignement se contrôle
par deux ancres indépendantes : les numéros de la marge droite, et la colonne 16
(profession), qui doit correspondre au dépouillement ligne à ligne.

**Le piège de la page 116, à retenir.** Une tache du microfilm y masque les numéros 1 à 6
de la marge droite. Privé de son ancre, l'œil compte les lignes depuis le filet du haut et
se décale d'un cran — j'ai d'abord lu la page entière une ligne trop haut. **Le recours
sûr est la colonne des âges** (`strip(ms, l0, l1, 0.20, 0.42)`), qui se lit sur la même
géométrie verticale que la bande des coches et se confronte au dépouillement ligne à
ligne. Cette vérification faite, la page 116 s'est révélée porter un vrai décalage du
dépouillement, de la ligne 2 à la ligne 6.

### Les « sait écrire mais ne sait pas lire »

Ils étaient 59, ils sont **56**. Cinq seulement tombaient dans les pages couvertes par un
recueil PDF ; les 54 autres sont aux pages 1 à 41. Les cinq ont été vérifiés au manuscrit :

| Page·ligne | Personne | Verdict |
|---|---|---|
| 49 L16 | Turgeon Alvina, 29 | les deux colonnes portent un « 1 » — **corrigé** |
| 98 L6 | Blouin Marie, 47 | les deux colonnes portent un « 1 » — **corrigé** |
| 106 L5 | Côté Ernest, 18, chauffeur | les deux colonnes portent un tiret — **corrigé** |
| 93 L2 | Gagnon Louis, 36, calfat | colonne 22 seule : **le recenseur l'a bien écrit ainsi** |
| 120 L9 | Terrien Leon, 9 | colonne 22 seule : **idem** |

Trois sur cinq étaient des fautes de dépouillement, deux sont des bizarreries du
recenseur. **La passe complète confirme les deux bizarreries** : les colonnes 21-22 de
Gagnon Louis (p. 93) et de Terrien Leon (p. 120) portent bien un tiret puis un « 1 », et
ce sont les deux seules de ce genre dans les 101 pages relues. À ce compte, la
cinquantaine de cas des pages 1 à 41 méritait d'être reprise sur PDF. **La reprise a
commencé : sur les pages 1 à 36, les quarante-huit cas sont tous tombés** — quarante-trois
inversions (« lit mais n'écrit pas ») et cinq doubles tirets. Restent 6 cas,
pages 37 à 41.

## Laissé en l'état, faute de lecture — à reprendre au manuscrit

Ces cinq lignes portent `incertain: true` et une remarque expliquant pourquoi rien
n'a été appliqué.

- **Page 1 ligne 15** : « Telieria » conservé — le recueil PDF précise le tracé,
  « -eléeria », mais l'initiale ne se laisse toujours pas trancher : elle a la forme du
  J de « Julien » deux lignes plus haut, sans exclure F ou T.
- **Page 1 ligne 22** : « Pierre Abringe » conservé — le second élément se lit
  « Abrigge » ou « Abridge ».
- **Page 1 ligne 13** : la colonne 7 de Camille Gosselin ressemble à « M. » alors que
  la colonne 10 porte « E. » (épouse). Anomalie du manuscrit ; sexe F conservé.
- **Page 10 ligne 5** : Ferland Narcisse conservé à **51 ans**. Le recueil PDF fait
  pencher nettement vers 51 — la boucle du premier chiffre est celle des 5 de ce
  recenseur, pas celle d'un 8 (voir le lot 3). **Non tranché, mais 51 l'emporte.**
- **Page 13 ligne 17** : prénom laissé vide — **et il le restera** : le recueil PDF
  montre que la case est détruite par une tache d'émulsion du microfilm. Voir la
  question n° 2, close.
- **Page 20 ligne 3** : prénom « Savard » — c'est un patronyme, vraisemblablement le
  nom de jeune fille de l'épouse porté à la place du prénom. **Confirmé au recueil PDF :
  le manuscrit porte bien ce mot dans la case du prénom.**
- **Page 20 ligne 5** : fraction **7/12 confirmée au recueil PDF**. **Page 21 ligne 3** :
  le « 19 » est **confirmé au recueil PDF** — le doute est levé.
- ~~**Page 21 ligne 1**~~ : **tranché au recueil PDF — « Léodrick », un seul mot.**
- ~~**Page 24 ligne 11**~~ : **tranché au recueil PDF — le patronyme est « Sample »,**
  ce que lisait aussi l'index BAC. Ménage anglo-irlandais.
- **Page 26 ligne 13** : « Losie » ou « Rosie » — **« Lucie » écarté au recueil PDF**
  (aucun c dans le tracé), et la finale est en -ia. L'initiale L ou R reste indécise.
- **Page 27 lignes 19 et 20** : « Berrel » et « Aber », famille anglophone. **Précisé au
  recueil PDF** : la deuxième lettre de « Berrel » est un u — « Burel »/« Burrel » ;
  « Aber » est net et court, sans le l d'« Albert ».
- ~~**Page 29 ligne 12**~~ : **tranché au recueil PDF — « Exida »**, la deuxième lettre
  est un x compact, sans la haste d'un l.
- **Page 28 lignes 12 et 13** : deux sœurs Morneau portées toutes deux à 13 ans au
  manuscrit — **confirmé au recueil PDF, les chiffres sont nets sur les deux lignes.**
  Le dépouillement est fidèle ; jumelles ou erreur du recenseur, cela ne se décidera
  pas sur l'image.
- ~~**Page 32 ligne 1**~~ : **tranché au recueil PDF — « Stephen »**, mot de sept lettres
  à initiale S et finale « -phen ». La vraisemblance de la fratrie francophone perd
  contre le tracé.
- **Page 37 ligne 2** : Terrien « Leonard », fille d'un an — forme masculine, sans
  doute Léonie ou Léonarde.
- **Page 38 ligne 1** : Gagné « Reme Celestin » — René ou Reine ?
- **Page 37 ligne 18** : Daigle J. Baptiste, 57 ans dans les données, plutôt 52 au
  manuscrit.
- ~~**Page 33 ligne 3**~~ : **tranché au recueil PDF — 7/12**, le numérateur a le trait
  horizontal et la diagonale du 7. Dernière des trois fractions douteuses, toutes lues.
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
- **Page 62 lignes 18-21** — *réglé sur le PDF.* Les quatre enfants Wilson portaient
  « Irlande » comme lieu de naissance de la mère. Le PDF montre la mécanique : à la
  ligne 17, leur mère Mary Jane porte « Irelande » en colonne 13 (son père) et le
  signe « 2 » (= Québec) en colonne 14 (sa mère) ; à la ligne 18, Thomas porte « 2 »
  en colonne 13 et un guillemet en colonne 14, qui répète le « 2 » de la ligne 17 —
  pas le « Irelande » de la ligne 16. Le dépouillement avait rattaché le guillemet à
  la mauvaise cellule. **Corrigé : mère née au Québec pour les quatre.**
- **Page 78 ligne 14** : Roussel Joseph, 49 ans au fichier — le tracé se lit aussi
  bien 45. Épouse de 44 ans, aîné de 20 : rien ne tranche.
- **Page 63 ligne 23** : « Permitte » conservé — le tracé du patronyme reste un
  gribouillis même au PDF ; les 11 Permitte du fichier sont ce clan (familles 278,
  282, 296).
- **Page 66 ligne 17** : le manuscrit porte une abréviation en exposant devant
  « Marie » (« Fᵈ » ?) — signalé en remarque, valeur inchangée.
- **Page 70 ligne 19** : Conroy Sarah, « veuve » au fichier, mais la colonne 9 du
  manuscrit porte un tiret — le « V » ne vient pas du manuscrit. Signalé, conservé.
- **Page 73 ligne 11** : St-Hilaire « Ulzer » — le tracé se lit aussi « Ulger ».
- **Page 75 lignes 24-25** : Marie et Cézarie Robin, toutes deux 7 ans au manuscrit —
  troisième paire de sœurs au même âge, après Morneau (p. 28) et Demers (p. 53).
- **Pages 92 et suivantes** : le patronyme « Hyener » (14 lignes) et « Hyence » (6)
  désignent vraisemblablement la même souche ; le tracé ne permet pas de les
  fondre. À trancher globalement plutôt que page par page.
- **Page 91 ligne 7** : la ligne de Philomène Gagné porte un prénom masculin rayé
  puis réécrit par le recenseur. La lecture retenue est la corrigée.
- **Page 96 ligne 6** : le numérateur de la fraction de Lucien Duperré n'est pas
  certain — la barre de fraction, elle, l'est. Émile (1 an) et Lucien (8 mois)
  ne peuvent être frères de sang : l'un des deux âges est fautif, ou l'un des
  enfants est adopté.
- **Page 96 ligne 11** : Beaulieu Joseph, 85 ans, journalier, marié à une femme de
  58 ans. L'âge se lit 85 au manuscrit ; « 55 » n'est pas exclu.
- **Page 95 ligne 14** : la colonne 15 porte « Anglican » pour la famille Brown,
  là où les données notent « Protestante ». Signalé, non modifié : c'est une
  question de vocabulaire du fichier, pas de lecture. **Les pages 99 et 101 donnent
  deux autres formes** — « Episcopalien » pour les Atkinson, « C.E. » (Church of
  England ?) pour les French — toutes trois réduites à « Protestante » dans le
  fichier. À trancher globalement, comme Hyener/Hyence.
- **Page 97 lignes 4 et 5** : la colonne 10 des deux Wilson porte un mot souligné
  d'un trait épais, illisible même au PDF (« Veuve » ?), là où les autres lignes
  portent « fl. » ou un tiret. Liens conservés (chef, fille).
- **Page 97 lignes 17-24** : le patronyme est tracé avec une initiale à deux
  jambages — **« Wermette »**, conforme aux données. Mais ces 8 lignes sont les
  seules « Wermette » de la division, contre 21 « Vermette » ailleurs : même souche
  selon toute vraisemblance. À fondre ou non d'un coup, comme Hyener/Hyence.
- **Page 97 ligne 3** : Roberge « Lelly », 4 ans — « Lilly » n'est pas exclu.
- **Page 98 ligne 14** : Leclerc Philippe, 59 ans — le second chiffre est réécrit
  par-dessus un premier jet ; 59 conservé.
- **Page 100 ligne 16** : Vallière Roméo, 6 ans au fichier ; le tracé se lit aussi
  bien 5.
- **Page 100 ligne 23** : Martineau « Mariene », 6 ans — le tracé donne plutôt
  « Mariane », qui n'existe nulle part ailleurs dans la division. Non tranché.
- **Page 101 ligne 24** · **page 102 ligne 24** : Moreau « Oriena » (2 ans) et Moreau
  « Aler » (3 ans) — deux prénoms uniques dans la division, dont le tracé ne
  confirme ni n'infirme la lecture du dépouillement.
- **Page 106 ligne 1** : Hardy Demerise, 22 ans, épouse d'Eusèbe, lui-même chef de la
  maison 468 — mais la colonne 10 porte **« bru »**. Le recenseur semble avoir continué
  de rapporter les liens au patriarche de la maison voisine. « Épouse » conservé.
- **Page 106 ligne 22** · **page 107 ligne 8** : Honorine (3 ans) et « Lord » (9 ans) —
  dans les deux cas les colonnes 7 et 10 concordent contre le prénom, qui reste tel quel :
  le premier est un garçon, la seconde une fille.
- **Page 105 ligne 22** : Barbeau Aimée, 2 ans — la colonne 7 porte « M. » mais la
  colonne 10 porte « p. fl. » (petite-fille). Sexe F conservé : ici c'est la colonne 7 qui
  est isolée.
- **Page 110 lignes 19 à 21** : les âges des trois Dawson sont **repris et biffés** dans
  le manuscrit. Le fichier lit 30, 26 et 28 ; la dernière ligne porte nettement 30. Rien
  n'a été touché — trois âges à reprendre ensemble.
- **Page 110 ligne 13** · **pages 108-109** · **page 116** : la division porte
  **Frechette** (9), **Frichette** (4) et **Fréchette** (4). Le tracé ne permet pas de
  fondre les trois formes. À trancher globalement, comme Hyener/Hyence.
- **Page 111 ligne 25** : la servante Daggs n'a **aucun prénom** dans les données, et le
  manuscrit n'en porte pas davantage — c'est un blanc du recenseur, non du dépouilleur.
  Second trou de ce genre après le fils Lefebvre de la page 13.
- **Page 112 lignes 1 et 2** : la maison 496 est la plus étrange rencontrée. Frances Moore,
  45 ans, veuve, née en Ontario de parents français, protestante, est chef — et pourtant sa
  **colonne 10 porte le même mot** (« dom. » ?) que celles de la servante Daggs et des deux
  Moore qui la suivent, Parlet (17 ans) et Agnie (12 ans, cuisinière). Impossible de dire
  si ces deux dernières sont ses filles ou ses domestiques : les liens sont **conservés**
  tels quels. Ce qui est lisible, en revanche, a été appliqué — leur religion est « C.R. »
  et non protestante, et **Agnie est née en « Chine »**, écrit en toutes lettres là où sa
  voisine porte « Engleterre ». C'est la seule mention de ce genre dans les trois
  recensements : elle mérite vérification avant d'être versée telle quelle.
- **Page 112 ligne 6** : la colonne 15 porte « Presbytérien » pour les Walker, réduite à
  « Protestante » dans le fichier — quatrième forme après Anglican, Episcopalien et C.E.
  Les pages 126 à 137 en portent d'autres, celles-là bien enregistrées : Anglican pour
  les Grove, Presbytérien pour les Anderson, « Église du Christ » pour les Smith.
- **Page 117 ligne 19 · page 118 ligne 1** : la même famille est écrite **Binet** au bas
  d'une page et **Binette** en haut de l'autre — par le recenseur lui-même, qui réécrit
  le patronyme à chaque nouvelle page. Le fichier suit le manuscrit ; rien n'a été
  harmonisé.
- **Trois familles portent un patronyme voisin d'un patronyme fréquent**, sans que le
  tracé permette de les fondre : **Cadorette** (p. 118) et **Cadarette** (p. 120) contre
  28 Cadoret ; **Guillette** (p. 92, 125) contre 11 Guillotte ; **McNaugton** (p. 131)
  contre 6 McNaughton (p. 72). À trancher globalement, comme Hyener/Hyence.
- **Le fichier porte deux graphies pour un même chef de famille** — le champ `chef`
  normalise là où la ligne du membre garde la forme brute : Achille/Archille (p. 121),
  Marguerite/Margurit (p. 124, 129), Antoine/Anthoine (p. 130), Germain/German (p. 130),
  Marcelline/Marcelin (p. 131), Onésime/Onesine (p. 134), Rosalie/Rosalia (p. 135),
  Éléonore/Eleonard (p. 139). **Vérification faite au manuscrit : c'est la forme brute
  qui est écrite.** Quatorze cas, tous listés par `diag91.mjs` ; rien n'a été touché,
  c'est une question d'harmonisation du fichier, pas de lecture.
- **Page 128 ligne 15** : Boucher « Colonir », 17 ans — le tracé donne « Colomir » ;
  Célanire, employé page 102, est possible sans être établi.
- **Page 131 lignes 19 et 21** : la mère et la fille Cantin portent le même prénom au
  manuscrit, que le dépouillement écrit **Fredebina** puis **Fredelina**. Le tracé donne
  plutôt « Fridelina » aux deux lignes. Non tranché.
- **Page 133 ligne 13** : Cantin « Modosse », 36 ans — Modeste est probable (le
  dépouillement avait déjà écrit « MacLerte » pour Modeste page 77), mais le tracé ne le
  confirme pas.
- **Page 135 ligne 4** · **page 140 lignes 4 et 5** · **page 139 ligne 1** : Cantin
  « Aurare », Saintonge « Lace », Martel « Rigiete » et Roberge « Demogne » — quatre
  prénoms uniques dans la division, dont le tracé ne donne pas mieux.
- **Page 132 ligne 8** : Roberge Marguerite, **95 ans**, mère du chef de maison — l'âge
  le plus élevé de la division. Confirmé au manuscrit.
- **Cinq paires de frères ou sœurs au même âge** ont maintenant été relevées : Morneau
  (p. 28), Demers (p. 53), Robin (p. 75), Nolin (p. 119, deux garçons de 11 ans) et Côté
  (p. 129, deux garçons de 3 ans). À ce compte, ce n'est plus une erreur isolée du
  recenseur : soit les jumeaux étaient nombreux, soit il inscrivait le même âge par
  inadvertance en descendant la colonne.

**Les trois fractions de mois douteuses sont tranchées au recueil PDF** : la page 6
ligne 11 se lit 2/12 et non 9/12 (lot 2), la page 15 ligne 22 confirme son 9/12 (lot 4),
et la page 33 ligne 3 son 7/12 (lot 9).

## Question n° 2 — un prénom manquant : **close, et ce n'est pas une faute de lecture**

**Page 13, ligne 17** : le fils Lefebvre, 16 ans, étudiant, n'a **aucun prénom** dans
les données. On a longtemps cru à un déchiffrement manqué (« Léo » ? « Cléo » ?).

**Le recueil PDF donne la réponse, et elle est matérielle : le prénom est détruit sur
le microfilm.** Une tache d'émulsion blanche et saturée couvre exactement la case ;
sous elle, l'encre a disparu. Ne survivent qu'un fragment de hampe au tiers du mot et
le trait terminal — de quoi mesurer la longueur du prénom, pas de le lire. Ni le rendu
à l'échelle 30 ni l'étirement des seuls tons sombres (qui fait ressortir l'encre sous
un voile) ne rendent quoi que ce soit de plus : **il n'y a rien à récupérer, le défaut
est sur le film et non sur les images.**

Le dépouillement n'a donc rien omis : il a buté sur le même trou. **Il faudra une autre
source** — registres paroissiaux de Saint-Romuald, ou l'index BAC, qui porte le
patronyme sous la forme « Laebre » et pourrait avoir le prénom. La case reste vide
plutôt qu'inventée.

## Corrections appliquées — noms et prénoms

Toutes portent `incertain: true` et gardent la lecture d'origine en remarque.

| Page·ligne | Avant | Appliqué |
|---|---|---|
| 1 L6 | Alphonse | Alphon**c**e |
| 3 L4 | Alair Abel | ~~Alain ?~~ — **annulée** : le recueil PDF montre un r final, « Alair » rétabli |
| 3 L7 | Cantin **Micher** | Michel ? |
| 3 L11 | Cantin **Susie** | **Lucie** |
| 3 L17 | Vermette **Aleais** | Alexis ? |
| **4 L3** | **Vermette « Marie », M, 75, Père** | **Alain** — un homme prénommé Marie inscrit « père » |
| 4 L6 | Marguriete | Marguerite |
| 4 L22 | Augusta (fils) | Auguste |
| 4 L23 | Rosaria (fils) | Rosario |
| 4 L25 | Aurelia | Aurélie |
| 5 L20 | Rochelle | Rachelle — **confirmée au recueil PDF** |
| 6 L8 | Emelin | ~~Emelie ?~~ — **annulée** : le recueil PDF penche pour « Emelin », rétabli |
| 6 L21 | Sirois Maria | Marie — **confirmée au recueil PDF** |
| 7 L2 | Sirois **Lee** | **Léa** — **confirmée au recueil PDF** |
| 7 L18 | Phelomena | Philomène |
| **8 L3** | **Letarte Maude** | **Manda** — **confirmée au recueil PDF**, nom et âge |
| 8 L18 / L21 | Peteline / Petaline | même personne, deux graphies — même tracé aux deux lignes, **harmonisation confirmée** |
| 8 L24 | Deoma | Diana — **confirmée au recueil PDF** |
| 9 L8 | **Boily** Mary | **Baily** — **confirmée au recueil PDF** |
| 10 L9 | Roberge **Anastaria** | Anastasie — **confirmée au recueil PDF** |
| 10 L11 | Marguriete | Marguerite — **confirmée au recueil PDF** |
| 10 L14 | Fecteau Clerida | **Clérida** — accent et i pointé au recueil PDF ; distincte de sa cousine **Clarida** (10 L22), les deux graphies sont réelles |
| 11 L11 · 11 L13 | « France » (deux personnes) | **François** — le tracé porte « France » aux deux lignes ; sexe M, usage de la division |
| 13 L15 | Sofrania | Sofranie — **confirmée au recueil PDF** |
| 14 L5 | Marie **Luie** | Marie **Luce** — **confirmée au recueil PDF** |
| 14 L12 | Cantin **Seserie** | ~~Cesarie~~ — **fragilisée** : l'initiale n'a pas la forme du C de « Cezarie » (14 L25), plutôt un S. Non tranché |
| 15 L3 | Hamel **Cardule** | **Cordule** — **confirmée au recueil PDF** |
| 17 L2 | Lambert **Rosias** | ~~Rosalie ?~~ → **Rosina** au recueil PDF (pas de haste pour un l) |
| 18 L10 | Gingras **Efa** | **Eva** |
| 18 L13 | Robitaille **Mathalie** | ~~**Nathalie**~~ — **fragilisée au recueil PDF** : l'initiale a les trois jambages du M, non les deux du N. Non tranché |
| 19 L9 | Bedard **Silfred** | Wilfrid ? — le recueil PDF donne la finale « -ried » ; initiale S ou W, non tranchée |
| **20 L18** | Lambert **« Los Edouard »** | **Jos Edouard** — l'abréviation de Joseph |
| 21 L15 | Boucher Colina | Celina |
| 22 L1 | Deslauriers Antonie | Antoine |
| 22 L2 | Morency **Josep** | Joseph |
| 22 L11 | Rochette Fabian | Fabien — **confirmée au recueil PDF** |
| 23 L10 | Remillard Done | Dona |
| **23 L11** | **Giroux « Oliver », F, 67, belle-mère** | **Olive** — **confirmée au recueil PDF** |
| 23 L24 | Robitaille Delvin | Delvina — **confirmée au recueil PDF** |
| 24 L12 | **Sample** Margueret | ~~**Margaret**~~ — **annulée au recueil PDF** : le manuscrit porte le u et la finale -et ; le recenseur francophone a écrit « Margueret » |
| 24 L19 | Gendron Odena | Odina — **confirmée au recueil PDF** |
| 25 L14 | Demers **Archile** | **Achille** — **confirmée au recueil PDF** |
| 27 L18 | Peters **Etel** | **Ethel** (famille anglophone) |
| 27 L22 | Peters Minie Ida | Minnie Ida |
| **28 L18** | Robitaille **« Eugene », F, 22, fille** | **Eugénie** |
| 29 L2 | Boucher Delard | Adelard |
| 30 L6 | Boucher Mary Jene | Mary Jane |
| **31 L18** | **Lefèvre « Ameline », M, 45, chef** | ~~**Anselme**~~ — **ne tient pas au recueil PDF** : l'initiale est un N à trois jambages. « Nazael », « Nazaire » abrégé ou « Noel ». Non tranché |
| 32 L8 | Wells Leacadi | Léocadie — le **o est confirmé au recueil PDF**, mais le manuscrit s'arrête sur un i pointé, sans e final |
| 33 L4 | Groleau **Francis** | François |
| 33 L9 | Groleau Alphones | Alphonse |
| 34 L1 | Fecteau Duleina | Delvina |
| 34 L7 | Lemieux **Rose de Lima** | Rose Delima |
| 36 L3 | Senechale Cardelia | Cordelia |
| 39 L4 | Huard Margerite | Marguerite |
| 40 L10 | Côté Perpetude | Perpétue |
| **40 L24** | Lebel **« S Baptiste »** | **J.Baptiste** — le J de ce recenseur |
| 42 L1 | Parent **Moly** | Molly (famille anglophone) |
| **44 L24 · 45 L2 · 46 L15 · 48 L1 · 66 L15** | « Éléonarde » ×5, puis « Elmire » | **Eleonard** — la correction « Elmire » est annulée, voir ci-dessus |
| 47 L2 | Boucher **Lulie** | Julie |
| **52 L21-24** | **« Dennes »** ×4 | **Demers** — 88 Demers au fichier contre 4 Dennes |
| **56 L17-19** | **« Clauston »** ×3 | **Clouston** — 12 Clouston au fichier contre 3 Clauston |
| 53 L16 | Nadeau **Jean** | Léon |
| 58 L7 | Boucher **Pitaline** | **Vitaline** — même tracé que la Vitaline Côté de la page 59 ligne 18 |
| **59 L14-16** | **« Lévesque »** ×3 | **Levasseur** — la finale « -sseur » est lisible ; 4 Levasseur ici et 8 en 1881-D1, aucun Lévesque ailleurs |
| 64 L25 | Pelletier **Émile** | **Eusèbe** — la finale « -be » est nette au PDF (BAC : « Emilie ») |
| 65 L13 | Hallé **Berlis** | **Barbe** — tracé « Berbe » ; « Berlis » ne correspond à rien |
| 67 L15 | Kily **Henery** | **Honory** — la deuxième lettre est un o net |
| 69 L24 | Boucher **Mélina** | **Delvina** — initiale D identique à la Délina de la ligne 23 |
| 72 L2 | Lambert **Pierre** | **Prime** — P-r-i-m-e au PDF (BAC : « Reine ») |
| **74 L9-20** | **« Marin »** ×12 | **Morin** — le premier o est net, et les 12 seuls « Marin » du fichier sont cette famille |
| 75 L2 | Gosselin **Amélio** | **Anselme** — même confusion que l'« Ameline » de la page 31 |
| 76 L8 | Rouleau **Marie Aney** | **Marie Ange** |
| **76 L15-16** | **« Brocher »** ×2 | **Brochu** — le u final est net ; les deux seuls « Brocher » du fichier sont ces deux lignes |
| 77 L8 | Dubois **MacLerte** | **Modeste** — net au PDF, barre du t comprise |
| 84 L7 | Bois **Aaron**, sexe vide | **Aurore**, F, petite-fille — col. 7 « f » et col. 10 « p. fille » ; le « Aaron » venait de l'index BAC |
| 86 L5 | Toussaint **Edouard** | **Edmond** |
| 89 L12 | Blais **Pictor** | **Victor** — 10 Victor dans la division, aucun Pictor ailleurs |
| 91 L10 | **Gengra** Louise | **Gingras** — 25 Gingras contre un seul Gengra |
| **92 L10-12** | **« Lafranois »** ×3 | **Lafrançois** — la cédille est visible ; 22 Lefrançois/Lafrançois contre 3 Lafranois |
| 93 L14 | Montigny **Voteria** | **Victoria** — prénom rayé puis réécrit au-dessus de la ligne par le recenseur |
| **93 L22-23** | **« Gegnere »** ×2 | **Gagnière** (ou Gaguière) — la première voyelle est un a ; « Gegnere » n'est pas un nom |
| **97 L13-16** | **« Probin »** ×4 | **Robin** — l'initiale est celle des Roberge de la même page ; 20 Robin dans la division |
| 97 L21 | Wermette **Philénier** | **Philomène** — même tracé que sa mère, ligne 18 |
| 98 L5 | Beaulieu **Marie** | **Zéphirine** — le manuscrit porte « … Zéphirine Beaulieu », premier élément indéchiffrable |
| 98 L10 | Blouin **Adélord** | Adélard |
| 98 L13 | Blouin **Onésine** | Onésime — le m final est net |
| 98 L17 | Leclerc **Ananda** | **Amanda** — 18 Amanda, aucun Ananda ailleurs |
| 98 L25 | Boulet **Silarie** | **Silvio** — la finale est en « -io » |
| 99 L7 | Atkinson **Belina** | **Selina** — même tracé que sa fille, ligne 9 |
| 99 L8 | Atkinson **« K. Fro »** | **Wm P.** — abréviation anglaise ; la seconde initiale reste mal assurée |
| **99 L23 · 102 L2** | **« Azarie »** ×2 | **Cézarie** — l'initiale est un C ; ce sont les deux seuls Azarie de la division |
| 100 L3 | Horion **Carolina** | Caroline |
| 101 L5 | Lambert **Georgiona** | **Georgiana** — 21 Georgiana, aucun Georgiona ailleurs |
| 101 L20 | **Raket** Rose | **Backet** — l'initiale est un B ; une famille Backet figure page 126 |
| 102 L15 | Gagnon **Régena** | **Régina** — 5 Régina dans la division, aucun Régena ailleurs |
| 103 L1 | Moreau **Amande** | Amanda |
| 103 L5 | Vallière **Mary Jona** | **Mary Jane** — 11 Mary Jane dans la division |
| 104 L1 | St Hilaire **Philomaine** | **Philomène** — le recenseur écrit « Philomine », sa graphie ordinaire |
| 104 L14 | Roberge **Deléna** | Delina |
| 107 L23 | Roberge **« Eugène », M, fils** | **Eugénie**, F, fille — prénom, colonne 7 et colonne 10 concordent |
| 108 L8 · L9 · L24 | Georginna · Philipe · Odelon | Georgina · Philippe · Odilon |
| 109 L12 | Roberge **« Mary Hue »** | **Marie Anne** |
| 110 L20 | Dawson **Liry** | **Lizy** — famille irlandaise |
| **112 L12-18** | **« Carbert »** ×7 | **Cadoret** — lu sans peine au manuscrit ; 21 Cadoret dans la division, dont la famille de la ligne 23, même page |
| 113 L16 · 120 L18 · 114 L1 | Odelon · Alier · Alier | Odilon · Alice · Alice |
| **114 L2-8** | **« Beaulet »** ×7 | **Boulet** — 23 Boulet dans la division |
| 115 L16 | Lee **« Aime »** | **Elmire** — le tracé commence par « El » ; Elmina et Elzire ne sont pas exclues |
| 116 L11 | Roberge **« McLean »** | **Malcom** — 6 Malcom dans la division, dont son voisin page 115 |
| **116 L14-20** | **« Barcher »** ×7 | **Boucher** — le tracé commence par « Bou- » ; 91 Boucher dans la division |
| 121 L17 · L18 | Addie · Georgiane | Adelia · **Georgiana** |
| 123 L18 · 136 L11 | **Geargiene** · **Georgiena** | **Georgiana** — 22 dans la division |
| 124 L6 · L20 · L23 | Lard · **Liger** · **Willison** | Lord · **Lizy** · **William** |
| **126 L16-17** | **« Baket »** ×2 | **Backet** — le manuscrit n'y porte qu'un signe de répétition : les deux graphies viennent du dépouilleur |
| 130 L5 | **Fredette** Annie | **Fradette** |
| **131 L18-24 · 133 L13-14 · 134 L8-9** | **« Coutin »** ×11 | **Cantin** — le a et le n sont nets ; 66 Cantin dans la division, et la même famille est écrite Cantin page 132 |
| 131 L23 · 134 L22 | Teodude · **Onesine** | Teodule · Onesime |
| 140 L8 | Roberge **« Lenrend »** | **Laurent** — lu sans peine |

## Corrections appliquées — âges

| Page·ligne | Avant | Appliqué | Remarque |
|---|---|---|---|
| **5 L9-L10** | Joseph 4 ans **et** Roch 4 ans | ~~Roch semble 2 ans~~ — **annulée au recueil PDF** | l'accolade de la colonne 8 relie deux « 4 » : jumeaux, le dépouillement avait raison |
| 8 L3 | 10 ans | **12 ans** — confirmée au recueil PDF | |
| 17 L24 | Letarte Paul, 29 ans | **27 ans** — confirmée au recueil PDF | |
| 19 L18 | Roberge Louis, 25 ans | ~~23 ans ?~~ — **annulée au recueil PDF** | le manuscrit donne 25 : l'écart avec l'épouse de 34 ans est réel |
| 46 L22 | Lavertu Alexis, 15 ans | **18 ans** | le place avant son frère Joseph, 16 ans |
| **58 L5** | Gagnon Ema, 21 ans | **31 ans** | le tracé donne 31, et l'index BAC lit 31 lui aussi |
| 80 L22 | Lacroix Louise, 38 ans | **36 ans** | lu au PDF |
| 91 L15 | Daigle Félix, 68 ans | **65 ans** | le 5 porte sa barre supérieure |
| 94 L11 | Faucher Bénoni, 38 ans | **35 ans** | son 5 diffère nettement du 8 de son épouse, ligne suivante |
| 95 L9 | Seyborn Robert, 28 ans | **25 ans** | |
| **96 L6** | Duperré Lucien, **8 ans** | **8 mois** | le manuscrit porte une **fraction** ; le dépouillement a gardé le numérateur et perdu la barre |
| 99 L9 | Atkinson Selina, 20 ans | **22 ans** | le tracé donne 22, et l'ordre décroissant de la fratrie (24, 22, 21, 17, 14, 8) le confirme |
| 105 L13 | Hardy Elmire, 5 ans | **6 ans** | |
| 128 L23 | Roberge Pierre, 19 ans | **29 ans** | le premier chiffre est le même 2 que celui de sa sœur, ligne 22 |

S'y ajoutent sept corrections d'autres champs, toutes du lot PDF : les quatre lieux
de naissance des enfants Wilson (page 62, voir plus haut), le lien « neveu » de
Barthélimi Bergeron (p. 65 l. 11, « frère » au dépouillement), le lien
« pensionnaire » de Gaudias Fortin (p. 66 l. 8, « domestique » au dépouillement), et
le sexe de « Bertha » Lee (p. 70 l. 15) : le manuscrit porte sexe « m » **et** lien
« fils » — deux colonnes concordantes contre le prénom, la règle de 1881-D1 tranche
pour un garçon (Bertie ?).

## Les liens de parenté manquants : la colonne 10 se laisse lire

Le dépouillement avait laissé **quatre lignes sans lien de parenté**, avec la mention
« colonne 10 à relever au manuscrit ». Le PDF les règle toutes les quatre :

| Page·ligne | Personne | Lien lu |
|---|---|---|
| 86 L14 | Fecteau Alma, 1 an, chez les Lacroix | **fille adoptée** |
| 86 L21 | Aubert Hélène, 14 ans, chez les Lefrançois | **fille adoptée** |
| 87 L24 | Boucher Rosana, 18 ans, chez les Demers | **fille adoptée** (l'hypothèse « servante » tombe) |
| 87 L19 | Fontaine Jean-Baptiste, 87 ans, chez les Gagnon | **beau-père** (« grand-père » pas exclu) |
| 93 L20-21 | Narcisse et Marie Anne Montigny, 67 et 60 ans | **père** et **mère** du chef de maison — le dépouillement en faisait un couple de chefs d'une seconde famille |

Trois enfants placés dans trois ménages voisins, tous notés de la même formule : c'est
une pratique de la paroisse, pas un accident d'écriture.

## Les sous-familles : le dépouillement avait rebâti les liens, deux fois

Quand un fils marié vit chez ses parents, le manuscrit continue de rapporter les liens
**au chef de maison** : le fils reste « f », sa femme est « bru », leurs enfants sont
« p. fille » et « p. f. ». Le fichier suit cette règle partout — les sous-familles des
pages 90, 93 et 97 portent bien gendre, père, mère.

**Deux sous-familles y échappaient**, celle des Proulx (page 103) et celle des Roberge
(page 104) : le dépouillement y avait refait les liens autour du jeune ménage, si bien que
Xavier Proulx et Pantaléon Roberge devenaient « chefs », leurs femmes « épouses » et leurs
enfants « fils » et « filles » de gens qui, au manuscrit, sont leurs grands-parents. Douze
lignes remises à la lettre du manuscrit. La sous-famille des Varlot (page 105) était du
même ordre, en pire : deux « pensionnaires » là où le manuscrit écrit gendre et fille.

Il reste ceci de vrai dans la lecture du dépouilleur : ces jeunes ménages **sont** des
familles distinctes, et le fichier les compte comme telles (`no_famille` en « -2 »). Seuls
les liens changent.

## Les cadres 89 et 90 sont intervertis sur le microfilm

Dans le PDF, le cadre qui suit la page 88 porte l'en-tête imprimé **« PAGE 90 »**, et
le suivant **« PAGE 89 »**. Les données suivent l'en-tête, pas l'ordre des cadres :
c'est le bon choix, et il est confirmé par les numéros de famille manuscrits
(`no_famille_ms`) — 390 à 395 sur la page 90, 386 à 390 sur la page 89.

Qui relira ces pages doit le savoir : **se fier à l'en-tête imprimé, jamais à l'ordre
des images.** L'outil `outils/relecture-1881/r91b.py` porte l'échange en dur.

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

## Reprendre le travail dans une nouvelle conversation

Ce chantier est conçu pour changer de session sans rien perdre. Tout ce qui compte
est dans le dépôt : les données, ce document, et l'outillage. Une conversation neuve
repart avec un contexte vide — donc moins coûteuse — et n'a besoin que de ceci.

**Où en est le travail.** Les **142 pages** sont confrontées au manuscrit, et les
colonnes 21-22 sont relues case par case des pages **42 à 142** — la passe est close pour
tout ce que couvrent les recueils PDF. **Ce qui resterait : les colonnes 21-22 des pages 1
à 41**, soit 1025 lignes, qui demandent d'abord un recueil PDF de ces pages ; c'est de là
que viennent 54 des 56 « sait écrire mais ne sait pas lire ». S'y ajoutent les quatre
décisions d'ensemble qui appartiennent à Patrick, listées en tête.

**La branche.** Une branche de travail par session, jamais `main` directement : chaque
lot passe par une pull request. Les lots précédents sont passés par
`claude/recensement-1881-d2-review-2am0zx`, puis `claude/recensement-1891-d1-review-7hbmuh`.

**Ce qu'il faut rattacher à la nouvelle conversation.** **Les deux recueils PDF** —
`Pages_de_1891_Partie02.pdf` (pages 42 à 83) et `1891_DIV12_Partie03.pdf` (pages 84
à 142). Les fichiers joints ne suivent pas d'une conversation à l'autre : c'est la seule
chose à refaire, et les scripts les retrouvent ensuite tout seuls par leur nom.

**Pourquoi changer de session pour cette passe.** Lire les colonnes 21-22 coûte une image
par page, et une image ne profite en rien de ce qui précède dans la conversation : chaque
page est un acte de lecture indépendant. Le contexte accumulé continuerait d'être payé à
chaque tour sans rien apporter. Une session neuve laisse donc bien plus de pages lues
avant saturation — c'est la raison pour laquelle ce document existe. **Une session a suffi
pour les 77 pages du dernier lot**, en versant le résultat dans le fichier tous les quatre
à huit pages plutôt qu'à la fin.

**La règle qui prime sur tout le reste** : Patrick relit les pages une à une dans
l'atelier, et **ce qu'il corrige à la main ne se rediscute pas**. L'outillage le sait —
`atelier.mjs` lit ses corrections, `pat91.mjs` refuse de réécrire un champ qu'elles
couvrent et rend compte de ce qu'il a laissé, `fondre.mjs` les verse dans les
recensements. **Passer `node outils/relecture-1881/fondre.mjs` avant chaque lot**, pour
partir d'un fichier d'accord avec la main. Une ligne qu'il a corrigée est tenue pour
tranchée : plus de drapeau `incertain`, plus de remarques de relecture. Voir `CLAUDE.md`.

**La consigne de Patrick, à rappeler telle quelle** : entrer la lecture la plus
probable plutôt que de laisser en blanc, chacune marquée `incertain: true` avec la
lecture d'origine conservée en `remarque` ; il fera la relecture d'ensemble à la fin.
Tenir la liste des questions dans ce document.

**L'outillage**, dans `outils/relecture-1881/` :

```sh
export Z91_OUT=/un/dossier/de/travail
python3 z91.py 97               # les deux bandes de la page 97, lisibles telles quelles
python3 z91.py 97 13 17 0.22 0.40 20   # zoom sur les lignes 13-17
node page91.mjs 97 98 99        # dump aligné des données de ces pages
node alpha91.mjs 45             # colonnes 21-22 déjà enregistrées, pour confronter
node diag91.mjs                 # contrôles d'intégrité
```

**La passe des pages 1 à 41 a repris** — recueil `r91a` (motif `1891_01_DIV12`), par
lots de quatre pages ; lot 1 (pages 1-4) fait. **Le premier geste de chaque lot :**

```sh
node outils/relecture-1881/fondre.mjs     # partir d'accord avec la main de Patrick
export Z91_OUT=/un/dossier/de/travail
python3 cols91.py 66 67 68 69             # une image par page, tout est dedans
node alpha91.mjs 66                       # ce que le fichier porte déjà
node cols2122.mjs lectures.json --essai   # confronter avant d'écrire
```

La lecture s'écrit page par page, en deux chaînes de 25 caractères — « 1 » pour un un,
« - » pour un tiret :

```json
{ "66": { "lire": "-1----1-1-1-1111111-1-1--", "ecrire": "-1----1-1-1-1111111-1----" } }
```

Compter entre **un écart sur douze** (pages 42-65) et **un sur vingt-cinq** (pages 66-142) —
sauf devant une page dont le dépouillement n'a presque rien enregistré, où l'écart devient
la règle.

Les recueils PDF passent par `recueil91.py` : `r91a` pour les pages 1 à 41, `r91c`
pour les pages 42 à 83, `r91b` pour les pages 84 à 142. Pour les colonnes 17 à 25, recadrer `0.60`–`1.00` à
l'échelle 8 : les numéros de ligne de la marge droite et la colonne 16 (profession)
donnent deux ancres indépendantes.

`pat91.mjs` applique les corrections et resynchronise le chef de famille. Le rythme
d'un lot : repartir de `main`, dumper les pages, confronter, écrire le script de
correction, passer `diag91.mjs`, mettre ce document à jour, pousser.

**Les six pièges à ne pas redécouvrir.**

1. Le cadre ne tombe pas au même endroit d'une page à l'autre — `r91b.py` le détecte,
   mais un zoom serré peut se décaler de quelques lignes : les numéros de ligne
   imprimés dans la marge sont l'ancre, toujours les inclure dans le recadrage.
   **Quand une tache du microfilm les masque** (page 116, numéros 1 à 6), ne pas compter
   les lignes à l'œil depuis le filet du haut : recadrer la colonne des âges
   (`0.20`–`0.42`), qui partage la même géométrie verticale, et la confronter au
   dépouillement.
2. Les cadres des **pages 89 et 90 sont intervertis** sur le microfilm.
3. Un âge d'enfant mal placé dans la fratrie est souvent une **fraction de mois** dont
   le dépouillement n'a gardé que le numérateur.
4. **Les abscisses des colonnes diffèrent entre la demi-page du haut et celle du bas** :
   un `x0f`/`x1f` calibré sur la page 101 tombe à côté sur la page 102. Recadrer large
   d'abord, resserrer ensuite.
5. Une naissance étrangère lue sur une ligne est **presque toujours en colonne 13 ou 14**
   (les parents), pas en colonne 11 — voir la question n° 4.
6. Le « 1 » de ce recenseur prend deux formes : une barre oblique nette, et une barre
   épaisse posée sur un empattement horizontal, qui ressemble à un pâté d'encre ou à un
   tiret gras. Les deux valent 1. Un vrai tiret est **horizontal et fin**, sans jambage.
