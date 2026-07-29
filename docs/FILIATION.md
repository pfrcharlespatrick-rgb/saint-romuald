# Annexe des filiations — structure et méthode

Suivre une personne de 1871 à 1891 est la priorité n° 3 déclarée du projet, et
celle que le prototype ne savait pas traiter : la cible d'un lien y était du
texte libre. Cette annexe s'y attaque autrement — en calculant les
rapprochements, en disant ce qu'ils valent, et en prévoyant l'endroit où les
preuves documentaires viendront les trancher.

## Les trois pièces

| Pièce | Rôle | Autorité |
|---|---|---|
| `outils/analyse-filiation.mjs` | Calcule les rapprochements et les événements | Hypothèses |
| `outils/deduire-sexe.mjs` | Déduit le sexe du prénom là où la colonne est inexploitable | Déductions |
| `data/filiation-data.js` | Résultat du calcul, relu par le site | Hypothèses |
| `data/complement-sexe-1881-d2-data.js` | Sexes déduits, non destructif | Déductions |
| `documents/` | Actes et sources versés par le chercheur | **Preuves — l'emportent** |

La séparation est délibérée, et de même nature que celle entre `personne` et
`correction` dans `SCHEMA.md` : on doit toujours pouvoir dire « le calcul
propose X, le document établit Y ».

---

## Ce que le programme rapproche

Quatre indices, par ordre d'importance décroissante.

**Le voisinage domestique** est le plus fort, et de loin. Si huit membres d'un
ménage se retrouvent ensemble dix ans plus tard, chacun des huit rapprochements
se confirme mutuellement. Une homonymie isolée ne bénéficie jamais de cette
corroboration. C'est ce qui permet de reconnaître une famille entière là où un
nom seul ne prouverait rien.

**Le patronyme**, normalisé : accents retirés, marques `[?]` ignorées, particules
recollées, suffixes « dit X » ramenés à la souche. Une lettre d'écart est tolérée
sur les noms d'au moins quatre lettres.

**Le prénom**, via des classes d'équivalence. Le recenseur passe du français à
l'anglais selon la famille et selon sa main : Marguerite devient Margaret puis
Maggie, Guillaume devient William, Marie devient Mary puis May. Sans cette
table, la moitié des rapprochements irlandais et écossais échouerait.
Elle est dans `outils/noms.mjs` et se complète à mesure des cas rencontrés.

**L'âge**, le plus faible des quatre. Un écart de dix ans exactement est
l'exception, pas la règle. La tolérance va jusqu'à six ans de dérive avec un
score dégressif — large, donc, ce qui ouvre la porte aux homonymes, et justifie
le poids donné au voisinage.

Le sexe ne sert que lorsqu'il est fiable. Un contrôle automatique écarte tout
jeu dont la répartition penche à plus de 75 % d'un côté.

---

## Les événements déduits

| Type | Ce qu'il signale |
|---|---|
| `menage_continu` | Un ménage se retrouve d'un recensement à l'autre |
| `veuvage` | Le chef masculin ne reparaît pas ; son épouse demeure dans le ménage |
| `essaimage` | Un enfant quitte le foyer et devient chef du sien |
| `disparition` | Une personne n'est pas retrouvée au recensement suivant |
| `arrivee` | Une personne apparaît sans antécédent identifié |
| `age_incoherent` | Le même homme porte deux âges incompatibles — à relire |

### Le veuvage est tenu pour établi

Un chef masculin cesse de paraître, son épouse se retrouve dans le ménage
successeur : c'est la signature du veuvage. Les explications concurrentes —
désertion, migration de travail — laisseraient l'épouse mariée et le mari
recensé ailleurs sous le même nom. Le fait est donc affirmé, non pas supposé.

Ce qui reste inconnu, et que les résumés ne prétendent pas savoir, c'est la
**date** du décès : elle tombe quelque part dans l'intervalle. Un acte de
sépulture la fixera. Quand l'état matrimonial « V » est porté au manuscrit, le
veuvage est attesté en propre — la distinction est conservée dans `atteste`.

La règle n'exige pas que la veuve prenne la tête du ménage. C'est le cas le plus
visible, mais pas le plus fréquent : sur 40 veuvages relevés, 23 voient un fils
devenir chef pendant que la mère demeure sous son toit — Cécile Croteau, veuve,
vit chez Joseph Croteau. Exiger la prise de tête du ménage en ferait manquer
plus de la moitié.

### Le garde-fou contre le faux veuvage

Si le ménage successeur est tenu par un homme portant le nom du chef disparu,
ce n'est pas une succession : c'est le même homme, que le rapprochement a manqué
parce qu'un âge est mal transcrit. **James Thompson est noté 25 ans en 1871
alors qu'il a un fils de 12 ans**, et reparaît chef à 47 ans en 1881, avec la
même épouse et les mêmes enfants. Déclarer sa mort serait une erreur grave, et
d'autant plus trompeuse qu'elle se lirait comme un fait établi.

Ces cas sont retirés des veuvages et versés aux contrôles sous le type
`age_incoherent` — 21 relevés, dont « Frédéric Gagné : 13 ans en 1871, 55 ans en
1881 ». C'est la vraie information à retenir : une erreur de transcription à
corriger.

### Le cas qui a servi de banc d'essai

La famille Lee, du chemin du Fleuve, se lit entièrement :

