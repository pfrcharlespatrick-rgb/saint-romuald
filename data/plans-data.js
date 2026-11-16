// Plans anciens posés en surimpression de la carte — voir docs/PLANS-ANCIENS.md.
// Les coins sont calculés par outils/lieux/caler-plans.mjs depuis data/plans-reperes.json,
// puis réglables aux poignées dans carte.html (mode Atelier) et versés par outils/lieux/fondre.mjs.
window.PLANS = {
  "format": "plans-saint-romuald",
  "version": 1,
  "mis_a_jour": "2026-11-16",
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
    },
    {
      "id": "hetriere-1844",
      "titre": "Plan de l'Hétrière, 1844 — entre le Premier rang et la Chaudière (croquis de P. Lambert)",
      "annee": 1844,
      "fichier": "assets/plans/st-jean-chrysostome-1844-hetriere.jpg",
      "source": "P. Lambert, arpenteur, plan et description d'une étendue de terre de la paroisse de Saint-Jean-Chrysostome, 5 février 1844. Image fournie par Patrick Blanchet, novembre 2026 ; dépôt et cote à préciser. Fiche : documents/manifeste.json, « plan-1844-02-05-hetriere-riviere-bruyante ».",
      "note": "Pose provisoire, à confirmer — un point de départ pour le calage, non une position établie. C'est un croquis, pas un plan à l'échelle. La « rivière Bruyante » est la Chaudière (indication de Patrick, 16 novembre 2026). La pose est calculée sur trois hypothèses : le point B, où des hachures barrent la rivière, est mis aux chutes de la Chaudière — ce sont probablement elles, selon Patrick ; l'échelle vient des 16 arpents et demi de front écrits entre A et D (environ 2,3 m par pixel) ; l'orientation vient de la flèche « Vrai Nord », pointe au nord. Ainsi posé, le croquis s'accorde avec le terrain : la rivière vient du sud, repart au nord-nord-ouest, et la ligne du rang court nord-est – sud-ouest, comme le fleuve. Mais aucun point n'a été relevé sur place : l'ensemble peut être décalé de plusieurs centaines de mètres.",
      "points": {
        "nw": {
          "lat": 46.723009,
          "lon": -71.255142
        },
        "ne": {
          "lat": 46.704036,
          "lon": -71.281487
        },
        "sw": {
          "lat": 46.751552,
          "lon": -71.298777
        }
      },
      "opacite": 0.6,
      "cale": false
    },
    {
      "id": "embouchure-chaudiere-1866",
      "titre": "Embouchure de la Chaudière, 1866 — lot du Gouvernement et ses voisins (plan d'Alfred Hamel)",
      "annee": 1866,
      "fichier": "assets/plans/embouchure-chaudiere-1866-hamel.jpg",
      "source": "Alfred Hamel, arpenteur provincial, « Plan annexé au Procès Verbal, en date des 6 et 7 Août 1866, des lignes et bornes entre le lot de terre du Gouvernement et les Voisins ; situé à la Rivière Chaudière », Québec, 11 août 1866. Échelle de 150 pieds français au pouce. Image fournie par Patrick Blanchet le 16 novembre 2026 sous le nom de fichier « 03Q_CA301S22D189 » — sans doute une cote de BAnQ Québec, à confirmer.",
      "note": "Pose provisoire, à confirmer. Le plan montre la pointe est de l'embouchure : le quai, la grève, le chemin public au pied du cap, et l'escarpement qui longe le Grand Bassin ; voisins nommés : Thos Hickey, Louis Paradis, Ignace Roberge, John Thomson, Pierre Pichette, David Boucher, Humphrey. La pose est celle que Patrick a dictée le 16 novembre 2026, en trois temps. Posé selon sa flèche « Nord Astronomique » (nord à 44° sur la feuille), le plan menait son chemin public jusqu'au bord de l'eau : il l'a fait incliner sur le chemin du Fleuve d'aujourd'hui. Puis il a désigné deux repères sur la carte, par deux flèches : le quai du plan est la pointe du Pont-Garneau, et la grève à l'ouest du quai est la rive ouest de cette pointe — 46 m vers le sud-ouest —, en demandant de réduire le plan de quelques pour cent. Le plan est donc déplacé sur ces deux repères (à 4 m près), réduit de 3 % (0,408 m par pixel, quand sa barre graphique donne 0,420), et incliné à 34°, où son chemin public suit le mieux le chemin du Fleuve (3 m à son bout est). Ce que cela coûte : l'escarpement du Grand Bassin, juste dans sa moitié nord (3 à 14 m), sort sur l'eau dans sa moitié sud, jusqu'à 71 m de la rive ; et la ligne C-D, que le procès-verbal de Pierre Lambert de 1841 mesure « Sud 32° Est, 121 pieds », tombe au sud 23° est, sur 37,8 m pour 39,3 m. Un plan posé d'un bloc ne peut pas tenir à la fois le chemin, le quai et la rive du Bassin.",
      "points": {
        "nw": {
          "lat": 46.743539,
          "lon": -71.282098
        },
        "ne": {
          "lat": 46.747501,
          "lon": -71.273536
        },
        "sw": {
          "lat": 46.735711,
          "lon": -71.274401
        }
      },
      "opacite": 0.6,
      "cale": false
    },
    {
      "id": "embouchure-chaudiere-1842",
      "titre": "Embouchure de la Chaudière, 1842 — terrain et grève du Gouvernement (plan de Pierre Lambert)",
      "annee": 1842,
      "fichier": "assets/plans/embouchure-chaudiere-1842-lambert.jpg",
      "source": "Pierre Lambert, arpenteur, « Plan du Terrein et Grève appartenant au Gouvernement, situés à l'embouchure de la Rivière Bruyante ou Chaudière, Seigneurie Lauzon, paroisse Saint Romuald d'Etchemin, Comté de Lévi », 24 février 1842, avec le procès-verbal de bornage du 28 octobre 1841. Image fournie par Patrick Blanchet le 16 novembre 2026 sous le nom « 03Q_CN301S323D04140R » — sans doute une cote de BAnQ Québec, à confirmer. Fiche : documents/manifeste.json, « plan-1842-02-24-embouchure-chaudiere-lambert ».",
      "note": "Pose provisoire, à confirmer. Le plan de 1842 et celui d'Alfred Hamel de 1866 bornent le même terrain : ils partagent les bornes A, B, C, D, la longue ligne qui descend vers le Bassin (« Pierre Pichet » en 1842, « Pierre Pichette » en 1866 : 448 et 449 m) et la borne du bas, chez Boucher. Le plan de 1842 est donc posé sur celui de 1866 par ces six points communs, échelle et rotation libres : 4 à 9 m d'écart. Il suit ainsi la pose dictée par Patrick pour le plan de 1866 (voir sa note) : le nord tombe à 36° sur la feuille, quand sa flèche le met à 49°, et l'échelle à 0,78 m par pixel, quand sa barre graphique donne 0,80. Le dessin de 1842 est moins exact que celui de 1866 : la ligne C-D, 121 pieds au procès-verbal, n'y fait que 28 m.",
      "points": {
        "nw": {
          "lat": 46.743339,
          "lon": -71.2825
        },
        "ne": {
          "lat": 46.747468,
          "lon": -71.274141
        },
        "sw": {
          "lat": 46.736299,
          "lon": -71.275112
        }
      },
      "opacite": 0.6,
      "cale": false
    }
  ]
};
