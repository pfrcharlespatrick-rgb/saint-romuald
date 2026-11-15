# Contrôle des croisements

Produit par `node outils/controle-croisements.mjs` le 2026-11-15. Ne pas le
corriger à la main : il est réécrit à chaque passage, et se vide à mesure que les
questions sont tranchées.

Il dresse la liste de ce que les données ne se disent pas encore entre elles —
ou se disent de travers. **Rien de ce qui suit n'a été modifié d'office** : chaque
section dit où la décision se prend.

| Section | À regarder |
|---|---|
| Corrections manuelles à relire | 0 |
| Rapprochements proposés par le ménage | 0 |
| Décès de 1871 sans maison | 16 |
| Documents : la même personne, rattachée dans une fiche et pas dans l'autre | 9 |
| Lignes incomplètes ou renvois cassés | 10 |
| Lignes incertaines qu'un document éclaire | 4 |
| Signature au bas des actes et « sait écrire » au recensement | 16 |
| Documents : le nom écrit n'est pas celui de la ligne rattachée | 5 |
| Naissances et décès connus, face au recensement | 4 |
| Identité dite par un document, sans lien entre les recensements | 2 |
| Le sexe ne suit pas — d'un recensement à l'autre, ou sur la ligne même | 11 |
| L'âge ne suit pas le long d'un lien | 59 |
| Le même ménage, un chef dont l'âge ne suit pas | 31 |
| Numéros de maison et de famille : trous et numéros douteux | 7 |

État des rapprochements entre recensements : 2910 liens, dont 2641 de
confiance forte, 268 moyenne, 158 confirmés à la main,
0 proposés par le ménage ; 37 veuvages, 31 âges à vérifier.

## Corrections manuelles à relire — 0

Le prénom posé à la main ne s'accorde pas avec le sexe de la ligne. Rien n'a été modifié : la main l'emporte, c'est à elle de se relire.

**Où trancher :** dans l'atelier, sur la ligne indiquée.

Rien à signaler.

## Rapprochements proposés par le ménage — 0

Le nom seul ne reliait pas ces deux mentions ; le ménage, lui, les désigne : seule personne du foyer dont le sexe et l'âge concordent, quand deux autres membres au moins se retrouvent ensemble. Confiance « moyenne », à confirmer ou à écarter (voir docs/FILIATION.md, « Compléter les ménages reconnus »).

**Où trancher :** dans l'annexe des filiations (boutons Confirmer / Écarter).

Rien à signaler.

## Décès de 1871 sans maison — 16

Le tableau 2 ne renvoie à aucune maison. Un rattachement n'est proposé d'office que lorsqu'un seul ménage de la paroisse porte le nom ; les autres attendent un acte.

**Où trancher :** dans `data/annexe-deces-data.js` (champ `ref_maison`), une fois l'acte de sépulture trouvé.

| Défunt | Mois et cause | Ménages possibles |
|---|---|---|
| George Boucher, 1 ans | Février — Grippe | 20 ménage(s) de ce nom : div. 1, maison 2 ; div. 1, maison 15 ; div. 1, maison 19 ; div. 1, maison 70 ; div. 1, maison 111 ; div. 1, maison 140 ; … |
| Louis Beaulieu, 2 ans | Novembre — Rougeole | 4 ménage(s) de ce nom : div. 1, maison 1 ; div. 1, maison 22 ; div. 1, maison 35 ; div. 1, maison 144 |
| Achille Pelletier, 2 mois | Août — Fièvre | aucun ménage de ce nom au recensement — graphie à vérifier |
| Joseph Pelletier, 7 mois | Novembre — Maladie inconnue | aucun ménage de ce nom au recensement — graphie à vérifier |
| Emélie Blais, 1 ans | Mars — Rougeole | 2 ménage(s) de ce nom : div. 1, maison 43 ; div. 1, maison 47 |
| Ursule Mariage, 2 ans | Mars — Rougeole | 3 ménage(s) de ce nom : div. 1, maison 46 ; div. 1, maison 68 ; div. 1, maison 155 |
| Ursule Blais, 25 ans | Janvier — Consomption | 2 ménage(s) de ce nom : div. 1, maison 43 ; div. 1, maison 47 |
| Aurélie Larochelle, 1 ans | Août — Coqueluche | 3 ménage(s) de ce nom : div. 1, maison 54 ; div. 1, maison 57 ; div. 1, maison 150 |
| Louis Cantin, 86 ans | Mars — Mort par suite du grand âge | 12 ménage(s) de ce nom : div. 1, maison 18 ; div. 1, maison 28 ; div. 1, maison 42 ; div. 1, maison 63 ; div. 1, maison 89 ; div. 2, maison 6 ; … |
| Emma Poulin, 2 ans | Novembre — Fièvre typhoïde | aucun ménage de ce nom au recensement — graphie à vérifier |
| Célanire Bilodeau, 1 ans | Septembre — Maladie inconnue | 4 ménage(s) de ce nom : div. 1, maison 68 ; div. 2, maison 84 ; div. 2, maison 88 ; div. 2, maison 89 |
| George Paradis, 2 mois | Juin — Rougeole | 8 ménage(s) de ce nom : div. 1, maison 47 ; div. 1, maison 71 ; div. 1, maison 88 ; div. 1, maison 207 ; div. 1, maison 213 ; div. 1, maison 219 ; … |
| Napoléon Paradis, 4 ans | Février — Rougeole | 8 ménage(s) de ce nom : div. 1, maison 47 ; div. 1, maison 71 ; div. 1, maison 88 ; div. 1, maison 207 ; div. 1, maison 213 ; div. 1, maison 219 ; … |
| Joseph Paradis, 4 mois | Avril — Rougeole | 8 ménage(s) de ce nom : div. 1, maison 47 ; div. 1, maison 71 ; div. 1, maison 88 ; div. 1, maison 207 ; div. 1, maison 213 ; div. 1, maison 219 ; … |
| Magdeleine Demers, 78 ans | Novembre — Apoplexie | 14 ménage(s) de ce nom : div. 1, maison 12 ; div. 1, maison 17 ; div. 1, maison 18 ; div. 1, maison 43 ; div. 1, maison 50 ; div. 1, maison 66 ; … |
| Marguerite Cantin, 38 ans | Mars — Pleurésie | 12 ménage(s) de ce nom : div. 1, maison 18 ; div. 1, maison 28 ; div. 1, maison 42 ; div. 1, maison 63 ; div. 1, maison 89 ; div. 2, maison 6 ; … |

## Documents : la même personne, rattachée dans une fiche et pas dans l'autre — 9

Le même nom porte un rattachement au recensement dans un autre document. Ce peut être la même personne — ou un homonyme : à vérifier avant de verser.

**Où trancher :** dans `documents/manifeste.json` (champ `ref_personne`).

