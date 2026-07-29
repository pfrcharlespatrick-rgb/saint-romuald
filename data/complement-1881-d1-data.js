/* Complément de dépouillement — Recensement de 1881, division 1 de Saint-Romuald
   Source : Bibliothèque et Archives Canada, Recensement du Canada 1881,
            district no 46 (Lévis), sous-district C (Saint-Romuald), division no 1,
            Tableau no 1 — Dénombrement des vivants. Recenseur : Olivier Lambert.
   Numérisation : 1881_D1_Vivants_Partie1/2/3.pdf (88 pages, 2187 personnes).
   Jour de référence du recensement : 4 avril 1881.

   POURQUOI UN FICHIER SÉPARÉ
   Les données de recensement-1881-d1-data.js sont le dépouillement de Patrick
   (noms, sexes, âges, professions, page, ligne). Ce fichier-ci n'y touche pas :
   il ajoute les colonnes du formulaire qui n'avaient pas encore été relevées.
   Chaque valeur est rattachée à une page et une ligne du manuscrit, donc
   vérifiable. Supprimer ce fichier laisse les données d'origine intactes.

   COLONNES DU FORMULAIRE DE 1881 (Tableau no 1)
    1 Bâtiments        6 Familles           11 Pays/Province de naissance  16 Allant à l'école
    2 Chantiers        7 Noms               12 Religion                    17 Sourds-muets
    3 Maisons en       8 Sexe               13 Origine                     18 Aveugles
      construction     9 Âge                14 Profession                  19 Aliénation mentale
    4 Maisons inhab.  10 Nés dans les       15 Marié ou en veuvage         20 Observations
    5 Maisons hab.       douze derniers mois

   À NOTER : le formulaire de 1881 ne comporte AUCUNE colonne d'alphabétisation
   (« sait lire » / « sait écrire ») ni de « marié dans les douze mois ».
   Ces questions figurent en 1871 et reviennent en 1891, mais pas en 1881.
   Il n'y a donc rien à dépouiller pour ces champs — ils sont hors formulaire.

   LECTURE DES MARQUES
   — (tiret)  : le recenseur a explicitement répondu « non »/« aucun »
   « (idem)   : reprend la valeur de la ligne précédente
   1 ou ✓     : réponse positive
   Les petits crochets collés au « M. » de la colonne 15 sont des marques de
   pointage du recenseur, pas des réponses à la colonne 16 — vérifié page 1,
   où les six enfants scolarisés portent un « 1 » nettement centré en colonne 16
   alors que les adultes mariés n'ont que le crochet accolé au M.

   FORMAT
   defauts  : valeurs dominantes, appliquées à toute ligne sans exception
   pages[n] : lignes     = nombre de lignes remplies au manuscrit
              decalage   = à ajouter au no de ligne du dépouillement pour
                           retrouver la ligne du manuscrit (voir page 4)
              ecole      = lignes du MANUSCRIT portant une marque en colonne 16
              ne12       = { ligne: "Mois" } colonne 10
              exceptions = { ligne: {champ: valeur} } colonnes 11-13
              remarques  = { ligne: "texte" } colonne 20
              incertain  = { ligne: "note" } lecture douteuse, à revoir
              manquant   = personnes présentes au manuscrit mais absentes du
                           dépouillement — signalées, JAMAIS ajoutées d'office
*/
window.COMPLEMENT_1881_D1 = {
  source: 'BAC — Recensement 1881, district 46 Lévis, sous-district C Saint-Romuald, division 1',
  recenseur: 'Olivier Lambert',
  transcrit_le: '2026-07-29',
  pages_totales: 88,
  pages_transcrites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
                      60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
                      78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88],

  /* Page 89 : blanche — la page 88 clôt le district de recensement. */

  /* LIMITE DES IMAGES DISPONIBLES
     Planches a01-a15 et b01-b08 : pages 1 à 45.
     Planches d09-d15 (extraites de "Pages de 1881_D2_vivants_partie2-23860f83.pdf",
     fichier déposé sous une étiquette D2 mais contenant en réalité la suite du
     manuscrit D1 — pages 46 à 59, deux pages par feuillet numérisé) : pages 46 à 59.
     Planches c01-c15 (extraites de 1881_D1_vivants_partie3.pdf) : pages 60 à 89.
     Toutes les pages du district (1-89) sont désormais numérisées dans le projet. */
  pages_images_disponibles: '1-89 (complet)',

  defauts: {
    lieu_naissance: 'Québec',
    religion: 'Catholique',
    origine: 'Française',
    sourd_muet: false,
    aveugle: false,
    aliene: false,
    ecole: false
  },

  /* Aucune infirmité (colonnes 17-19) n'est déclarée sur les pages 1 à 9 :
     le recenseur a tiré un trait sur chaque ligne. Les deux seules infirmités
     relevées jusqu'ici sont en colonne 19 : page 17 ligne 17 et page 29 ligne 10. */
  pages: {
    1: { lignes: 25, ecole: [5, 6, 7, 8, 9, 10, 24] },

    2: { lignes: 25, ecole: [23, 24], ne12: { 2: 'Mars', 7: 'Juillet' } },

    3: {
      lignes: 25, ecole: [15],
      exceptions: {
        5:  { lieu_naissance: 'Ontario', origine: 'Anglaise' },
        16: { lieu_naissance: 'Irlande', religion: 'Presbytérien', origine: 'Irlandaise' },
        17: { religion: 'Presbytérien', origine: 'Écossaise' },
        18: { religion: 'Presbytérien', origine: 'Irlandaise' },
        19: { religion: 'Catholique', origine: 'Écossaise' },
        20: { religion: 'Presbytérien', origine: 'Irlandaise' },
        21: { religion: 'Catholique', origine: 'Écossaise' },
        22: { religion: 'Catholique', origine: 'Écossaise' },
        23: { religion: 'Catholique', origine: 'Française' }
      },
      incertain: {
        7: 'Origine illisible — mot court barré ou repris, ni Française ni Irlandaise avec certitude',
        8: 'Origine illisible — semble commencer par « Fr » mais la fin est masquée',
        16: 'Le manuscrit écrit « Ireland » en anglais ; normalisé en « Irlande » pour rester cohérent avec la page 10.'
      }
    },

    /* PAGE 4 — DÉCALAGE D'UNE LIGNE
       Le manuscrit porte 25 lignes remplies, le dépouillement n'en a que 24.
       La ligne 1 du manuscrit (« Beaulieu Damase, M, 7 ans », fils de Damase 34
       et Odéline 33 de la page 3, maison 10 famille 14) n'a pas été relevée.
       Toutes les lignes suivantes du dépouillement sont donc en retard d'un cran
       sur le manuscrit : dépouillement l.1 = manuscrit l.2, etc.
       Les clés ci-dessous suivent le MANUSCRIT ; decalage rétablit la
       correspondance. Corriger l'oubli fera tomber decalage à 0. */
    4: {
      lignes: 25, decalage: 1,
      ecole: [1],
      ne12: { 4: 'Décembre', 22: 'Septembre' },
      exceptions: {
        18: { religion: 'Église anglicane', origine: 'Irlandaise' },
        19: { religion: 'Église anglicane', origine: 'Irlandaise' },
        20: { religion: 'Église anglicane', origine: 'Irlandaise' },
        21: { religion: 'Église anglicane', origine: 'Irlandaise' },
        22: { religion: 'Église anglicane', origine: 'Irlandaise' },
        23: { religion: 'Église anglicane', origine: 'Irlandaise' },
        24: { lieu_naissance: 'États-Unis' }
      },
      manquant: [
        { ligne: 1, nom: 'Beaulieu', prenom: 'Damase', sexe: 'M', age: '7',
          maison: '10', famille: '14', ecole: true,
          note: 'Présent au manuscrit, absent du dépouillement. Non ajouté — à valider par Patrick.' }
      ]
    },

    5: {
      lignes: 25, ecole: [11, 17],
      ne12: { 6: 'Novembre', 21: 'Novembre' },
      exceptions: {
        7: { religion: 'Église anglicane', origine: 'Irlandaise' },
        8: { religion: 'Église anglicane', origine: 'Irlandaise' }
      }
    },

    6: {
      lignes: 25, ecole: [8, 16, 17],
      exceptions: {
        14: { origine: 'Écossaise' },
        15: { origine: 'Écossaise' },
        16: { origine: 'Écossaise' },
        17: { origine: 'Écossaise' },
        23: { origine: 'Française' }
      },
      remarques: { 4: '4 avril — Olivier Lambert (jour de référence du recensement)' },
      incertain: { 23: 'Origine écrite « French » en anglais dans le manuscrit' }
    },

    7: {
      lignes: 25, ecole: [8, 9, 10, 18, 19, 22, 23, 24],
      exceptions: {
        12: { origine: 'Irlandaise' },
        13: { origine: 'Française' },
        14: { origine: 'Irlandaise' },
        15: { origine: 'Irlandaise' },
        16: { origine: 'Allemande' },
        17: { origine: 'Française' },
        18: { origine: 'Allemande' },
        19: { origine: 'Allemande' },
        20: { origine: 'Allemande' },
        21: { origine: 'Allemande' },
        22: { origine: 'Allemande' },
        23: { origine: 'Allemande' },
        24: { origine: 'Allemande' },
        25: { origine: 'Allemande' }
      }
    },

    /* Les Gauvin reviennent des États-Unis : la mère et les quatre aînés y sont
       nés, la cadette (2 ans) est née au Québec — le retour se situe donc vers
       1878-1879. L'origine déclarée passe d'« Anglaise » pour la mère à
       « Française » pour les enfants. */
    8: {
      lignes: 25, ecole: [6, 12, 13, 14],
      exceptions: {
        11: { lieu_naissance: 'États-Unis', origine: 'Anglaise' },
        12: { lieu_naissance: 'États-Unis' },
        13: { lieu_naissance: 'États-Unis' },
        14: { lieu_naissance: 'États-Unis' },
        15: { lieu_naissance: 'États-Unis' }
      },
      remarques: { 3: '5 avril — Olivier Lambert, recenseur' }
    },

    9: {
      lignes: 25, ecole: [2, 3, 15, 16, 17, 18, 19, 20],
      ne12: { 9: 'Juillet' },
      exceptions: { 22: { origine: 'Écossaise' } }
    },

    /* Maison 32 : les McCarthy sont nés en Irlande, les Wilson sont écossais.
       Maison 35 : deux enfants Giffard sont nés aux États-Unis alors que leurs
       parents sont nés au Québec — la famille y a séjourné vers 1872-1876
       (Adélore 9 ans et Zora 7 ans y naissent, Létitia 5 ans page 11 aussi,
       Odilon 3 ans est né au Québec : le retour se situe donc vers 1877-1878). */
    10: {
      lignes: 25, ecole: [7, 8, 9, 10, 19, 20, 24, 25],
      exceptions: {
        1:  { lieu_naissance: 'Irlande', origine: 'Irlandaise' },
        2:  { lieu_naissance: 'Irlande', origine: 'Irlandaise' },
        3:  { origine: 'Écossaise' },
        4:  { origine: 'Écossaise' },
        24: { lieu_naissance: 'États-Unis' },
        25: { lieu_naissance: 'États-Unis' }
      }
    },

    11: {
      lignes: 25, ecole: [1, 8, 23],
      ne12: { 11: 'Novembre', 16: 'Janvier' },
      exceptions: { 1: { lieu_naissance: 'États-Unis' } }
    },

    12: {
      lignes: 25, ecole: [5, 6, 7, 18, 19, 20],
      ne12: { 13: 'Décembre' },
      incertain: {
        11: "Âge : le manuscrit se lit « 6 », le dépouillement porte 40. Un seul chiffre est visible — à revoir sur l'original."
      }
    },

    /* Maison 45 : la famille Coran est irlandaise (Patrick Coran, forgeron,
       et sept enfants aux prénoms anglais). Alexandre Scott, commis, est le
       seul de ces pages à être né en Angleterre même. */
    13: {
      lignes: 25, ecole: [3, 4, 5, 13, 20],
      ne12: { 8: 'Mai', 16: 'Septembre', 25: 'Février' },
      exceptions: {
        1: { origine: 'Irlandaise' }, 2: { origine: 'Irlandaise' },
        3: { origine: 'Irlandaise' }, 4: { origine: 'Irlandaise' },
        5: { origine: 'Irlandaise' }, 6: { origine: 'Irlandaise' },
        7: { origine: 'Irlandaise' }, 8: { origine: 'Irlandaise' },
        18: { origine: 'Anglaise' },
        21: { lieu_naissance: 'Angleterre', origine: 'Anglaise' }
      }
    },

    /* Maison 50 : Sophy Cameron, marchande née en Écosse et presbytérienne,
       tient maison avec deux femmes épiscopaliennes d'origine écossaise —
       le seul foyer épiscopalien relevé jusqu'ici. */
    14: {
      lignes: 25, ecole: [8, 9, 21],
      ne12: { 14: 'Janvier' },
      exceptions: {
        2:  { lieu_naissance: 'Écosse', religion: 'Presbytérien', origine: 'Écossaise' },
        3:  { religion: 'Episcopalien', origine: 'Écossaise' },
        4:  { religion: 'Episcopalien', origine: 'Écossaise' },
        5:  { origine: 'Allemande' },
        7:  { origine: 'Allemande' },
        8:  { origine: 'Allemande' },
        9:  { origine: 'Allemande' },
        10: { origine: 'Allemande' }
      },
      incertain: {
        5: "Origine « Allemande » écrite nettement, alors que le patronyme relevé est Doran. À confronter au registre paroissial."
      }
    },

    15: {
      lignes: 25, ecole: [17, 18],
      ne12: { 13: 'Septembre', 21: 'Mars' }
    },

    /* Maison 59 : Henri Épenin, jardinier, est né en France, comme sa femme et
       ses trois filles — la première famille entièrement née en France du
       dépouillement. */
    16: {
      lignes: 25, ecole: [5, 6, 9, 10, 19, 20, 24, 25],
      exceptions: {
        21: { lieu_naissance: 'France' }, 22: { lieu_naissance: 'France' },
        23: { lieu_naissance: 'France' }, 24: { lieu_naissance: 'France' },
        25: { lieu_naissance: 'France' }
      }
    },

    /* Première infirmité déclarée du dépouillement : colonne 19, ligne 17.
       Les colonnes 17 à 19 sont barrées partout ailleurs, sauf page 29 ligne 10. */
    17: {
      lignes: 25, ecole: [7, 8, 9, 24],
      exceptions: { 17: { aliene: true } },
      remarques: { 13: '7 avril — Ol. Lambert, recenseur' }
    },

    /* Maison 65 : la communauté des Frères. Deux des cinq sont nés en France,
       les trois autres au Québec. */
    18: {
      lignes: 25, ecole: [25],
      exceptions: {
        6:  { lieu_naissance: 'France' },
        7:  { lieu_naissance: 'France' },
        10: { lieu_naissance: 'France' }
      }
    },

    19: {
      lignes: 25, ecole: [13, 14, 15, 21, 22, 25],
      ne12: { 8: 'Mars' }
    },

    20: { lignes: 25, ecole: [1, 2, 11] },

    21: { lignes: 25, ecole: [1, 2, 3, 11, 14, 19, 20] },

    /* Maison 82 : les Topping et les Morin déclarent une origine écossaise par
       les femmes (Cédulie Topping, Joséphine Morin, chapelière) alors que les
       enfants sont inscrits « Française » comme le père — le recenseur suit
       l'origine du père pour les enfants (même règle qu'à la page 27). */
    22: {
      lignes: 25, ecole: [8, 9],
      ne12: { 22: 'Avril', 25: 'Décembre' },
      exceptions: {
        5: { origine: 'Écossaise' },
        7: { origine: 'Écossaise' }
      }
    },

    23: {
      lignes: 25, ecole: [16, 19],
      ne12: { 9: 'Mars', 15: 'Août' },
      remarques: { 1: '8 avril — Ol. Lambert, énumérateur' },
      incertain: {
        15: "Âge en fraction de mois peu lisible (3/12 ou 9/12) alors que la colonne 10 porte « Août » ; un âge de 8/12 serait cohérent avec le 4 avril 1881."
      }
    },

    24: {
      lignes: 25, ecole: [9, 22, 25],
      ne12: { 4: 'Janvier', 12: 'Juillet', 15: 'Février' },
      remarques: { 22: 'Orpheline' }
    },

    25: {
      lignes: 25, ecole: [1, 10, 11, 16, 17],
      ne12: { 19: 'Juillet' }
    },

    26: {
      lignes: 25, ecole: [1, 8, 11, 22, 23, 24],
      ne12: { 17: 'Mai' }
    },

    /* Maison 126 : William McKaye, journalier d'origine irlandaise, a épousé une
       Française ; les quatre enfants sont tous inscrits « Irlandaise ». C'est la
       règle que suit le recenseur — l'origine passe par le père. */
    27: {
      lignes: 25, ecole: [4, 5, 21, 22, 23],
      ne12: { 18: 'Janvier' },
      exceptions: {
        14: { origine: 'Irlandaise' },
        16: { origine: 'Irlandaise' },
        17: { origine: 'Irlandaise' },
        18: { origine: 'Irlandaise' }
      },
      remarques: { 8: '10 avril — Ol. Lambert, énumérateur' }
    },

    28: {
      lignes: 25, ecole: [10, 21],
      ne12: { 3: 'Février' }
    },

    /* Deuxième infirmité déclarée du dépouillement : colonne 19, ligne 10.
       La page porte aussi la doyenne relevée jusqu'ici, Geneviève Bussière,
       92 ans, veuve, recensée seule à la ligne 22. */
    29: {
      lignes: 25, ecole: [2, 3, 4, 8, 13],
      exceptions: { 10: { aliene: true } },
      incertain: {
        9: "Patronyme du chef de famille 134 peu lisible : « Perrette » ou « Vezette », prénom Camille, femme de 30 ans veuve."
      }
    },

    30: {
      lignes: 25, ecole: [8],
      ne12: { 4: 'Août' }
    },

    /* Maison 122 : James Keley, charpentier irlandais de 60 ans, a épousé une
       Française ; maison 123 : Joseph Roberge, batelier, a épousé Mary Helen,
       irlandaise, et leur fille est inscrite « Française ». Dans les deux cas
       l'origine suit le père, jamais la mère. */
    31: {
      lignes: 25, ecole: [3, 11, 12, 20],
      exceptions: {
        21: { origine: 'Irlandaise' },
        24: { origine: 'Irlandaise' }
      },
      remarques: { 21: '9 avril — Ol. Lambert, énumérateur' }
    },

    /* Maison 149 : première paire de jumeaux du dépouillement — Émery et Georges
       Hébert, 15 ans, cordonniers comme leur père, réunis par une accolade que le
       recenseur annote « Jumeaux » en colonne 20. */
    32: {
      lignes: 25, ecole: [20, 25],
      ne12: { 14: 'Avril' },
      remarques: {
        18: 'Jumeaux (accolade avec la ligne 19)',
        19: 'Jumeaux (accolade avec la ligne 18)'
      },
      incertain: {
        24: "Profession écrite puis raturée (« Apprenti » ?) — illisible sous la rature."
      }
    },

    33: {
      lignes: 25, ecole: [1, 5, 6, 24, 25],
      ne12: { 17: 'Décembre' }
    },

    /* Maison 155 : deuxième paire de jumeaux — Olympe et Léontine Topping, 13 ans,
       accolade annotée « Jumelles ». Le père Léon Topping est d'origine écossaise,
       la mère Justine française, et les six enfants sont inscrits « Écossaise ». */
    34: {
      lignes: 25, ecole: [1, 5, 6, 7, 8],
      ne12: { 2: 'Juillet' },
      exceptions: {
        3: { origine: 'Écossaise' },
        5: { origine: 'Écossaise' },
        6: { origine: 'Écossaise' },
        7: { origine: 'Écossaise' },
        8: { origine: 'Écossaise' },
        9: { origine: 'Écossaise' }
      },
      remarques: {
        5: 'Jumelles (accolade avec la ligne 6)',
        6: 'Jumelles (accolade avec la ligne 5)'
      }
    },

    35: {
      lignes: 25, ecole: [3, 4, 11, 12, 13, 23, 24],
      ne12: { 18: 'Mars' },
      incertain: {
        11: "Arthur Gosselin, 15 ans, porte à la fois une profession (charpentier) et une marque en colonne 16 — apprenti fréquentant l'école, ou marque de pointage ?"
      }
    },

    /* Alexandre Campion, commis de 63 ans, est né en France ; il est recensé seul,
       rattaché à aucune famille numérotée. */
    36: {
      lignes: 25, ecole: [2, 3],
      ne12: { 6: 'Septembre' },
      exceptions: { 12: { lieu_naissance: 'France' } },
      remarques: { 7: '11 avril — Ol. Lambert, énumérateur' }
    },

    /* Maison 171 : les Foran rentrent des États-Unis, et très récemment. Les
       parents et l'aînée Victoria (18 ans) sont nés au Québec, mais les six
       suivants — de Mathilda (13 ans) à Joseph (1 an) — sont tous nés aux
       États-Unis : la famille y a vécu d'environ 1867 à 1880 et n'est revenue
       qu'à la veille du recensement. C'est le troisième retour des États-Unis
       du dépouillement, et le plus tardif. */
    37: {
      lignes: 25, ecole: [6, 7, 8, 9, 15, 16, 17, 18, 23, 24],
      exceptions: {
        15: { lieu_naissance: 'États-Unis' },
        16: { lieu_naissance: 'États-Unis' },
        17: { lieu_naissance: 'États-Unis' },
        18: { lieu_naissance: 'États-Unis' },
        19: { lieu_naissance: 'États-Unis' },
        20: { lieu_naissance: 'États-Unis' }
      },
      incertain: {
        2: "Colonne 20 : un mot au crayon en regard des lignes 2-3 (« Frère » ?) et un autre en regard de la ligne 5 (« Harriot » ? « Marriot » ?) — annotations postérieures, non transcrites."
      }
    },

    38: {
      lignes: 25, ecole: [8, 20, 21],
      ne12: { 5: 'Juillet', 11: 'Septembre' },
      exceptions: { 25: { origine: 'Écossaise' } }
    },

    /* Suite de la maison 177 : Moïse Topping (p. 38 l. 25) est écossais, sa femme
       Françoise française, et leurs deux filles sont inscrites « Écossaise ». */
    39: {
      lignes: 25, ecole: [9, 10],
      ne12: { 3: 'Février', 22: 'Janvier' },
      exceptions: {
        2: { origine: 'Écossaise' },
        3: { origine: 'Écossaise' }
      },
      incertain: {
        8: "Colonne 13 raturée puis laissée en blanc — origine illisible, supposée « Française » comme le reste de la famille."
      }
    },

    /* Maison 184 : quatrième retour des États-Unis. Léa (10 ans), Zoel (8) et
       Honoré (6) Tremblay y sont nés, Arthur (4) est né au Québec — la famille
       est donc rentrée vers 1876-1877. */
    40: {
      lignes: 25, ecole: [8, 9, 10, 16, 19, 20],
      exceptions: {
        5:  { origine: 'Écossaise' },
        8:  { lieu_naissance: 'États-Unis' },
        9:  { lieu_naissance: 'États-Unis' },
        10: { lieu_naissance: 'États-Unis' }
      },
      remarques: { 23: '12 avril — Ol. Lambert, énumérateur' }
    },

    /* Maison 191 : James Clauston, écossais, a épousé une Française ; leurs
       quatre enfants sont inscrits « Écossaise » — cinquième confirmation de la
       filiation paternelle de l'origine.
       Joseph Gosselin (maison 189) est libraire, métier unique du dépouillement. */
    41: {
      lignes: 25, ecole: [1, 2, 20, 24],
      ne12: { 9: 'Septembre', 14: 'Décembre' },
      exceptions: {
        15: { origine: 'Écossaise' },
        17: { origine: 'Écossaise' },
        18: { origine: 'Écossaise' },
        19: { origine: 'Écossaise' },
        20: { origine: 'Écossaise' }
      }
    },

    /* Troisième paire de jumeaux : Alphonzine et Caroline Brochu, 7 ans.
       Jean Hixe et Jean Petitbon, tous deux marins nés en France, logent
       ensemble sans famille numérotée. */
    42: {
      lignes: 25, ecole: [21, 22, 23],
      exceptions: {
        13: { lieu_naissance: 'France' },
        14: { lieu_naissance: 'France' }
      },
      remarques: {
        8: 'Jumelles (accolade avec la ligne 9)',
        9: 'Jumelles (accolade avec la ligne 8)'
      }
    },

    43: {
      lignes: 25, ecole: [3, 11, 24, 25],
      ne12: { 5: 'Août' }
    },

    /* Louis Couture, 42 ans, maison 202 : profession « Artiste » — la seule du
       dépouillement, dans une division où dominent journaliers et charpentiers. */
    44: {
      lignes: 25, ecole: [6, 7, 8, 24],
      ne12: { 15: 'Novembre' }
    },

    /* Quatrième paire de jumeaux, et la plus jeune du dépouillement : Amable et
       Philippe Grégoire, tous deux nés en mars 1881 — quelques semaines avant le
       passage du recenseur. Maison 208 : Delphine Martel est la seule personne
       d'origine « Anglaise » relevée jusqu'ici ; ses enfants sont « Française »
       comme leur père. */
    45: {
      lignes: 25, ecole: [17, 21, 22],
      ne12: { 4: 'Mars', 5: 'Mars' },
      exceptions: { 19: { origine: 'Anglaise' } },
      remarques: {
        4: 'Jumeaux (accolade avec la ligne 5)',
        5: 'Jumeaux (accolade avec la ligne 4)',
        18: '13 avril — Ol. Lambert, énumérateur'
      }
    },

    /* Page 46 : suite des jumeaux Grégoire (ligne 4-5, cf. remarque p.45) —
       rien à signaler ici, la remarque "Jumeaux" est inscrite sur la ligne 4
       de la page 45. Toutes les valeurs par défaut (Québec/Catholique/Française)
       se vérifient sans exception sur les 23 lignes de cette page. */
    46: { lignes: 23, ecole: [7, 8, 9] },

    /* Maison 187 : la famille Lockwell (Flore, 49 ans, chef de famille sans
       époux mentionné, avec Antoinette, Joseph, Arthur, Marie — et Léonard,
       qui continue à la ligne 1 de la page 48) est d'origine PORTUGAISE,
       une exception unique dans le dépouillement jusqu'ici (à rapprocher des
       marins français Hixe/Petitbon, p. 74-75 : autre trace de présence
       étrangère liée au port/chantier naval). */
    47: {
      lignes: 25, ecole: [],
      exceptions: {
        21: { origine: 'Portugaise' }, 22: { origine: 'Portugaise' },
        23: { origine: 'Portugaise' }, 24: { origine: 'Portugaise' },
        25: { origine: 'Portugaise' }
      },
      remarques: { 21: 'Famille Lockwell : origine Portugaise (suite ligne 1, p.48)' }
    },

    /* Maison 188 : John Bilkey, 45 ans, marchand de bois — protestant et
       d'origine ANGLAISE, seul exemple de ce couple religion/origine relevé
       jusqu'ici. Ses domestiques/pensionnaires Alice et William Lemaine
       restent Catholiques/Français (défaut). Ligne 1 : suite de la famille
       Lockwell (Léonard, 9 ans) — origine Portugaise, cf. page 47. */
    48: {
      lignes: 25, ecole: [5],
      exceptions: {
        1: { origine: 'Portugaise' },
        2: { religion: 'Protestant', origine: 'Anglaise' }
      },
      remarques: { 2: "Bilkey John, marchand de bois — Protestant, origine Anglaise (seule occurrence)" }
    },

    49: { lignes: 25, ecole: [8] },

    /* Maison 197 : William Findley, 40 ans, mécanicien, né en ÉCOSSE —
       Protestant, origine Écossaise. Son épouse Amélie (48) est
       Québec/Catholique/Française par elle-même ; leur fils William (10)
       reçoit l'origine Écossaise du père, conformément à la règle observée
       partout ailleurs dans ce dépouillement (attribution par le père seul).
       Alexina Dorey (5 ans), pensionnaire dans le ménage, reste Française. */
    50: {
      lignes: 25, ecole: [1],
      exceptions: {
        10: { lieu_naissance: 'Écosse', religion: 'Protestant', origine: 'Écossaise' },
        12: { origine: 'Écossaise' }
      },
      remarques: { 10: 'Findley William, mécanicien — né en Écosse, Protestant, origine Écossaise' }
    },

    51: { lignes: 25, ecole: [] },

    52: { lignes: 25, ecole: [7, 16, 17] },

    53: { lignes: 25, ecole: [], ne12: { 23: 'Juillet' } },

    /* Maison 214 : Stanislas Sirois — remarque manuscrite en colonne 20,
       ligne 13, mentionnant un départ pour les États-Unis le 15 août 1881
       (quatre mois après le jour de référence du recensement) : nouvelle
       occurrence du motif "retour/départ des États-Unis" déjà noté ailleurs
       dans ce district (à rapprocher des quatre familles US identifiées
       dans les pages 1-45/60-88). */
    54: {
      lignes: 25, ecole: [],
      remarques: { 13: "15 août 81 — États-Unis (départ noté après le recensement, lecture partielle)" },
      incertain: { 13: "Fin de la remarque difficile à lire au-delà de « 15 août 81 États-Unis »" }
    },

    55: { lignes: 25, ecole: [17, 18, 19] },

    56: { lignes: 25, ecole: [4] },

    /* Maison 225 : le chef de famille est OLIVIER LAMBERT lui-même, 36 ans,
       régisseur de moulin — l'énumérateur recense son propre ménage.
       Son fils Joseph Édouard (10 ans, ligne 23) est né en ONTARIO — seule
       exception au défaut Québec relevée sur ces 14 pages — alors que sa
       sœur M.Lucie (7 ans, ligne 24) est née au Québec : la famille s'est
       donc établie en Ontario puis est revenue au Québec entre ~1871 et 1874.
       La famille se poursuit à la page 58, lignes 1-2 (Marie Louise, Augusta). */
    57: {
      lignes: 25, ecole: [],
      exceptions: { 23: { lieu_naissance: 'Ontario' } },
      remarques: { 23: "Joseph Édouard Lambert, fils de l'énumérateur Olivier Lambert, né en Ontario" }
    },

    /* Lignes 1-2 : suite du ménage de l'énumérateur Olivier Lambert (cf. p.57) —
       Marie Louise (5 ans) et Augusta (7/12, née en septembre). */
    58: { lignes: 25, ecole: [], ne12: { 2: 'Septembre' } },

    59: { lignes: 25, ecole: [20] },

    /* Maison 234 : trois veufs sous le même toit (Édouard Guay 28 ans commis,
       Louis Guay 58, Marie Léonard 66) plus Marie Loiselle, 80 ans. */
    60: { lignes: 25, ecole: [2, 3, 23] },

    /* François Larose, 84 ans, et sa femme Angélique, 76 ans (maison 279) :
       le couple le plus âgé relevé jusqu'ici. */
    61: { lignes: 25, ecole: [21] },

    62: {
      lignes: 25, ecole: [12, 15, 22],
      incertain: {
        12: "Théodore Lacasse, 15 ans, porte une profession (journalier) ET une marque en colonne 16 — même ambiguïté qu'à la page 35 ligne 11."
      }
    },

    63: { lignes: 25, ecole: [8, 9, 13, 18, 25] },

    /* Marc Lacombe, 96 ans, veuf, recensé seul à la dernière ligne : le plus
       grand âge du dépouillement, devant Geneviève Bussière (92 ans, p. 29). */
    64: {
      lignes: 25, ecole: [10, 11, 12, 23, 24],
      ne12: { 6: 'Octobre' },
      remarques: { 19: '14 avril — Ol. Lambert, énumérateur' },
      incertain: {
        25: "Âge lu « 96 » pour Marc Lacombe — à confirmer (96 ou 46 ?). Un long trait diagonal traverse les colonnes 18-19 sur les lignes 24-25 : probable trait de plume, pas une infirmité déclarée."
      }
    },

    /* Maison 295 : John Doherty, 78 ans, né en Irlande et toujours journalier,
       avec sa femme Catherine née en Irlande ; leurs deux filles sont nées au
       Québec mais déclarées d'origine irlandaise — la règle du père, encore. */
    65: {
      lignes: 25, ecole: [4, 9, 10, 24, 25],
      ne12: { 6: 'Février', 13: 'Février' },
      exceptions: {
        14: { lieu_naissance: 'Irlande', origine: 'Irlandaise' },
        15: { lieu_naissance: 'Irlande', origine: 'Irlandaise' },
        16: { origine: 'Irlandaise' },
        17: { origine: 'Irlandaise' }
      }
    },

    /* PAGE DE 24 LIGNES (la 25e est laissée blanche, le recenseur ferme la page
       par un trait ondulé).
       Maison 299 : William H. Comming, commis, anglican et d'origine anglaise, a
       épousé Éléonore, catholique et française. Les cinq enfants sont inscrits
       anglicans ET d'origine anglaise : ici la RELIGION aussi suit le père, pas
       seulement l'origine. Premier cas du dépouillement.
       Marie Gobeille, 80 ans, est recensée seule dans la maison des Carrier. */
    66: {
      lignes: 24, ecole: [1, 11, 12, 13],
      ne12: { 23: 'Août' },
      exceptions: {
        18: { religion: 'Église anglicane', origine: 'Anglaise' },
        20: { religion: 'Église anglicane', origine: 'Anglaise' },
        21: { religion: 'Église anglicane', origine: 'Anglaise' },
        22: { religion: 'Église anglicane', origine: 'Anglaise' },
        23: { religion: 'Église anglicane', origine: 'Anglaise' }
      }
    },

    /* Maison 301 : Joseph Sample, hôtelier d'origine anglaise, marié à Margaret
       d'origine irlandaise ; leur fils William, 21 ans, cultivateur, est déclaré
       anglais. Bridgit, 84 ans, née en Irlande, vit sous le même toit.
       Maria Ménard, 14 ans, née aux États-Unis, est recensée seule chez les
       Latouche — cinquième trace de migration vers les États-Unis. */
    67: {
      lignes: 25, ecole: [5, 15, 19, 20, 21],
      exceptions: {
        9:  { origine: 'Anglaise' },
        10: { origine: 'Irlandaise' },
        11: { origine: 'Anglaise' },
        12: { lieu_naissance: 'Irlande', origine: 'Irlandaise' },
        15: { lieu_naissance: 'États-Unis' }
      }
    },

    /* Maison 306 : neuf Vermette adultes sous un même toit, six d'entre eux
       journaliers — le plus gros regroupement de travailleurs adultes relevé. */
    68: {
      lignes: 25, ecole: [4, 21, 22],
      ne12: { 10: 'Juin', 25: 'Août' }
    },

    /* Abel Maire, 26 ans, « Chaloupier » : premier métier de construction de
       chaloupes du dépouillement — écho direct des chantiers de l'anse. */
    69: {
      lignes: 25, ecole: [4, 11, 12],
      ne12: { 8: 'Mai', 15: 'Avril' },
      remarques: { 21: '15 avril — Ol. Lambert, énumérateur' },
      incertain: {
        9: "Profession du chef de famille 309 illisible (mot d'une dizaine de lettres, ni journalier ni charpentier)."
      }
    },

    /* Ernest Forcade, 13 ans, né aux États-Unis, dans un ménage tenu par une
       veuve : sixième trace de migration américaine. */
    70: {
      lignes: 25, ecole: [1, 10, 25],
      ne12: { 22: 'Novembre' },
      exceptions: { 10: { lieu_naissance: 'États-Unis' } },
      incertain: {
        6: "Napoléon Forcade, 25 ans, journalier : marque pâle en colonne 16 — écartée du relevé (âge et profession incompatibles avec la fréquentation scolaire)."
      }
    },

    /* Deux mariages mixtes de plus, même règle : Rose Délima Leclerc est
       d'origine anglaise et Margaret Hamel irlandaise, mais tous leurs enfants
       sont inscrits « Française » comme leur père.
       J. Baptiste Hamel, 79 ans, et Séraphine, 73 ans, vivent chez leur fils. */
    71: {
      lignes: 25, ecole: [1, 6, 17, 21, 22, 23],
      exceptions: {
        5: { origine: 'Anglaise' },
        9: { origine: 'Irlandaise' }
      }
    },

    /* PAGE CLÉ DU DÉPOUILLEMENT — MAISON 322, LES HAMILTON
       L. H. Hamilton, 40 ans, est le seul « Manufacturier » du dépouillement :
       né aux États-Unis, protestant, d'origine américaine, avec une femme
       américaine du même âge. Leurs deux aînés (17 et 14 ans) sont nés en
       ANGLETERRE et le cadet (5 ans) au Québec : la famille a donc suivi
       l'industrie États-Unis → Angleterre → Saint-Romuald, et n'est ici que
       depuis 1876 environ. Une veuve américaine de 66 ans vit avec eux.
       C'est la seule famille du recensement dont les trois colonnes 11-12-13
       sortent entièrement du cadre canadien-français.
       Pierre Cauchon, 23 ans, est « Marchand de bois » — l'autre métier du
       commerce du bois de l'anse. */
    72: {
      lignes: 25, ecole: [7, 8, 15, 16, 21, 22, 23, 24],
      exceptions: {
        5:  { lieu_naissance: 'États-Unis', religion: 'Protestant', origine: 'Américaine' },
        6:  { lieu_naissance: 'États-Unis', religion: 'Protestant', origine: 'Américaine' },
        7:  { lieu_naissance: 'Angleterre', religion: 'Protestant', origine: 'Américaine' },
        8:  { lieu_naissance: 'Angleterre', religion: 'Protestant', origine: 'Américaine' },
        9:  { religion: 'Protestant', origine: 'Américaine' },
        10: { lieu_naissance: 'États-Unis', religion: 'Protestant', origine: 'Américaine' },
        25: { lieu_naissance: 'Angleterre', origine: 'Anglaise' }
      },
      incertain: {
        25: "Religion de Thomas Watts (né en Angleterre) illisible — abréviation de trois ou quatre lettres, probablement « Prot. »."
      }
    },

    /* Ferdinand Villeneuve, 49 ans, maison 327 : ARCHITECTE — profession unique
       du dépouillement.
       Suite de la maison 325 : Thomas Watts est né en Angleterre, sa femme Marie
       Louise est québécoise et catholique. Leurs enfants sont inscrits d'origine
       ANGLAISE (comme le père) mais CATHOLIQUES (comme la mère) — l'inverse du
       partage observé chez les Comming à la page 66. Le recenseur ne suit donc
       pas une règle unique pour la religion : c'est la confession pratiquée qui
       est notée, tandis que l'origine reste patrilinéaire sans exception. */
    73: {
      lignes: 25, ecole: [7, 15, 16, 17, 18],
      exceptions: {
        2: { origine: 'Anglaise' },
        3: { origine: 'Anglaise' },
        4: { origine: 'Anglaise' }
      }
    },

    /* Maison 333 : James Moore, 61 ans, né en Irlande. Sa profession est la
       SEULE du dépouillement écrite en anglais — « Labourer » au lieu de
       « Journalier ». Sa femme Catherine a 70 ans ; deux jeunes Maher, aussi
       d'origine irlandaise, vivent sous le même toit. */
    74: {
      lignes: 25, ecole: [10],
      exceptions: {
        17: { lieu_naissance: 'Irlande', origine: 'Irlandaise' },
        18: { lieu_naissance: 'Irlande', origine: 'Irlandaise' },
        19: { lieu_naissance: 'Irlande', origine: 'Irlandaise' },
        21: { origine: 'Irlandaise' },
        22: { origine: 'Irlandaise' }
      },
      remarques: { 17: '20 avril — Ol. Lambert, énumérateur' }
    },

    /* Geneviève Duval, 95 ans, veuve : deuxième nonagénaire du dépouillement,
       après Marc Lacombe (96 ans, p. 64).
       J. Baptiste Daigle, maison 336, est « Polisseur » — métier unique. */
    75: {
      lignes: 25, ecole: [7, 13, 14, 18],
      ne12: { 11: 'Janvier' }
    },

    /* Maison 342 : trois couturières sous le même toit — Olive Carrier (34 ans,
       chef de famille), Marie (19) et Lydia (17). Le seul ménage du
       dépouillement dont tous les revenus déclarés sont féminins. */
    76: {
      lignes: 25, ecole: [8, 9, 10, 25],
      ne12: { 1: 'Février' }
    },

    /* Maison 343 : James Thomson, journalier catholique d'origine écossaise,
       marié à une Française ; leurs HUIT enfants sont tous inscrits
       « Écossaise » — la plus grande famille d'origine écossaise du
       dépouillement, et la sixième confirmation de la filiation paternelle. */
    77: {
      lignes: 25, ecole: [6, 7, 13, 14, 15, 18],
      exceptions: {
        1:  { origine: 'Écossaise' },
        3:  { origine: 'Écossaise' },
        4:  { origine: 'Écossaise' },
        5:  { origine: 'Écossaise' },
        6:  { origine: 'Écossaise' },
        7:  { origine: 'Écossaise' },
        8:  { origine: 'Écossaise' },
        9:  { origine: 'Écossaise' },
        10: { origine: 'Écossaise' }
      }
    },

    /* François Fecteau, 80 ans, est encore déclaré journalier (maison 349) :
       le plus âgé des travailleurs actifs du dépouillement.
       Joseph Boutin, 63 ans, est « Cultivateur » — deuxième du dépouillement,
       après William Sample (p. 67), dans une division presque entièrement
       ouvrière. */
    78: { lignes: 25, ecole: [3, 4, 16, 17] },

    /* Marceline Aubert, 81 ans, veuve, recensée chez les Edmond.
       À noter : une seule marque scolaire sur toute la page, alors que la maison
       355 (Fecteau) compte des enfants de 7, 9 et 14 ans. Le contraste avec les
       pages voisines est net et mérite vérification sur l'original. */
    79: {
      lignes: 25, ecole: [19],
      remarques: { 17: '21 avril — Ol. Lambert, énumérateur' }
    },

    /* PAGE DES NOTABLES ET DE LA CINQUIÈME PAIRE DE JUMEAUX
       Maison 361 : Julie et Émélie Boucher, 20 ans, accolade « Jumelles » — la
       paire la plus âgée relevée jusqu'ici.
       Maison 362 : P. Sax, 60 ans, PRÊTRE d'origine allemande — le seul prêtre du
       dépouillement — avec George Sax, 54 ans, déclaré « Bourgeois », et deux
       domestiques françaises.
       Maison 363 : Joseph Hector Desroches, 61 ans, « Huissier C.S. » (Cour
       supérieure) — premier officier de justice relevé. */
    80: {
      lignes: 25, ecole: [3, 11],
      exceptions: {
        18: { origine: 'Allemande' },
        19: { origine: 'Allemande' }
      },
      remarques: {
        15: 'Jumelles (accolade avec la ligne 16)',
        16: 'Jumelles (accolade avec la ligne 15)'
      }
    },

    /* SIXIÈME PAIRE DE JUMEAUX, la plus âgée du dépouillement : William et Thomas
       Clauston, 22 ans, tous deux journaliers, accolade « Jumeaux ».
       Maison 365 : deuxième foyer Clauston de la division (voir p. 41, maison
       191) — Johnny Clauston, 56 ans, écossais, marié à une Française, cinq fils
       tous inscrits « Écossaise ». */
    81: {
      lignes: 25, ecole: [5, 6, 16],
      exceptions: {
        10: { origine: 'Écossaise' },
        12: { origine: 'Écossaise' },
        13: { origine: 'Écossaise' },
        14: { origine: 'Écossaise' },
        15: { origine: 'Écossaise' },
        16: { origine: 'Écossaise' }
      },
      remarques: {
        13: 'Jumeaux (accolade avec la ligne 14)',
        14: 'Jumeaux (accolade avec la ligne 13)'
      }
    },

    /* Maison 366 : Adèle Talbot, 45 ans, veuve, chef de famille avec quatre
       enfants — profession déclarée « Cultivatrice » (forme féminine unique du
       dépouillement, à côté de « Couturière »).
       Suite des Clauston : Robert, 19 ans, fils de Johnny (p. 81), toujours
       inscrit « Écossaise ». */
    82: {
      lignes: 25, ecole: [7, 8, 15, 16],
      exceptions: { 2: { origine: 'Écossaise' } },
      ne12: { 20: 'Mars' }
    },

    /* Dernière page complète de la division : Michel Bilodeau, 71 ans,
       « Retraité » — seule mention de retraite du dépouillement (à distinguer
       de « Rentier », plus fréquent chez les propriétaires âgés).
       Maison 370 clôt la division au bas de la page. */
    83: {
      lignes: 25, ecole: [3, 4, 11],
      ne12: { 9: 'Mai' },
      remarques: { 21: '22 avril — Ol. Lambert, énumérateur' }
    },

    /* Numéros de maison partiellement coupés par le cadrage du scan (seuls les
       deux derniers chiffres sont sûrs : ..84 à ..89) ; à confirmer sur
       l'original, la centaine est déduite de la suite (365 à la p. 81). */
    84: {
      lignes: 25, ecole: [14, 15, 16, 21, 22, 23],
      ne12: { 4: 'Juillet' },
      incertain: {
        1: "Numéros de maison coupés en marge (..84 à ..89 lisibles, centaine supposée 3xx par suite logique)."
      }
    },

    /* Maison ..86 : Moses Munns, 81 ans, né en Irlande, Église anglicane,
       d'origine irlandaise — recensé seul, jardinier, « veuf ».
       Maison ..89 : communauté religieuse — Soeur Des Séraphins (supérieure,
       44 ans), Soeur Sainte-Claris(s)e (40 ans, origine ANGLAISE) et Soeur
       Sainte-Eusèbe (36 ans, origine française) : au sein même de la
       communauté des origines différentes, chacune énumérée pour elle-même
       plutôt que rattachée à un chef de famille. */
    85: {
      lignes: 25, ecole: [6, 7],
      ne12: { 17: 'Janvier' },
      exceptions: {
        14: { lieu_naissance: 'Irlande', religion: 'Église anglicane', origine: 'Irlandaise' },
        23: { origine: 'Anglaise' }
      },
      remarques: { 23: '23 avril — Ol. Lambert, énumérateur' }
    },

    /* MAISON RELIGIEUSE (suite) — sept religieuses supplémentaires poursuivent le
       ménage commencé en bas de la page 85 (Soeur Des Séraphins et consoeurs) :
       en tout DIX religieuses recensées dans cette maison sur les deux pages,
       chacune sous son propre nom de religion, toutes nées au Québec.
       Puis maisons ..90 à ..93 : Landry Magloire (40) et sa famille de sept
       enfants ; Piché Léon (37) et famille ; Lemieux François (28) avec
       Pierre Côté (34) logé comme domestique ; Bouchard Ludger (35) amorce la
       maison suivante. */
    86: {
      lignes: 25, ecole: [12, 13, 18, 19],
      incertain: {
        1: "Noms de religion des sept religieuses difficiles à déchiffrer précisément (ex. « Sainte Prophère », « Sainte Angilbert ») — lecture approximative.",
        9: "Prénom de l'épouse de Landry Magloire incertain (« Euchère » ou proche).",
        11: "Professions inscrites en colonne 14 vers le milieu de la page (Médecin, Tailleur, Notaire semblent y figurer) n'ont pas pu être alignées avec sûreté sur les bonnes lignes — non transcrites individuellement."
      }
    },

    /* Maison ..93 (suite) : Ludger Bouchard, Louise son épouse, leur fils Ludger
       (9 ans).
       Maison ..96 : Marcelin(e) Morneau, FEMME de 52 ans chef de famille
       (veuve), avec cinq enfants adultes — Alexis 32, Flavie 22, Télesphore 20,
       Narcisse 17, Frédéline 14 — rare ménage entièrement dirigé par une femme
       parmi des enfants déjà adultes. */
    87: {
      lignes: 25, ecole: [2, 5, 8, 9, 18],
      incertain: {
        6: "Prénom du fils Bouchard/Savard à la ligne 6 lu « Térène » ou « Kéréné », sexe noté masculin.",
        9: "Prénom lu « Emcède » ou « Émide » — incertain."
      }
    },

    /* DERNIÈRE PAGE DU DISTRICT (la page 89 est blanche).
       Maison finale : Emilie Girard, 53 ans, veuve, chef de famille avec huit
       enfants de 29 à 2 ans — Joseph, Paul, Belzimir, François, Alzida,
       Wiggime(?), Isaï, Délia (cette dernière notée « Roger Délia », fille
       adoptée ou d'un premier lit ?). Puis Henry Atkinson, 48 ans,
       « Marchand de bois », Église anglicane, origine anglaise, avec sa femme
       Sélina et cinq enfants (W. Frederic, Sélina, Henry, Ethel, Donald) —
       dernier ménage du recensement, et dernier marchand de bois de
       l'anse relevé dans ce dépouillement. Le folio se referme sur les
       totaux du recenseur (encerclés : 16, 9-9) et la mention « 26 avril —
       O. Lambert, énumérateur ». */
    88: {
      lignes: 20,
      exceptions: {
        11: { religion: 'Église anglicane', origine: 'Anglaise' },
        12: { religion: 'Église anglicane', origine: 'Anglaise' },
        13: { religion: 'Église anglicane', origine: 'Anglaise' },
        14: { religion: 'Église anglicane', origine: 'Anglaise' },
        15: { religion: 'Église anglicane', origine: 'Anglaise' },
        16: { religion: 'Église anglicane', origine: 'Anglaise' }
      },
      remarques: { 10: '26 avril — Ol. Lambert, énumérateur (dernière page du district)' },
      incertain: {
        7: "Prénom lu « Wiggime » — incertain.",
        9: "« Roger Délia », 2 ans : lien avec la famille Girard non précisé par le recenseur (fille du premier lit, adoptée, ou pupille ?)."
      }
    }
  },

  /* Écarts entre le manuscrit et le dépouillement, relevés au passage.
     Rien n'est corrigé d'office : à trancher par Patrick, qui connaît
     l'écriture du recenseur et les familles. */
  ecarts: [
    { page: 3, ligne: 9,  champ: 'nom', depouillement: 'Pauldrfabri',
      lecture: 'Mullet Fabri / Bould Fabri — début du patronyme peu lisible' },
    { page: 3, ligne: 16, champ: 'nom', depouillement: 'Quirket',
      lecture: 'McQuilket — le préfixe Mc semble présent' },
    { page: 4, ligne: 10, champ: 'prenom', depouillement: 'Marie (sexe M)',
      lecture: 'Xavier — cohérent avec le sexe masculin indiqué' },
    { page: 4, ligne: 23, champ: 'nom', depouillement: 'Hazel Cantlie',
      lecture: 'Cambell Harriet — nom raturé puis réécrit au manuscrit' },
    { page: 6, ligne: 6,  champ: 'age', depouillement: '46', lecture: '40' },
    { page: 6, ligne: 22, champ: 'age', depouillement: '37', lecture: '27' },
    { page: 9, ligne: 10, champ: 'age', depouillement: '67', lecture: '69' },
    { page: 12, ligne: 11, champ: 'age', depouillement: '40', lecture: '6 — un seul chiffre lisible' },
    { page: 14, ligne: 11, champ: 'profession', depouillement: 'Boulanger',
      lecture: 'mot court commençant par « Not » — Notaire ? à revoir' }
  ],

  /* Limite de méthode, à connaître avant de se fier à la colonne « école ».
     En colonne 15, le recenseur accole au « M. » ou au « V° » une petite marque
     de pointage qui déborde sur la colonne 16. Sur les lignes portant un état
     matrimonial, une marque isolée n'est donc pas une réponse fiable. Seules
     les marques nettement centrées en colonne 16, sur des lignes sans état
     matrimonial, ont été retenues comme « allant à l'école ». Le relevé est
     donc prudent : il peut manquer des écoliers, il n'en invente pas. */
  reserve_ecole: true
};
