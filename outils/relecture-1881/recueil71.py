"""Rendu des recueils PDF du manuscrit de 1871, sous-district C (Etchemin).

Cinq recueils « Recensements_1871NewLiverpool_Partie1..5 », deux pages du
manuscrit par page PDF, la première en haut du cadre, la seconde en bas —
comme ceux de 1891. Trois choses les en distinguent, et toutes trois ont coûté
un détour avant d'être comprises :

1. **Le formulaire de 1871 compte 20 lignes**, non 25, et il est bien moins
   dense. Un cadre entier se lit d'une seule image : il n'y a pas lieu de le
   découper en bandes de colonnes comme on devait le faire en 1891.

2. **La détection par filets de `recueil91.py` ne transfère pas.** Le contraste
   de ces microfilms fait prendre les lignes de texte pour des filets. Ce qui
   marche ici est plus simple et plus sûr : *les cadres sont des rectangles
   clairs sur fond noir*. On segmente donc sur la luminance, pas sur l'encre.

3. **La page 1 de la division 1 est photographiée deux fois**, sur les deux
   moitiés du premier cadre du recueil 1, et le recueil 5 porte deux cadres
   morts entre la fin de la division 1 et le début de la division 2. Le reste
   est régulier : cadre k de la partie n = page `base + k`.

Ce que couvrent les cinq recueils, vérifié en-tête par en-tête sur les
98 cadres : **la division 1 en entier (pages 1 à 78)**, puis les **pages 1 à 16
de la division 2**. Les 57 dernières pages de la division 2 ne sont pas dans
ces PDF.

    import recueil71 as R
    R.cadre(1, 40)                 # image de la page 40 de la division 1
    R.cadre(2, 5, colonnes=(0.0, 0.55))   # moitié gauche seulement
"""
import glob
import os

import numpy as np
import pypdfium2 as pdfium
from PIL import Image, ImageOps

OUT = os.environ.get('R71_OUT', os.path.dirname(os.path.abspath(__file__)))
LIGNES = 20

def _pdf(partie):
    for chemin in sorted(glob.glob('/root/.claude/uploads/**/*.pdf', recursive=True)):
        nom = os.path.basename(chemin).lower()
        if '1871newliverpool' in nom and f'partie{partie}' in nom:
            return chemin
    import sources
    return sources.trouver(f'1871NewLiverpool_Partie{partie}')


_cache = {}


def render(partie, pp, scale):
    cle = (partie, pp, scale)
    if cle not in _cache:
        if len(_cache) > 4:
            _cache.clear()
        _cache[cle] = pdfium.PdfDocument(_pdf(partie))[pp].render(scale=scale).to_pil().convert('L')
    return _cache[cle]


def pages_pdf(partie):
    return len(pdfium.PdfDocument(_pdf(partie)))


def cadres(partie, pp):
    """Bornes verticales des cadres de la page PDF, en fractions de page.

    Deux signaux, parce qu'aucun ne suffit seul. **La texture** dit où est la
    photographie : un cadre de microfilm a du grain et de l'encre, la marge
    blanche du gabarit lettre n'a rien, le fond noir non plus — l'écart-type par
    ligne les sépare tous les trois, là où la seule luminance confond le cadre
    et la marge blanche (page PDF 1 du recueil 5, qui ne porte qu'un cadre).
    **La luminance** dit ensuite où couper quand les deux cadres d'une page se
    touchent : le fond entre eux est le plus sombre du bloc.
    """
    a = np.asarray(render(partie, pp, 2), dtype=float)
    H, W = a.shape
    band = a[:, int(0.15 * W):int(0.85 * W)]
    mu, sd = band.mean(axis=1), band.std(axis=1)
    segs = []
    for i, texture in enumerate(sd > 12):
        if not texture:
            continue
        if segs and i - segs[-1][-1] <= 6:
            segs[-1].append(i)
        else:
            segs.append([i])
    segs = [s for s in segs if len(s) > 0.06 * H]
    if not segs:
        raise RuntimeError(f'aucun cadre détecté, partie {partie} page PDF {pp}')
    sortie = []
    for s in segs:
        d, f = s[0], s[-1]
        if (f - d) < 0.55 * H:            # un seul cadre
            sortie.append((d / H, f / H))
            continue
        milieu = slice(d + int(0.42 * (f - d)), d + int(0.58 * (f - d)))
        coupe = milieu.start + int(np.argmin(mu[milieu]))
        sortie.append((d / H, coupe / H))
        sortie.append((coupe / H, f / H))
    return sortie


