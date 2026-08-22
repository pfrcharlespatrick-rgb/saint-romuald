// L.ImageOverlay.Pivote — une image posée sur la carte par trois points
// d'ancrage (coin nord-ouest, coin nord-est, coin sud-ouest), et non par un
// simple rectangle : le plan peut donc être tourné et cisaillé pour épouser
// le terrain. C'est le « caler le plan sur trois points » annoncé dans
// docs/archive/HEBERGEMENT.md pour les plans anciens.
//
// Écrit pour ce projet (pas de greffon extérieur : le site n'embarque que ce
// qu'il range lui-même dans lib/). Même licence que le site.
(function () {
  'use strict';
  if (!window.L) return;

  L.ImageOverlay.Pivote = L.ImageOverlay.extend({

    // nw, ne, sw : [lat, lon] — les trois coins de l'image, dans cet ordre.
    initialize: function (url, nw, ne, sw, options) {
      this._url = url;
      this._coinNW = L.latLng(nw);
      this._coinNE = L.latLng(ne);
      this._coinSW = L.latLng(sw);
      L.setOptions(this, options);
    },

    setPoints: function (nw, ne, sw) {
      this._coinNW = L.latLng(nw);
      this._coinNE = L.latLng(ne);
      this._coinSW = L.latLng(sw);
      if (this._map) this._reset();
      return this;
    },

    getPoints: function () {
      return { nw: this._coinNW, ne: this._coinNE, sw: this._coinSW };
    },

    // Le quatrième coin est déduit (SE = NE + SW − NW) : utile pour cadrer.
    getBounds: function () {
      var se = L.latLng(
        this._coinNE.lat + this._coinSW.lat - this._coinNW.lat,
        this._coinNE.lng + this._coinSW.lng - this._coinNW.lng
      );
      return L.latLngBounds([this._coinNW, this._coinNE, this._coinSW, se]);
    },

    _initImage: function () {
      L.ImageOverlay.prototype._initImage.call(this);
      // La matrice dépend des dimensions naturelles : repositionner dès que
      // l'image est connue.
      this.on('load', this._reset, this);
      this._image.style.transformOrigin = '0 0';
      this._image.style.maxWidth = 'none';
    },

    _matrice: function (pNW, pNE, pSW) {
      var img = this._image;
      var w = img.naturalWidth, h = img.naturalHeight;
      if (!w || !h) return null;
      var vx = pNE.subtract(pNW), vy = pSW.subtract(pNW);
      return 'translate3d(' + pNW.x + 'px,' + pNW.y + 'px,0) ' +
        'matrix(' + vx.x / w + ',' + vx.y / w + ',' + vy.x / h + ',' + vy.y / h + ',0,0)';
    },

    _reset: function () {
      if (!this._map || !this._image) return;
      var t = this._matrice(
        this._map.latLngToLayerPoint(this._coinNW),
        this._map.latLngToLayerPoint(this._coinNE),
        this._map.latLngToLayerPoint(this._coinSW)
      );
      if (t) this._image.style.transform = t;
    },

    // Pendant l'animation de zoom, Leaflet demande la position au niveau de
    // zoom cible — la version de base lit `_bounds`, que nous n'avons pas.
    _animateZoom: function (e) {
      if (!this._map || !this._image) return;
      var t = this._matrice(
        this._map._latLngToNewLayerPoint(this._coinNW, e.zoom, e.center),
        this._map._latLngToNewLayerPoint(this._coinNE, e.zoom, e.center),
        this._map._latLngToNewLayerPoint(this._coinSW, e.zoom, e.center)
      );
      if (t) this._image.style.transform = t;
    }
  });

  L.imageOverlay.pivote = function (url, nw, ne, sw, options) {
    return new L.ImageOverlay.Pivote(url, nw, ne, sw, options);
  };
})();
