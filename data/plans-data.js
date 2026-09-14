// Plans anciens posés en surimpression de la carte — voir docs/LIEUX.md.
//
// VIDE depuis le 14 septembre 2026. Les cinq plans qui s'y trouvaient — le
// cadastre de 1879 et les quatre feuilles Goad de 1876 — ont été retirés avec
// leurs images : aucun n'avait pu être calé de façon sûre, et un ancrage posé à
// l'œil sur une carte de recherche est une erreur qui se propage. On les
// reposera depuis les numéros de lot et les renvois Goad que Patrick consigne
// désormais dans les notes des lieux. Tout ce qu'il faut pour cela — cotes
// d'archives, contenu de chaque feuille, et ce que les calages successifs
// avaient appris — est gardé dans docs/PLANS-ANCIENS.md.
//
// Chaque plan est une image rangée dans assets/plans/, ancrée par trois coins
// (nord-ouest, nord-est, sud-ouest de l'IMAGE, pas du terrain : si le plan est
// tourné, ses coins le sont aussi). Tant que `cale` est false, le plan
// n'apparaît qu'en mode Atelier, pour être calé ; une fois marqué calé, la
// carte publique l'offre en surimpression avec son réglage de transparence.
//
// Le calage se fait sur la carte (carte.html, mode Atelier), s'enregistre dans
// localStorage sous `suivi-plans`, voyage dans la sauvegarde de l'atelier, et
// se verse ici par `node outils/lieux/fondre.mjs`.
window.PLANS = {
  "format": "plans-saint-romuald",
  "version": 1,
  "mis_a_jour": "2026-09-14",
  "plans": []
};