| Document | Personne | Rattachée ailleurs à | Note de la fiche |
|---|---|---|---|
| geni-julien-louis-julien-roberge | Magloire Roberge (enfant) | `1881-D2-P037-L23` (Magloire Roberge, 61 ans, fiche « roberge-fratrie-julien-1881 ») ; `1871-D2-P016-L18` (Magloire Roberge, 50 ans, fiche « notarie-1874-06-22-resiliation-roberge ») |  |
| geni-julien-louis-julien-roberge | Hubert Roberge (enfant) | `1871-D2-P029-L19` (Hubert Roberge, 29 ans, fiche « geni-hubert-roberge-fils-sara-porter ») ; `1871-D2-P016-L08` (Hubert Roberge, 33 ans, fiche « notarie-1874-02-18-accord-masse-croteau ») | Père d'Hubert William Roberge (voir geni-hubert-roberge-pere-isabelle-burroughs et geni-hubert-roberge-fils-sara-porter). |
| geni-julien-louis-julien-roberge | Julien Roberge (enfant) | `1881-D2-P038-L20` (Julien Roberge, 52 ans, fiche « roberge-fratrie-julien-1881 ») |  |
| geni-hubert-roberge-pere-isabelle-burroughs | Hubert Roberge (sujet) | `1871-D2-P029-L19` (Hubert Roberge, 29 ans, fiche « geni-hubert-roberge-fils-sara-porter ») ; `1871-D2-P016-L08` (Hubert Roberge, 33 ans, fiche « notarie-1874-02-18-accord-masse-croteau ») | Né à St-Nicolas. Non nommément rattaché ; identifié par hypothèse à 1871-D2-P020-L09 — voir affirmation ci-dessous. |
| geni-hubert-roberge-pere-isabelle-burroughs | Magloire Roberge (frere) | `1881-D2-P037-L23` (Magloire Roberge, 61 ans, fiche « roberge-fratrie-julien-1881 ») ; `1871-D2-P016-L18` (Magloire Roberge, 50 ans, fiche « notarie-1874-06-22-resiliation-roberge ») |  |
| geni-hubert-roberge-pere-isabelle-burroughs | Julien Roberge (frere) | `1881-D2-P038-L20` (Julien Roberge, 52 ans, fiche « roberge-fratrie-julien-1881 ») |  |
| geni-hubert-roberge-fils-sara-porter | Hubert Roberge (père) (pere) | `1871-D2-P020-L09` (Hubert Roberge, 54 ans, fiche « sthilaire-2010-magdeleine-delisle ») | Voir geni-hubert-roberge-pere-isabelle-burroughs. |
| geni-rose-delima-roberge-hardy | Hubert Roberge (frere) | `1871-D2-P029-L19` (Hubert Roberge, 29 ans, fiche « geni-hubert-roberge-fils-sara-porter ») ; `1871-D2-P016-L08` (Hubert Roberge, 33 ans, fiche « notarie-1874-02-18-accord-masse-croteau ») | Voir geni-hubert-roberge-pere-isabelle-burroughs. |
| notarie-1874-01-10-donation-cadoret-cantin | Benjamin Demers (voisin) | `1871-D1-P025-L04` (Benjamin Demers, 48 ans, fiche « notarie-1873-12-03-depot-bourassa-demers ») |  |

## Lignes incomplètes ou renvois cassés — 10

Ce qu'un contrôle mécanique relève : un prénom manquant, un sexe douteux, un renvoi vers un identifiant disparu.

**Où trancher :** dans l'atelier pour une ligne de recensement ; dans le fichier nommé pour un renvoi.

| Où | Qui | Ce qui cloche |
|---|---|---|
| `1871-D2-P039-L19` | Marguerite [?] Roberge | sexe noté « F [?] » : compté comme inconnu dans les statistiques et les filiations |
| `1871-D2-P043-L04` | Philomène Cantin | 9 ans et dit marié(e) — 1871, div. 2, maison 107, p. 43 l. 4 |
| `1871-D2-P046-L19` | Isaïe [?] Girard | sexe noté « M [?] » : compté comme inconnu dans les statistiques et les filiations |
| `1871-D2-P064-L10` | Etienne [?] Cantin | sexe noté « M [?] » : compté comme inconnu dans les statistiques et les filiations |
| `1871-D2-P068-L09` | Malcolm [?] Slater [?] | sexe noté « M [?] » : compté comme inconnu dans les statistiques et les filiations |
| `1871-D2-P071-L19` | Louise [?] Demers | sexe noté « F [?] » : compté comme inconnu dans les statistiques et les filiations |
| `1881-D1-P085-L21` | Esther | prénom vide — 1881, div. 1, maison 342, p. 85 l. 21 |
| `1891-D1-P013-L17` | Lefebvre | prénom vide — 1891, div. 1, maison 52, p. 13 l. 17 |
| `1891-D1-P111-L25` | Daggs | prénom vide — 1891, div. 1, maison 496, p. 111 l. 25 |
| 1881-D2, famille 139 | — | même numéro de famille dans les maisons 128 et 129 |

## Lignes incertaines qu'un document éclaire — 4

Le dépouillement a laissé un « [?] » sur ces lignes, et un acte versé depuis nomme la même personne en toutes lettres. La ligne n'a pas été touchée : c'est à la main de dire si le doute est levé.

**Où trancher :** dans l'atelier, sur la ligne indiquée : retirer le « [?] » ou corriger la valeur.

| Ligne | Le recensement porte | Reste douteux | Ce que disent les documents |
|---|---|---|---|
| `1871-D2-P068-L02` — 1871, div. 2, maison 158 [?], p. 68 l. 2 | Bourassa, Romuald [?], 13 ans | le prénom | écrit « Romuald Bourassa » dans acte n° 119 du 1874-05-22, acte n° 42 du 1874-02-27 et 2 autre(s) — Le prénom lu « Romuald [?] » en 1871 est bien Romuald. |
| `1871-D2-P069-L05` — 1871, div. 2, maison 162 [?], p. 69 l. 5 | Voyer [?], Thomas, 37 ans, M, Menuisier | le nom | écrit « Thomas Voyer » dans acte n° 58 du 1874-03-11 — Le patronyme « Voyer [?] » du dépouillement de 1871 (division 2, maison 162) est confirmé par l'acte, qui écrit plusieurs fois « Thomas Voyer » en toutes lettres. |
| `1871-D2-P039-L19` — 1871, div. 2, maison 101, p. 39 l. 19 | Roberge, Marguerite [?], 45 [?] ans, V [?], Marchande [?] | le prénom, l'âge, le sexe, l'état matrimonial, le métier | écrit « Marguerite Roberge » dans acte n° 173 du 1874-08-25, acte n° 174 du 1874-08-25 — La « marchande [?] » Marguerite Roberge de 1871 (division 2, maison 101) est sans doute célibataire (« fille majeure ») et non veuve, comme le dépouillement le propose avec réserve. |
| `1871-D2-P061-L03` — 1871, div. 2, maison 136, p. 61 l. 3 | Martel, Régis, 54 [?] ans, M, Menuisier | l'âge | écrit « Régis Martel » dans acte n° 220 du 1874-10-10 — Meublier de Saint-Romuald ; a construit la maison de Filteau ; signe. Le menuisier de 54 ans de 1871 (division 2, maison 136) et de 65 ans en 1881 ; rattachement probable. |

## Signature au bas des actes et « sait écrire » au recensement — 16

Les actes disent qui signe et qui « a déclaré ne le savoir ». Sur 74 personnes rattachées dont le recensement dit si elles écrivent, 58 s'accordent avec leurs actes ; les autres sont ici. Signer n'est pas écrire, et le recenseur a pu omettre une marque : chaque ligne demande le manuscrit.

**Où trancher :** au manuscrit, dans les colonnes d'instruction ; puis dans l'atelier si la marque est à déplacer.

