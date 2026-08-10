"""Recueil PDF des pages 1 à 41 (1891, division 1).

Le premier des trois recueils, et le dernier fourni. Deux choses le distinguent
des deux autres :

- son tout premier cadre n'est pas une page du recensement mais la fiche-titre
  du microfilm (« 1891 — Québec — 163 Lévis — St. Romuald d'Etchemin — pages
  1-142 »). La page 1 du manuscrit occupe donc la moitié *basse* de la première
  page PDF, d'où `base=0` : le cadre 0 est la fiche-titre, et le compte tombe
  juste ensuite ;
- ses cadres sont photographiés un peu plus grands. Le bloc des 25 lignes y
  occupe 0,247 de la hauteur de page au lieu de 0,235, et les deux moitiés sont
  décalées vers le bas — d'où la géométrie passée au constructeur.
"""
from recueil91 import Recueil
R = Recueil('1891_DIV12_Partie01', base=0)
locate, filets, frame, strip, render = R.locate, R.filets, R.frame, R.strip, R.render
BASE = R.base
