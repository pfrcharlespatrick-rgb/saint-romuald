# Rendu du PDF 1891-D1 pages 84-142 (cadres décalés, détection par bandes noires)
import pypdfium2 as pdfium
from PIL import Image, ImageOps
from functools import lru_cache
import numpy as np, os
PDF='/root/.claude/uploads/edc6c2d8-4531-5db6-9e49-4c2e110369fc/323a9d56-1891_DIV12_Partie03.pdf'
OUT=os.path.dirname(os.path.abspath(__file__))
BASE=84
@lru_cache(maxsize=3)
def render(pp, scale):
    return pdfium.PdfDocument(PDF)[pp].render(scale=scale).to_pil().convert('L')
# Les cadres 89 et 90 sont intervertis sur le microfilm : l'en-tête imprimé
# « PAGE nn » de chaque cadre fait foi, et les données suivent cet ordre.
ECHANGES={89:90, 90:89}
def locate(ms):
    k=ECHANGES.get(ms, ms)-BASE
    return k//2, k%2
@lru_cache(maxsize=8)
def frame(ms):
    # bornes verticales du cadre, en fractions de la page, via le filet noir
    # épais qui ouvre chaque cadre et la réglure : on détecte les deux filets
    # pleine largeur de la table (haut des 25 lignes, bas)
    pp,h=locate(ms)
    im=render(pp,3); a=np.asarray(im,dtype=float)
    H,W=a.shape
    band=a[:,int(0.12*W):int(0.85*W)]
    thr=np.percentile(band,25)-8
    frac=(band<thr).mean(axis=1)
    rows=[i for i in range(H) if frac[i]>0.30]
    gs=[]
    for i in rows:
        if gs and i-gs[-1][-1]<=5: gs[-1].append(i)
        else: gs.append([i])
    mids=[(g[0]+g[-1])/2/H for g in gs]
    lo,hi=((0.19,0.34) if h==0 else (0.54,0.68))
    tops=[m for m in mids if lo<m<hi]
    if not tops: raise RuntimeError('haut de table non trouvé p.%s: %s'%(ms,[round(m,3) for m in mids]))
    t=max(tops)
    bots=[m for m in mids if t+0.20<m<t+0.26]
    b=bots[0] if bots else t+0.235
    return (t,b)
def strip(ms, l0, l1, x0f=0.0, x1f=1.0, scale=8, name=None, ac=True):
    t,b=frame(ms)
    im=render(locate(ms)[0], scale)
    W,H=im.size
    step=(b-t)*H/25.0
    y1=t*H+step*0.55
    ya=int(y1+(l0-1)*step-0.75*step); yb=int(y1+(l1-1)*step+0.85*step)
    c=im.crop((int(x0f*W), max(0,ya), int(x1f*W), min(H,yb)))
    if ac: c=ImageOps.autocontrast(c,cutoff=1)
    p=os.path.join(OUT, name or f'ms{ms}_L{l0:02d}-{l1:02d}.png')
    c.save(p); print(p, c.size)
