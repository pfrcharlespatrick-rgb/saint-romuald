# Saint-Romuald — notes de projet pour Claude

Site de recherche généalogique/recensement pour Saint-Romuald, Québec (recensements 1871, 1881, 1891). Voir `docs/FILIATION.md` et `documents/README.md` pour l'architecture des données et le schéma de `documents/manifeste.json`.

## La main de Patrick l'emporte — toujours

Patrick relit le dépouillement **page par page dans l'atelier**
(`Suivi des maisons et familles.dc.html`). Ses corrections ne réécrivent pas les
recensements : l'atelier les garde à part, dans `data/travail-personnel.json`,
sous `suivi-familles-corrections` — une entrée par personne, ne contenant que
les champs qu'il a effectivement touchés :

```json
{ "1891-D1-P132-L01": { "prenom": "Abraham" } }
```

**C'est la trace de ce qui a été tranché à la main, et elle prime sur toute
relecture automatique.** La règle, sans exception :

1. **Ne jamais réécrire un champ qui figure dans cette liste.** Une relecture qui
   propose autre chose doit le signaler et passer son chemin.
2. **Une ligne corrigée à la main est tranchée** : elle perd son drapeau
   `incertain`, et les remarques « Relecture du manuscrit : … » empilées par les
   passes précédentes sont retirées — les validations passées n'ont plus lieu
   d'être. Ce que Patrick a écrit lui-même dans `remarque` est conservé.
3. La règle vaut **uniquement pour les corrections manuelles**. Partout ailleurs,
   la relecture au manuscrit fait son travail comme avant.

L'outillage applique déjà cette règle : `outils/relecture-1881/atelier.mjs` lit
la liste, `pat91.mjs` refuse les champs protégés et rend compte de ce qu'il a
laissé, `fondre91.mjs` verse les corrections manuelles dans le recensement — ce
qui les rend visibles sur le site public, qui ne lit pas le fichier de travail.
**Passer `node outils/relecture-1881/fondre91.mjs` avant chaque lot de
relecture** : le fichier part ainsi d'accord avec la main.

## Gabarit « dictionnaire biographique »

Quand l'utilisateur fournit ou demande une mise en page de fiches biographiques (ex. extraits d'ouvrages comme *Mission New Liverpool* de Julie Doyon), utiliser ce gabarit — c'est le format que l'utilisateur préfère pour ce type de contenu :

```
NOM, Prénom (dates si connues, ex. 1741-1801)
 * Fonction / Titre : rôle(s) principal(aux), séparés par « / » si plusieurs.
 * Biographique & Faits : les faits marquants, au fil du texte, dates précises quand elles existent.
 * Réseau / Liens : liens de parenté ou d'association avec d'autres personnes du corpus.
 * Sources (Pages) : p. XX[, p. YY].
```

Entrées triées par ordre alphabétique du nom de famille. Rester factuel et concis ; une phrase ou deux par champ suffit.

Ce gabarit sert à structurer/présenter du texte brut fourni par l'utilisateur. Il est distinct du schéma JSON de `documents/manifeste.json` (types_admis, types_affirmation, degres_certitude) utilisé pour verser ces mêmes faits dans la base de données du site une fois identifiés — les deux ne se substituent pas l'un à l'autre : le gabarit est pour la lecture humaine, le JSON est pour l'intégration au site.
