# Contrôle des croisements

Produit par `node outils/controle-croisements.mjs` le 2026-11-18. Ne pas le
corriger à la main : il est réécrit à chaque passage, et se vide à mesure que les
questions sont tranchées.

Il dresse la liste de ce que les données ne se disent pas encore entre elles —
ou se disent de travers. **Rien de ce qui suit n'a été modifié d'office** : chaque
section dit où la décision se prend.

| Section | À regarder | Déjà répondus |
|---|---|---|
| Corrections manuelles à relire | 0 |  |
| Rapprochements proposés par le ménage | 0 |  |
| Décès de 1871 sans maison | 16 |  |
| Documents : la même personne, rattachée dans une fiche et pas dans l'autre | 1 |  |
| Lignes incomplètes ou renvois cassés | 4 | 1 |
| Lignes incertaines qu'un document éclaire | 2 | 1 |
| Signature au bas des actes et « sait écrire » au recensement | 0 | 8 |
| Documents : le nom écrit n'est pas celui de la ligne rattachée | 5 |  |
| Naissances et décès connus, face au recensement | 4 |  |
| Identité dite par un document, sans lien entre les recensements | 0 |  |
| Le sexe ne suit pas — d'un recensement à l'autre, ou sur la ligne même | 1 | 5 |
| L'âge ne suit pas le long d'un lien | 25 | 61 |
| Le même ménage, un chef dont l'âge ne suit pas | 4 |  |
| Numéros de maison et de famille : trous et numéros douteux | 7 |  |

« Déjà répondus » : les points auxquels Patrick a répondu dans le relevé à cocher
(`releve`, dans `data/decisions-dictees.json`). Ils ne lui sont pas reposés.

État des rapprochements entre recensements : 2928 liens, dont 2662 de
confiance forte, 266 moyenne, 217 confirmés à la main,
0 proposés par le ménage ; 37 veuvages, 4 âges à vérifier.

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

## Documents : la même personne, rattachée dans une fiche et pas dans l'autre — 1

Le même nom porte un rattachement au recensement dans un autre document. Ce peut être la même personne — ou un homonyme : à vérifier avant de verser.

**Où trancher :** dans `documents/manifeste.json` (champ `ref_personne`).

| Document | Personne | Rattachée ailleurs à | Note de la fiche |
|---|---|---|---|
| plan-1844-02-05-hetriere-riviere-bruyante | Pierre Cantin (proprietaire) | `1871-D2-P002-L18` (Pierre Cantin, 64 ans, fiche « notarie-1874-02-14-vente-couture-cantin ») | Nommé deux fois : la deuxième bande (« 2 d° ») et la cinquième, contre la ligne D-C, dont le « 3 d° » est ajouté au crayon. Rien ne dit s'il |

## Lignes incomplètes ou renvois cassés — 4

Ce qu'un contrôle mécanique relève : un prénom manquant, un sexe douteux, un renvoi vers un identifiant disparu.

**Où trancher :** dans l'atelier pour une ligne de recensement ; dans le fichier nommé pour un renvoi.

| Où | Qui | Ce qui cloche |
|---|---|---|
| `1881-D1-P085-L21` | Esther | prénom vide — 1881, div. 1, maison 342, p. 85 l. 21 |
| `1891-D1-P013-L17` | Lefebvre | prénom vide — 1891, div. 1, maison 52, p. 13 l. 17 |
| `1891-D1-P111-L25` | Daggs | prénom vide — 1891, div. 1, maison 496, p. 111 l. 25 |
| 1881-D2, famille 139 | — | même numéro de famille dans les maisons 128 et 129 |

1 autre(s) point(s) de cette rubrique ont déjà reçu la réponse de Patrick.

## Lignes incertaines qu'un document éclaire — 2

Le dépouillement a laissé un « [?] » sur ces lignes, et un acte versé depuis nomme la même personne en toutes lettres. La ligne n'a pas été touchée : c'est à la main de dire si le doute est levé.

