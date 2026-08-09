# Rendu du PDF 1891-D1 pages 84-142 (cadres décalés, détection par bandes noires)
import pypdfium2 as pdfium
from PIL import Image, ImageOps
from functools import lru_cache
import numpy as np, os
import sources
PDF=sources.trouver('1891_DIV12_Partie03')
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
@lru_cache(maxsize=64)
def filets(ms):
    # ordonnées des filets pleine largeur du cadre, en fractions de la page
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
    return [(g[0]+g[-1])/2/H for g in gs]
def _candidats(ms):
    h=locate(ms)[1]
    lo,hi=((0.19,0.34) if h==0 else (0.54,0.68))
    return [m for m in filets(ms) if lo<m<hi]
@lru_cache(maxsize=2)
def _reference(h):
    """Ordonnée typique du haut de table, sur l'ensemble du recueil.

    Le filet du haut tombe au même endroit à quelques millièmes près d'une page
    à l'autre. Prendre simplement le plus bas des filets candidats suffit
    presque partout, mais une réglure parasite le fait sauter de six lignes
    (page 99). La médiane du recueil sert donc d'ancre : chaque page retient
    celui de ses candidats qui en est le plus proche.
    """
    v=[]
    for ms in range(BASE, BASE+2*len(pdfium.PdfDocument(PDF))):
        if locate(ms)[1]!=h: continue
        c=_candidats(ms)
        if c: v.append(max(c))
    return float(np.median(v))
@lru_cache(maxsize=64)
def frame(ms):
    # bornes verticales du cadre : filet du haut des 25 lignes, filet du bas
    c=_candidats(ms)
    if not c: raise RuntimeError('haut de table non trouvé p.%s: %s'%(ms,[round(m,3) for m in filets(ms)]))
    # le plus bas des filets candidats est le haut de la table — sauf quand une
    # réglure parasite le fait sauter de plusieurs lignes (page 99) : d'où le
    # garde-fou de l'ordonnée typique du recueil.
    ref=_reference(locate(ms)[1])
    proches=[m for m in c if m<=ref+0.03]
    t=max(proches) if proches else max(c)
    mids=filets(ms)
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
