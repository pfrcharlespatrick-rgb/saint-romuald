"""Recueil PDF des pages 1 à 41 (1891, division 1).

Quatrième recueil, reçu en dernier : il comble les pages 1 à 41, jusque-là
relues sur les seules images JPEG. Le cadre du haut de la première page PDF
est la carte-titre du microfilm (« 163 — Lévis, L — St. Romuald d'Etchemin »,
pages 1-142) ; la page 1 du manuscrit occupe le cadre du bas, d'où base=0.

**Les cadres 35 et 36 sont intervertis sur le microfilm**, comme le sont 89 et
90 dans le recueil des pages 84-142 : le cadre 35 porte la page 36 (le ménage
Sénéchale, familles 149 à 153) et le cadre 36 porte la page 35 (la fin des
Fecteau, familles 144 à 149). Le contenu fait foi, et les numéros de famille
manuscrits le confirment : la page 35 se termine sur la famille 149 dont la
page 36 poursuit le ménage. L'échange est codé ci-dessous.
"""
from recueil91 import Recueil
R = Recueil('1891_01_DIV12', base=0, echanges={35: 36, 36: 35})
locate, filets, frame, strip, render = R.locate, R.filets, R.frame, R.strip, R.render
BASE = R.base