**Où trancher :** dans l'atelier, sur la ligne indiquée : retirer le « [?] » ou corriger la valeur.

| Ligne | Le recensement porte | Reste douteux | Ce que disent les documents |
|---|---|---|---|
| `1871-D2-P068-L02` — 1871, div. 2, maison 158 [?], p. 68 l. 2 | Bourassa, Romuald [?], 13 ans | le prénom | écrit « Romuald Bourassa » dans acte n° 119 du 1874-05-22, acte n° 42 du 1874-02-27 et 2 autre(s) — Le prénom lu « Romuald [?] » en 1871 est bien Romuald. |
| `1871-D2-P069-L05` — 1871, div. 2, maison 162 [?], p. 69 l. 5 | Voyer [?], Thomas, 37 ans, M, Menuisier | le nom | écrit « Thomas Voyer » dans acte n° 58 du 1874-03-11 — Le patronyme « Voyer [?] » du dépouillement de 1871 (division 2, maison 162) est confirmé par l'acte, qui écrit plusieurs fois « Thomas Voyer » en toutes lettres. |

**Réponses de Patrick en attente d'une précision — 2 :**

- Bourassa, Romuald [?], 13 ans. Tu as coché cette ligne et écrit « romuald » dans la case de la suivante (Thomas Voyer). Dois-je lever le doute ici — le prénom est bien Romuald ?
- Voyer [?], Thomas, 37 ans, M, Menuisier — il a écrit « romuald ». Tu as écrit « romuald » ici : était-ce pour la ligne Bourassa, juste au-dessus ? Et pour cette ligne-ci : le nom Voyer est-il confirmé ?

1 autre(s) point(s) de cette rubrique ont déjà reçu la réponse de Patrick.

## Signature au bas des actes et « sait écrire » au recensement — 0

Les actes disent qui signe et qui « a déclaré ne le savoir ». Sur 75 personnes rattachées dont le recensement dit si elles écrivent, 65 s'accordent avec leurs actes ; les autres sont ici. Signer n'est pas écrire, et le recenseur a pu omettre une marque : chaque ligne demande le manuscrit.

**Où trancher :** au manuscrit, dans les colonnes d'instruction ; puis dans l'atelier si la marque est à déplacer.

Rien à signaler.

8 autre(s) point(s) de cette rubrique ont déjà reçu la réponse de Patrick.

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

## Identité dite par un document, sans lien entre les recensements — 0

Un document affirme que deux lignes de deux recensements sont la même personne — le plus souvent une femme qui a changé de nom —, et le calcul des filiations ne les relie pas. Le lien n'a pas été posé d'office : il se confirme à la main.

**Où trancher :** dans l'annexe des filiations, ou en le dictant (« confirme le lien ») — il ira dans `data/decisions-dictees.json`.

Rien à signaler.

## Le sexe ne suit pas — d'un recensement à l'autre, ou sur la ligne même — 1

Deux lignes reliées comme une seule personne ne portent pas le même sexe, ou un prénom presque toujours masculin (ou féminin) porte l'autre sexe. Les filiations comptent ces lignes telles quelles : un garçon noté « F » passe pour une fille dans les statistiques.

**Où trancher :** au manuscrit, colonne du sexe ; dans l'atelier pour corriger la ligne, dans l'annexe des filiations pour écarter le lien.

| Avant | Après | Ce qui cloche | Identifiants |
|---|---|---|---|
| Marie Xavier Gagnon, M, 33 ans, batelier, chef — 1891, div. 1, maison 492, p. 111 l. 7 | — | prénom d'ordinaire féminin, sexe noté « M » : prénom ou sexe à relire | `1891-D1-P111-L07` |

**Réponses de Patrick en attente d'une précision — 1 :**

- Marie Xavier Gagnon, M, 33 ans, batelier, chef — 1891, div. 1, maison 492, p. 111 l. 7 — il a écrit « femme ». Tu as écrit « femme ». Mais Marie Xavier Gagnon est le chef du ménage, batelier, et la ligne suivante est son épouse Rosalie, 30 ans, suivie de leurs deux fils : je n'ai rien changé. Est-ce bien une femme — ou le prénom qui est à relire ?

