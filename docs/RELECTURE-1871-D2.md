# Recensement de 1871, division 2 — relecture au manuscrit

**Pages 1 à 35 relues.** C'est tout ce que les six recueils PDF du sous-district
C (Etchemin) portent de cette division.

## Ce que les recueils portent vraiment

Le journal de la division 1 annonçait « division 2, pages 1 à 17 ». **Le
recueil 5 s'arrête à la page 15** : sa dernière page PDF — deux cadres, comme
les autres — ne porte pas les pages 16 et 17, elle **répète les pages 14 et
15**, reprise de vue au moment du microfilmage. Les deux cadres portent en
toutes lettres « Page 14 » et « Page 15 » dans leur en-tête.

**Un sixième recueil**, joint plus tard, reprend exactement là : **pages 16 à
35**, deux cadres par page PDF, sans irrégularité.

### Attention au nom des fichiers

Ce sixième recueil s'appelle **« Recensements_1871NewLiverpool_Partie2 »** —
comme le deuxième recueil du premier envoi, qui tient tout autre chose : les
pages 18 à 37 de la **division 1**. Le nom ne les distingue pas. Pris au nom,
l'outil aurait lu une division pour l'autre sans rien dire.

`recueil71.py` les sépare à la **taille du fichier**, qui ne bouge pas d'un
envoi à l'autre (7 698 348 octets pour la division 1, 8 496 307 pour la
division 2), et **refuse de choisir** quand il ne reconnaît ni l'une ni l'autre
plutôt que de prendre le premier venu. Le second est le « recueil 6 » dans tout
le module.

**Les 38 dernières pages de la division 2 — 36 à 73 — ne sont dans aucun
recueil.** Elles demanderont d'autres images.

## Une division déjà relevée à la main

Contrairement à la division 1, la division 2 n'avait pas de colonnes vides : le
lieu de naissance, la religion, l'origine, l'état matrimonial, les infirmités et
le mois de naissance y sont partout. Et Patrick a déjà relu ces pages dans
l'atelier : **215 des 300 lignes des pages 1 à 15 portent au moins une
correction de sa main**, dont 77 sur `sait_lire` et 75 sur `sait_ecrire`.

La relecture n'avait donc presque rien à verser. Elle a versé **17 champs** :
cinq mois de naissance que la colonne 10 donne et que le fichier n'avait pas,
un mariage des douze derniers mois, et une poignée de marques des colonnes 15,
17, 18 et 19 sur des lignes que personne n'avait touchées.

## Ce que la relecture signale sans y toucher

**La règle du projet est sans exception : un champ corrigé à la main n'est jamais
réécrit ; une relecture qui propose autre chose le signale et passe son chemin.**
`outils/relecture-1881/atelier.mjs` l'applique, et ne rapporte désormais que les
refus où la main et la relecture **ne disent pas la même chose** — un refus sur
lequel les deux s'accordent n'apprend rien.

Voici ce que la relecture a laissé : **90 champs sur 8 pages**.

| Page | Lignes | Champs |
|---|---|---|
| 1 | 1 à 10, 13 à 19 | `sait_lire` ×17, `sait_ecrire` ×17 |
| 2 | 1, 2, 5 à 9, 12 à 16, 20 | `sait_lire` ×12, `sait_ecrire` ×13 |
| 3 | 1 à 7, 9, 16, 17 | `sait_lire` ×10, `sait_ecrire` ×10 |
| 5 | 3 | `sait_lire`, `sait_ecrire` |
| 6 | 6, 9 | `sait_lire` ×2, `sait_ecrire` |
| 9 | 5 | `etat_matrimonial` |
| 11 | 6 | `ecole` |
| 13 | 8, 15, 16 | `ecole` ×3, `etat_matrimonial` |

Le détail ligne à ligne s'obtient en rejouant le lot :

    node outils/relecture-1881/lot71.mjs outils/relecture-1881/lots71/d2-001-015.json --essai

