# Saint-Romuald — les gens du Fleuve

Recensements nominatifs de Saint-Romuald et New Liverpool (comté de Lévis,
Québec) pour 1871, 1881 et 1891 : environ 10 000 personnes, 1 600 maisons,
dépouillées page par page depuis les manuscrits, reliées d'un recensement à
l'autre et rattachées aux adresses actuelles du chemin du Fleuve.

Atelier de recherche de Patrick Blanchet.

**Site :** https://pfrcharlespatrick-rgb.github.io/saint-romuald/

## Le site

Site entièrement statique (GitHub Pages), sans étape de compilation : les pages
HTML lisent des fichiers JSON générés d'avance.

- `index.html` — accueil et recherche dans les trois recensements
- `personne.html`, `maison.html`, `lieu.html` — les fiches
- `carte.html` — les lieux du chemin du Fleuve (Leaflet, plans anciens)
- `stats.html` — la paroisse en chiffres
- `filiation.html` — trajectoires 1871 → 1881 → 1891
- `methode.html` — d'où viennent les données et ce qui reste incertain
- `Suivi des maisons et familles.dc.html` — l'atelier de saisie du chercheur

## Les données

- `data/` — recensements et annexes, la source de vérité
- `fiches/`, `recherche-index.json`, `stats-donnees.json` — générés par
  `node outils/generer-site.mjs` (à rejouer après toute modification de `data/`)
- `outils/` — dépouillement, relecture au manuscrit, filiation, génération
- `documents/manifeste.json` — sources documentaires et affirmations sourcées

La règle de travail est dans `CLAUDE.md` : les corrections manuelles du
chercheur (`data/travail-personnel.json`) priment sur toute relecture
automatique. Le détail du schéma est dans `docs/SCHEMA.md`.
