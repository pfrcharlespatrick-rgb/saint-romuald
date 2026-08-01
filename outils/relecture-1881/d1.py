"""Outillage division 1 — repérage, recalage, découpe."""
import numpy as np
from functools import lru_cache
from PIL import Image
from render1 import half_raw

def locate(ms):
    """page manuscrit 1..88 -> (partie 0-2, index de demi-page 1..30)"""
    if ms <= 29:  return 0, ms + 1      # la partie 1 s'ouvre sur une page de titre
    if ms <= 59:  return 1, ms - 29
    return 2, ms - 59

def half_image(ms, dpi=150):
    part, idx = locate(ms)
    return half_raw(part, idx, dpi)

REF_MS = 1
REF_Y0F, REF_Y1F = 0.2304, 0.7204          # haut ligne 1, bas ligne 25 (calibré sur ms1)
REF_X0F, REF_X1F = 0.075, 0.420

def _prof(ms):
    a = np.asarray(half_image(ms, 150).convert('L'), dtype=np.float32)
    H, W = a.shape
    py = np.abs(np.diff(a[:, int(0.08*W):int(0.90*W)], axis=1)).mean(axis=1)
    px = np.abs(np.diff(a[int(0.20*H):int(0.80*H), :], axis=0)).mean(axis=0)
    n = lambda v: (v - v.mean()) / (v.std() + 1e-6)
    return n(py), n(px), a.shape

def _shift(ref, tgt, maxs):
    best = (None, 0)
    for d in range(-maxs, maxs + 1):
        r = ref[max(0,-d): len(ref)-max(0,d)]; t = tgt[max(0,d): len(tgt)-max(0,-d)]
        m = min(len(r), len(t))
        if m < len(ref)*0.5: continue
        sc = float((r[:m]*t[:m]).mean())
        if best[0] is None or sc > best[0]: best = (sc, d)
    return best[1]

@lru_cache(maxsize=None)
def geometry(ms):
    ry, rx, rshape = _prof(REF_MS)
    if ms == REF_MS: dy = dx = 0; shape = rshape
    else:
        ty, tx, shape = _prof(ms); dy = _shift(ry, ty, 240); dx = _shift(rx, tx, 90)
    H, W = shape
    y0 = REF_Y0F*rshape[0] + dy
    step = (REF_Y1F - REF_Y0F)*rshape[0]/25.0
    return (REF_X0F*rshape[1]+dx)/W, (REF_X1F*rshape[1]+dx)/W, y0/H, step/H

def strips(ms, dpi=500, band=13, xa=None, xb=None, tag=""):
    x0f, x1f, y0f, sf = geometry(ms)
    img = half_image(ms, dpi); W, H = img.size
    top, rh = y0f*H, sf*H
    xa = x0f if xa is None else xa; xb = x1f if xb is None else xb
    out, n = [], 1
    while n <= 25:
        m = min(n+band-1, 25)
        c = img.crop((int(xa*W), int(max(0, top+(n-1)*rh-rh*0.35)), int(xb*W), int(min(H, top+m*rh+rh*0.35))))
        f = f"d1_ms{ms:02d}{tag}_L{n:02d}-{m:02d}.png"; c.save(f); out.append(f); n = m+1
    return out

def zoom(ms, l0, l1, dx0=0.0, dx1=1.0, dpi=900, name="z"):
    x0f, x1f, y0f, sf = geometry(ms)
    img = half_image(ms, dpi); W, H = img.size
    top, rh = y0f*H, sf*H
    xa = (x0f + (x1f-x0f)*dx0)*W; xb = (x0f + (x1f-x0f)*dx1)*W
    c = img.crop((int(xa), int(top+(l0-1)*rh-rh*0.3), int(xb), int(top+l1*rh+rh*0.3)))
    f = f"{name}_d1ms{ms:02d}_L{l0:02d}-{l1:02d}.png"; c.save(f); print(f, c.size); return f
