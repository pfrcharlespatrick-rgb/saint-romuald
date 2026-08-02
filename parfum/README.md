# Le Parfum des émotions

Application autonome : le client exprime ce qu'il ressent, le parfumeur reçoit une fiche de
composition (matières premières, pyramide, dosages indicatifs).

Aucune dépendance, aucun serveur, aucune clé d'API : quatre fichiers statiques qui fonctionnent
aussi bien en double-cliquant `index.html` que publiés sur GitHub Pages
(`https://<compte>.github.io/saint-romuald/parfum/`).

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure de la page et des quatre étapes du questionnaire |
| `donnees.js` | Facettes, émotions, lexique de lecture du récit, matières premières, curseurs |
| `moteur.js`  | Traduction émotion → facettes → matières → pourcentages |
| `app.js`     | Interface, fiche, impression, export JSON, lien de partage |
| `style.css`  | Mise en page écran et impression |

## Comment ça marche

1. **Le récit libre est lu** par un lexique (`LEXIQUE`) : les mots reconnus proposent des émotions
   et évoquent parfois directement une facette (« pluie » → aquatique, « laine » → rien, « tabac »
   → fumé). Le client confirme d'un clic ; rien n'est imposé.
2. **Émotions, curseurs, saison et moment** sont additionnés en un *vecteur de facettes* : 24 axes
   olfactifs (agrumes, poudré, résines, cuir, musqué…), positifs ou négatifs. C'est le seul langage
   commun entre le ressenti et la matière.
3. **Chaque matière est notée** par produit scalaire avec ce vecteur, atténué par sa spécialisation :
   une matière très typée n'est pas écrasée par une matière passe-partout.
4. **La sélection** prend les mieux notées par étage, avec deux garde-fous : pas plus de deux
   matières d'une même famille, et l'ajout d'un *porteur* si l'étage retenu ne peut pas atteindre
   sa part (des molécules qui se dosent au dixième ne remplissent pas 25 % d'un concentré).
   Un liant (hédione, Iso E Super, muscs) est garanti : sans lui, rien ne fond.
5. **Les pourcentages** sont répartis par remplissage sous contraintes : la part de chaque étage est
   d'abord ramenée dans ce que ses matières autorisent réellement, puis distribuée sans jamais
   sortir de la fourchette de dosage d'une matière. Si les exclusions du client réduisent trop la
   palette, le solde est affiché comme **solvant de mise au point** au lieu d'être maquillé en
   surdosages.

## Ce que la fiche donne au parfumeur

Pyramide tête / cœur / fond avec part du concentré et masse pour 10 g, familles dominantes, profil
olfactif, mise en alcool pour 30 mL selon la concentration choisie, et les points de vigilance
réglementaire portés par les matières retenues (cannelle, mousse de chêne, goudron de bouleau…).

Les dosages sont un **point de départ de laboratoire**, pas une formule finie : la conformité IFRA,
le calcul des allergènes déclarables et l'équilibre réel restent le travail du parfumeur.

## Adapter à une maison

Tout se règle dans `donnees.js`, sans toucher au moteur :

- **Palette réelle** : remplacer les entrées de `MATIERES` par le stock de la maison. Champs requis :
  `id`, `nom`, `famille`, `role`, `nature`, `facettes`, `force` (1 à 5), `dose` (`[min, max]` en % du
  concentré), `note`. Facultatifs : `latin`, `tags`, `prudence`.
- **Émotions** : `EMOTIONS` — un nom, une phrase, et des poids sur les facettes.
- **Vocabulaire du client** : `LEXIQUE` — ajouter les mots de sa clientèle (régionalismes, marques,
  lieux). Les accents et la casse sont ignorés.
- **Exclusions** : `EXCLUSIONS` filtre par `tags` ou par `nature` ; ajouter par exemple un
  « sans matière d'origine animale » ou « conforme à telle liste interne ».

Les identifiants de facettes doivent exister dans `FACETTES` : c'est la seule contrainte de cohérence.

## Partage

Le bouton « Copier le lien de partage » encode toute la demande dans le fragment de l'URL. Le client
envoie ce lien au parfumeur, qui rouvre exactement la même fiche — sans base de données ni compte.
L'export JSON sert, lui, à verser la demande dans un système de suivi de commandes.
