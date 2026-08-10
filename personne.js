// Fiche de personne — routée par le fragment d'URL (#1871-D2-P030-L13).
// Charge à la demande le lot fiches/personne/<annee>-D<division>.json qui
// contient cette personne ; jamais les recensements complets.
(function () {
  'use strict';

  var cache = {};
  var contenu = document.getElementById('contenu');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function chargerLot(cleAD) {
    if (cache[cleAD]) return Promise.resolve(cache[cleAD]);
    return fetch('fiches/personne/' + cleAD + '.json')
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (lot) { cache[cleAD] = lot; return lot; });
  }

  function phraseIdentite(f) {
    var bits = [];
    var age = parseInt(f.age, 10);
    if (!isNaN(age) && age >= 0) {
      var naissance = Number(f.annee) - age;
      bits.push((f.sexe === 'F' ? 'Née' : f.sexe === 'M' ? 'Né' : 'Née/né') + ' vers ' + naissance + ' (' + age + ' ans en ' + f.annee + ')');
    }
    if (f.profession) bits.push(f.profession.toLowerCase());
    if (f.etat_civil && f.etat_civil !== '—') bits.push(f.etat_civil.toLowerCase());
    if (f.chef) bits.push('chef(fe) de ménage');
    var phrase = bits.length ? bits.join(', ') + '.' : '';
    if (f.trajectoire && f.trajectoire.mentions.length > 1) {
      var annees = f.trajectoire.mentions.map(function (m) { return m.annee; });
      phrase += ' Mentionnée aux recensements de ' + annees.join(', ') + '.';
    }
    return phrase;
  }

  function rendreTrajectoire(f) {
    if (!f.trajectoire || f.trajectoire.mentions.length < 2) return '';
    var mentions = f.trajectoire.mentions, liaisons = f.trajectoire.liaisons;
    var cellules = [];
    mentions.forEach(function (m, i) {
      cellules.push(
        '<a class="mention" href="personne.html#' + esc(m.id) + '">' +
        '<div class="an">' + esc(m.annee) + ' · division ' + esc(m.division) + '</div>' +
        '<div class="nom">' + esc(m.nom) + '</div>' +
        '<div class="att">' + esc(m.attribut) + '<br>p. ' + esc(m.page_ms) + ', ligne ' + esc(m.ligne) + '</div>' +
        '</a>'
      );
      if (i < liaisons.length) {
        var l = liaisons[i];
        cellules.push(
          '<div class="lien-traj"><span class="puce-conf conf-' + esc(l.confiance) + '">' +
          esc(l.confiance) + ' · ' + l.motifs.length + ' indice' + (l.motifs.length > 1 ? 's' : '') +
          '</span><span class="fil">→</span></div>'
        );
      }
    });
    var classeTaille = mentions.length === 2 ? ' taille-2' : '';
    var indices = liaisons.length ? '<ul class="indices">' + liaisons.flatMap(function (l) { return l.motifs; }).map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>' : '';
    return (
      '<section class="bloc"><h3 class="bloc-titre">Sa trajectoire, ' + esc(mentions[0].annee) + ' → ' + esc(mentions[mentions.length - 1].annee) + '</h3>' +
      '<p class="bloc-note">Les rapprochements sont calculés, non prouvés. La pastille dit la confiance du calcul ; les indices sont détaillés dessous, et un document d\'archive peut confirmer ou infirmer chaque lien.</p>' +
      '<div class="trajectoire' + classeTaille + '">' + cellules.join('') + '</div>' +
      indices +
      '</section>'
    );
  }

  function rendreEvenements(f) {
    if (!f.evenements || !f.evenements.length) return '';
    return f.evenements.map(function (e) {
      return '<div class="evenement"><span class="qual">Événement · confiance ' + esc(e.confiance) + '</span>' + esc(e.resume) + '</div>';
    }).join('');
  }

  function rendreMaisonnee(f) {
    var titre = 'Sa maisonnée en ' + esc(f.annee);
    var lienMaison = '<a href="maison.html#' + esc(f.cle_maison) + '">maison ' + esc(f.no_maison) + '</a>';
    if (!f.maisonnee) {
      return '<section class="bloc"><h3 class="bloc-titre">' + titre + '</h3><div class="vide">Composition de la maisonnée non disponible pour cette fiche.</div></section>';
    }
    var entetes = f.maisonnee.entetes;
    var thead = '<tr><th class="ligne-no">L.</th>' + entetes.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr>';
    var lignes = f.maisonnee.lignes.map(function (l) {
      var classes = [];
      if (l.chef) classes.push('chef');
      if (l.courante) classes.push('courante');
      var tds = l.valeurs.map(function (v, i) {
        if (v === '✓') return '<td class="coche">✓</td>';
        if (i === 0 && !l.courante) return '<td><a href="personne.html#' + esc(l.id) + '">' + esc(v) + '</a></td>';
        return '<td>' + esc(v) + '</td>';
      }).join('');
      return '<tr class="' + classes.join(' ') + '"><td class="ligne-no">' + esc(l.ligne) + '</td>' + tds + '</tr>';
    }).join('');
    var marginale = f.remarque
      ? '<div class="marginale"><b>En marge du dépouillement</b>' + esc(f.remarque) + '</div>' : '';
    return (
      '<section class="bloc"><h3 class="bloc-titre">' + titre + '</h3>' +
      '<p class="bloc-note">Extrait du registre, ' + lienMaison + ' — présenté comme au manuscrit, avec les numéros de ligne en marge.</p>' +
      rendreLieu(f) +
      '<div class="registre"><table><thead>' + thead + '</thead><tbody>' + lignes + '</tbody></table></div>' +
      marginale +
      '</section>'
    );
  }

  /* Où cette personne vivait — quand la maison du recensement a été rattachée
     à un lieu du sol (docs/LIEUX.md). Discret, en une ligne : c'est un renvoi,
     la fiche du lieu porte le détail. */
  function rendreLieu(f) {
    if (!f.lieux || !f.lieux.length) return '';
    var ETATS = { debout: 'encore debout', disparu: 'disparu aujourd\'hui', remplace: 'remplacé depuis', deplace: 'déplacé depuis', inconnu: '' };
    var items = f.lieux.map(function (l) {
      var etat = ETATS[l.etat] || '';
      return '<a href="lieu.html#' + esc(l.lieu_id) + '">' + esc(l.nom) + '</a>' +
        (l.adresse_actuelle ? ' — ' + esc(l.adresse_actuelle) : '') +
        (etat ? ' <span class="occ-detail">(' + esc(etat) + ')</span>' : '');
    }).join(' · ');
    return '<p class="bloc-note">Au sol : ' + items + '</p>';
  }

  function rendreDocuments(f) {
    if (!f.documents || !f.documents.length) {
      return (
        '<section class="bloc"><h3 class="bloc-titre">Preuves documentaires</h3>' +
        '<p class="bloc-note">Le calcul propose, le document tranche.</p>' +
        '<div class="vide">Aucun document versé pour cette personne. Les documents du manifeste (actes, monographies, photographies) s\'attachent ici, avec leur type d\'affirmation et leur degré de certitude.</div></section>'
      );
    }
    var blocs = f.documents.map(function (doc) {
      var affirmations = doc.affirmations.map(function (a) {
        return '<li>' + esc(a.enonce) + ' <span class="etiquette">(' + esc(a.certitude) + ')</span></li>';
      }).join('');
      return '<div class="marginale"><b>' + esc(doc.titre) + '</b><ul class="indices" style="columns:1">' + affirmations + '</ul></div>';
    }).join('');
    return (
      '<section class="bloc"><h3 class="bloc-titre">Preuves documentaires</h3>' +
      '<p class="bloc-note">Le calcul propose, le document tranche.</p>' + blocs + '</section>'
    );
  }

  function rendre(id, f) {
    document.title = f.prenom + ' ' + f.nom + ' — Saint-Romuald, les gens du Fleuve';
    contenu.innerHTML = (
      '<span class="etiquette">Fiche de personne · identifiant ' + esc(id) + '</span>' +
      '<h2 class="titre-vue">' + esc(f.prenom) + ' ' + esc(f.nom) + '</h2>' +
      '<p class="sous-titre">' + esc(phraseIdentite(f)) + '</p>' +
      '<div class="actions-fiche"><button class="bouton" onclick="window.print()">Imprimer / exporter en PDF</button></div>' +
      rendreTrajectoire(f) +
      rendreEvenements(f) +
      rendreMaisonnee(f) +
      rendreDocuments(f)
    );
  }

  function rendreErreur(msg) {
    contenu.innerHTML = '<p class="erreur">' + esc(msg) + '</p><p><a href="index.html">← Retour à la recherche</a></p>';
  }

  function charger() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) {
      contenu.innerHTML = (
        '<span class="etiquette">Fiche de personne</span>' +
        '<h2 class="titre-vue">Aucune personne sélectionnée</h2>' +
        '<p class="sous-titre">Cherchez une personne depuis <a href="index.html">l\'accueil</a> pour ouvrir sa fiche.</p>'
      );
      return;
    }
    var m = id.match(/^(\d{4})-D(\d)-/);
    if (!m) { rendreErreur('Identifiant de personne invalide : ' + id); return; }
    contenu.innerHTML = '<p class="chargement">Chargement de la fiche…</p>';
    chargerLot(m[1] + '-D' + m[2])
      .then(function (lot) {
        var f = lot[id];
        if (!f) { rendreErreur('Personne introuvable : ' + id); return; }
        rendre(id, f);
      })
      .catch(function () { rendreErreur('La fiche n\'a pas pu être chargée.'); });
  }

  window.addEventListener('hashchange', charger);
  charger();
})();
