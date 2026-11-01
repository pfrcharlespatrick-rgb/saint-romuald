# Greffe du notaire E.-H. Tremblay : où reprendre la transcription

Note de passation entre deux conversations avec Claude (31 octobre 2026).
Le travail fait est dans `documents/manifeste.json` : chaque acte y est une
fiche dont l'identifiant commence par `notarie-` (60 fiches à ce jour).

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

**Au fichier 00277**, c'est-à-dire au microfilm 001221-22 : la suite de
**l'échange n° 51** entre Ignace Dubois père et Benjamin Demers (6 mars 1874 ;
fiche `notarie-1874-03-06-echange-dubois-demers`) — ce que Demers donne en
retour, le montant de la soulte, les signatures. La quittance n° 50 est
complète.

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

Fait le 31 octobre 2026 (fichiers 00181 à 00276) :

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
jusqu'au fichier 00276. Après l'inventaire viennent les actes n° 43 et suivants.

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
