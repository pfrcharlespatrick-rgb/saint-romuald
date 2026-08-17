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
  "mis_a_jour": "2026-08-17",
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
    },
    {
      "id": "goad-1876-f13",
      "titre": "Goad 1876, feuille 13 — anse Hamilton et anse de New Liverpool",
      "annee": "1876",
      "fichier": "assets/plans/goad-1876-f13.jpg",
      "source": "Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 13. Plans d'assurance-incendie, échelle 200 pieds au pouce. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049",
      "note": "Anse Hamilton (Hamilton Bros.) et anse de New Liverpool (Benson Brothers) ; porte la ligne de démarcation entre les villages d'Etchemin et de New Liverpool, une scierie de 75 chevaux-vapeur et une boulangerie. Le fleuve est en bas de la feuille : le nord est donc vers le bas, la gauche vers l'aval (feuille 12, côté Etchemin). Calage initial estimé d'après l'axe des lieux du chemin du Fleuve — à ajuster aux poignées dans l'atelier.",
      "points": {
        "nw": { "lat": 46.738509, "lon": -71.261529 },
        "ne": { "lat": 46.732168, "lon": -71.274766 },
        "sw": { "lat": 46.744039, "lon": -71.267168 }
      },
      "opacite": 0.6,
      "cale": false
    },
    {
      "id": "goad-1876-f14",
      "titre": "Goad 1876, feuille 14 — village de New Liverpool",
      "annee": "1876",
      "fichier": "assets/plans/goad-1876-f14.jpg",
      "source": "Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 14. Plans d'assurance-incendie, échelle 200 pieds au pouce. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049",
      "note": "Le cœur du village de New Liverpool : les maisons de bois numérotées une à une le long du chemin public, la New Liverpool Steam Saw Mill (Ritchie and Cull) et l'anse des Benson Brothers. Le fleuve est en bas de la feuille : le nord est donc vers le bas, la gauche vers l'aval (feuille 13). Calage initial estimé d'après l'axe des lieux du chemin du Fleuve — à ajuster aux poignées dans l'atelier.",
      "points": {
        "nw": { "lat": 46.732348, "lon": -71.274115 },
        "ne": { "lat": 46.726025, "lon": -71.287313 },
        "sw": { "lat": 46.737919, "lon": -71.279797 }
      },
      "opacite": 0.6,
      "cale": false
    },
    {
      "id": "goad-1876-f15",
      "titre": "Goad 1876, feuille 15 — anse Albert et bassin de la Chaudière",
      "annee": "1876",
      "fichier": "assets/plans/goad-1876-f15.jpg",
      "source": "Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 15. Plans d'assurance-incendie, échelle 200 pieds au pouce. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049",
      "note": "Anse Albert (Ritchie and Cull), bassin de la Chaudière (bois empilé de Henry King & Co) et embouchure de la rivière Chaudière ; renvoi vers les moulins de St. Nicholas à 5 ¾ milles. Le fleuve est en bas de la feuille : le nord est donc vers le bas, la gauche vers l'aval (feuille 14). Calage initial estimé d'après l'axe des lieux du chemin du Fleuve — à ajuster aux poignées dans l'atelier.",
      "points": {
        "nw": { "lat": 46.725472, "lon": -71.285173 },
        "ne": { "lat": 46.719139, "lon": -71.298393 },
        "sw": { "lat": 46.731047, "lon": -71.290858 }
      },
      "opacite": 0.6,
      "cale": false
    }
  ]
};
