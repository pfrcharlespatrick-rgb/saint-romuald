# La colonne 16 de 1881 division 1 — journal de la passe

**88 pages relues au manuscrit. 20 pages fautives, 66 écoliers ajoutés,
16 retirés.** Le compte passe de **309 à 353**.

## Pourquoi cette passe

Le contrôle de cohérence (`outils/relecture-1881/controle.mjs`) a sorti deux
écoliers de plus de vingt ans et trois de moins de quatre ans. Les cinq sont
allés au manuscrit : **aucun des cinq n'est à l'école.** Une colonne qui produit
cinq impossibilités n'a pas cinq erreurs, elle a un défaut de méthode.

Le complément le savait à moitié. Il portait cette note :

> « En colonne 15, le recenseur accole au "M." ou au "V°" une petite marque de
> pointage qui déborde sur la colonne 16. […] Le relevé est donc prudent : il
> peut manquer des écoliers, **il n'en invente pas**. »

Le mécanisme était juste. La conclusion, non : **il faisait les deux.**

## Ce qui distingue les deux marques

| | |
|---|---|
| **école** | un « 1 » franc, haut, **centré** sous le 16 |
| **pointage** | un petit signe bas et penché, **collé au bord gauche** de la 16, qui suit toujours un « M. » ou un « Ve. » de la colonne 15 |

Et le greffier pointe aussi la colonne 16 elle-même : cette coche-là tombe au
bord gauche de la 17. C'est le même greffier dont le trait a servi, à la passe
des professions, à trancher les petits guillemets de la colonne 14.

La vue `prof1.py --vue=ecole` porte donc **la colonne 15 à côté de la 16**, avec
la marge des numéros de ligne et l'âge. Lire la 16 seule, c'est refaire l'erreur.

## Où le défaut se trouve

**Pages 48 à 60 : dix pages fautives sur douze.** C'est là que le dépouillement
a lâché, et il a lâché de toutes les façons possibles :

| | |
|---|---|
| **Quatre pages ne relevaient rien** — 51, 53, 54, 57, 58 | le manuscrit y porte de une à douze marques |
| **Deux relevaient une école qui n'en est pas une** — 50, 59 | Paquet Philéas, 1 an ; Roberge Albert, 6 mois. Tirets au manuscrit, et les vraies écoles de ces pages manquaient toutes |
| **Une est décalée d'un rang** — 49 | la marque est sur Delvina, 12 ans, non sur Louis, 13 ans |
| **Une est décalée de plusieurs rangs** — 55 | lignes 17-19 relevées ; le manuscrit marque 11-13 et 15-17 |
| **Page 48** | la seule école relevée était Martel Jean Baptiste, 48 ans, pharmacien — c'est le trait de pointage du « M. ». Les six vraies écoles, sur des enfants de 6 à 12 ans, manquaient |

**La page 51 à elle seule** rend dix écoliers : la fratrie Guenette (10, 8 et
6 ans), les cinq enfants Lapierre (16, 14, 11, 9 et 7 ans) et deux Aubert (15 et
12 ans). **La page 57 en rend douze**, dont la suite des six enfants Marceau, de
19 à 7 ans.

Ailleurs le défaut est clairsemé : page 41 (une sœur de seize ans oubliée à côté
de celle de treize), page 46 (quatre — le complément tenait la page pour longue
de 23 lignes), page 47 (aucune relevée, une au manuscrit), page 79, page 84,
85, 86, 87 (des marques relevées là où le manuscrit porte un tiret), et
**page 88, qui n'avait pas de clé « ecole » du tout** : six écoliers de 14 à
8 ans.

## Ce que la passe a rendu à la page 12

Page 12 ligne 11, **Bégin Marie, six ans**, portait un « 1 » franc que le
complément avait manqué. C'est la marque qui avait servi, avec le « Ve. » de son
père et l'âge à un seul chiffre, à établir qu'elle est sa fille et non son
épouse. Elle est désormais au fichier de plein droit.

## Deux choses lues et NON écrites

### Les pages 82 et 83 ne portent aucune marque d'école

Le complément en relève quatre à la page 82 (lignes 7, 8, 15, 16) et trois à la
83 (lignes 3, 4, 11). **Le manuscrit n'en porte aucune, sur ni l'une ni
l'autre** : la colonne 16 y est un tiret d'un bout à l'autre.

Ces deux pages sont suspendues dans le complément depuis longtemps, parce qu'il
y décrit des personnes que le registre ne contient pas. **Ce relevé-ci va dans
le même sens et le renforce** : ce n'est pas un décalage de lignes, c'est un
autre feuillet. Rien n'y a été touché.

### Trois marques en colonne 17 — les sourds-muets (**versées depuis**)

Trois lignes portent une marque **sous le 17**, vérifiée à la réglette imprimée,
là où le complément avait lu une école :

- **p11 L8** — Bégin G. Honoré, 5 ans
- **p50 L16** — Plaisance Marie Louise, 38 ans
- **p50 L17** — Plaisance Pierre, 33 ans

Le complément ne déclarait que deux infirmités dans toute la division (p17 L17 et
p29 L10, en colonne 19). Les fausses écoles ont été retirées tout de suite ; les
marques de la colonne 17, elles, ont attendu — porter une infirmité sur quelqu'un
est une décision, pas une lecture.

**Patrick a tranché : les trois sont versées.** Elles ont été revérifiées une
dernière fois à la réglette avant écriture — la marque est sous le 17, la
colonne 16 porte un tiret sur les trois lignes. **La division 1 compte donc cinq
infirmités déclarées et non deux** : deux en colonne 19, trois en colonne 17.
Marie Louise et Pierre Plaisance sont sœur et frère, sous le même toit.

## L'outillage

| | |
|---|---|
| `prof1.py --vue=ecole` | la planche : numéros de ligne, âge, colonnes 15-16-17. `--reglette` empile la rangée imprimée des numéros de colonne, qui tranche seule. |
| `ecole1.mjs` | verse un lot dans `data/complement-1881-d1-data.js`, là où la colonne 16 vit, et dit ce qu'il ajoute et ce qu'il retire. |
| `lots81/ecole-*.json` | la trace de la lecture, page par page, liste complète. Les repasser doit rendre zéro écart. |