| Ligne | Qui | Le recensement dit | Les actes disent | Indice |
|---|---|---|---|---|
| `1871-D2-P067-L20` — 1871, div. 2, maison 158 [?], p. 67 l. 20 | Marguerite Bourassa, 41 ans | sait lire et écrire | ne sait pas signer — 1 acte(s) : acte n° 42 du 1874-02-27 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |
| `1871-D1-P008-L01` — 1871, div. 1, maison 18, p. 8 l. 1 | Ferdinand Demers, 35 ans, domestique | sait lire et écrire | ne sait pas signer — 1 acte(s) : acte n° 11 du 1873-11-27 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |
| `1871-D1-P025-L04` — 1871, div. 1, maison 66, p. 25 l. 4 | Benjamin Demers, 48 ans, cultivateur | ne sait ni lire ni écrire | signe — 31 acte(s) : acte n° 12 du 1873-12-03, acte n° 51 du 1874-03-06 et 29 autre(s) | la marque « ne sait pas » est peut-être celle d'une ligne voisine — colonnes 18 et 19 |
| `1871-D1-P035-L19` — 1871, div. 1, maison 92, p. 35 l. 19 | Joseph Langelier, 44 ans, forgeron | ne sait ni lire ni écrire | signe — 1 acte(s) : acte n° 37 du 1874-02-21 | la marque « ne sait pas » est peut-être celle d'une ligne voisine — colonnes 18 et 19 |
| `1871-D1-P024-L20` — 1871, div. 1, maison 65, p. 24 l. 20 | Angélique Boutin, 52 ans | sait lire et écrire | ne sait pas signer — 2 acte(s) : acte n° 47 du 1874-03-02, acte n° 139 du 1874-07-07 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |
| `1871-D2-P020-L20` — 1871, div. 2, maison 52, p. 20 l. 20 | Thomas Proulx, 52 ans, menuisier | sait lire et écrire | ne sait pas signer — 1 acte(s) : acte n° 72 du 1874-03-21 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |
| `1871-D2-P022-L05` — 1871, div. 2, maison 55, p. 22 l. 5 | Patrick Esmond, 25 ans, journalier | sait lire et écrire | ne sait pas signer — 1 acte(s) : acte n° 74 du 1874-03-21 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |
| `1871-D2-P016-L05` — 1871, div. 2, maison 40, p. 16 l. 5 | J. Baptiste Croteau, 23 ans, navigateur | sait lire et écrire | ne sait pas signer — 1 acte(s) : acte n° 80 du 1874-04-04 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |
| `1871-D1-P032-L06` — 1871, div. 1, maison 82, p. 32 l. 6 | François Dubé, 36 ans, journalier | sait lire et écrire | ne sait pas signer — 1 acte(s) : acte n° 92 du 1874-04-24 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |
| `1871-D1-P032-L07` — 1871, div. 1, maison 82, p. 32 l. 7 | Philomène Dubé, 25 ans | sait lire et écrire | ne sait pas signer — 1 acte(s) : acte n° 92 du 1874-04-24 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |
| `1871-D1-P023-L15` — 1871, div. 1, maison 59, p. 23 l. 15 | Charles Filteau, 20 ans, journalier | sait lire et écrire | ne signe pas dans acte n° 140 du 1874-07-11, mais signe dans acte n° 180 du 1874-09-03, acte n° 184 du 1874-09-12 et 1 autre(s) | les actes se contredisent entre eux : relire la fiche de l'acte, ou deux personnes du même nom |
| `1871-D1-P025-L19` — 1871, div. 1, maison 68, p. 25 l. 19 | George Bilodeau, 36 ans, menuisier | sait lire et écrire | ne sait pas signer — 2 acte(s) : acte n° 145 du 1874-07-13, acte n° 190 du 1874-09-18 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |
| `1871-D1-P021-L07` — 1871, div. 1, maison 51, p. 21 l. 7 | Antoine Toussaint, 58 ans, charretier | sait lire et écrire | ne sait pas signer — 2 acte(s) : acte n° 147 du 1874-07-18, acte n° 148 du 1874-07-18 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |
| `1871-D1-P019-L03` — 1871, div. 1, maison 47, p. 19 l. 3 | Michel Blais, 40 ans, journalier | sait lire et écrire | ne sait pas signer — 1 acte(s) : acte n° 154 du 1874-07-20 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |
| `1871-D1-P028-L13` — 1871, div. 1, maison 73, p. 28 l. 13 | Michel Larivée, 50 ans, journalier | sait lire et écrire | ne sait pas signer — 1 acte(s) : acte n° 156 du 1874-07-20 | la ligne voisine (l. 14, Marie) porte la marque « ne sait pas écrire » : marque peut-être décalée d'un rang — colonnes 18 et 19 |
| `1871-D2-P039-L19` — 1871, div. 2, maison 101, p. 39 l. 19 | Marguerite [?] Roberge, 45 [?] ans, marchande [?] | sait lire et écrire | ne sait pas signer — 1 acte(s) : acte n° 173 du 1874-08-25 | aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — colonnes 18 et 19 |

## Documents : le nom écrit n'est pas celui de la ligne rattachée — 5

La fiche d'un document rattache une personne à une ligne dont le prénom (ou, pour un homme, le patronyme) n'est pas le sien. Trois cas : la ligne du recensement est mal lue ; la fiche reprend une lecture que la relecture a corrigée depuis ; ou le rattachement vise la mauvaise ligne.

**Où trancher :** au manuscrit pour la ligne ; dans `documents/manifeste.json` si c'est la fiche qui porte une ancienne lecture ou un rattachement à défaire.

| Document | Le document écrit | La ligne rattachée | Ce qui diffère | Note de la fiche |
|---|---|---|---|---|
| « roberge-fratrie-julien-1881 » (recensement, 1881-04-19) | Victoria Roberge (epouse) | `1881-D2-P037-L24` — Delina Roberge, 48 ans — 1881, div. 2, maison 158, p. 37 l. 24 | prénom différent |  |
| « roberge-fratrie-julien-1881 » (recensement, 1881-04-19) | Roberge (prénom lu « Odinelie ») (enfant) | `1881-D2-P038-L23` — Aurélie Roberge, 18 ans — 1881, div. 2, maison 162, p. 38 l. 23 | prénom différent |  |
| « roberge-fratrie-julien-1881 » (recensement, 1881-04-19) | Elzéar Roberge (enfant) | `1881-D2-P038-L24` — Eléonore Roberge, 14 ans — 1881, div. 2, maison 162, p. 38 l. 24 | prénom différent |  |
| « roberge-fratrie-julien-1881 » (recensement, 1881-04-19) | Roberge (prénom lu « Stbert ») (enfant) | `1881-D2-P038-L25` — Albert Roberge, 12 ans — 1881, div. 2, maison 162, p. 38 l. 25 | prénom voisin, pas identique |  |
| « notarie-1874-07-20-bail-demers-deschenes » (notarie, 1874-07-20) | Augustin Blais (voisin) | `1871-D1-P017-L17` — Auguste Blais, 34 ans — 1871, div. 1, maison 43, p. 17 l. 17 | prénom voisin, pas identique | Voisin à l'ouest, en partie. Rattaché en probable au journalier de 34 ans de 1871 (division 1, maison 43) ; charpentier de 40 ans en 1881 (maison 95), voisin… |

## Naissances et décès connus, face au recensement — 4

Un document donne l'année de naissance ou de décès d'une personne rattachée. L'âge recensé s'en écarte de trois ans ou plus, ou la personne reparaît après sa mort. Les âges du recensement sont approximatifs — deux ou trois ans ne prouvent rien —, mais un écart de cinq ou six ans mérite le manuscrit.

**Où trancher :** au manuscrit pour l'âge ; dans `documents/manifeste.json` ou l'annexe des filiations si c'est le rattachement qui est en cause.

