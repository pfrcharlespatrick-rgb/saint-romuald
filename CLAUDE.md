# Saint-Romuald — notes de projet pour Claude

Site de recherche généalogique/recensement pour Saint-Romuald, Québec (recensements 1871, 1881, 1891). Voir `docs/FILIATION.md` et `documents/README.md` pour l'architecture des données et le schéma de `documents/manifeste.json`.

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
