// Plans anciens posés en surimpression de la carte — voir docs/PLANS-ANCIENS.md.
// Les coins sont calculés par outils/lieux/caler-plans.mjs depuis data/plans-reperes.json,
// puis réglables aux poignées dans carte.html (mode Atelier) et versés par outils/lieux/fondre.mjs.
window.PLANS = {
  "format": "plans-saint-romuald",
  "version": 1,
  "mis_a_jour": "2026-11-17",
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
      "note": "Pose provisoire, à confirmer — et plan étiré, par décision de Patrick (17 novembre 2026). Le plan montre la pointe est de l'embouchure : le quai, la grève, le chemin public au pied du cap, et l'escarpement qui longe le Grand Bassin ; voisins nommés : Thos Hickey, Louis Paradis, Ignace Roberge, John Thomson, Pierre Pichette, David Boucher, Humphrey. Posé d'un bloc, ce plan ne tient pas à la fois ce que Patrick lui demande : son chemin public sur le chemin du Fleuve d'aujourd'hui, son quai sur la pointe du Pont-Garneau (deux repères qu'il a désignés par deux flèches), et son escarpement sur la rive du Grand Bassin — réduire le plan n'y changeait rien. Mis devant quatre solutions, il a choisi de l'étirer. L'image est donc déformée : 0,445 m par pixel dans sa largeur, 0,403 dans sa hauteur (la barre graphique du plan donne 0,420), et ses deux axes font 85° au lieu de 90°. Ainsi posé : le quai et la grève sont sur les repères de Patrick à 5 m près ; le chemin public suit le chemin du Fleuve à 2 à 12 m sur sa moitié est (16 à 30 m à l'ouest) ; l'escarpement suit la rive du Bassin à 4 à 25 m ; le coin du ruisseau tombe à 8 m. Ce que cela coûte : les angles et les distances lus sur le plan étiré ne sont plus ceux de l'arpenteur — la ligne C-D, que le procès-verbal de Pierre Lambert de 1841 mesure « Sud 32° Est, 121 pieds » (39,3 m), y tombe au sud 27° est, sur 36,8 m. Pour mesurer, se servir de l'image du plan, non de sa pose sur la carte.",
      "points": {
        "nw": {
          "lat": 46.743286,
          "lon": -71.282594
        },
        "ne": {
          "lat": 46.747598,
          "lon": -71.273245
        },
        "sw": {
          "lat": 46.736035,
          "lon": -71.274016
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
      "note": "Pose provisoire, à confirmer — et plan étiré comme celui de 1866. Le plan de 1842 et celui d'Alfred Hamel de 1866 bornent le même terrain : ils partagent les bornes A, B, C, D, la longue ligne qui descend vers le Bassin (« Pierre Pichet » en 1842, « Pierre Pichette » en 1866 : 448 et 449 m) et la borne du bas, chez Boucher. Le plan de 1842 est rapporté à celui de 1866 par ces six points communs (4 à 9 m d'écart), puis reçoit la même déformation que lui, choisie par Patrick le 17 novembre 2026 (voir la note du plan de 1866) : 0,85 m par pixel dans sa largeur, 0,77 dans sa hauteur, quand sa barre graphique donne 0,80. Le dessin de 1842 est moins exact que celui de 1866 : la ligne C-D, 121 pieds au procès-verbal, n'y fait que 29 m avant même d'être étirée.",
      "points": {
        "nw": {
          "lat": 46.743078,
          "lon": -71.283039
        },
        "ne": {
          "lat": 46.747538,
          "lon": -71.273895
        },
        "sw": {
          "lat": 46.736564,
          "lon": -71.274824
        }
      },
      "opacite": 0.6,
      "cale": false
    }
  ]
};
