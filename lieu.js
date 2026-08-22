// Fiche de lieu — routée par le fragment d'URL (#manoir-longwood).
//
// La fiche répond à une question que ni la fiche de personne ni la fiche de
// maison ne savaient poser : « qu'y a-t-il eu ici, et qui y a vécu ? » Elle
// tient donc trois choses côte à côte, sans les mélanger :
//   1. la position au sol, avec sa précision affichée ;
//   2. l'occupation année par année, qui renvoie aux maisons du recensement ;
//   3. le texte — celui de la source d'un côté, celui du chercheur de l'autre.
(function () {
  'use strict';

  var esc = LX.esc;
  var contenu = document.getElementById('contenu');
  var carteMini = null;

  function badgeEtat(l) {
    var e = LX.ETATS[l.etat] || LX.ETATS.inconnu;
    return '<span class="etat etat-' + esc(l.etat || 'inconnu') + '">' + esc(e.court) + '</span>';
  }

  function sousTitre(l) {
    var bits = [];
    if (l.adresse_actuelle) bits.push(l.adresse_actuelle);
    else bits.push('sans adresse actuelle');
    if (l.construit) bits.push('construit ' + l.construit);
    if (l.disparu) bits.push('disparu ' + l.disparu);
    if (l.voie && (l.adresse_actuelle || '').indexOf(l.voie) === -1) bits.push(l.voie);
    return bits.join(' · ');
  }

  // ── position ─────────────────────────────────────────────────────────────

  function blocCarte(l) {
    if (!l.coord) {
      return '<section class="bloc"><h3 class="bloc-titre">Position</h3>' +
        '<div class="vide">Aucune position n\'a encore été posée pour ce lieu. ' +
        '<a href="carte.html?atelier=1#l-' + esc(l.id) + '">L\'ouvrir dans l\'atelier de la carte</a> pour l\'y placer.</div></section>';
    }
    var p = l.coord.precision || 'inconnu';
    var avis = p === 'releve'
      ? 'Point posé à la main' + (l.coord.pose_par ? ' par ' + l.coord.pose_par : '') + (l.coord.pose_le ? ', le ' + l.coord.pose_le : '') + '.'
      : 'Position approximative — ' + (LX.PRECISIONS[p] || p) + '. Elle indique le secteur, pas le bâtiment.';
    return (
      '<section class="bloc"><h3 class="bloc-titre">Position</h3>' +
      '<div class="carte-mini" id="carte-mini"></div>' +
      '<p class="bloc-note precision-' + esc(p) + '">' + esc(avis) +
      ' <span class="coord-brut">' + l.coord.lat.toFixed(5) + ', ' + l.coord.lon.toFixed(5) + '</span>' +
      ' · <a href="carte.html#l-' + esc(l.id) + '">Voir sur la carte du chemin du Fleuve →</a></p>' +
      '</section>'
    );
  }

  function poserCarteMini(l) {
    if (!l.coord || !window.L) return;
    var noeud = document.getElementById('carte-mini');
    if (!noeud) return;
    if (carteMini) { carteMini.remove(); carteMini = null; }
    carteMini = L.map(noeud, { scrollWheelZoom: false, attributionControl: true })
      .setView([l.coord.lat, l.coord.lon], l.coord.precision === 'releve' ? 18 : 16);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(carteMini);
    var approx = l.coord.precision !== 'releve';
    L.circleMarker([l.coord.lat, l.coord.lon], {
      radius: 9, color: '#A4343A', weight: 2,
      fillColor: '#A4343A', fillOpacity: approx ? 0.12 : 0.75,
      dashArray: approx ? '3 3' : null
    }).addTo(carteMini).bindPopup(esc(l.nom));
    if (approx) {
      // Le rayon dit ce que le point ne dit pas : l'incertitude réelle.
      L.circle([l.coord.lat, l.coord.lon], { radius: 140, color: '#6B6357', weight: 1, dashArray: '4 4', fill: false }).addTo(carteMini);
    }
  }

  // ── occupation ───────────────────────────────────────────────────────────

  function ligneMaisonnee(occ) {
    if (!occ.maisonnee) {
      return '<p class="occ-vide">Maison ' + esc(occ.no_maison) + ' introuvable dans le recensement de ' +
        esc(occ.annee) + ', division ' + esc(occ.division) + '.</p>';
    }
    return occ.maisonnee.familles.map(function (f) {
      var qui = f.chef_id
        ? '<a href="personne.html#' + esc(f.chef_id) + '">' + esc(f.chef) + '</a>'
        : esc(f.chef || 'chef non identifié');
      var detail = [];
      if (f.chef_profession) detail.push(f.chef_profession.toLowerCase());
      if (f.chef_age) detail.push(f.chef_age + ' ans');
      detail.push(f.effectif + ' personne' + (f.effectif > 1 ? 's' : '') + ' au foyer');
      return '<p class="occ-famille"><b>' + qui + '</b> <span class="occ-detail">' + esc(detail.join(' · ')) + '</span></p>';
    }).join('');
  }

  function blocOccupations(l) {
    var occs = (l.occupations || []).slice();
    var retenues = occs.filter(function (o) { return o.statut !== 'rejete'; });
    var ecartees = occs.filter(function (o) { return o.statut === 'rejete'; });

    var corps;
    if (!retenues.length) {
      corps = '<div class="vide">Aucune maison de recensement n\'est encore rattachée à ce lieu. ' +
        'Dans <a href="carte.html?atelier=1#l-' + esc(l.id) + '">l\'atelier de la carte</a>, on peut la chercher par le nom du chef de ménage.</div>';
    } else {
      corps = '<div class="occupations">' + retenues.map(function (occ) {
        var st = LX.STATUTS[occ.statut] || { label: occ.statut };
        return (
          '<article class="occ" id="occ-' + esc(occ.annee) + '-' + esc(occ.no_maison) + '">' +
          '<div class="occ-annee">' + esc(occ.annee) + '</div>' +
          '<div class="occ-corps">' +
          '<div class="occ-tete">' +
          '<a class="occ-maison" href="maison.html#' + esc(occ.cle_maison || (occ.annee + '-D' + occ.division + '-M' + occ.no_maison)) + '">' +
          'Maison ' + esc(occ.no_maison) + ' · division ' + esc(occ.division) + '</a>' +
          '<span class="statut statut-' + esc(occ.statut) + '">' + esc(st.label) +
          (occ.confiance ? ' · ' + esc(occ.confiance) : '') + '</span>' +
          (occ.origine === 'source' ? '<span class="origine">d\'après la source</span>' : '') +
          '</div>' +
          ligneMaisonnee(occ) +
          (occ.motif ? '<p class="occ-motif">' + esc(occ.motif) + '</p>' : '') +
          '</div></article>'
        );
      }).join('') + '</div>';
    }

    // Une hypothèse écartée n'est pas un déchet : c'est une question déjà
    // tranchée, et la montrer évite qu'elle soit reposée dans deux ans.
    if (ecartees.length) {
      corps += '<details class="ecartees"><summary>' + ecartees.length + ' rapprochement' +
        (ecartees.length > 1 ? 's écartés' : ' écarté') + '</summary>' +
        ecartees.map(function (occ) {
          return '<p class="occ-motif"><b>' + esc(occ.annee) + ', maison ' + esc(occ.no_maison) +
            '</b> — ' + esc(occ.motif || 'sans motif consigné') + '</p>';
        }).join('') + '</details>';
    }

    return '<section class="bloc"><h3 class="bloc-titre">Qui a habité ici</h3>' +
      '<p class="bloc-note">Chaque rattachement relie ce lieu à une maison d\'un recensement. Le statut dit à quel point il est établi.</p>' +
      corps + '</section>';
  }

  // ── textes ───────────────────────────────────────────────────────────────

  function blocTextes(l) {
    var parties = '';
    if (l.personnages) parties += '<p class="personnages">' + esc(l.personnages) + '</p>';
    if (l.resume_source && l.resume_source.texte) {
      parties += '<blockquote class="cite-source">' + esc(l.resume_source.texte) +
        '<cite>' + esc(l.resume_source.auteur) + '</cite></blockquote>';
    }
    if (l.designe_aujourdhui) {
      parties += '<p class="aujourdhui"><b>Aujourd\'hui</b> — ' + esc(l.designe_aujourdhui) + '</p>';
    }
    if (l.resume) parties += '<p class="resume">' + esc(l.resume) + '</p>';

    var notes = (l.notes || []).map(function (n) {
      return '<div class="note-chercheur"><span class="qual">' + esc(n.auteur || 'chercheur') +
        (n.date ? ' · ' + esc(n.date) : '') + '</span>' + esc(n.texte) + '</div>';
    }).join('');

    if (!parties && !notes) return '';
    return (
      '<section class="bloc"><h3 class="bloc-titre">Ce que l\'on sait du lieu</h3>' +
      parties +
      (notes ? '<h4 class="sous-bloc">À la suite de la source — notes du chercheur</h4>' + notes : '') +
      '</section>'
    );
  }

  function blocPhotos(l, locales) {
    var versees = (l.photos || []).map(function (p) {
      return '<figure class="photo"><img src="' + esc(p.fichier) + '" alt="' + esc(p.legende || l.nom) + '" loading="lazy">' +
        '<figcaption>' + esc(p.legende || '') +
        (p.credit ? '<span class="credit">' + esc(p.credit) + '</span>' : '') + '</figcaption></figure>';
    });
    var enAttente = (locales || []).map(function (p) {
      return '<figure class="photo photo-locale"><img src="' + esc(p.thumb) + '" alt="' + esc(p.caption || l.nom) + '">' +
        '<figcaption>' + esc(p.caption || '') +
        '<span class="credit">Ajoutée le ' + esc(p.ajoute) + ' — pas encore versée au dépôt</span></figcaption></figure>';
    });
    if (!versees.length && !enAttente.length) return '';
    return '<section class="bloc"><h3 class="bloc-titre">Photographies</h3>' +
      '<div class="galerie">' + versees.join('') + enAttente.join('') + '</div></section>';
  }

  function blocDossier(l) {
    var lignes = [];
    if ((l.adresses_anciennes || []).length) {
      lignes.push('<b>Adresses anciennes</b>' + l.adresses_anciennes.map(esc).join(' · '));
    }
    var c = l.cadastre || {};
    var cad = [];
    if (c.lot) cad.push('lot ' + c.lot + (c.lotAnnee || c.lot_annee ? ' (' + (c.lotAnnee || c.lot_annee) + ')' : ''));
    if (c.goadFeuillet || c.goad_feuillet) cad.push('Goad 1876, feuillet ' + (c.goadFeuillet || c.goad_feuillet));
    if (c.goadNo || c.goad_no) cad.push('n° d\'enregistrement ' + (c.goadNo || c.goad_no));
    if (cad.length) lignes.push('<b>Cadastre</b>' + esc(cad.join(' · ')));
    if ((l.documents || []).length) {
      lignes.push('<b>Documents</b>' + l.documents.map(function (d) { return esc(d.titre); }).join(' · '));
    }
    if (l.source) lignes.push('<b>Source de la fiche</b>' + esc(l.source));
    if (!lignes.length) return '';
    return '<section class="bloc"><h3 class="bloc-titre">Dossier</h3>' +
      lignes.map(function (x) { return '<div class="marginale">' + x + '</div>'; }).join('') + '</section>';
  }

  // ── assemblage ───────────────────────────────────────────────────────────

  function rendre(l, locales) {
    document.title = l.nom + ' — Saint-Romuald, les gens du Fleuve';
    var annees = (l.occupations || []).filter(function (o) { return o.statut !== 'rejete'; })
      .map(function (o) { return o.annee; });
    var uniques = annees.filter(function (a, i) { return annees.indexOf(a) === i; });

    contenu.innerHTML = (
      '<span class="etiquette">Fiche de lieu · ' + esc(l.voie || 'Saint-Romuald') + '</span>' +
      '<h2 class="titre-vue">' + esc(l.nom) + ' ' + badgeEtat(l) + '</h2>' +
      '<p class="sous-titre">' + esc(sousTitre(l)) +
      (uniques.length ? ' · recensé ici en ' + esc(uniques.join(', ')) : '') + '</p>' +
      (l._local ? '<p class="avis-local">Cette fiche contient du travail enregistré dans ce navigateur et pas encore versé au dépôt' +
        (l._modifie_le ? ' (modifié le ' + esc(l._modifie_le) + ')' : '') + '.</p>' : '') +
      '<div class="actions-fiche">' +
      '<button class="bouton" onclick="window.print()">Imprimer / exporter en PDF</button>' +
      '<a class="bouton" href="carte.html#l-' + esc(l.id) + '">Voir sur la carte</a>' +
      '<a class="bouton bouton-atelier" href="carte.html?atelier=1#l-' + esc(l.id) + '">Corriger ce lieu ✎</a>' +
      '</div>' +
      blocCarte(l) +
      blocOccupations(l) +
      blocTextes(l) +
      blocPhotos(l, locales) +
      blocDossier(l)
    );
    poserCarteMini(l);
  }

  function rendreErreur(msg) {
    contenu.innerHTML = '<p class="erreur">' + esc(msg) + '</p><p><a href="carte.html">← Retour à la carte</a></p>';
  }

  function charger() {
    var id = decodeURIComponent(location.hash.slice(1));
    contenu.innerHTML = '<p class="chargement">Chargement de la fiche…</p>';
    Promise.all([LX.charger(), LX.photosLocales()]).then(function (r) {
      var lieux = r[0].lieux, locales = r[1];
      if (!id) {
        contenu.innerHTML =
          '<span class="etiquette">Fiche de lieu</span>' +
          '<h2 class="titre-vue">Aucun lieu sélectionné</h2>' +
          '<p class="sous-titre">Choisissez un lieu sur <a href="carte.html">la carte du chemin du Fleuve</a>, ou essayez ' +
          '<a href="lieu.html#manoir-longwood">le manoir Longwood</a>.</p>';
        return;
      }
      var l = lieux.filter(function (x) { return x.id === id; })[0];
      if (!l) { rendreErreur('Lieu introuvable : ' + id); return; }
      rendre(l, locales[l.id] || []);
    }).catch(function () { rendreErreur('La fiche n\'a pas pu être chargée.'); });
  }

  window.addEventListener('hashchange', charger);
  charger();
})();