### Les pages 1, 2 et 3 : ce que porte le manuscrit

C'est de loin le plus gros écart, et il vaut d'être posé précisément.

Le fichier tient, sur ces trois pages, **52 des 60 personnes** pour ne sachant ni
lire ni écrire — y compris des enfants d'un an et des écoliers de huit ans que
la colonne 17 coche à la même ligne.

Le manuscrit, lui, ne porte de marque aux colonnes 18 et 19 que sur **douze
lignes**, et toutes sur des adultes :

| | |
|---|---|
| page 1 | Etienne Côté (46) et Judith (37), ligne 11 et 12 ; Edouard Demers (24), ligne 20 |
| page 2 | Célestin Bois (40) et Emélie (30), lignes 3 et 4 ; Lucie Veer (30), ligne 17 ; Pierre Cantin (64) et Brigitte (50), lignes 18 et 19 |
| page 3 | Ignace Roberge (49) et Eléonore (41), lignes 10 et 11 ; Joseph Roberge (50) et Geneviève (51), lignes 18 et 19 |

Partout ailleurs, sur ces trois pages, les colonnes 18 et 19 ne portent qu'un
tiret. Rappel de la polarité du formulaire de 1871 : **la colonne ne recense que
l'incapacité**, et seulement au-dessus de 20 ans. Un tiret ne dit pas qu'on sait
lire ; il dit que la question ne se posait pas, ou qu'on ne l'a pas relevée.

La page 3 porte en plus **trois marques biffées par le recenseur lui-même** —
ligne 9 en colonne 19, lignes 12 et 13 en colonnes 18 et 19 — qui ne comptent
donc pas. Le même geste se retrouve page 4 ligne 2, page 5 ligne 10, page 8
ligne 10, page 10 ligne 4 et page 11 ligne 12.

**Rien n'a été écrit sur ces lignes.** La décision revient à Patrick.

### Les autres écarts

- **Page 5 ligne 3 et page 6 lignes 6 et 9, page 11 ligne 6, page 13 lignes 15
  et 16** : la marque est sur la ligne voisine au manuscrit. Page 5, les
  colonnes 18 et 19 cochent **Marie Curodo, 28 ans** (ligne 4), non son mari
  Joseph ; page 6, elles cochent **Viliane Bruneau, 74 ans** (ligne 7), non
  Margueret Alice ; page 11, la colonne 17 coche Siméon, Pierre et Eugénie
  (lignes 3, 4 et 6), non Anthime, Siméon et Ursule.
- **Page 9 ligne 5** : la colonne 15 de J. Baptiste Dion se lit « M », non « V ».
- **Page 13 ligne 15** : la colonne 15 ne porte rien ; le fichier y a un « C »
  qui n'est pas une valeur du formulaire.
- **Page 6 ligne 17** : la colonne 9 se lit 11/12 et la colonne 10 « Mai », ce
  qui s'accorde ; le fichier porte 5/12. L'âge est de la main de Patrick, non
  touché — mais le mois a été versé.

## Ce que la relecture a versé

| Page | Ligne | Qui | Ce qui a été écrit |
|---|---|---|---|
| 5 | 2 | Jacob Boucher, 7/12 | né en **septembre** |
| 5 | 9 | Joséphine Côté, 4/12 | née en **décembre** |
| 6 | 17 | Napoléon St-Hilaire | né en **mai** |
| 7 | 18 | Ernestine St-Hilaire, 6/12 | née en **septembre** |
| 11 | 8 | Virgina Côté, 7/12 | née en **septembre** |
| 13 | 7 | Louis Boucher, 17 ans | **marié dans les douze derniers mois** |

Plus une dizaine de marques des colonnes 15, 17, 18 et 19 sur des lignes
qu'aucune main n'avait touchées.

## Les pages qui concordent

