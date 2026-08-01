import sys
from render import half_image
from align import geometry

def zoom(ms, l0, l1, dx0=0.0, dx1=1.0, dpi=900, name="zoom"):
    """dx0/dx1 = position relative dans la bande de colonnes (0=marge, 1=col.10)"""
    x0f, x1f, y0f, sf = geometry(ms)
    img = half_image(ms, dpi); W, H = img.size
    top, rh = y0f*H, sf*H
    xa = (x0f + (x1f-x0f)*dx0)*W; xb = (x0f + (x1f-x0f)*dx1)*W
    c = img.crop((int(xa), int(top+(l0-1)*rh-rh*0.3), int(xb), int(top+l1*rh+rh*0.3)))
    f = f"{name}_ms{ms:02d}_L{l0:02d}-{l1:02d}.png"; c.save(f); print(f, c.size); return f

if __name__ == "__main__":
    a = sys.argv
    zoom(int(a[1]), int(a[2]), int(a[3]),
         float(a[4]) if len(a) > 4 else 0.0, float(a[5]) if len(a) > 5 else 1.0,
         int(a[6]) if len(a) > 6 else 900)
