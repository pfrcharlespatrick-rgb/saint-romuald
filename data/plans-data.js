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
      "note": "Calage provisoire, à confirmer. Posé sur trois repères de Patrick — l'église Saint-Romuald, la maison du curé Sax (n° 68) et la villa Atkinson (n° 142) — et, depuis le 17 novembre 2026, étiré sur le chemin public qu'il dessine, posé sur le chemin du Fleuve d'aujourd'hui (à la demande de Patrick). Les repères tombent à 4 à 7 m (11 à 21 m auparavant), le chemin à 10 m au milieu, 30 m au pire (jusqu'à 75 m auparavant, vers l'ouest). C'est la feuille la plus déformée des quatre : 0,572 m par pixel dans sa largeur, 0,650 dans sa hauteur, axes à 93°. Ses distances et ses angles ne sont plus ceux du dessin. D'autres maisons du chemin du Fleuve rattachées à leur numéro Goad le resserreront.",
      "points": {
        "nw": {
          "lat": 46.759523,
          "lon": -71.244943
        },
        "ne": {
          "lat": 46.76546,
          "lon": -71.232691
        },
        "sw": {
          "lat": 46.753472,
          "lon": -71.239424
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
      "note": "Calage provisoire, à confirmer. Un seul repère : l'église anglicane de la côte Rouge (à 4 m). Depuis le 17 novembre 2026, la feuille est étirée sur le chemin public qu'elle dessine, posé sur le chemin du Fleuve d'aujourd'hui (à la demande de Patrick) : 9 m au milieu, 33 m au pire (14 et 45 m auparavant). Elle en sort plus petite que la feuille 14 — 0,641 m par pixel dans sa largeur, 0,639 dans sa hauteur, axes à 93° —, ce qui rejoint ce qu'on avait mesuré : le dessin est trop long entre New Liverpool et la côte Rouge. En revanche, le grand bâtiment de l'éperon du manoir Longwood, qui tombait à 27 m, tombe à 45 m. Aux lisières, elle ne rejoint pas ses voisines : 86 m avec la feuille 14, 50 m avec la feuille 12.",
      "points": {
        "nw": {
          "lat": 46.753995,
          "lon": -71.2393
        },
        "ne": {
          "lat": 46.747611,
          "lon": -71.2533
        },
        "sw": {
          "lat": 46.760004,
          "lon": -71.244519
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
      "note": "Calé sur quatorze maisons du village que Patrick a rattachées à leur numéro Goad (nos 14 à 35) : écart moyen de 7 m, le pire de 11 m. Les rues Saint-Damase et Saint-Vincent retombent sur les ruelles du plan. Depuis le 17 novembre 2026, la feuille est aussi étirée sur le chemin public qu'elle dessine, posé sur le chemin du Fleuve d'aujourd'hui (à la demande de Patrick) : cela ne la change presque pas — 0,692 m par pixel dans sa largeur, 0,706 dans sa hauteur, axes à 89°, 14 m de déplacement au plus. Loin du village le plan est moins sûr, surtout à sa lisière est (nos 1 à 9), où l'écart peut dépasser cent mètres : ces feuilles ne sont pas dessinées à une échelle constante.",
      "points": {
        "nw": {
          "lat": 46.748278,
          "lon": -71.250533
        },
        "ne": {
          "lat": 46.74155,
          "lon": -71.265796
        },
        "sw": {
          "lat": 46.754804,
          "lon": -71.256809
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
      "note": "Calage provisoire, à confirmer — feuille étirée, par décision de Patrick (17 novembre 2026). Patrick avait d'abord réglé la feuille aux poignées ; à sa demande, elle a été recalculée de zéro sur cinq choses : le quai dessiné à l'embouchure, posé sur le quai du plan de 1866 (pointe du Pont-Garneau) ; le chemin public vers l'est, sur le chemin du Fleuve ; la crête de la montagne, sur le haut de la falaise boisée du cap Anderson (vérifiée sur le relief) ; le bord du fleuve ; et la berge est de la Chaudière. Le calcul retombe tout près du réglage de Patrick. Ainsi posée : quai à 6 m, chemin à 6 m, crête à 24 m au milieu (35 m au pire), bord du fleuve à 15 m, berge de la Chaudière à 18 m. Goad a dessiné la montagne trop près du chemin : pour l'amener sur la vraie crête, la feuille est étirée du double dans le sens de la pente — 0,37 m par pixel dans sa largeur, 0,71 dans sa hauteur, axes à 81°. Ses distances et ses angles ne sont plus ceux du dessin : pour mesurer, se servir de l'image. Elle ne rejoint pas la feuille 14 à leur lisière commune. Pose dictée : outils/lieux/caler-plans.mjs la laisse telle quelle (voir docs/PLANS-ANCIENS.md).",
      "points": {
        "nw": {
          "lat": 46.74158,
          "lon": -71.265727
        },
        "ne": {
          "lat": 46.737807,
          "lon": -71.273573
        },
        "sw": {
          "lat": 46.747274,
          "lon": -71.273663
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
