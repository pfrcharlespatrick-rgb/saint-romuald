# Rendu du PDF 1891-D1, pages 62-83 (2 demi-pages par page PDF)
import pypdfium2 as pdfium
from PIL import Image, ImageOps
from functools import lru_cache
import os
PDF='/root/.claude/uploads/edc6c2d8-4531-5db6-9e49-4c2e110369fc/30be37f9-Pages_de_Pages_de_1891_Partie021121.pdf'
OUT=os.path.dirname(os.path.abspath(__file__))
BASE=62
@lru_cache(maxsize=4)
def render(pdfpage, scale):
    pdf=pdfium.PdfDocument(PDF)
    return pdf[pdfpage].render(scale=scale).to_pil().convert('L')
def locate(ms):
    k=ms-BASE
    return k//2, k%2   # (page PDF, 0=haut 1=bas)
def half(ms, scale=8):
    pp,h=locate(ms)
    im=render(pp,scale)
    W,H=im.size
    return im.crop((0, 0 if h==0 else H//2, W, H//2 if h==0 else H))
OVERRIDES={}
def grid(ms):
    # constantes par parité (haut/bas de la page PDF), vérifiées pages 62-83
    if ms in OVERRIDES: return OVERRIDES[ms]
    return (0.520,0.995) if locate(ms)[1]==0 else (0.227,0.712)
def strip(ms, l0, l1, x0f=0.0, x1f=1.0, scale=8, name=None, ac=True):
    im=half(ms,scale)
    W,H=im.size
    t,b=grid(ms)
    step=(b-t)*H/25.0
    y1=t*H+step*0.55  # centre de la ligne 1
    ya=int(y1+(l0-1)*step-0.75*step); yb=int(y1+(l1-1)*step+0.85*step)
    c=im.crop((int(x0f*W), max(0,ya), int(x1f*W), min(H,yb)))
    if ac: c=ImageOps.autocontrast(c,cutoff=1)
    p=os.path.join(OUT, name or f'ms{ms}_L{l0:02d}-{l1:02d}.png')
    c.save(p); print(p, c.size)
