// La liste complète des résultats (recherche.html). L'accueil n'en montre que
// vingt ; ici tout s'affiche, groupé par recensement, avec un filtre par
// recensement et un par métier. L'adresse porte la requête et les filtres
// (recherche.html?q=roberge&annee=1881&metier=Journalier) : un résultat se
// partage tel quel. La recherche elle-même est dans recherche-commun.js.
(function () {
  'use strict';

  var R = window.RECHERCHE;
  var champ = document.getElementById('q');
  var formulaire = champ.form;
  var note = document.getElementById('note-recherche');
  var titre = document.getElementById('titre');
  var sousTitre = document.getElementById('sous-titre');
  var filtres = document.getElementById('filtres');
  var boutonsAnnee = Array.prototype.slice.call(filtres.querySelectorAll('.filtre-annees button'));
  var selectMetier = document.getElementById('filtre-metier');
  var zone = document.getElementById('liste');

  var TITRE_SITE = 'Saint-Romuald, les gens du Fleuve';
  var TOUS_METIERS = '*'; // valeur de l'option « tous » ; « » est « sans métier déclaré »
  var EXEMPLES = ['Lee', 'Roberge 1881', 'navigateur', 'Demers Louis'];

  var INDEX = null;
  // metier : null = tous, '' = sans métier déclaré, sinon le métier tel qu'écrit.
  var etat = { q: '', annee: '', metier: null };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fr(n) { return n.toLocaleString('fr-CA'); }
  function personnes(n) { return fr(n) + (n > 1 ? ' personnes' : ' personne'); }

  function compter(liste, cle) {
    var comptes = {};
    liste.forEach(function (t) { var k = cle(t.p); comptes[k] = (comptes[k] || 0) + 1; });
    return comptes;
  }

  // ---------- l'adresse porte l'état ----------
  function lireAdresse() {
    var p = new URLSearchParams(location.search);
    etat.q = (p.get('q') || '').trim();
    var annee = p.get('annee') || '';
    etat.annee = R.ANNEES.indexOf(annee) !== -1 ? annee : '';
    etat.metier = p.has('metier') ? p.get('metier') : null;
  }
  // Sans requête, les filtres n'ont rien à filtrer : l'adresse ne les porte
  // pas, même si la page les garde en mémoire pour la prochaine frappe.
  function ecrireAdresse(nouvelleEntree) {
    var p = new URLSearchParams();
    var actif = R.normaliser(etat.q).length >= R.MINIMUM;
    if (etat.q) p.set('q', etat.q);
    if (actif && etat.annee) p.set('annee', etat.annee);
    if (actif && etat.metier !== null) p.set('metier', etat.metier);
    var chaine = p.toString();
    var url = location.pathname + (chaine ? '?' + chaine : '');
    if (url === location.pathname + location.search) return;
    history[nouvelleEntree ? 'pushState' : 'replaceState'](null, '', url);
  }

  // ---------- rendu ----------
  function rendreSeuil() {
    titre.textContent = 'Chercher une personne';
    sousTitre.textContent = 'La liste complète des personnes qui répondent à une recherche, recensement par recensement, avec un filtre par métier. L’adresse de la page se partage telle quelle.';
    filtres.hidden = true;
    zone.innerHTML =
      '<section class="bloc"><h3 class="bloc-titre">Par exemple</h3>' +
      '<p class="bloc-note">Un nom seul trouve toute une famille ; un prénom ou un métier resserre ; une année restreint à un recensement.</p>' +
      '<div class="rattachements">' + EXEMPLES.map(function (e) {
        return '<a href="recherche.html?q=' + encodeURIComponent(e) + '">' + esc(e) + '</a>';
      }).join('') + '</div></section>';
  }

  function ligne(t) {
    var p = t.p;
    var ou = R.situer(p) + (p.page ? ' · p. ' + p.page + ', l. ' + p.ligne : '');
    return '<a class="resultat" href="personne.html#' + esc(p.id) + '">' +
      '<span class="qui">' + esc(p.nom) + '</span>' +
      '<span class="quoi">' + esc(p.profession) + '</span>' +
      '<span class="ou">' + esc(ou) + '</span></a>';
  }

  function sectionAnnee(annee, liste) {
    var parDivision = compter(liste, function (p) { return p.division; });
    var divisions = Object.keys(parDivision).sort();
    var noteAnnee = '';
    if (annee === '1891') {
      // La division n'est pas au manuscrit de 1891 (docs/DIVISIONS-1891.md).
      noteAnnee = 'Le recensement de 1891 n’a qu’une division : « D1 » est la paroisse entière. Chaque fiche dit à quel territoire de 1871-1881 sa maison est rattachée.';
    } else if (divisions.length > 1) {
      noteAnnee = divisions.map(function (d) { return 'Division ' + d + ' : ' + personnes(parDivision[d]); }).join(' · ') + '.';
    }
    var corps = liste.length
      ? '<div class="liste-personnes">' + liste.map(ligne).join('') + '</div>'
      : '<div class="vide">Aucune personne de ' + annee + ' ne répond à cette recherche avec le métier retenu.</div>';
    return '<section class="bloc groupe-annee" id="an-' + annee + '">' +
      '<h3 class="bloc-titre">Recensement de ' + annee + ' <span class="compte">' + personnes(liste.length) + '</span></h3>' +
      (noteAnnee ? '<p class="bloc-note">' + noteAnnee + '</p>' : '') +
      corps + '</section>';
  }

  function rendre() {
    var q = etat.q;
    var actif = R.normaliser(q).length >= R.MINIMUM;
    document.title = (actif ? '« ' + q + ' » — ' : '') + 'Recherche — ' + TITRE_SITE;
    if (!INDEX) return;
    if (!actif) { rendreSeuil(); return; }

    var trouves = R.chercher(INDEX, q);
    titre.textContent = '« ' + q + ' »';
    if (!trouves.length) {
      filtres.hidden = true;
      sousTitre.textContent = 'Aucune personne ne répond à cette recherche.';
      zone.innerHTML = '<div class="vide">Aucun résultat pour « ' + esc(q) + ' ». La recherche passe sur les noms et les métiers, sans tenir compte des accents ni des majuscules ; essayez un seul mot, ou une autre graphie du nom.</div>';
      return;
    }

    // Les filtres se comptent l'un dans l'autre : chaque recensement dans le
    // métier retenu, chaque métier dans le recensement retenu. Un filtre que
    // la requête a vidé s'efface de lui-même.
    var parAnnee = compter(trouves, function (p) { return p.annee; });
    if (etat.annee && !parAnnee[etat.annee]) etat.annee = '';
    var dansAnnee = etat.annee ? trouves.filter(function (t) { return t.p.annee === etat.annee; }) : trouves;
    var parMetier = compter(dansAnnee, function (p) { return p.profession; });
    if (etat.metier !== null && !parMetier[etat.metier]) etat.metier = null;
    var dansMetier = etat.metier === null ? trouves : trouves.filter(function (t) { return t.p.profession === etat.metier; });
    var parAnneeDansMetier = compter(dansMetier, function (p) { return p.annee; });
    var visibles = etat.annee ? dansMetier.filter(function (t) { return t.p.annee === etat.annee; }) : dansMetier;

    boutonsAnnee.forEach(function (b) {
      var a = b.getAttribute('data-annee');
      var n = a ? (parAnneeDansMetier[a] || 0) : dansMetier.length;
      b.querySelector('.compte').textContent = fr(n);
      b.classList.toggle('actif', a === etat.annee);
      b.setAttribute('aria-pressed', a === etat.annee ? 'true' : 'false');
      b.disabled = !n && a !== etat.annee;
    });

    var metiers = Object.keys(parMetier).filter(function (m) { return m !== ''; })
      .sort(function (a, b) { return a.localeCompare(b, 'fr'); });
    var options = ['<option value="' + TOUS_METIERS + '">Tous les métiers (' + fr(dansAnnee.length) + ')</option>'];
    metiers.forEach(function (m) {
      options.push('<option value="' + esc(m) + '">' + esc(m) + ' (' + fr(parMetier[m]) + ')</option>');
    });
    if (parMetier['']) options.push('<option value="">Sans métier déclaré (' + fr(parMetier['']) + ')</option>');
    selectMetier.innerHTML = options.join('');
    selectMetier.value = etat.metier === null ? TOUS_METIERS : etat.metier;
    filtres.hidden = false;

    var anneesPresentes = R.ANNEES.filter(function (a) { return parAnnee[a]; });
    var phrase = personnes(trouves.length) + (trouves.length > 1 ? ' répondent' : ' répond') + ' à cette recherche';
    phrase += anneesPresentes.length > 1
      ? ' : ' + anneesPresentes.map(function (a) { return fr(parAnnee[a]) + ' en ' + a; }).join(', ') + '.'
      : ', en ' + anneesPresentes[0] + '.';
    if (visibles.length !== trouves.length) phrase += ' Les filtres en gardent ' + fr(visibles.length) + '.';
    sousTitre.textContent = phrase;

    var groupes = {};
    visibles.forEach(function (t) { (groupes[t.p.annee] = groupes[t.p.annee] || []).push(t); });
    var annees = R.ANNEES.filter(function (a) { return etat.annee ? a === etat.annee : groupes[a]; });
    zone.innerHTML = annees.map(function (a) { return sectionAnnee(a, groupes[a] || []); }).join('');
  }

  // ---------- événements ----------
  champ.addEventListener('input', function () {
    etat.q = champ.value.trim();
    rendre();
    ecrireAdresse(false);
  });
  // La liste suit la frappe : Entrée ne recharge rien, elle referme le clavier.
  formulaire.addEventListener('submit', function (e) {
    e.preventDefault();
    champ.blur();
  });
  boutonsAnnee.forEach(function (b) {
    b.addEventListener('click', function () {
      etat.annee = b.getAttribute('data-annee');
      rendre();
      ecrireAdresse(true);
    });
  });
  selectMetier.addEventListener('change', function () {
    etat.metier = selectMetier.value === TOUS_METIERS ? null : selectMetier.value;
    rendre();
    ecrireAdresse(true);
  });
  window.addEventListener('popstate', function () {
    lireAdresse();
    champ.value = etat.q;
    rendre();
  });

  // ---------- départ ----------
  lireAdresse();
  champ.value = etat.q;
  rendre();
  R.charger()
    .then(function (index) {
      INDEX = index;
      note.textContent = 'Recherche dans les ' + fr(index.length) + ' personnes des trois recensements (1871, 1881, 1891). Un nom, un prénom, un métier, une année (« Roberge 1881 ») — dans l’ordre que vous voulez.';
      rendre();
      ecrireAdresse(false);
    })
    .catch(function () {
      note.textContent = 'L’index de recherche n’a pas pu être chargé.';
      zone.innerHTML = '<p class="erreur">L’index de recherche n’a pas pu être chargé. Rechargez la page ; si cela persiste, l’index n’a pas été publié.</p>';
    });
})();
