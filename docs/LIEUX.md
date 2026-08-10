# Les lieux — la carte, l'atelier, et ce qui circule entre les deux

## Le problème, tel qu'il s'est posé

En 1871, Edward Benson, 25 ans, « bourgeois », est recensé seul à la maison 115
de la division 2. En 1881, on le retrouve marchand de bois à la maison 237, avec
Alice et cinq enfants. Bussière rattache les deux à la même adresse : le 1871,
chemin du Fleuve.

C'est impossible. La maison du 1871 a été bâtie en 1878 pour les frères Benson.
En 1871, Edward habite le manoir Longwood, chez son père — un lieu qui ne figure
dans aucune brochure de patrimoine, pour la simple raison qu'il n'existe plus :
il a été démoli, et l'emplacement a fait l'objet de fouilles archéologiques.

L'ancienne annexe ne savait pas dire cela. Elle indexait des **bâtiments par
adresse actuelle**, ce qui exclut par construction tout ce qui a disparu — c'est-
à-dire une bonne part de ce qu'on cherche. Et elle ne datait pas ses
rattachements : une adresse valait pour toutes les années à la fois.

## Ce qu'on modélise à la place

Un **lieu** n'est pas un bâtiment, c'est un **emplacement au sol** :

- il a une position, et cette position dit sa propre précision ;
- il a un état — encore debout, disparu, remplacé, déplacé ;
- il peut n'avoir **aucune adresse actuelle** (Longwood) ;
- son adresse actuelle peut désigner **autre chose que lui** (une résidence
  neuve bâtie sur le terrain de l'ancienne) : c'est à quoi sert
  `designe_aujourdhui` ;
- il porte une liste d'**occupations datées** : une entrée par recensement où
  une maison y a été recensée.

Une personne ne « habite pas une adresse » : elle habite une maison de
recensement, qui est rattachée à un lieu, à une date. Un homme qui déménage
change de lieu sans que rien d'autre bouge.

## Le fichier

`data/lieux-data.js` → `window.LIEUX = { format, version, mis_a_jour, note, lieux }`.

```js
{
  id: "manoir-longwood",         // identifiant court et stable
  nom: "Manoir Longwood",
  voie: "chemin du Fleuve",
  adresse_actuelle: "",          // vide quand le lieu n'en a plus
  designe_aujourdhui: "Emplacement ayant fait l'objet de fouilles…",
  etat: "disparu",               // debout | remplace | disparu | deplace | inconnu
  construit: "", disparu: "",
  coord: {
    lat: 46.7311, lon: -71.2812,
    precision: "secteur",        // releve | adresse | secteur | inconnu
    pose_par: "…", pose_le: "AAAA-MM-JJ"
  },
  source: "Patrick Blanchet",
  source_ref: "bussiere:1871-cf", // facultatif — voir « les deux étages »
  personnages: "…",
  resume: "",                     // texte propre au lieu, hors source
  notes: [ { auteur, date, texte } ],          // bonification, voir plus bas
  occupations: [ {
    annee: "1871", division: "2", no_maison: "115",
    statut: "hypothese",          // propose | hypothese | a_verifier | confirme | rejete
    confiance: "moyenne",         // forte | moyenne | faible
    origine: "chercheur",         // source | chercheur
    motif: "…", ajoute_le: "AAAA-MM-JJ"
  } ],
  adresses_anciennes: [ "1411, rue Commerciale" ],
  cadastre: { lot, lot_annee, goad_feuillet, goad_no },
  photos: [ { fichier: "assets/photos/…jpg", legende, credit, date } ],
  documents: [ "id d'une fiche de documents/manifeste.json" ]
}
```

### Les deux étages, encore une fois

`data/bussiere1990-data.js` **n'est pas touché**. C'est une source publiée ; elle
reste ce qu'elle est. Un lieu qui porte `source_ref: "bussiere:<id>"` hérite au
moment de la génération du titre, des personnages et du résumé de la brochure, et
n'écrit lui-même que ce que le chercheur établit.

C'est la même distinction que partout ailleurs dans ce projet — corrections vs
manuscrit, `documents/` vs `filiation-data.js`. **Le texte de la source se cite ;
il ne se réécrit pas.** Bonifier un lieu, c'est ajouter une entrée dans `notes`,
qui s'affiche sur la fiche sous « À la suite de la source — notes du chercheur »,
signée et datée. La brochure garde la parole ; le chercheur en prend une autre.

### Un rapprochement écarté reste consigné

Une occupation `rejete` n'est pas supprimée : elle demeure dans le lieu, visible
sous un repli « rapprochements écartés », avec son motif. Une question tranchée
qu'on efface est une question qu'on repose deux ans plus tard. C'est ainsi que la
proposition de Bussière pour 1871 est traitée sur la fiche du 1871, chemin du
Fleuve : écartée, motivée, et lisible.

## Les positions ne sont pas relevées, et la carte le dit

Aucune coordonnée n'a été relevée. Les 39 points ont été posés par interpolation
du numéro civique le long d'un axe approximatif du chemin du Fleuve, à partir de
deux repères tirés du corpus lui-même (le 2560 est « à l'entrée est du chemin »,
côté pont Etchemin ; les numéros décroissent vers l'ouest et l'anse Benson).

**Ils indiquent un secteur, pas un bâtiment.** C'est délibérément assumé, et
c'est la marche à suivre déjà recommandée dans `docs/HEBERGEMENT.md` : placer
grossièrement d'abord, corriger à la main ensuite. Trois choses le rendent
honnête :

1. `coord.precision` vaut `secteur` tant que le point n'a pas été replacé ;
2. la carte dessine ces points **en pointillé et en creux**, les points relevés
   en plein ;
3. la fiche de lieu trace un cercle d'incertitude de 140 m autour d'un point
   approximatif, et l'écrit en toutes lettres.

Un point déplacé à la main dans l'atelier passe à `precision: "releve"`, avec la
date et le nom de qui l'a posé.

## Les écrans

| Écran | Ce qu'on y fait |
|---|---|
| `carte.html` | La carte : filtrer par recensement, chercher, cliquer un point, lire la liste ordonnée par numéro civique |
| `carte.html?atelier=1` | La **même carte en mode Atelier** — tout se modifie ici |
| `lieu.html#<id>` | La fiche de lieu : position, qui y a vécu année par année, textes, photos, dossier |
| `maison.html#<clé>` | « Où était cette maison » renvoie au lieu |
| `personne.html#<id>` | Une ligne « Au sol : … » sous la maisonnée |

**Poser un point est un geste de carte.** On ne tape pas deux nombres dans un
formulaire ailleurs : on glisse le repère. C'est pourquoi l'atelier des lieux est
*sur* la carte, et non dans `Suivi des maisons et familles.dc.html`.

Dans le mode Atelier on peut : glisser un point pour le replacer · cliquer
« + Poser un lieu » puis cliquer la carte pour en créer un nouveau · éditer tous
les champs · **rattacher une maison en cherchant un chef de ménage par son nom**
(l'index `fiches/maisons-index.json` couvre les 1 630 maisons des cinq
recensements) · ajouter des notes · verser des photos · saisir lot et feuillet
Goad.

## La circulation

```
                     outils/lieux/amorcer.mjs
data/bussiere1990-data.js ──────────────────▶ data/lieux-data.js
        (source, jamais modifiée)                    │
                                                     │ outils/generer-site.mjs
                                                     ▼
                              fiches/lieux.json ── carte.html, lieu.html
                              fiches/maison/*.json ─ maison.html  (champ « lieux »)
                              fiches/personne/*.json ─ personne.html (champ « lieux »)
                              fiches/maisons-index.json ─ recherche par nom

carte.html?atelier=1 ──▶ localStorage « suivi-lieux »
                              │
                              ├─▶ data/travail-personnel.json  (sauvegarde de l'atelier,
                              │      bouton « Pousser vers GitHub » — la clé voyage avec le reste)
                              │
                              └─▶ outils/lieux/fondre.mjs ──▶ data/lieux-data.js
```

Rien ne circule par magie : `fondre.mjs` verse le travail dans les données, et
`generer-site.mjs` le propage aux fiches. Les deux sont idempotents et acceptent
`--essai`.

### Marche à suivre après une séance de travail

```sh
node outils/lieux/fondre.mjs --essai   # ce qui serait versé
node outils/lieux/fondre.mjs           # verser
node outils/generer-site.mjs           # propager aux fiches
```

Sans cela, le travail reste visible dans le navigateur de Patrick — la fiche
l'indique alors, « pas encore versé au dépôt » — mais pas pour les visiteurs.

## Les photos

Une photo versée au dépôt vit dans `assets/photos/` et se déclare dans
`photos[]` du lieu. Une photo ajoutée depuis l'atelier de la carte reste
d'abord dans IndexedDB (magasin `suivi-photos`, le même que l'atelier
principal), redimensionnée à 900 px ; la fiche la montre en la marquant « pas
encore versée ». Le bouton « télécharger » donne le fichier à déposer dans
`assets/photos/`.

