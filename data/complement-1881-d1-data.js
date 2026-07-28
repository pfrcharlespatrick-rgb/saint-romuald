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
  transcrit_le: '2026-07-28',
  pages_totales: 88,
  pages_transcrites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],

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
     le recenseur a tiré un trait sur chaque ligne. */
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
       Les colonnes 17 à 19 sont barrées partout ailleurs sur les pages 1 à 21. */
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

    21: { lignes: 25, ecole: [1, 2, 3, 11, 14, 19, 20] }
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
