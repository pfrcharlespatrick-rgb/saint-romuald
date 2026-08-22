// Statistiques — lit stats-donnees.json (précalculé par outils/generer-site.mjs).
(function () {
  'use strict';

  var bulle = document.getElementById('infobulle');
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function survol(el, texte) {
    el.title = texte; // accès clavier et tactile, en plus de l'infobulle
    el.addEventListener('mousemove', function (e) {
      bulle.style.display = 'block';
      bulle.textContent = texte;
      bulle.style.left = Math.min(e.clientX + 14, window.innerWidth - 250) + 'px';
      bulle.style.top = (e.clientY + 14) + 'px';
    });
    el.addEventListener('mouseleave', function () { bulle.style.display = 'none'; });
  }
  function fr(n) { return n.toLocaleString('fr-CA'); }

  fetch('stats-donnees.json').then(function (r) { return r.json(); }).then(function (s) {
    // ---------- tuiles par année ----------
    var tuilesAnnees = document.getElementById('tuiles-annees');
    ['1871', '1881', '1891'].forEach(function (an) {
      var a = s.par_annee[an];
      var div = document.createElement('div');
      div.className = 'tuile';
      div.innerHTML = '<div class="gros">' + fr(a.personnes) + '</div><div class="quoi">' + an + '</div>' +
        '<div class="detail">' + fr(a.maisons) + ' maisons, ' + fr(a.familles) + ' familles</div>';
      tuilesAnnees.appendChild(div);
    });

    // ---------- pyramide des âges ----------
    var py = s.pyramide_1891;
    document.getElementById('sous-pyramide').textContent =
      fr(py.total) + ' personnes d\'âge connu, par tranches de cinq ans — division 1 seule, la division 2 restant à dépouiller';
    var maxP = Math.max.apply(null, py.hommes.concat(py.femmes));
    var elPy = document.getElementById('pyramide');
    for (var i = py.tranches.length - 1; i >= 0; i--) {
      (function (i) {
        var r = document.createElement('div');
        r.className = 'py-rang';
        r.innerHTML =
          '<div class="py-piste gauche"><i style="width:' + (py.hommes[i] / maxP * 100) + '%"></i></div>' +
          '<div class="tranche">' + esc(py.tranches[i]) + '</div>' +
          '<div class="py-piste droite"><i style="width:' + (py.femmes[i] / maxP * 100) + '%"></i></div>';
        elPy.appendChild(r);
        survol(r.querySelector('.gauche i'), py.tranches[i] + ' ans — ' + fr(py.hommes[i]) + ' hommes');
        survol(r.querySelector('.droite i'), py.tranches[i] + ' ans — ' + fr(py.femmes[i]) + ' femmes');
      })(i);
    }
    var tp = document.getElementById('table-pyramide');
    tp.innerHTML = '<tr><th>Tranche</th>' + py.tranches.map(function (t) { return '<th>' + esc(t) + '</th>'; }).join('') + '</tr>' +
      '<tr><th>Hommes</th>' + py.hommes.map(function (v) { return '<td>' + v + '</td>'; }).join('') + '</tr>' +
      '<tr><th>Femmes</th>' + py.femmes.map(function (v) { return '<td>' + v + '</td>'; }).join('') + '</tr>';

    // ---------- barres ----------
    function barres(id, donnees, unite) {
      var b = document.getElementById(id);
      if (!donnees.length) { b.innerHTML = '<p class="vide" style="margin:0">Aucune donnée.</p>'; return; }
      var max = Math.max.apply(null, donnees.map(function (d) { return d[1]; }));
      donnees.forEach(function (d) {
        var lib = d[0], val = d[1];
        var r = document.createElement('div');
        r.className = 'barre-rang';
        r.innerHTML = '<div class="lib" title="' + esc(lib) + '">' + esc(lib) + '</div>' +
          '<div class="barre-piste"><i style="width:' + (val / max * 100) + '%"></i></div>' +
          '<div class="val">' + fr(val) + '</div>';
        b.appendChild(r);
        survol(r.querySelector('i'), lib + ' — ' + fr(val) + ' ' + unite);
      });
    }
    barres('metiers', s.metiers_1891, 'personnes');
    barres('origines', s.origines_1871, 'personnes');

    // ---------- trajectoires ----------
    var t = s.trajectoires;
    document.getElementById('sous-trajectoires').textContent =
      fr(t.liens) + ' rapprochements calculés entre 1871, 1881 et 1891';
    var tuilesT = document.getElementById('tuiles-trajectoires');
    [
      [t.forte, 'Confiance forte'],
      [t.moyenne, 'Confiance moyenne'],
      [t.veuvage, 'Veuvages repérés'],
      [t.essaimage, 'Essaimages']
    ].forEach(function (pair) {
      var div = document.createElement('div');
      div.className = 'tuile';
      div.innerHTML = '<div class="gros">' + fr(pair[0]) + '</div><div class="quoi">' + pair[1] + '</div>';
      tuilesT.appendChild(div);
    });
  }).catch(function () {
    document.querySelector('.page .cadre').insertAdjacentHTML('afterbegin', '<p class="erreur">Les statistiques n\'ont pas pu être chargées.</p>');
  });
})();