5 autre(s) point(s) de cette rubrique ont déjà reçu la réponse de Patrick.

## L'âge ne suit pas le long d'un lien — 25

Ces deux lignes sont reliées comme une seule personne, mais l'âge avance de six ans de trop ou de trop peu. Chez un adulte c'est souvent le recenseur ; chez un enfant, c'est un chiffre mal lu (1 pour 7, 0 pour 6) ou un frère du même prénom. Les enfants sont en tête.

**Où trancher :** au manuscrit, colonne de l'âge, des deux côtés ; dans l'annexe des filiations si c'est un homonyme (frère, cousin) qu'il faut écarter.

| Avant | Après | Écart | Identifiants |
|---|---|---|---|
| Marie Clavette, 7 mois — 1871, div. 1, maison 75, p. 29 l. 17 | Marie Clavette, 4 ans — 1881, div. 1, maison 215, p. 55 l. 1 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1871-D1-P029-L17` → `1881-D1-P055-L01` |
| John Bernier, 7 ans — 1871, div. 1, maison 107, p. 40 l. 15 | J.Baptiste Bernier, 23 ans — 1881, div. 1, maison 213, p. 54 l. 4 | 16 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1871-D1-P040-L15` → `1881-D1-P054-L04` |
| Célina Emond, 7 mois — 1871, div. 1, maison 158, p. 60 l. 2 | Délia Edmond, 4 ans — 1881, div. 1, maison 267, p. 69 l. 6 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1871-D1-P060-L02` → `1881-D1-P069-L06` |
| Joseph Faucher, 10 ans — 1871, div. 1, maison 83, p. 32 l. 13 | Joseph Boucher, 14 ans — 1881, div. 1, maison 337, p. 84 l. 21 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1871-D1-P032-L13` → `1881-D1-P084-L21` |
| Joseph Fréchette, 10 mois — 1871, div. 1, maison 175, p. 66 l. 6 | Joseph Rochette, 4 ans — 1881, div. 1, maison 262, p. 67 l. 22 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1871-D1-P066-L06` → `1881-D1-P067-L22` |
| Mary Cantin, 4 ans — 1881, div. 1, maison 190, p. 48 l. 21 | Marie Desiree Cantin, 8 ans — 1891, div. 1, maison 565, p. 127 l. 22 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1881-D1-P048-L21` → `1891-D1-P127-L22` |
| Napoléon Cantin, 8 ans — 1881, div. 1, maison 190, p. 48 l. 19 | Napoleon Cantin, 24 ans — 1891, div. 1, maison 593, p. 133 l. 21 | 16 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1881-D1-P048-L19` → `1891-D1-P133-L21` |
| Agnès Coté, 4 ans — 1881, div. 1, maison 296, p. 75 l. 24 | Agnes Côté, 8 ans — 1891, div. 1, maison 571, p. 129 l. 20 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance forte | `1881-D1-P075-L24` → `1891-D1-P129-L20` |
| Mary Boucher, 8 ans — 1881, div. 2, maison 110, p. 27 l. 19 | Mary Marguerit Faucher, 12 ans — 1891, div. 1, maison 418, p. 94 l. 13 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1881-D2-P027-L19` → `1891-D1-P094-L13` |
| Aurélie Bois, 12 ans — 1881, div. 1, maison 218, p. 56 l. 4 | Angelie Bois, 16 ans — 1891, div. 1, maison 364, p. 84 l. 1 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1881-D1-P056-L04` → `1891-D1-P084-L01` |
| Delina Gagné, 4 ans — 1881, div. 2, maison 46, p. 12 l. 18 | Regina Gagné, 8 ans — 1891, div. 1, maison 539, p. 122 l. 14 | 4 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1881-D2-P012-L18` → `1891-D1-P122-L14` |
| Fleurida Roberge, 11 ans — 1881, div. 2, maison 181, p. 43 l. 14 | Florida Roberge, 27 ans — 1891, div. 1, maison 511, p. 115 l. 11 | 16 ans de plus en 10 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1881-D2-P043-L14` → `1891-D1-P115-L11` |
| Delvina Simoneau, 10/12 — 1871, div. 2, maison 82, p. 32 l. 10 | Delina Simoneau, 24 ans — 1891, div. 1, maison 523, p. 118 l. 23 | 14 ans de plus en 20 ans — un enfant : un tel écart ne s'explique pas par un âge arrondi — lien de confiance moyenne | `1871-D2-P032-L10` → `1891-D1-P118-L23` |
| Antoine Robitaille, 38 ans — 1871, div. 1, maison 176, p. 66 l. 7 | Antoine Robitaille, 54 ans — 1881, div. 1, maison 280, p. 72 l. 1 | 16 ans de plus en 10 ans — lien de confiance forte | `1871-D1-P066-L07` → `1881-D1-P072-L01` |
| Marie Larivée, 50 ans — 1871, div. 1, maison 73, p. 28 l. 14 | Marie Larivée, 54 ans — 1881, div. 1, maison 106, p. 27 l. 11 | 4 ans de plus en 10 ans — lien de confiance forte | `1871-D1-P028-L14` → `1881-D1-P027-L11` |
| J. Baptiste Dion, 46 ans — 1871, div. 2, maison 21, p. 9 l. 5 | J.Baptiste Dion, 62 ans — 1881, div. 2, maison 198, p. 46 l. 18 | 16 ans de plus en 10 ans — lien de confiance forte | `1871-D2-P009-L05` → `1881-D2-P046-L18` |
| William Couture, 18 ans — 1871, div. 2, maison 60, p. 23 l. 19 | William Couture, 34 ans — 1881, div. 2, maison 145, p. 35 l. 3 | 16 ans de plus en 10 ans — lien de confiance forte | `1871-D2-P023-L19` → `1881-D2-P035-L03` |
| Louis Cantin, 18 ans — 1871, div. 2, maison 127, p. 50 l. 3 | Louis Cantin, 34 ans — 1881, div. 1, maison 174, p. 44 l. 16 | 16 ans de plus en 10 ans — lien de confiance forte | `1871-D2-P050-L03` → `1881-D1-P044-L16` |
| Philomène Filteau, 16 ans — 1871, div. 1, maison 59, p. 23 l. 17 | Philomène Fecteau, 32 ans — 1881, div. 1, maison 302, p. 77 l. 12 | 16 ans de plus en 10 ans — lien de confiance moyenne | `1871-D1-P023-L17` → `1881-D1-P077-L12` |
| Emélie Lambert, 24 ans — 1871, div. 1, maison 116, p. 43 l. 2 | Emélie Aubert, 40 ans — 1881, div. 1, maison 201, p. 51 l. 14 | 16 ans de plus en 10 ans — lien de confiance moyenne | `1871-D1-P043-L02` → `1881-D1-P051-L14` |
| Henriette Gagnon, 24 ans — 1881, div. 1, maison 184, p. 47 l. 8 | Henriette Gagnon, 40 ans — 1891, div. 1, maison 108, p. 26 l. 8 | 16 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P047-L08` → `1891-D1-P026-L08` |
| Marie Robitaille, 17 ans — 1881, div. 1, maison 280, p. 72 l. 3 | Marie Robitaille, 21 ans — 1891, div. 1, maison 99, p. 24 l. 5 | 4 ans de plus en 10 ans — lien de confiance forte | `1881-D1-P072-L03` → `1891-D1-P024-L05` |
| Marie Guay, 20 ans — 1881, div. 2, maison 178, p. 42 l. 25 | Marie Guay, 36 ans — 1891, div. 1, maison 168, p. 40 l. 9 | 16 ans de plus en 10 ans — lien de confiance moyenne | `1881-D2-P042-L25` → `1891-D1-P040-L09` |
| Marie Deschênes, 23 ans — 1881, div. 1, maison 100, p. 26 l. 5 | Marie Deschene, 27 ans — 1891, div. 1, maison 435, p. 98 l. 1 | 4 ans de plus en 10 ans — lien de confiance moyenne | `1881-D1-P026-L05` → `1891-D1-P098-L01` |
| Herminie Bérubé, 22 ans — 1881, div. 1, maison 36, p. 11 l. 12 | Hermine Bérubé, 26 ans — 1891, div. 1, maison 294, p. 67 l. 9 | 4 ans de plus en 10 ans — lien de confiance moyenne | `1881-D1-P011-L12` → `1891-D1-P067-L09` |

