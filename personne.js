// Fiche de personne — routée par le fragment d'URL (#1871-D2-P030-L13).
// Charge à la demande la seule page de manuscrit qui porte cette personne,
// fiches/personne/<annee>-D<division>/P<page>.json (quelques dizaines de Ko) :
// l'année, la division et la page se lisent dans l'identifiant. Jamais un lot
// annee-division entier, encore moins un recensement complet.
(function () {
  'use strict';

  var cache = {};
  var contenu = document.getElementById('contenu');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Un fragment par page de manuscrit, gardé une fois chargé : les gens d'une
  // même maisonnée se suivent sur la page, on ne la redemande pas à chaque clic.
  // Les autres mentions d'une trajectoire renvoient à d'autres pages, chargées
  // seulement quand on les ouvre. Une page qui n'existe pas (404) se lit comme
  // « personne introuvable » ; elle n'est pas gardée en cache.
  function chargerPage(annee, division, page) {
    var cle = annee + '-D' + division + '/P' + page;
    if (cache[cle]) return Promise.resolve(cache[cle]);
    return fetch('fiches/personne/' + cle + '.json')
      .then(function (r) {
        if (r.status === 404) return {};
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json().then(function (fragment) { cache[cle] = fragment; return fragment; });
      });
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
        '<div class="an">' + esc(m.annee) + ' · division ' + esc(m.division) +
        (m.division_reconstituee ? ' <span title="Le recensement de 1891 ne distingue pas les divisions : territoire reconstitué d\'après 1871-1881">(terr. D' + esc(m.division_reconstituee) + ')</span>' : '') + '</div>' +
        '<div class="nom">' + esc(m.nom) + '</div>' +
        '<div class="att">' + esc(m.attribut) + '<br>p. ' + esc(m.page_ms) + ', ligne ' + esc(m.ligne) + '</div>' +
        '</a>'
      );
      if (i < liaisons.length) {
        var l = liaisons[i];
        // Un rapprochement confirmé à la main dans l'atelier le dit ; les
        // autres portent la confiance du calcul.
        var etiquette = l.origine === 'main' ? 'confirmé à la main' : esc(l.confiance);
        cellules.push(
          '<div class="lien-traj"><span class="puce-conf conf-' + esc(l.confiance) + '">' +
          etiquette + ' · ' + l.motifs.length + ' indice' + (l.motifs.length > 1 ? 's' : '') +
          '</span><span class="fil">→</span></div>'
        );
      }
    });
    var classeTaille = mentions.length === 2 ? ' taille-2' : '';
    var indices = liaisons.length ? '<ul class="indices">' + liaisons.flatMap(function (l) { return l.motifs; }).map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>' : '';
    return (
      '<section class="bloc"><h3 class="bloc-titre">Sa trajectoire, ' + esc(mentions[0].annee) + ' → ' + esc(mentions[mentions.length - 1].annee) + '</h3>' +
      '<p class="bloc-note">Les rapprochements sont calculés, non prouvés. La pastille dit la confiance du calcul — ou que le lien a été confirmé à la main dans l\'atelier ; les indices sont détaillés dessous, et un document d\'archive peut confirmer ou infirmer chaque lien.</p>' +
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
    // 1891 : la division n'est pas au manuscrit, elle est projetée depuis
    // 1871-1881 maison par maison (docs/DIVISIONS-1891.md).
    if (f.division_reconstituee) {
      marginale += '<div class="marginale"><b>Territoire de la division ' + esc(f.division_reconstituee) + ' (reconstitué)</b>' +
        'Le recensement de 1891 ne distingue pas les deux divisions de 1871 et 1881. Cette maison est placée dans le territoire ' +
        'de la division ' + esc(f.division_reconstituee) + ' d\'après les liens de filiation de ses habitants : ' + esc(f.appui_division || '') + '.</div>';
    }
    // Lecture que le dépouillement complémentaire de 1881 n'a pas su trancher.
    // Elle est dite ici plutôt que tue : la valeur affichée reste discutable.
    if (f.note_complement) {
      marginale += '<div class="marginale"><b>Lecture à confirmer</b>' + esc(f.note_complement) + '</div>';
    }
    // Le recenseur a rayé cette ligne : la personne est conservée dans le site,
    // mais elle ne compte pas dans le dénombrement officiel de 1891.
    if (f.biffee) {
      marginale = '<div class="marginale"><b>Ligne biffée au manuscrit</b>' +
        'Le recenseur a rayé cette ligne : cette personne ne figure pas dans son dénombrement. ' +
        'Elle est conservée ici parce que le manuscrit porte son nom et son âge, mais elle est ' +
        'à écarter de tout décompte de population.</div>' + marginale;
    }
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
        '<p class="sous-titre">Cherchez une personne depuis <a href="index.html">l\'accueil</a> ou la <a href="recherche.html">liste complète des résultats</a> pour ouvrir sa fiche.</p>'
      );
      return;
    }
    var m = id.match(/^(\d{4})-D(\d)-P(\d{3})-/);
    if (!m) { rendreErreur('Identifiant de personne invalide : ' + id); return; }
    if (m[1] === '1891' && m[2] === '2') {
      rendreErreur('Le recensement de 1891 n’a qu’une division : toutes ses personnes sont sous « 1891-D1 ». ' +
        'La coupure de 1871-1881 y est reconstituée maison par maison, et chaque fiche de 1891 dit son territoire.');
      return;
    }
    contenu.innerHTML = '<p class="chargement">Chargement de la fiche…</p>';
    chargerPage(m[1], m[2], m[3])
      .then(function (fragment) {
        var f = fragment[id];
        if (!f) { rendreErreur('Personne introuvable : ' + id); return; }
        rendre(id, f);
      })
      .catch(function () { rendreErreur('La fiche n\'a pas pu être chargée.'); });
  }

  window.addEventListener('hashchange', charger);
  charger();
})();
