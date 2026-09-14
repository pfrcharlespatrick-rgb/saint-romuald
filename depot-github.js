// Enregistrer le travail de l'atelier dans le dépôt, depuis le navigateur.
//
// L'atelier de la carte (carte.html?atelier=1) écrit dans localStorage et rien
// de plus : sans ce module, il fallait télécharger data/lieux-data.js à la main
// et le faire verser par quelqu'un. Ici, le bouton « Enregistrer » écrit
// data/travail-personnel.json dans le dépôt — jamais sur main : toujours sur la
// branche « atelier-sauvegarde », avec une pull request ouverte ou mise à jour.
//
// C'est exactement le mécanisme du panneau Sauvegarde de
// « Suivi des maisons et familles.dc.html », et c'est délibéré : même branche,
// même fichier, même jeton (localStorage « suivi-github-token »). Patrick saisit
// son jeton une fois, dans l'un ou l'autre des deux ateliers, et les deux
// écrans s'en servent.
//
// Ce qui part : tout le travail personnel, les clés des deux ateliers réunies.
// Pousser depuis la carte ne doit jamais effacer les corrections de
// recensement saisies dans l'autre écran — on réécrit le fichier en entier, il
// faut donc l'écrire en entier.
//
// Ce qui ne part pas : les photographies (IndexedDB), binaires et volumineuses.
// « Télécharger une sauvegarde », dans l'autre atelier, reste leur voie.
//
// Une fois poussé, la pull request se fond dans main, puis
// `node outils/lieux/fondre.mjs` verse le travail dans data/lieux-data.js et
// `node outils/generer-site.mjs` le propage au site public. Voir docs/LIEUX.md.
window.DEPOT = (function () {
  'use strict';

  var DEPOT = { proprietaire: 'pfrcharlespatrick-rgb', nom: 'saint-romuald', branche: 'atelier-sauvegarde', base: 'main' };
  var FICHIER = 'data/travail-personnel.json';
  var CLE_JETON = 'suivi-github-token';

  // Les clés du travail personnel, telles que l'autre atelier les énumère.
  // Les deux listes doivent rester d'accord : voir CLES_TRAVAIL dans
  // « Suivi des maisons et familles.dc.html ».
  var CLES_TRAVAIL = ['suivi-familles-notes', 'suivi-familles-corrections', 'suivi-corr-maison',
    'suivi-corr-famille', 'suivi-liens', 'suivi-hypotheses-adresses', 'suivi-annexe-batiments',
    'suivi-annexe-details', 'suivi-annexe-adresses', 'suivi-lieux', 'suivi-plans',
    'suivi-migration-ids-v1'];

  var enCours = false;

  function jeton() {
    try { return localStorage.getItem(CLE_JETON) || ''; } catch (e) { return ''; }
  }
  function poserJeton(v) {
    try { localStorage.setItem(CLE_JETON, String(v || '').trim()); return true; } catch (e) { return false; }
  }
  function oublierJeton() {
    try { localStorage.removeItem(CLE_JETON); } catch (e) {}
  }

  function paquet() {
    var donnees = {};
    CLES_TRAVAIL.forEach(function (k) {
      try {
        var v = localStorage.getItem(k);
        if (v !== null) donnees[k] = JSON.parse(v);
      } catch (e) {}
    });
    return { format: 'suivi-saint-romuald-travail', version: 1, exporte: new Date().toISOString(), donnees: donnees };
  }

  function base64(texte) {
    return btoa(unescape(encodeURIComponent(texte)));
  }

  function appel(chemin, options) {
    var o = options || {};
    var entetes = {
      Authorization: 'Bearer ' + jeton(),
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };
    if (o.body) entetes['Content-Type'] = 'application/json';
    return fetch('https://api.github.com/repos/' + DEPOT.proprietaire + '/' + DEPOT.nom + chemin, {
      method: o.method || 'GET', body: o.body, headers: entetes
    }).then(function (res) {
      if (res.ok) return res.status === 204 ? null : res.json();
      return res.json().catch(function () { return {}; }).then(function (corps) {
        var err = new Error('GitHub ' + res.status + (corps.message ? ' — ' + corps.message : ''));
        err.status = res.status;
        throw err;
      });
    });
  }

  function pullRequestOuverte() {
    return appel('/pulls?head=' + DEPOT.proprietaire + ':' + DEPOT.branche + '&state=open')
      .then(function (l) { return (l || [])[0] || null; });
  }

  /* Enregistre. `dire` reçoit l'avancement, phrase par phrase, pour que
     l'écran puisse le montrer. Résout avec { url, miseAJour }. */
  function enregistrer(dire) {
    var avance = dire || function () {};
    if (!jeton()) return Promise.reject(new Error('Aucun jeton enregistré.'));
    if (enCours) return Promise.reject(new Error('Un enregistrement est déjà en cours.'));
    enCours = true;

    var contenu = base64(JSON.stringify(paquet(), null, 1) + '\n');
    var deja = false;

    avance('Repérage de main…');
    return appel('/git/ref/heads/' + DEPOT.base).then(function (ref) {
      var shaMain = ref.object.sha;
      avance('Préparation de la branche « ' + DEPOT.branche + ' »…');
      return appel('/git/refs', {
        method: 'POST',
        body: JSON.stringify({ ref: 'refs/heads/' + DEPOT.branche, sha: shaMain })
      }).catch(function (e) {
        if (e.status !== 422) throw e; // 422 : la branche existe déjà
        // Elle existe. On ne la rembobine sur main que si rien n'y attend
        // encore d'être fondu — sinon on écraserait une sauvegarde pas relue.
        return pullRequestOuverte().then(function (pr) {
          if (pr) return null; // une PR attend : on empile dessus
          return appel('/git/refs/heads/' + DEPOT.branche, {
            method: 'PATCH',
            body: JSON.stringify({ sha: shaMain, force: true })
          });
        });
      });
    }).then(function () {
      avance('Écriture de ' + FICHIER + '…');
      return appel('/contents/' + FICHIER + '?ref=' + DEPOT.branche).then(function (f) { return f.sha; })
        .catch(function (e) {
          if (e.status !== 404) throw e; // 404 : premier envoi
          return undefined;
        });
    }).then(function (sha) {
      var corps = {
        message: 'Sauvegarde du travail d’édition — ' + new Date().toISOString().slice(0, 16).replace('T', ' '),
        content: contenu, branch: DEPOT.branche
      };
      if (sha) corps.sha = sha;
      return appel('/contents/' + FICHIER, { method: 'PUT', body: JSON.stringify(corps) });
    }).then(function () {
      avance('Ouverture de la pull request…');
      return pullRequestOuverte();
    }).then(function (pr) {
      if (pr) { deja = true; return pr; }
      return appel('/pulls', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Sauvegarde du travail d’édition (atelier)',
          head: DEPOT.branche, base: DEPOT.base,
          body: 'Poussé automatiquement depuis l’atelier. Contient ' + FICHIER +
            ' — le travail personnel (lieux, plans, corrections, notes, liens), pas les recensements ni les photos.'
        })
      }).catch(function (e) {
        if (e.status !== 422) throw e; // 422 : une PR vient d'être ouverte entre-temps
        return pullRequestOuverte().then(function (relue) {
          if (!relue) throw e;
          deja = true;
          return relue;
        });
      });
    }).then(function (pr) {
      enCours = false;
      return { url: pr.html_url, miseAJour: deja };
    }).catch(function (e) {
      enCours = false;
      throw e;
    });
  }

  return {
    DEPOT: DEPOT, FICHIER: FICHIER, CLES_TRAVAIL: CLES_TRAVAIL,
    jeton: jeton, poserJeton: poserJeton, oublierJeton: oublierJeton,
    enregistrer: enregistrer
  };
})();
