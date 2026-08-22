# Dictionnaire des données — Recensements de Saint-Romuald

État au 27 juillet 2026, après uniformisation. Chaque fichier pose un seul objet sur
`window`. Aucune valeur recensée n'a été modifiée lors de l'uniformisation : seuls
les noms de clés, les identifiants et les colonnes de provenance ont changé.

---

## Conventions générales

**Identifiant de personne** : `ANNEE-Ddivision-Ppage-Lligne`, page sur 3 chiffres,
ligne sur 2. Exemple : `1871-D2-P001-L01`.
En cas de collision (deux personnes à la même page et ligne — 5 cas en 1871
division 1), un suffixe `-2`, `-3` est ajouté.
Chaque personne conserve son identifiant d'avant dans `id_ancien`, ce qui permet de
reclasser tout travail antérieur sans table de conversion externe.

**Anciennes conventions**, pour mémoire : `D2-P01-L01` (1871 D2),
`D1-P1-01` (1871 D1), `D1-1881-P1-01` (1881), `D1-1891-27759548` (1891 — c'était
l'identifiant BAC, pas une position).

**Booléens** : toujours de vrais `true`/`false`, jamais 0/1 ni "oui".

**Champs vides** : chaîne vide `""`, jamais `null`. Un champ absent de l'objet
signifie « information non relevée » ; un champ à `""` signifie « relevé, vide au
manuscrit ». La distinction compte pour un chercheur — ne l'écrase pas en migrant.

**Alphabétisation** : uniformisée en polarité positive `sait_lire` / `sait_ecrire`.
Le formulaire de 1871 posait la question à l'envers (« ne lit pas ») ; la conversion
est enregistrée dans `alphabetisation_source` (`negatif_1871` ou `positif_1891`)
pour que la provenance reste vérifiable.

> **La colonne de 1871 ne concerne que les adultes.** Son intitulé exact est
> « 20 ans et plus, ne sachant pas lire / ne sachant pas écrire ». Pour les
> 1 570 personnes de moins de 20 ans, le `sait_lire: true` produit par la
> conversion n'est **pas une donnée du manuscrit** — la question ne leur était
> pas posée. **Ne jamais agréger `sait_lire`/`sait_ecrire` de 1871 sans
> filtrer `age >= 20`.** L'atelier affiche « s.o. » pour ces lignes. Deux
> mineurs (Gagné Frédéric, 13 ans, et Guillot Jean, 16 ans, division 2)
> portent une marque réelle du recenseur malgré la consigne du formulaire ;
> leurs valeurs à `false` sont conservées et affichées.

> **`ne_lit_pas` et `n_ecrit_pas` n'existent plus du tout** — ils ont été supprimés
> des 2 997 fiches de 1871, pas seulement doublés. Si tu les cherches, tu ne les
> trouveras nulle part, et toute lecture qui les vise renverra `undefined`, donc
> « sait lire » par défaut. C'est exactement le piège dans lequel le prototype est
> tombé : les données avaient été converties, l'affichage était resté branché sur les
> anciens champs, et 137 personnes illettrées de 1871 apparaissaient comme
> alphabétisées. Répartition réelle : 1871 division 1 → 13 ne sachant pas lire,
> 13 ne sachant pas écrire ; division 2 → 124 et 125.
>
> Note aussi que `sait_lire` et `sait_ecrire` sont **absents** des fiches de 1881 :
> ces colonnes n'ont pas encore été dépouillées. Absence ≠ `false`.

---

## Le formulaire change d'une année à l'autre

**Un champ absent peut vouloir dire trois choses différentes.** Ne les confonds pas :

1. **Relevé** — la colonne existe au formulaire et la valeur a été transcrite.
2. **Non dépouillé** — la colonne existe au manuscrit mais n'a pas encore été lue.
3. **Hors formulaire** — la question n'a jamais été posée cette année-là.

Le troisième cas est réel et piège tout le monde. **Le recensement de 1881 ne
comporte aucune colonne d'alphabétisation** : ni « sait lire », ni « sait écrire ».
Il n'a pas non plus de « marié dans les douze mois ». Ces questions figurent en
1871, disparaissent en 1881, et reviennent en 1891. Vérifié directement sur le
manuscrit — les vingt colonnes du Tableau no 1 de 1881 sont :

| # | Colonne | # | Colonne |
|---|---|---|---|
| 1 | Bâtiments | 11 | Pays ou province de naissance |
| 2 | Chantiers | 12 | Religion |
| 3 | Maisons en construction | 13 | Origine |
| 4 | Maisons inhabitées | 14 | Profession, occupation ou métier |
| 5 | Maisons habitées | 15 | Marié ou en veuvage |
| 6 | Familles | 16 | Allant à l'école |
| 7 | Noms | 17 | Sourds-muets |
| 8 | Sexe | 18 | Aveugles |
| 9 | Âge | 19 | Atteints d'aliénation mentale |
| 10 | Nés dans les douze derniers mois | 20 | Dates d'enregistrement et observations |

Modélise donc la disponibilité d'un champ **par année**, pas globalement. Une
table `champ_par_annee (annee, champ, existe_au_formulaire)` suffit ; l'interface
affiche « — » pour le cas 2 et « hors formulaire » pour le cas 3.

---

## Le dépouillement est un travail en cours, et il a sa propre table

`complement-1881-d1-data.js` est un dépouillement séparé du jeu principal,
rattaché par (page du manuscrit, ligne). Il ne remplace jamais une valeur
existante : il ne comble que les colonnes vides. Ce découplage est délibéré et
mérite d'être conservé en base :

- la provenance reste lisible (qui a lu quoi, quand, sur quelle image) ;
- une relecture ultérieure se compare à la précédente au lieu de l'écraser ;
- supprimer le complément laisse le dépouillement d'origine intact.

Il encode aussi la structure du manuscrit plutôt que de la déplier ligne à ligne :
une valeur par défaut (Québec / Catholique / Française), et seulement les
exceptions. C'est fidèle aux guillemets d'idem du registre et cent fois plus court.

**Trois mécanismes à reprendre :**

`decalage` — quand le dépouillement a sauté une ligne, tout le reste de la page
glisse d'un cran. La page 4 en est un cas : le manuscrit porte 25 lignes remplies,
le dépouillement 24, parce que « Beaulieu Damase, 7 ans » n'a pas été relevé.
Le complément est clé par ligne du **manuscrit** et `decalage` rétablit la
correspondance. Corriger l'oubli fera tomber `decalage` à 0.

`manquant` — les personnes vues au manuscrit mais absentes du dépouillement sont
**signalées, jamais ajoutées d'office**. L'interface les affiche pour que le
chercheur tranche.

`ecarts` — les divergences de lecture (noms, âges) sont listées côte à côte,
sans rien corriger. Sept sont relevées sur les neuf premières pages.

**Une limite de méthode à connaître.** En colonne 15, le recenseur accole au « M. »
ou au « V° » une petite marque de pointage qui déborde sur la colonne 16. Sur une
ligne portant un état matrimonial, une marque isolée n'est donc pas une réponse
fiable à « allant à l'école ». Seules les marques nettement centrées en colonne 16,
sur des lignes sans état matrimonial, ont été retenues. Le relevé est prudent : il
peut manquer des écoliers, il n'en invente pas. Le drapeau `reserve_ecole` le
signale dans le fichier.

**Dépouillement terminé : les 88 pages du district sont relues**, soit les
2 187 personnes de 1881 division 1, dont 182 portent une valeur autre que la
dominante. La page 89 est blanche ; la page 88 clôt le district.

Répartition sur l'ensemble — utile pour dimensionner les filtres du site et
pour vérifier qu'une reprise en base donne les mêmes totaux :

| Lieu de naissance | | Religion | | Origine | |
|---|---|---|---|---|---|
| Québec | 2 135 | Catholique | 2 152 | Française | 2 042 |
| États-Unis | 23 | Église anglicane | 20 | Écossaise | 49 |
| France | 11 | Protestant | 8 | Irlandaise | 43 |
| Irlande | 10 | Presbytérien | 5 | Anglaise | 25 |
| Angleterre | 4 | Episcopalien | 2 | Allemande | 16 |
| Ontario, Écosse | 2 chacun | | | Portugaise, Américaine | 6 chacune |

309 écoliers et deux infirmités déclarées, toutes deux en colonne 19 : page 17
ligne 17, et page 29 ligne 10.

**L'origine suit le père, sans exception.** C'est la règle la plus constante du
dépouillement, vérifiée sur une dizaine de mariages mixtes : les huit enfants de
James Thomson, écossais marié à une Française, sont tous inscrits « Écossaise » ;
ceux de William McKaye, irlandais, tous « Irlandaise ». **La religion, elle, ne
suit pas de règle unique** : les enfants Comming sont anglicans comme leur père
(page 66), ceux de Thomas Watts catholiques comme leur mère (page 73). C'est la
confession pratiquée qui est notée, tandis que l'origine reste patrilinéaire.

**Normalise les graphies à la saisie.** Le recenseur écrit tantôt « Ireland »
tantôt « Irlande », tantôt « French » tantôt « Française ». Le complément
normalise et conserve la graphie d'origine dans `incertain`. Sans cela, un filtre
« nés en Irlande » en manquerait une partie.

---

## Ce qui n'a pas encore été dépouillé

**Le point le plus important de ce document.** Un champ absent ne veut pas dire
« non » : il veut dire « la colonne du manuscrit n'a pas encore été transcrite ».
`!!undefined` donne `false`, donc toute case à cocher branchée naïvement affirme un
« non » ferme sur des milliers de fiches. Le prototype est tombé deux fois dans ce
piège avant d'exposer un troisième état (`—`, « colonne non dépouillée »).

Nombre de fiches portant réellement le champ, mesuré sur les données livrées :

| Champ | 1871 D1 | 1871 D2 | 1881 D1 | 1881 D2 | 1891 D1 |
|---|---|---|---|---|---|
| total de fiches | 1 540 | 1 457 | 2 187 | 1 438 | 3 548 |
| `sait_lire` / `sait_ecrire` | 1 540 | 1 457 | **0** | **0** | 1 621 |
| `ecole` | 1 540 | 1 457 | **0** | **0** | **0** |
| `marie_12_mois` | **0** | 1 457 | **0** | **0** | **0** |
| `sourd_muet` | **0** | 1 457 | **0** | **0** | 5 |
| `aveugle` | **0** | 1 457 | **0** | **0** | 2 |
| `aliene` | **0** | 1 457 | **0** | **0** | 2 |
| `religion` | 1 540 | 1 457 | **0** | **0** | 3 548 |
| `origine` | 1 540 | 1 457 | **0** | **0** | **0** |
| `lieu_naissance` | 1 | 1 457 | **0** | **0** | 3 548 |
| `mois_naissance` | **0** | **0** | **0** | **0** | **0** |

Autrement dit : **1881 ne contient que les champs communs** (nom, prénom, sexe, âge,
état matrimonial, profession, page, ligne). Tout le reste reste à faire. Et seule la
division 2 de 1871 est complète sur les infirmités et le mariage récent.

Règle à implémenter côté site : `champ in fiche` détermine si l'information a été
relevée ; la valeur ne se lit que si le champ est présent. Applique-la sur la valeur
**fusionnée** (source + corrections du chercheur), pas sur la source seule — sinon
une information que Patrick vient d'établir resterait affichée comme non relevée.

---

## Recensements nominatifs

Six fichiers, même structure :

| Fichier | Variable | Maisons | Personnes |
|---|---|---|---|
| `recensement-1871-d1-data.js` | `RECENSEMENT_1871_D1` | 217 | 1 540 |
| `recensement-1871-d2-data.js` | `RECENSEMENT_1871_D2` | 178 | 1 457 |
| `recensement-1881-d1-data.js` | `RECENSEMENT_1881_D1` | 350 | 2 187 |
| `recensement-1881-d2-data.js` | `RECENSEMENT_1881_D2` | 247 | 1 438 |
| `recensement-1891-d1-data.js` | `RECENSEMENT_1891_D1` | 637 | 3 548 |
| `recensement-1891-d2-data.js` | `RECENSEMENT_1891_D2` | 0 | 0 |

### Racine

```
annee      "1871" | "1881" | "1891"
division   "1" | "2"
maisons    Maison[]
```

1891 division 1 porte en plus :

```
roster                    Personne[]  rôle nominatif brut, 3 548 entrées, avec source_id BAC
constructions             Batiment[]  4
inhabitees                Batiment[]  13
navires                   Batiment[]  0
logements_temporaires     Batiment[]  0
institutions              Institution[]  0
grouped_until             nombre — jusqu'où le regroupement en maisons est fait
conformite_instructions   notes de méthode par colonne du manuscrit
familles_ms_par_page      nombre de familles relevées par page (89 à 113)
carte_scans               règle de correspondance entre n° de scan et page manuscrite
colonnes_17_25            avancement du relevé des colonnes 17 à 25
note_no_famille_ms        note sur la numérotation des familles au manuscrit
```

### Maison

```
no_maison            texte — numéro utilisé par l'application
familles             Famille[]
no_famille_ms        texte — numéro porté en colonne 5 du manuscrit (1891)
logement             { materiau, etages, chambres, code_ms, incertain }
logement_partage     booléen
remarque_logement    texte
remarque_nom         texte — note de relecture
source_ms            texte
remarque             texte
```

`logement.materiau` : « Bois » | « Brique » | « Pierre ».
`code_ms` est la notation du manuscrit (B 1/4 = bois, 1 étage, 4 pièces).

### Famille

```
no_famille                texte
chef                      texte — « Nom Prénom » tel que lu
membres                   Personne[]
no_famille_recensement    texte
no_famille_ms             texte
remarque_nom              texte
remarque_col10            texte
sans_numero_ms            booléen — famille sans numéro au manuscrit
```

`chef` est une chaîne libre, pas une référence. L'application la recompose à partir
des corrections du premier membre. **Dans une base de données, remplace-la par une
clé étrangère vers la personne.**

### Personne — champs communs

```
id                    identifiant uniformisé
id_ancien             identifiant d'avant l'uniformisation
annee, division       redondants avec la racine, pratiques en requête
page_ms, ligne        position au manuscrit
nom, prenom           texte
sexe                  "M" | "F" | ""
age                   texte — « 6 mois », « 49 » : pas toujours un nombre
etat_matrimonial      "M" | "C" | "V" | ""
profession            texte libre
incertain             booléen — lecture douteuse
remarque              texte — souvent la trace du dépouillement (id BAC, n° de bloc)
```

### Personne — 1871

Aucune fiche ne porte `mois_naissance` : la colonne « né dans les 12 derniers mois »
du formulaire n'a jamais été dépouillée. Le prototype affichait une colonne pour elle,
toujours vide — elle a été retirée. Si tu la remets, remplis-la d'abord.

```
lieu_naissance, religion, origine    texte
marie_12_mois                        booléen
ecole                                booléen
sait_lire, sait_ecrire               booléen (convertis depuis ne_lit_pas / n_ecrit_pas)
alphabetisation_source               "negatif_1871"
sourd_muet, aveugle, aliene          booléen
age_original_csv                     texte — âge avant ajustement (division 2)
age_ajuste_rapport                   booléen — âge corrigé d'après le Rapport 1871
```

### Personne — 1881

Uniquement les champs communs. Le dépouillement des colonnes supplémentaires reste
à faire — c'est le jeu le plus pauvre des trois.

### Personne — 1891

```
lien_parente                              texte — lien avec le chef
canadien_francais                         booléen
lieu_naissance                            texte
lieu_naissance_pere, lieu_naissance_mere  texte
religion                                  texte
sait_lire, sait_ecrire                    booléen
alphabetisation_source                    "positif_1891"
employe, patron                           booléen
nb_employes                               texte
chomage                                   booléen — sans emploi la semaine du recensement
mois_metier, mois_manufacture             texte
age_recense                               texte
sourd_muet, aveugle, aliene               booléen
cols_17_25_verifiees                      booléen — suivi de dépouillement
```

---

## Tableaux annexes de 1871

Sept fichiers. Chaque ligne porte désormais `annee`, `division`, et deux clés de
rattachement calculées : `ref_personne` (identifiant de la personne à cette page et
ligne) et `ref_maison` (son numéro de maison). Avant l'uniformisation,
l'appartenance à une division était implicite au nom du fichier.

| Fichier | Variable | Tableau | Lignes |
|---|---|---|---|
| `annexe-foncier-data.js` | `ANNEXE_FONCIER` | 3 — Propriété foncière | 56 |
| `annexe-terres-data.js` | `ANNEXE_TERRES` | 4 — Terres cultivées | 11 |
| `annexe-animaux-data.js` | `ANNEXE_ANIMAUX` | 5 — Animaux et production | 64 |
| `annexe-etablissements-data.js` | `ANNEXE_ETABLISSEMENTS` | 6 — Établissements industriels | 5 |
| `annexe-forets-data.js` | `ANNEXE_FORETS` | 7 — Produits des forêts | 31 |
| `annexe-navigation-data.js` | `ANNEXE_NAVIGATION` | 8 — Navigation et pêcheries | 8 |
| `annexe-deces-data.js` | `ANNEXE_DECES` | 2 — Décès des 12 derniers mois | 20 |

Structure commune :

```
annee, division, page, ligne, ref_personne, ref_maison, remarque
```

**Ces tableaux sont creux par nature.** Une ligne ne porte que les colonnes
effectivement remplies au manuscrit : un cultivateur avec deux cochons donne
`{cochons: 2, cochons_tue: 2}` et rien d'autre. En base de données, préfère un
stockage clé-valeur ou une colonne JSON à 40 colonnes vides. L'application le rend
en clair en parcourant les clés présentes.

Colonnes rencontrées, par tableau :

- **Foncier** : arpents, emplacements, maisons, batiments, granges, voitures,
  charrettes, traineaux, charrues, machines, cribles, edifices, residents,
  embarcations, entrepots.
- **Terres** : arpents_occupes, arpents_ameliores, arpents_paturage, arpents_jardins,
  ble_pr_arpents, ble_pr_minots, avoine_minots, feves_minots, ble_inde_minots,
  patates_arpents, patates_minots, foin_arpents, foin_unites.
- **Animaux** : chevaux, poulains, boeufs, vaches, autres, moutons, cochons, ruches,
  betail_tue, moutons_tue, cochons_tue, beurre, fromage, miel, laine, drap, toile.
- **Établissements** : nom, capital_fixe, force, ouvriers, salaires, produits.
- **Forêts** : pin_blanc_pi3, billots_pin, billots_autres, billes, espars_mats,
  cordes_chauffage.
- **Navigation** : bateaux, tonnage, navires_vapeur_parts, navires_vapeur_tonnage.
- **Décès** : nom, prenom, sexe, age, religion, lieu, prof, mois, cause, marie,
  plus `division_inferee` et `division_source` (voir écueil 5 du README).

Unités : arpent ≈ 0,3419 ha ; minot ≈ 39 L ; verge ≈ 0,914 m ; pi³ = pied cube.
Les montants sont en dollars canadiens de 1871.

---

## Recoupements avec le Rapport de 1871

`annexe-rapport-data.js` → `ANNEXE_RAPPORT`, 169 entrées, indexé par
`"noMaison-noFamille"` (1871 division 2 uniquement).

```
maison_rapport       texte — numéro nettoyé
famille_rapport      texte — numéro nettoyé
maison_incertaine    booléen — lecture douteuse du numéro de maison
famille_incertaine   booléen — idem pour la famille
cle_originale        texte — la clé d'avant nettoyage, ex. "121 [?]-158 [?]"
texte                texte — le paragraphe du rapport
flags                [{ type: "note_enumerateur", message }]
```

Avant l'uniformisation, l'incertitude était écrite dans la clé elle-même
(`"121 [?]-158 [?]"`), ce qui la rendait infiltrable et empêchait la jointure.
50 des 169 entrées étaient concernées.

---

## Bâtiments patrimoniaux

`bussiere1990-data.js` → `BUSSIERE_1990_DATA`, 38 entrées. Seul fichier non
uniformisé : il vient d'une source publiée et sert de référence.

```
id             texte — ex. "2560-cf"
adresse        texte — adresse actuelle
titre          texte — désignation
annee          texte — ex. "v.1860"
personnages    texte
resume         texte
propositions   [{ annee, division, no_maison, confiance, motif }]
```

`confiance` : "forte" | "moyenne" | "faible".

Source : Bussière, *Saint-Romuald*, 1990.

---

## Lieux

`lieux-data.js` → `window.LIEUX`, 39 entrées. **Couche de travail, pas source.**
Elle se pose par-dessus `bussiere1990-data.js` sans jamais le modifier : un lieu
qui porte `source_ref: "bussiere:<id>"` hérite du titre, des personnages et du
résumé de la brochure au moment de la génération.

Un lieu est un **emplacement au sol**, pas un bâtiment : il a une position, un
état, et une liste d'occupations datées. Il peut n'avoir aucune adresse actuelle
— c'est le cas de tout ce qui a été démoli, et c'est précisément ce que
`bussiere1990-data.js` ne pouvait pas représenter, puisqu'il n'indexe que du bâti
encore debout en 1990.

```
id, nom, voie, adresse_actuelle, designe_aujourdhui
etat                 debout | remplace | disparu | deplace | inconnu
construit, disparu
coord                { lat, lon, precision, pose_par, pose_le }
precision            releve | adresse | secteur | inconnu
source, source_ref
personnages, resume
notes                [{ auteur, date, texte }]      — bonification, à la suite de la source
occupations          [{ annee, division, no_maison, statut, confiance, origine, motif, ajoute_le }]
statut               propose | hypothese | a_verifier | confirme | rejete
origine              source | chercheur
adresses_anciennes   [texte]
cadastre             { lot, lot_annee, goad_feuillet, goad_no }
photos               [{ fichier, legende, credit, date }]
documents            [id de documents/manifeste.json]
```

**`precision` n'est pas décoratif.** Aucune des 39 positions n'est relevée : elles
sont interpolées le long du chemin du Fleuve d'après le numéro civique, et
indiquent un secteur. Toute lecture qui les traite comme des relevés se trompe de
plusieurs centaines de mètres. Une position corrigée à la main passe à `releve`.

**Une occupation `rejete` est conservée**, pas supprimée : c'est une hypothèse
tranchée, et l'effacer ferait reposer la question plus tard. Elle est exclue des
index (`lieuxParMaison`) mais reste affichée sur la fiche du lieu.

Le travail en cours vit dans `localStorage['suivi-lieux']`, écrit par l'atelier de
la carte (`carte.html?atelier=1`), transporté par `data/travail-personnel.json`,
versé par `outils/lieux/fondre.mjs`. Voir `docs/LIEUX.md`.

---

## Travail personnel (à migrer vers la base de données)

Dans le prototype, tout ceci est dans le navigateur. **C'est ce qui doit devenir des
tables.** Clés `localStorage` :

| Clé | Contenu | Indexé par |
|---|---|---|
| `suivi-familles-corrections` | corrections champ par champ | identifiant de personne |
| `suivi-familles-notes` | statut + note de suivi | `annee-division-maison-famille` |
| `suivi-corr-maison` | n°, colonne, logement, adresse | `annee-division-maison` |
| `suivi-corr-famille` | numéro de famille corrigé | clé de famille |
| `suivi-liens` | liens vers d'autres recensements | identifiant de personne |
| `suivi-hypotheses-adresses` | concordances adresse-maison | identifiant de bâtiment |
| `suivi-propositions-etat` | proposition retenue / écartée | `batimentId#index` |
| `suivi-annexe-batiments` | bâtiments ajoutés | — (tableau) |
| `suivi-annexe-details` | lot, année, feuillet Goad, n° enregistrement | identifiant de bâtiment |
| `suivi-annexe-adresses` | autres adresses historiques | identifiant de bâtiment |
| `suivi-migration-ids-v1` | reçu de la migration des identifiants | — |

Photos : base `IndexedDB` `suivi-photos`, magasin `thumbs`,
clé `batimentId#horodatage`, champs `id, entryId, thumb, nom, original, ajoute, caption`.
`thumb` est une data URL JPEG de 480 px maximum.

Une correction est un objet partiel fusionné par-dessus la donnée d'origine :
`{ "1871-D2-P001-L01": { "profession": "Cultivateur", "age": "44" } }`.
**Ne les écrase jamais dans les données sources** — c'est la distinction entre ce que
dit le manuscrit et ce que le chercheur a établi, et elle doit rester lisible.

Un lien est un tableau d'objets
`{ relation, annee, division, page, ligne, nom, note }`. Aujourd'hui la cible est
saisie à la main (texte libre). **Sur le site, elle devrait pointer un identifiant de
personne réel** — c'est la priorité n° 3 de Patrick et l'amélioration la plus utile
que tu puisses apporter à la structure.

### Sauvegarde vers le dépôt (chantier 3)

Ce `localStorage` peut maintenant aussi vivre dans le dépôt, à
`data/travail-personnel.json` — un instantané `{ format, version, exporte, donnees }`
où `donnees` reprend exactement les clés du tableau ci-dessus (sauf les photos,
qui restent en IndexedDB et se transportent par le fichier de sauvegarde
téléchargeable). C'est une couche séparée, au même titre que
`complement-1881-*-data.js` : elle ne remplace jamais une valeur des recensements,
et elle ne remplace pas non plus le mécanisme de `correction` de la base SQL décrite
plus bas — c'est un instantané du même `localStorage`, juste versionné.

Depuis le panneau Sauvegarde de l'atelier, le bouton « Pousser vers GitHub » écrit
ce fichier sur une branche dédiée (`atelier-sauvegarde`) et ouvre ou met à jour une
pull request — jamais de commit direct sur `main`, comme partout ailleurs dans ce
dépôt. Il faut pour cela un jeton d'accès personnel GitHub (de préférence
« fine-grained », limité à ce dépôt, permissions Contents + Pull requests en
lecture/écriture), saisi une fois et conservé dans `localStorage`
(`suivi-github-token`) — donc lisible par quiconque a accès à ce navigateur. Un
navigateur sans aucun travail local va chercher `data/travail-personnel.json` au
chargement pour repartir de la dernière sauvegarde poussée.

