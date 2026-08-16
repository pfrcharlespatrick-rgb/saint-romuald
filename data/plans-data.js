// Plans anciens posés en surimpression de la carte — voir docs/LIEUX.md.
//
// Chaque plan est une image rangée dans assets/plans/, ancrée par trois coins
// (nord-ouest, nord-est, sud-ouest de l'IMAGE, pas du terrain : si le plan est
// tourné, ses coins le sont aussi). Tant que `cale` est false, le plan
// n'apparaît qu'en mode Atelier, pour être calé ; une fois marqué calé, la
// carte publique l'offre en surimpression avec son réglage de transparence.
//
// Le calage se fait sur la carte (carte.html, mode Atelier), s'enregistre dans
// localStorage sous `suivi-plans`, voyage dans la sauvegarde de l'atelier, et
// se verse ici par `node outils/lieux/fondre.mjs`.
window.PLANS = {
  "format": "plans-saint-romuald",
  "version": 1,
  "mis_a_jour": "2026-08-16",
  "plans": [
    {
      "id": "cadastre-1879",
      "titre": "Plan officiel de la paroisse de St-Romuald d'Etchemin (1879)",
      "annee": "1879",
      "fichier": "assets/plans/cadastre-1879.jpg",
      "source": "Plan officiel de la paroisse de St-Romuald d'Etchemin, comté de Lévis, Québec, 11 juin 1879. Cadastre dressé après l'abolition du régime seigneurial ; porte en renvoi les numéros du cadastre seigneurial de la seigneurie de Lauzon (numéros encerclés) et des corrections ultérieures (lot 462 corrigé 22 oct. 1900, corrections de 1935).",
      "note": "Fourni par Patrick Blanchet, août 2026. Trois échelles sur une même feuille : la paroisse entière en haut (5 arpents au pouce), le village du chemin du Fleuve au centre et en bas (1 arpent au pouce). Le calage ne peut donc être juste que pour une bande à la fois — caler sur la bande centrale, celle du chemin du Fleuve, où vivent les maisons du recensement.",
      "points": {
        "nw": { "lat": 46.7560, "lon": -71.3230 },
        "ne": { "lat": 46.7560, "lon": -71.2280 },
        "sw": { "lat": 46.6890, "lon": -71.3230 }
      },
      "opacite": 0.6,
      "cale": false
    }
  ]
};
