# Greffe du notaire E.-H. Tremblay : où reprendre la transcription

Note de passation entre deux conversations avec Claude (31 octobre 2026).
Le travail fait est dans `documents/manifeste.json` : chaque acte y est une
fiche dont l'identifiant commence par `notarie-` (78 fiches au 2 novembre 2026).

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

Le **dernier acte lu est le bail à ferme n° 69** (Joseph Bourassa à Louis
Vallières, 18 mars 1874, fichiers 00364 à 00370). **Reprendre au fichier
00371.** Les fiches des n° 56 à 69 sont versées (78 fiches `notarie-` en tout).

Pour retrouver les identifiants Drive d'un lot, une seule recherche suffit :
`title contains '04T_CN401S124P_0037'` (puis `0038`, `0039`…).

Particularités de la série 00301-00370 :

- 00301 refilme la dernière page du testament n° 55 ;
- 00321 est le dos de la chemise imprimée du bail n° 59 ;
- 00343 est une page blanche barrée (dans le n° 64) ;
- **00349 à 00351 sont un acte étranger** : la minute n° 10 000 du notaire
  (vente d'Alphonse Labbé à Hilaire Labbé, Saint-Frédéric, canton de
  Broughton, années 1880-1890), marquée « N° 66 » par erreur — pas de fiche ;
- 00355 est un **croquis** des emplacements Girard et Croteau (baux n° 38 et
  39 : « rue de 12 pieds de large », 1873 + 99 = 1972) ;
- dans le n° 69, un feuillet est filmé replié : l'ordre du texte est 00364,
  00365, 00368, 00369, 00366, 00367, 00370.

Points à soumettre à Patrick, relevés dans cette série :

- **Louis Lemieux** (n° 38, 39, 64 à 68) : les n° 38-39 le rattachent en
  hypothèse au veuf de 48 ans de 1871 (`1871-D2-P007-L20`, fils Louis et
  Benjamin) ; or les n° 64 à 68 lui donnent une épouse vivante, Esther Girard,
  et des fils François (parti dans le Haut-Canada), Philippe (mineur) et
  Augustin. Les fiches n° 64 à 68 le laissent sans rattachement.
- **Olivier ou Octave Roberge** : le témoin de la donation n° 24, lu
  « Olivier », paraphe « O. R. » comme Octave Roberge, témoin de
  l'acceptation n° 60 de la même donation : relire l'image du n° 24.
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
| n° 10 et n° 11 (quittance Cantin) | tout le n° 10, début du n° 11 | 000980 à 000985 | 00036 à 00041 |
| n° 19 (testament de Marie Samson) | première page | 001014-15 | 00070 |
| n° 24 (donation Cadoret) et n° 25 (sommation à la veuve Bourassa) | fin du n° 24, début du n° 25 | 001035 à 001040 | 00091 à 00096 |
| n° 34 (vente Olivier et Octave Roberge) | première page (qui vend, qui achète) | 001084-85 | 00140 |
| n° 37 (promesse Pelletier à Langelier) | une page du milieu | 001103-04 | 00159 |
| n° 42 (inventaire Bourassa) | moitié basse d'une page (fichier tronqué) | 001173-74 | 00229 |
| n° 45 (vente Pichette à Couture) | deuxième page : l'acheteur, le début de la terre (fichier absent du Drive) | 001191-92 | 00247 |

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
