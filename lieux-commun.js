// Couche « lieux » — le peu de code partagé entre la carte (carte.js) et la
// fiche de lieu (lieu.js). Voir docs/LIEUX.md.
//
// Deux étages, comme partout dans ce projet :
//   fiches/lieux.json   ce qui est publié — produit par outils/generer-site.mjs
//   localStorage        ce que Patrick vient d'établir et n'a pas encore versé
// Le second se pose par-dessus le premier sans jamais l'écraser en place, et
// il repart dans data/travail-personnel.json comme le reste de l'atelier.
window.LX = (function () {
  'use strict';

  var CLE_TRAVAIL = 'suivi-lieux';
  var CLE_PLANS = 'suivi-plans';

  var ETATS = {
    debout: { label: 'Encore debout', court: 'debout' },
    remplace: { label: "Remplacé — une autre résidence occupe l'emplacement", court: 'remplacé' },
    disparu: { label: "Disparu — rien ne subsiste sur place", court: 'disparu' },
    deplace: { label: 'Déplacé — le bâtiment a été transporté ailleurs', court: 'déplacé' },
    inconnu: { label: 'État inconnu', court: 'état inconnu' }
  };

  var STATUTS = {
    confirme: { label: 'Confirmé', rang: 0 },
    a_verifier: { label: 'À vérifier', rang: 1 },
    hypothese: { label: 'Hypothèse', rang: 2 },
    propose: { label: 'Proposé par la source', rang: 3 },
    rejete: { label: 'Écarté', rang: 4 }
  };

  var PRECISIONS = {
    releve: 'posée à la main',
    adresse: "géocodée à l'adresse actuelle",
    secteur: 'interpolée le long du chemin, à replacer',
    inconnu: 'inconnue'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function lire(cle, defaut) {
    try { return JSON.parse(localStorage.getItem(cle) || defaut); } catch (e) { return JSON.parse(defaut); }
  }
  function ecrire(cle, val) {
    try { localStorage.setItem(cle, JSON.stringify(val)); return true; } catch (e) { return false; }
  }

  function overlay() { return lire(CLE_TRAVAIL, '{}'); }

  /* Enregistre une modification. `champs` est partiel : seuls les champs
     effectivement touchés sont conservés, exactement comme
     suivi-familles-corrections pour les personnes. */
  function majLieu(id, champs) {
    var o = overlay();
    o[id] = Object.assign({}, o[id] || {}, champs, { _modifie_le: new Date().toISOString().slice(0, 10) });
    ecrire(CLE_TRAVAIL, o);
    return o[id];
  }

  function oublierLieu(id) {
    var o = overlay();
    delete o[id];
    ecrire(CLE_TRAVAIL, o);
  }

  function slug(s) {
    return String(s || 'lieu').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'lieu';
  }

  function nouvelId(nomOuAdresse, existants) {
    var base = slug(nomOuAdresse), id = base, n = 2;
    while (existants.indexOf(id) !== -1) id = base + '-' + n++;
    return id;
  }

  function fusionner(base, o) {
    var parId = {}, ordre = [];
    base.forEach(function (l) { parId[l.id] = JSON.parse(JSON.stringify(l)); ordre.push(l.id); });
    Object.keys(o).forEach(function (id) {
      var mod = o[id];
      if (mod._supprime) { delete parId[id]; return; }
      if (!parId[id]) { parId[id] = { id: id, occupations: [], notes: [], photos: [], adresses_anciennes: [], cadastre: {}, documents: [] }; ordre.push(id); }
      Object.keys(mod).forEach(function (k) { if (k.charAt(0) !== '_') parId[id][k] = mod[k]; });
      parId[id]._local = true;
      parId[id]._modifie_le = mod._modifie_le || '';
    });
    return ordre.map(function (id) { return parId[id]; }).filter(Boolean);
  }

  // ── Plans anciens ────────────────────────────────────────────────────────
  // Même mécanique que les lieux, en plus petit : data/plans-data.js est
  // l'état versé, `suivi-plans` ce que Patrick vient de caler dans ce
  // navigateur. Le fichier de données est chargé par balise <script>
  // (window.PLANS), pas par fetch — il n'existe que sur carte.html.

  function plansOverlay() { return lire(CLE_PLANS, '{}'); }

  function majPlan(id, champs) {
    var o = plansOverlay();
    o[id] = Object.assign({}, o[id] || {}, champs, { _modifie_le: new Date().toISOString().slice(0, 10) });
    ecrire(CLE_PLANS, o);
    return o[id];
  }

  function chargerPlans() {
    var base = ((window.PLANS || {}).plans || []).map(function (p) { return JSON.parse(JSON.stringify(p)); });
    var o = plansOverlay();
    base.forEach(function (p) {
      var mod = o[p.id];
      if (!mod) return;
      Object.keys(mod).forEach(function (k) { if (k.charAt(0) !== '_') p[k] = mod[k]; });
      p._local = true;
      p._modifie_le = mod._modifie_le || '';
    });
    return base;
  }

  function versFichierPlans(plans) {
    var propres = plans.map(function (p) {
      var c = {};
      ['id', 'titre', 'annee', 'fichier', 'source', 'note', 'points', 'opacite', 'cale'].forEach(function (k) {
        if (p[k] !== undefined) c[k] = p[k];
      });
      return c;
    });
    return '// Plans anciens posés en surimpression de la carte — voir docs/LIEUX.md.\n' +
      '// Calés depuis carte.html (mode Atelier), versés par outils/lieux/fondre.mjs.\n' +
      'window.PLANS = ' + JSON.stringify({
        format: 'plans-saint-romuald', version: 1,
        mis_a_jour: new Date().toISOString().slice(0, 10),
        plans: propres
      }, null, 2) + ';\n';
  }

  var cachePublie = null;
  function chargerPublie() {
    if (cachePublie) return cachePublie;
    cachePublie = fetch('fiches/lieux.json')
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .catch(function () { return { lieux: [], mis_a_jour: '' }; });
    return cachePublie;
  }

  function charger() {
    return chargerPublie().then(function (pub) {
      var lieux = fusionner(pub.lieux || [], overlay());
      return { lieux: lieux, mis_a_jour: pub.mis_a_jour || '', publies: (pub.lieux || []).length };
    });
  }

  var cacheMaisons = null;
  /* Index [cle, annee, division, no_maison, chefs, effectif] — sert à
     rattacher un lieu à une maison en tapant un nom de chef de ménage. */
  function chargerMaisons() {
    if (cacheMaisons) return cacheMaisons;
    cacheMaisons = fetch('fiches/maisons-index.json')
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; });
    return cacheMaisons;
  }

  function chercherMaisons(index, texte, annee) {
    var q = String(texte || '').trim().toLowerCase();
    if (!q) return [];
    var mots = q.split(/\s+/);
    return index.filter(function (m) {
      if (annee && m[1] !== annee) return false;
      var foin = (m[4] + ' ' + m[3]).toLowerCase();
      return mots.every(function (mot) { return foin.indexOf(mot) !== -1; });
    }).slice(0, 40);
  }

  // ── Photographies ────────────────────────────────────────────────────────
  // Les photos versées au dépôt vivent dans assets/photos/ et sont listées
  // dans le lieu (photos[]). Celles que Patrick vient d'ajouter dans le
  // navigateur restent en IndexedDB — même magasin que l'atelier — jusqu'à ce
  // qu'elles soient versées. La fiche montre les deux, en le disant.
  var dbPromise = null;
  function ouvrirDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (res, rej) {
      var r = indexedDB.open('suivi-photos', 1);
      r.onupgradeneeded = function () {
        var db = r.result;
        if (!db.objectStoreNames.contains('thumbs')) db.createObjectStore('thumbs', { keyPath: 'id' });
      };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
    return dbPromise;
  }

  function photosLocales() {
    return ouvrirDB().then(function (db) {
      return new Promise(function (res, rej) {
        var req = db.transaction('thumbs').objectStore('thumbs').getAll();
        req.onsuccess = function () { res(req.result || []); };
        req.onerror = function () { rej(req.error); };
      });
    }).then(function (rows) {
      var par = {};
      rows.sort(function (a, b) { return a.id > b.id ? 1 : -1; })
        .forEach(function (r) { (par[r.entryId] = par[r.entryId] || []).push(r); });
      return par;
    }).catch(function () { return {}; });
  }

  function ajouterPhoto(lieu, fichier) {
    if (!fichier) return Promise.reject(new Error('aucun fichier'));
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onload = function () { res(fr.result); };
      fr.onerror = function () { rej(fr.error); };
      fr.readAsDataURL(fichier);
    }).then(function (dataUrl) {
      return new Promise(function (res, rej) {
        var i = new Image();
        i.onload = function () { res(i); };
        i.onerror = function () { rej(new Error('image illisible')); };
        i.src = dataUrl;
      });
    }).then(function (img) {
      var MAX = 900; // la fiche affiche plus grand que la vignette de l'atelier
      var e = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
      var w = Math.max(1, Math.round(img.naturalWidth * e));
      var h = Math.max(1, Math.round(img.naturalHeight * e));
      var cv = document.createElement('canvas');
      cv.width = w; cv.height = h;
      cv.getContext('2d').drawImage(img, 0, 0, w, h);
      var rec = {
        id: lieu.id + '#' + Date.now(), entryId: lieu.id,
        thumb: cv.toDataURL('image/jpeg', 0.82),
        nom: slug(lieu.adresse_actuelle || lieu.nom) + '-' + String(Date.now()).slice(-4) + '.jpg',
        original: fichier.name, largeur: w, hauteur: h,
        ajoute: new Date().toISOString().slice(0, 10), caption: ''
      };
      return ouvrirDB().then(function (db) {
        return new Promise(function (res, rej) {
          var tx = db.transaction('thumbs', 'readwrite');
          tx.objectStore('thumbs').put(rec);
          tx.oncomplete = function () { res(rec); };
          tx.onerror = function () { rej(tx.error); };
        });
      });
    });
  }

  function majPhoto(id, champs) {
    return ouvrirDB().then(function (db) {
      return new Promise(function (res, rej) {
        var req = db.transaction('thumbs').objectStore('thumbs').get(id);
        req.onsuccess = function () { res(req.result); };
        req.onerror = function () { rej(req.error); };
      }).then(function (rec) {
        if (!rec) return null;
        Object.assign(rec, champs);
        return new Promise(function (res, rej) {
          var tx = db.transaction('thumbs', 'readwrite');
          tx.objectStore('thumbs').put(rec);
          tx.oncomplete = function () { res(rec); };
          tx.onerror = function () { rej(tx.error); };
        });
      });
    });
  }

  function retirerPhoto(id) {
    return ouvrirDB().then(function (db) {
      return new Promise(function (res, rej) {
        var tx = db.transaction('thumbs', 'readwrite');
        tx.objectStore('thumbs').delete(id);
        tx.oncomplete = res; tx.onerror = function () { rej(tx.error); };
      });
    });
  }

  function telecharger(nom, contenu, type) {
    var blob = new Blob([contenu], { type: type || 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nom;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  /* Le fichier data/lieux-data.js tel qu'il devrait être après le travail en
     cours : c'est ce que Patrick dépose dans le dépôt, ou ce que
     outils/lieux/fondre.mjs recompose depuis data/travail-personnel.json.
     Les champs hérités de Bussière (resume_source) ne sont pas réécrits — ils
     appartiennent à la source, pas à la couche de travail. */
  function versFichierDonnees(lieux) {
    var propres = lieux.map(function (l) {
      var c = {};
      ['id', 'nom', 'voie', 'adresse_actuelle', 'designe_aujourdhui', 'etat', 'construit', 'disparu',
        'coord', 'source', 'source_ref', 'personnages', 'resume', 'notes', 'occupations',
        'adresses_anciennes', 'cadastre', 'photos', 'documents'].forEach(function (k) {
          if (l[k] !== undefined) c[k] = l[k];
        });
      return c;
    });
    return '// Couche « lieux » du site — voir docs/LIEUX.md.\n' +
      "// Amorcé par outils/lieux/amorcer.mjs, tenu à jour par l'atelier de la carte\n" +
      '// (carte.html, mode Atelier) puis outils/lieux/fondre.mjs.\n' +
      'window.LIEUX = ' + JSON.stringify({
        format: 'lieux-saint-romuald', version: 1,
        mis_a_jour: new Date().toISOString().slice(0, 10),
        note: "Couche « lieux » : un emplacement au sol, sa position, son état, et les maisons de recensement qui y ont été recensées année par année. Ne remplace jamais data/bussiere1990-data.js, qui reste la source publiée. Voir docs/LIEUX.md.",
        lieux: propres
      }, null, 2) + ';\n';
  }

  return {
    ETATS: ETATS, STATUTS: STATUTS, PRECISIONS: PRECISIONS, CLE_TRAVAIL: CLE_TRAVAIL,
    esc: esc, slug: slug, nouvelId: nouvelId,
    charger: charger, overlay: overlay, majLieu: majLieu, oublierLieu: oublierLieu,
    chargerMaisons: chargerMaisons, chercherMaisons: chercherMaisons,
    photosLocales: photosLocales, ajouterPhoto: ajouterPhoto, majPhoto: majPhoto, retirerPhoto: retirerPhoto,
    telecharger: telecharger, versFichierDonnees: versFichierDonnees,
    chargerPlans: chargerPlans, majPlan: majPlan, plansOverlay: plansOverlay, versFichierPlans: versFichierPlans
  };
})();
