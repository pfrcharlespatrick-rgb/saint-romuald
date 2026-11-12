// Ce que les trois fiches — personne, maison, lieu — font de la même façon :
// lire l'identifiant dans l'adresse, écrire une date, nommer un rôle dans un
// acte, citer un document et montrer sa transcription. Le même code vivait en
// trois exemplaires, un par fiche ; une correction dans l'un n'atteignait pas
// les autres. Même façon de faire que lieux-commun.js et recherche-commun.js :
// le site est en JavaScript sans modules ni bundler, ce fichier pose un objet
// global et se charge avant le script de la page.
window.FICHE = (function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // L'identifiant que porte l'adresse après le « # ». Une adresse abîmée en
  // route — un « % » qui ne code rien, collé depuis un courriel — faisait
  // lever une erreur à decodeURIComponent, et la page restait sur
  // « Chargement de la fiche… » sans rien dire. On rend alors le texte brut :
  // la fiche répondra « introuvable », ce qui est la vérité.
  function identifiant() {
    var brut = location.hash.slice(1);
    try { return decodeURIComponent(brut); } catch (e) { return brut; }
  }

  var MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août',
    'septembre', 'octobre', 'novembre', 'décembre'];
  function dateLisible(t) {
    var m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(t || '');
    if (!m) return t || '';
    return (m[3] ? Number(m[3]) + (m[3] === '01' ? 'er' : '') + ' ' : '') +
      (m[2] ? MOIS[Number(m[2]) - 1] + ' ' : '') + m[1];
  }

  // Les rôles du manifeste sont des clés sans accents (« debiteur »,
  // « subroge_tuteur ») ; la fiche les écrit en français. Un rôle absent de la
  // table s'affiche tel quel, tirets bas remplacés par des espaces.
  var ROLES = {
    acquereur: 'acquéreur', acheteur: 'acheteur', arpenteur: 'arpenteur', auteur: 'auteur du titre', autre: '',
    bailleur: 'bailleur', caution: 'caution', cedant: 'cédant', cessionnaire: 'cessionnaire',
    comparant: 'comparant', comparante: 'comparante', concedant: 'concédant', concessionnaire: 'concessionnaire',
    creancier: 'créancier', creanciere: 'créancière', crediteur: 'créditeur', curateur: 'curateur',
    debiteur: 'débiteur', declarante: 'déclarante', defendeur: 'défendeur', defunt: 'défunt', defunte: 'défunte',
    demandeur: 'demandeur', deposant: 'déposant', donataire: 'donataire', donateur: 'donateur', donatrice: 'donatrice',
    echangiste: 'échangiste', enfant: 'enfant', epouse: 'épouse', epoux: 'époux', executeur: 'exécuteur testamentaire',
    fille: 'fille', fils: 'fils', frere: 'frère', futur_acquereur: 'futur acquéreur', futur_epoux: 'futur époux',
    future_epouse: 'future épouse', gendre: 'gendre', hote: 'hôte', informatrice: 'informatrice', interdit: 'interdit',
    legataire: 'légataire', locataire: 'locataire', mandant: 'mandant', mandante: 'mandante', mandataire: 'mandataire',
    mari: 'mari', mere: 'mère', meunier: 'meunier', notaire: 'notaire', oncle: 'oncle', partie: 'partie à l\'acte',
    pere: 'père', preneur: 'preneur', priseur: 'priseur', procureur: 'procureur', promettant: 'promettant',
    proprietaire: 'propriétaire', quittancant: 'quittançant', requerant: 'requérant', requerante: 'requérante',
    seigneur: 'seigneur', soeur: 'sœur', subroge_tuteur: 'subrogé tuteur', sujet: '', temoin: 'témoin',
    testateur: 'testateur', testatrice: 'testatrice', tuteur: 'tuteur', vendeur: 'vendeur', venderesse: 'venderesse',
    veuve: 'veuve', voisin: 'voisin'
  };
  function role(cle) {
    if (!cle) return '';
    return Object.prototype.hasOwnProperty.call(ROLES, cle) ? ROLES[cle] : String(cle).replace(/_/g, ' ');
  }

  var CERTITUDES = { etabli: 'établi', probable: 'probable', hypothese: 'hypothèse' };
  function certitude(cle) { return CERTITUDES[cle] || cle || ''; }

  // Les images du manuscrit (outils/tropy/fondre.mjs), repliées : rien ne se
  // charge tant que le lecteur n'ouvre pas le volet. L'aperçu vient de Google
  // Drive ; si le dossier n'est pas partagé, il reste le lien vers l'image.
  function imagesDocument(doc) {
    var imgs = (doc.images || []).filter(function (i) { return i && /^[\w-]+$/.test(i.drive || ''); });
    if (!imgs.length) return '';
    return '<details class="doc-images"><summary>Images du manuscrit (' + imgs.length + ')</summary><div class="doc-images-liste">' +
      imgs.map(function (i) {
        var vue = 'https://drive.google.com/file/d/' + i.drive + '/view';
        var legende = 'Microfilm ' + i.microfilm + (i.legende ? ' · p. ' + i.legende : '');
        return '<a class="doc-image" href="' + vue + '" target="_blank" rel="noopener">' +
          '<img loading="lazy" alt="' + esc(legende) + '" src="https://drive.google.com/thumbnail?id=' + i.drive + '&amp;sz=w400" ' +
          'onerror="this.remove()">' +
          '<span>' + esc(legende) + '</span></a>';
      }).join('') + '</div></details>';
  }

  // La transcription d'un document n'est plus dans la fiche : elle se charge
  // quand le lecteur ouvre le volet (fiches/document/<id>.json, produit par
  // outils/generer-site.mjs). Une fiche produite avant ce changement porte
  // encore le texte lui-même, et il s'affiche alors directement.
  function transcriptionDocument(doc) {
    if (doc.transcription) {
      return '<details><summary>Transcription</summary><p class="transcription">' + esc(doc.transcription) + '</p></details>';
    }
    if (!doc.a_transcription || !/^[\w-]+$/.test(doc.id || '')) return '';
    return '<details class="doc-transcription" data-doc="' + esc(doc.id) + '"><summary>Transcription</summary>' +
      '<p class="transcription" aria-live="polite">Chargement de la transcription…</p></details>';
  }

  var transcriptions = {}; // id -> promesse du texte
  function chargerTranscription(id) {
    if (!transcriptions[id]) {
      transcriptions[id] = fetch('fiches/document/' + id + '.json')
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (j) { return j.transcription || ''; })
        .catch(function (e) { delete transcriptions[id]; throw e; });
    }
    return transcriptions[id];
  }
  function remplir(volet) {
    if (!volet.open || volet.getAttribute('data-etat')) return Promise.resolve();
    var p = volet.querySelector('.transcription');
    volet.setAttribute('data-etat', 'en-cours');
    return chargerTranscription(volet.getAttribute('data-doc')).then(function (texte) {
      p.textContent = texte || 'Transcription vide.';
      volet.setAttribute('data-etat', 'charge');
    }).catch(function () {
      p.textContent = 'La transcription n’a pas pu être chargée. Refermez puis rouvrez le volet pour réessayer.';
      volet.removeAttribute('data-etat');
    });
  }
  // « toggle » ne remonte pas dans l'arbre : on l'écoute à la capture, une
  // fois pour toute la page, quelle que soit la fiche affichée ensuite.
  if (typeof document !== 'undefined') {
    document.addEventListener('toggle', function (e) {
      var volet = e.target;
      if (volet && volet.classList && volet.classList.contains('doc-transcription')) remplir(volet);
    }, true);
    // À l'impression, un volet que le lecteur a ouvert doit porter son texte.
    window.addEventListener('beforeprint', function () {
      Array.prototype.forEach.call(document.querySelectorAll('details.doc-transcription[open]'), remplir);
    });
  }

  // La référence du document — dépôt ou greffe, n° de minute et images, date —
  // puis sa transcription et ses images, repliées.
  function referenceDocument(doc) {
    var parts = [];
    if (doc.source) parts.push(esc(doc.source));
    if (doc.cote) parts.push(esc(doc.cote));
    if (doc.date) parts.push(esc(dateLisible(doc.date)) + (doc.date_incertaine ? ' (date incertaine)' : ''));
    if (doc.url && /^https?:\/\//.test(doc.url)) parts.push('<a href="' + esc(doc.url) + '" rel="noopener">numérisation</a>');
    return (parts.length ? '<div class="occ-detail">Référence : ' + parts.join(' · ') + '</div>' : '') +
      transcriptionDocument(doc) + imagesDocument(doc);
  }

  // « Nomme : Pierre Savard, 1881 (quittançant) · … » — les personnes du
  // recensement qu'un document nomme, avec leur rôle dans l'acte.
  function personnesDocument(personnes) {
    return (personnes || []).map(function (p) {
      var r = role(p.role);
      return '<a href="personne.html#' + esc(p.id) + '">' + esc(p.nom) + (p.annee ? ', ' + esc(p.annee) : '') + '</a>' +
        (r ? ' <span class="occ-detail">(' + esc(r) + ')</span>' : '');
    }).join(' · ');
  }

  function affirmationsDocument(affirmations) {
    var items = (affirmations || []).map(function (a) {
      return '<li>' + esc(a.enonce) + ' <span class="etiquette">(' + esc(certitude(a.certitude)) + ')</span></li>';
    }).join('');
    return items ? '<ul class="indices" style="columns:1">' + items + '</ul>' : '';
  }

  return {
    esc: esc, identifiant: identifiant, dateLisible: dateLisible, role: role, certitude: certitude,
    referenceDocument: referenceDocument, personnesDocument: personnesDocument,
    affirmationsDocument: affirmationsDocument
  };
})();
