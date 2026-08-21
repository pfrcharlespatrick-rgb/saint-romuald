"""Recueil PDF des pages 84 à 142 (1891, division 1).

Cinquième recueil reçu (fichier « 189102DIV12 ») : 30 pages PDF, deux cadres
par page, le dernier cadre étant un formulaire vierge — soit 59 cadres
remplis, exactement les pages 84 à 142. La page 84 occupe le cadre du haut de
la première page PDF, d'où base=84.

Il double le recueil `r91b` (motif `1891_DIV12_Partie03`) sur la même plage.
`r91b` reste en place pour les relectures faites avec lui ; celui-ci sert la
passe de la colonne 4.

**Les cadres 89 et 90 y sont intervertis**, comme dans `r91b` : le cadre de la
page 89 porte le ménage Gurreri (page 90) et celui de la page 90 porte Fournier
Régina (page 89). Vérifié en confrontant le contenu aux données, page par page.
"""
from recueil91 import Recueil
R = Recueil('189102DIV12', base=84, echanges={89: 90, 90: 89})
locate, filets, frame, strip, render = R.locate, R.filets, R.frame, R.strip, R.render
BASE = R.base


# ── Géométrie irrégulière : ancrer la lecture sur le contenu ────────────────
# La détection de filets de `recueil91` se trompe sur 19 des 59 pages de ce
# recueil — elle prend le filet de la ligne 1, ou celui de la rangée des
# numéros de colonnes, pour le haut de table. Un recalage par la médiane des
# hauts de cadre a été essayé : il corrige une partie des pages et en décale
# d'autres, et a donc été abandonné.
#
# **La parade est de ne pas dépendre du calage** : le numéro de famille est
# écrit en gros dans la case voisine du code de logement, et sa valeur est
# connue par les données. En rendant trois lignes autour de la ligne attendue,
# on lit le code de la ligne qui porte le bon numéro, quel que soit le
# décalage. C'est la méthode employée pour la passe de la colonne 4.
