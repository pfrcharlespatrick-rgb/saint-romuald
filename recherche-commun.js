// Recherche dans l'index compact (recherche-index.json) — le code partagé
// entre le guichet de l'accueil (recherche.js) et la liste complète des
// résultats (recherche.html, recherche-page.js). Même façon de faire que
// lieux-commun.js : le site est en JavaScript sans modules ni bundler, ce
// fichier pose un objet global et se charge avant le script de la page.
//
// Rien ici ne touche au navigateur au moment du chargement : le fichier se lit
// tel quel depuis Node (voir chargerGlobal() dans outils/lieux/fondre.mjs),
// et c'est ainsi que ses résultats se vérifient.
//
// L'index est produit par outils/generer-site.mjs : une ligne par personne,
// [id, "Prénom Nom", profession] — l'année, la division, la page et la ligne
// du manuscrit se lisent dans l'identifiant (AAAA-Dd-Pppp-Lll).
window.RECHERCHE = (function () {
  'use strict';

  var FICHIER = 'recherche-index.json';
  var ANNEES = ['1871', '1881', '1891'];
  var MINIMUM = 2; // caractères saisis avant de chercher

  function normaliser(s) {
    return String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  // Le texte sans accents ni majuscules, découpé en mots.
  function decouper(texte) {
    return normaliser(texte).split(/[^a-z0-9]+/).filter(Boolean);
  }

  // L'index est préparé une fois : nom et métier normalisés et découpés en
  // mots. C'est ce qui permet de chercher « Lee » sans tomber sur Killeen et
  // Sleeth, et « Demers Louis » aussi bien que « Louis Demers ».
  function preparer(data) {
    return data.map(function (r) {
      var id = r[0], nom = r[1], profession = r[2] || '';
      var m = /^(\d{4})-D(\d)-P(\d+)-L(\d+)$/.exec(id);
      return {
        id: id, nom: nom, profession: profession,
        nomNormalise: normaliser(nom),
        texte: normaliser(nom) + ' ' + normaliser(profession),
        mots: decouper(nom).concat(decouper(profession)),
        annee: m ? m[1] : id.slice(0, 4),
        division: m ? m[2] : '',
        page: m ? String(Number(m[3])) : '',
        ligne: m ? String(Number(m[4])) : ''
      };
    });
  }

  // La requête découpée : d'un côté les mots à chercher, de l'autre les années
  // de recensement, qui restreignent au lieu de chercher.
  function lireRequete(q) {
    var mots = [], annees = [];
    decouper(q).forEach(function (m) {
      if (ANNEES.indexOf(m) !== -1) annees.push(m); else mots.push(m);
    });
    return { q: normaliser(q).trim(), mots: mots, annees: annees };
  }

  // Note une personne pour une requête découpée en mots. Un mot de la requête
  // compte s'il commence un mot du nom ou du métier (2 points, 3 si c'est le
  // mot entier) ; à défaut, s'il se trouve n'importe où dans le texte
  // (1 point) — « zeau » trouve encore Barbeau. Un mot qui ne se retrouve
  // nulle part élimine la personne. Une année (1871, 1881, 1891) restreint au
  // recensement. Le nom complet égal à la requête passe en tête.
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
    if (p.nomNormalise === q) score += 10;
    return score;
  }

  // Cherche dans un index préparé. Rend les correspondances, les mieux notées
  // d'abord puis dans l'ordre du registre : { p, score, rang }. Une requête
  // réduite à une année liste tout le recensement.
  function chercher(index, q) {
    var r = lireRequete(q), mots = r.mots, annees = r.annees;
    if (!mots.length && !annees.length) return [];
    var trouves = [];
    for (var i = 0; i < index.length; i++) {
      var p = index[i];
      var s = mots.length ? noter(p, mots, annees, r.q) : (annees.indexOf(p.annee) !== -1 ? 1 : 0);
      if (s) trouves.push({ p: p, score: s, rang: i });
    }
    trouves.sort(function (a, b) { return b.score - a.score || a.rang - b.rang; });
    return trouves;
  }

  // « 1881 · D2 » — où la personne est recensée.
  function situer(p) {
    return p.division ? p.annee + ' · D' + p.division : p.annee;
  }

  // L'index, chargé une seule fois par page et rendu préparé.
  var chargement = null;
  function charger() {
    if (!chargement) {
      chargement = fetch(FICHIER)
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(preparer);
    }
    return chargement;
  }

  return {
    ANNEES: ANNEES, MINIMUM: MINIMUM,
    normaliser: normaliser, decouper: decouper, preparer: preparer,
    lireRequete: lireRequete, noter: noter, chercher: chercher,
    situer: situer, charger: charger
  };
})();
