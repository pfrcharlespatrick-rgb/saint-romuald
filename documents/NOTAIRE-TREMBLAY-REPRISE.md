# Greffe du notaire E.-H. Tremblay : où reprendre la transcription

Note de passation entre deux conversations avec Claude (31 octobre 2026).
Le travail fait est dans `documents/manifeste.json` : chaque acte y est une
fiche dont l'identifiant commence par `notarie-` (191 fiches au 11 novembre 2026, dans la nuit).

## Où sont les images

Elles sont dans le Google Drive de Patrick, dans
**1616 chemin du fleuve › Archives & Documents › Notaires › Notaire**.
Les fichiers sont rangés dans des sous-dossiers de 50 (`01-50`, `51-100`,
`101-150`, `151-200`, `201-250`, `251-300`, `551-600`…), et des copies
existent aussi à la racine du dossier « Notaire ».

Les fichiers s'appellent `04T_CN401S124P_00NNN.jpg`.
**Numéro du microfilm = numéro du fichier + 944.**
Par exemple, le fichier 00166 porte en marge le numéro de microfilm 001110.
Chaque image montre deux numéros de microfilm, l'un à gauche et l'autre à
droite (« 001110 | 001111 ») : on cite toujours la paire.

### La méthode de lecture

1. Chercher l'identifiant du fichier avec l'outil Google Drive `search_files`,
   par exemple avec `title contains '00181'`.
2. Le télécharger avec `download_file_content`. Le résultat est trop gros pour
   être affiché : il est enregistré dans un fichier JSON
   `{content (base64), title}`.
3. Le décoder avec Python, puis le réduire avec PIL (`thumbnail((1100,1600))`)
   avant de le lire.
4. Procéder par lots de 5 fichiers. À chaque lot :
   - transcrire ;
   - chercher les noms dans les cinq recensements ;
   - mettre à jour `documents/manifeste.json` ;
   - lancer `node outils/generer-site.mjs` ;
   - faire un commit, puis un push sur une branche `claude/…` ;
   - ne publier (ouvrir une PR) que lorsque Patrick dit « publie ».

## Où reprendre

**Mise à jour du 2 novembre 2026.** Patrick a ajouté au Drive les fichiers
**00301 à 00450** (sous-dossiers créés les 1er et 2 novembre ; les images 00426 à 00450 y
sont en double). Les fichiers **00451 à 00550 manquent encore** (actes
d'avril-mai 1874, avant le n° 113).

**Mise à jour du 3 novembre 2026.** La série 00301-00450 est **entièrement
lue** : actes n° 56 à 88 complets, et le **début du testament n° 89** de Joseph
Lemelin (18 avril 1874, fichiers 00449-00450), dont la fin est sur le fichier
**00451, absent du Drive**. 98 fiches `notarie-` en tout.

**Mise à jour du 3 novembre 2026, soir.** Patrick a ajouté les fichiers
**00451 à 00550** (sous-dossier `451-500`, puis `501-550`). La série est
**entièrement lue** : le testament n° 89 de Joseph Lemelin est complété, et les
actes **n° 90 à 112** (18 avril au 6 mai 1874) sont transcrits ; la fin du
n° 112 est sur le fichier 00551. Les actes n° 113 à 122 (fichiers 00551 à
00601) étaient déjà versés. **121 fiches `notarie-` en tout.**

**Mise à jour du 10 novembre 2026 — Tropy.** Patrick a décrit les 599 images
dans Tropy (export : `documents/tropy/tropy-notaires.json`). Ces descriptions
ont fait retrouver la première page du n° 34 (le père, Olivier Roberge, vend à
son fils Octave) et le début du n° 11 (Ferdinand Demers, domestique, quittance
à Narcisse Cantin), et ont donné le n° 10, jusqu'ici absent (quittance de John
Prince à Thomas Freeley) : les trois relus sur le manuscrit. **122 fiches
`notarie-`.** Chaque fiche porte désormais ses images (`images`), versées par
`node outils/tropy/fondre.mjs` ; voir `documents/tropy/RAPPORT.md`. Après un
nouveau lot d'actes, réexporter Tropy, remplacer le fichier et relancer l'outil.

