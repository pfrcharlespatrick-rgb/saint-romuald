// Accueil : recherche dans l'index compact et remplissage des tuiles de
// chiffres réels. Voir outils/generer-site.mjs pour la production de
// recherche-index.json et stats-donnees.json.
(function () {
  'use strict';

  function normaliser(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  var champ = document.getElementById('q');
  var boite = document.getElementById('resultats');
  var note = document.getElementById('note-recherche');
  var INDEX = null;

  fetch('recherche-index.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      INDEX = data;
      note.textContent = 'Recherche dans les ' + data.length.toLocaleString('fr-CA') + ' personnes des trois recensements (1871, 1881, 1891).';
    })
    .catch(function () {
      note.textContent = 'L’index de recherche n’a pas pu être chargé.';
    });

  function lieuDe(id) {
    var m = id.match(/^(\d{4})-D(\d)/);
    return m ? (m[1] + ' · D' + m[2]) : '';
  }

  champ.addEventListener('input', function () {
    boite.innerHTML = '';
    if (!INDEX) return;
    var q = normaliser(champ.value.trim());
    if (q.length < 2) return;
    var trouves = [];
    for (var i = 0; i < INDEX.length && trouves.length < 12; i++) {
      var r = INDEX[i];
      if (normaliser(r[1] + ' ' + r[2]).indexOf(q) !== -1) trouves.push(r);
    }
    if (!trouves.length) {
      var vide = document.createElement('div');
      vide.className = 'resultat';
      vide.style.cursor = 'default';
      vide.innerHTML = '<span class="quoi">Aucun résultat pour « ' + champ.value.trim() + ' ».</span>';
      boite.appendChild(vide);
      return;
    }
    trouves.forEach(function (r) {
      var id = r[0], nom = r[1], profession = r[2];
      var div = document.createElement('div');
      div.className = 'resultat';
      div.setAttribute('tabindex', '0');
      div.innerHTML = '<span class="qui"></span><span class="quoi"></span><span class="ou"></span>';
      div.querySelector('.qui').textContent = nom;
      div.querySelector('.quoi').textContent = profession || '';
      div.querySelector('.ou').textContent = lieuDe(id);
      var aller = function () { location.href = 'personne.html#' + id; };
      div.addEventListener('click', aller);
      div.addEventListener('keydown', function (e) { if (e.key === 'Enter') aller(); });
      boite.appendChild(div);
    });
  });

  // ---------- tuiles de l'accueil ----------
  var tuiles = document.querySelectorAll('#tuiles .tuile');
  if (tuiles.length) {
    fetch('stats-donnees.json').then(function (r) { return r.json(); }).then(function (s) {
      var fr = function (n) { return n.toLocaleString('fr-CA'); };
      var a = s.par_annee;
      tuiles[0].querySelector('.gros').textContent = fr(s.totaux.personnes);
      tuiles[0].querySelector('.detail').textContent =
        fr(a['1871'].personnes) + ' en 1871 · ' + fr(a['1881'].personnes) + ' en 1881 · ' + fr(a['1891'].personnes) + ' en 1891 (div. 2 à venir)';
      tuiles[1].querySelector('.gros').textContent = fr(s.totaux.maisons);
      tuiles[2].querySelector('.gros').textContent = fr(s.totaux.familles);
      tuiles[2].querySelector('.detail').textContent = 'séquences relevées aux trois recensements';
      tuiles[3].querySelector('.gros').textContent = fr(s.trajectoires.liens);
      tuiles[3].querySelector('.detail').textContent = 'rapprochements calculés entre recensements, dont ' + fr(s.trajectoires.forte) + ' de confiance forte';
    }).catch(function () {});
  }
})();