Les pages **4, 7, 8, 10, 12, 14 et 15** concordent avec le manuscrit sur les
quatre colonnes à marques, à la ligne près. C'est ce qui donne confiance dans
les écarts relevés ailleurs : la méthode a été contrôlée sur des pages à vérité
connue avant d'être opposée à quoi que ce soit.

## Les pages 16 à 35 — une tout autre affaire

Patrick n'a pas relu ces pages à la main : au-delà de la page 20, aucune ligne
ne porte de correction. Et le dépouillement y est **d'une tout autre facture**
que sur les quinze premières pages — il y a semé ses doutes **dans les valeurs
elles-mêmes** :

    "age": "54 [?]"      "lieu_naissance": "Q [?]"      "origine": "Anglaise [?]"
    "etat_matrimonial": "V [?]"      "nom": "Granell [?]"      "age": ""

**128 des 399 lignes** en portaient au moins un, pour **190 valeurs** en tout,
et **quinze âges étaient tout simplement vides**. Le manuscrit les tranche.

| | avant | après |
|---|---:|---:|
| valeurs entre crochets | 190 | **0** |
| âges vides | 15 | **0** |
| mariés dans les douze derniers mois | 0 | **8** |
| lignes marquées `incertain` | 128 | **9** |

### Ce que la relecture a trouvé

- **La colonne 16 était vide de bout en bout** sur ces vingt pages, alors que le
  manuscrit y porte quatre mariages des douze derniers mois : J. Baptiste
  Croteau et Marie en février (p. 16), William Vachon et Aveline en juin
  (p. 18), Joseph Huard et Julie en octobre (p. 28), Benjamin Bolduc et Délima
  en juillet (p. 33).
- **Quinze nourrissons rendus à leur âge et à leur mois.** Le dépouillement
  butait sur la fraction sur douze et laissait la case vide ; le manuscrit donne
  les deux, et ils se recoupent — un enfant de 9/12 porte « Jull. », à neuf mois
  du 2 avril 1871.
- **Un arbitrage explicite rendu.** Le dépouillement notait, pour Hubert
  Roberge (p. 20), « âge maintenu 54 [?] en attente d'arbitrage », craignant une
  lecture « 34 » et un doublon avec l'Hubert Roberge de 33 ans de la maison 41.
  Le manuscrit lit **54** sans ambiguïté : ce sont bien deux hommes différents.
- **« Timber Tower », le métier qui revient trois fois.** Le dépouillement le
  lisait « Timber tower [?] » sans y croire ; le manuscrit l'écrit en toutes
  lettres page 26, pour Charles Ward et William Andrew. Il avait raison.
- **Trois lignes que l'index de BAC ne porte pas** — page 33, la famille de
  Benjamin Bolduc — sont bien au manuscrit, et lisibles : Bolduc (non
  « Bilodeau »), 23 ans, marié en juillet, avec Délima, 18 ans, et Emma, un
  mois.
- **Les Allen sont nés en Irlande** (p. 22), les Brown sont de l'Église
  d'Écosse (p. 25-26), les Lee catholiques (p. 30) : le guillemet de reprise,
  encore, que le dépouillement n'avait pas suivi.
- **Six patronymes rendus** : « Savard », « Sinjohn », « Cegney », « Granell »,
  « Bolduc », « Courcy ».
- **Une trentaine de marques** des colonnes 15, 17, 18 et 19 remises à la bonne
  ligne — dont sept écoliers que le dépouillement avait manqués.

### Ce qui reste

Neuf lignes restent marquées `incertain` sur les 399, et elles le sont pour des
raisons que le manuscrit ne lève pas : un numéro de famille douteux (p. 23), le
rattachement des enfants Paré (p. 27), deux âges que le dépouillement discutait
déjà (p. 30 et 31).

**Les pages 36 à 73** — 1 058 personnes, dont 403 valeurs encore entre
crochets — attendent leurs images.