| Document | Ce que dit le document | La ligne rattachée | Ce qui cloche |
|---|---|---|---|
| « familysearch-henriette-eleonore-mcready » | Henriette Éléonore McReady, né(e) 1834-09-28 | `1871-D2-P029-L09` — Eléonore Macready, 31 ans — 1871, div. 2, maison 75, p. 29 l. 9 | 37 ans attendus en 1871, 31 recensés : écart de 6 ans |
| « geni-rose-delima-roberge-hardy » | Rose-De-Lima Délima (de Lima) Roberge, né(e) 1821 | `1871-D2-P019-L01` — Rose Hardy, 45 ans — 1871, div. 2, maison 47, p. 19 l. 1 | 50 ans attendus en 1871, 45 recensés : écart de 5 ans |
| « sthilaire-2010-magdeleine-delisle » | Édouard Pelletier, né(e) 1828-05-10 | `1871-D2-P020-L01` — Edouard Peltier, 46 ans — 1871, div. 2, maison 50, p. 20 l. 1 | 43 ans attendus en 1871, 46 recensés : écart de 3 ans |
| « sthilaire-2010-magdeleine-delisle » | Caroline Pelletier, né(e) 1831 | `1871-D1-P055-L13` — Caroline Peltier, 37 ans — 1871, div. 1, maison 149, p. 55 l. 13 | 40 ans attendus en 1871, 37 recensés : écart de 3 ans |

## Identité dite par un document, sans lien entre les recensements — 2

Un document affirme que deux lignes de deux recensements sont la même personne — le plus souvent une femme qui a changé de nom —, et le calcul des filiations ne les relie pas. Le lien n'a pas été posé d'office : il se confirme à la main.

**Où trancher :** dans l'annexe des filiations, ou en le dictant (« confirme le lien ») — il ira dans `data/decisions-dictees.json`.

| Avant | Après | Document | État | Identifiants |
|---|---|---|---|---|
| Caroline Peltier, 37 ans — 1871, div. 1, maison 149, p. 55 l. 13 | Caroline Forcade, 48 ans — 1881, div. 1, maison 272, p. 70 l. 5 | « sthilaire-2010-magdeleine-delisle » (établi) | aucun lien entre les deux lignes | `1871-D1-P055-L13` → `1881-D1-P070-L05` |
| Caroline Peltier, 37 ans — 1871, div. 1, maison 149, p. 55 l. 13 | Caroline Forcade, 60 ans — 1891, div. 1, maison 105, p. 25 l. 13 | « sthilaire-2010-magdeleine-delisle » (établi) | aucun lien entre les deux lignes | `1871-D1-P055-L13` → `1891-D1-P025-L13` |

## Le sexe ne suit pas — d'un recensement à l'autre, ou sur la ligne même — 11

Deux lignes reliées comme une seule personne ne portent pas le même sexe, ou un prénom presque toujours masculin (ou féminin) porte l'autre sexe. Les filiations comptent ces lignes telles quelles : un garçon noté « F » passe pour une fille dans les statistiques.

**Où trancher :** au manuscrit, colonne du sexe ; dans l'atelier pour corriger la ligne, dans l'annexe des filiations pour écarter le lien.

| Avant | Après | Ce qui cloche | Identifiants |
|---|---|---|---|
| Elise Grégoire, F, 2 ans — 1871, div. 2, maison 85, p. 34 l. 11 | Elisé Grégoire, M, 12 ans — 1881, div. 2, maison 169, p. 40 l. 17 | prénom ou sexe mal lu d'un côté, ou lien à écarter — lien de confiance forte | `1871-D2-P034-L11` → `1881-D2-P040-L17` |
| Margaret Swinton, F, 14 ans — 1871, div. 2, maison 157 [?], p. 67 l. 7 | Maggy Swinton, M, 23 ans — 1881, div. 2, maison 28, p. 7 l. 21 | prénom ou sexe mal lu d'un côté, ou lien à écarter — lien de confiance forte | `1871-D2-P067-L07` → `1881-D2-P007-L21` |
| Pierre Roberge, M, 16 ans — 1871, div. 1, maison 104, p. 39 l. 7 | Pierre Roberge, F, 25 ans, journalier — 1881, div. 1, maison 204, p. 51 l. 25 | le prénom « Pierre » de 1881 ne va pas avec le sexe « F » : c'est sans doute cette ligne — lien de confiance moyenne | `1871-D1-P039-L07` → `1881-D1-P051-L25` |
| Lord Villeneuve, M, 11 ans — 1871, div. 1, maison 33, p. 13 l. 18 | Lora Villeneuve, F, 20 ans — 1881, div. 1, maison 286, p. 73 l. 13 | prénom ou sexe mal lu d'un côté, ou lien à écarter — lien de confiance moyenne | `1871-D1-P013-L18` → `1881-D1-P073-L13` |
| Marie Elizabeth Desroches, M, 4 ans — 1881, div. 1, maison 319, p. 81 l. 7 | Marie Anne Desroches, F, 14 ans — 1891, div. 1, maison 202, p. 48 l. 8 | le prénom « Marie Elizabeth » de 1881 ne va pas avec le sexe « M » : c'est sans doute cette ligne — lien de confiance forte | `1881-D1-P081-L07` → `1891-D1-P048-L08` |
| Wilfride Boucher, F, 8 ans — 1881, div. 2, maison 196, p. 46 l. 10 | Wilfred Boucher, M, 18 ans, journalier — 1891, div. 1, maison 598, p. 134 l. 20 | prénom ou sexe mal lu d'un côté, ou lien à écarter — lien de confiance moyenne | `1881-D2-P046-L10` → `1891-D1-P134-L20` |
| Philippa Couture, F, 5 ans — 1881, div. 2, maison 203, p. 47 l. 25 | Philippe Couture, M, 15 ans, journalier — 1891, div. 1, maison 346, p. 80 l. 9 | prénom ou sexe mal lu d'un côté, ou lien à écarter — lien de confiance moyenne | `1881-D2-P047-L25` → `1891-D1-P080-L09` |
| Wilfride Roberge, F, 8 ans — 1881, div. 2, maison 227, p. 54 l. 13 | Wilfrid Roberge, M, 18 ans, garçon d'écurie — 1891, div. 1, maison 569, p. 128 l. 24 | prénom ou sexe mal lu d'un côté, ou lien à écarter — lien de confiance moyenne | `1881-D2-P054-L13` → `1891-D1-P128-L24` |
| Pierre Roberge, F, 25 ans — 1881, div. 1, maison 204, p. 51 l. 25 | Pierre Roberge, M, 34 ans, contre-maître de manufacture — 1891, div. 1, maison 328, p. 75 l. 5 | le prénom « Pierre » de 1881 ne va pas avec le sexe « F » : c'est sans doute cette ligne — lien de confiance faible | `1881-D1-P051-L25` → `1891-D1-P075-L05` |
| Eva Cadier, M, 4 ans — 1881, div. 1, maison 179, p. 46 l. 3 | — | prénom d'ordinaire féminin, sexe noté « M » : prénom ou sexe à relire | `1881-D1-P046-L03` |
| Marie Xavier Gagnon, M, 33 ans, batelier, chef — 1891, div. 1, maison 492, p. 111 l. 7 | — | prénom d'ordinaire féminin, sexe noté « M » : prénom ou sexe à relire | `1891-D1-P111-L07` |

## L'âge ne suit pas le long d'un lien — 59

Ces deux lignes sont reliées comme une seule personne, mais l'âge avance de six ans de trop ou de trop peu. Chez un adulte c'est souvent le recenseur ; chez un enfant, c'est un chiffre mal lu (1 pour 7, 0 pour 6) ou un frère du même prénom. Les enfants sont en tête.

