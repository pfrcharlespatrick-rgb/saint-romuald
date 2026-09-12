"""Recueil PDF des pages 1 à 142 (1891, division 1) — le recueil complet.

Quatrième recueil reçu, et **le premier qui porte la division entière** : la
carte-titre du microfilm (« 163 — Lévis, L — St. Romuald d'Etchemin, pages
1-142 ») occupe le cadre du haut de la première page PDF, et la page 1 du
manuscrit le cadre du bas — d'où base=0, comme `r91a.py`.

**Le nom de fichier ne dit pas l'étendue.** Celui-ci s'appelle « Partie04 » et
ne couvre pas un quart mais le tout ; en 1881, un fichier nommé « partie2 »
portait de même les 88 pages quand `d1.locate` le croyait limité aux pages 30 à
59. Vérifier l'étendue d'un recueil avant de s'en servir, c'est une minute ; s'en
passer, c'est lire une page pour une autre sans rien voir.

Les deux interversions de cadres du microfilm sont reprises des recueils
précédents — 35/36 (`r91a`) et 89/90 (`r91b`, `r91d`) —, puisque c'est le même
microfilm. **Elles sont vérifiées au contenu dans ce recueil-ci** : le cadre 35
porte bien la page 36 et le cadre 89 la page 90.
"""
from recueil91 import Recueil
R = Recueil('1891_DIV1-2_Partie04', base=0, echanges={35: 36, 36: 35, 89: 90, 90: 89})
locate, filets, frame, strip, render = R.locate, R.filets, R.frame, R.strip, R.render
BASE = R.base