def _table():
    """(division, page) → (partie, page PDF, cadre).

    Établi en lisant l'en-tête imprimé « Page N … Division N » des 98 cadres,
    et vérifié au contenu sur les bornes. Trois irrégularités :
      — recueil 1, page PDF 0 : la page 1 y est photographiée deux fois ;
      — recueil 5, page PDF 0 : la page 78 de la division 1, seule, clôt la
        division ; le second cadre de la page PDF est mort ;
      — recueil 5, page PDF 1 : la page 1 de la division 2, **seule sur sa page
        PDF** — c'est la seule page du corpus à ne porter qu'un cadre, et c'est
        elle qui a fait tomber la première version de la détection.
    """
    t = {(1, 1): (1, 0, 0)}
    for k in range(2, 18):                       # recueil 1 : pages 2 à 17
        t[(1, k)] = (1, k // 2, k % 2)
    for partie, base in ((2, 18), (3, 38), (4, 58)):
        for k in range(20):
            t[(1, base + k)] = (partie, k // 2, k % 2)
    t[(1, 78)] = (5, 0, 0)
    t[(2, 1)] = (5, 1, 0)
    for pp in range(2, 10):                      # recueil 5 : division 2, pages 2 à 17
        t[(2, 2 * pp - 2)] = (5, pp, 0)
        t[(2, 2 * pp - 1)] = (5, pp, 1)
    return t


TABLE = None


def locate(division, ms):
    global TABLE
    if TABLE is None:
        TABLE = _table()
    if (division, ms) not in TABLE:
        raise KeyError(f'division {division} page {ms} : hors des recueils joints')
    return TABLE[(division, ms)]


def couverture():
    global TABLE
    if TABLE is None:
        TABLE = _table()
    for div in (1, 2):
        pages = sorted(p for (d, p) in TABLE if d == div)
        print(f'division {div} : pages {min(pages)} à {max(pages)} ({len(pages)} cadres)')


def _angle(band):
    """Inclinaison du cadre, en degrés, cherchée sur les filets imprimés.

    **Ces microfilms sont pris de travers**, d'un demi-degré à deux degrés : sur
    la largeur d'une page, cela déporte le côté droit d'une ligne entière par
    rapport au côté gauche. Une coche de la colonne 17 lue en face du nom de la
    colonne 7 tombe alors sur le mauvais habitant. C'est le piège numéro un de
    ce recueil, et il est invisible tant qu'on ne regarde qu'une bande étroite.

    On cherche l'angle qui rend les filets les plus nets : celui qui maximise la
    variance du profil des sommes de lignes.
    """
    best, angle = None, 0.0
    for a in np.arange(-2.5, 2.51, 0.1):
        r = np.asarray(Image.fromarray(band.astype(np.uint8)).rotate(
            a, resample=Image.BILINEAR, fillcolor=255), dtype=float)
        v = r.mean(axis=1).var()
        if best is None or v > best:
            best, angle = v, float(a)
    return angle


def _bornes_x(im, y0, y1):
    """Bornes horizontales du cadre : on rogne le fond noir de part et d'autre.

    Un cadre occupe rarement toute la largeur de la page PDF, et le noir qui
    l'entoure ne porte rien. Le rogner épargne le tiers de l'image.
    """
    a = np.asarray(im, dtype=float)
    H, W = a.shape
    band = a[int(y0 * H):int(y1 * H), :]
    colonne = band.mean(axis=0)
    clair = [x for x in range(W) if colonne[x] > 90]
    if not clair:
        return 0.0, 1.0
    return max(0.0, clair[0] / W - 0.004), min(1.0, clair[-1] / W + 0.004)


_angles = {}


def redresse(division, ms, scale, marge=0.004):
    """Le cadre entier, redressé — c'est la base de toute lecture."""
    partie, pp, moitie = locate(division, ms)
    y0, y1 = cadres(partie, pp)[moitie]
    im = render(partie, pp, scale)
    W, H = im.size
    x0, x1 = _bornes_x(im, y0, y1)
    boite = (int(x0 * W), int(max(0.0, y0 - marge) * H), int(x1 * W), int(min(1.0, y1 + marge) * H))
    c = im.crop(boite)
    cle = (division, ms)
    if cle not in _angles:
        petit = np.asarray(c.resize((c.width // 4, c.height // 4)), dtype=float)
        _angles[cle] = _angle(petit)
    a = _angles[cle]
    if abs(a) > 0.05:
        c = c.rotate(a, resample=Image.BICUBIC, fillcolor=255, expand=False)
    return ImageOps.autocontrast(c, cutoff=1), a


def cadre(division, ms, scale=5, colonnes=None, nom=None, marge=0.004):
    """Écrit l'image d'une page du manuscrit, redressée, et rend son chemin."""
    c, a = redresse(division, ms, scale, marge)
    if colonnes is not None:
        W = c.width
        c = c.crop((int(colonnes[0] * W), 0, int(colonnes[1] * W), c.height))
    p = nom or os.path.join(OUT, f'r71_D{division}_p{ms:03d}.png')
    c.save(p)
    print(p, c.size, f'redressé de {a:+.1f}°')
    return p


def tranche(division, ms, moitie, scale=8, x0=0.085, nom=None):
    """Une moitié de page, magnifiée : c'est l'instrument de lecture.

    Deux tranches suffisent pour les vingt lignes, avec assez de recouvrement
    pour qu'aucune ne se perde. Chacune va de la marge des numéros de ligne au
    bord droit du formulaire : **les numéros sont imprimés des deux côtés**, et
    ce double ancrage est ce qui rend sûre la lecture des colonnes 15 à 22.

    Attention à la convention du formulaire : **la marge de droite numérote une
    rangée plus bas que celle de gauche**. La rangée 1 ne porte rien à droite,
    la rangée 2 porte « 1 », et ainsi de suite. C'est la marge de gauche qui fait
    foi — c'est elle qui s'aligne sur les noms.

    Et l'écriture du recenseur se pose bas dans la case, presque sur le filet :
    à faible grossissement une marque paraît appartenir à la rangée suivante.
    C'est pour cela qu'on magnifie plutôt que de lire la page entière.
    """
    c, a = redresse(division, ms, scale)
    W, H = c.size
    y0, y1 = ((0.15, 0.56) if moitie == 0 else (0.50, 0.90))
    out = c.crop((int(x0 * W), int(y0 * H), W, int(y1 * H)))
    p = nom or os.path.join(OUT, f'r71_D{division}_p{ms:03d}_{moitie}.png')
    out.save(p)
    print(p, out.size, f'redressé de {a:+.1f}°')
    return p


def paire(division, ms, gauche=(0.09, 0.35), droite=(0.55, 1.00), scale=9, nom=None):
    """Accole deux bandes de colonnes éloignées, pour trancher un alignement.

    Les marques des colonnes 15 à 22 sont de simples traits : rien, dans leur
    voisinage, ne dit à quelle ligne elles appartiennent. On les rend donc
    collées à la colonne des noms. **Le formulaire imprime les numéros de ligne
    aux deux marges**, à gauche et à droite : en prenant la bande de droite
    jusqu'au bord, chaque rangée porte son numéro de part et d'autre et se
    reconnaît sans aucune géométrie. C'est ce qui rend la lecture des coches
    sûre — l'écriture du recenseur se pose bas dans la case, presque sur le
    filet, et l'œil qui compare des milieux de cellule se trompe d'un rang.
    """
    c, a = redresse(division, ms, scale)
    W = c.width
    g = c.crop((int(gauche[0] * W), 0, int(gauche[1] * W), c.height))
    d = c.crop((int(droite[0] * W), 0, int(droite[1] * W), c.height))
    out = Image.new('L', (g.width + 8 + d.width, g.height), 0)
    out.paste(g, (0, 0)); out.paste(d, (g.width + 8, 0))
    p = nom or os.path.join(OUT, f'r71_D{division}_p{ms:03d}_paire.png')
    out.save(p)
    print(p, out.size, f'redressé de {a:+.1f}°')
    return p


if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == 'couverture':
        couverture()
    else:
        div = int(sys.argv[1])
        for ms in [int(a) for a in sys.argv[2:]]:
            cadre(div, ms)