C'est un aller-retour manuel, et c'est assumé : un dépôt statique n'a pas de
téléversement, et coller des images en base64 dans `data/lieux-data.js` ferait
enfler un fichier que tous les visiteurs chargent.

## Ce qui reste à faire

1. **Replacer les 39 points à la main.** C'est le seul vrai travail restant, et
   personne d'autre que Patrick ne peut le faire : lui seul sait où était le
   bâti démoli. Une soirée sur la carte, en glissant les repères.
2. **La position de Longwood.** Le rapport de fouille archéologique donnerait la
   coordonnée exacte ; le point actuel n'est qu'un repère de secteur.
3. **Rattacher les 19 lieux encore sans occupation** — le filtre « Sans
   rattachement » de la carte les isole, et la recherche par nom de chef de
   ménage fait le reste.
4. **Le plan Goad de 1876 en surimpression**, une fois les points relevés : les
   champs `cadastre.goad_feuillet` et `goad_no` existent déjà pour ça. C'est le
   chantier qui rendrait la carte spectaculaire (voir `docs/HEBERGEMENT.md`).
5. **Le géocodage automatique** des adresses encore debout, quand un accès à
   Nominatim sera disponible — il n'est pas joignable depuis l'outillage
   actuel. Il ne remplacerait pas le placement à la main, il l'amorcerait mieux.
