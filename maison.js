// Fiche de maison — routée par le fragment d'URL (#1871-D2-M78).
(function () {
  'use strict';

  var NOMS_TABLEAUX = {
    foncier: 'Tableau 3 — Propriété foncière',
    terres: 'Tableau 4 — Terres cultivées',
    animaux: 'Tableau 5 — Animaux et production',
    etablissements: 'Tableau 6 — Établissements industriels',
    forets: 'Tableau 7 — Produits des forêts',
    navigation: 'Tableau 8 — Navigation et pêcheries',
    deces: 'Tableau 2 — Décès des 12 derniers mois'
  };
  var CHAMPS_IGNORES = { annee: 1, division: 1, page: 1, ligne: 1, ref_personne: 1, ref_maison: 1, remarque: 1,
    division_inferee: 1, division_source: 1, rattachement: 1 };

  var cache = {};
  var contenu = document.getElementById('contenu');

  var esc = FICHE.esc;

  // Les fiches sont rangées par tranche de vingt-cinq numéros de maison :
  // « 1871-D2-M78 » se lit dans fiches/maison/1871-D2/M075.json. La règle est
  // celle de trancheMaison() dans outils/generer-site.mjs — les garder d'accord.
  var TRANCHE = 25;
  function trancheDe(noMaison) {
    var n = parseInt(noMaison, 10);
    if (isNaN(n) || n < 0) return 'Mx';
    var t = String(Math.floor(n / TRANCHE) * TRANCHE);
    while (t.length < 3) t = '0' + t;
    return 'M' + t;
  }
  // Une tranche qui n'existe pas (404) se lit comme « maison introuvable ».
  function chargerLot(cleAD, noMaison) {
    var cle = cleAD + '/' + trancheDe(noMaison);
    if (cache[cle]) return Promise.resolve(cache[cle]);
    return fetch('fiches/maison/' + cle + '.json')
      .then(function (r) {
        if (r.status === 404) return {};
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json().then(function (lot) { cache[cle] = lot; return lot; });
      });
  }

  function ligneAsPhrase(ligne) {
    var bits = [];
    for (var k in ligne) {
      if (CHAMPS_IGNORES[k] || ligne[k] === '' || ligne[k] == null) continue;
      bits.push(k.replace(/_/g, ' ') + ' : ' + ligne[k]);
    }
    return bits.join(', ');
  }

  function rendreFamille(f, famille) {
    var entetes = famille.entetes;
    var thead = '<tr><th class="ligne-no">L.</th>' + entetes.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr>';
    var lignes = famille.membres.map(function (m) {
      var tds = m.valeurs.map(function (v, i) {
        if (v === '✓') return '<td class="coche">✓</td>';
        if (i === 0) return '<td><a href="personne.html#' + esc(m.id) + '">' + esc(v) + '</a></td>';
        return '<td>' + esc(v) + '</td>';
      }).join('');
      return '<tr class="' + (m.chef ? 'chef' : '') + '"><td class="ligne-no">' + esc(m.ligne) + '</td>' + tds + '</tr>';
    }).join('');
    var premiere = famille.membres[0], derniere = famille.membres[famille.membres.length - 1];
    var titrePage = premiere ? ('lignes ' + esc(premiere.ligne) + ' à ' + esc(derniere.ligne)) : '';

    var marginale = famille.remarque_nom
      ? '<div class="marginale"><b>Renvoi de nom</b>' + esc(famille.remarque_nom) + '</div>' : '';

    var note = famille.note
      ? '<div class="note-chercheur" style="margin-top:10px"><span class="qual">Note du chercheur</span>' + esc(famille.note) + '</div>' : '';

    var devenir = '';
    if (famille.devenir && famille.devenir.length) {
      devenir = (
        '<h4 style="margin:18px 0 4px;font-size:17px">Le devenir de la maisonnée</h4>' +
        famille.devenir.map(function (e) {
          return '<div class="evenement"><span class="qual">' + esc(e.type === 'veuvage' ? 'Veuvage' : 'Ménage continu') + ' · confiance ' + esc(e.confiance) + '</span>' + esc(e.resume) + '</div>';
        }).join('')
      );
    }

    return (
      '<section class="bloc"><h3 class="bloc-titre">Famille ' + esc(famille.no_famille) + (famille.chef ? ' — ' + esc(famille.chef) : '') + '</h3>' +
      (titrePage ? '<p class="bloc-note">' + titrePage + '</p>' : '') +
      '<div class="registre"><table><thead>' + thead + '</thead><tbody>' + lignes + '</tbody></table></div>' +
      marginale + note + devenir +
      '</section>'
    );
  }

  // Tableau 2 : « Hugues de Martigny, 6 mois, mort en novembre — fièvre typhoïde ».
  function decesEnClair(l) {
    var qui = [l.prenom, l.nom].filter(Boolean).join(' ');
    var age = /\d\s*$/.test(String(l.age || '')) ? l.age + ' an' + (Number(l.age) > 1 ? 's' : '') : (l.age || '');
    return qui + (age ? ', ' + age : '') + (l.mois ? ', mort' + (l.sexe === 'F' ? 'e' : '') + ' en ' + String(l.mois).toLowerCase() : '') +
      (l.cause ? ' — ' + String(l.cause).toLowerCase() : '');
  }

  function rendreRenvois(f) {
    var tables = Object.keys(f.renvois || {});
    if (!tables.length) return '';
    var blocs = tables.map(function (nom) {
      var lignes = f.renvois[nom].map(function (l) {
        return '<li>' + esc(nom === 'deces' ? decesEnClair(l) : ligneAsPhrase(l)) +
          (l.rattachement === 'propose' && l.remarque ? '<br><span class="occ-detail">' + esc(l.remarque) + '</span>' : '') + '</li>';
      }).join('');
      return '<div class="marginale"><b>' + esc(NOMS_TABLEAUX[nom] || nom) + '</b><ul class="indices" style="columns:1">' + lignes + '</ul></div>';
    }).join('');
    return (
      '<section class="bloc"><h3 class="bloc-titre">Renvois aux tableaux annexes</h3>' +
      '<p class="bloc-note">Foncier, terres, animaux, forêts, navigation, établissements, décès — quand la maison y figure.</p>' +
      blocs + '</section>'
    );
  }

  // Les documents du manifeste qui nomment l'un ou l'autre des habitants de la
  // maison — acte notarié, monographie, registre — avec ce qu'ils en disent.
  function rendreDocuments(f) {
    var docs = f.documents || [];
    if (!docs.length) return '';
    var blocs = docs.map(function (doc) {
      return '<div class="marginale"><b>' + esc(doc.titre) + '</b>' + FICHE.referenceDocument(doc) +
        '<div>Nomme : ' + FICHE.personnesDocument(doc.personnes) + '</div>' +
        FICHE.affirmationsDocument(doc.affirmations) + '</div>';
    }).join('');
    return (
      '<section class="bloc"><h3 class="bloc-titre">Preuves documentaires</h3>' +
      '<p class="bloc-note">Les documents qui nomment un habitant de cette maison. Le détail est sur la fiche de chaque personne.</p>' +
      blocs + '</section>'
    );
  }

  function rendre(id, f) {
    document.title = 'Maison ' + f.no_maison + ' (' + f.annee + ') — Saint-Romuald, les gens du Fleuve';
    var nPersonnes = f.familles.reduce(function (s, fam) { return s + fam.membres.length; }, 0);
    var sousTitre = f.familles.length + ' famille' + (f.familles.length > 1 ? 's y vivent' : ' y vit') +
      ' en ' + f.annee + ' : ' + nPersonnes + ' personne' + (nPersonnes > 1 ? 's' : '') + '.';
    var logementTxt = '';
    if (f.logement && f.logement.materiau) {
      logementTxt = ' Logement en ' + f.logement.materiau.toLowerCase() +
        (f.logement.etages ? ', ' + f.logement.etages + ' étage(s)' : '') +
        (f.logement.chambres ? ', ' + f.logement.chambres + ' pièce(s)' : '') + '.';
    }
    contenu.innerHTML = (
      '<span class="etiquette">Fiche de maison · recensement de ' + esc(f.annee) + ', division ' + esc(f.division) + '</span>' +
      '<h2 class="titre-vue">Maison ' + esc(f.no_maison) + '</h2>' +
      '<p class="sous-titre">' + esc(sousTitre) + esc(logementTxt) + '</p>' +
      rendreDivisionReconstituee(f) +
      rendreColonne(f) +
      '<div class="actions-fiche"><button class="bouton" onclick="window.print()">Imprimer / exporter en PDF</button></div>' +
      f.familles.map(function (fam) { return rendreFamille(f, fam); }).join('') +
      rendreRenvois(f) +
      rendreDocuments(f) +
      rendreAdresse(f)
    );
  }

  // Le manuscrit de 1891 ne connaît qu'une division ; celle de 1871-1881 y est
  // projetée maison par maison d'après les liens de filiation
  // (docs/DIVISIONS-1891.md). Elle est dite pour ce qu'elle est : reconstituée.
  function rendreDivisionReconstituee(f) {
    if (!f.division_reconstituee) return '';
    return (
      '<p class="bloc-note">Territoire de la <b>division ' + esc(f.division_reconstituee) + '</b> de 1871-1881, ' +
      'reconstitué — le recensement de 1891 ne distingue pas les deux divisions. Appui : ' + esc(f.appui_division || '') + '.</p>'
    );
  }

  // Colonnes du formulaire de recensement : maison en construction, inhabitée,
  // habitée (2-3-4 en 1871, 3-4-5 en 1881). Le code vit dans colonne_logement,
  // posé à la main dans l'atelier et versé par outils/relecture-1881/fondre.mjs.
  var COLONNES = {
    '2': ['en construction', 'maisons en construction'],
    '3': ['inhabitée', 'maisons inhabitées'],
    '4': ['habitée', 'maisons habitées']
  };
  function rendreColonne(f) {
    var c = COLONNES[String(f.colonne_logement || '')];
    if (!c) return '';
    return (
      '<p class="bloc-note">Maison <b>' + c[0] + '</b> au moment du recensement : ' +
      'le recenseur l\'a portée dans la colonne « ' + c[1] + ' » du formulaire.</p>'
    );
  }

  // Où cette maison se trouve au sol. Le rattachement vit désormais dans la
  // couche « lieux » (docs/LIEUX.md) : un lieu a une position, un état — encore
  // debout, disparu, remplacé — et peut n'avoir aucune adresse actuelle, ce qui
  // est le cas de tout ce qui a été démoli. Les propositions de Bussière
  // restent affichées à part quand elles n'ont pas encore été tranchées.
  function rendreAdresse(f) {
    var titre = '<h3 class="bloc-titre">Où était cette maison</h3>';
    // Adresse notée à la main dans l'atelier — un repère, pas un rattachement.
    var notee = f.adresse ? '<div class="marginale"><b>Adresse notée dans l\'atelier</b>' + esc(f.adresse) + '</div>' : '';
    var lieux = f.lieux || [];
    if (!lieux.length) {
      return (
        '<section class="bloc">' + titre + notee +
        '<div class="vide">Cette maison n\'est encore rattachée à aucun lieu. Voir <a href="carte.html">la carte du chemin du Fleuve</a> pour les lieux déjà situés.</div></section>'
      );
    }
    var ETATS = { debout: 'encore debout', disparu: 'disparu', remplace: 'remplacé', deplace: 'déplacé', inconnu: 'état inconnu' };
    var STATUTS = { confirme: 'Confirmé', a_verifier: 'À vérifier', hypothese: 'Hypothèse', propose: 'Proposé par la source' };
    var items = lieux.map(function (l) {
      return (
        '<div class="marginale"><b>' + esc(l.nom) +
        (l.adresse_actuelle ? ' — ' + esc(l.adresse_actuelle) : ' — sans adresse actuelle') + '</b>' +
        esc(STATUTS[l.statut] || l.statut) + (l.confiance ? ', confiance ' + esc(l.confiance) : '') +
        ' · ' + esc(ETATS[l.etat] || l.etat) +
        (l.motif ? '<br>' + esc(l.motif) : '') +
        '<br><a href="lieu.html#' + esc(l.lieu_id) + '">Ouvrir la fiche du lieu →</a>' +
        ' · <a href="carte.html#l-' + esc(l.lieu_id) + '">le situer sur la carte</a></div>'
      );
    }).join('');
    return '<section class="bloc">' + titre + notee + items + '</section>';
  }

  function rendreErreur(msg) {
    contenu.innerHTML = '<p class="erreur">' + esc(msg) + '</p><p><a href="maison.html">← Toutes les maisons</a> · <a href="index.html">Retour à l\'accueil</a></p>';
  }

  // ── le répertoire : quand aucune maison n'est choisie ────────────────────
  // « Une maison » menait à une page vide avec un seul exemple. On y trouve
  // maintenant toutes les maisons des trois recensements, à filtrer par le
  // nom d'un chef de ménage ou par un numéro, recensement par recensement.
  // L'index est celui de l'atelier de la carte (fiches/maisons-index.json) :
  // [clé, année, division, numéro, chefs, effectif].
  var indexMaisons = null;
  var etatRepertoire = { q: '', annee: '1871', division: '1' };
  var LOTS = [['1871', '1'], ['1871', '2'], ['1881', '1'], ['1881', '2'], ['1891', '1']];

  function normaliser(t) {
    return String(t == null ? '' : t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function chargerIndex() {
    if (!indexMaisons) {
      indexMaisons = fetch('fiches/maisons-index.json')
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .catch(function (e) { indexMaisons = null; throw e; });
    }
    return indexMaisons;
  }

  function listeRepertoire(index) {
    var mots = normaliser(etatRepertoire.q).split(/\s+/).filter(Boolean);
    var partout = mots.length > 0; // une recherche passe sur les trois recensements
    var trouvees = index.filter(function (m) {
      if (!partout && (m[1] !== etatRepertoire.annee || String(m[2]) !== etatRepertoire.division)) return false;
      var foin = normaliser(m[4]) + ' maison ' + normaliser(m[3]);
      return mots.every(function (mot) {
        return /^\d+$/.test(mot) ? String(parseInt(m[3], 10)) === mot : foin.indexOf(mot) !== -1;
      });
    });
    var PLAFOND = 800; // le plus gros recensement compte 637 maisons : tout se parcourt
    var lignes = trouvees.slice(0, PLAFOND).map(function (m) {
      return '<a class="resultat" href="maison.html#' + esc(m[0]) + '">' +
        '<span class="qui">Maison ' + esc(m[3]) + '</span>' +
        '<span class="quoi">' + esc(m[4] || 'chef non relevé') + '</span>' +
        '<span class="ou">' + esc(m[1]) + ' · D' + esc(m[2]) + ' · ' + m[5] + ' pers.</span></a>';
    }).join('');
    var compte = trouvees.length + ' maison' + (trouvees.length > 1 ? 's' : '') +
      (partout ? ' pour « ' + esc(etatRepertoire.q.trim()) + ' », dans les trois recensements'
        : ' au recensement de ' + esc(etatRepertoire.annee) + (etatRepertoire.annee === '1891' ? '' : ', division ' + esc(etatRepertoire.division))) +
      (trouvees.length > PLAFOND ? ' — les ' + PLAFOND + ' premières sont affichées, précisez la recherche' : '') + '.';
    return '<p class="bloc-note" aria-live="polite">' + compte + '</p>' +
      (lignes ? '<div class="liste-personnes">' + lignes + '</div>'
        : '<div class="vide">Aucune maison ne répond à cette recherche. Essayez un seul nom, ou un numéro de maison.</div>');
  }

  function rendreRepertoire() {
    document.title = 'Une maison — Saint-Romuald, les gens du Fleuve';
    contenu.innerHTML = (
      '<span class="etiquette">Fiche de maison</span>' +
      '<h2 class="titre-vue">Entrer dans une maison</h2>' +
      '<p class="sous-titre">La maison est l\'unité du recensement. Choisissez-en une par le nom d\'un chef de ménage ou par son numéro au registre — ou essayez <a href="maison.html#1871-D2-M78">la maison 78 de 1871, chez les Lee</a>.</p>' +
      '<div class="filtres">' +
      '<div class="champ-recherche"><input id="q-maison" type="search" autocomplete="off" aria-label="Chercher une maison" ' +
      'placeholder="Un chef de ménage, un numéro… « Forcade », « 78 »"></div>' +
      '<div class="filtre-annees" role="group" aria-label="Recensement">' +
      LOTS.map(function (l) {
        return '<button type="button" data-annee="' + l[0] + '" data-division="' + l[1] + '">' + l[0] +
          (l[0] === '1891' ? '' : ' · div. ' + l[1]) + '</button>';
      }).join('') + '</div></div>' +
      '<div id="repertoire"><p class="chargement">Chargement des maisons…</p></div>'
    );
    var champ = document.getElementById('q-maison');
    var zone = document.getElementById('repertoire');
    var boutons = Array.prototype.slice.call(contenu.querySelectorAll('.filtre-annees button'));
    champ.value = etatRepertoire.q;
    function peindre(index) {
      var recherche = normaliser(etatRepertoire.q).trim() !== '';
      boutons.forEach(function (b) {
        var actif = !recherche && b.getAttribute('data-annee') === etatRepertoire.annee && b.getAttribute('data-division') === etatRepertoire.division;
        b.classList.toggle('actif', actif);
        b.setAttribute('aria-pressed', actif ? 'true' : 'false');
      });
      zone.innerHTML = listeRepertoire(index);
    }
    chargerIndex().then(function (index) {
      peindre(index);
      champ.addEventListener('input', function () { etatRepertoire.q = champ.value; peindre(index); });
      boutons.forEach(function (b) {
        b.addEventListener('click', function () {
          etatRepertoire.annee = b.getAttribute('data-annee');
          etatRepertoire.division = b.getAttribute('data-division');
          etatRepertoire.q = ''; champ.value = '';
          peindre(index);
        });
      });
    }).catch(function () {
      zone.innerHTML = '<p class="erreur">La liste des maisons n\'a pas pu être chargée. Rechargez la page.</p>';
    });
  }

  function charger() {
    var id = FICHE.identifiant();
    if (!id) { rendreRepertoire(); return; }
    document.title = 'Une maison — Saint-Romuald, les gens du Fleuve';
    var m = id.match(/^(\d{4})-D(\d)-M(.+)$/);
    if (!m) { rendreErreur('Identifiant de maison invalide : ' + id); return; }
    if (m[1] === '1891' && m[2] === '2') {
      rendreErreur('Le recensement de 1891 n’a qu’une division : toutes ses maisons sont sous « 1891-D1 ». ' +
        'La coupure de 1871-1881 y est reconstituée maison par maison, et chaque fiche de maison de 1891 dit son territoire.');
      return;
    }
    contenu.innerHTML = '<p class="chargement">Chargement de la fiche…</p>';
    chargerLot(m[1] + '-D' + m[2], m[3])
      .then(function (lot) {
        var f = lot[id];
        if (!f) { rendreErreur('Maison introuvable : ' + id); return; }
        rendre(id, f);
        window.scrollTo(0, 0);
      })
      .catch(function () { rendreErreur('La fiche n\'a pas pu être chargée.'); });
  }

  window.addEventListener('hashchange', charger);
  charger();
})();
