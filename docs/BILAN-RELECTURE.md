# Les trois recensements — ce qui est vérifié, ce qui reste

État au 10 septembre 2026. Ce document répond à une seule question : **où en est la
vérification au manuscrit, recensement par recensement, et qu'est-ce qui reste à faire ?**

Les deux premiers chantiers de la liste sont faits — le complément de 1881 est versé
aux fiches publiques, et le tiret des colonnes 21-22 de 1891 est rendu explicite aux
pages 42 à 83. Les sections concernées le disent au fil du texte.

Les journaux de campagne restent la référence de détail :
`RELECTURE-1881-D1.md`, `RELECTURE-1881-D2.md`, `RELECTURE-1881-D2-questions.md`,
`RELECTURE-1891-D1-questions.md`. Ce bilan-ci les surplombe et n'en répète pas le contenu.

## Vue d'ensemble

| Jeu | Personnes | Maisons | Familles | Pages | `incertain` | Relu au manuscrit |
|---|---:|---:|---:|---:|---:|---|
| 1871 D1 | 1 540 | 217 | 288 | 78 | 98 (6 %) | **non** |
| 1871 D2 | 1 457 | 178 | 249 | 73 | 547 (38 %) | **non** |
| 1881 D1 | 2 189 | 349 | 400 | 88 | 153 (7 %) | oui, intégralement |
| 1881 D2 | 1 452 | 249 | 267 | 59 | 152 (10 %) | oui, intégralement |
| 1891 D1 | 3 548 | 637 | 644 | 142 | 1 100 (31 %) | oui, intégralement |
| 1891 D2 | **0** | — | — | — | — | **jeu vide** |

**10 186 personnes en ligne.** Les contrôles d'intégrité passent partout : aucun
identifiant en double, et les 86 références de personne de `documents/manifeste.json`
pointent toutes vers quelqu'un qui existe.

Une colonne est désormais **complète de bout en bout** : l'alphabétisation de 1891
division 1, sur les 3 548 lignes. Chez les 1 788 personnes de vingt ans et plus,
**65,3 % savent lire**.

Le taux d'`incertain` n'est pas un taux d'erreur : il monte quand on relit, parce que
relire, c'est marquer ce dont on n'est pas sûr. **1891 est le jeu le plus vérifié et
celui qui affiche le plus de doutes** — les deux vont ensemble. Les 1 100 drapeaux de
1891 se répartissent en 816 posés par la passe des colonnes 21-22, 249 par la relecture
ligne à ligne et 35 autres.

---

## 1891 — le plus avancé

**Les 142 pages de la division 1 sont confrontées au manuscrit**, et trois passes
dédiées sont closes : colonnes 21-22 (sait lire / sait écrire), colonnes 17 à 25
(patron, employé, chômage, effectifs, infirmités), colonne 4 (le code de logement).

### Ce qui reste

1. **La division 2 n'existe pas.** `data/recensement-1891-d2-data.js` est une coquille
   vide de 180 octets. Ce n'est pas une relecture qui manque, c'est le dépouillement
   entier — la moitié de la paroisse en 1891. **C'est le plus gros trou des trois
   recensements**, et le seul qui ne se comble pas par une vérification : il faut
   dépouiller.

2. **41 maisons sans code de logement**, sur 637. Cases raturées, tachées ou vides au
   manuscrit, plus les quatre maisons de la page 79 dont le cadre est mal calé dans le
   recueil. Réparties sur 45 pages ; rien ne se gagnera sans un meilleur tirage.

3. ~~**Le tiret des colonnes 21-22.**~~ **Fait, sur les 142 pages.** Une case vide du
   fichier voulait dire un tiret au manuscrit — donc « ne sait pas » —, mais le site
   lisait « non relevé ». **1 325 lignes portent désormais `sait_lire: false` et
   `sait_ecrire: false`**, marquées `alphabetisation_source: 'tiret_manuscrit'`. **Les
   colonnes 21-22 sont complètes : 3 548 lignes sur 3 548.** Rien n'a été deviné :
   aucun drapeau `incertain` ajouté, le compte reste à 1 100.

4. **Les lectures laissées ouvertes** — une dizaine, listées dans
   `RELECTURE-1891-D1-questions.md` : « Losia/Rosia » (p26 L13), les prénoms anglais des
   Peters (p27 L18-20), l'initiale de « Cesarie » (p14 L12), le prénom de la p31 L18,
   « Telieria » (p1 L15), « Abringe » (p1 L22). Le prénom de la p13 L17 est perdu pour de
   bon : la case est détruite par une tache d'émulsion du microfilm. Ces cas-là ne se
   trancheront qu'aux registres de la paroisse ou à l'index de BAC, pas au microfilm.

