"""Recueil PDF des pages 1 à 41 (1891, division 1).

Quatrième recueil, reçu en dernier : il comble les pages 1 à 41, jusque-là
relues sur les seules images JPEG. Le cadre du haut de la première page PDF
est la carte-titre du microfilm (« 163 — Lévis, L — St. Romuald d'Etchemin »,
pages 1-142) ; la page 1 du manuscrit occupe le cadre du bas, d'où base=0.
"""
from recueil91 import Recueil
R = Recueil('1891_01_DIV12', base=0)
locate, filets, frame, strip, render = R.locate, R.filets, R.frame, R.strip, R.render
BASE = R.base
