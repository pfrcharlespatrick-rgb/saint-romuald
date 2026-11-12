# Contrôle des croisements

Produit par `node outils/controle-croisements.mjs` le 2026-11-12. Ne pas le
corriger à la main : il est réécrit à chaque passage, et se vide à mesure que les
questions sont tranchées.

Il dresse la liste de ce que les données ne se disent pas encore entre elles —
ou se disent de travers. **Rien de ce qui suit n'a été modifié d'office** : chaque
section dit où la décision se prend.

| Section | À regarder |
|---|---|
| Corrections manuelles à relire | 4 |
| Rapprochements proposés par le ménage | 142 |
| Décès de 1871 sans maison | 16 |
| Documents : la même personne, rattachée dans une fiche et pas dans l'autre | 9 |
| Lignes incomplètes ou renvois cassés | 10 |

État des rapprochements entre recensements : 2910 liens, dont 2500 de
confiance forte, 409 moyenne, 16 confirmés à la main,
132 proposés par le ménage ; 37 veuvages, 31 âges à vérifier.

## Corrections manuelles à relire — 4

Le prénom posé à la main ne s'accorde pas avec le sexe de la ligne. Rien n'a été modifié : la main l'emporte, c'est à elle de se relire.

**Où trancher :** dans l'atelier, sur la ligne indiquée.

| Ligne | Nom corrigé | Au registre | Ce qui cloche |
|---|---|---|---|
| `1881-D2-P018-L16` | Rose Delima McCready | M, 60 ans, navigateur | la ligne voisine `1881-D2-P018-L17` porte « Rose Delvina » : la correction a peut-être glissé d'une ligne |
| `1881-D2-P004-L11` | Narcisse Joncas | F, 3 ans | prénom masculin, sexe « F » : le sexe est sans doute à corriger aussi |
| `1881-D2-P004-L09` | Louis Honoré Joncas | F, 6 ans | prénom masculin, sexe « F » : le sexe est sans doute à corriger aussi |
| `1881-D2-P005-L23` | Homère Daigle | F, 24 ans, journalier | prénom masculin, sexe « F » : le sexe est sans doute à corriger aussi |

## Rapprochements proposés par le ménage — 142

Le nom seul ne reliait pas ces deux mentions ; le ménage, lui, les désigne : seule personne du foyer dont le sexe et l'âge concordent, quand deux autres membres au moins se retrouvent ensemble. Confiance « moyenne », à confirmer ou à écarter (voir docs/FILIATION.md, « Compléter les ménages reconnus »).

**Où trancher :** dans l'annexe des filiations (boutons Confirmer / Écarter).