**Pour reprendre** : continuer au fichier **00602** (microfilm 001546-47),
après l'acte n° 122, si Patrick l'a mis au Drive ; sinon, s'attaquer aux pages
manquantes du tableau plus bas.

**Mise à jour du 10 novembre 2026, soir.** Patrick a ajouté les fichiers
**00601 à 00800** (sous-dossiers `601-650`, `651-700`…). Les fichiers **00602 à
00651** sont lus : actes **n° 123 à 134** (20 au 27 juin 1874). **134 fiches
`notarie-`.** Les identifiants Drive de 00601 à 00651 sont ajoutés à
`documents/tropy/images-drive.json` ; les images de ces fiches y sont posées à
la main (Tropy ne les décrit pas encore).

- **Le n° 122 est du 20 juin 1874, pas du 26** : la clôture dit « le vingtième
  jour de juin », et les n° 123 à 128 sont du même jour. La fiche est corrigée
  (son identifiant garde « 06-26 »). **Tropy porte encore « 1874-06-26 »** :
  à corriger dans Tropy avant le prochain export.
- **Le hameau Roberge** (n° 122 à 128) : le 20 juin, Pierre Roberge,
  cultivateur de Saint-Jean-Chrysostome, concède sept emplacements de sa terre
  de la concession Saint-Augustin (sept piastres de rente chacun). Seul Eusèbe
  Bilodeau, menuisier, est rattaché (probable, 1871-D2-P035-L07).
- **Les Roberge du premier rang** (n° 129-130) : Hubert senior et Magloire,
  bateliers, frères de feu Louis, annulent une vente de 1866 [?] et échangent
  des parts de la terre familiale avec leur neveu **Louis-Hubert Roberge**, le
  navigateur des n° 49, 53, 58, 72, 74 et 110. Le n° 130 cite le partage de la
  succession de Luce Demers, veuve de Julien Roberge (Me J.-B. Couillard,
  30 décembre 1848).
- **« H. King & Co. »** (n° 126, 134) : Henry King, de Québec, et John Breakey,
  marchands de bois, achètent deux îles bâties de la Chaudière.
- Les fichiers 00605, 00609, 00613, 00617, 00621 et 00625 sont les dos imprimés
  des chemises de baux (« Bail à rente foncière… Copie »), restés blancs ;
  00637 est un feuillet blanc ; 00639 une enveloppe portant les frais du n° 131.

**Suite du 10 novembre 2026, soir.** Le sous-dossier `651-700` est **entièrement
lu** : actes **n° 135 à 145** (27 juin au 13 juillet 1874). **145 fiches
`notarie-`.**

- **Les îles de la Chaudière** (n° 134, 135, 137, 139) : Jean et Ferdinand Denis
  dit Lapierre vendent trois îles à « H. King & Co. », au-dessus de leur moulin
  à scie ; Jean solde ensuite à la **veuve Richard Topping (Angélique Boutin)**
  le prix d'îles achetées en 1868 — cinq reçus de 50 $ (1869-1873) sont restés
  dans la minute. Le nom lu « Lepping » au n° 134 est **Topping**.
- **n° 136** : contrat de mariage Bergeron–Marcoux, passé un dimanche à
  Saint-Colomb-de-Sillery, avec la liste des meubles du ménage.
- **Benjamin Demers lotit les rues Saint-Paul et Demers** (n° 140 à 145,
  11-13 juillet) : Charles et Louis Filteau, J.-B. Nicol, F.-X. Guay, James
  Kiley, George Bilodeau. Le n° 144 nomme le **« terrain de la pompe »** (à
  incendie) au nord du lot Kiley : à rapprocher du croquis du fichier 00291.
  Plusieurs voisins sont rattachés en probable à 1871-D1 (maisons 51 à 87).
