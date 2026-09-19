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
  var PLAFOND = 20;

  // L'index est préparé une fois : nom et métier sans accents ni majuscules,
  // découpés en mots. C'est ce qui permet de chercher « Lee » sans tomber sur
  // Killeen et Sleeth, et « Demers Louis » aussi bien que « Louis Demers ».
  function decouper(texte) {
    return normaliser(texte).split(/[^a-z0-9]+/).filter(Boolean);
  }
  function preparer(data) {
    return data.map(function (r) {
      var nom = normaliser(r[1]), prof = normaliser(r[2] || '');
      return { id: r[0], nom: r[1], profession: r[2] || '', texte: nom + ' ' + prof,
        mots: decouper(r[1]).concat(decouper(r[2] || '')), annee: r[0].slice(0, 4) };
    });
  }

  fetch('recherche-index.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      INDEX = preparer(data);
      note.textContent = 'Recherche dans les ' + data.length.toLocaleString('fr-CA') + ' personnes des trois recensements (1871, 1881, 1891). Un nom, un prénom, un métier, une année — dans l’ordre que vous voulez.';
    })
    .catch(function () {
      note.textContent = 'L’index de recherche n’a pas pu être chargé.';
    });

  function lieuDe(id) {
    var m = id.match(/^(\d{4})-D(\d)/);
    return m ? (m[1] + ' · D' + m[2]) : '';
  }

  // Note chaque personne pour une requête découpée en mots. Un mot de la
  // requête compte s'il commence un mot du nom ou du métier (2 points, 3 si
  // c'est le mot entier) ; à défaut, s'il se trouve n'importe où dans le
  // texte (1 point) — « zeau » trouve encore Barbeau. Un mot qui ne se
  // retrouve nulle part élimine la personne. Une année (1871, 1881, 1891)
  // restreint au recensement. Le nom complet égal à la requête passe en tête.
  function noter(p, mots, annees, q) {
    if (annees.length && annees.indexOf(p.annee) === -1) return 0;
    var score = 0;
    for (var i = 0; i < mots.length; i++) {
      var m = mots[i], meilleur = 0;
      for (var j = 0; j < p.mots.length; j++) {
        var w = p.mots[j];
        if (w === m) { meilleur = 3; break; }
        if (w.indexOf(m) === 0) meilleur = Math.max(meilleur, 2);
      }
      if (!meilleur && p.texte.indexOf(m) !== -1) meilleur = 1;
      if (!meilleur) return 0;
      score += meilleur;
    }
    if (normaliser(p.nom) === q) score += 10;
    return score;
  }

  function chercher(q) {
    var motsBruts = decouper(q), mots = [], annees = [];
    motsBruts.forEach(function (m) {
      if (/^(1871|1881|1891)$/.test(m)) annees.push(m); else mots.push(m);
    });
    if (!mots.length && !annees.length) return [];
    var trouves = [];
    for (var i = 0; i < INDEX.length; i++) {
      var s = mots.length ? noter(INDEX[i], mots, annees, q) : (annees.indexOf(INDEX[i].annee) !== -1 ? 1 : 0);
      if (s) trouves.push({ p: INDEX[i], score: s, rang: i });
    }
    trouves.sort(function (a, b) { return b.score - a.score || a.rang - b.rang; });
    return trouves;
  }

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

  champ.addEventListener('input', function () {
    boite.innerHTML = '';
    if (!INDEX) return;
    var q = normaliser(champ.value.trim());
    if (q.length < 2) return;
    var trouves = chercher(q);
    if (!trouves.length) {
      boite.appendChild(ligneNote('Aucun résultat pour « ' + champ.value.trim() + ' ».'));
      return;
    }
    trouves.slice(0, PLAFOND).forEach(function (t) {
      var r = [t.p.id, t.p.nom, t.p.profession];
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
    if (trouves.length > PLAFOND) {
      boite.appendChild(ligneNote('… et ' + (trouves.length - PLAFOND).toLocaleString('fr-CA') +
        ' autres. Ajoutez un prénom, un métier ou une année (« Roberge 1881 ») pour préciser.'));
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
