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

L'outillage applique déjà cette règle, sur les cinq recensements :
`outils/relecture-1881/atelier.mjs` lit la liste et filtre les champs protégés ;
`pat.mjs`, `pat1.mjs` et `pat91.mjs` refusent de les écrire et rendent compte de
ce qu'ils ont laissé, en montrant côte à côte la valeur écrite à la main et celle
que la relecture proposait ; `fondre.mjs` verse les corrections manuelles dans
les recensements — ce qui les rend visibles sur le site public, qui ne lit pas le
fichier de travail.

**Passer `node outils/relecture-1881/fondre.mjs` avant chaque lot de relecture** :
les fichiers partent ainsi d'accord avec la main. L'opération est idempotente et
`--essai` montre sans écrire.

### Les maisons, les familles et les liens sont versés aussi

Le même fichier de travail porte trois autres clés tranchées à la main. Elles
ne restent plus dans l'atelier : elles sont versées, et par ces outils.

| Clé | Ce qu'elle dit | Versée par | Où elle va |
|---|---|---|---|
| `suivi-corr-maison` | colonne du formulaire, logement, adresse d'une maison — clé `annee-division-no` | `outils/relecture-1881/fondre.mjs` | `maison.colonne_logement` (2 en construction, 3 inhabitée, 4 habitée), `maison.logement.{materiau,etages,chambres}`, `maison.adresse` |
| `suivi-corr-famille` | numéro de famille corrigé — clé `annee-division-maison-numéro d'origine`, valeur rognée | `outils/relecture-1881/fondre.mjs` | `famille.no_famille` |
| `suivi-liens`, et son pendant `suivi-filiation-rejets` | rapprochements entre recensements confirmés ou écartés | `outils/analyse-filiation.mjs`, à chaque recalcul | `data/filiation-data.js` : `origine: "main"` pour un lien confirmé, liste `ecartes` pour un lien écarté |

Les mêmes règles valent : seuls les champs touchés sont écrits, un logement
sur lequel la main s'est posée perd son drapeau `incertain`, une famille
renumérotée est reconnue sous son nouveau numéro au passage suivant, et
l'opération est idempotente. Deux choses que `fondre.mjs` **laisse** et
signale : un `no_maison` corrigé — c'est l'identifiant dont dépendent les clés
de l'atelier, des lieux et des annexes — et un lien dont la relation est une
parenté (« veuve de… ») plutôt qu'un suivi de la même personne.

**Un numéro de maison se change avec `outils/relecture-1881/renumeroter.mjs`**,
qui le fait partout où il sert de clé (recensement, tableaux annexes, Rapport
de 1871, lieux) et dit ce qu'il a touché ; le même outil sort une famille de
sa maison pour la mettre dans une autre, créée au besoin — ce que l'atelier ne
sait pas faire :

```sh
node outils/relecture-1881/renumeroter.mjs maison 1871 2 "131 [?]" 147 --essai
node outils/relecture-1881/renumeroter.mjs famille 1871 2 137 175 138 --essai
```

Le fichier de travail n'est pas réécrit pour autant : ses clés gardent
l'ancien numéro, et `fondre.mjs` reconnaît la maison sous le nouveau (celui que
la main a écrit dans `no_maison`), familles comprises. Après une
renumérotation, relancer l'analyse des filiations et la génération du site.

Les liens ne se versent pas dans un recensement : l'analyse des filiations
relit `suivi-liens` et `suivi-filiation-rejets` **avant** de retenir ses
rapprochements et d'en déduire les événements, si bien qu'une décision de la
main survit à chaque recalcul par construction (voir `docs/FILIATION.md`,
« La main survit au recalcul »). `fondre.mjs --essai` dit si
`data/filiation-data.js` est en retard sur la main. L'ordre, après qu'une
sauvegarde de l'atelier a été fondue dans `main` :

```sh
node outils/relecture-1881/fondre.mjs --essai   # ce qui serait versé, et ce qui est laissé
node outils/relecture-1881/fondre.mjs           # verser personnes, maisons, familles
node outils/analyse-filiation.mjs               # reprendre les liens de la main
node outils/generer-site.mjs                    # propager aux fiches du site
```

`data/travail-personnel.json` n'est jamais réécrit par ces outils : c'est
l'archive de ce qui a été tranché.

## Les lieux : la file de l'atelier de la carte se vide une fois versée

L'atelier de la carte (`carte.html?atelier=1`) garde son travail sous
`suivi-lieux`, dans le même `data/travail-personnel.json`. Contrairement aux
corrections de recensement, **ce n'est pas une archive : c'est une file**. Une
entrée versée par `outils/lieux/fondre.mjs` est consignée au registre `verse` de
`data/lieux-data.js` (son empreinte) et **n'est plus jamais réappliquée** ; le
navigateur la retire de son travail local dès qu'il voit le registre publié.
Voir `docs/LIEUX.md`, « Le registre des versements ».

Ce que cela impose :

1. **Ne jamais fondre une sauvegarde de l'atelier les yeux fermés.** Lire d'abord
   `node outils/lieux/fondre.mjs --essai`, et en particulier « La main a
   retiré » : un rattachement ou une note qui s'en va doit être voulu.
2. **Un travail intégré à la main** (un `lieux-data.js` téléchargé et fusionné
   champ par champ) se déclare ensuite par
   `node outils/lieux/fondre.mjs --tenir-pour-verse`, sinon la file revient.
3. **Ne pas retirer d'entrée du registre `verse`**, même pour un lieu supprimé :
   c'est elle qui dit au navigateur d'oublier.
4. Les valeurs de `suivi-familles-corrections` se lisent **rognées**
   (`atelier.mjs`) : « Peltier  » est « Peltier ». Le fichier, lui, n'est pas
   réécrit.

## 1891 n'a qu'une division

Le formulaire de 1891 n'a pas de case « division » : `recensement-1891-d1-data.js`
est la paroisse entière et le jeu « d2 » restera vide. La coupure de 1871-1881 y est
**reconstituée** maison par maison (`maison.division_reconstituee`,
`maison.appui_division`) par `outils/relecture-1881/divisions91.mjs` ; les bornes
des blocs sont une décision consignée dans `docs/DIVISIONS-1891.md`. Ne jamais
présenter cette division comme celle du manuscrit, ni toucher au champ `division`
ni aux identifiants `1891-D1-…`.

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