| Personne | 1871 (D2, m. 78) | 1881 (D2, m. 106) | 1891 (D1) |
|---|---|---|---|
| Thomas, père | 42 ans, navigateur | **absent** | — |
| Margaret | 38 ans, mariée | 48 ans, **chef** | 57 ans, **veuve**, m. 540 |
| Thomas, fils | 15 ans | 25 ans, navigateur | 34 ans, chef m. 405 |
| William | 14 ans | 23 ans, navigateur | 32 ans, chef m. 310 |
| Robert | 10 ans | 20 ans, navigateur | 29 ans, chef m. 512 |
| George | 5 ans | 16 ans, navigateur | 25 ans, chez sa mère |

Un veuvage, puis l'essaimage de trois fils en ménages autonomes — et le passage
de « navigateur » à « débardeur » d'une génération à l'autre, qui dit le
basculement du port de bois vers le débardage. Les treize rapprochements sont
retrouvés sans intervention.

---

## Les trois réserves

**Les femmes changent de nom en se mariant.** Un rapprochement fondé sur le
patronyme ne peut pas les suivre. Ce n'est pas un défaut de réglage mais une
limite de structure : les disparitions de femmes en âge de se marier et non
déclarées mariées sont marquées `categorie: 'mariage_possible'` et ne doivent
jamais être lues comme des décès. Seul un acte de mariage les résout.

**Les homonymes ne sont pas départageables.** 154 rapprochements ont un
concurrent de force équivalente. Le programme en désigne un, marque le lien
`homonymie: true`, plafonne la confiance à « moyenne » et conserve les
concurrents dans la fiche. Il ne prétend pas avoir choisi sur des bases solides.

**Une confiance « forte » n'est pas une preuve.** Elle dit que les indices
concordent. Le dossier des documents existe pour verser les pièces qui, elles,
établissent.

---

## Relancer l'analyse

```bash
node outils/analyse-filiation.mjs
```

Le programme relit les six fichiers de recensement et réécrit
`data/filiation-data.js`. Il est déterministe : les mêmes données donnent les
mêmes résultats. Après toute correction de dépouillement — y compris celles
importées depuis une sauvegarde du site — le relancer répercute la correction
sur les rapprochements.

---

## Le sexe de 1881 division 2

**Le problème.** La colonne y porte 1 334 fiches « F » pour 104 « M », soit 93 %
d'un seul sexe là où les autres jeux se répartissent également. Les fils Lee,
tous navigateurs, y sont notés féminins. Elle a manifestement été remplie par
défaut, sauf pour les 104 fiches où un « M » a été saisi délibérément.

**La méthode.** Plutôt qu'une liste de prénoms écrite à la main, la table est
apprise des quatre jeux dont la colonne est fiable — 1871 D1, 1871 D2, 1881 D1,
1891 D1. Ce sont les mêmes familles, la même population franco-irlandaise : la
source la mieux placée pour dire si « Célanire » est masculin ou féminin dans
cette paroisse.

**Ce que ça vaut.** Deux mesures indépendantes :

| Épreuve | Résultat |
|---|---|
| Validation croisée, un jeu retiré à la fois | **99,53 %** de justesse sur 7 199 prédictions |
| Confrontation aux 104 « M » attestés de 1881 D2 | 94 concordances, **aucune discordance** |

La seconde est la plus parlante : elle confirme à la fois que ces 104 « M »
avaient bien été saisis à dessein, et que la déduction les retrouve tous.

**Le résultat.**

| | Fiches |
|---|---|
| « M » attestés, jamais recouverts | 104 |
| Déductions confirmant le « F » saisi | 553 |
| **Fiches saisies « F » que le prénom dit masculines** | **540** |
| Prénoms trop rares ou mixtes, non tranchés | 241 |

Les 540 contradictions sont listées dans l'onglet **Contrôles** du site, triées
par page et ligne pour que la relecture au manuscrit suive l'ordre du registre.

**La portée.** Le résultat vit dans `data/complement-sexe-1881-d2-data.js`, sur
le modèle de `complement-1881-d1-data.js` : il ne modifie aucune donnée de
recensement, les 104 « M » attestés ne sont jamais recouverts, et le supprimer
laisse le dépouillement d'origine intact. Une relecture ultérieure se compare au
complément au lieu de l'écraser.

Regénérer : `node outils/deduire-sexe.mjs`.

---

## Ce qui reste à faire

1. **Relire les 540 sexes déduits** de 1881 division 2 au manuscrit, en suivant
   la liste de l'onglet Contrôles, et les 21 âges incompatibles.
2. **Verser des actes.** Les 154 homonymies et les 4 785 disparitions attendent
   des sources. Chaque acte versé retire un cas de la zone d'incertitude.
3. **Valider ou écarter les propositions.** Les rapprochements sont aujourd'hui
   consultables mais non arbitrés. L'étape suivante est de pouvoir marquer un
   lien « retenu » ou « écarté », comme les propositions de concordance
   d'adresses le sont déjà dans l'annexe existante.
4. **Compléter la table des prénoms** (`outils/noms.mjs`) à mesure que des
   variantes non prévues apparaissent.
5. **Relier aux concordances d'adresses.** Un ménage suivi de 1871 à 1891 et une
   maison identifiée par Bussière décrivent le même lieu par deux chemins ; les
   faire se recouper renforcerait les deux.
