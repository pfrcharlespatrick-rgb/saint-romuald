// Frontière entre les deux divisions de recensement de 1871-1881 — voir docs/DIVISIONS-1891.md.
// Tracé approximatif, posé d'après les lieux rattachés à des maisons des deux divisions ;
// se déplace depuis carte.html (mode Atelier), se verse par outils/lieux/fondre.mjs.
window.FRONTIERE_DIVISIONS = {
  "format": "frontiere-divisions-saint-romuald",
  "version": 1,
  "mis_a_jour": "2026-09-13",
  "precision": "approximative",
  "note": "Ligne de partage entre la division 1 (le village, vers le nord-est) et la division 2 (New Liverpool et l'intérieur des terres, vers le sud-ouest) des recensements de 1871 et 1881, projetée aussi sur 1891 (maison.division_reconstituee). Son tracé n'est connu qu'aux deux endroits où des lieux placés des deux divisions se font face : le chemin du Fleuve entre les numéros 2052 et 2058, et la rue du Collège entre les numéros 65 et 105. Au-delà, la ligne est prolongée à vue.",
  "trace": [
    { "lat": 46.75882, "lon": -71.24045 },
    { "lat": 46.75731, "lon": -71.23903 },
    { "lat": 46.7563, "lon": -71.237 },
    { "lat": 46.755, "lon": -71.2368 }
  ],
  "etiquettes": {
    "1": { "lat": 46.7598, "lon": -71.2372, "texte": "Division 1 — le village" },
    "2": { "lat": 46.7554, "lon": -71.24192, "texte": "Division 2 — New Liverpool" }
  },
  "appuis": [
    "Chemin du Fleuve : les 2039 et 2052 (Narcisse et Pierre Cantin — 1871 D1 maison 18, 1881 D1 maison 33, 1891 maison 291) sont en division 1 ; le 2058-2060 (bâtiment Lee — 1871 D2 maison 78, 1891 maison 405) est en division 2.",
    "Rue du Collège : le 65 (1891 maison 430) est en territoire de la division 1, le 105 (1891 maisons 446 et 457, Lauréat Vallière) ouvre le grand bloc de la division 2.",
    "Le 2071-2065 (villas jumelles — 1881 D2 maison 244, dernière du parcours de la division 2 ; 1891 maison 622) et le 2123 (maison Saint-Hilaire — 1881 D2 maison 161) montrent que la ligne serre le chemin du Fleuve de près à cet endroit : leurs positions sont interpolées, non relevées.",
    "Tout ce qui est placé à l'ouest du 1984 (Benson, Longwood, Malakoff, rue Hardy, Saint-Damase, Christ Church) relève de la division 2 ; tout ce qui est à l'est du 2104 (Hallé, Demers, curé Sax, villa Atkinson) de la division 1."
  ],
  "journal": "docs/DIVISIONS-1891.md"
};
