// Carte des lieux du chemin du Fleuve — et son atelier.
//
// Il y a deux écrans dans ce fichier, et c'est voulu : la carte de lecture, et
// la même carte en mode Atelier. Poser un point, c'est un geste de carte —
// on le fait en glissant le repère, pas en tapant deux nombres dans un
// formulaire ailleurs. Tout ce qui s'y modifie part dans le même localStorage
// que le reste de l'atelier (clé `suivi-lieux`) et se verse au dépôt par
// data/travail-personnel.json puis outils/lieux/fondre.mjs. Voir docs/LIEUX.md.
(function () {
  'use strict';

  var esc = LX.esc;
  var CENTRE = [46.7375, -71.2690];
  var etat = {
    lieux: [], maisons: [], mis_a_jour: '',
    filtre: '', q: '', selection: null,
    atelier: /[?&]atelier=1/.test(location.search),
    poser: false, resultats: []
  };
  var carte, coucheLieux, marqueurs = {};

  // Plans anciens en surimpression (cadastre de 1879, Goad à venir) : une
  // couche par plan affiché, trois poignées de calage quand on en règle un.
  var plans = [], couchesPlans = {}, poigneesPlan = [], planEnCalage = null;

  function parId(id) {
    for (var i = 0; i < etat.lieux.length; i++) if (etat.lieux[i].id === id) return etat.lieux[i];
    return null;
  }

  function numeroDe(adresse) {
    var m = String(adresse || '').match(/\d+/);
    return m ? parseInt(m[0], 10) : Infinity;
  }

  function anneesDe(l) {
    return (l.occupations || []).filter(function (o) { return o.statut !== 'rejete'; })
      .map(function (o) { return o.annee; })
      .filter(function (a, i, t) { return t.indexOf(a) === i; })
      .sort();
  }

  function visible(l) {
    if (etat.filtre === 'sans') { if (anneesDe(l).length) return false; }
    else if (etat.filtre) { if (anneesDe(l).indexOf(etat.filtre) === -1) return false; }
    if (etat.q) {
      var foin = [l.nom, l.adresse_actuelle, l.personnages, l.resume,
        (l.resume_source || {}).texte, (l.occupations || []).map(function (o) {
          return o.no_maison + ' ' + o.motif + ' ' + ((o.maisonnee || {}).familles || []).map(function (f) { return f.chef; }).join(' ');
        }).join(' ')].join(' ').toLowerCase();
      if (etat.q.split(/\s+/).some(function (mot) { return foin.indexOf(mot) === -1; })) return false;
    }
    return true;
  }

  // ── carte ────────────────────────────────────────────────────────────────

  function styleDe(l) {
    var releve = l.coord && l.coord.precision === 'releve';
    var perdu = l.etat === 'disparu' || l.etat === 'remplace';
    var couleur = perdu ? '#6B6357' : '#A4343A';
    return {
      radius: 8, color: couleur, weight: releve ? 2.5 : 1.5,
      fillColor: couleur, fillOpacity: releve ? 0.8 : 0.12,
      dashArray: releve ? null : '3 3'
    };
  }

  function popupDe(l) {
    var annees = anneesDe(l);
    return '<div class="popup-lieu"><b>' + esc(l.nom) + '</b>' +
      (l.adresse_actuelle ? '<span>' + esc(l.adresse_actuelle) + '</span>' : '<span>sans adresse actuelle</span>') +
      (annees.length ? '<span>recensé en ' + esc(annees.join(', ')) + '</span>' : '<span>aucun rattachement</span>') +
      '<a href="lieu.html#' + esc(l.id) + '">Ouvrir la fiche →</a></div>';
  }

  function dessinerMarqueurs() {
    if (!carte) return;
    coucheLieux.clearLayers();
    marqueurs = {};
    etat.lieux.forEach(function (l) {
      if (!l.coord || !visible(l)) return;
      var m = L.circleMarker([l.coord.lat, l.coord.lon], styleDe(l));
      m.bindPopup(popupDe(l));
      m.on('click', function () { selectionner(l.id, false); });
      m.addTo(coucheLieux);
      marqueurs[l.id] = m;
      // Une seule poignée de déplacement, sur le lieu sélectionné : trente-neuf
      // épingles glissables recouvraient les points qu'elles devaient corriger.
      if (etat.atelier && l.id === etat.selection) rendreDeplacable(l, m);
    });
    surligner();
  }

  /* Un circleMarker n'est pas déplaçable ; on lui adjoint, en mode atelier, un
     marqueur classique glissable. Le geste vaut alors relevé : la position
     passe de « secteur » à « posée à la main ». */
  function rendreDeplacable(l, cercle) {
    var poignee = L.marker([l.coord.lat, l.coord.lon], { draggable: true, opacity: 0.9, title: 'Glisser pour replacer — ' + l.nom });
    poignee.on('drag', function (e) { cercle.setLatLng(e.latlng); });
    poignee.on('dragend', function (e) {
      var p = e.target.getLatLng();
      var coord = {
        lat: Number(p.lat.toFixed(6)), lon: Number(p.lng.toFixed(6)),
        precision: 'releve', pose_par: 'Patrick Blanchet', pose_le: new Date().toISOString().slice(0, 10)
      };
      appliquer(l.id, { coord: coord });
      cercle.setStyle(styleDe(parId(l.id)));
      if (etat.selection === l.id) rendrePanneau();
    });
    poignee.on('click', function () { selectionner(l.id, false); });
    poignee.addTo(coucheLieux);
  }

  function surligner() {
    Object.keys(marqueurs).forEach(function (id) {
      var l = parId(id);
      var s = styleDe(l);
      if (id === etat.selection) { s.color = '#1A6FA8'; s.weight = 4; s.radius = 11; }
      marqueurs[id].setStyle(s);
    });
  }

  function initCarte() {
    // Leaflet devine sinon le chemin de ses images depuis l'URL de son script ;
    // ici la feuille et les images sont rangées à la main dans lib/.
    L.Icon.Default.prototype.options.imagePath = 'lib/images/';
    carte = L.map('carte', { scrollWheelZoom: true }).setView(CENTRE, 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(carte);
    coucheLieux = L.layerGroup().addTo(carte);
    carte.on('click', function (e) {
      if (!etat.poser) return;
      creerLieu(e.latlng);
    });
  }

  // ── plans anciens ────────────────────────────────────────────────────────

  function planParId(id) {
    for (var i = 0; i < plans.length; i++) if (plans[i].id === id) return plans[i];
    return null;
  }

  function pointsDe(p) {
    return [
      [p.points.nw.lat, p.points.nw.lon],
      [p.points.ne.lat, p.points.ne.lon],
      [p.points.sw.lat, p.points.sw.lon]
    ];
  }

  function afficherPlan(p) {
    if (couchesPlans[p.id]) return;
    var pts = pointsDe(p);
    couchesPlans[p.id] = L.imageOverlay.pivote(p.fichier, pts[0], pts[1], pts[2], {
      opacity: p.opacite == null ? 0.6 : p.opacite,
      interactive: false
    }).addTo(carte);
  }

  function masquerPlan(id) {
    if (!couchesPlans[id]) return;
    carte.removeLayer(couchesPlans[id]);
    delete couchesPlans[id];
    if (planEnCalage === id) finirCalage();
  }

  /* Trois poignées — NO, NE, SO — aux coins de l'image. Les glisser tourne et
     étire le plan pour l'amener sur le terrain ; chaque geste est enregistré. */
  function commencerCalage(p) {
    finirCalage();
    afficherPlan(p);
    planEnCalage = p.id;
    var couche = couchesPlans[p.id];
    // Cadrer sur le plan : ses coins peuvent être loin du cadrage courant, et
    // une poignée hors écran est une poignée qu'on ne peut pas saisir.
    carte.fitBounds(couche.getBounds().pad(0.08));
    var noms = ['nw', 'ne', 'sw'], etiquettes = { nw: 'NO', ne: 'NE', sw: 'SO' };
    noms.forEach(function (coin) {
      var m = L.marker([p.points[coin].lat, p.points[coin].lon], {
        draggable: true,
        icon: L.divIcon({ className: 'poignee-plan', html: etiquettes[coin], iconSize: [30, 22], iconAnchor: [15, 11] })
      });
      m.on('drag', function (e) {
        p.points[coin] = { lat: e.latlng.lat, lon: e.latlng.lng };
        var pts = pointsDe(p);
        couche.setPoints(pts[0], pts[1], pts[2]);
      });
      m.on('dragend', function () {
        p.points[coin] = { lat: Number(p.points[coin].lat.toFixed(6)), lon: Number(p.points[coin].lon.toFixed(6)) };
        p._local = true;
        LX.majPlan(p.id, { points: p.points });
        rendreControlePlans();
      });
      m.addTo(carte);
      poigneesPlan.push(m);
    });
    rendreControlePlans();
  }

  function finirCalage() {
    poigneesPlan.forEach(function (m) { carte.removeLayer(m); });
    poigneesPlan = [];
    planEnCalage = null;
  }

  function rendreControlePlans() {
    var noeud = document.getElementById('plans-controle');
    if (!noeud) return;
    var visibles = plans.filter(function (p) { return p.fichier && (p.cale || etat.atelier); });
    if (!visibles.length) { noeud.innerHTML = ''; return; }
    noeud.innerHTML = '<div class="plans-bloc"><span class="plans-titre">Plans anciens</span>' +
      visibles.map(function (p) {
        var actif = !!couchesPlans[p.id];
        var opac = Math.round((p.opacite == null ? 0.6 : p.opacite) * 100);
        return '<div class="plan-ligne">' +
          '<label><input type="checkbox" data-plan-voir="' + esc(p.id) + '"' + (actif ? ' checked' : '') + '> ' +
          esc(p.titre) + '</label>' +
          (!p.cale ? '<span class="plan-avis">' + (etat.atelier ? 'à caler' : '') + '</span>' : '') +
          (actif ? '<input type="range" min="10" max="100" value="' + opac + '" data-plan-opacite="' + esc(p.id) + '" title="Transparence">' : '') +
          (etat.atelier && actif ? (
            planEnCalage === p.id
              ? '<button type="button" class="bouton actif" data-plan-caler="' + esc(p.id) + '">Fin du calage</button>'
              : '<button type="button" class="bouton" data-plan-caler="' + esc(p.id) + '">Caler ✎</button>'
          ) : '') +
          (etat.atelier ? '<label class="plan-cale"><input type="checkbox" data-plan-cale="' + esc(p.id) + '"' + (p.cale ? ' checked' : '') + '> calé, montrer au public</label>' : '') +
          (etat.atelier && p._local ? '<button type="button" class="bouton" data-plan-exporter="1">Télécharger data/plans-data.js</button>' : '') +
          '</div>';
      }).join('') +
      (etat.atelier && planEnCalage
        ? '<p class="plan-aide">Glissez les trois poignées NO, NE, SO pour amener le plan sur le terrain — commencez par NO (position), puis NE (échelle et rotation), puis SO. Le plan de 1879 mêle trois échelles : calez la bande du chemin du Fleuve, le reste ne peut pas tomber juste en même temps.</p>'
        : '') +
      '</div>';
  }

  function brancherPlans() {
    var noeud = document.getElementById('plans-controle');
    if (!noeud) return;
    noeud.addEventListener('change', function (e) {
      var t = e.target;
      if (t.dataset.planVoir) {
        var p = planParId(t.dataset.planVoir);
        if (!p) return;
        if (t.checked) afficherPlan(p); else masquerPlan(p.id);
        rendreControlePlans();
        return;
      }
      if (t.dataset.planCale) {
        var p2 = planParId(t.dataset.planCale);
        if (!p2) return;
        p2.cale = t.checked;
        p2._local = true;
        LX.majPlan(p2.id, { cale: p2.cale });
        rendreControlePlans();
        return;
      }
    });
    noeud.addEventListener('input', function (e) {
      var t = e.target;
      if (!t.dataset.planOpacite) return;
      var p = planParId(t.dataset.planOpacite);
      if (!p) return;
      p.opacite = t.value / 100;
      p._local = true;
      if (couchesPlans[p.id]) couchesPlans[p.id].setOpacity(p.opacite);
      LX.majPlan(p.id, { opacite: p.opacite });
    });
    noeud.addEventListener('click', function (e) {
      var t = e.target;
      if (t.dataset.planCaler) {
        var p = planParId(t.dataset.planCaler);
        if (!p) return;
        if (planEnCalage === p.id) { finirCalage(); rendreControlePlans(); }
        else commencerCalage(p);
        return;
      }
      if (t.dataset.planExporter) {
        LX.telecharger('plans-data.js', LX.versFichierPlans(plans), 'text/javascript');
        return;
      }
    });
  }

  // ── écriture ─────────────────────────────────────────────────────────────

  function appliquer(id, champs) {
    var l = parId(id);
    if (!l) return null;
    Object.keys(champs).forEach(function (k) { l[k] = champs[k]; });
    l._local = true;
    l._modifie_le = new Date().toISOString().slice(0, 10);
    LX.majLieu(id, champs);
    rendreListe();
    majResume();
    return l;
  }

  function creerLieu(latlng) {
    var nom = prompt('Nom ou adresse du nouveau lieu ?', '');
    if (nom === null) return;
    nom = nom.trim();
    if (!nom) return;
    var id = LX.nouvelId(nom, etat.lieux.map(function (l) { return l.id; }));
    var estAdresse = /^\d/.test(nom);
    var lieu = {
      id: id, nom: estAdresse ? nom : nom,
      voie: /chemin du Fleuve/i.test(nom) ? 'chemin du Fleuve' : '',
      adresse_actuelle: estAdresse ? nom : '',
      designe_aujourdhui: '', etat: 'inconnu', construit: '', disparu: '',
      coord: {
        lat: Number(latlng.lat.toFixed(6)), lon: Number(latlng.lng.toFixed(6)),
        precision: 'releve', pose_par: 'Patrick Blanchet', pose_le: new Date().toISOString().slice(0, 10)
      },
      source: 'Patrick Blanchet', personnages: '', resume: '',
      notes: [], occupations: [], adresses_anciennes: [], cadastre: {}, photos: [], documents: []
    };
    etat.lieux.push(lieu);
    LX.majLieu(id, lieu);
    etat.poser = false;
    dessinerMarqueurs();
    rendreListe();
    selectionner(id, true);
    majResume();
  }

  // ── panneau ──────────────────────────────────────────────────────────────

  function champ(l, cle, etiquette, opts) {
    opts = opts || {};
    var v = esc(l[cle] == null ? '' : l[cle]);
    if (opts.options) {
      return '<label class="ch"><span>' + esc(etiquette) + '</span><select data-champ="' + cle + '">' +
        opts.options.map(function (o) {
          return '<option value="' + esc(o[0]) + '"' + (String(l[cle] || '') === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
        }).join('') + '</select></label>';
    }
    if (opts.zone) {
      return '<label class="ch ch-large"><span>' + esc(etiquette) + '</span><textarea rows="3" data-champ="' + cle + '">' + v + '</textarea></label>';
    }
    return '<label class="ch"><span>' + esc(etiquette) + '</span><input type="text" data-champ="' + cle + '" value="' + v + '"' +
      (opts.placeholder ? ' placeholder="' + esc(opts.placeholder) + '"' : '') + '></label>';
  }

  var OPTIONS_ETAT = Object.keys(LX.ETATS).map(function (k) { return [k, LX.ETATS[k].label]; });
  var OPTIONS_STATUT = Object.keys(LX.STATUTS).map(function (k) { return [k, LX.STATUTS[k].label]; });

  function panneauLecture(l) {
    var annees = anneesDe(l);
    var occ = (l.occupations || []).filter(function (o) { return o.statut !== 'rejete'; }).map(function (o) {
      var chefs = ((o.maisonnee || {}).familles || []).map(function (f) { return f.chef; }).filter(Boolean).join(' ; ');
      return '<li><a href="maison.html#' + esc(o.cle_maison || (o.annee + '-D' + o.division + '-M' + o.no_maison)) + '">' +
        esc(o.annee) + ' — maison ' + esc(o.no_maison) + '</a>' +
        (chefs ? '<span>' + esc(chefs) + '</span>' : '') + '</li>';
    }).join('');
    return (
      '<div class="pan-tete"><h3>' + esc(l.nom) + '</h3>' +
      '<span class="etat etat-' + esc(l.etat || 'inconnu') + '">' + esc((LX.ETATS[l.etat] || LX.ETATS.inconnu).court) + '</span></div>' +
      '<p class="pan-adresse">' + esc(l.adresse_actuelle || 'sans adresse actuelle') +
      (l.construit ? ' · construit ' + esc(l.construit) : '') + '</p>' +
      (l.personnages ? '<p class="pan-personnages">' + esc(l.personnages) + '</p>' : '') +
      (occ ? '<ul class="pan-occ">' + occ + '</ul>' : '<p class="pan-vide">Aucune maison de recensement rattachée' +
        (annees.length ? '' : ' pour l\'instant') + '.</p>') +
      '<div class="pan-actions"><a class="bouton" href="lieu.html#' + esc(l.id) + '">Ouvrir la fiche →</a></div>'
    );
  }

  function panneauAtelier(l) {
    var pos = l.coord
      ? l.coord.lat.toFixed(5) + ', ' + l.coord.lon.toFixed(5) + ' — ' + (LX.PRECISIONS[l.coord.precision] || l.coord.precision)
      : 'aucune position';

    var occs = (l.occupations || []).map(function (o, i) {
      var chefs = ((o.maisonnee || {}).familles || []).map(function (f) { return f.chef; }).filter(Boolean).join(' ; ');
      return '<div class="occ-edit"><div class="occ-edit-tete">' +
        '<b>' + esc(o.annee) + ' · D' + esc(o.division) + ' · maison ' + esc(o.no_maison) + '</b>' +
        '<select data-occ-statut="' + i + '">' + OPTIONS_STATUT.map(function (s) {
          return '<option value="' + s[0] + '"' + (o.statut === s[0] ? ' selected' : '') + '>' + esc(s[1]) + '</option>';
        }).join('') + '</select>' +
        '<button type="button" class="lien-danger" data-occ-retirer="' + i + '">retirer</button></div>' +
        (chefs ? '<span class="occ-edit-chefs">' + esc(chefs) + '</span>' : '') +
        '<input type="text" data-occ-motif="' + i + '" value="' + esc(o.motif || '') + '" placeholder="motif du rattachement…"></div>';
    }).join('');

    var resultats = etat.resultats.map(function (m) {
      return '<li><button type="button" data-ajouter-maison="' + esc(m[0]) + '">' +
        esc(m[1]) + ' · D' + esc(m[2]) + ' · maison ' + esc(m[3]) + '</button>' +
        '<span>' + esc(m[4]) + ' — ' + esc(m[5]) + ' pers.</span></li>';
    }).join('');

    var notes = (l.notes || []).map(function (n, i) {
      return '<div class="note-edit"><span class="qual">' + esc(n.auteur || '') + (n.date ? ' · ' + esc(n.date) : '') +
        '<button type="button" class="lien-danger" data-note-retirer="' + i + '">retirer</button></span>' +
        '<textarea rows="3" data-note-texte="' + i + '">' + esc(n.texte || '') + '</textarea></div>';
    }).join('');

    var alt = (l.adresses_anciennes || []).map(function (a, i) {
      return '<span class="puce">' + esc(a) + '<button type="button" data-alt-retirer="' + i + '">×</button></span>';
    }).join('');

    var photos = (etat.photosLocales[l.id] || []).map(function (p) {
      return '<figure class="ph-edit"><img src="' + esc(p.thumb) + '" alt="">' +
        '<input type="text" data-photo-legende="' + esc(p.id) + '" value="' + esc(p.caption || '') + '" placeholder="légende…">' +
        '<span class="ph-nom">' + esc(p.nom) + '</span>' +
        '<span class="ph-actions"><button type="button" data-photo-telecharger="' + esc(p.id) + '">télécharger</button>' +
        '<button type="button" class="lien-danger" data-photo-retirer="' + esc(p.id) + '">retirer</button></span></figure>';
    }).join('');
    var versees = (l.photos || []).map(function (p) {
      return '<figure class="ph-edit ph-versee"><img src="' + esc(p.fichier) + '" alt=""><span class="ph-nom">' + esc(p.fichier) + '</span></figure>';
    }).join('');

    var c = l.cadastre || {};

    return (
      '<div class="pan-tete"><h3>' + esc(l.nom) + '</h3><code>' + esc(l.id) + '</code></div>' +
      '<p class="pan-position"><b>Position</b> ' + esc(pos) +
      '<br><span class="pan-aide">Glissez le repère sur la carte pour la corriger — le point passe alors en « posée à la main ».</span></p>' +

      '<div class="pan-grille">' +
      champ(l, 'nom', 'Nom du lieu') +
      champ(l, 'adresse_actuelle', 'Adresse actuelle', { placeholder: 'vide si le lieu a disparu' }) +
      champ(l, 'voie', 'Voie') +
      champ(l, 'etat', 'État', { options: OPTIONS_ETAT }) +
      champ(l, 'construit', 'Construit', { placeholder: 'v.1878' }) +
      champ(l, 'disparu', 'Disparu', { placeholder: '1935' }) +
      champ(l, 'source', 'Source de la fiche') +
      '</div>' +
      champ(l, 'designe_aujourdhui', "Ce qu'on trouve aujourd'hui à cet endroit", { zone: true }) +
      champ(l, 'personnages', 'Personnes associées', { zone: true }) +

      '<h4>Maisons de recensement rattachées</h4>' +
      (occs || '<p class="pan-vide">Aucune pour l\'instant.</p>') +
      '<div class="occ-recherche">' +
      '<div class="occ-recherche-champs">' +
      '<select id="occ-annee"><option value="">toutes années</option><option value="1871">1871</option><option value="1881">1881</option><option value="1891">1891</option></select>' +
      '<input type="search" id="occ-q" placeholder="chercher un chef de ménage : « Benson »…">' +
      '</div>' +
      (resultats ? '<ul class="occ-resultats">' + resultats + '</ul>' : '<p class="pan-aide">Tapez un nom : les maisons du recensement où il tient le ménage apparaîtront ici.</p>') +
      '</div>' +

      '<h4>Notes du chercheur <span class="pan-aide">— elles se lisent à la suite du texte de la source, jamais à sa place</span></h4>' +
      notes +
      '<button type="button" class="bouton" id="ajouter-note">+ Ajouter une note</button>' +

      '<h4>Autres adresses (anciens numéros, anciens noms de rue)</h4>' +
      '<div class="puces">' + alt + '</div>' +
      '<div class="ligne-ajout"><input type="text" id="alt-nouvelle" placeholder="ex. 1411, rue Commerciale"><button type="button" class="bouton" id="ajouter-alt">Ajouter</button></div>' +

      '<h4>Cadastre</h4>' +
      '<div class="pan-grille">' +
      '<label class="ch"><span>N° de lot</span><input type="text" data-cadastre="lot" value="' + esc(c.lot || '') + '"></label>' +
      '<label class="ch"><span>Lot — année</span><input type="text" data-cadastre="lot_annee" value="' + esc(c.lot_annee || c.lotAnnee || '') + '"></label>' +
      '<label class="ch"><span>Goad 1876 — feuillet</span><input type="text" data-cadastre="goad_feuillet" value="' + esc(c.goad_feuillet || c.goadFeuillet || '') + '"></label>' +
      '<label class="ch"><span>Goad 1876 — n° d\'enr.</span><input type="text" data-cadastre="goad_no" value="' + esc(c.goad_no || c.goadNo || '') + '"></label>' +
      '</div>' +

      '<h4>Photographies</h4>' +
      '<div class="galerie-edit">' + versees + photos + '</div>' +
      '<label class="bouton bouton-fichier">+ Photo<input type="file" accept="image/*" id="photo-fichier" hidden></label>' +
      '<p class="pan-aide">Les photos ajoutées ici restent dans ce navigateur. « Télécharger » donne le fichier à déposer dans <code>assets/photos/</code> ; la fiche l\'affichera pour tout le monde une fois versée.</p>' +

      '<div class="pan-actions">' +
      '<a class="bouton" href="lieu.html#' + esc(l.id) + '">Ouvrir la fiche →</a>' +
      (l._local ? '<button type="button" class="bouton lien-danger" id="oublier">Oublier mes modifications locales</button>' : '') +
      '</div>'
    );
  }

  function rendrePanneau() {
    var pan = document.getElementById('panneau');
    var l = etat.selection ? parId(etat.selection) : null;
    if (!l) {
      pan.className = 'carte-panneau';
      pan.innerHTML = '<p class="pan-vide">Choisissez un point sur la carte' +
        (etat.atelier ? ', ou posez-en un nouveau avec « + Poser un lieu ».' : ' pour voir qui y a vécu.') + '</p>';
      return;
    }
    pan.className = 'carte-panneau' + (etat.atelier ? ' en-atelier' : '');
    pan.innerHTML = etat.atelier ? panneauAtelier(l) : panneauLecture(l);
  }

  function selectionner(id, centrer) {
    etat.selection = id;
    etat.resultats = [];
    if (etat.atelier) dessinerMarqueurs(); // déplace la poignée sur le lieu choisi
    else surligner();
    rendrePanneau();
    rendreListe();
    var l = parId(id);
    if (centrer && l && l.coord && carte) carte.setView([l.coord.lat, l.coord.lon], Math.max(carte.getZoom(), 17));
    if (location.hash !== '#l-' + id) history.replaceState(null, '', '#l-' + id);
  }

  // ── liste ────────────────────────────────────────────────────────────────

  function rendreListe() {
    var frise = document.getElementById('frise');
    var liste = etat.lieux.filter(visible).slice().sort(function (a, b) {
      var va = a.voie || 'zzz', vb = b.voie || 'zzz';
      if (va !== vb) return va === 'chemin du Fleuve' ? -1 : vb === 'chemin du Fleuve' ? 1 : va.localeCompare(vb, 'fr');
      return numeroDe(a.adresse_actuelle) - numeroDe(b.adresse_actuelle);
    });
    if (!liste.length) {
      frise.innerHTML = '<p class="vide">Aucun lieu ne répond à ce filtre.</p>';
      return;
    }
    frise.innerHTML = liste.map(function (l) {
      var occ = (l.occupations || []).filter(function (o) { return o.statut !== 'rejete'; }).map(function (o) {
        return '<a href="maison.html#' + esc(o.cle_maison || (o.annee + '-D' + o.division + '-M' + o.no_maison)) + '" class="conf-' + esc(o.confiance || 'moyenne') + '" title="' + esc(o.motif) + '">' +
          esc(o.annee) + ' · D' + esc(o.division) + ' · maison ' + esc(o.no_maison) + ' · ' + esc((LX.STATUTS[o.statut] || {}).label || o.statut) + '</a>';
      }).join('');
      var src = l.resume_source && l.resume_source.texte ? l.resume_source.texte : l.resume;
      return '<div class="point-carte' + (l.id === etat.selection ? ' point-actif' : '') + '" id="pt-' + esc(l.id) + '">' +
        '<div class="adresse">' + esc(l.adresse_actuelle || 'sans adresse actuelle') +
        (l.construit ? ' · ' + esc(l.construit) : '') + ' ' +
        '<span class="etat etat-' + esc(l.etat || 'inconnu') + '">' + esc((LX.ETATS[l.etat] || LX.ETATS.inconnu).court) + '</span></div>' +
        '<h3><a href="lieu.html#' + esc(l.id) + '">' + esc(l.nom) + '</a></h3>' +
        (l.personnages ? '<p class="personnages">' + esc(l.personnages) + '</p>' : '') +
        (src ? '<p class="resume">' + esc(src) + '</p>' : '') +
        ((l.notes || []).length ? '<p class="resume note-suite">' + esc(l.notes[l.notes.length - 1].texte) + '</p>' : '') +
        '<div class="rattachements">' + occ +
        (l.coord ? '<button type="button" class="aller-carte" data-aller="' + esc(l.id) + '">Situer sur la carte</button>' : '') +
        '</div></div>';
    }).join('');
  }

  function majResume() {
    var n = etat.lieux.length;
    var places = etat.lieux.filter(function (l) { return l.coord; }).length;
    var releves = etat.lieux.filter(function (l) { return l.coord && l.coord.precision === 'releve'; }).length;
    var rattaches = etat.lieux.filter(function (l) { return anneesDe(l).length; }).length;
    var locaux = etat.lieux.filter(function (l) { return l._local; }).length;
    document.getElementById('resume-carte').innerHTML =
      n + ' lieux, dont ' + rattaches + ' rattachés à au moins une maison de recensement. ' +
      places + ' portent une position, ' + releves + ' ont été posés à la main.' +
      (locaux ? ' <b>' + locaux + ' modifié' + (locaux > 1 ? 's' : '') + ' dans ce navigateur et pas encore versé' + (locaux > 1 ? 's' : '') + ' au dépôt.</b>' : '');

    var aReplacer = places - releves;
    document.getElementById('avis-carte').innerHTML = aReplacer
      ? 'Les positions ne sont pas relevées : ' + aReplacer + ' des ' + places + ' points ont été posés par interpolation du numéro civique le long du chemin, et indiquent un secteur, pas un bâtiment. ' +
        'Beaucoup de ces maisons ont d\'ailleurs été démolies ou renumérotées — leur adresse d\'aujourd\'hui ne désigne plus le même bâti. ' +
        'Le mode Atelier permet de replacer chaque point à la main ; un point corrigé se dessine plein.'
      : 'Toutes les positions ont été posées à la main.';
  }

  // ── barre d'atelier ──────────────────────────────────────────────────────

  function rendreBarreAtelier() {
    var existante = document.getElementById('barre-atelier');
    if (existante) existante.remove();
    document.getElementById('bascule-atelier').classList.toggle('actif', etat.atelier);
    if (!etat.atelier) return;
    var barre = document.createElement('div');
    barre.id = 'barre-atelier';
    barre.className = 'barre-atelier';
    var locaux = Object.keys(LX.overlay()).length;
    barre.innerHTML =
      '<button type="button" class="bouton' + (etat.poser ? ' actif' : '') + '" id="poser-lieu">' +
      (etat.poser ? 'Cliquez sur la carte…' : '+ Poser un lieu') + '</button>' +
      '<button type="button" class="bouton" id="exporter-lieux">Télécharger data/lieux-data.js</button>' +
      '<span class="barre-note">' + locaux + ' lieu' + (locaux > 1 ? 'x' : '') + ' en travail local. ' +
      'Ils partent aussi dans la sauvegarde de l\'atelier (clé <code>suivi-lieux</code>).</span>';
    document.querySelector('.carte-outils').insertAdjacentElement('afterend', barre);
  }

  // ── événements ───────────────────────────────────────────────────────────

  function brancher() {
    document.getElementById('filtre-annees').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-annee]');
      if (!b) return;
      etat.filtre = b.dataset.annee;
      [].forEach.call(this.querySelectorAll('button'), function (x) { x.classList.toggle('actif', x === b); });
      dessinerMarqueurs();
      rendreListe();
    });

    var rech = document.getElementById('recherche-lieu');
    rech.addEventListener('input', function () {
      etat.q = this.value.trim().toLowerCase();
      dessinerMarqueurs();
      rendreListe();
    });

    document.getElementById('bascule-atelier').addEventListener('click', function () {
      etat.atelier = !etat.atelier;
      etat.poser = false;
      if (!etat.atelier) {
        finirCalage();
        // Un plan pas encore calé ne se montre qu'en atelier.
        plans.forEach(function (p) { if (!p.cale) masquerPlan(p.id); });
      }
      var url = location.pathname + (etat.atelier ? '?atelier=1' : '') + location.hash;
      history.replaceState(null, '', url);
      rendreBarreAtelier();
      dessinerMarqueurs();
      rendrePanneau();
      rendreControlePlans();
    });

    document.body.addEventListener('click', function (e) {
      var t = e.target;
      if (t.id === 'poser-lieu') { etat.poser = !etat.poser; rendreBarreAtelier(); return; }
      if (t.id === 'exporter-lieux') {
        LX.telecharger('lieux-data.js', LX.versFichierDonnees(etat.lieux), 'text/javascript');
        return;
      }
      var aller = t.closest && t.closest('[data-aller]');
      if (aller) {
        selectionner(aller.dataset.aller, true);
        document.querySelector('.carte-scene').scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    });

    // Le panneau d'atelier : un seul écouteur, la cible dit quoi faire.
    var pan = document.getElementById('panneau');
    pan.addEventListener('change', function (e) {
      var l = parId(etat.selection);
      if (!l) return;
      var t = e.target;
      if (t.dataset.champ) { appliquer(l.id, definirChamp(l, t.dataset.champ, t.value)); dessinerMarqueurs(); return; }
      if (t.dataset.cadastre) {
        var cad = Object.assign({}, l.cadastre || {});
        cad[t.dataset.cadastre] = t.value.trim();
        appliquer(l.id, { cadastre: cad });
        return;
      }
      if (t.dataset.occStatut !== undefined && t.dataset.occStatut !== '') {
        var occs = l.occupations.slice();
        occs[+t.dataset.occStatut] = Object.assign({}, occs[+t.dataset.occStatut], { statut: t.value });
        appliquer(l.id, { occupations: occs });
        dessinerMarqueurs(); rendrePanneau();
        return;
      }
      if (t.dataset.occMotif !== undefined && t.dataset.occMotif !== '') {
        var o2 = l.occupations.slice();
        o2[+t.dataset.occMotif] = Object.assign({}, o2[+t.dataset.occMotif], { motif: t.value });
        appliquer(l.id, { occupations: o2 });
        return;
      }
      if (t.dataset.noteTexte !== undefined && t.dataset.noteTexte !== '') {
        var n2 = l.notes.slice();
        n2[+t.dataset.noteTexte] = Object.assign({}, n2[+t.dataset.noteTexte], { texte: t.value });
        appliquer(l.id, { notes: n2 });
        return;
      }
      if (t.dataset.photoLegende) { LX.majPhoto(t.dataset.photoLegende, { caption: t.value }).then(rechargerPhotos); return; }
      if (t.id === 'photo-fichier' && t.files && t.files[0]) {
        LX.ajouterPhoto(l, t.files[0]).then(rechargerPhotos).catch(function () { alert('Image illisible.'); });
        return;
      }
    });

    pan.addEventListener('input', function (e) {
      if (e.target.id !== 'occ-q') return;
      chercher();
    });
    pan.addEventListener('change', function (e) {
      if (e.target.id !== 'occ-annee') return;
      chercher();
    });

    pan.addEventListener('click', function (e) {
      var l = parId(etat.selection);
      if (!l) return;
      var t = e.target;
      if (t.dataset.occRetirer !== undefined && t.dataset.occRetirer !== '') {
        var occs = l.occupations.filter(function (_, i) { return i !== +t.dataset.occRetirer; });
        appliquer(l.id, { occupations: occs }); dessinerMarqueurs(); rendrePanneau(); return;
      }
      if (t.dataset.ajouterMaison) { ajouterMaison(l, t.dataset.ajouterMaison); return; }
      if (t.id === 'ajouter-note') {
        var notes = (l.notes || []).concat([{ auteur: 'Patrick Blanchet', date: new Date().toISOString().slice(0, 10), texte: '' }]);
        appliquer(l.id, { notes: notes }); rendrePanneau();
        var zones = pan.querySelectorAll('[data-note-texte]');
        if (zones.length) zones[zones.length - 1].focus();
        return;
      }
      if (t.dataset.noteRetirer !== undefined && t.dataset.noteRetirer !== '') {
        appliquer(l.id, { notes: l.notes.filter(function (_, i) { return i !== +t.dataset.noteRetirer; }) });
        rendrePanneau(); return;
      }
      if (t.id === 'ajouter-alt') {
        var v = pan.querySelector('#alt-nouvelle').value.trim();
        if (!v) return;
        appliquer(l.id, { adresses_anciennes: (l.adresses_anciennes || []).concat([v]) });
        rendrePanneau(); return;
      }
      if (t.dataset.altRetirer !== undefined && t.dataset.altRetirer !== '') {
        appliquer(l.id, { adresses_anciennes: l.adresses_anciennes.filter(function (_, i) { return i !== +t.dataset.altRetirer; }) });
        rendrePanneau(); return;
      }
      if (t.dataset.photoTelecharger) {
        var ph = (etat.photosLocales[l.id] || []).filter(function (p) { return p.id === t.dataset.photoTelecharger; })[0];
        if (ph) telechargerPhoto(ph);
        return;
      }
      if (t.dataset.photoRetirer) { LX.retirerPhoto(t.dataset.photoRetirer).then(rechargerPhotos); return; }
      if (t.id === 'oublier') {
        if (!confirm('Oublier les modifications locales de ce lieu ? Ce qui a déjà été versé au dépôt est conservé.')) return;
        LX.oublierLieu(l.id);
        location.reload();
        return;
      }
    });
  }

  /* Un champ de position ne se saisit pas au clavier ici : on ne veut pas
     qu'une coordonnée tapée passe pour un relevé. */
  function definirChamp(l, cle, valeur) {
    var o = {};
    o[cle] = valeur.trim();
    return o;
  }

  function chercher() {
    var q = document.getElementById('occ-q');
    var an = document.getElementById('occ-annee');
    if (!q) return;
    etat.resultats = LX.chercherMaisons(etat.maisons, q.value, an ? an.value : '');
    var ul = document.querySelector('.occ-resultats');
    var html = etat.resultats.map(function (m) {
      return '<li><button type="button" data-ajouter-maison="' + esc(m[0]) + '">' +
        esc(m[1]) + ' · D' + esc(m[2]) + ' · maison ' + esc(m[3]) + '</button>' +
        '<span>' + esc(m[4]) + ' — ' + esc(m[5]) + ' pers.</span></li>';
    }).join('');
    if (ul) ul.innerHTML = html;
    else if (html) {
      var nouv = document.createElement('ul');
      nouv.className = 'occ-resultats';
      nouv.innerHTML = html;
      document.querySelector('.occ-recherche').appendChild(nouv);
    }
  }

  function ajouterMaison(l, cleM) {
    var m = etat.maisons.filter(function (x) { return x[0] === cleM; })[0];
    if (!m) return;
    if ((l.occupations || []).some(function (o) { return o.cle_maison === cleM || (o.annee === m[1] && o.division === m[2] && o.no_maison === m[3]); })) {
      alert('Cette maison est déjà rattachée à ce lieu.');
      return;
    }
    var occ = {
      annee: m[1], division: m[2], no_maison: m[3], cle_maison: cleM,
      statut: 'hypothese', confiance: '', origine: 'chercheur',
      motif: m[4], ajoute_le: new Date().toISOString().slice(0, 10),
      maisonnee: { cle: cleM, familles: [{ no_famille: '', chef: m[4], chef_id: '', effectif: m[5] }] }
    };
    appliquer(l.id, { occupations: (l.occupations || []).concat([occ]) });
    etat.resultats = [];
    dessinerMarqueurs();
    rendrePanneau();
  }

  function telechargerPhoto(ph) {
    var a = document.createElement('a');
    a.href = ph.thumb;
    a.download = ph.nom;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function rechargerPhotos() {
    return LX.photosLocales().then(function (p) {
      etat.photosLocales = p;
      rendrePanneau();
    });
  }

  // ── démarrage ────────────────────────────────────────────────────────────

  etat.photosLocales = {};
  initCarte();
  brancher();
  plans = LX.chargerPlans();
  brancherPlans();
  rendreControlePlans();

  Promise.all([LX.charger(), LX.chargerMaisons(), LX.photosLocales()]).then(function (r) {
    etat.lieux = r[0].lieux;
    etat.mis_a_jour = r[0].mis_a_jour;
    etat.maisons = r[1];
    etat.photosLocales = r[2];
    dessinerMarqueurs();
    rendreListe();
    majResume();
    rendreBarreAtelier();

    var h = location.hash;
    if (h.indexOf('#l-') === 0) selectionner(decodeURIComponent(h.slice(3)), true);
    else if (h.indexOf('#b-') === 0) selectionner(decodeURIComponent(h.slice(3)), true); // ancien lien de fiche de maison
    else rendrePanneau();

    // Cadrer sur ce qui est effectivement posé.
    var pts = etat.lieux.filter(function (l) { return l.coord; }).map(function (l) { return [l.coord.lat, l.coord.lon]; });
    if (pts.length && location.hash.indexOf('#l-') !== 0 && location.hash.indexOf('#b-') !== 0) {
      carte.fitBounds(L.latLngBounds(pts).pad(0.15));
    }
  }).catch(function () {
    document.getElementById('resume-carte').textContent = 'Les lieux n\'ont pas pu être chargés.';
    rendreBarreAtelier();
  });
})();
