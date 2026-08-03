// Fiche de maison — routée par le fragment d'URL (#1871-D2-M78).
(function () {
  'use strict';

  var NOMS_TABLEAUX = {
    foncier: 'Tableau 3 — Propriété foncière',
    terres: 'Tableau 4 — Terres cultivées',
    animaux: 'Tableau 5 — Animaux et production',
    etablissements: 'Tableau 6 — Établissements industriels',
    forets: 'Tableau 7 — Produits des forêts',
    navigation: 'Tableau 8 — Navigation et pêcheries',
    deces: 'Tableau 2 — Décès des 12 derniers mois'
  };
  var CHAMPS_IGNORES = { annee: 1, division: 1, page: 1, ligne: 1, ref_personne: 1, ref_maison: 1, remarque: 1 };

  var cache = {};
  var contenu = document.getElementById('contenu');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function chargerLot(cleAD) {
    if (cache[cleAD]) return Promise.resolve(cache[cleAD]);
    return fetch('fiches/maison/' + cleAD + '.json')
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (lot) { cache[cleAD] = lot; return lot; });
  }

  function ligneAsPhrase(ligne) {
    var bits = [];
    for (var k in ligne) {
      if (CHAMPS_IGNORES[k] || ligne[k] === '' || ligne[k] == null) continue;
      bits.push(k.replace(/_/g, ' ') + ' : ' + ligne[k]);
    }
    return bits.join(', ');
  }

  function rendreFamille(f, famille) {
    var entetes = famille.entetes;
    var thead = '<tr><th class="ligne-no">L.</th>' + entetes.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr>';
    var lignes = famille.membres.map(function (m) {
      var tds = m.valeurs.map(function (v, i) {
        if (v === '✓') return '<td class="coche">✓</td>';
        if (i === 0) return '<td><a href="personne.html#' + esc(m.id) + '">' + esc(v) + '</a></td>';
        return '<td>' + esc(v) + '</td>';
      }).join('');
      return '<tr class="' + (m.chef ? 'chef' : '') + '"><td class="ligne-no">' + esc(m.ligne) + '</td>' + tds + '</tr>';
    }).join('');
    var premiere = famille.membres[0], derniere = famille.membres[famille.membres.length - 1];
    var titrePage = premiere ? ('lignes ' + esc(premiere.ligne) + ' à ' + esc(derniere.ligne)) : '';

    var marginale = famille.remarque_nom
      ? '<div class="marginale"><b>Renvoi de nom</b>' + esc(famille.remarque_nom) + '</div>' : '';

    var devenir = '';
    if (famille.devenir && famille.devenir.length) {
      devenir = (
        '<h4 style="margin:18px 0 4px;font-size:17px">Le devenir de la maisonnée</h4>' +
        famille.devenir.map(function (e) {
          return '<div class="evenement"><span class="qual">' + esc(e.type === 'veuvage' ? 'Veuvage' : 'Ménage continu') + ' · confiance ' + esc(e.confiance) + '</span>' + esc(e.resume) + '</div>';
        }).join('')
      );
    }

    return (
      '<section class="bloc"><h3 class="bloc-titre">Famille ' + esc(famille.no_famille) + (famille.chef ? ' — ' + esc(famille.chef) : '') + '</h3>' +
      (titrePage ? '<p class="bloc-note">' + titrePage + '</p>' : '') +
      '<div class="registre"><table><thead>' + thead + '</thead><tbody>' + lignes + '</tbody></table></div>' +
      marginale + devenir +
      '</section>'
    );
  }

  function rendreRenvois(f) {
    var tables = Object.keys(f.renvois || {});
    if (!tables.length) return '';
    var blocs = tables.map(function (nom) {
      var lignes = f.renvois[nom].map(function (l) { return '<li>' + esc(ligneAsPhrase(l)) + '</li>'; }).join('');
      return '<div class="marginale"><b>' + esc(NOMS_TABLEAUX[nom] || nom) + '</b><ul class="indices" style="columns:1">' + lignes + '</ul></div>';
    }).join('');
    return (
      '<section class="bloc"><h3 class="bloc-titre">Renvois aux tableaux annexes</h3>' +
      '<p class="bloc-note">Foncier, terres, animaux, forêts, navigation, établissements, décès — quand la maison y figure.</p>' +
      blocs + '</section>'
    );
  }

  function rendre(id, f) {
    document.title = 'Maison ' + f.no_maison + ' (' + f.annee + ') — Saint-Romuald, les gens du Fleuve';
    var nPersonnes = f.familles.reduce(function (s, fam) { return s + fam.membres.length; }, 0);
    var sousTitre = f.familles.length + ' famille' + (f.familles.length > 1 ? 's y vivent' : ' y vit') +
      ' en ' + f.annee + ' : ' + nPersonnes + ' personne' + (nPersonnes > 1 ? 's' : '') + '.';
    var logementTxt = '';
    if (f.logement && f.logement.materiau) {
      logementTxt = ' Logement en ' + f.logement.materiau.toLowerCase() +
        (f.logement.etages ? ', ' + f.logement.etages + ' étage(s)' : '') +
        (f.logement.chambres ? ', ' + f.logement.chambres + ' pièce(s)' : '') + '.';
    }
    contenu.innerHTML = (
      '<span class="etiquette">Fiche de maison · recensement de ' + esc(f.annee) + ', division ' + esc(f.division) + '</span>' +
      '<h2 class="titre-vue">Maison ' + esc(f.no_maison) + '</h2>' +
      '<p class="sous-titre">' + esc(sousTitre) + esc(logementTxt) + '</p>' +
      f.familles.map(function (fam) { return rendreFamille(f, fam); }).join('') +
      rendreRenvois(f) +
      '<section class="bloc"><h3 class="bloc-titre">Adresse actuelle et cartographie</h3>' +
      '<div class="vide">Le rattachement aux adresses du chemin du Fleuve, les adresses alternatives et la photographie de la maison s\'affichent ici — puis sur une carte de la paroisse, maison par maison, année par année.</div></section>'
    );
  }

  function rendreErreur(msg) {
    contenu.innerHTML = '<p class="erreur">' + esc(msg) + '</p><p><a href="index.html">← Retour à la recherche</a></p>';
  }

  function charger() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) {
      contenu.innerHTML = (
        '<span class="etiquette">Fiche de maison</span>' +
        '<h2 class="titre-vue">Aucune maison sélectionnée</h2>' +
        '<p class="sous-titre">Ouvrez une maison depuis une fiche de personne, ou essayez <a href="maison.html#1871-D2-M78">la maison 78, 1871</a>.</p>'
      );
      return;
    }
    var m = id.match(/^(\d{4})-D(\d)-M/);
    if (!m) { rendreErreur('Identifiant de maison invalide : ' + id); return; }
    contenu.innerHTML = '<p class="chargement">Chargement de la fiche…</p>';
    chargerLot(m[1] + '-D' + m[2])
      .then(function (lot) {
        var f = lot[id];
        if (!f) { rendreErreur('Maison introuvable : ' + id); return; }
        rendre(id, f);
      })
      .catch(function () { rendreErreur('La fiche n\'a pas pu être chargée.'); });
  }

  window.addEventListener('hashchange', charger);
  charger();
})();
