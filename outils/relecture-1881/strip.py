import sys
from render import half_image
from align import geometry

def strips(ms, dpi=500, rows=(1,25), band=13, tag="", xa=None, xb=None):
    x0f, x1f, y0f, sf = geometry(ms)
    img = half_image(ms, dpi); W, H = img.size
    top, rh = y0f*H, sf*H
    xa = x0f if xa is None else xa
    xb = x1f if xb is None else xb
    out, n, a, b = [], rows[0], rows[0], rows[1]
    while n <= b:
        m = min(n + band - 1, b)
        c = img.crop((int(xa*W), int(max(0, top+(n-1)*rh-rh*0.35)),
                      int(xb*W), int(min(H, top+m*rh+rh*0.35))))
        f = f"ms{ms:02d}{tag}_L{n:02d}-{m:02d}.png"; c.save(f); out.append((f, c.size)); n = m+1
    return out

if __name__ == "__main__":
    ms = int(sys.argv[1]); band = int(sys.argv[2]) if len(sys.argv) > 2 else 13
    for f, s in strips(ms, band=band): print(f, s)