---

## 1881 — le complément est versé, deux pages restent en suspens

C'est ici que Patrick avait raison de flairer un manque, et le manque n'était pas là où
on l'attendait : **les deux divisions sont intégralement relues**, mais le site public
n'affichait qu'une partie de ce qui avait été relevé. C'est fait — à deux pages près.

### Ce qui manquait : le complément n'était pas versé aux fiches publiques

Le formulaire de 1881 compte vingt colonnes. Les fichiers
`recensement-1881-d*-data.js` n'en portent que six : nom, sexe, âge, état matrimonial,
profession, position au manuscrit.

Les autres **ont été dépouillées** et vivent dans des fichiers séparés,
`complement-1881-d1-data.js` et `complement-1881-d2-data.js` :

| | 1881 D1 | 1881 D2 |
|---|---|---|
| Pages transcrites | **88 / 88** | **59 / 59** |
| Colonnes | 10-13, 16-19 | 10-13, 16-19 |
| Écoliers relevés | 309 | 343 |
| Nés dans les douze mois | 61 | 34 |
| Exceptions aux défauts | 182 | 240 |
| Lectures douteuses | 26 | 23 |

L'atelier les lisait et les affichait (`Suivi des maisons et familles.dc.html`) ;
`outils/generer-site.mjs` ne les lisait pas du tout, si bien que les 3 641 fiches
publiques de 1881 ignoraient le lieu de naissance, la religion, l'origine, l'école et
les infirmités — qui étaient pourtant là, à côté, vérifiés page par page.

**C'est fait.** `outils/lib/complement-1881.mjs` verse le complément au chargement, en
reprenant **exactement la logique de l'atelier** pour que les deux vues montrent la même
chose : rattachement par page et ligne du manuscrit, jamais de remplacement d'une valeur
existante, provenance marquée champ par champ. Les fiches de 1881 portent désormais neuf
colonnes au lieu de cinq, et les lectures douteuses du complément s'affichent en marge
sous « Lecture à confirmer ».

Ce que la couverture donne, une fois versée :

| | 1881 D1 | 1881 D2 |
|---|---:|---:|
| Fiches avec un lieu de naissance | **2 140 / 2 189** | **1 452 / 1 452** |
| Écoliers | 302 | 344 |
| Nés dans les douze mois | 59 | 33 |
| Lectures douteuses reportées | 26 | 23 |

La division 1 compte désormais 2 105 catholiques, 20 fidèles de l'Église anglicane,
8 protestants, 5 presbytériens et 2 épiscopaliens ; par origine, 1 996 Français,
48 Écossais, 43 Irlandais, 25 Anglais, 16 Allemands, 6 Portugais et 6 Américains. En
division 2 : 1 367 catholiques, 54 de l'Église d'Angleterre, 26 presbytériens,
5 méthodistes ; 1 215 Français, 145 Irlandais, 64 Anglais, 28 Écossais.

### Ce que le versement a trouvé

Le rattachement se contrôle par deux ancres datées du manuscrit : une ligne marquée
« né dans les douze derniers mois » doit porter un âge en fraction, une ligne marquée en
colonne 16 doit porter un âge d'écolier. Le contrôle a fait apparaître trois choses.

- **Page 4 de la division 1 : un décalage devenu faux.** Le complément portait
  `decalage: 1`, écrit quand le dépouillement sautait encore la ligne 1. La relecture a
  depuis réinséré Beaulieu Damase et renuméroté la page : le décalage déportait donc
  d'un rang toute la page, bloc anglican compris. Retiré. **L'atelier l'appliquait aussi
  — la correction vaut pour les deux vues.**
- **Page 46 de la division 1 : un comptage fautif.** `lignes: 23` privait de tout
  complément les deux derniers Simard. Le manuscrit en porte 25.
- **Page 18 de la division 2 : une marque de trop.** « Février » en colonne 10 à la
  ligne 1 tombe sur Catherine Williams, 15 ans, et la division ne compte aucun
  nourrisson né en février. Retirée ; le reste de la page est juste au caractère près.

**Un garde-fou permanent** en est sorti : le module refuse d'attribuer une naissance des
douze derniers mois à qui n'est pas un nourrisson, et le générateur le signale au lieu
de le laisser passer.

### Les pages 82 et 83 de la division 1 — suspendues