Le flux manuel (exporter, envoyer, faire intégrer) documenté dans
`docs/archive/HEBERGEMENT.md` reste disponible et reste la voie pour les photos.

---

## Schéma SQL proposé

Pour une base relationnelle (SQLite / D1 / Postgres). `personne.donnees` et
`annexe_ligne.valeurs` en JSON absorbent la variabilité entre années sans multiplier
les colonnes vides.

```sql
CREATE TABLE recensement (
  id           TEXT PRIMARY KEY,          -- '1871-D2'
  annee        TEXT NOT NULL,
  division     TEXT NOT NULL,
  note         TEXT
);

CREATE TABLE maison (
  id                TEXT PRIMARY KEY,     -- '1871-D2-M001'
  recensement_id    TEXT NOT NULL REFERENCES recensement(id),
  no_maison         TEXT NOT NULL,
  no_famille_ms     TEXT,
  colonne_logement  TEXT DEFAULT '4',     -- 2 construction, 3 inhabitée, 4 habitée
  materiau          TEXT,                 -- Bois | Brique | Pierre
  etages            INTEGER,
  chambres          INTEGER,
  code_ms           TEXT,
  adresse_actuelle  TEXT,
  remarque          TEXT,
  UNIQUE (recensement_id, no_maison)
);

CREATE TABLE famille (
  id           TEXT PRIMARY KEY,          -- '1871-D2-M001-F001'
  maison_id    TEXT NOT NULL REFERENCES maison(id),
  no_famille   TEXT NOT NULL,
  chef_id      TEXT REFERENCES personne(id),
  statut       TEXT DEFAULT 'a_verifier', -- a_verifier | en_cours | confirme
  note         TEXT,
  UNIQUE (maison_id, no_famille)
);

CREATE TABLE personne (
  id                TEXT PRIMARY KEY,     -- '1871-D2-P001-L01'
  id_ancien         TEXT,
  famille_id        TEXT NOT NULL REFERENCES famille(id),
  page_ms           TEXT, ligne TEXT,
  nom               TEXT, prenom TEXT,
  sexe              TEXT, age TEXT,
  etat_matrimonial  TEXT,
  profession        TEXT,
  sait_lire         INTEGER, sait_ecrire INTEGER,
  incertain         INTEGER DEFAULT 0,
  remarque          TEXT,
  donnees           TEXT,                 -- JSON : champs propres à l'année
  source_id         TEXT                  -- identifiant BAC (1891)
);
CREATE INDEX idx_personne_nom ON personne(nom, prenom);
CREATE INDEX idx_personne_famille ON personne(famille_id);

-- Ce que le chercheur établit, séparé de ce que dit le manuscrit
CREATE TABLE correction (
  personne_id  TEXT NOT NULL REFERENCES personne(id),
  champ        TEXT NOT NULL,
  valeur       TEXT,
  auteur       TEXT,
  modifie_le   TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (personne_id, champ)
);

-- Une personne suivie d'un recensement à l'autre
CREATE TABLE lien_personne (
  id          INTEGER PRIMARY KEY,
  source_id   TEXT NOT NULL REFERENCES personne(id),
  cible_id    TEXT REFERENCES personne(id),   -- à privilégier
  cible_texte TEXT,                           -- repli quand la cible n'est pas saisie
  relation    TEXT,
  certitude   TEXT DEFAULT 'hypothese',       -- hypothese | probable | confirme
  note        TEXT
);

CREATE TABLE annexe_ligne (
  id              INTEGER PRIMARY KEY,
  tableau         TEXT NOT NULL,          -- foncier | terres | animaux | etablissements | forets | navigation | deces
  recensement_id  TEXT NOT NULL REFERENCES recensement(id),
  page            TEXT, ligne TEXT,
  personne_id     TEXT REFERENCES personne(id),
  valeurs         TEXT NOT NULL,          -- JSON : seules les colonnes remplies
  remarque        TEXT
);

CREATE TABLE batiment (
  id           TEXT PRIMARY KEY,
  adresse      TEXT NOT NULL,
  titre        TEXT,
  annee        TEXT,
  personnages  TEXT,
  resume       TEXT,
  source       TEXT NOT NULL,            -- 'Bussière 1990' | 'Patrick Blanchet' | …
  lot          TEXT, lot_annee TEXT,
  goad_feuillet TEXT, goad_no TEXT,
  latitude     REAL, longitude REAL,     -- pour la carte
  cree_le      TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE batiment_adresse (
  id           INTEGER PRIMARY KEY,
  batiment_id  TEXT NOT NULL REFERENCES batiment(id),
  adresse      TEXT NOT NULL             -- rue / numéro anciens
);

CREATE TABLE concordance (
  id           INTEGER PRIMARY KEY,
  batiment_id  TEXT NOT NULL REFERENCES batiment(id),
  maison_id    TEXT REFERENCES maison(id),
  annee        TEXT, division TEXT, no_maison TEXT,
  statut       TEXT DEFAULT 'hypothese', -- hypothese | a_verifier | confirme | rejete
  confiance    TEXT,                     -- forte | moyenne | faible
  motif        TEXT, note TEXT,
  origine      TEXT                      -- 'source' | 'chercheur'
);

CREATE TABLE photo (
  id           TEXT PRIMARY KEY,
  batiment_id  TEXT NOT NULL REFERENCES batiment(id),
  fichier      TEXT NOT NULL,            -- chemin, pas de data URL
  legende      TEXT,
  nom_origine  TEXT,
  ajoute_le    TEXT DEFAULT CURRENT_TIMESTAMP
);
```

Deux remarques sur ce schéma :

1. `correction` reste séparée de `personne` volontairement. La tentation sera de
   fusionner pour simplifier les requêtes — ne le fais pas. La valeur scientifique du
   projet tient à ce qu'on puisse toujours dire « le manuscrit dit X, le chercheur
   établit Y ». Une vue `personne_etablie` qui applique les corrections par-dessus
   règle le confort de requête sans perdre la distinction.
2. `lien_personne.cible_id` est ce qui débloque la priorité n° 3 (suivre une personne
   à travers 1871-1881-1891). Le prototype ne peut pas le faire parce que la cible y
   est du texte libre.
