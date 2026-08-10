"""Recueil PDF des pages 42 à 83 (1891, division 1).

Ce recueil porte les colonnes 17 à 25 sur la même prise que les noms, et les
numéros de ligne sont répétés dans la marge droite : c'est lui qui permet la
passe sur les colonnes 21-22 (« Sait lire » / « Sait écrire »).
"""
from recueil91 import Recueil
R = Recueil('1891_Partie02', base=42)
locate, filets, frame, strip, render = R.locate, R.filets, R.frame, R.strip, R.render
BASE = R.base