**Réponses de Patrick en attente d'une précision — 8 :**

- Marie Clavette, 7 mois — 1871, div. 1, maison 75, p. 29 l. 17 — il a écrit « confirme ». Tu as écrit « confirme ». Mais la Marie de 1881 a 4 ans : elle est née vers 1877, après le recensement de 1871, et ses parents sont Edouard et Elize, non Cyrille et Luce. Ce serait une autre enfant. Je confirme quand même, ou j'écarte le lien ?
- Mary Cantin, 4 ans — 1881, div. 1, maison 190, p. 48 l. 21 — il a écrit « confirme ». Tu as écrit « confirme ». Mais la Marie Désirée de 1891 a 8 ans : elle est née vers 1883, après le recensement de 1881, et ses parents sont Jacob et Marie Delias, non Pierre et Délina. Je confirme quand même, ou j'écarte le lien ?
- Agnès Coté, 4 ans — 1881, div. 1, maison 296, p. 75 l. 24 — il a écrit « confirme ». Tu as écrit « confirme ». Mais l'Agnès de 1891 a 8 ans : elle est née vers 1883, après le recensement de 1881, et ses parents sont Léon et Marie, non Alcide et Geneviève. Je confirme quand même, ou j'écarte le lien ?
- Fleurida Roberge, 11 ans — 1881, div. 2, maison 181, p. 43 l. 14 — il a écrit « indiqué Florida et confirme ». Tu as écrit « indiqué Florida et confirme ». Mais la Florida de 1891 (27 ans) est la fille de Marguerite Roberge, veuve, et la sœur de Célina McReady ; la Fleurida de 1881 (11 ans) est la fille d'Etienne et de Catherine. Ce seraient deux familles. Je confirme quand même ? Et « indiqué Florida » : faut-il écrire Florida sur la ligne de 1881 ?
- Delvina Simoneau, 10/12 — 1871, div. 2, maison 82, p. 32 l. 10 — il a écrit « confirme ». Tu as écrit « confirme ». Mais la Delina de 1891 est dite « bru » de Louis Simoneau : c'est la femme de son fils Pierre, non sa fille. La fille Delvina de 1871 serait plutôt la « Malvina » de 1881 (10 ans) et de 1891 (20 ans, « fille »). Je confirme quand même, ou j'écarte le lien ?
- Philomène Filteau, 16 ans — 1871, div. 1, maison 59, p. 23 l. 17 — il a écrit « nom de famille filteau confirme ». Tu as écrit « nom de famille filteau confirme ». Mais la Philomène de 1881 est mariée à F. Xavier Fecteau et a une fille de 13 ans, née vers 1868 — alors que la Philomène Filteau de 1871 a 16 ans et vit chez son père. Je confirme quand même ? Et faut-il écrire « Filteau » au lieu de « Fecteau » pour elle seule, ou pour toute la famille de 1881 ?
- Henriette Gagnon, 24 ans — 1881, div. 1, maison 184, p. 47 l. 8 — il a écrit « confirme ». Tu as écrit « confirme ». Mais l'Henriette de 1891 est l'épouse de Léon Gagnon et a des fils de 16 et 14 ans, nés vers 1875 et 1877 — alors que l'Henriette de 1881 est célibataire, chez Anselme Gagnon. Je confirme quand même, ou j'écarte le lien ?
- Marie Robitaille, 17 ans — 1881, div. 1, maison 280, p. 72 l. 3 — il a écrit « confirme ». Tu as écrit « confirme ». Mais en 1891 la fille d'Antoine Robitaille, Marie, est toujours chez lui : 27 ans, mariée, « fille », avec son mari Julien (page 28). La Marie de 21 ans, épouse d'Edmond Robitaille, serait une autre personne. Je confirme quand même, ou je relie plutôt la Marie de 1881 à celle de 27 ans ?

