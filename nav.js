// Sous 760px, la barre de rubriques est une seule ligne qui défile (voir
// site.css, « les onglets sur une seule ligne »). Sur les dernières rubriques
// l'onglet courant se trouve alors hors du champ : on l'y ramène, sans
// animation au chargement pour ne pas donner l'impression d'un glissement.
(function () {
  'use strict';
  var nav = document.querySelector('nav.onglets');
  if (!nav) return;
  var actif = nav.querySelector('a.actif');
  if (!actif) return;
  function recadrer() {
    if (nav.scrollWidth <= nav.clientWidth) { nav.scrollLeft = 0; return; }
    var marge = 24;
    var gauche = actif.offsetLeft - marge;
    var droite = actif.offsetLeft + actif.offsetWidth + marge - nav.clientWidth;
    if (gauche < nav.scrollLeft) nav.scrollLeft = Math.max(0, gauche);
    else if (droite > nav.scrollLeft) nav.scrollLeft = droite;
  }
  recadrer();
  window.addEventListener('resize', recadrer);
})();
