// Accueil : le guichet de recherche et les tuiles de chiffres réels. La
// recherche elle-même — index préparé, notation, tri — est dans
// recherche-commun.js, partagée avec la liste complète (recherche.html).
// Voir outils/generer-site.mjs pour la production de recherche-index.json et
// stats-donnees.json.
(function () {
  'use strict';

  var R = window.RECHERCHE;
  var champ = document.getElementById('q');
  var boite = document.getElementById('resultats');
  var note = document.getElementById('note-recherche');
  var INDEX = null;
  var PLAFOND = 20;

  R.charger()
    .then(function (index) {
      INDEX = index;
      note.textContent = 'Recherche dans les ' + index.length.toLocaleString('fr-CA') + ' personnes des trois recensements (1871, 1881, 1891). Un nom, un prénom, un métier, une année — dans l’ordre que vous voulez.';
    })
    .catch(function () {
      note.textContent = 'L’index de recherche n’a pas pu être chargé.';
    });

  function ligneNote(texte) {
    var div = document.createElement('div');
    div.className = 'resultat';
    div.style.cursor = 'default';
    var span = document.createElement('span');
    span.className = 'quoi';
    span.textContent = texte;
    div.appendChild(span);
    return div;
  }

  // Au-delà du plafond, la dernière ligne mène à la liste complète — avec ses
  // filtres par recensement et par métier, et une adresse qui se partage.
  function ligneSuite(reste, q) {
    var a = document.createElement('a');
    a.className = 'resultat resultat-suite';
    a.href = 'recherche.html?q=' + encodeURIComponent(q);
    var quoi = document.createElement('span');
    quoi.className = 'quoi';
    quoi.textContent = '… et ' + reste.toLocaleString('fr-CA') + ' autres.';
    var suite = document.createElement('span');
    suite.className = 'suite';
    suite.textContent = 'Voir la liste complète →';
    a.appendChild(quoi);
    a.appendChild(suite);
    return a;
  }

  champ.addEventListener('input', function () {
    boite.innerHTML = '';
    if (!INDEX) return;
    var q = champ.value.trim();
    if (R.normaliser(q).length < R.MINIMUM) return;
    var trouves = R.chercher(INDEX, q);
    if (!trouves.length) {
      boite.appendChild(ligneNote('Aucun résultat pour « ' + q + ' ».'));
      return;
    }
    trouves.slice(0, PLAFOND).forEach(function (t) {
      var p = t.p;
      var div = document.createElement('div');
      div.className = 'resultat';
      div.setAttribute('tabindex', '0');
      div.innerHTML = '<span class="qui"></span><span class="quoi"></span><span class="ou"></span>';
      div.querySelector('.qui').textContent = p.nom;
      div.querySelector('.quoi').textContent = p.profession;
      div.querySelector('.ou').textContent = R.situer(p);
      var aller = function () { location.href = 'personne.html#' + p.id; };
      div.addEventListener('click', aller);
      div.addEventListener('keydown', function (e) { if (e.key === 'Enter') aller(); });
      boite.appendChild(div);
    });
    if (trouves.length > PLAFOND) {
      boite.appendChild(ligneSuite(trouves.length - PLAFOND, q));
    }
  });

  // ---------- tuiles de l'accueil ----------
  var tuiles = document.querySelectorAll('#tuiles .tuile');
  if (tuiles.length) {
    fetch('stats-donnees.json').then(function (r) { return r.json(); }).then(function (s) {
      var fr = function (n) { return n.toLocaleString('fr-CA'); };
      var a = s.par_annee;
      tuiles[0].querySelector('.gros').textContent = fr(s.totaux.personnes);
      tuiles[0].querySelector('.detail').textContent =
        fr(a['1871'].personnes) + ' en 1871 · ' + fr(a['1881'].personnes) + ' en 1881 · ' + fr(a['1891'].personnes) + ' en 1891';
      tuiles[1].querySelector('.gros').textContent = fr(s.totaux.maisons);
      tuiles[2].querySelector('.gros').textContent = fr(s.totaux.familles);
      tuiles[2].querySelector('.detail').textContent = 'séquences relevées aux trois recensements';
      tuiles[3].querySelector('.gros').textContent = fr(s.trajectoires.liens);
      tuiles[3].querySelector('.detail').textContent = 'rapprochements calculés entre recensements, dont ' + fr(s.trajectoires.forte) + ' de confiance forte';
    }).catch(function () {});
  }
})();
