// Frise du chemin du Fleuve — lit data/bussiere1990-data.js directement
// (comme filiation.html), pas de fragment généré : 38 entrées, quelques
// dizaines de Ko, inutile de préparer un lot séparé.
(function () {
  'use strict';

  var CONF_ORDRE = { forte: 0, moyenne: 1, faible: 2 };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function numeroDe(adresse) {
    var m = String(adresse || '').match(/\d+/);
    return m ? parseInt(m[0], 10) : Infinity;
  }

  var donnees = window.BUSSIERE_1990_DATA || [];
  var avecPropositions = donnees.filter(function (b) { return b.propositions && b.propositions.length; });
  var sansProposition = donnees.filter(function (b) { return !b.propositions || !b.propositions.length; });

  avecPropositions.sort(function (a, b) { return numeroDe(a.adresse) - numeroDe(b.adresse); });
  sansProposition.sort(function (a, b) { return numeroDe(a.adresse) - numeroDe(b.adresse); });

  var frise = document.getElementById('frise');
  frise.innerHTML = avecPropositions.map(function (b) {
    var props = b.propositions.slice().sort(function (x, y) {
      return (CONF_ORDRE[x.confiance] ?? 3) - (CONF_ORDRE[y.confiance] ?? 3);
    });
    var rattachements = props.map(function (p) {
      var cle = p.annee + '-D' + p.division + '-M' + p.no_maison;
      return (
        '<a class="conf-' + esc(p.confiance) + '" href="maison.html#' + esc(cle) + '" title="' + esc(p.motif) + '">' +
        esc(p.annee) + ' · D' + esc(p.division) + ' · maison ' + esc(p.no_maison) + ' · ' + esc(p.confiance) +
        '</a>'
      );
    }).join('');
    return (
      '<div class="point-carte" id="b-' + esc(b.id) + '">' +
      '<div class="adresse">' + esc(b.adresse) + (b.annee ? ' · ' + esc(b.annee) : '') + '</div>' +
      '<h3>' + esc(b.titre) + '</h3>' +
      (b.personnages ? '<p class="personnages">' + esc(b.personnages) + '</p>' : '') +
      (b.resume ? '<p class="resume">' + esc(b.resume) + '</p>' : '') +
      '<div class="rattachements">' + rattachements + '</div>' +
      '</div>'
    );
  }).join('');

  var liste = document.getElementById('non-rattaches');
  liste.innerHTML = sansProposition.map(function (b) {
    return '<li><span class="adresse">' + esc(b.adresse) + '</span>' + esc(b.titre) + '</li>';
  }).join('');

  // Ouverture depuis une fiche de maison (#b-<id>) : faire défiler jusqu'au
  // point et le signaler brièvement.
  if (location.hash.indexOf('#b-') === 0) {
    var cible = document.getElementById(location.hash.slice(1));
    if (cible) {
      cible.scrollIntoView({ block: 'center' });
      cible.style.borderColor = 'var(--madder)';
      cible.style.borderWidth = '2px';
    }
  }
})();