61 autre(s) point(s) de cette rubrique ont déjà reçu la réponse de Patrick.

## Le même ménage, un chef dont l'âge ne suit pas — 4

Le calcul reconnaît le ménage — plusieurs membres s'y retrouvent ensemble — mais n'a pas osé relier son chef d'un recensement à l'autre, tant les deux âges s'écartent. L'un des deux est vraisemblablement mal transcrit.

**Où trancher :** au manuscrit, colonne de l'âge ; puis dans l'annexe des filiations pour confirmer le lien une fois l'âge corrigé.

| Avant | Après | Ce qui tient le ménage | Identifiants |
|---|---|---|---|
| J.Baptiste Edmond, 28 ans — 1881, div. 1, maison 267, p. 69 l. 2 | Baptiste Emond, 50 ans — 1891, div. 1, maison 102, p. 24 l. 20 | les deux tiennent pourtant le même ménage, et 6 membre(s) s'y retrouvent | `1881-D1-P069-L02` → `1891-D1-P024-L20` |
| Joseph Bergeron, 60 ans — 1881, div. 2, maison 42, p. 11 l. 15 | Joseph Bergeron, 29 ans — 1891, div. 1, maison 286, p. 65 l. 8 | les deux tiennent pourtant le même ménage, et 3 membre(s) s'y retrouvent | `1881-D2-P011-L15` → `1891-D1-P065-L08` |
| Edouard Labrie, 47 ans — 1881, div. 2, maison 55, p. 15 l. 3 | Édouard Labrie, 25 ans — 1891, div. 1, maison 409, p. 92 l. 13 | les deux tiennent pourtant le même ménage, et 2 membre(s) s'y retrouvent | `1881-D2-P015-L03` → `1891-D1-P092-L13` |
| André Lemelin, 56 ans — 1871, div. 2, maison 26, p. 12 l. 9 | Andre Lemelin, 37 ans — 1891, div. 1, maison 592, p. 133 l. 17 | les deux tiennent pourtant le même ménage, et 2 membre(s) s'y retrouvent | `1871-D2-P012-L09` → `1891-D1-P133-L17` |

