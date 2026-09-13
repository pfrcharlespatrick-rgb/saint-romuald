# Reprise des rattachements lieu ↔ maison

*Établi le 2026-09-13 par `outils/lieux/rapprocher.mjs`, sur les cinq recensements dépouillés.*

Les occupations de la couche des lieux ont été posées en août 2026, à partir
des propositions de la brochure Bussière. Les recensements ont été relus depuis :
des sexes rétablis, des prénoms tranchés, des colonnes reprises. Ce rapport rejoue
les rapprochements sur les données d'aujourd'hui.

**Rien ici ne vaut décision.** Une proposition « forte » reste une proposition :
elle dit qu'un homme du même nom, du même âge, entouré des mêmes gens, se trouve
là au recensement suivant. Elle ne dit pas qu'il n'a pas déménagé dans la maison
d'à côté. C'est à Patrick de trancher, à l'atelier de la carte.

---

## 1. Continuité — les maillons manquants

Un lieu déjà rattaché désigne un ménage. On suit ce ménage dans les années où le
lieu ne porte rien. L'ancre est un rattachement déjà admis, non un nom lu dans une
brochure : c'est la passe la plus sûre.

Aucune : chaque lieu rattaché l'est déjà pour les trois recensements.

---

## 2. Ce qui ne tient plus — rattachements déjà en place

Ces rattachements figurent aujourd'hui dans la couche des lieux. Confrontés à
la date de construction du bâtiment, ils sont impossibles. Ils viennent des
propositions de la brochure, qui rattachait un nom à une adresse sans dater le
rattachement — c'est exactement le défaut que la couche des lieux a été écrite
pour corriger.

Aucune : tous les rattachements en place sont compatibles avec la date de bâti.

---

## 3. Une maison, deux emplacements

Une maison de recensement se tient à un seul endroit. Quand elle est rattachée à
plusieurs lieux, au moins un des rattachements est faux — le plus souvent parce
qu'un fils recensé chez son père a été porté au crédit de la maison qu'il
habitera plus tard.

Aucune : chaque maison rattachée ne l'est qu'à un seul lieu.

---

## 4. Écarté en chemin

**Refusés à la main** (3). La reprise les a retrouvés et s'est arrêtée : ils figurent dans `ECARTES`, en tête de `outils/lieux/rapprocher.mjs`, avec le motif du refus.

- Première centrale téléphonique — 1871, maison 9 : trois Joseph Roberge chefs de ménage coexistent en 1871 *(refusé le 2026-09-13)*.
- Première centrale téléphonique — 1881, maison 32 : deux Joseph Roberge chefs de ménage en 1881 *(refusé le 2026-09-13)*.
- Maison de Lauréat Vallière — 1871, maison 94 : deux Vallières chefs de ménage en 1871 *(refusé le 2026-09-13)*.
- Maison de Pierre Cantin — 1871, maison 18 : ménage de Narcisse Cantin ; Pierre y a trois ans *(refusé le 2026-09-13)*.
- Maison de Pierre Cantin — 1891, maison 291 : ménage de Narcisse Cantin ; Pierre y est étudiant chez son père *(refusé le 2026-09-13)*.
- Bâtiment commercial de la famille Lee — 1871, maison 78 : bâtiment commercial de v.1925 *(refusé le 2026-09-13)*.
- Bâtiment commercial de la famille Lee — 1891, maison 405 : bâtiment commercial de v.1925 *(refusé le 2026-09-13)*.
- Villas jumelles — 1881, maison 244 : villas bâties en 1908-1909 *(refusé le 2026-09-13)*.
- Villas jumelles — 1891, maison 622 : villas bâties en 1908-1909 *(refusé le 2026-09-13)*.
- Maison du Dr Joseph Alphonse Villeneuve — 1891, maison 67 : maison de v.1910 ; Alphonse Villeneuve est chez son père *(refusé le 2026-09-13)*.
- Maison de Joseph Villeneuve — 1891, maison 67 : ménage de Ferdinand Villeneuve ; Joseph y est chez son père *(refusé le 2026-09-13)*.


Ce que la reprise a trouvé puis rejeté, et pourquoi. C'est la part la plus utile
du rapport : elle dit ce qu'un rapprochement naïf aurait écrit.

**Dates et statuts.**

- La maison Saint-Hilaire — 1871 : bâti en v.1880, soit 9 an(s) après le recensement de 1871.
- La maison Demers — 1871 : Louis Demers y est recensé sans être chef de ménage (1871, division 1, maison 66) — il y loge, il n'y tient pas maison.
- La maison du curé Sax — 1871 : bâti en 1877, soit 6 an(s) après le recensement de 1871.

**Maisons déjà prises ailleurs.** Le ménage s'y retrouve, mais la maison appartient déjà à un autre emplacement : c'est le signe d'un déménagement, ou d'une erreur à trancher.