Celles-là ne se réparent pas ici. Le complément y décrit des personnes que le registre
ne contient pas : une **Adèle Talbot**, 45 ans, veuve, « Cultivatrice » ; un **Robert
Clauston**, 19 ans, donné pour fils de Johnny ; un **Michel Bilodeau**, 71 ans,
« Retraité ». Aucun des trois ne figure dans la division, et la famille de Johnny
Clouston s'arrête à la ligne 16 de la page 81 sans se poursuivre. **Aucun décalage de
−3 à +3 ne raccorde les ancres** : la colonne 10 n'y marque qu'une naissance là où le
fichier en porte deux, et la page 83 annonce un nourrisson de mai quand la division n'en
compte aucun entre les pages 27 et 88. Les pages voisines, elles, tombent juste au mois
près — 81 avec les Clouston écossais, 84 et 85 avec leurs mois de naissance exacts.
L'anomalie est **bornée à ces deux pages**.

Deux lectures possibles, et le manuscrit seul tranchera : ou le dépouillement a perdu un
ménage entier, ou le complément a été transcrit sur deux images qui ne sont pas celles
des pages 82 et 83. En attendant, **rien n'y est versé** — pas même les valeurs par
défaut : les 49 personnes concernées gardent leurs colonnes vides plutôt que de recevoir
une religion ou une origine invérifiable.

À noter, pour ne pas le chercher en vain : **le formulaire de 1881 ne comporte aucune
colonne « sait lire » / « sait écrire »**. La question existe en 1871, disparaît en 1881,
revient en 1891. Il n'y a rien à dépouiller pour ces champs.

### Ce qui reste à vérifier au manuscrit

1. **Les professions de la division 1 n'ont jamais été confrontées au manuscrit.** La
   colonne tombe hors du champ des rendus utilisés pendant la relecture : tout ce qui a
   été vérifié s'arrête à la colonne des âges. **667 valeurs de profession sur les
   88 pages viennent donc du dépouillement seul.** Une passe dédiée reste à faire, en
   élargissant le rendu — exactement comme cela a été fait pour la colonne 4 de 1891.

2. **Neuf écarts relevés en division 1 et jamais tranchés**, consignés dans le
   complément : le patronyme « Pauldrfabri » (p3 L9), « Quirket » pour un nom en Mc
   (p3 L16), « Marie » sur une ligne portant M (p4 L10), « Hazel Cantlie » lu
   « Cambell Harriet » (p4 L23), quatre âges (p6 L6, p6 L22, p9 L10, p12 L11), et une
   profession lue « Boulanger » là où le manuscrit porte un mot en « Not- » (p14 L11).

3. **Le patronyme Faucher / Forcade, division 2 page 18 — à confirmer d'un mot.** Le
   dépouillement avait lu « Faucher » là où le manuscrit porte « Forcade », ce qui faisait
   dire à la chronique qu'Albert Forcade était absent du recensement de 1881. Il y figure.
   Les données portent aujourd'hui « Forcade », mais **le complément note toujours la
   correction comme laissée à la validation de Patrick** : la note est en retard sur les
   données. Un mot de confirmation, et le point se ferme.

4. **Quatre contradictions prénom/sexe non tranchées en division 1** : p51 L25 (« Pierre »
   porté F, la colonne 8 y est biffée), p48 L17 (« Maxime » ou « Maxima »), p46 L3,
   p31 L3. Et deux prénoms à soumettre à qui connaît les familles : « Cordulie » (p29 L9),
   qui se lit comme un patronyme, et « Exéar » (p77 L16), vraisemblablement un Elzéar.

5. **La famille 139 de la division 2 figure dans deux maisons**, la 128 et la 129, sous
   le même chef (Demers Jérémie). Ménage réellement à cheval, ou numérotation à reprendre ?
   Non vérifié.

6. **La numérotation des maisons vers la page 40 de la division 1**, où le manuscrit porte
   deux séries — l'une au crayon, l'autre à l'encre. Les données suivent le crayon,
   conformément à la consigne. L'ancrage « maison 188 » n'a jamais pu être réconcilié.

*Note de lecture des chiffres :* le journal de la division 2 annonce 185 lignes
`incertain`, le fichier en porte 152. L'écart est normal et voulu : `fondre.mjs` a versé
les 114 corrections manuelles de Patrick, et **une ligne corrigée à la main perd son
drapeau** — elle est tranchée. Même effet, plus discret, en division 1 (154 annoncées,
153 dans le fichier).

---

## 1871 — jamais relu

**C'est le recensement le moins vérifié des trois, et de loin.** Aucune ligne des deux
divisions ne porte de remarque de relecture au manuscrit : les remarques de la division 1
sont des notes de parenté (« épouse », « pensionnaire »), celles de la division 2 des
traces de provenance du dépouillement (« Partie n p. n demi-cadre bas ; lecture visuelle
du feuillet »). Il n'existe pas de journal `RELECTURE-1871-*`, parce qu'il n'y a pas eu
de campagne.

