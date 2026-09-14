// Couche « lieux » du site — voir docs/LIEUX.md.
// Amorcé par outils/lieux/amorcer.mjs, tenu à jour par l'atelier de la carte
// (carte.html, mode Atelier) puis outils/lieux/fondre.mjs.
window.LIEUX = {
  "format": "lieux-saint-romuald",
  "version": 1,
  "mis_a_jour": "2026-09-14",
  "note": "Couche « lieux » : un emplacement au sol, sa position, son état, et les maisons de recensement qui y ont été recensées année par année. Ne remplace jamais data/bussiere1990-data.js, qui reste la source publiée : un lieu portant source_ref hérite du titre, des personnages et du résumé de la brochure, et n'y ajoute que ce que le chercheur établit. Voir docs/LIEUX.md.",
  "lieux": [
    {
      "id": "1506-cf",
      "nom": "La maison Malakoff",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1506, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1866-1868",
      "disparu": "",
      "coord": {
        "lat": 46.746522,
        "lon": -71.263752,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:1506-cf",
      "personnages": "Louis-Hubert Roberge, navigateur et maître charpentier",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "Cette habitation fut construite entre 1866 et 1868 par Louis-Hubert Roberge, navigateur et maître charpentier. D’esprit québécois, la Maison Malakoff se distingue par la qualité de l’ornementation accrochée au support de la galerie. Connues sous le nom de serpents scandinaves, ces figures étaient à l’origine utilisées pour éloigner les mauvais esprits.\nLa maison Malakoff doit son nom au cap qui surplombe New Liverpool depuis la côte Rouge. D’origine russe, ce toponyme provient d’un port protégé, sur la côte de Crimée, par une série de redoutes dont la tour Malakoff. "
        }
      ],
      "occupations": [
        {
          "annee": "1871",
          "division": "2",
          "no_maison": "51",
          "statut": "confirme",
          "confiance": "moyenne",
          "origine": "source",
          "motif": "Hubert Roberge, 54 a., navigateur — trois Hubert Roberge navigateurs coexistent (maisons 41, 51, 76)",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1881",
          "division": "2",
          "no_maison": "147",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Hubert Roberge, 63 a., Journalier — suivi depuis 1871 (division 2, maison 51) ; âge cohérent à 1 an près ; 6 personnes du même ménage retrouvées : Hubert Roberge, Elisabeth Roberge, Louis Roberge, James Roberge, Eusèbe Roberge, Eugénie Roberge",
          "ajoute_le": "2026-09-13"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "1596-cf",
      "nom": "Le magasin général McReady",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1596, chemin du Fleuve",
      "designe_aujourdhui": "Résidence privée",
      "etat": "debout",
      "construit": "v. 1860",
      "disparu": "",
      "coord": {
        "lat": 46.747889,
        "lon": -71.259757,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "Famille McReady — Robert MacReady, marchand, puis sa veuve Éléonore ; le magasin général de la famille",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-14",
          "texte": "La maison se tient au coin du chemin du Fleuve et de la rue Saint-Vincent, à l'emplacement du 1596, chemin du Fleuve d'aujourd'hui. C'est l'adresse que porte désormais ce lieu ; le 1588, que donnait la notice du 83, rue Saint-Damase, est conservé parmi les adresses anciennes.\n\nRobert MacReady y tient le magasin général aux recensements de 1871 et 1881. À sa mort, sa veuve Éléonore ne déménage pas : elle reprend le commerce et y est recensée marchande en 1891, avec neuf de leurs enfants.\n\nLa position n'est pas relevée. La rue Saint-Vincent ne figure dans aucune donnée du dépôt, et le point n'est qu'une interpolation entre le 1506 et le 1604 au prorata du numéro civique : il reste à poser sur le coin même, à l'atelier de la carte."
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-14",
          "texte": "Le bâtiment est toujours debout, mais modifié : ce n'est donc pas une reconstruction sur le terrain de l'ancien, et le 1596 d'aujourd'hui désigne bien la maison où les McReady tenaient leur magasin. La nature et la date des transformations restent à établir."
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-14",
          "texte": "À l'origine, le lot abritait la résidence privée de Robert MacReady. sur le plan Goad nous voyons une maison en brique un peu plus grande que celle de McKensy.  Détruite lors d'un incendie, la demeure a fait place à un magasin général qu'il a fait construire et dont sa veuve a ensuite pris la relève. Dans les années 1950, le bâtiment a été transformé en école, pour finalement boucler la boucle et redevenir la résidence privée qu'il est aujourd'hui."
        }
      ],
      "occupations": [
        {
          "annee": "1871",
          "division": "2",
          "no_maison": "75",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Robert Macready, 39 a., marchand, avec Éléonore (31 a.), six enfants, une commis et une domestique — la maison du marchand McReady, d'après Patrick Blanchet.",
          "ajoute_le": "2026-09-13"
        },
        {
          "annee": "1881",
          "division": "2",
          "no_maison": "71",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Robert McCready, 50 a., marchand, avec Éléonore (46 a.) et neuf enfants — le même ménage qu'en 1871, sous la graphie « McCready ».",
          "ajoute_le": "2026-09-13"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "504",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Éléonore McReady, 56 a., MARCHANDE et chef de ménage, avec neuf enfants dont les âges répondent un à un à ceux de 1881 (Michel 21→31, Mary Jane 19→28, Emélie 16→25, Pierre 13→22, Éléonore 11→20, Emma 7→16, Alice 2→11). Robert est mort entre les deux recensements et sa veuve a continué le commerce — dans la même maison, établi par Patrick Blanchet le 14 septembre 2026.",
          "ajoute_le": "2026-09-13"
        }
      ],
      "adresses_anciennes": [
        "1588, chemin du Fleuve"
      ],
      "cadastre": {
        "goad_feuillet": "14",
        "goad_no": "35"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "1604-cf",
      "nom": "Maison d'Albert Forcade",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1604, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "v.1847",
      "disparu": "",
      "coord": {
        "lat": 46.748124,
        "lon": -71.259385,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:1604-cf",
      "personnages": "Albert Forcade, navigateur (magasin général et bureau de poste, 1870-1892) ; famille Charest (« Victoria Magasin »), Auxilia Charest (jusqu'à la fin des années 1970)",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-14",
          "texte": "maison en bois"
        }
      ],
      "occupations": [
        {
          "annee": "1871",
          "division": "2",
          "no_maison": "43",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Albert Forcade, 32 a., menuisier — seul Albert Forcade adulte du secteur",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1881",
          "division": "2",
          "no_maison": "70",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Albert Forcade, 42 a., Marchand — suivi depuis 1871 (division 2, maison 43) ; âge cohérent à 0 an près ; 2 personnes du même ménage retrouvées : Albert Forcade, Rosalie Forcade",
          "ajoute_le": "2026-09-13"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "509",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Albert Forcade, 50 a., avec Rosalie (50 a.) — même couple qu'en 1871",
          "ajoute_le": "2026-08-10"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "14",
        "goad_no": "33"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "1633-cf",
      "nom": "Maison de Joseph Mc Kenzie",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1633, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "v.1870",
      "disparu": "",
      "coord": {
        "lat": 46.74897,
        "lon": -71.258205,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:1633-cf",
      "personnages": "Joseph Mc Kenzie ; puis les frères Cadoret",
      "resume": "",
      "notes": [],
      "occupations": [
        {
          "annee": "1871",
          "division": "2",
          "no_maison": "131",
          "statut": "propose",
          "confiance": "moyenne",
          "origine": "source",
          "motif": "Ménage McKenzie : John McKenzie, ship chandler, et son fils Joseph (8 a.) — l'attribution à « Joseph » reste à vérifier",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1881",
          "division": "2",
          "no_maison": "103",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Augustin Joncas, 59 a., Journalier — suivi depuis 1871 (division 2, maison 131) ; âge cohérent à 1 an près ; 2 personnes du même ménage retrouvées : Augustin Joncas, Raphaël Joncas",
          "ajoute_le": "2026-09-13"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "513",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Raphael Joncas, 40 a., débardeur, chef de son propre ménage — fils d'Augustin, il tenait déjà en 1881 la seconde famille de la maison 103. Il a désormais sept enfants et sa tante Marie Roberge sous son toit. Son âge déclaré avance de trois ans sur la décennie ; qu'il soit resté sous le toit paternel plutôt que d'avoir déménagé reste à établir.",
          "ajoute_le": "2026-09-13"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "1719-1720-cf",
      "nom": "Vestiges de l'industrie du bois",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1719 et 1720, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "v.1850",
      "disparu": "",
      "coord": {
        "lat": 46.750341,
        "lon": -71.253735,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:1719-1720-cf",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "1720-chemin-du-fleuve",
      "nom": "1720, chemin du Fleuve",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1720, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "v.1850",
      "disparu": "",
      "coord": {
        "lat": 46.749819,
        "lon": -71.253564,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "SHSR",
      "personnages": "",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "Construite en pièce sur pièce vers 1850, cette maison a évolué au fil du temps, cependant, son plan rectangulaire d’origine est toujours manifeste.\n\n\n​D’inspiration québécoise, elle se caractérise par la symétrie des éléments architecturaux : une porte centrale, nombre pair de fenêtres, trois lucarnes à l’étage et une galerie le long de la façade. Suite aux derniers travaux de rénovation, une annexe s’est ajoutée du côté droit de la maison.\n\n\nÀ l’intérieur, les boiseries et rampes d’escalier ouvragées nous laissent croire qu’il s’agit d’une maison appartenant à l’un des prospères marchands de bois.\n\n​Cette résidence ainsi que la maison de la douane et la petite maison de l’autre côté de la rue représentent les derniers témoins de l’industrie du bois et de la construction navale au 19e siècle à Saint-Romuald.\n\n"
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "https://www.histoiresaintromuald.com/post/maison-de-l-anse\n"
        }
      ],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "1736-cf",
      "nom": "La maison de la douane de mer",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1736, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "v.1850",
      "disparu": "",
      "coord": {
        "lat": 46.750036,
        "lon": -71.252673,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:1736-cf",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "1871-cf",
      "nom": "Maison Benson",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1871, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1878",
      "disparu": "",
      "coord": {
        "lat": 46.754387,
        "lon": -71.249041,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:1871-cf",
      "personnages": "Edward et William Benson, fils de William John Chapman Benson ; architecte Harry Staveley",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-08-10",
          "texte": "Maison bâtie en 1878 pour les frères Benson : elle ne peut pas être le logis d'Edward Benson au recensement de 1871. La proposition de Bussière pour 1871 est donc écartée, et la maison 115 de 1871 rattachée au manoir Longwood."
        }
      ],
      "occupations": [
        {
          "annee": "1871",
          "division": "2",
          "no_maison": "115",
          "statut": "rejete",
          "confiance": "moyenne",
          "origine": "source",
          "motif": "Edward Benson, 25 a., bourgeois — sept ans avant la construction — écartée : la maison n'est bâtie qu'en 1878, Benson habite alors le manoir Longwood.",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1881",
          "division": "2",
          "no_maison": "237",
          "statut": "confirme",
          "confiance": "forte",
          "origine": "source",
          "motif": "Edouard Benson, 36 a., marchand de bois — maison bâtie en 1878 pour les frères Benson",
          "ajoute_le": "2026-08-10"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "1900-cf",
      "nom": "La maison Bourassa",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1900, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1857",
      "disparu": "",
      "coord": {
        "lat": 46.755167,
        "lon": -71.248054,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "SHSR",
      "source_ref": "bussiere:1900-cf",
      "personnages": "",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "Érigée en 1857, cette demeure d’esprit québécois, est intéressante autant du point de vue historique que par sa position, située sur la Pointe Benson.\n\n\nElle a été construite avec la pierre excédentaire de l’église de Saint-Romuald après son érection en 1854.\n\n\n​Connue sous le nom de « Maison des capitaines de bateaux », la propriété, qui appartient à l’origine à l’aubergiste François Bourassa, compte plusieurs autres bâtiments aujourd’hui disparus dont une étable, un hangar, une glacière et une forge. C’est ici, qu’à cette époque, les capitaines de bateaux ancrés à New Liverpool, séjournent et prennent un verre !\n\nCe bâtiment a été témoin d’un développement économique très important lié aux activités portuaires qui se sont déroulées à proximité: le commerce du bois, les chantiers navals et le transport fluvial des passagers. En 1885, la Compagnie Maritime et Industrielle de Lévis construit le « quai du bateau » d’où partait le traversier Frontenac reliant Saint-Romuald à Sillery.\n\n\nOmer Roberge, 1898-1974\n\n\nEn 1921,  Monsieur Omer Roberge achète cette propriété qu’il conservera jusqu’en 1946. Il sera maire de la ville de Saint-Romuald de 1940 à 1945 et un des fondateurs de la Caisse populaire de Saint-Romuald en 1940.\n\n​\n\nSuite à un grave incendie survenu en 1981, la maison a fait l’objet d’une restauration respectueuse de ses caractéristiques d’origine en 1985"
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "https://www.histoiresaintromuald.com/post/maison-bourassa"
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "Le rattachement de 1871 (division 2, maison 158) repose sur la notice de la Société d'histoire, qui donne l'aubergiste François Bourassa pour premier propriétaire. C'est le seul François Bourassa à tenir maison dans les cinq recensements. Rien sous ce nom en 1881 ni en 1891."
        }
      ],
      "occupations": [
        {
          "annee": "1871",
          "division": "2",
          "no_maison": "158 [?]",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "François Bourassa, 44 a., marchand, avec Marguerite (41 a.), quatre fils et une domestique — l'aubergiste à qui la Société d'histoire attribue la propriété d'origine, et le seul François Bourassa chef de ménage des cinq recensements. Le numéro de maison porte une marque d'incertitude au manuscrit.",
          "ajoute_le": "2026-09-13"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "1984-cf",
      "nom": "Maison Elphège Demers",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1984, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1780",
      "disparu": "",
      "coord": {
        "lat": 46.755637,
        "lon": -71.244513,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:1984-cf",
      "personnages": "Elphège Demers",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2039-2030-cf",
      "nom": "Maison de Narcisse Cantin",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2039 / 2030, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1791",
      "disparu": "",
      "coord": {
        "lat": 46.756423,
        "lon": -71.2433,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2039-2030-cf",
      "personnages": "Narcisse Cantin",
      "resume": "",
      "notes": [],
      "occupations": [
        {
          "annee": "1871",
          "division": "1",
          "no_maison": "18",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Narcisse Cantin, 40 a., cultivateur, et Euphrosine",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1881",
          "division": "1",
          "no_maison": "33",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Narcisse Cantin, 50 a., cultivateur",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "291",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Narcisse Cantin, 59 a., cultivateur",
          "ajoute_le": "2026-08-10"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2052-cf",
      "nom": "Maison de Pierre Cantin",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2052, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "fin 19e siècle",
      "disparu": "",
      "coord": {
        "lat": 46.756446,
        "lon": -71.242781,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2052-cf",
      "personnages": "Pierre Cantin, avocat, fils de Narcisse Cantin et Euphrosine Bégin",
      "resume": "",
      "notes": [
        {
          "auteur": "Reprise des rattachements",
          "date": "2026-09-13",
          "texte": "Les rattachements de 1871 (maison 18) et 1891 (maison 291) ont été retirés le 13 septembre 2026 : dans les deux cas il s'agit du ménage de Narcisse Cantin, déjà rattaché au 2039-2030. Pierre y a trois ans en 1871, et vingt-deux en 1891, étudiant en droit chez son père."
        }
      ],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2058-2060-cf",
      "nom": "Bâtiment commercial de la famille Lee",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2058-2060, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "v.1925",
      "disparu": "",
      "coord": {
        "lat": 46.75653,
        "lon": -71.242631,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2058-2060-cf",
      "personnages": "Famille Lee",
      "resume": "",
      "notes": [
        {
          "auteur": "Reprise des rattachements",
          "date": "2026-09-13",
          "texte": "Les rattachements de 1871 (maison 78) et 1891 (maison 405) ont été retirés le 13 septembre 2026. Ils venaient de la brochure Bussière, qui rattachait la famille Lee à cette adresse sans dater le rattachement : le bâtiment commercial date de v.1925. La famille est la bonne, l'emplacement ne peut pas l'être."
        }
      ],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2071-2065-cf",
      "nom": "Villas jumelles",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2071 et 2065, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1908-1909",
      "disparu": "",
      "coord": {
        "lat": 46.756852,
        "lon": -71.242607,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2071-2065-cf",
      "personnages": "Terrains de Narcisse Cantin, cultivateur ; construites par Joseph Lacroix (2071) et Ferdinand St-Hilaire (2065)",
      "resume": "",
      "notes": [
        {
          "auteur": "Reprise des rattachements",
          "date": "2026-09-13",
          "texte": "Les rattachements de 1881 (maison 244) et 1891 (maison 622) ont été retirés le 13 septembre 2026 : les villas sont bâties en 1908-1909, et Ferdinand St-Hilaire y figurait à 12 puis 15 ans. C'est le bâtisseur qu'on lisait, pas un occupant."
        }
      ],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2104-cf",
      "nom": "Maison d'Isaïe Bergeron",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2104, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1864",
      "disparu": "",
      "coord": {
        "lat": 46.757138,
        "lon": -71.241647,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2104-cf",
      "personnages": "Isaïe Bergeron, mesureur de bois",
      "resume": "",
      "notes": [],
      "occupations": [
        {
          "annee": "1871",
          "division": "2",
          "no_maison": "124",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Isaïe Bergeron, 28 a., « culler » (mesureur de bois) — métier identique",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1871",
          "division": "2",
          "no_maison": "116",
          "statut": "propose",
          "confiance": "faible",
          "origine": "source",
          "motif": "Isaïe [?] Bergeron, 49 a., cultivateur — homonyme plus âgé, à trancher",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "272",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Isaï Bergeron, 68 a., Culler (mesureur de bois) — suivi depuis 1871 (division 2, maison 116) ; âge cohérent à 1 an près ; 2 personnes du même ménage retrouvées : Isaï Bergeron, Marie Louise Bergeron",
          "ajoute_le": "2026-09-13"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2111-cf",
      "nom": "Maison Hallé",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2111, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "fin 19e siècle",
      "disparu": "",
      "coord": {
        "lat": 46.757331,
        "lon": -71.241761,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2111-cf",
      "personnages": "Théophile Hallé, forgeron",
      "resume": "",
      "notes": [],
      "occupations": [
        {
          "annee": "1871",
          "division": "1",
          "no_maison": "26",
          "statut": "propose",
          "confiance": "moyenne",
          "origine": "source",
          "motif": "Théophile Hallé, 18 a., dans le ménage des forgerons Hallé (George et Philippe)",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1881",
          "division": "1",
          "no_maison": "30",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Théophile Hâle, 30 a., Forgeron — suivi depuis 1891 (division 1, maison 287) ; âge cohérent à 0 an près ; 3 personnes du même ménage retrouvées : Théophile Hâle, Barbe Hâle, Jules Hâle",
          "ajoute_le": "2026-09-13"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "287",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Théophile Hallé, 40 a., forgeron",
          "ajoute_le": "2026-08-10"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2123-cf",
      "nom": "La maison Saint-Hilaire",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2123, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "v.1880",
      "disparu": "",
      "coord": {
        "lat": 46.757504,
        "lon": -71.241525,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2123-cf",
      "personnages": "Louis Saint-Hilaire, marchand tailleur ; Dr Willie Jr Lachance (cabinet de 1948 à 1963)",
      "resume": "",
      "notes": [],
      "occupations": [
        {
          "annee": "1881",
          "division": "2",
          "no_maison": "161",
          "statut": "confirme",
          "confiance": "forte",
          "origine": "source",
          "motif": "Louis St.Hilaire, 28 a., marchand — la boutique du tailleur, maison bâtie v.1880",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "460",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Louis St Hilaire, 35 a., Charpentier — suivi depuis 1881 (division 2, maison 161) ; âge cohérent à 0 an près ; 2 personnes du même ménage retrouvées : Louis St Hilaire, Philomène St Hilaire",
          "ajoute_le": "2026-09-13"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2172-cf",
      "nom": "L'ancien bureau de poste (style « château »)",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2172, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1929",
      "disparu": "",
      "coord": {
        "lat": 46.757938,
        "lon": -71.240221,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2172-cf",
      "personnages": "Architecte T. W. Fuller",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2175-cf",
      "nom": "L'hôtel de ville",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2175, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "1902",
      "disparu": "",
      "coord": {
        "lat": 46.758188,
        "lon": -71.240511,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2175-cf",
      "personnages": "Henry Atkinson II, maire ; architecte Eugène M. Talbot",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2190-cf",
      "nom": "La manufacture B.V.D.",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2190, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1902",
      "disparu": "",
      "coord": {
        "lat": 46.758125,
        "lon": -71.239828,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2190-cf",
      "personnages": "Louis Saint-Hilaire (installation 1922, venant du 2123) ; BVD Company Ltd. (dès 1937)",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2219-2223-cf",
      "nom": "La maison Demers",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2219-2223, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "fin 19e siècle",
      "disparu": "",
      "coord": {
        "lat": 46.758702,
        "lon": -71.239232,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2219-2223-cf",
      "personnages": "Louis-Julien Demers (fils de Benjamin Demers et Félicité Carrier), marchand, maire, puis député fédéral de Lévis ; son fils Raoul Demers, notaire, né le 7 août 1883",
      "resume": "",
      "notes": [],
      "occupations": [
        {
          "annee": "1881",
          "division": "1",
          "no_maison": "67",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "L. Julien Demers, 31 a., marchand — un an après l'ouverture de son magasin (1880)",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "129",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Louis Julien Demers, 41 a., marchand de marchandises sèches, avec son fils Raoul (7 a., né en 1883)",
          "ajoute_le": "2026-08-10"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2220-cf",
      "nom": "Bâtiment commercial vernaculaire",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2220, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "v.1860",
      "disparu": "",
      "coord": {
        "lat": 46.758459,
        "lon": -71.239091,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2220-cf",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2229-cf",
      "nom": "Maison de Maurice Saint-Hilaire",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2229, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "v.1965",
      "disparu": "",
      "coord": {
        "lat": 46.75893,
        "lon": -71.238854,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2229-cf",
      "personnages": "Maurice St-Hilaire, entrepreneur",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2248-2256-cf",
      "nom": "Le « Faubourg à Paddy »",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2248 à 2256, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "disparu",
      "construit": "v.1840",
      "disparu": "",
      "coord": {
        "lat": 46.75895,
        "lon": -71.237841,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2248-2256-cf",
      "personnages": "Patrick « Paddy » Shaughnessey (bâtisseur) ; propriété de John Caldwell",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2393-cf",
      "nom": "La maison du curé Sax",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2393, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1877",
      "disparu": "",
      "coord": {
        "lat": 46.759933,
        "lon": -71.233534,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2393-cf",
      "personnages": "Pierre-Télesphore Sax, premier curé de Saint-Romuald (jusqu'à son décès en 1881) ; vendue en 1883 à Ferdinand Villeneuve",
      "resume": "",
      "notes": [],
      "occupations": [
        {
          "annee": "1881",
          "division": "1",
          "no_maison": "286",
          "statut": "propose",
          "confiance": "moyenne",
          "origine": "source",
          "motif": "Ferdinand Villeneuve, 49 a., architecte — deux ans avant l'achat de 1883",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "67",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Ferdinand Villeneuve, 59 a., architecte-sculpteur-doreur d'églises — acquéreur de la maison du curé Sax en 1883",
          "ajoute_le": "2026-08-10"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2416-cf",
      "nom": "Maison du Dr Joseph Alphonse Villeneuve",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2416, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "v.1910",
      "disparu": "",
      "coord": {
        "lat": 46.759775,
        "lon": -71.232937,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2416-cf",
      "personnages": "Dr Joseph Alphonse Villeneuve, fils de Ferdinand Villeneuve et Odile Morin",
      "resume": "",
      "notes": [
        {
          "auteur": "Reprise des rattachements",
          "date": "2026-09-13",
          "texte": "Le rattachement de 1891 (maison 67) a été retiré le 13 septembre 2026 : la maison est bâtie vers 1910, et Alphonse Villeneuve, 25 ans, médecin, était alors recensé chez son père Ferdinand. Filiation, non occupation."
        }
      ],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2426-cf",
      "nom": "Maison de Joseph Villeneuve",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2426, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "v.1884",
      "disparu": "",
      "coord": {
        "lat": 46.759722,
        "lon": -71.232734,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2426-cf",
      "personnages": "Joseph Villeneuve, entrepreneur, fils de Ferdinand Villeneuve (architecte-sculpteur, atelier fondé 1852, maire de la paroisse en 1879)",
      "resume": "",
      "notes": [
        {
          "auteur": "Reprise des rattachements",
          "date": "2026-09-13",
          "texte": "Le rattachement de 1891 (maison 67) a été retiré le 13 septembre 2026 : c'est le ménage de Ferdinand Villeneuve, où Joseph, 23 ans, sculpteur-doreur, vit encore chez son père. La maison du 2426 est bâtie vers 1884, mais rien n'établit qu'il l'occupe en 1891."
        }
      ],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2458-cf",
      "nom": "Maison monumentale en brique",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2458, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "fin 19e siècle",
      "disparu": "",
      "coord": {
        "lat": 46.7594,
        "lon": -71.231875,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2458-cf",
      "personnages": "Fabien Rochette (menuisier, premier propriétaire) ; Onésime Roy, marchand de tabac (acquéreur 1917)",
      "resume": "",
      "notes": [],
      "occupations": [
        {
          "annee": "1881",
          "division": "1",
          "no_maison": "262",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Favien Rochette, 38 a., Mécanicien — suivi depuis 1891 (division 1, maison 93) ; âge cohérent à 0 an près ; 4 personnes du même ménage retrouvées : Favien Rochette, Marie Zoé Rochette, Alfred Rochette, Joseph Rochette",
          "ajoute_le": "2026-09-13"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "93",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Fabian Rochette, 48 a., menuisier — premier propriétaire nommé dans la brochure",
          "ajoute_le": "2026-08-10"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2479-cf",
      "nom": "La Boulangerie Gagnon",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2479, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "v.1900",
      "disparu": "",
      "coord": {
        "lat": 46.759426,
        "lon": -71.231263,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2479-cf",
      "personnages": "Joseph Gagnon et Célina Cadoret (achat 1925, d'Adjutor Cadoret)",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2547-cf",
      "nom": "Maison du Dr Michel P. Lambert",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2547, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "v.1893",
      "disparu": "",
      "coord": {
        "lat": 46.759149,
        "lon": -71.229625,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2547-cf",
      "personnages": "Dr Michel P. Lambert, fils de Julien Lambert et Suzanne Roberge",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "2560-cf",
      "nom": "Magasin général et bureau de poste",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "2560, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "v.1860",
      "disparu": "",
      "coord": {
        "lat": 46.758867,
        "lon": -71.22938,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:2560-cf",
      "personnages": "Joseph Joncas, marchand et maître de poste (jusqu'en 1922)",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "manoir-longwood",
      "nom": "Manoir Longwood",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "",
      "designe_aujourdhui": "Emplacement ayant fait l'objet de fouilles archéologiques ; le manoir ne subsiste pas.",
      "etat": "disparu",
      "construit": "",
      "disparu": "",
      "coord": {
        "lat": 46.754828,
        "lon": -71.248199,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Patrick Blanchet",
      "source_ref": "",
      "personnages": "Famille Benson — William John Chapman Benson et ses fils Edward et William",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-08-10",
          "texte": "Résidence de la famille Benson au moment du recensement de 1871 : Edward Benson, 25 ans, « bourgeois », y est recensé chez son père. Le manoir a disparu ; l'emplacement a fait l'objet de fouilles archéologiques. La maison du 1871, chemin du Fleuve, où on le retrouve en 1881, ne sera bâtie qu'en 1878."
        },
        {
          "auteur": "Amorce automatique",
          "date": "2026-08-10",
          "texte": "Position à replacer. Le point posé ici n'est qu'un repère de secteur, dans les anses Benson à l'ouest du chemin ; il n'a pas été relevé. Le rapport de fouille donnerait la position exacte."
        }
      ],
      "occupations": [
        {
          "annee": "1871",
          "division": "2",
          "no_maison": "115",
          "statut": "hypothese",
          "confiance": "moyenne",
          "origine": "chercheur",
          "motif": "Edward Benson, 25 ans, bourgeois, recensé seul à la maison 115 — la maison du 1871, chemin du Fleuve, n'existe pas encore en 1871.",
          "ajoute_le": "2026-08-10"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "maison-boutin-bourassa",
      "nom": "Maison Boutin-Bourassa",
      "voie": "",
      "adresse_actuelle": "143, rue Demers",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "v. 1850",
      "disparu": "",
      "coord": {
        "lat": 46.757264,
        "lon": -71.237529,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "SHSR",
      "personnages": "",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "Accroche : Joseph Bourassa père achète la propriété en 1859. Cette résidence à deux étages construite vers 1850 sur une terre appartenant à Benjamin Demers s’inscrit dans une architecture de conception québécoise. Ses fondations sont en pierre et l’ossature en bois. Au cours des années, elle a connu plusieurs modifications : les lucarnes, une partie de la grande galerie qui a été enlevée et l’annexion d’une nouvelle construction du côté droit de l’entrée principale vers 1910.\n\n\nJoseph Boutin dit Bourassa (1854-1943)\n\n\nIl est le fils de Joseph Boutin et de Charlotte Cantin et fils adoptif de Joseph Bourassa et de Geneviève Cantin. Il fait ses études au Collège de Lévis, au Séminaire de Québec et au Collège de Ste-Anne où il termine son cours classique en 1876. Par la suite, il obtient son diplôme de bachelier en droit à l'Université Laval. Le 20 mai 1880, il est admis à la pratique du notariat. Il a toujours exercé sa profession à Saint-Romuald.\n\n​\n\nLe 14 juin 1882, il épouse Ursule Cantin (1854-1928), fille de Narcisse Cantin et d’Ursule Cantin. Ils n’ont pas eu de descendance.\n\n​\n\nMe Boutin-Bourassa était aussi un homme politique. Il a été maire de Saint-Romuald de 1892 à 1897. Il tenta de devenir député de Lévis en 1908, mais sans succès. Il devint député du Parti libéral du Canada dans la circonscription fédérale de Lévis en 1911 et il est réélu en 1917 et en 1921. Le 1ᵉʳ septembre 1925, il est nommé membre de la Commission du Havre de Québec où il agit comme représentant de la rive-sud pendant cinq ans.\n\nIl décède à Saint-Romuald le 12 juillet 1943."
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "https://www.histoiresaintromuald.com/post/maison-boutin-bourassa"
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "Les trois rattachements suivent un seul ménage sur vingt ans : Joseph Bourassa père, 56 puis 66 puis 76 ans, et Geneviève Cantin son épouse. Marie Cantin y sert de 1871 à 1891. En 1881 le fils, Joseph Boutin dit Bourassa, y figure à 26 ans avec le titre de notaire — il avait été admis à la pratique le 20 mai 1880. En 1891, marié depuis 1882, il n'habite plus chez son père."
        }
      ],
      "occupations": [
        {
          "annee": "1871",
          "division": "1",
          "no_maison": "63",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Joseph Bourassa, 56 a., cultivateur, avec Geneviève (51 a.) et Joseph, 17 a. — le père acquéreur de 1859 selon la Société d'histoire. Le fils de dix-sept ans est le futur notaire Joseph Boutin dit Bourassa (1854-1943).",
          "ajoute_le": "2026-09-13"
        },
        {
          "annee": "1881",
          "division": "1",
          "no_maison": "83",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Joseph Bourassa, 66 a., rentier, avec Geneviève (61 a.) et Joseph Boutin dit Bourassa, 26 a., NOTAIRE — admis à la pratique du notariat le 20 mai 1880. Marie Cantin, domestique, sert la maison depuis 1871.",
          "ajoute_le": "2026-09-13"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "630",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Joseph Bourassa, 76 a., rentier, avec Geneviève (72 a.) et les mêmes domestiques, Marie Cantin et Louise Bouton — vingt ans de suite sous le même toit. Le notaire, marié à Ursule Cantin en 1882, n'y est plus.",
          "ajoute_le": "2026-09-13"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "maison-olivier-frere",
      "nom": "Maison Olivier & Frère",
      "voie": "Chemin du Fleuve",
      "adresse_actuelle": "2321, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "v. 1934",
      "disparu": "",
      "coord": {
        "lat": 46.759539,
        "lon": -71.236053,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "SHSR",
      "personnages": "",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "Fondée en 1934 par les frères Joseph et Achille Olivier, la Maison Olivier & Frère entreprend ses activités commerciales dans un bâtiment, aujourd’hui disparu.\n\nEn 1944, les deux frères achètent la propriété voisine de leur boutique, qu’ils démolissent pour construire le bâtiment actuel. Inauguré en 1946, le magasin Olivier & Frère possède au départ une boucherie et une épicerie. Au fil des années, le commerce s’agrandit afin de répondre aux exigences de plus en plus croissantes de la clientèle romualdienne et de ses environs. Avant-gardistes pour l’époque, les frères Olivier apportent un vent de modernité en installant dans leur épicerie des comptoirs réfrigérés pour conserver les denrées périssables.\n\n\nEn 1955-1956, le magasin familial est transformé en supermarché.\n\n​\n\nLe commerce qui est l’une des entreprises locales les plus prospères de Saint-Romuald représente un bel exemple de la vocation commerçante de l’artère nommée à l’époque rue Commerciale. C’est effectivement ici qu’entre les années 1900 et 1970 se développe le centre d’affaires de la Ville de Saint-Romuald. À l’époque, l’activité économique bouillonne et des entreprises de tout genre se côtoient. On y retrouve de nombreux commerces de services (cabinets de médecins, pharmaciens, notaires, etc.), des industries, des institutions bancaires, un bureau de poste ainsi que l’hôtel de ville de Saint-Romuald.\n\n​\nEn 1977, la Maison Olivier & Frère ferme ses portes suite à un incendie."
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "https://www.histoiresaintromuald.com/post/maison-olivier-fr%C3%A8re"
        }
      ],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "120-coterouge",
      "nom": "L'Anglican Christ'Church",
      "voie": "Côte Rouge",
      "adresse_actuelle": "120, Côte Rouge",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "1841",
      "disparu": "",
      "coord": {
        "lat": 46.752212,
        "lon": -71.248515,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990; SHSR",
      "source_ref": "bussiere:120-coterouge",
      "personnages": "",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "L'Église anglicane Christ Church New Liverpool, fut construite entre 1840 et 1841. Elle est aussi connue sous la désignation populaire de « la mitaine », expression déformée de la langue anglaise « meeting house » pour indiquer l’endroit où les anglophones se réunissaient.\n\n​De plan rectangulaire, elle est bâtie en pierre, face au fleuve, sur un terrain appartenant à l’époque à William Price, marchand de bois. Ce dernier fait don d’un lot de terre d’environ 30 000 pi², au Diocèse de l'Église anglicane de Québec, qui sera consacré à une église et à l’érection d’une future paroisse. Une partie du terrain était destinée au cimetière.\n\n​Jusqu’en 1854, le territoire de Saint-Romuald fait partie de la paroisse de Saint-Jean-Chrysostome où des familles anglicanes étaient déjà établies.\n\n\nEn 1840, deux paroissiens de Saint-Jean-Chrysostome, Timothy Amiraux et John Ritchie, ainsi que le révérend Francis James Lundy, ministre de l'Église anglicane, sont nommés Syndics pour l’érection d’une église au lieu nommé New Liverpool.\n\n\n​Le contrat de construction fut signé le 9 décembre 1840 avec Pierre Gauvreau, à l’époque maître maçon de Québec. Celui-ci deviendra architecte à partir de 1844. En 1854, il fait breveter son invention, le « ciment Gauvreau ». Ce ciment est utilisé à travers le Canada jusqu'au début du XXe siècle.\n\n\nEn 1878, Edward Cambria et Ernest William Benson cèdent à l'Église anglicane une parcelle de terre située en haut de la Côte Rouge pour la construction du presbytère de la Christ Church, destiné à loger le révérend responsable de la paroisse. Ce bâtiment existe toujours.\n\n​\n\nLa communauté anglicane de New Liverpool a soutenu et entretenu l’église jusqu’en 1975. Cette année-là et en accord avec les autorités religieuses, la communauté décide de mettre en vente la propriété.\n\n​\n\nLes tombes du cimetière, autrefois existant, furent déménagées au cimetière Mount Hermon à Sillery où elles se trouvent regroupées et identifiées comme provenant de la Christ Church New Liverpool.\n\n​\n\nL’église est aujourd’hui une résidence privée. L’ensemble immobilier (l’église et le presbytère) conserve toujours son apparence d’origine et il constitue un domaine exceptionnel où ces bâtiments patrimoniaux sont conservés et mis en valeur.\n\n​\n\nLa Christ Church New Liverpool représente un chapitre important et parfois méconnu de l’héritage et de la contribution de la communauté anglophone à l’histoire économique et sociale de Saint-Romuald."
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "https://www.histoiresaintromuald.com/post/christ-church-new-liverpool"
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "John Ritchie a commandité la construction de l'église, mais n'y habitait pas : il n'y a pas de rattachement de recensement à chercher de ce côté. Décision de Patrick Blanchet, 13 septembre 2026."
        }
      ],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "305-rue-de-saint-romuald",
      "nom": "Maison Henri-Dutil",
      "voie": "de Saint-Romuald",
      "adresse_actuelle": "305, rue de Saint-Romuald",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "v. 1923",
      "disparu": "",
      "coord": {
        "lat": 46.754828,
        "lon": -71.234488,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "n avril 1922, M. Henri Dutil obtient d’Alphonse Roberge une concession, un bail à rente foncière annuelle, pour le terrain. Sur l’acte notarié passé devant Me Charles Cantin, il est stipulé qu’une maison devra être construite sur ce terrain au cours de l’été 1923.\n\nM. Dutil fait donc construire cette résidence à trois étages, d’inspiration cubique (Four-square style), qui se caractérise par son toit en pavillon, la disposition symétrique des ouvertures et son revêtement extérieur en crépi. On remarque aussi des fenêtres en arc bombé ou ornées d’arcades.\n\n\nAutrefois, une galerie couverte complétait le carré original de la maison du côté sud. Elle fut transformée lors d’un agrandissement pour lui donner sa configuration actuelle. La propriété incluait aussi un terrain de tennis aménagé au début des années 30, qui fut très fréquenté par des amis et des sportifs amateurs des environs.\n\n\nLa famille Dutil a habité cette maison pendant 60 ans, soit jusqu’en 1981. Depuis, elle est occupée par des professionnels qui y tiennent leurs bureaux d’affaires.\n\n\nHenri Dutil (1891-1980) \n\n\nHenri Dutil est né à Saint-Calixte (Plessisville) le 7 décembre 1891. Il est le fils d’Henri Dutil et de Hedwidge Doucet. Le 5 juin 1917, à l’âge de 26 ans, il épouse, à Saint-Romuald, Cécile Dionne (1899-1978) de Saint-Antoine-de-Tilly. Elle était la fille d’Arthur Dionne et d’Angélique Lafleur. Henri et Cécile fondent ensuite une grande famille puisqu’ils auront cinq filles et cinq garçons.\n\n​\n\nHenri fait ses études au Séminaire de Québec et plus tard à l’Université Laval, où il obtient son diplôme en journalisme. Il exerce sa carrière professionnelle pendant 37 ans, d’abord comme journaliste et éditorialiste à L’Événement-journal, puis comme chroniqueur parlementaire durant 30 ans pour le journal Le Soleil à l’Assemblée nationale. En raison de son travail remarquable, il est nommé président de la Galerie de la Presse parlementaire.\n\n​\n\nÀ Saint-Romuald, il a assumé la fonction de maître de poste de 1920 à 1931 et de 1937 à 1947. Henri Dutil s’est aussi impliqué activement pendant plus de 25 ans au conseil d’administration de la Caisse Populaire de Saint-Romuald. Il en a été le vice-président de 1947 à 1961, puis président de 1962 à 1974. Monsieur Dutil a pris sa retraite à l’âge 75 ans. Il est décédé le 9 juillet 1980."
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "https://www.histoiresaintromuald.com/post/maison-henri-dutil"
        }
      ],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "182-eglise",
      "nom": "l'Église",
      "voie": "rue de l'Église",
      "adresse_actuelle": "170, rue Saint-Romuald",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1860",
      "disparu": "",
      "coord": {
        "lat": 46.755982,
        "lon": -71.237219,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "171-eglise",
      "nom": "Le couvent Notre-Dame",
      "voie": "rue de l'Église",
      "adresse_actuelle": "171, rue de l'Église",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "1871-1873",
      "disparu": "",
      "coord": {
        "lat": 46.75366,
        "lon": -71.243742,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:171-eglise",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "65-college",
      "nom": "Première centrale téléphonique",
      "voie": "rue du Collège",
      "adresse_actuelle": "65, rue du Collège",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "v.1875",
      "disparu": "",
      "coord": {
        "lat": 46.757067,
        "lon": -71.241107,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:65-college",
      "personnages": "William John Roberge et son père ; famille L'Hébreux",
      "resume": "",
      "notes": [
        {
          "auteur": "Reprise des rattachements",
          "date": "2026-09-13",
          "texte": "Les rattachements de 1871 (maison 9) et 1881 (maison 32) ont été proposés puis retirés le 13 septembre 2026 : trois Joseph Roberge chefs de ménage coexistent au village, et rien ne désigne celui-ci plutôt qu'un autre."
        }
      ],
      "occupations": [
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "430",
          "statut": "propose",
          "confiance": "moyenne",
          "origine": "source",
          "motif": "William John Roberge, 15 a. — prénom composé identique ; la maison aurait été bâtie v.1875 par son père",
          "ajoute_le": "2026-08-10"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "105-college",
      "nom": "Maison de Lauréat Vallière",
      "voie": "rue du Collège",
      "adresse_actuelle": "105, rue du Collège",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "milieu 20e siècle",
      "disparu": "",
      "coord": {
        "lat": 46.75651,
        "lon": -71.240235,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:105-college",
      "personnages": "Lauréat Vallière, sculpteur (fils de Joseph Vallière, navigateur) ; atelier ouvert en 1946",
      "resume": "",
      "notes": [
        {
          "auteur": "Reprise des rattachements",
          "date": "2026-09-13",
          "texte": "Le rattachement de 1871 (maison 94) a été proposé puis retiré le 13 septembre 2026 : deux Vallières chefs de ménage coexistent en 1871. Celui de 1881 (maison 176), corroboré par cinq membres du ménage, est conservé."
        }
      ],
      "occupations": [
        {
          "annee": "1881",
          "division": "2",
          "no_maison": "176",
          "statut": "propose",
          "confiance": "forte",
          "origine": "chercheur",
          "motif": "Thomas Vallière, 36 a., Navigateur — suivi depuis 1891 (division 1, maison 457) ; âge cohérent à 1 an près ; 5 personnes du même ménage retrouvées : Thomas Vallière, Philomène Vallière, Joseph Vallière, Mary Vallière, Célinda Vallière",
          "ajoute_le": "2026-09-13"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "446",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Joseph Vallière, 33 a., avec « Laurea » (3 a.) — Lauréat Vallière enfant",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "457",
          "statut": "propose",
          "confiance": "faible",
          "origine": "source",
          "motif": "Joseph Vallière, 19 a., batelier, chez Thomas Vallière, batelier — homonyme du même métier",
          "ajoute_le": "2026-08-10"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "30-juvenat",
      "nom": "La villa Atkinson",
      "voie": "rue du Juvénat",
      "adresse_actuelle": "30, rue du Juvénat",
      "designe_aujourdhui": "",
      "etat": "disparu",
      "construit": "à partir de 1856",
      "disparu": "",
      "coord": {
        "lat": 46.761826,
        "lon": -71.235416,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:30-juvenat",
      "personnages": "Henry Atkinson, propriétaire des moulins",
      "resume": "",
      "notes": [],
      "occupations": [
        {
          "annee": "1871",
          "division": "1",
          "no_maison": "214",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Henry Atkinson, 38 a., bourgeois",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1881",
          "division": "1",
          "no_maison": "349",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Henry Atkinson, 48 a., marchand de bois",
          "ajoute_le": "2026-08-10"
        },
        {
          "annee": "1891",
          "division": "1",
          "no_maison": "440",
          "statut": "propose",
          "confiance": "forte",
          "origine": "source",
          "motif": "Henry Atkinson, 59 a., marchand de bois",
          "ajoute_le": "2026-08-10"
        }
      ],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "52-56-hardy",
      "nom": "Maisons ouvrières",
      "voie": "rue Hardy",
      "adresse_actuelle": "52, rue Hardy",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "2e moitié du 19e siècle",
      "disparu": "",
      "coord": {
        "lat": 46.746533,
        "lon": -71.264859,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:52-56-hardy",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "65-stdamase",
      "nom": "Magasin général",
      "voie": "rue Saint-Damase",
      "adresse_actuelle": "65, rue Saint-Damase",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "fin 19e siècle",
      "disparu": "",
      "coord": {
        "lat": 46.748198,
        "lon": -71.258235,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:65-stdamase",
      "personnages": "Almanzare Demers",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "83-stdamase",
      "nom": "Maison-école",
      "voie": "rue Saint-Damase",
      "adresse_actuelle": "83, rue Saint-Damase",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "v.1861",
      "disparu": "",
      "coord": {
        "lat": 46.747781,
        "lon": -71.257748,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Bussière 1990",
      "source_ref": "bussiere:83-stdamase",
      "personnages": "Famille McReady (magasin général au 1588, chemin du Fleuve, même emplacement que la 2e école)",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "La famille McReady tenait son magasin général au 1588, chemin du Fleuve, où habitait Robert MacReady — et non ici. Les treize ménages McReady des recensements ne se rattachent donc pas au 83, rue Saint-Damase, dont aucun habitant n'est identifié pour l'instant. Décision de Patrick Blanchet, 13 septembre 2026."
        }
      ],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "maison-d-ecole",
      "nom": "Maison d'École",
      "voie": "Saint-Jean-Baptiste",
      "adresse_actuelle": "2211, rue Saint-Jean-Baptiste",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "1885",
      "disparu": "",
      "coord": {
        "lat": 46.757451,
        "lon": -71.238268,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-13"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "Cette résidence à deux étages fût construite en 1885. Elle se situe sur un lot appartenant à Benjamin Demers. Il s’agit de l’ancienne maison d’école, un bâtiment institutionnel. Elle se caractérise par son toit pavillon en tôle à baguettes, orné de cinq lucarnes-pignon symétriques d’inspiration néo-gothique et sa galerie couverte. Elle était localisée, à l’origine, de l’autre côté de la rue dans le parc des Pionniers.\n\n​\n\nLe 8 août 1829, Julien Demers, cultivateur, et Geneviève Roberge, son épouse, cèdent gratuitement un terrain (aujourd’hui le parc des Pionniers) exclusivement destiné à l’érection d’une maison d’école.\n\n​\n\nMis à part sa vocation principale, la maison d’école remplissait autrefois plusieurs fonctions : comme cour de commissaires, tribunal pour les plaintes et pour les séances du conseil municipal. La maison d’école était le centre décisif du village.\n\n​\n\nEn 1853, un premier agrandissement est fait pour aménager une chapelle provisoire et recevoir le nouveau curé, Pierre-Télesphore Sax.\n\n​\n\nLa Commission scolaire d’Etchemin Village est fondée en 1856. À cette époque, on parlait de la Maison d’École N°1 et elle était destinée aux garçons.\n\n\nEn 1880, cinq Frères du Sacré-Cœur arrivent à Saint-Romuald pour s’occuper de l’enseignement des garçons. En attendant la construction du collège (qui sera prêt en 1884), les Frères « donnent les classes » dans la maison d’école.\n\n​\n\nEn raison du prolongement de la rue de l’Église, des travaux majeurs ont été réalisés sur le bâtiment en 1885, ce qui lui donna son apparence actuelle. Il a fallu couper la maison d’école en deux et la déplacer puisqu’elle se trouvait en partie sur le chemin projeté.\n\n​\n\n En 1886, les Frères du Sacré-Cœur quittent le collège. Les maîtresses d’école assument l’éducation des garçons jusqu’à l’arrivée des Frères Maristes en 1897. En septembre 1898, un incendie ravage le collège et l’enseignement se poursuit dans l’ancienne maison d’école jusqu’en 1900, fin de la reconstruction du collège.\n\nDans un rapport daté de février 1905, l’inspecteur d’école conclut que le terrain non clôturé n’était pas sécuritaire dû au danger potentiel du cap. Alors, les commissaires décident lors d’une séance de vendre la maison d’école à l’enchère publique.\n\n​\n\nLa dernière session des commissaires à la maison d’école eut lieu le 22 juillet 1907. Cette année-là, elle a déménagé à son emplacement actuel, lequel était la propriété de Damase Siméon Bilodeau depuis 1904."
        },
        {
          "auteur": "Patrick Blanchet",
          "date": "2026-09-13",
          "texte": "https://www.histoiresaintromuald.com/post/maison-d-%C3%A9cole"
        }
      ],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {},
      "photos": [],
      "documents": []
    },
    {
      "id": "55",
      "nom": "55 : maison en bois - Goad",
      "voie": "",
      "adresse_actuelle": "",
      "designe_aujourdhui": "",
      "etat": "disparu",
      "construit": "1876",
      "disparu": "",
      "coord": {
        "lat": 46.742765,
        "lon": -71.276572,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "15",
        "goad_no": "Goad"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "35-goad",
      "nom": "35 : maison en bois - Goad",
      "voie": "",
      "adresse_actuelle": "",
      "designe_aujourdhui": "",
      "etat": "disparu",
      "construit": "1876",
      "disparu": "",
      "coord": {
        "lat": 46.743346,
        "lon": -71.275789,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "15",
        "goad_no": "35"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "40-goad",
      "nom": "40 : maison en bois - Goad",
      "voie": "",
      "adresse_actuelle": "",
      "designe_aujourdhui": "",
      "etat": "disparu",
      "construit": "1876",
      "disparu": "",
      "coord": {
        "lat": 46.743074,
        "lon": -71.276046,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "15",
        "goad_no": "40"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "32-goad",
      "nom": "32 : Dépendances en bois, remises et bâtiments secondaires non habités",
      "voie": "",
      "adresse_actuelle": "",
      "designe_aujourdhui": "",
      "etat": "disparu",
      "construit": "1876",
      "disparu": "",
      "coord": {
        "lat": 46.743614,
        "lon": -71.275783,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "15",
        "goad_no": "32"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "30-goad",
      "nom": "30 : maison en bois - Goad",
      "voie": "",
      "adresse_actuelle": "",
      "designe_aujourdhui": "",
      "etat": "disparu",
      "construit": "1876",
      "disparu": "",
      "coord": {
        "lat": 46.743443,
        "lon": -71.275402,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "15",
        "goad_no": "30"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "ritchie-and-cull",
      "nom": "Ritchie and Cull",
      "voie": "",
      "adresse_actuelle": "",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "",
      "disparu": "",
      "coord": {
        "lat": 46.74418,
        "lon": -71.275536,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "15"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "cours-a-bois-c-goad",
      "nom": "C : Bois empilé; zones de stockage à haut risque de feu - Goad",
      "voie": "",
      "adresse_actuelle": "",
      "designe_aujourdhui": "",
      "etat": "disparu",
      "construit": "1876",
      "disparu": "",
      "coord": {
        "lat": 46.74434,
        "lon": -71.271449,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "15",
        "goad_no": "C"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "15-goad",
      "nom": "15 : maison en bois - Goad",
      "voie": "",
      "adresse_actuelle": "",
      "designe_aujourdhui": "",
      "etat": "disparu",
      "construit": "",
      "disparu": "",
      "coord": {
        "lat": 46.744754,
        "lon": -71.270301,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "15",
        "goad_no": "15"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "cours-a-bois-b-goad",
      "nom": "B : Bois empilé; zones de stockage à haut risque de feu - Goad",
      "voie": "",
      "adresse_actuelle": "",
      "designe_aujourdhui": "",
      "etat": "disparu",
      "construit": "1876",
      "disparu": "",
      "coord": {
        "lat": 46.744827,
        "lon": -71.271218,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "15",
        "goad_no": "B"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "cours-a-bois-a-goad",
      "nom": "A : Bois empilé; zones de stockage à haut risque de feu - Goad",
      "voie": "",
      "adresse_actuelle": "",
      "designe_aujourdhui": "",
      "etat": "disparu",
      "construit": "1876",
      "disparu": "",
      "coord": {
        "lat": 46.745174,
        "lon": -71.270059,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "15",
        "goad_no": "A"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "albert-cove",
      "nom": "Albert Cove - Goad",
      "voie": "",
      "adresse_actuelle": "",
      "designe_aujourdhui": "",
      "etat": "inconnu",
      "construit": "",
      "disparu": "",
      "coord": {
        "lat": 46.744519,
        "lon": -71.274112,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "15"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "maison-julie-marie",
      "nom": "Maison Julie-Marie",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1616, chemin du Fleuve",
      "designe_aujourdhui": "Julie-Marie Dorval, prop. Boudoir aux Arômes",
      "etat": "debout",
      "construit": "",
      "disparu": "",
      "coord": {
        "lat": 46.748254,
        "lon": -71.25896,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "lot": "523",
        "lot_annee": "1879",
        "goad_feuillet": "14",
        "goad_no": "29"
      },
      "photos": [],
      "documents": []
    },
    {
      "id": "1610-chemin-du-fleuve",
      "nom": "1610, chemin du Fleuve",
      "voie": "chemin du Fleuve",
      "adresse_actuelle": "1610, chemin du Fleuve",
      "designe_aujourdhui": "",
      "etat": "debout",
      "construit": "",
      "disparu": "",
      "coord": {
        "lat": 46.748371,
        "lon": -71.258794,
        "precision": "releve",
        "pose_par": "Patrick Blanchet",
        "pose_le": "2026-09-14"
      },
      "source": "Patrick Blanchet",
      "personnages": "",
      "resume": "",
      "notes": [],
      "occupations": [],
      "adresses_anciennes": [],
      "cadastre": {
        "goad_feuillet": "14",
        "goad_no": "25"
      },
      "photos": [],
      "documents": []
    }
  ],
  "verse": {
    "55": {
      "le": "2026-09-14",
      "empreinte": "0f192612"
    },
    "aa-1616-lot-523-goad-29": {
      "le": "2026-09-14",
      "empreinte": "6f5f1f1c"
    },
    "1506-cf": {
      "le": "2026-09-14",
      "empreinte": "5310c2ae"
    },
    "1604-cf": {
      "le": "2026-09-14",
      "empreinte": "72412ef1"
    },
    "52-56-hardy": {
      "le": "2026-09-14",
      "empreinte": "c065c9a2"
    },
    "1633-cf": {
      "le": "2026-09-14",
      "empreinte": "0684e9d1"
    },
    "manoir-longwood": {
      "le": "2026-09-14",
      "empreinte": "4fcfca75"
    },
    "65-stdamase": {
      "le": "2026-09-14",
      "empreinte": "91c28068"
    },
    "83-stdamase": {
      "le": "2026-09-14",
      "empreinte": "c38b4e3d"
    },
    "1719-1720-cf": {
      "le": "2026-09-14",
      "empreinte": "6f82160d"
    },
    "1736-cf": {
      "le": "2026-09-14",
      "empreinte": "9706a308"
    },
    "1871-cf": {
      "le": "2026-09-14",
      "empreinte": "b8341b64"
    },
    "1900-cf": {
      "le": "2026-09-14",
      "empreinte": "c7f69435"
    },
    "120-coterouge": {
      "le": "2026-09-14",
      "empreinte": "3371b07b"
    },
    "1984-cf": {
      "le": "2026-09-14",
      "empreinte": "fd66d215"
    },
    "2039-2030-cf": {
      "le": "2026-09-14",
      "empreinte": "b00101cc"
    },
    "182-eglise": {
      "le": "2026-09-14",
      "empreinte": "7fc4b006"
    },
    "171-eglise": {
      "le": "2026-09-14",
      "empreinte": "55d7c99b"
    },
    "2052-cf": {
      "le": "2026-09-14",
      "empreinte": "7ddd587d"
    },
    "2104-cf": {
      "le": "2026-09-14",
      "empreinte": "6c041ab2"
    },
    "2111-cf": {
      "le": "2026-09-14",
      "empreinte": "8ef8df2a"
    },
    "2123-cf": {
      "le": "2026-09-14",
      "empreinte": "7e71f616"
    },
    "2175-cf": {
      "le": "2026-09-14",
      "empreinte": "22b02b7e"
    },
    "2172-cf": {
      "le": "2026-09-14",
      "empreinte": "5213621f"
    },
    "2190-cf": {
      "le": "2026-09-14",
      "empreinte": "e5577e41"
    },
    "2058-2060-cf": {
      "le": "2026-09-14",
      "empreinte": "fa5b29b1"
    },
    "2071-2065-cf": {
      "le": "2026-09-14",
      "empreinte": "1fd8fe63"
    },
    "65-college": {
      "le": "2026-09-14",
      "empreinte": "da48a98e"
    },
    "105-college": {
      "le": "2026-09-14",
      "empreinte": "613df8b5"
    },
    "2220-cf": {
      "le": "2026-09-14",
      "empreinte": "3ad5b53d"
    },
    "2219-2223-cf": {
      "le": "2026-09-14",
      "empreinte": "cb7dcc50"
    },
    "2229-cf": {
      "le": "2026-09-14",
      "empreinte": "82ab390c"
    },
    "2560-cf": {
      "le": "2026-09-14",
      "empreinte": "a5712455"
    },
    "2547-cf": {
      "le": "2026-09-14",
      "empreinte": "13e1ffe1"
    },
    "30-juvenat": {
      "le": "2026-09-14",
      "empreinte": "e71f93ad"
    },
    "2248-2256-cf": {
      "le": "2026-09-14",
      "empreinte": "d29fa323"
    },
    "2393-cf": {
      "le": "2026-09-14",
      "empreinte": "0233a88b"
    },
    "2416-cf": {
      "le": "2026-09-14",
      "empreinte": "c0f961d8"
    },
    "2426-cf": {
      "le": "2026-09-14",
      "empreinte": "b79d4578"
    },
    "2458-cf": {
      "le": "2026-09-14",
      "empreinte": "410c84ad"
    },
    "2479-cf": {
      "le": "2026-09-14",
      "empreinte": "82d881f0"
    },
    "1720-chemin-du-fleuve": {
      "le": "2026-09-14",
      "empreinte": "741f7772"
    },
    "305-rue-de-saint-romuald": {
      "le": "2026-09-14",
      "empreinte": "af80a52e"
    },
    "maison-olivier-frere": {
      "le": "2026-09-14",
      "empreinte": "d9dae1ab"
    },
    "maison-boutin-bourassa": {
      "le": "2026-09-14",
      "empreinte": "90c92580"
    },
    "maison-d-ecole": {
      "le": "2026-09-14",
      "empreinte": "b6751dc0"
    },
    "1596-cf": {
      "le": "2026-09-14",
      "empreinte": "f7d13b85"
    },
    "35-goad": {
      "le": "2026-09-14",
      "empreinte": "aea50c24"
    },
    "40-goad": {
      "le": "2026-09-14",
      "empreinte": "d2dc152f"
    },
    "32-goad": {
      "le": "2026-09-14",
      "empreinte": "e7b5cc92"
    },
    "30-goad": {
      "le": "2026-09-14",
      "empreinte": "ca93b213"
    },
    "ritchie-and-cull": {
      "le": "2026-09-14",
      "empreinte": "ce16f2e5"
    },
    "cours-a-bois-c-goad": {
      "le": "2026-09-14",
      "empreinte": "4bfa1041"
    },
    "15-goad": {
      "le": "2026-09-14",
      "empreinte": "cffe53fb"
    },
    "ours-a-bois-b-goad": {
      "le": "2026-09-14",
      "empreinte": "24f2153c"
    },
    "cours-a-bois-a-goad": {
      "le": "2026-09-14",
      "empreinte": "d9172a2c"
    },
    "albert-cove": {
      "le": "2026-09-14",
      "empreinte": "b2f0561f"
    },
    "maison-julie-marie": {
      "le": "2026-09-14",
      "empreinte": "3b11f831"
    },
    "1610-chemin-du-fleuve": {
      "le": "2026-09-14",
      "empreinte": "1d8a226d"
    }
  }
};