**Réponses de Patrick en attente d'une précision — 3 :**

- Joseph Bergeron, 60 ans — 1881, div. 2, maison 42, p. 11 l. 15 — il a écrit « confirme ». Tu as écrit « confirme ». Mais le Joseph Bergeron de 29 ans, chef en 1891, vit avec sa mère veuve : c'est le fils (23 ans en 1881, déjà relié à cette ligne), et le père de 60 ans est sans doute mort entre-temps. Je n'ai pas relié le père au fils. D'accord ?
- Edouard Labrie, 47 ans — 1881, div. 2, maison 55, p. 15 l. 3 — il a écrit « confirme ». Tu as écrit « confirme ». Mais l'Édouard Labrie de 25 ans, chef en 1891, vit avec son frère Joseph et sa sœur Marie : c'est le fils (16 ans en 1881, déjà relié à cette ligne), non le père de 47 ans. Je n'ai pas relié le père au fils. D'accord ?
- André Lemelin, 56 ans — 1871, div. 2, maison 26, p. 12 l. 9 — il a écrit « confirme ». Tu as écrit « confirme ». Mais l'André Lemelin de 37 ans, chef en 1891, vit avec sa sœur Vitaline : c'est le fils (18 ans en 1871, déjà relié à cette ligne), non le père de 56 ans. Je n'ai pas relié le père au fils. D'accord ?

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