| Avant | Après | Indice | Identifiants |
|---|---|---|---|
| Euphémie Plaisance, 3 ans — 1871 D1, maison 127 | Eugénie Plaisance, 13 ans — 1881 D1, maison 198 | patronyme concordant, prénom différent (Euphémie / Eugénie) | `1871-D1-P046-L19` → `1881-D1-P050-L23` |
| Eugénie Girard, 3 ans — 1871 D2, maison 117 | Régina Girard, 12 ans — 1881 D1, maison 349 | patronyme concordant, prénom différent (Eugénie / Régina) | `1871-D2-P046-L18` → `1881-D1-P088-L07` |
| Alvina Grégoire, 8 ans — 1871 D2, maison 85 | Altania Grégoire, 18 ans — 1881 D2, maison 169 | patronyme concordant, prénom différent (Alvina / Altania) | `1871-D2-P034-L07` → `1881-D2-P040-L13` |
| Selphina Grégoire, 5 ans — 1871 D2, maison 85 | Solfina Grégoire, 15 ans — 1881 D2, maison 169 | patronyme concordant, prénom différent (Selphina / Solfina) | `1871-D2-P034-L09` → `1881-D2-P040-L15` |
| Barbe Vachon, 4 ans — 1871 D1, maison 147 | Berthe Vachon, 14 ans — 1881 D1, maison 216 | patronyme concordant, prénom différent (Barbe / Berthe) | `1871-D1-P054-L19` → `1881-D1-P055-L13` |
| Flore Desroches, 5 ans — 1871 D2, maison 77 | Laura Desroches, 14 ans — 1881 D1, maison 319 | patronyme concordant, prénom différent (Flore / Laura) | `1871-D2-P030-L10` → `1881-D1-P081-L04` |
| Florida Huard, 1 ans — 1871 D2, maison 84 | Marie Huard, 10 ans — 1881 D1, maison 59 | patronyme concordant, prénom différent (Florida / Marie) | `1871-D2-P033-L16` → `1881-D1-P016-L20` |
| Séverin Beaulieu, 13 ans — 1871 D1, maison 35 | Zéphirin Beaulieu, 22 ans, Journalier — 1881 D1, maison 114 | patronyme concordant, prénom différent (Séverin / Zéphirin) | `1871-D1-P014-L16` → `1881-D1-P029-L17` |
| Aubéline Paquet, 5 ans — 1871 D1, maison 40 | Odéline Paquette, 16 ans — 1881 D1, maison 39 | patronyme concordant, prénom différent (Aubéline / Odéline) | `1871-D1-P016-L14` → `1881-D1-P012-L04` |
| Emma Paquet, 0 ans — 1871 D1, maison 40 | Alexina Paquette, 8 ans — 1881 D1, maison 39 | patronyme concordant, prénom différent (Emma / Alexina) | `1871-D1-P016-L15` → `1881-D1-P012-L07` |
| Elise Roberge, 24 ans — 1871 D2, maison 16 | Célie Roberge, 34 ans — 1881 D2, maison 189 | patronyme concordant, prénom différent (Elise / Célie) | `1871-D2-P007-L07` → `1881-D2-P044-L23` |
| Marguerite Boucher, 66 ans — 1871 D2, maison 17 | Marguerite St.Hilaire, 78 ans — 1881 D2, maison 190 | prénom concordant, patronyme différent (Boucher / St.Hilaire) | `1871-D2-P007-L19` → `1881-D2-P045-L12` |
| Elzida Hallé, 2 ans — 1871 D2, maison 5 | Azilda Halé, 12 ans — 1881 D1, maison 63 | patronyme concordant, prénom différent (Elzida / Azilda) | `1871-D2-P002-L16` → `1881-D1-P017-L24` |
| Louise Roberge, 8 ans — 1871 D2, maison 51 | Loveria Roberge, 16 ans — 1881 D2, maison 147 | patronyme concordant, prénom différent (Louise / Loveria) | `1871-D2-P020-L19` → `1881-D2-P035-L25` |
| Louise Roberge, 35 ans — 1871 D2, maison 59 | Caniette Roberge, 45 ans — 1881 D2, maison 162 | patronyme concordant, prénom différent (Louise / Caniette) | `1871-D2-P023-L10` → `1881-D2-P038-L21` |
| Léda Charrette, 8 ans — 1871 D1, maison 133 | Léola Chevrette, 17 ans — 1881 D1, maison 175 | patronyme concordant, prénom différent (Léda / Léola) | `1871-D1-P049-L11` → `1881-D1-P044-L22` |
| John McNaughton, 44 ans, Culler — 1871 D1, maison 28 | Isaac McNaughton, 53 ans, Cultivateur — 1881 D2, maison 220 | patronyme concordant, prénom différent (John / Isaac) | `1871-D1-P011-L15` → `1881-D2-P052-L02` |
| Eva McNaughton, 3 ans — 1871 D1, maison 28 | Ada McNaughton, 14 ans — 1881 D2, maison 220 | patronyme concordant, prénom différent (Eva / Ada) | `1871-D1-P012-L02` → `1881-D2-P052-L09` |
| Aimée Paradis, 16 ans, Journalier — 1871 D1, maison 88 | François Paradis, 25 ans, Journalier — 1881 D1, maison 153 | patronyme concordant, prénom différent (Aimée / François) | `1871-D1-P034-L03` → `1881-D1-P039-L16` |
| Célina Boucher, 8 ans — 1871 D2, maison 11 | Delmia Boucher, 19 ans — 1881 D2, maison 228 | patronyme concordant, prénom différent (Célina / Delmia) | `1871-D2-P004-L20` → `1881-D2-P054-L17` |
| Hubert Roberge, 33 ans, Navigateur — 1871 D2, maison 41 | Sophonias Roberge, 45 ans, Rentier — 1881 D2, maison 160 | patronyme concordant, prénom différent (Hubert / Sophonias) | `1871-D2-P016-L08` → `1881-D2-P038-L07` |
| Selvie Binet, 37 ans — 1871 D2, maison 42 | Célina Binette, 47 ans — 1881 D2, maison 170 | patronyme concordant, prénom différent (Selvie / Célina) | `1871-D2-P017-L08` → `1881-D2-P040-L23` |
| Arsilie Joncas, 2 ans — 1871 D2, maison 53 | Azélie Joncas, 12 ans — 1881 D2, maison 146 | patronyme concordant, prénom différent (Arsilie / Azélie) | `1871-D2-P021-L10` → `1881-D2-P035-L12` |
| John Macready, 50 ans, Timber Tower — 1871 D2, maison 58 | Rose Delima McCready, 60 ans, Navigateur — 1881 D2, maison 72 | patronyme concordant, prénom différent (John / Rose Delima) | `1871-D2-P022-L13` → `1881-D2-P018-L16` |
| Maxina Gingras, 4 ans — 1871 D1, maison 107 | Alexina Gingras, 13 ans — 1881 D1, maison 227 | patronyme concordant, prénom différent (Maxina / Alexina) | `1871-D1-P040-L11` → `1881-D1-P058-L13` |
| Euphrasie Leclerc, 5 ans — 1871 D1, maison 134 | Sofronie Leclerc, 15 ans — 1881 D1, maison 283 | patronyme concordant, prénom différent (Euphrasie / Sofronie) | `1871-D1-P049-L19` → `1881-D1-P072-L22` |
| François Leclerc, 0 ans — 1871 D1, maison 134 | Arthur Leclerc, 10 ans — 1881 D1, maison 283 | patronyme concordant, prénom différent (François / Arthur) | `1871-D1-P049-L20` → `1881-D1-P072-L23` |
| Léda Carrier, 9 ans — 1871 D1, maison 157 | Lydia Carrier, 17 ans, Couturière — 1881 D1, maison 300 | patronyme concordant, prénom différent (Léda / Lydia) | `1871-D1-P059-L09` → `1881-D1-P076-L24` |
| Vitéria Gosselin, 3 ans — 1871 D1, maison 181 | Teberia Gopelin, 13 ans — 1881 D1, maison 279 | patronyme concordant, prénom différent (Vitéria / Teberia) | `1871-D1-P067-L15` → `1881-D1-P071-L22` |
| Artémise Lebel, 7 ans — 1871 D1, maison 192 | Alphonsine Lebel, 16 ans — 1881 D1, maison 287 | patronyme concordant, prénom différent (Artémise / Alphonsine) | `1871-D1-P070-L20` → `1881-D1-P073-L24` |
| William Atkinson, 4 ans — 1871 D1, maison 214 | W.Frédéric Atkinson, 14 ans — 1881 D1, maison 349 | patronyme concordant, prénom différent (William / W.Frédéric) | `1871-D1-P075-L19` → `1881-D1-P088-L12` |
| Achille Picard, 4 ans — 1871 D1, maison 52 | Archild Picard, 13 ans, Apprenti office — 1881 D1, maison 126 | patronyme concordant, prénom différent (Achille / Archild) | `1871-D1-P021-L19` → `1881-D1-P032-L24` |
| Amélie Simoneau, 14 ans — 1871 D1, maison 56 | Hersilie Simoneau, 23 ans — 1881 D1, maison 316 | patronyme concordant, prénom différent (Amélie / Hersilie) | `1871-D1-P022-L20` → `1881-D1-P080-L07` |
| Louis Lambert, 4 ans — 1871 D1, maison 60 | Gédias Lambert, 14 ans — 1881 D1, maison 134 | patronyme concordant, prénom différent (Louis / Gédias) | `1871-D1-P024-L04` → `1881-D1-P035-L02` |
| Emélie Leclerc, 7 ans — 1871 D1, maison 79 | Célanire Leclerc, 17 ans — 1881 D1, maison 78 | patronyme concordant, prénom différent (Emélie / Célanire) | `1871-D1-P031-L07` → `1881-D1-P020-L24` |
| Wilhélmina Clouston, 44 ans — 1871 D1, maison 94 | S.Ordina Clouston, 52 ans — 1881 D1, maison 164 | patronyme concordant, prénom différent (Wilhélmina / S.Ordina) | `1871-D1-P036-L11` → `1881-D1-P041-L16` |
| Anna Clouston, 11 ans — 1871 D1, maison 94 | Sefroy Clouston, 21 ans — 1881 D1, maison 164 | patronyme concordant, prénom différent (Anna / Sefroy) | `1871-D1-P036-L14` → `1881-D1-P041-L17` |
| Délina Guillot, 17 ans — 1871 D2, maison 100 | Marie Elmire Guillotte, 28 ans — 1881 D2, maison 141 | patronyme concordant, prénom différent (Délina / Marie Elmire) | `1871-D2-P039-L11` → `1881-D2-P034-L04` |
| Anthime Côté, 13 ans — 1871 D2, maison 24 | Anselme Coté, 24 ans — 1881 D2, maison 206 | patronyme concordant, prénom différent (Anthime / Anselme) | `1871-D2-P011-L02` → `1881-D2-P048-L14` |
| Siméon Côté, 7 ans — 1871 D2, maison 24 | Alinéon Coté, 16 ans, Fermier — 1881 D2, maison 206 | patronyme concordant, prénom différent (Siméon / Alinéon) | `1871-D2-P011-L03` → `1881-D2-P048-L16` |
| Ursule Côté, 16 ans — 1871 D2, maison 24 | Eugénie Coté, 28 ans — 1881 D2, maison 206 | patronyme concordant, prénom différent (Ursule / Eugénie) | `1871-D2-P011-L05` → `1881-D2-P048-L15` |
| Florida Hardy, 4 ans — 1871 D2, maison 47 | Marie Louise Hardy, 14 ans — 1881 D2, maison 150 | patronyme concordant, prénom différent (Florida / Marie Louise) | `1871-D2-P019-L06` → `1881-D2-P036-L13` |
| Angélique Roberge, 59 ans — 1871 D2, maison 80 | Angélique Fréchette, 68 ans — 1881 D2, maison 105 | prénom concordant, patronyme différent (Roberge / Fréchette) | `1871-D2-P031-L07` → `1881-D2-P026-L11` |
| Elzéar Lefebvre, 4 ans — 1871 D2, maison 92 | Ephrem Lefevre, 14 ans — 1881 D2, maison 130 | patronyme concordant, prénom différent (Elzéar / Ephrem) | `1871-D2-P036-L05` → `1881-D2-P031-L23` |
| Joseph Gauthier, 46 ans, Journalier — 1871 D1, maison 200 | Jean Gauthier, 58 ans, Charpentier — 1881 D1, maison 327 | patronyme concordant, prénom différent (Joseph / Jean) | `1871-D1-P072-L03` → `1881-D1-P082-L16` |
| Amédée Cantin, 0 ans — 1871 D1, maison 42 | Joseph Cantin, 10 ans — 1881 D1, maison 43 | patronyme concordant, prénom différent (Amédée / Joseph) | `1871-D1-P017-L08` → `1881-D1-P012-L19` |
| Louis Couture, 15 ans, Journalier — 1871 D1, maison 43 | Ephrem Couture, 23 ans, Commis — 1881 D1, maison 183 | patronyme concordant, prénom différent (Louis / Ephrem) | `1871-D1-P017-L11` → `1881-D1-P047-L04` |
| Michel Boivin, 17 ans — 1871 D1, maison 95 | M.Joseph Boivin, 28 ans, Commis — 1881 D1, maison 165 | patronyme concordant, prénom différent (Michel / M.Joseph) | `1871-D1-P037-L07` → `1881-D1-P041-L22` |
| Jacques Bergeron, 11 ans — 1871 D2, maison 116 | Ernest Bergeron, 19 ans, Commis — 1881 D2, maison 51 | patronyme concordant, prénom différent (Jacques / Ernest) | `1871-D2-P046-L04` → `1881-D2-P013-L25` |
| Praxède Gagné, 4 ans — 1871 D2, maison 126 | Prudèle Gagné, 13 ans — 1881 D2, maison 37 | patronyme concordant, prénom différent (Praxède / Prudèle) | `1871-D2-P049-L20` → `1881-D2-P010-L03` |
| Césarie Montminy, 4 ans — 1871 D2, maison 145 [?] | Illisible Montminy, 15 ans — 1881 D2, maison 32 | patronyme concordant, prénom différent (Césarie / Illisible) | `1871-D2-P056-L10` → `1881-D2-P008-L21` |
| Julie Bergeron, 36 ans — 1871 D2, maison 148 [?] | Odile Bergeron, 46 ans — 1881 D2, maison 40 | patronyme concordant, prénom différent (Julie / Odile) | `1871-D2-P065-L03` → `1881-D2-P010-L25` |
| Eléonore Bergeron, 4 ans — 1871 D2, maison 148 [?] | Odile Bergeron, 15 ans — 1881 D2, maison 40 | patronyme concordant, prénom différent (Eléonore / Odile) | `1871-D2-P065-L04` → `1881-D2-P011-L01` |
| Adèle Côté, 9 ans — 1871 D2, maison 151 [?] | Aidé Coté, 18 ans — 1881 D2, maison 157 | patronyme concordant, prénom différent (Adèle / Aidé) | `1871-D2-P065-L14` → `1881-D2-P037-L19` |
| Julie Samson, 7 ans — 1871 D2, maison 19 | Belzémire Samson, 16 ans — 1881 D2, maison 191 | patronyme concordant, prénom différent (Julie / Belzémire) | `1871-D2-P008-L16` → `1881-D2-P045-L15` |
| Léon Guay, 6 ans — 1871 D2, maison 59 | Sem Guay, 17 ans — 1881 D2, maison 178 | patronyme concordant, prénom différent (Léon / Sem) | `1871-D2-P023-L08` → `1881-D2-P042-L24` |
| Florida Roberge, 8 ans — 1871 D2, maison 73 | Alganita Roberge, 17 ans — 1881 D2, maison 68 | patronyme concordant, prénom différent (Florida / Alganita) | `1871-D2-P028-L16` → `1881-D2-P017-L22` |
| Elisabeth Cadoret, 8 ans — 1871 D2, maison 87 | Aristeleth Cadorette, 17 ans — 1881 D2, maison 168 | patronyme concordant, prénom différent (Elisabeth / Aristeleth) | `1871-D2-P034-L18` → `1881-D2-P040-L03` |
| Alphonse Lambert, 0 ans — 1871 D1, maison 11 | Edouard Lambert, 10 ans — 1881 D2, maison 6 | patronyme concordant, prénom différent (Alphonse / Edouard) | `1871-D1-P004-L13` → `1881-D2-P002-L19` |
| Marie Viger, 43 ans — 1871 D1, maison 121 | Solvie Piger, 54 ans — 1881 D1, maison 54 | patronyme concordant, prénom différent (Marie / Solvie) | `1871-D1-P044-L11` → `1881-D1-P014-L23` |
| Malvina Poirvert, 16 ans — 1871 D1, maison 197 | Alvina Allaire, 25 ans — 1881 D1, maison 303 | prénom concordant, patronyme différent (Poirvert / Allaire) | `1871-D1-P071-L16` → `1881-D1-P077-L17` |
| Emélie Doran, 7 ans — 1871 D1, maison 34 | Anna Bella Doran, 16 ans — 1881 D1, maison 51 | patronyme concordant, prénom différent (Emélie / Anna Bella) | `1871-D1-P014-L07` → `1881-D1-P014-L07` |
| Joseph Lavoie, 11 ans — 1871 D1, maison 73 | Joseph Larivée, 20 ans, Journalier — 1881 D1, maison 106 | prénom concordant, patronyme différent (Lavoie / Larivée) | `1871-D1-P028-L17` → `1881-D1-P027-L12` |
| Eugénie Lavoie, 5 ans — 1871 D1, maison 73 | Eugénie Larivée, 15 ans — 1881 D1, maison 106 | prénom concordant, patronyme différent (Lavoie / Larivée) | `1871-D1-P028-L18` → `1881-D1-P027-L13` |
| Malvina Joncas, 1 ans — 1871 D1, maison 97 | Joséphine Joncas, 12 ans — 1881 D1, maison 248 | patronyme concordant, prénom différent (Malvina / Joséphine) | `1871-D1-P038-L03` → `1881-D1-P063-L25` |
| Mary Wilson, 45 ans — 1871 D2, maison 14 | Mary McCarthy, 54 ans — 1881 D1, maison 32 | prénom concordant, patronyme différent (Wilson / McCarthy) | `1871-D2-P005-L15` → `1881-D1-P010-L02` |
| Marguerite Alice, 68 ans, Couturière — 1871 D2, maison 14 | Marguerite McCarthy, 77 ans — 1881 D1, maison 32 | prénom concordant, patronyme différent (Alice / McCarthy) | `1871-D2-P006-L06` → `1881-D1-P010-L01` |
| Marie Forgues, 16 ans — 1871 D2, maison 20 | Ursule Forgue, 26 ans — 1881 D2, maison 194 | patronyme concordant, prénom différent (Marie / Ursule) | `1871-D2-P009-L02` → `1881-D2-P045-L22` |
| Albina Bourassa, 4 ans — 1871 D2, maison 81 | Elvira Bourassa, 14 ans — 1881 D2, maison 115 | patronyme concordant, prénom différent (Albina / Elvira) | `1871-D2-P031-L16` → `1881-D2-P029-L07` |
| Césarie Lefebvre, 25 ans — 1871 D2, maison 52 | Céline Lefèvre, 36 ans — 1881 D2, maison 163 | maillon déduit | `1871-D2-P021-L04` → `1881-D2-P039-L05` |
| François Gagné, 20 ans — 1871 D1, maison 46 | F.Xavier Gagné, 30 ans, Journalier — 1881 D1, maison 247 | maillon déduit | `1871-D1-P018-L16` → `1881-D1-P063-L16` |
| Elvina McNaughton, 1 ans — 1871 D1, maison 4 | Cléara McNaughton, 11 ans — 1881 D2, maison 87 | maillon déduit | `1871-D1-P002-L01` → `1881-D2-P021-L22` |
| Loveria Roberge, 16 ans — 1881 D2, maison 147 | Louise Roberge, 26 ans — 1891 D1, maison 475 | maillon déduit | `1881-D2-P035-L25` → `1891-D1-P107-L24` |
| Isaac McNaughton, 53 ans, Cultivateur — 1881 D2, maison 220 | John McNaugton, 62 ans, Cultivateur — 1891 D1, maison 578 | maillon déduit | `1881-D2-P052-L02` → `1891-D1-P131-L06` |
| W.Frédéric Atkinson, 14 ans — 1881 D1, maison 349 | Wm P. Atkinson, 24 ans — 1891 D1, maison 440 | maillon déduit | `1881-D1-P088-L12` → `1891-D1-P099-L08` |
| Archild Picard, 13 ans, Apprenti office — 1881 D1, maison 126 | Achille Picard, 23 ans, Meublier — 1891 D1, maison 256 | maillon déduit | `1881-D1-P032-L24` → `1891-D1-P059-L03` |
| Alinéon Coté, 16 ans, Fermier — 1881 D2, maison 206 | Simeon Côté, 27 ans, Garçon de ferme — 1891 D1, maison 574 | maillon déduit | `1881-D2-P048-L16` → `1891-D1-P130-L07` |
| Sem Guay, 17 ans — 1881 D2, maison 178 | Léon Guay, 25 ans, Débardeur — 1891 D1, maison 500 | maillon déduit | `1881-D2-P042-L24` → `1891-D1-P112-L19` |
| Mary McCarthy, 54 ans — 1881 D1, maison 32 | Mary Wilson, 65 ans — 1891 D1, maison 431 | maillon déduit | `1881-D1-P010-L02` → `1891-D1-P097-L04` |
| Delyre Lagueux, 1 ans — 1881 D1, maison 1 | Pierre Lagueux, 9 ans — 1891 D1, maison 232 | patronyme concordant, prénom différent (Delyre / Pierre) | `1881-D1-P001-L12` → `1891-D1-P054-L21` |
| Edgar Vachon, 7 ans — 1881 D1, maison 216 | Oscar Vachon, 17 ans — 1891 D1, maison 62 | patronyme concordant, prénom différent (Edgar / Oscar) | `1881-D1-P055-L17` → `1891-D1-P016-L04` |
| Louise Delisle, 7 ans — 1881 D1, maison 257 | Clelie Delisle, 17 ans — 1891 D1, maison 95 | patronyme concordant, prénom différent (Louise / Clelie) | `1881-D1-P066-L14` → `1891-D1-P022-L25` |
| Edmond Deschênes, 13 ans — 1881 D1, maison 58 | Edouard Deschênes, 21 ans, Cordonnier — 1891 D1, maison 288 | patronyme concordant, prénom différent (Edmond / Edouard) | `1881-D1-P016-L05` → `1891-D1-P066-L01` |
| Georges Amédée Forcat, 1 ans — 1881 D2, maison 13 | Amédé Joncas, 9 ans — 1891 D1, maison 312 | prénom concordant, patronyme différent (Forcat / Joncas) | `1881-D2-P004-L12` → `1891-D1-P071-L04` |
| Jacques Demers, 33 ans, Journalier — 1881 D1, maison 135 | Jacques Demore, 42 ans, Cuisinier de chantier — 1891 D1, maison 235 | prénom concordant, patronyme différent (Demers / Demore) | `1881-D1-P035-L14` → `1891-D1-P055-L12` |
| Merina Bélanger, 1 ans — 1881 D1, maison 263 | Louisa Belanger, 11 ans — 1891 D1, maison 16 | patronyme concordant, prénom différent (Merina / Louisa) | `1881-D1-P068-L07` → `1891-D1-P005-L06` |
| Alexis Vermette, 67 ans, Journalier — 1881 D1, maison 265 | Alain Vermette, 75 ans — 1891 D1, maison 11 | patronyme concordant, prénom différent (Alexis / Alain) | `1881-D1-P068-L12` → `1891-D1-P004-L03` |
| Pierre Labé, 13 ans — 1881 D1, maison 72 | Octave Labbé, 22 ans, Journalier — 1891 D1, maison 634 | patronyme concordant, prénom différent (Pierre / Octave) | `1881-D1-P019-L12` → `1891-D1-P140-L25` |
| Erminia Roberge, 2 ans — 1881 D2, maison 122 | Lumina Roberge, 12 ans — 1891 D1, maison 515 | patronyme concordant, prénom différent (Erminia / Lumina) | `1881-D2-P030-L15` → `1891-D1-P116-L12` |
| Céline Lefèvre, 36 ans — 1881 D2, maison 163 | Cézarie Lefèvre, 45 ans — 1891 D1, maison 453 | patronyme concordant, prénom différent (Céline / Cézarie) | `1881-D2-P039-L05` → `1891-D1-P102-L02` |
| Eudoxie Lefèvre, 9 ans — 1881 D2, maison 163 | Lucie Lefèvre, 18 ans, Servante — 1891 D1, maison 453 | patronyme concordant, prénom différent (Eudoxie / Lucie) | `1881-D2-P039-L06` → `1891-D1-P102-L03` |
| Ludger St.Hilaire, 15 ans — 1881 D2, maison 190 | Ulzer St-Hilaire, 24 ans, Charpentier — 1891 D1, maison 322 | patronyme concordant, prénom différent (Ludger / Ulzer) | `1881-D2-P045-L06` → `1891-D1-P073-L11` |
| Emilie St.Hilaire, 8 ans — 1881 D2, maison 190 | Desneige St-Hilaire, 19 ans — 1891 D1, maison 322 | patronyme concordant, prénom différent (Emilie / Desneige) | `1881-D2-P045-L09` → `1891-D1-P073-L15` |
| Léa Boucher, 9 ans — 1881 D2, maison 210 | Delia Boucher, 18 ans, Fille de manufacture — 1891 D1, maison 124 | patronyme concordant, prénom différent (Léa / Delia) | `1881-D2-P049-L17` → `1891-D1-P030-L05` |
| Odénige St.Hilaire, 8 ans — 1881 D2, maison 217 | Desneige St-Hilaire, 17 ans — 1891 D1, maison 610 | patronyme concordant, prénom différent (Odénige / Desneige) | `1881-D2-P051-L11` → `1891-D1-P136-L20` |
| Damase Beaulieu, 7 ans — 1881 D1, maison 10 | Joseph Beaulieu, 17 ans — 1891 D1, maison 419 | patronyme concordant, prénom différent (Damase / Joseph) | `1881-D1-P004-L01` → `1891-D1-P094-L22` |
| Aglaé Gagnon, 7 ans — 1881 D1, maison 107 | Adélaïde Gagnon, 16 ans — 1891 D1, maison 379 | patronyme concordant, prénom différent (Aglaé / Adélaïde) | `1881-D1-P027-L23` → `1891-D1-P087-L14` |
| F.Xavier Gagné, 30 ans, Journalier — 1881 D1, maison 247 | François Gagné, 39 ans, Journalier — 1891 D1, maison 344 | patronyme concordant, prénom différent (F.Xavier / François) | `1881-D1-P063-L16` → `1891-D1-P079-L12` |
| Vitaliche Roberge, 28 ans — 1881 D1, maison 253 | Petaline Roberge, 36 ans — 1891 D1, maison 32 | patronyme concordant, prénom différent (Vitaliche / Petaline) | `1881-D1-P065-L08` → `1891-D1-P008-L18` |
| Freddy Edmond, 2 ans — 1881 D1, maison 267 | Alfred Emond, 10 ans — 1891 D1, maison 102 | patronyme concordant, prénom différent (Freddy / Alfred) | `1881-D1-P069-L08` → `1891-D1-P025-L01` |
| Georgina Lambert, 10 ans — 1881 D1, maison 97 | Rosina Lambert, 22 ans — 1891 D1, maison 66 | patronyme concordant, prénom différent (Georgina / Rosina) | `1881-D1-P025-L16` → `1891-D1-P017-L02` |
| Louis St.Laurent, 11 ans — 1881 D2, maison 101 | Pierre St Laurent, 21 ans, Journalier — 1891 D1, maison 485 | patronyme concordant, prénom différent (Louis / Pierre) | `1881-D2-P025-L07` → `1891-D1-P109-L22` |
| Adélaïde Boutet, 40 ans — 1881 D2, maison 142 | Delores Boulet, 50 ans — 1891 D1, maison 505 | patronyme concordant, prénom différent (Adélaïde / Delores) | `1881-D2-P034-L09` → `1891-D1-P114-L03` |
| Arthur Boucher, 2 ans — 1881 D2, maison 41 | Louis Boucher, 11 ans — 1891 D1, maison 308 | patronyme concordant, prénom différent (Arthur / Louis) | `1881-D2-P011-L14` → `1891-D1-P070-L03` |
| Cléara McNaughton, 11 ans — 1881 D2, maison 87 | Elvira McNaughton, 20 ans — 1891 D1, maison 318 | patronyme concordant, prénom différent (Cléara / Elvira) | `1881-D2-P021-L22` → `1891-D1-P072-L06` |
| Flore Tremblay, 28 ans — 1881 D1, maison 158 | Flore Bégin, 38 ans — 1891 D1, maison 365 | prénom concordant, patronyme différent (Tremblay / Bégin) | `1881-D1-P040-L07` → `1891-D1-P084-L08` |
| Eloïs Chevrette, 8 ans — 1881 D1, maison 175 | Élaïe Chevrette, 17 ans — 1891 D1, maison 211 | patronyme concordant, prénom différent (Eloïs / Élaïe) | `1881-D1-P044-L25` → `1891-D1-P049-L25` |
| Artémise Gingras, 1 ans — 1881 D1, maison 335 | Marie Louise Gingras, 9 ans — 1891 D1, maison 163 | patronyme concordant, prénom différent (Artémise / Marie Louise) | `1881-D1-P084-L09` → `1891-D1-P039-L09` |
| Bourgette Joncas, 30 ans — 1881 D2, maison 103 | Eleonard Joncas, 40 ans — 1891 D1, maison 513 | patronyme concordant, prénom différent (Bourgette / Eleonard) | `1881-D2-P025-L21` → `1891-D1-P115-L19` |
| Marie Simoneau, 36 ans — 1881 D2, maison 128 | Georgenia Simoneau, 45 ans — 1891 D1, maison 406 | patronyme concordant, prénom différent (Marie / Georgenia) | `1881-D2-P031-L10` → `1891-D1-P091-L22` |
| Emilie Boucher, 8 ans — 1881 D2, maison 228 | Colonir Boucher, 17 ans — 1891 D1, maison 568 | patronyme concordant, prénom différent (Emilie / Colonir) | `1881-D2-P054-L20` → `1891-D1-P128-L15` |
| F.Xavier Rev. Smith, 55 ans, Registeur — 1881 D2, maison 230 | Fred Augustin Smith, 66 ans, Ministre — 1891 D1, maison 611 | patronyme concordant, prénom différent (F.Xavier Rev. / Fred Augustin) | `1881-D2-P055-L01` → `1891-D1-P136-L25` |
| Marie Valeria Montigny, 5 ans — 1881 D2, maison 3 | Victoria Montigny, 15 ans — 1891 D1, maison 414 | patronyme concordant, prénom différent (Marie Valeria / Victoria) | `1881-D2-P001-L23` → `1891-D1-P093-L14` |
| Marie Aldina Montigny, 2 ans — 1881 D2, maison 3 | Alderine Montigny, 12 ans — 1891 D1, maison 414 | patronyme concordant, prénom différent (Marie Aldina / Alderine) | `1881-D2-P001-L25` → `1891-D1-P093-L16` |
| J.Baptiste Bernier, 1 ans — 1881 D1, maison 213 | Joseph Bernier, 9 ans — 1891 D1, maison 18 | patronyme concordant, prénom différent (J.Baptiste / Joseph) | `1881-D1-P054-L07` → `1891-D1-P005-L16` |
| Adèle Doré, 16 ans — 1881 D1, maison 230 | Adele Rochette, 26 ans — 1891 D1, maison 109 | prénom concordant, patronyme différent (Doré / Rochette) | `1881-D1-P059-L11` → `1891-D1-P026-L18` |
| Joséphine Joncas, 12 ans — 1881 D1, maison 248 | Josephine Lacroix, 21 ans — 1891 D1, maison 180 | prénom concordant, patronyme différent (Joncas / Lacroix) | `1881-D1-P063-L25` → `1891-D1-P043-L06` |
| Elize Gauthier, 22 ans — 1881 D1, maison 327 | Eliza Letarte, 32 ans — 1891 D1, maison 201 | prénom concordant, patronyme différent (Gauthier / Letarte) | `1881-D1-P082-L18` → `1891-D1-P047-L22` |
| Virginie Bégin, 2 ans — 1881 D1, maison 41 | Pergina Bégin, 10 ans — 1891 D1, maison 268 | patronyme concordant, prénom différent (Virginie / Pergina) | `1881-D1-P012-L13` → `1891-D1-P061-L14` |
| Stanislas Boucher, 2 ans — 1881 D1, maison 48 | Harvey Boucher, 10 ans — 1891 D1, maison 270 | patronyme concordant, prénom différent (Stanislas / Harvey) | `1881-D1-P013-L25` → `1891-D1-P062-L02` |
| Alviard Leclerc, 7 ans — 1881 D1, maison 78 | Amanda Leclerc, 17 ans — 1891 D1, maison 437 | patronyme concordant, prénom différent (Alviard / Amanda) | `1881-D1-P021-L03` → `1891-D1-P098-L17` |
| Odina Bilodeau, 3 ans — 1881 D2, maison 125 | Regina Bilodeau, 11 ans — 1891 D1, maison 521 | patronyme concordant, prénom différent (Odina / Regina) | `1881-D2-P031-L05` → `1891-D1-P118-L08` |
| Elisabeth Walker, 19 ans — 1881 D2, maison 236 | Lane Walker, 28 ans — 1891 D1, maison 498 | patronyme concordant, prénom différent (Elisabeth / Lane) | `1881-D2-P056-L13` → `1891-D1-P112-L08` |
| Brigitte Roberge, 19 ans — 1881 D2, maison 240 | Belzemir Roberge, 28 ans — 1891 D1, maison 585 | patronyme concordant, prénom différent (Brigitte / Belzemir) | `1881-D2-P057-L10` → `1891-D1-P132-L10` |
| Thomas St.Hilaire, 18 ans, Journalier — 1881 D2, maison 244 | Edouard St-Hilaire, 29 ans, Instituteur — 1891 D1, maison 622 | patronyme concordant, prénom différent (Thomas / Edouard) | `1881-D2-P057-L22` → `1891-D1-P139-L08` |
| Thomy Gagné, 11 ans — 1881 D2, maison 37 | Johny Gagne, 19 ans, Journalier — 1891 D1, maison 158 | patronyme concordant, prénom différent (Thomy / Johny) | `1881-D2-P010-L04` → `1891-D1-P038-L03` |
| Edouard Toussaint, 36 ans, Batelier — 1881 D1, maison 101 | Edmond Toussaint, 45 ans, Employé — 1891 D1, maison 373 | patronyme concordant, prénom différent (Edouard / Edmond) | `1881-D1-P026-L14` → `1891-D1-P086-L05` |
| Mœdi Landry, 45 ans — 1881 D1, maison 108 | Marie Landry, 56 ans — 1891 D1, maison 193 | patronyme concordant, prénom différent (Mœdi / Marie) | `1881-D1-P028-L05` → `1891-D1-P046-L08` |
| Samuel Robin, 2 ans — 1881 D1, maison 147 | Médé Robin, 10 ans — 1891 D1, maison 186 | patronyme concordant, prénom différent (Samuel / Médé) | `1881-D1-P038-L04` → `1891-D1-P044-L18` |
| Alfred Rouleau, 11 ans — 1881 D1, maison 159 | Albert Rouleau, 21 ans, Journalier — 1891 D1, maison 333 | patronyme concordant, prénom différent (Alfred / Albert) | `1881-D1-P040-L16` → `1891-D1-P076-L11` |
| Délina Simard, 33 ans, Marchande — 1881 D1, maison 182 | Delina Gosselin, 44 ans, Épicière — 1891 D1, maison 127 | prénom concordant, patronyme différent (Simard / Gosselin) | `1881-D1-P046-L23` → `1891-D1-P030-L25` |
| Régis Martel, 65 ans, Menuisier — 1881 D1, maison 250 | Rigiete Martel, 74 ans, Charpentier — 1891 D1, maison 628 | patronyme concordant, prénom différent (Régis / Rigiete) | `1881-D1-P064-L15` → `1891-D1-P140-L05` |
| George Sax, 54 ans, Bourgeois — 1881 D1, maison 318 | George Fox, 63 ans, Rentier — 1891 D1, maison 76 | prénom concordant, patronyme différent (Sax / Fox) | `1881-D1-P080-L19` → `1891-D1-P018-L22` |
| Alfred Ferland, 1 ans — 1881 D1, maison 324 | Arthur Ferland, 9 ans — 1891 D1, maison 40 | patronyme concordant, prénom différent (Alfred / Arthur) | `1881-D1-P082-L05` → `1891-D1-P010-L21` |
| Rosana Demers, 8 ans — 1881 D1, maison 94 | Rosana Boucher, 18 ans — 1891 D1, maison 381 | prénom concordant, patronyme différent (Demers / Boucher) | `1881-D1-P024-L22` → `1891-D1-P087-L24` |
| Gordon Anderson, 4 ans — 1881 D2, maison 205 | Rabert Anderson, 14 ans — 1891 D1, maison 577 | patronyme concordant, prénom différent (Gordon / Rabert) | `1881-D2-P048-L10` → `1891-D1-P131-L05` |
| Belzémire Boucher, 17 ans — 1881 D2, maison 209 | Malvina Boucher, 28 ans — 1891 D1, maison 576 | patronyme concordant, prénom différent (Belzémire / Malvina) | `1881-D2-P049-L12` → `1891-D1-P130-L20` |
| Isabella McNaughton, 44 ans — 1881 D2, maison 220 | Ann McNaugton, 53 ans — 1891 D1, maison 578 | patronyme concordant, prénom différent (Isabella / Ann) | `1881-D2-P052-L03` → `1891-D1-P131-L07` |
| Denis McNaughton, 2 ans — 1881 D2, maison 220 | James McNaugton, 10 ans — 1891 D1, maison 578 | patronyme concordant, prénom différent (Denis / James) | `1881-D2-P052-L11` → `1891-D1-P131-L11` |
| Barthélemy Bergeron, 11 ans — 1881 D2, maison 42 | Bartelimi Bergeron, 22 ans, Mesureur de bois — 1891 D1, maison 286 | patronyme concordant, prénom différent (Barthélemy / Bartelimi) | `1881-D2-P011-L19` → `1891-D1-P065-L11` |
| Rémi Lambert, 41 ans, Cultivateur — 1881 D2, maison 6 | Prime Lambert, 52 ans, Cultivateur — 1891 D1, maison 317 | patronyme concordant, prénom différent (Rémi / Prime) | `1881-D2-P002-L17` → `1891-D1-P072-L02` |
| Laura Andrew, 10 ans — 1881 D2, maison 61 | Laura St-Hilaire, 20 ans — 1891 D1, maison 550 | prénom concordant, patronyme différent (Andrew / St-Hilaire) | `1881-D2-P016-L08` → `1891-D1-P124-L18` |

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
