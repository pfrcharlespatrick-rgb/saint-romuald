"""Recueil PDF des pages 84 à 142 (1891, division 1).

Les cadres 89 et 90 sont intervertis sur le microfilm : l'en-tête imprimé
« PAGE nn » de chaque cadre fait foi, et les données suivent cet ordre.
"""
from recueil91 import Recueil
R = Recueil('1891_DIV12_Partie03', base=84, echanges={89: 90, 90: 89})
locate, filets, frame, strip, render = R.locate, R.filets, R.frame, R.strip, R.render
BASE = R.base
