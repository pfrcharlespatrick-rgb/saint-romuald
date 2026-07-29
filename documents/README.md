# Documents historiques — mode d'emploi

Ce dossier reçoit les pièces qui **établissent** un lien de filiation : actes de
baptême, de mariage, de sépulture, actes notariés, coupures de presse,
monographies. Il complète `data/filiation-data.js`, qui ne contient que des
rapprochements calculés.

La distinction est le cœur du dispositif :

| | `data/filiation-data.js` | `documents/` |
|---|---|---|
| Nature | hypothèse produite par un programme | preuve tirée d'une source |
| Fondé sur | nom, âge, voisinage domestique | ce qu'un contemporain a écrit |
| Se trompe | oui, et il le dit | rarement, mais se lit mal |
| Autorité | la plus faible | **l'emporte toujours** |

Un document versé ici tranche un rapprochement automatique. C'est le but.

---

## Comment verser un document

### 1. Rassembler la référence

Il faut au minimum : **où** est le document (dépôt, registre, fonds), sa **cote**,
et sa **date**. Sans cela, personne — pas même toi dans deux ans — ne pourra le
retrouver pour vérifier.

### 2. Transcrire le passage utile

Pas le document entier : le paragraphe qui établit le fait. Transcris **tel
qu'écrit**, graphie d'époque comprise. Si un mot est illisible, écris `[illisible]`
plutôt que de deviner. Si tu devines quand même, écris `[Cantin ?]` — le point
d'interrogation entre crochets est la convention déjà utilisée partout dans le
projet.

### 3. Rattacher aux personnes du recensement

Chaque personne mentionnée dans l'acte peut porter un `ref_personne` :
l'identifiant de recensement (`1871-D2-P030-L12`). C'est ce rattachement qui
permet au site de relier l'acte à la fiche.

Si tu n'es pas sûr de la personne visée, **laisse le champ vide** et explique le
doute dans `note`. Un rattachement faux est pire qu'un rattachement absent : il
se propage silencieusement dans toutes les analyses qui suivent.

### 4. Écrire ce que le document établit

C'est la partie qui a de la valeur. Une affirmation dit, en une phrase, ce que
l'acte prouve — et, s'il y a lieu, quel rapprochement automatique il confirme ou
contredit.

### 5. Le remettre pour intégration

Deux voies :

- **Le plus simple** — envoyer le document (photo, PDF, ou simplement la
  transcription et la référence) à Claude Code en disant « verse ceci dans
  l'annexe des documents ». La fiche sera rédigée, rattachée, et publiée.
- **En autonomie** — ajouter la fiche à `documents/manifeste.json` dans le
  tableau `documents`, en suivant le `gabarit` du même fichier, puis publier.

Le scan lui-même, s'il est volumineux, n'a pas à entrer dans le dépôt : un lien
`url` vers la numérisation en ligne, ou une mention dans `source`, suffit.
Les fichiers de plus de quelques mégaoctets alourdissent le site pour tous les
visiteurs sans rien apporter à la démonstration.

---

## Ce qu'un document peut trancher

**Une disparition.** Le programme signale que Thomas Lee, chef de ménage en 1871,
ne reparaît pas en 1881, et en déduit un veuvage probable. Un acte de sépulture
transforme « probable » en date certaine — et donne l'âge au décès, qui recoupe
l'âge déclaré au recensement.

**Une homonymie.** 146 rapprochements sont marqués « homonymie » : deux personnes
du même nom et du même âge, entre lesquelles rien dans les données ne permet de
choisir. Un acte de mariage qui nomme les parents lève l'ambiguïté d'un coup.

**Un patronyme perdu.** 4 771 disparitions sont recensées entre deux recensements,
dont une grande part de femmes en âge de se marier : elles n'ont pas disparu,
elles ont changé de nom. Seul un acte de mariage permet de les suivre — aucun
algorithme fondé sur le patronyme ne le peut, par construction.

**Un rattachement à une maison.** Un acte notarié qui situe une vente « en la
maison sise au chemin du Fleuve » relie le recensement à l'annexe des
concordances d'adresses.

---

## Une mise en garde

Un acte est une source, pas une vérité. Le curé écrit ce qu'on lui déclare, le
notaire ce qui l'arrange, le journal ce qui se dit. Les âges y sont aussi
fantaisistes qu'au recensement, les patronymes aussi variables.

Ce dossier ne sert donc pas à clore les questions, mais à les documenter : à
faire qu'une conclusion puisse toujours être remontée jusqu'à la ligne qui l'a
produite, et révisée quand une meilleure source apparaît.