Les 98 et 547 drapeaux `incertain` viennent du dépouillement lui-même, non d'une
confrontation au manuscrit. **En division 2, plus d'une ligne sur trois est déjà signalée
douteuse par le dépouilleur** — et personne n'est allé voir.

### Anomalies structurelles repérables sans ouvrir le manuscrit

Le formulaire de 1871 compte **20 lignes par page**, non 25. Sur cette base :

- **Division 1, page 31 : cinq lignes en double.** La page porte 25 enregistrements pour
  20 positions ; les lignes 16 à 20 sont revendiquées à la fois par la maison 80
  (Lavarais) et par la maison 81 (Gaudlin), les secondes portant un identifiant en
  `-2` et la remarque « lignes 16-20 en conflit avec la maison 80 — à vérifier au
  manuscrit ». **C'est le seul conflit de position des cinq jeux**, et il ne se règle
  qu'au manuscrit.
- **Division 1, pages incomplètes** : p4 (17 lignes, il manque L1-L3), p61 (il manque L1),
  p64 (il manque L4), p75 (il manque L1-L2), p49 (19 lignes). C'est le signal le plus
  rentable de tout l'outillage — en 1881 il a fait retrouver deux personnes réellement
  omises. **Ici, cinq pages le déclenchent et aucune n'a été examinée.**
- **Division 2, page 33** : 19 lignes.
- **Trous de numérotation** : maisons 55 et 98, familles 52, 102, 103 et 183 en
  division 1 ; maisons 56, 105, 121, 126, 136, 138 et **familles 152 à 158 d'un seul
  tenant** en division 2. Un trou de sept familles consécutives n'est pas une lubie de
  recenseur.

### Champs manquants ou douteux

- **Le lieu de naissance est vide en division 1** : 1 personne sur 1 540 en porte un
  (« États-Unis », p12 L7). La division 2 le porte pour tout le monde. Le site affiche
  pour 1871 une colonne « Né(e) » qui reste blanche sur toute la division 1.
- **La colonne « religion » de la division 1 porte la valeur « Prêtre »** sur une ligne :
  une profession tombée dans la mauvaise colonne au dépouillement.
- **46 personnes de la division 2 n'ont pas d'âge**, et 92 portent un âge ajusté d'après
  le rapport (`age_ajuste_rapport`), l'âge d'origine étant conservé à côté.
- **`sait_lire` / `sait_ecrire` de 1871 ne valent que pour les adultes.** Le formulaire
  demandait « 20 ans et plus, ne sachant pas lire ». Pour les 1 570 personnes de moins de
  20 ans, le `true` produit par la conversion en polarité positive **n'est pas une donnée
  du manuscrit**. L'atelier affiche « s.o. » ; toute statistique doit filtrer sur
  `age >= 20`. Ce n'est pas un défaut à corriger, c'est un piège à ne pas oublier.

---

## Dans quel ordre

~~1. **Verser les compléments de 1881 aux fiches publiques.**~~ **Fait.** Neuf colonnes
au lieu de cinq sur 3 592 des 3 641 fiches, sans ouvrir une image — et trois défauts de
rattachement trouvés au passage.

~~2. **Normaliser les colonnes 21-22 de 1891 aux pages 42-83.**~~ **Fait.** 472 lignes,
la bande est complète.

Ce qui vient ensuite, dans l'ordre où je le ferais :

3. **Le comptage de lignes de 1871**, cinq pages en division 1 et une en division 2, plus
   le conflit de la page 31. Peu de pages, fort rendement : c'est ainsi qu'on retrouve
   des personnes omises.
4. **Les pages 82 et 83 de 1881 division 1**, dont le complément décrit des personnes que
   le registre ne contient pas. Deux pages, mais elles peuvent cacher un ménage perdu au
   dépouillement — c'est le genre de trouvaille qui a rendu la famille 222 à la
   division 1.
5. **La passe des professions de 1881 division 1** — 88 pages, colonne 14, méthode
   éprouvée sur la colonne 4 de 1891.
6. **La relecture de 1871**, les deux divisions, 151 pages. Le gros morceau.
7. **Le dépouillement de 1891 division 2**, s'il existe un manuscrit à dépouiller.

## Ce qu'il faut me fournir

Les scripts retrouvent les PDF tout seuls par leur nom, mais **les fichiers joints ne
suivent pas d'une conversation à l'autre**. Pour les points 3 à 7 il faut donc rattacher
les recueils correspondants : les PDF du manuscrit de **1871, divisions 1 et 2** (aucun
n'est disponible dans cette session), et ceux de **1881 division 1** pour les pages 82-83
et pour la passe des professions.
