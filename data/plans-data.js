// Plans anciens posés en surimpression de la carte — voir docs/PLANS-ANCIENS.md.
// Les coins sont calculés par outils/lieux/caler-plans.mjs depuis data/plans-reperes.json,
// puis réglables aux poignées dans carte.html (mode Atelier) et versés par outils/lieux/fondre.mjs.
window.PLANS = {
  "format": "plans-saint-romuald",
  "version": 1,
  "mis_a_jour": "2026-11-12",
  "plans": [
    {
      "id": "quebec-coves-1876-f12",
      "titre": "Goad 1876, feuille 12 — village d'Etchemin et moulins Atkinson",
      "annee": 1876,
      "fichier": "assets/plans/quebec-coves-1876-f12.jpg",
      "source": "Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 12. Plans d'assurance-incendie. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049",
      "note": "Calage provisoire, à confirmer. Posé sur trois repères de Patrick — l'église Saint-Romuald, la maison du curé Sax (n° 68) et la villa Atkinson (n° 142) —, justes à une vingtaine de mètres. Le long du chemin du Fleuve, vers l'ouest, le plan s'écarte jusqu'à 75 m : la feuille n'est pas dessinée à une échelle constante. D'autres maisons du chemin du Fleuve rattachées à leur numéro Goad le resserreront.",
      "points": {
        "nw": {
          "lat": 46.758868,
          "lon": -71.24548
        },
        "ne": {
          "lat": 46.765454,
          "lon": -71.232513
        },
        "sw": {
          "lat": 46.753436,
          "lon": -71.239602
        }
      },
      "opacite": 0.6,
      "cale": false
    },
    {
      "id": "quebec-coves-1876-f13",
      "titre": "Goad 1876, feuille 13 — anse Hamilton et anse de New Liverpool",
      "annee": 1876,
      "fichier": "assets/plans/quebec-coves-1876-f13.jpg",
      "source": "Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 13. Plans d'assurance-incendie. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049",
      "note": "Calage provisoire, à confirmer. Un seul repère : l'église anglicane de la côte Rouge ; l'échelle est celle de la feuille 14 et l'orientation vient de la flèche du nord. Autour de l'église le plan tombe juste — la côte Rouge, le chemin du Fleuve, l'éperon du manoir Longwood et le pied de la falaise se superposent à la carte d'aujourd'hui. Aux deux lisières il ne rejoint pas ses voisines à cent mètres près.",
      "points": {
        "nw": {
          "lat": 46.754144,
          "lon": -71.238418
        },
        "ne": {
          "lat": 46.747323,
          "lon": -71.253664
        },
        "sw": {
          "lat": 46.76051,
          "lon": -71.244485
        }
      },
      "opacite": 0.6,
      "cale": false
    },
    {
      "id": "quebec-coves-1876-f14",
      "titre": "Goad 1876, feuille 14 — village de New Liverpool",
      "annee": 1876,
      "fichier": "assets/plans/quebec-coves-1876-f14.jpg",
      "source": "Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 14. Plans d'assurance-incendie. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049",
      "note": "Calé sur quatorze maisons du village que Patrick a rattachées à leur numéro Goad (nos 14 à 35) : écart moyen de 7 m, le pire de 11 m. Les rues Saint-Damase et Saint-Vincent retombent sur les ruelles du plan. Loin du village le plan est moins sûr, surtout à sa lisière est (nos 1 à 9), où l'écart peut dépasser cent mètres : ces feuilles ne sont pas dessinées à une échelle constante.",
      "points": {
        "nw": {
          "lat": 46.748352,
          "lon": -71.250603
        },
        "ne": {
          "lat": 46.741535,
          "lon": -71.265852
        },
        "sw": {
          "lat": 46.754788,
          "lon": -71.256732
        }
      },
      "opacite": 0.6,
      "cale": true
    },
    {
      "id": "quebec-coves-1876-f15",
      "titre": "Goad 1876, feuille 15 — anse Albert et bassin de la Chaudière",
      "annee": 1876,
      "fichier": "assets/plans/quebec-coves-1876-f15.jpg",
      "source": "Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 15. Plans d'assurance-incendie. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049",
      "note": "Calage provisoire, à confirmer. Aucun repère sûr sur cette feuille : elle est accrochée à la feuille 14 par leur ligne de raccord, à la même échelle, orientée par sa flèche du nord. L'embouchure de la Chaudière a été remodelée (marina, remblais) et ne peut pas servir d'appui. Les lieux « … – Goad » de ce secteur, posés autrefois d'après un ancien calage, s'en écartent de 160 à 260 m.",
      "points": {
        "nw": {
          "lat": 46.741895,
          "lon": -71.264588
        },
        "ne": {
          "lat": 46.735313,
          "lon": -71.280057
        },
        "sw": {
          "lat": 46.748419,
          "lon": -71.270499
        }
      },
      "opacite": 0.6,
      "cale": false
    }
  ]
};
