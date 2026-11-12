# Contrôle des croisements

Produit par `node outils/controle-croisements.mjs` le 2026-11-12. Ne pas le
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
