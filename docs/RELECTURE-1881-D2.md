# Recensement de 1881, division 2 — état de la relecture

**La division 2 est intégralement relue.** Les 59 pages du manuscrit ont été
confrontées ligne à ligne aux données de `data/recensement-1881-d2-data.js`,
et les deux passes dédiées — champ `sexe`, numérotation des maisons — sont
faites.

Ce document dit ce qui a été vérifié, ce qui ne l'a pas été, et pourquoi.
Il ne certifie pas que chaque valeur du fichier est exacte : il dit où l'on
peut s'appuyer sur le fichier et où il faut retourner au manuscrit.

## Chiffres

| | |
|---|---|
| Personnes | 1452 (inchangé d'un bout à l'autre) |
| Maisons | 249, séquence continue de 1 à 249 |
| Lignes portant une remarque de relecture | 797 |
| Lignes marquées `incertain: true` | 185 |
| Répartition du champ `sexe` | 713 hommes / 739 femmes |

## Ce qui a été corrigé

- **Une quarantaine de patronymes**, dont une douzaine que le dépouillement
  n'avait pas mal orthographiés mais purement inventés : Watrochou pour
  Desrochers, Ournais pour Dumais, Boldule pour Bolduc, Etier pour Lefèvre,
  Aaw pour Daw.
- **Une centaine de prénoms.** Le dépouillement bute sur les prénoms rares :
  Onésipor pour Onésiphore, Adolpton pour Adjutor, Poléonise pour Policarpe.
  Devant un prénom courant, il est juste.
- **Une cinquantaine d'âges**, dont la plupart tiennent à un seul tic
  d'écriture (voir plus bas).
- **608 valeurs du champ `sexe`**, qui portait 111 « M » pour 1341 « F ».
- **Six maisons** séparées, la numérotation ayant fusionné trois ménages de
  la page 15 avec trois ménages de la page 17.

## Trois pièges d'écriture, à connaître avant toute relecture

Ils expliquent l'essentiel des erreurs et valent pour les autres divisions
dépouillées à partir du même type de manuscrit.

1. **Le 7 se trace en petite boucle surélevée**, que le dépouillement a prise
   pour une rature. « 17 » est devenu « 1 », « 27 » est devenu « 2 ». Le cas
   le plus visible : page 43, le chef de la famille 196 était enregistré à
   2/12 — un nourrisson de deux mois chef de ménage — pour 27 ans.

2. **La majuscule F ressemble à un H.** C'est ce qui a donné « H.Xavier »
   pour François-Xavier. À la colonne 8, qui note H (Homme) et F (Femme) et
   non M/F, cette confusion a fait basculer presque toute la division en
   « F ».

3. **Le 5 se confond avec le 6** dans les colonnes de numéros. Les maisons
   57, 58 et 59 de la page 15 avaient été lues 67, 68 et 69 — numéros de
   trois maisons bien réelles, mais situées page 17.

## Ce qui n'est pas vérifié

**185 lignes portent `incertain: true`.** Chacune conserve la lecture
d'origine dans son champ `remarque`. Elles relèvent de trois cas :

- **Écriture illisible.** La valeur du dépouillement a été conservée faute de
  mieux. Exemple : page 48 lignes 2-3, le manuscrit ne porte qu'une initiale
  « B » suivie d'un blanc à la place du patronyme — le « Béziong » des
  données ne s'appuie sur rien de visible.
- **Lecture proposée mais non certaine.** La valeur a été changée et la
  lecture d'origine est en remarque. Exemple : « Wasser » lu « Walker »
  page 56, dans une famille née en Écosse.
- **Sexe non établi.** Prénom épicène, ou contradiction entre le prénom et la
  profession. Une quinzaine de veuves chefs de ménage portent un prénom
  féminin et une profession masculine ; l'hypothèse est que le recenseur y
  inscrivait la profession du ménage, mais elle n'est pas vérifiée.

Le champ `sexe` mérite une mention à part : il n'a **pas** été établi en
lisant la colonne 8, qui n'est pas discriminable à la résolution disponible,
mais par recoupement entre le prénom — vérifié au manuscrit sur les 59 pages
—, la profession et l'état matrimonial. Contrôle indépendant : sur les 212
familles formées d'un couple marié de deux personnes, 206 ont des sexes
opposés.

## Historique

Pull requests #30 à #39. Chaque page ou lot de pages fait l'objet d'un commit
distinct, dont le message détaille les corrections et ce qui a été laissé en
l'état.

## Autres divisions

**La division 1 de 1881 est relue elle aussi**, ses 88 pages confrontées au
manuscrit. Voir `docs/RELECTURE-1881-D1.md`. Les trois pièges décrits plus
haut ne s'y retrouvent pas : l'écriture y est plus nette et la colonne 8
lisible. Le piège propre à la division 1 est le **J majuscule pris pour un
F**.
