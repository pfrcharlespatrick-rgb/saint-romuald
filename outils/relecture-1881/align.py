"""Aligne chaque demi-page sur la page 25 (calibrée à la main) par corrélation du formulaire imprimé."""
import numpy as np
from functools import lru_cache
from render import half_image

DPI_REF = 150
REF_MS  = 25
REF_Y0F, REF_Y1F = 0.2260, 0.7170      # haut ligne 1, bas ligne 25 (mesuré sur ms25)
REF_X0F, REF_X1F = 0.0800, 0.4150      # marge n° de ligne -> colonne 10

def _detail(a, axis):
    """énergie de haute fréquence : traits et texte ressortent, bordure noire et papier vierge non"""
    d = np.abs(np.diff(a, axis=axis))
    return d

def _prof(ms):
    a = np.asarray(half_image(ms, DPI_REF).convert('L'), dtype=np.float32)
    H, W = a.shape
    py = _detail(a[:, int(0.08*W):int(0.90*W)], 1).mean(axis=1)
    px = _detail(a[int(0.20*H):int(0.80*H), :], 0).mean(axis=0)
    n = lambda v: (v - v.mean()) / (v.std() + 1e-6)
    return n(py), n(px), a.shape

def _shift(ref, tgt, maxs):
    best = (None, 0)
    for d in range(-maxs, maxs + 1):
        r = ref[max(0, -d): len(ref) - max(0, d)]
        t = tgt[max(0, d): len(tgt) - max(0, -d)]
        m = min(len(r), len(t))
        if m < len(ref) * 0.5: continue
        sc = float((r[:m] * t[:m]).mean())
        if best[0] is None or sc > best[0]: best = (sc, d)
    return best[1]

@lru_cache(maxsize=None)
def geometry(ms):
    """-> (x0f, x1f, y_row1_frac, row_step_frac) pour la demi-page ms"""
    ry, rx, rshape = _prof(REF_MS)
    if ms == REF_MS:
        dy = dx = 0; shape = rshape
    else:
        ty, tx, shape = _prof(ms)
        dy = _shift(ry, ty, 220)
        dx = _shift(rx, tx, 90)
    H, W = shape
    y0 = REF_Y0F * rshape[0] + dy
    step = (REF_Y1F - REF_Y0F) * rshape[0] / 25.0
    x0 = REF_X0F * rshape[1] + dx
    x1 = REF_X1F * rshape[1] + dx
    return x0 / W, x1 / W, y0 / H, step / H

if __name__ == "__main__":
    import sys
    for ms in [int(v) for v in sys.argv[1:]] or [25, 26, 27, 28]:
        print(ms, tuple(round(v, 4) for v in geometry(ms)))