**Où trancher :** au manuscrit, colonne de l'âge, des deux côtés ; dans l'annexe des filiations si c'est un homonyme (frère, cousin) qu'il faut écarter.

| Avant | Après | Écart | Identifiants |
|---|---|---|---|
| Jacob Boucher, 7/12 — 1871, div. 2, maison 11, p. 5 l. 2 | Jacob Boucher, 11 ans — 1881, div. 2, maison 228, p. 54 l. 19 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1871-D2-P005-L02` → `1881-D2-P054-L19` |
| Ernestine St-Hilaire, 6/12 — 1871, div. 2, maison 17, p. 7 l. 18 | Ernestine St.Hilaire, 10 ans — 1881, div. 2, maison 190, p. 45 l. 8 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1871-D2-P007-L18` → `1881-D2-P045-L08` |
| Edouard Boutet, 9 ans — 1871, div. 1, maison 177, p. 66 l. 16 | Edouard Boutot, 13 ans — 1881, div. 1, maison 240, p. 62 l. 3 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1871-D1-P066-L16` → `1881-D1-P062-L03` |
| François Xavier Boucher, 6 ans — 1871, div. 1, maison 19, p. 8 l. 7 | François Boucher, 10 ans — 1881, div. 1, maison 337, p. 84 l. 22 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1871-D1-P008-L07` → `1881-D1-P084-L22` |
| Marie Samson, 2 ans — 1871, div. 1, maison 24, p. 10 l. 4 | Marie Samson, 18 ans — 1881, div. 2, maison 230, p. 55 l. 8 | 16 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1871-D1-P010-L04` → `1881-D2-P055-L08` |
| Marie Clavette, 7 mois — 1871, div. 1, maison 75, p. 29 l. 17 | Marie Clavette, 4 ans — 1881, div. 1, maison 215, p. 55 l. 1 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1871-D1-P029-L17` → `1881-D1-P055-L01` |
| Marie Montigny, 6 ans — 1871, div. 1, maison 82, p. 32 l. 3 | Marie Louise Montigny, 10 ans — 1881, div. 2, maison 3, p. 1 l. 22 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1871-D1-P032-L03` → `1881-D2-P001-L22` |
| John Bernier, 7 ans — 1871, div. 1, maison 107, p. 40 l. 15 | J.Baptiste Bernier, 23 ans — 1881, div. 1, maison 213, p. 54 l. 4 | 16 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1871-D1-P040-L15` → `1881-D1-P054-L04` |
| Célina Emond, 7 mois — 1871, div. 1, maison 158, p. 60 l. 2 | Délia Edmond, 4 ans — 1881, div. 1, maison 267, p. 69 l. 6 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1871-D1-P060-L02` → `1881-D1-P069-L06` |
| Joseph Faucher, 10 ans — 1871, div. 1, maison 83, p. 32 l. 13 | Joseph Boucher, 14 ans — 1881, div. 1, maison 337, p. 84 l. 21 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1871-D1-P032-L13` → `1881-D1-P084-L21` |
| Joseph Fréchette, 10 mois — 1871, div. 1, maison 175, p. 66 l. 6 | Joseph Rochette, 4 ans — 1881, div. 1, maison 262, p. 67 l. 22 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1871-D1-P066-L06` → `1881-D1-P067-L22` |
| Augustin Lambert, 7/12 (avril) — 1881, div. 1, maison 225, p. 58 l. 2 | Augustin Lambert, 11 ans — 1891, div. 1, maison 86, p. 20 l. 22 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1881-D1-P058-L02` → `1891-D1-P020-L22` |
| Wilfred Rivard, 6/12 (nov.) — 1881, div. 1, maison 274, p. 70 l. 22 | Wilfred Rivard, 10 ans — 1891, div. 1, maison 359, p. 82 l. 23 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1881-D1-P070-L22` → `1891-D1-P082-L23` |
| Louis Joseph Montigny, 6/12 (juin) — 1881, div. 2, maison 3, p. 2 l. 1 | Joseph Montigny, 10 ans — 1891, div. 1, maison 414, p. 93 l. 17 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1881-D2-P002-L01` → `1891-D1-P093-L17` |
| Marie Garan, 6/12 (sept.) — 1881, div. 1, maison 162, p. 41 l. 9 | Maria Garant, 10 ans — 1891, div. 1, maison 246, p. 57 l. 11 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1881-D1-P041-L09` → `1891-D1-P057-L11` |
| Mary Cantin, 4 ans — 1881, div. 1, maison 190, p. 48 l. 21 | Marie Desiree Cantin, 8 ans — 1891, div. 1, maison 565, p. 127 l. 22 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1881-D1-P048-L21` → `1891-D1-P127-L22` |
| Napoléon Cantin, 8 ans — 1881, div. 1, maison 190, p. 48 l. 19 | Napoleon Cantin, 24 ans — 1891, div. 1, maison 593, p. 133 l. 21 | 16 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1881-D1-P048-L19` → `1891-D1-P133-L21` |
| Agnès Coté, 4 ans — 1881, div. 1, maison 296, p. 75 l. 24 | Agnes Côté, 8 ans — 1891, div. 1, maison 571, p. 129 l. 20 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1881-D1-P075-L24` → `1891-D1-P129-L20` |
| Louis Marie Morin, 13 ans — 1881, div. 2, maison 22, p. 6 l. 9 | Louis Morin, 29 ans — 1891, div. 1, maison 459, p. 103 l. 21 | 16 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1881-D2-P006-L09` → `1891-D1-P103-L21` |
| Mary Boucher, 8 ans — 1881, div. 2, maison 110, p. 27 l. 19 | Mary Marguerit Faucher, 12 ans — 1891, div. 1, maison 418, p. 94 l. 13 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1881-D2-P027-L19` → `1891-D1-P094-L13` |
| Aurélie Bois, 12 ans — 1881, div. 1, maison 218, p. 56 l. 4 | Angelie Bois, 16 ans — 1891, div. 1, maison 364, p. 84 l. 1 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1881-D1-P056-L04` → `1891-D1-P084-L01` |
| Delina Gagné, 4 ans — 1881, div. 2, maison 46, p. 12 l. 18 | Regina Gagné, 8 ans — 1891, div. 1, maison 539, p. 122 l. 14 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1881-D2-P012-L18` → `1891-D1-P122-L14` |
| Fleurida Roberge, 11 ans — 1881, div. 2, maison 181, p. 43 l. 14 | Florida Roberge, 27 ans — 1891, div. 1, maison 511, p. 115 l. 11 | 16 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1881-D2-P043-L14` → `1891-D1-P115-L11` |
| Delvina Simoneau, 10/12 — 1871, div. 2, maison 82, p. 32 l. 10 | Delina Simoneau, 24 ans — 1891, div. 1, maison 523, p. 118 l. 23 | 14 ans de plus en 20 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1871-D2-P032-L10` → `1891-D1-P118-L23` |
| Célanire Bernier, 6 ans — 1871, div. 1, maison 107, p. 40 l. 16 | Celanir Bernier, 32 ans — 1891, div. 1, maison 63, p. 16 l. 11 | 26 ans de plus en 20 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1871-D1-P040-L16` → `1891-D1-P016-L11` |
| Marie Couture, 44 ans — 1871, div. 2, maison 60, p. 23 l. 18 | Marie Couture, 48 ans — 1881, div. 2, maison 79, p. 20 l. 2 | 4 ans de plus en 10 ans — lien de confiance forte | `1871-D2-P023-L18` → `1881-D2-P020-L02` |
| James Thompson, 43 ans — 1871, div. 1, maison 119, p. 43 l. 14 | James Thomson, 47 ans — 1881, div. 1, maison 301, p. 77 l. 1 | 4 ans de plus en 10 ans — lien de confiance forte | `1871-D1-P043-L14` → `1881-D1-P077-L01` |
| Antoine Robitaille, 38 ans — 1871, div. 1, maison 176, p. 66 l. 7 | Antoine Robitaille, 54 ans — 1881, div. 1, maison 280, p. 72 l. 1 | 16 ans de plus en 10 ans — lien de confiance forte | `1871-D1-P066-L07` → `1881-D1-P072-L01` |
| Marie Gagné, 36 ans — 1871, div. 2, maison 126, p. 49 l. 18 | Marie Gagné, 40 ans — 1881, div. 2, maison 37, p. 10 l. 1 | 4 ans de plus en 10 ans — lien de confiance forte | `1871-D2-P049-L18` → `1881-D2-P010-L01` |
| Théophile Côté, 36 ans — 1871, div. 2, maison 151 [?], p. 65 l. 12 | Théophile Coté, 40 ans — 1881, div. 2, maison 157, p. 37 l. 17 | 4 ans de plus en 10 ans — lien de confiance forte | `1871-D2-P065-L12` → `1881-D2-P037-L17` |
| Vitaline Côté, 23 ans — 1871, div. 2, maison 151 [?], p. 65 l. 13 | Vitaline Coté, 39 ans — 1881, div. 2, maison 157, p. 37 l. 18 | 16 ans de plus en 10 ans — lien de confiance forte | `1871-D2-P065-L13` → `1881-D2-P037-L18` |
| Marie Larivée, 50 ans — 1871, div. 1, maison 73, p. 28 l. 14 | Marie Larivée, 54 ans — 1881, div. 1, maison 106, p. 27 l. 11 | 4 ans de plus en 10 ans — lien de confiance forte | `1871-D1-P028-L14` → `1881-D1-P027-L11` |
| James Moor, 57 ans — 1871, div. 1, maison 171, p. 64 l. 14 | James Moore, 61 ans — 1881, div. 1, maison 291, p. 74 l. 17 | 4 ans de plus en 10 ans — lien de confiance forte | `1871-D1-P064-L14` → `1881-D1-P074-L17` |
| Louis Gagnon, 20 ans — 1871, div. 1, maison 127, p. 47 l. 2 | Louis Gagnon, 36 ans — 1881, div. 1, maison 116, p. 30 l. 5 | 16 ans de plus en 10 ans — lien de confiance forte | `1871-D1-P047-L02` → `1881-D1-P030-L05` |
| J. Baptiste Dion, 46 ans — 1871, div. 2, maison 21, p. 9 l. 5 | J.Baptiste Dion, 62 ans — 1881, div. 2, maison 198, p. 46 l. 18 | 16 ans de plus en 10 ans — lien de confiance forte | `1871-D2-P009-L05` → `1881-D2-P046-L18` |
| William Couture, 18 ans — 1871, div. 2, maison 60, p. 23 l. 19 | William Couture, 34 ans — 1881, div. 2, maison 145, p. 35 l. 3 | 16 ans de plus en 10 ans — lien de confiance forte | `1871-D2-P023-L19` → `1881-D2-P035-L03` |
| Louis Cantin, 18 ans — 1871, div. 2, maison 127, p. 50 l. 3 | Louis Cantin, 34 ans — 1881, div. 1, maison 174, p. 44 l. 16 | 16 ans de plus en 10 ans — lien de confiance forte | `1871-D2-P050-L03` → `1881-D1-P044-L16` |
| Adeline Beaulieu, 29 ans — 1871, div. 1, maison 22, p. 9 l. 8 | Odéline Beaulieu, 33 ans — 1881, div. 1, maison 10, p. 3 l. 25 | 4 ans de plus en 10 ans — lien de confiance forte | `1871-D1-P009-L08` → `1881-D1-P003-L25` |
| Philomène Filteau, 16 ans — 1871, div. 1, maison 59, p. 23 l. 17 | Philomène Fecteau, 32 ans — 1881, div. 1, maison 302, p. 77 l. 12 | 16 ans de plus en 10 ans — lien de confiance moyenne | `1871-D1-P023-L17` → `1881-D1-P077-L12` |
| Emélie Lambert, 24 ans — 1871, div. 1, maison 116, p. 43 l. 2 | Emélie Aubert, 40 ans — 1881, div. 1, maison 201, p. 51 l. 14 | 16 ans de plus en 10 ans — lien de confiance moyenne | `1871-D1-P043-L02` → `1881-D1-P051-L14` |
| Julie Couture, 36 ans — 1881, div. 2, maison 144, p. 34 l. 23 | Julie Couture, 40 ans — 1891, div. 1, maison 503, p. 113 l. 10 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D2-P034-L23` → `1891-D1-P113-L10` |
| Marie Cantin, 56 ans — 1881, div. 1, maison 83, p. 22 l. 14 | Marie Cantin, 60 ans — 1891, div. 1, maison 630, p. 140 l. 15 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P022-L14` → `1891-D1-P140-L15` |
| George Bilodeau, 49 ans — 1881, div. 1, maison 115, p. 29 l. 23 | George Bilodeau, 53 ans — 1891, div. 1, maison 64, p. 16 l. 16 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P029-L23` → `1891-D1-P016-L16` |
| Adèle Chevrette, 49 ans — 1881, div. 1, maison 175, p. 44 l. 20 | Adèle Chevrette, 53 ans — 1891, div. 1, maison 211, p. 49 l. 23 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P044-L20` → `1891-D1-P049-L23` |
| Geneviève Clouston, 56 ans — 1881, div. 1, maison 321, p. 81 l. 11 | Genevieve Clouston, 60 ans — 1891, div. 1, maison 20, p. 5 l. 23 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P081-L11` → `1891-D1-P005-L23` |
| Mathilda Ferland, 22 ans — 1881, div. 1, maison 326, p. 82 l. 14 | Mathilda Ferland, 26 ans — 1891, div. 1, maison 37, p. 10 l. 8 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P082-L14` → `1891-D1-P010-L08` |
| Philomène Ferland, 20 ans — 1881, div. 1, maison 326, p. 82 l. 15 | Philomene Ferland, 24 ans — 1891, div. 1, maison 37, p. 10 l. 7 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P082-L15` → `1891-D1-P010-L07` |
| Delphine Carrier, 23 ans — 1881, div. 2, maison 112, p. 28 l. 13 | Delphine Carrier, 39 ans — 1891, div. 1, maison 542, p. 123 l. 1 | 16 ans de plus en 10 ans — lien de confiance forte | `1881-D2-P028-L13` → `1891-D1-P123-L01` |
| Antoine Robitaille, 54 ans — 1881, div. 1, maison 280, p. 72 l. 1 | Antoine Robitaille, 58 ans — 1891, div. 1, maison 118, p. 28 l. 17 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P072-L01` → `1891-D1-P028-L17` |
| Joseph Lambert, 20 ans — 1881, div. 1, maison 73, p. 19 l. 18 | Joseph Lambert, 24 ans — 1891, div. 1, maison 588, p. 132 l. 25 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P019-L18` → `1891-D1-P132-L25` |
| Henriette Gagnon, 24 ans — 1881, div. 1, maison 184, p. 47 l. 8 | Henriette Gagnon, 40 ans — 1891, div. 1, maison 108, p. 26 l. 8 | 16 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P047-L08` → `1891-D1-P026-L08` |
| Marie Robitaille, 17 ans — 1881, div. 1, maison 280, p. 72 l. 3 | Marie Robitaille, 21 ans — 1891, div. 1, maison 99, p. 24 l. 5 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P072-L03` → `1891-D1-P024-L05` |
| Julienne Carrier, 60 ans — 1881, div. 2, maison 116, p. 29 l. 9 | Julienne Carrier, 64 ans — 1891, div. 1, maison 524, p. 119 l. 1 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D2-P029-L09` → `1891-D1-P119-L01` |
| Marie Guay, 20 ans — 1881, div. 2, maison 178, p. 42 l. 25 | Marie Guay, 36 ans — 1891, div. 1, maison 168, p. 40 l. 9 | 16 ans de plus en 10 ans — lien de confiance moyenne | `1881-D2-P042-L25` → `1891-D1-P040-L09` |
| Manuel Thibault, 56 ans — 1881, div. 1, maison 292, p. 74 l. 23 | Emmanuel Thibault, 60 ans — 1891, div. 1, maison 142, p. 34 l. 13 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P074-L23` → `1891-D1-P034-L13` |
| Marie Deschênes, 23 ans — 1881, div. 1, maison 100, p. 26 l. 5 | Marie Deschene, 27 ans — 1891, div. 1, maison 435, p. 98 l. 1 | 4 ans de plus en 10 ans — lien de confiance moyenne | `1881-D1-P026-L05` → `1891-D1-P098-L01` |
| Herminie Bérubé, 22 ans — 1881, div. 1, maison 36, p. 11 l. 12 | Hermine Bérubé, 26 ans — 1891, div. 1, maison 294, p. 67 l. 9 | 4 ans de plus en 10 ans — lien de confiance moyenne | `1881-D1-P011-L12` → `1891-D1-P067-L09` |
| Emilie Bois, 30 ans — 1871, div. 2, maison 4, p. 2 l. 4 | Émélie Bois, 44 ans — 1891, div. 1, maison 364, p. 83 l. 21 | 14 ans de plus en 20 ans — lien de confiance forte | `1871-D2-P002-L04` → `1891-D1-P083-L21` |
| Pierre Boucher, 59 ans — 1871, div. 2, maison 32, p. 13 l. 11 | Pierre Boucher, 73 ans — 1891, div. 1, maison 568, p. 128 l. 18 | 14 ans de plus en 20 ans — lien de confiance forte | `1871-D2-P013-L11` → `1891-D1-P128-L18` |