- Manoir Longwood — 1881, division 2, maison 237 : Edouard Benson y est bien, mais la maison est déjà rattachée à Maison Benson.

---

## 5. Amorce — les lieux sans aucun rattachement

Ces lieux portent un nom dans leur titre ou leurs personnages, et ce nom se trouve
au recensement. **Ce sont des pistes, pas des rapprochements** : « Maison d'Albert
Forcade » nomme celui qui l'a bâtie ou qui l'a marquée, pas nécessairement celui
qu'on y recense telle année. Rien n'est versé automatiquement.

### Vestiges de l'industrie du bois — 1719 et 1720, chemin du Fleuve

- **bois** → 5 ménages : 1871 D2 maison 4 (Célestin Bois, 40 a., Journalier) ; 1871 D2 maison 165 [?] (Louis Bois, 21 a., Journalier) ; 1881 D1 maison 118 (Célestin Bois, 49 a., Journalier) ; 1881 D1 maison 218 (Elzéar Bois, 33 a., Journalier) ; 1891 D1 maison 364 (Émélie Bois, 44 a.)

### Maison de Pierre Cantin — 2052, chemin du Fleuve

> Pierre Cantin, avocat, fils de Narcisse Cantin et Euphrosine Bégin

- **Pierre Cantin** → 3 ménages : 1871 D2 maison 6 (Pierre Cantin, 64 a., Cultivateur) ; 1881 D1 maison 190 (Pierre Cantin, 47 a., Journalier) ; 1881 D2 maison 225 (Pierre Cantin, 71 a., Cultivateur)
- **Narcisse Cantin** → 3 ménages : 1871 D1 maison 18 (Narcisse Cantin, 40 a., Cultivateur) ; 1881 D1 maison 33 (Narcisse Cantin, 50 a., Cultivateur) ; 1891 D1 maison 291 (Narcisse Cantin, 59 a., Cultivateur)

### Bâtiment commercial de la famille Lee — 2058-2060, chemin du Fleuve

> Famille Lee

- **Lee** → 6 ménages : 1871 D2 maison 78 (Thomas Lee, 42 a., Navigateur) ; 1881 D2 maison 106 (Marguerite Lee, 48 a.) ; 1891 D1 maison 310 (William Lee, 32 a., Débardeur) ; 1891 D1 maison 405 (Thomas Lee, 34 a., Débardeur) ; 1891 D1 maison 512 (Robert Lee, 29 a., Débardeur) ; 1891 D1 maison 540 (Margaret Lee, 57 a.)

### Villas jumelles — 2071 et 2065, chemin du Fleuve

> Terrains de Narcisse Cantin, cultivateur ; construites par Joseph Lacroix (2071) et Ferdinand St-Hilaire (2065)

- **Narcisse Cantin** → 3 ménages : 1871 D1 maison 18 (Narcisse Cantin, 40 a., Cultivateur) ; 1881 D1 maison 33 (Narcisse Cantin, 50 a., Cultivateur) ; 1891 D1 maison 291 (Narcisse Cantin, 59 a., Cultivateur)

### L'hôtel de ville — 2175, chemin du Fleuve

> Henry Atkinson II, maire ; architecte Eugène M. Talbot

- **Henry Atkinson** → 3 ménages : 1871 D1 maison 214 (Henry Atkinson, 38 a., Bourgeois) ; 1881 D1 maison 349 (Henry Atkinson, 48 a., Marchand de bois) ; 1891 D1 maison 440 (Henry Atkinson, 59 a., Marchand de bois)
- **Talbot** → 1 ménage : 1881 D1 maison 131 (Alphonse Talbot, 69 a., Charretier)

### Maison du Dr Joseph Alphonse Villeneuve — 2416, chemin du Fleuve

> Dr Joseph Alphonse Villeneuve, fils de Ferdinand Villeneuve et Odile Morin