- Page sans doute non filmée dans le **n° 135** (entre 00653 et 00654 : le prix
  de l'île).
- Le fichier **00700** est en double au Drive (sous-dossiers `651-700` et
  `701-750`).

**Mise à jour du 11 novembre 2026.** Les fichiers **00701 à 00749** sont lus :
actes **n° 146 à 157** (17 au 20 juillet 1874). **157 fiches `notarie-`.**

- **n° 146** : vente à réméré de Charles Couture à Étienne Denis dit Lapierre ;
  elle montre que le hameau Roberge était loti dès 1870 environ.
- **Benjamin Demers achève le lotissement des rues Saint-Paul, Saint-Louis et
  Demers** (n° 147 à 157 ; avec les n° 140 à 145, dix-sept actes en dix jours).
  L'ordre des lots du côté ouest de la rue Saint-Paul, du nord au sud :
  Michel Blais fils (au coin du chemin Royal, n° 154), Deschênes (n° 152), Guay,
  Toussaint, Montigny, Lefrançois, Larivée, Nicol, rue Saint-Jean-Baptiste. Côté
  est : terrain de la pompe, Kiley, St-Hilaire, Beaulé, Paradis [?]. Rue
  Saint-Louis : Léon Topping (n° 149-150), dos à dos avec Kiley. Le recensement
  de 1881 range Montigny, Lefrançois et Larivée dans le même ordre (maisons 103,
  105, 106).
- **n° 148** : Antoine Toussaint donne à Édouard la moitié nord d'une maison de
  36 pieds sur 26 déjà bâtie sur la rue Saint-Paul.
- **n° 156** : la minute n'est pas signée par le notaire.
- **n° 157** (bail Demers à Isidore Houle, rue Demers) : **incomplet**, la
  clôture est sur le fichier **00750**. En marge : « Résilié par le n° 654 ».

**Mise à jour du 11 novembre 2026, soir.** Patrick a rempli le sous-dossier
« 750 à 800 ». Les fichiers **00750 à 00800** sont lus : le n° 157 est complété,
et les actes **n° 158 à 170** (21 juillet au 24 août 1874) sont transcrits.
**170 fiches `notarie-`.**

- **n° 158** : Catherine Lecours, veuve Samson, encore en vie le 21 juillet
  1874, reçoit sa rente d'Augustin Carrier (fil des n° 2, 26, 82-84).
- **n° 159** : Benjamin Demers dépose la procuration de son fils **Louis-Julien
  Demers, établi à South Manchester (Connecticut)** — un émigré des filatures.
- **n° 160** : accord après une bagarre entre deux journaliers, dont un
  « employé chez Henry Atkinson ».
- **n° 162** : le surnom « Laverte » des n° 21 et 28 se lit **Lavertu**
  (Duperron dit Lavertu, de Saint-Lambert).
- **n° 165, 167** : la rue Saint-Louis (lot Valcourt, 120 pieds) est parallèle à
  la rue Saint-Paul et adossée aux lots St-Hilaire, Beaulé et Napoléon Paradis ;
  Napoléon Paradis, charpentier, vend sa maison de deux étages (n° 167).
- **n° 166** : Basile Vermette, « employé du Grand Trunk », de Saint-Jean-
  Chrysostome.
- **n° 168** : le boulanger Simoneau fait sommer un **creuseur de puits
  artésiens** de finir son ouvrage.
- **n° 169** clôt le fil des îles de la Chaudière : Louis Topping est payé de
  l'île vendue 800 piastres en 1869 à Ferdinand Lapierre (la page du prix
  manquait au n° 135).
- Les fichiers 00765, 00773, 00789 et 00795 sont des feuillets de calcul du
  notaire ; 00770 et 00771 sont deux prises de la même page ; 00782 est une
  feuille commencée puis abandonnée.