## Le même ménage, un chef dont l'âge ne suit pas — 31

Le calcul reconnaît le ménage — plusieurs membres s'y retrouvent ensemble — mais n'a pas osé relier son chef d'un recensement à l'autre, tant les deux âges s'écartent. L'un des deux est vraisemblablement mal transcrit.

**Où trancher :** au manuscrit, colonne de l'âge ; puis dans l'annexe des filiations pour confirmer le lien une fois l'âge corrigé.

| Avant | Après | Ce qui tient le ménage | Identifiants |
|---|---|---|---|
| Charles Binet, 42 ans — 1871, div. 2, maison 42, p. 17 l. 7 | Charles Binette, 64 ans — 1881, div. 2, maison 170, p. 40 l. 22 | les deux tiennent pourtant le même ménage, et 6 membre(s) s'y retrouvent | `1871-D2-P017-L07` → `1881-D2-P040-L22` |
| J. Baptiste Lebel, 50 ans — 1871, div. 1, maison 192, p. 70 l. 12 | J.Baptiste Lebel, 46 ans — 1881, div. 1, maison 287, p. 73 l. 19 | les deux tiennent pourtant le même ménage, et 5 membre(s) s'y retrouvent | `1871-D1-P070-L12` → `1881-D1-P073-L19` |
| Paul Cadoret, 30 ans — 1871, div. 2, maison 87, p. 34 l. 16 | Paul Cadorette, 48 ans — 1881, div. 2, maison 168, p. 40 l. 1 | les deux tiennent pourtant le même ménage, et 4 membre(s) s'y retrouvent | `1871-D2-P034-L16` → `1881-D2-P040-L01` |
| Thomas Viger, 50 ans — 1871, div. 1, maison 121, p. 44 l. 10 | Thomas Piger, 45 ans — 1881, div. 1, maison 54, p. 14 l. 22 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1871-D1-P044-L10` → `1881-D1-P014-L22` |
| Joseph Couture, 48 ans — 1871, div. 2, maison 60, p. 23 l. 17 | Joseph Couture, 50 ans — 1881, div. 2, maison 79, p. 20 l. 1 | les deux tiennent pourtant le même ménage, et 6 membre(s) s'y retrouvent | `1871-D2-P023-L17` → `1881-D2-P020-L01` |
| David Swinton, 57 ans — 1871, div. 2, maison 157 [?], p. 67 l. 4 | David Swinton, 50 ans — 1881, div. 2, maison 28, p. 7 l. 19 | les deux tiennent pourtant le même ménage, et 5 membre(s) s'y retrouvent | `1871-D2-P067-L04` → `1881-D2-P007-L19` |
| François Cantin, 35 ans — 1871, div. 2, maison 107, p. 43 l. 3 | François Cantin, 61 ans — 1881, div. 2, maison 89, p. 22 l. 12 | les deux tiennent pourtant le même ménage, et 4 membre(s) s'y retrouvent | `1871-D2-P043-L03` → `1881-D2-P022-L12` |
| Louis Simoneau, 41 ans — 1871, div. 2, maison 82, p. 32 l. 2 | Louis Simonneau, 80 ans — 1881, div. 2, maison 114, p. 28 l. 20 | les deux tiennent pourtant le même ménage, et 6 membre(s) s'y retrouvent | `1871-D2-P032-L02` → `1881-D2-P028-L20` |
| David Allen, 48 ans — 1871, div. 2, maison 57, p. 22 l. 8 | David Allen, 68 ans — 1881, div. 2, maison 78, p. 19 l. 20 | les deux tiennent pourtant le même ménage, et 4 membre(s) s'y retrouvent | `1871-D2-P022-L08` → `1881-D2-P019-L20` |
| Louis Landry, 31 ans — 1871, div. 1, maison 160, p. 60 l. 17 | Louis Landry, 32 ans — 1881, div. 1, maison 251, p. 64 l. 19 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1871-D1-P060-L17` → `1881-D1-P064-L19` |
| Edouard Villers [?], 40 ans — 1871, div. 2, maison 104, p. 41 l. 15 | Edouard Villers, 36 ans — 1881, div. 2, maison 104, p. 26 l. 1 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1871-D2-P041-L15` → `1881-D2-P026-L01` |
| Joseph Bergeron, 59 [?] ans — 1871, div. 2, maison 124, p. 48 l. 18 | Joseph Bergeron, 60 ans — 1881, div. 2, maison 42, p. 11 l. 15 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1871-D2-P048-L18` → `1881-D2-P011-L15` |
| George Dion, 56 ans — 1871, div. 2, maison 154 [?], p. 66 l. 14 | George Dion, 49 ans — 1881, div. 2, maison 26, p. 7 l. 1 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1871-D2-P066-L14` → `1881-D2-P007-L01` |
| Jacques [?] Cadoret, 40 [?] ans — 1871, div. 2, maison 93, p. 36 l. 7 | Jacques Cadorette, 57 ans — 1881, div. 2, maison 96, p. 24 l. 1 | les deux tiennent pourtant le même ménage, et 5 membre(s) s'y retrouvent | `1871-D2-P036-L07` → `1881-D2-P024-L01` |
| Augustin Boulet, 49 ans — 1871, div. 2, maison 99, p. 38 l. 18 | Augustin Boutet, 67 ans — 1881, div. 2, maison 142, p. 34 l. 8 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1871-D2-P038-L18` → `1881-D2-P034-L08` |
| William Hearn, 63 [?] ans — 1871, div. 2, maison 102, p. 40 l. 8 | William Ahearn, 82 ans — 1881, div. 2, maison 124, p. 30 l. 20 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1871-D2-P040-L08` → `1881-D2-P030-L20` |
| Pierre Syrois, 40 ans — 1871, div. 1, maison 158, p. 59 l. 10 | Pierre Sirois, 33 ans — 1881, div. 1, maison 314, p. 79 l. 20 | les deux tiennent pourtant le même ménage, et 2 membre(s) s'y retrouvent | `1871-D1-P059-L10` → `1881-D1-P079-L20` |
| J. Baptiste Emond, 28 ans — 1871, div. 1, maison 158, p. 59 l. 20 | J.Baptiste Edmond, 28 ans — 1881, div. 1, maison 267, p. 69 l. 2 | les deux tiennent pourtant le même ménage, et 2 membre(s) s'y retrouvent | `1871-D1-P059-L20` → `1881-D1-P069-L02` |
| J.Baptiste Edmond, 28 ans — 1881, div. 1, maison 267, p. 69 l. 2 | Baptiste Emond, 50 ans — 1891, div. 1, maison 102, p. 24 l. 20 | les deux tiennent pourtant le même ménage, et 6 membre(s) s'y retrouvent | `1881-D1-P069-L02` → `1891-D1-P024-L20` |
| Augustin Boutet, 67 ans — 1881, div. 2, maison 142, p. 34 l. 8 | Augustin Boulet, 69 ans — 1891, div. 1, maison 505, p. 114 l. 2 | les deux tiennent pourtant le même ménage, et 6 membre(s) s'y retrouvent | `1881-D2-P034-L08` → `1891-D1-P114-L02` |
| Joseph Boucher, 48 ans — 1881, div. 2, maison 41, p. 11 l. 7 | Joseph Boucher, 48 ans — 1891, div. 1, maison 308, p. 69 l. 22 | les deux tiennent pourtant le même ménage, et 6 membre(s) s'y retrouvent | `1881-D2-P011-L07` → `1891-D1-P069-L22` |
| Joseph Bergeron, 60 ans — 1881, div. 2, maison 42, p. 11 l. 15 | Joseph Bergeron, 29 ans — 1891, div. 1, maison 286, p. 65 l. 8 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1881-D2-P011-L15` → `1891-D1-P065-L08` |
| Joseph Gendron, 34 ans — 1881, div. 1, maison 336, p. 84 l. 10 | Joseph Gendron, 54 ans — 1891, div. 1, maison 101, p. 24 l. 14 | les deux tiennent pourtant le même ménage, et 4 membre(s) s'y retrouvent | `1881-D1-P084-L10` → `1891-D1-P024-L14` |
| Louis Simonneau, 80 ans — 1881, div. 2, maison 114, p. 28 l. 20 | Louis Simoneau, 60 ans — 1891, div. 1, maison 523, p. 118 l. 18 | les deux tiennent pourtant le même ménage, et 4 membre(s) s'y retrouvent | `1881-D2-P028-L20` → `1891-D1-P118-L18` |
| Eusèbe Boucher, 40 ans — 1881, div. 1, maison 220, p. 56 l. 14 | Eusèbe Boucher, 59 ans — 1891, div. 1, maison 166, p. 39 l. 25 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1881-D1-P056-L14` → `1891-D1-P039-L25` |
| François Binette, 52 ans — 1881, div. 2, maison 134, p. 32 l. 19 | Francis Binet, 41 ans — 1891, div. 1, maison 520, p. 117 l. 19 | les deux tiennent pourtant le même ménage, et 5 membre(s) s'y retrouvent | `1881-D2-P032-L19` → `1891-D1-P117-L19` |
| J.Baptiste Lebel, 46 ans — 1881, div. 1, maison 287, p. 73 l. 19 | J.Baptiste Lebel, 72 ans — 1891, div. 1, maison 170, p. 40 l. 24 | les deux tiennent pourtant le même ménage, et 2 membre(s) s'y retrouvent | `1881-D1-P073-L19` → `1891-D1-P040-L24` |
| Edouard Labrie, 47 ans — 1881, div. 2, maison 55, p. 15 l. 3 | Édouard Labrie, 25 ans — 1891, div. 1, maison 409, p. 92 l. 13 | les deux tiennent pourtant le même ménage, et 2 membre(s) s'y retrouvent | `1881-D2-P015-L03` → `1891-D1-P092-L13` |
| Narcisse Ferland, 52 ans — 1881, div. 1, maison 326, p. 82 l. 12 | Narcisse Ferland, 51 ans — 1891, div. 1, maison 37, p. 10 l. 5 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1881-D1-P082-L12` → `1891-D1-P010-L05` |
| David Allen, 68 ans — 1881, div. 2, maison 78, p. 19 l. 20 | David Allen, 66 ans — 1891, div. 1, maison 481, p. 108 l. 17 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1881-D2-P019-L20` → `1891-D1-P108-L17` |
| André Lemelin, 56 ans — 1871, div. 2, maison 26, p. 12 l. 9 | Andre Lemelin, 37 ans — 1891, div. 1, maison 592, p. 133 l. 17 | les deux tiennent pourtant le même ménage, et 2 membre(s) s'y retrouvent | `1871-D2-P012-L09` → `1891-D1-P133-L17` |

## Numéros de maison et de famille : trous et numéros douteux — 7

La suite des numéros du recenseur devrait être continue. Un trou n'est pas forcément une faute — le recenseur saute parfois un numéro, et une maison inhabitée n'a pas de ligne —, mais c'est là qu'une maison oubliée ou une famille fondue dans la précédente se trahit.

**Où trancher :** au manuscrit, colonnes 1 à 5 ; un numéro de maison se change avec `outils/relecture-1881/renumeroter.mjs`, un numéro de famille dans l'atelier.

| Recensement | Constat |
|---|---|
| 1871, division 1 | aucun numéro de maison 55, 98 : numéro sauté par le recenseur, maison inhabitée, ou maison oubliée |
| 1871, division 1 | aucun numéro de famille 183 : numéro sauté par le recenseur, ou famille fondue dans sa voisine |
| 1871, division 2 | 37 maison(s) portent encore un numéro douteux « [?] », et 13 sont rangées après une maison de numéro plus élevé — le numéro se relit au manuscrit, et se change avec `renumeroter.mjs` |
| 1871, division 2 | aucun numéro de maison 56, 105, 155 : numéro sauté par le recenseur, maison inhabitée, ou maison oubliée |
| 1881, division 2 | aucun numéro de famille 141, 207 : numéro sauté par le recenseur, ou famille fondue dans sa voisine |
| 1891, division 1 | aucun numéro de maison 195, 387 à 389, 391 : numéro sauté par le recenseur, maison inhabitée, ou maison oubliée |
| 1891, division 1 | aucun numéro de famille 387 à 389, 391 : numéro sauté par le recenseur, ou famille fondue dans sa voisine |