- **Ferdinand Villeneuve** → 3 ménages : 1871 D1 maison 33 (Ferdinand Villeneuve, 39 a., Sculpteur) ; 1881 D1 maison 286 (Ferdinand Villeneuve, 49 a., Architecte) ; 1891 D1 maison 67 (Ferdinand Villeneuve, 59 a., Architecte-sculpteur-doreur d'églises)

### Maison de Joseph Villeneuve — 2426, chemin du Fleuve

> Joseph Villeneuve, entrepreneur, fils de Ferdinand Villeneuve (architecte-sculpteur, atelier fondé 1852, maire de la paroisse en 1879)

- **Ferdinand Villeneuve** → 3 ménages : 1871 D1 maison 33 (Ferdinand Villeneuve, 39 a., Sculpteur) ; 1881 D1 maison 286 (Ferdinand Villeneuve, 49 a., Architecte) ; 1891 D1 maison 67 (Ferdinand Villeneuve, 59 a., Architecte-sculpteur-doreur d'églises)

### La Boulangerie Gagnon — 2479, chemin du Fleuve

> Joseph Gagnon et Célina Cadoret (achat 1925, d'Adjutor Cadoret)

- **Joseph Gagnon** → 6 ménages : 1871 D1 maison 149 (Joseph Gagnon, 26 a., Journalier) ; 1871 D1 maison 153 (Joseph Gagnon, 58 a., Journalier) ; 1881 D1 maison 96 (Joseph Gagnon, 51 a., Journalier) ; 1881 D1 maison 311 (Joseph Gagnon, 65 a., Journalier) ; 1881 D2 maison 138 (Joseph Gagnon, 26 a., Navigateur) ; 1891 D1 maison 167 (Joseph Gagnon, 74 a., Journalier)
- **Célina Cadoret** → 1 ménage : 1881 D1 maison 219 (Délina Cadoret, 32 a., Blanchisseuse)
- **Cadoret** → 14 ménages : 1871 D1 maison 47 (Joseph Cadoret, 28 a., Journalier) ; 1871 D2 maison 71 (Louis Cadoret, 70 a., Journalier) ; 1871 D2 maison 87 (Paul Cadoret, 30 a., Journalier) ; 1871 D2 maison 93 (Jacques [?] Cadoret, 40 a., Journalier) ; 1871 D2 maison 103 (George Cadoret, 48 a., Journalier) ; 1871 D2 maison 107 (Michel Cadoret, 30 a., Journalier) ; 1871 D2 maison 120 (Louis Cadoret, 44 a., [illisible] [?]) ; 1871 D2 maison 137 (Nazaire Cadoret, 26 a.) ; 1881 D1 maison 219 (Délina Cadoret, 32 a., Blanchisseuse) ; 1891 D1 maison 487 (Michel Cadoret, 53 a., Journalier) ; 1891 D1 maison 499 (Paul Cadoret, 58 a., Journalier) ; 1891 D1 maison 501 (Philippe Cadoret, 29 a., Débardeur) ; 1891 D1 maison 532 (Archille Cadoret, 27 a., Débardeur) ; 1891 D1 maison 535 (Jacque Cadoret, 60 a., Débardeur)

### Maison du Dr Michel P. Lambert — 2547, chemin du Fleuve

> Dr Michel P. Lambert, fils de Julien Lambert et Suzanne Roberge

- **Julien** → 1 ménage : 1871 D1 maison 152 (Joseph Julien, 37 a., Boucher)
- **Julien Lambert** → 4 ménages : 1871 D1 maison 10 (Julien Lambert, 66 a., Cultivateur) ; 1881 D2 maison 6 (Julien Lambert, 77 a., Journalier) ; 1881 D2 maison 183 (Julien Lambert, 34 a., Journalier) ; 1891 D1 maison 448 (Julien Lambert, 45 a., Navigateur)

### L'Anglican Christ'Church — 120, Côte Rouge

- **John Ritchie** → 1 ménage : 1871 D1 maison 207 (John Ritchie, 35 a., Bourgeois)

### Maison-école — 83, rue Saint-Damase

> Famille McReady (magasin général au 1588, chemin du Fleuve, même emplacement que la 2e école)

- **McReady** → 13 ménages : 1871 D2 maison 58 (John Macready, 50 a., Timber Tower) ; 1871 D2 maison 75 (Robert Macready, 39 a., Marchand) ; 1881 D2 maison 67 (Napoléon McCready, 30 a., Charcuterie) ; 1881 D2 maison 71 (Robert McCready, 50 a., Marchand) ; 1881 D2 maison 72 (Rose Delima McCready, 60 a., Navigateur) ; 1881 D2 maison 73 (Edouard McCready, 27 a.) ; 1881 D2 maison 149 (Henry McCready, 25 a., Journalier) ; 1891 D1 maison 473 (Johnny McCready, 35 a., Débardeur) ; 1891 D1 maison 502 (Delima McReady, 66 a.) ; 1891 D1 maison 504 (Éléonore McReady, 56 a., Marchande) ; 1891 D1 maison 510 (Edouard McReady, 36 a., Commerçant) ; 1891 D1 maison 511 (Napoleon McReady, 40 a., Marchand général) ; 1891 D1 maison 530 (Peter McCready, 35 a., Débardeur)
- **Robert MacReady** → 2 ménages : 1871 D2 maison 75 (Robert Macready, 39 a., Marchand) ; 1881 D2 maison 71 (Robert McCready, 50 a., Marchand)

### Maison d'École — 2211, rue Saint-Jean-Baptiste

- **Benjamin Demers** → 1 ménage : 1871 D1 maison 66 (Benjamin Demers, 48 a., Cultivateur)
- **Julien Demers** → 3 ménages : 1881 D1 maison 67 (L.Julien Demers, 31 a., Marchand) ; 1881 D1 maison 205 (Julie Demers, 54 a.) ; 1891 D1 maison 129 (Louis Julien Demers, 41 a., Marchand de marchandises sèches)