**Mise à jour du 11 novembre 2026, nuit.** Patrick a demandé de continuer
jusqu'au fichier 01000. Les fichiers **00801 à 00880** sont lus : actes
**n° 170 à 191** (24 août au 22 septembre 1874), et le début du n° 192.
**191 fiches `notarie-`.**

- **n° 173-174** : protêt puis quittance entre le menuisier **Joseph Beaufort**
  et **Marguerite Roberge**, épicière de New-Liverpool (le reçu joint donne le
  prénom).
- **n° 176-177** : fin du fil Demers-Gingras (n° 16, 31) : à l'Île d'Orléans,
  le bail à ferme est résilié et le fermier achète la moitié de terre
  (1 100 piastres).
- **n° 179** : François Gagné fait sommer son père Antoine, qui a arraché huit
  châssis de la maison donnée ; réponse consignée : « ce soir ils seront
  brûlés ».
- **n° 163, 180, 184, 185** : le même cheval gris passe de Tardif à Louis
  Filteau, puis à son frère Charles, et revient — tout est résilié.
- **n° 186** : protêt pour un cheval vendu « sain » et trouvé aveugle.
- **n° 187-188** : un **prestidigitateur licencié, Prosper Girard**, donne
  quittance à deux journaliers (Alfred Boucher, Pierre Gagnon) qui avaient
  troublé sa soirée du lundi 14 septembre 1874.
- **n° 190** : premier transfert d'un lot du lotissement Demers (Bilodeau →
  François Leclerc, rue Saint-Paul, avec maison).
- **n° 191** : nouvelle rue **Saint-Jean-Baptiste** dans le lotissement Demers.
- Le fichier 00854 est une feuille volante : « Pierre Rouleau, son of Pierre
  Rouleau, carpenter — volé du bois — Henry Atkinson by his agent H. G. King »
  (138 piastres) : à rapprocher d'un acte à venir.

**Pour reprendre** : au fichier **00881** (microfilm 001825-26), suite du
**n° 192** (titre nouvel Fontaine à Demers, 22 septembre 1874).

Fils suivis dans la série 00451-00550 :

- **Joseph Bourassa** (n° 69, 91, 101) : la ferme du Petit-Saint-Jean passe
  de Lapointe à Vallières ;
- **la maison Leclerc, rue Saint-Paul** (n° 88, 104 à 106) : bail Leclerc →
  Foster → sous-bail Gingras → bail Sirois ;
- **Peter O'Regan**, « écuier, marchand-épicier, ci-devant de la cité de
  Québec », bailleur (n° 92, 93, 103) ; le n° 92 avait d'abord été lu
  « P. O. Régnault » ;
- **« Ritchie & Cull »** (n° 58, 71, 110) : William Ritchie paraît au n° 110 ;
- **Jérémie Levasseur, rue Demers** (n° 111-112) : sommation à un locataire
  « sans abri » hébergé pour l'hiver — c'est la maison 78 de 1871-D1, la
  dernière relue par Patrick dans l'atelier.

Pour retrouver les identifiants Drive d'un lot, une seule recherche suffit :
`title contains '04T_CN401S124P_0037'` (puis `0038`, `0039`…).

Particularités de la série 00301-00450 :

- 00301 refilme la dernière page du testament n° 55 ;
- 00321 est le dos de la chemise imprimée du bail n° 59 ;
- 00343 est une page blanche barrée (dans le n° 64) ;
- **00349 à 00351 sont un acte étranger** : la minute n° 10 000 du notaire
  (vente d'Alphonse Labbé à Hilaire Labbé, Saint-Frédéric, canton de
  Broughton, années 1880-1890), marquée « N° 66 » par erreur — pas de fiche ;
- 00355 est un **croquis** des emplacements Girard et Croteau (baux n° 38 et
  39 : « rue de 12 pieds de large », 1873 + 99 = 1972) ;
