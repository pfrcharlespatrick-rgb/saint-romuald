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
        "nw": { "lat": 46.7731, "lon": -71.2997 },
        "ne": { "lat": 46.7731, "lon": -71.2047 },
        "sw": { "lat": 46.7061, "lon": -71.2997 }
      },
      "opacite": 0.6,
      "cale": false
    },
    {
      "id": "goad-1876-f12",
      "titre": "Goad 1876, feuille 12 — village d'Etchemin et moulins Atkinson",
      "annee": "1876",
      "fichier": "assets/plans/goad-1876-f12.jpg",
      "source": "Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 12. Plans d'assurance-incendie, échelle 200 pieds au pouce. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049",
      "note": "Le village d'Etchemin au complet : son église (l'église Saint-Romuald), les moulins Etchemin (Henry Atkinson junior) à l'embouchure de la rivière, les étangs de flottage Mill Pond et Rigolet Pond (« all water power, no steam used »), un hôtel, et la grève de Saint-Romuald vers l'ouest. Le fleuve est en bas de la feuille : le nord est donc vers le bas, la gauche vers l'aval (feuille 11). Calage ancré sur l'église Saint-Romuald (dessinée sur la feuille, position réelle connue), l'orientation raccordée à la feuille 13. Dernier réglage aux poignées dans l'atelier.",
      "points": {
        "nw": { "lat": 46.756930, "lon": -71.225602 },
        "ne": { "lat": 46.753519, "lon": -71.240926 },
        "sw": { "lat": 46.763350, "lon": -71.228646 }
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
      "note": "Anse Hamilton (Hamilton Bros.) et anse de New Liverpool (Benson Brothers) ; porte la ligne de démarcation entre les villages d'Etchemin et de New Liverpool, une scierie de 75 chevaux-vapeur et une boulangerie. Le fleuve est en bas de la feuille : le nord est donc vers le bas, la gauche vers l'aval (feuille 12, côté Etchemin). Calage ajusté par moindres carrés : la route dessinée sur la feuille, mesurée pixel par pixel, est posée sur le tracé réel du chemin du Fleuve — le contenu est incliné sur le papier, l'angle en tient compte. Dernier réglage aux poignées dans l'atelier.",
      "points": {
        "nw": { "lat": 46.751747, "lon": -71.240270 },
        "ne": { "lat": 46.747691, "lon": -71.255301 },
        "sw": { "lat": 46.758024, "lon": -71.243879 }
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
      "note": "Le cœur du village de New Liverpool : les maisons de bois numérotées une à une le long du chemin public, la New Liverpool Steam Saw Mill (Ritchie and Cull) et l'anse des Benson Brothers. Le fleuve est en bas de la feuille : le nord est donc vers le bas, la gauche vers l'aval (feuille 13). Calage ajusté par moindres carrés : la route dessinée sur la feuille, mesurée pixel par pixel, est posée sur le tracé réel du chemin du Fleuve — le contenu est incliné sur le papier, l'angle en tient compte. Dernier réglage aux poignées dans l'atelier.",
      "points": {
        "nw": { "lat": 46.747671, "lon": -71.253689 },
        "ne": { "lat": 46.742405, "lon": -71.267844 },
        "sw": { "lat": 46.753645, "lon": -71.258423 }
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
      "note": "Anse Albert (Ritchie and Cull), bassin de la Chaudière (bois empilé de Henry King & Co) et embouchure de la rivière Chaudière ; renvoi vers les moulins de St. Nicholas à 5 ¾ milles. Le fleuve est en bas de la feuille : le nord est donc vers le bas, la gauche vers l'aval (feuille 14). Calage ajusté par moindres carrés : la route dessinée sur la feuille, mesurée pixel par pixel, est posée sur le tracé réel du chemin du Fleuve — le contenu est incliné sur le papier, l'angle en tient compte. Dernier réglage aux poignées dans l'atelier.",
      "points": {
        "nw": { "lat": 46.742684, "lon": -71.266692 },
        "ne": { "lat": 46.737367, "lon": -71.280836 },
        "sw": { "lat": 46.748647, "lon": -71.271466 }
      },
      "opacite": 0.6,
      "cale": false
    }
  ]
};