- 00436 est un brouillon biffé de règlement du conseil municipal de
  Saint-Romuald (26 mars 1874, licences d'auberge) ; 00437-00438 sont deux
  étiquettes volantes de l'acte n° 85 ;
- 00421 et 00422 sont deux prises de la même page (acte n° 80) ;
- dans le n° 69, un feuillet est filmé replié : l'ordre du texte est 00364,
  00365, 00368, 00369, 00366, 00367, 00370.

Points à soumettre à Patrick, relevés dans cette série :

- **Louis Lemieux** (n° 38, 39, 64 à 68) : les n° 38-39 le rattachent en
  hypothèse au veuf de 48 ans de 1871 (`1871-D2-P007-L20`, fils Louis et
  Benjamin) ; or les n° 64 à 68 lui donnent une épouse vivante, Esther Girard,
  et des fils François (parti dans le Haut-Canada), Philippe (mineur) et
  Augustin. Les fiches n° 64 à 68 le laissent sans rattachement.
- **Olivier et Octave Roberge** sont deux hommes : Olivier signe en toutes
  lettres au codicille n° 75, Octave à l'acceptation n° 60 ; tous deux
  paraphent « O. R. ». Question réglée.
- **Josephte Couture**, épouse d'Isaac Cantin père, meurt entre son codicille
  (n° 75, 22 mars 1874) et le 12 avril 1874 (n° 86, « feue »).
- **Catherine Lecours** (n° 2, 26, 82-84) : son testament n° 84 la dit mère de
  Louis Gelly, son logeur, né de son premier mariage avec Ambroise Gelly.
- **Joseph Bourassa, rentier** (n° 69) : rattaché, en probable, au cultivateur
  de 56 ans de 1871 (maison 63) ; rien ne le relie encore à la maison de
  pierre (1900-cf).

L'image 001235-36 (fichier 00291) est un **croquis de l'emplacement des rues
Saint-Paul et Saint-Louis**, avec le « terrain de la pompe » : à garder pour
situer ces rues.

**Le fichier 00247 n'existe pas au Drive** : l'image 001191-92, qui porte le
nom complet de l'acheteur et le début de la désignation de la terre, manque.

**Le fichier 00229 est tronqué au Drive** (786 Ko au lieu d'environ 1,6 Mo) :
seule la moitié haute de l'image 001173-74 est lisible. Il faudrait la
reprendre depuis le microfilm (BAnQ) ou retélécharger le fichier.

À chercher ailleurs, cités par l'inventaire : un inventaire du **4 août 1871**
(Me E. Simard et confrère), un autre du **18 septembre 1873** (Me J.-B. Hamel ;
la veuve dit Simard), la vente aux enchères du 30 septembre 1873 (Octave
Lemieux), et l'achat de l'emplacement de la maison de pierre à
**Jean-Baptiste Carrier, le 15 septembre 1846 (Me J.-B. Couillard)**.

L'inventaire décrit la maison de pierre : il est rattaché directement au lieu
`1900-cf` (champ `documents` de `data/lieux-data.js`), comme l'acte n° 119.

Fait le 31 octobre 2026 (fichiers 00181 à 00300) :

- la **sommation n° 40** est complète (fin sur 00181 à 00183) ;
- le **bail n° 41** (Ferdinand Villeneuve à Napoléon Vallerand, 25 février
  1874) est complet, fichiers 00184 à 00187 ;
- l'**en-tête de l'inventaire n° 42** est lu (fichiers 00188 à 00190) : il
  confirme le 27 février 1874. La marge porte « 27 février & 20 mai 1874 » :
  chercher plus loin une clôture ou une reprise datée du 20 mai 1874.

Les fichiers 00191 à 00201 (microfilm 001135 à 001145) étaient déjà
transcrits ; les fichiers 00202 et suivants (chambres n° 7 à 9, le « magasin »
et son stock de boissons, la montre en or, la garde-robe d'Ursule Tardif,
l'ajournement signé de tous, la vacation du 5 mars) ont été lus ensuite,
jusqu'au fichier 00300. Après l'inventaire viennent les actes n° 43 et suivants.

## Les pages qui manquent encore

| Acte | Ce qui manque | Microfilm | Fichier Drive |
|---|---|---|---|
| n° 5 (testament Prémont) et n° 6 (contrat de mariage Carrier–Demers) | fin du n° 5, début du n° 6 (prénom du marié) | 000960 à 000965 | 00016 à 00021 |
| n° 10 (quittance Prince à Freeley) | clôture et signatures (la première page est lue, le n° 11 est complet depuis le 10 novembre 2026) | 000981 à 000983 | 00037 à 00039 |
| n° 19 (testament de Marie Samson) | première page | 001014-15 | 00070 |
| n° 24 (donation Cadoret) et n° 25 (sommation à la veuve Bourassa) | fin du n° 24, début du n° 25 | 001035 à 001040 | 00091 à 00096 |
| n° 37 (promesse Pelletier à Langelier) | une page du milieu | 001103-04 | 00159 |
| n° 42 (inventaire Bourassa) | moitié basse d'une page (fichier tronqué) | 001173-74 | 00229 |
| n° 45 (vente Pichette à Couture) | deuxième page : l'acheteur, le début de la terre (fichier absent du Drive) | 001191-92 | 00247 |
| n° 133 (résiliation de donation Cadorette) | moitié basse d'une page : la date et le notaire de la donation résiliée (fichier tronqué, 786 Ko) | 001588-89 | 00644 |

Patrick n'a pas trouvé ces pages en les cherchant à la main ; le Drive les
contient peut-être. La page 001084-85 n'a peut-être jamais été photographiée.

Les actes n° 113 à 122 (mai et juin 1874, microfilm 001495 à 001545, soit
les fichiers 00551 à 00601) sont déjà versés et publiés.

## Les règles décidées avec Patrick

- **Saint-Jean-Chrysostome recouvre Saint-Romuald** : voir `CLAUDE.md`. Un
  habitant dit « de St Jean Chrysostome » peut se trouver au recensement,
  surtout dans la division 2. On le rattache alors en « probable » ou en
  « hypothese », selon les autres indices.
- **Un rattachement douteux reste vide.** Le doute est expliqué dans `note`.
- **Les identifications faites par Patrick** sont rattachées et signées dans
  la note (« identifié par Patrick, date »). Exemples : Narcisse Légaré,
  John McKenzie, Louis Forgues père.
- **Chaque fiche porte** sa source (le greffe), sa cote (n° de minute et
  images), la date, la transcription et les personnes, avec leur
  `ref_personne` quand le rattachement est fait.
- **Les fiches de maison et de lieu** montrent d'elles-mêmes les documents de
  leurs habitants : il n'y a rien à recopier. Un lieu ne reçoit un document
  directement (`documents` dans `data/lieux-data.js`) que si l'acte décrit ce
  lieu lui-même.
- **Ne pas créer de lieu sur la carte** pour le chemin de la Reine ni pour la
  concession Taniata : Patrick a dit de laisser cela de côté.
- **Patrick ne programme pas.** Lui écrire en français simple et lui donner
  des repères concrets : les numéros d'image, le bouton « Merge ».

## Le dossier Bourassa, fil conducteur

La maison Bourassa (lieu `1900-cf`, 1900, chemin du Fleuve) réunit à ce jour
les actes n° 23, 25, 40, 42 et 119. Un document versé sur François Bourassa
(`1871-D2-P067-L19`), sa veuve (`1871-D2-P067-L20`) ou ses quatre fils
(`1871-D2-P068-L01` à `L04`) apparaît de lui-même sur cette fiche.

Une question reste ouverte : la date de décès d'Ursule Tardif. Elle est
donnée tantôt au 2, tantôt au 6 février 1865, et seul l'acte de sépulture
peut trancher.
