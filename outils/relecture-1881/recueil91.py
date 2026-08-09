"""Rendu des recueils PDF du manuscrit de 1891, division 1.

Les trois recueils sont bâtis pareil : deux pages du manuscrit par page PDF,
la première en haut du cadre, la seconde en bas. Seuls changent le PDF et le
numéro de la première page. `r91.py`, `r91b.py` et `r91c.py` n'en sont que des
instances.
"""
import pypdfium2 as pdfium
from PIL import ImageOps
from functools import lru_cache
import numpy as np, os

OUT = os.path.dirname(os.path.abspath(__file__))


class Recueil:
    def __init__(self, motif, base, echanges=None):
        self.motif, self.base, self.echanges = motif, base, echanges or {}
        self._pdf = None
        self._filets, self._frame, self._ref = {}, {}, {}

    @property
    def pdf(self):
        # résolu à la première demande : un recueil absent de la session ne doit
        # pas empêcher d'importer le module pour un autre.
        if self._pdf is None:
            import sources
            self._pdf = sources.trouver(self.motif)
        return self._pdf

    @lru_cache(maxsize=3)
    def _render(self, pp, scale):
        return pdfium.PdfDocument(self.pdf)[pp].render(scale=scale).to_pil().convert('L')

    def render(self, pp, scale):
        return self._render(pp, scale)

    def pages(self):
        return len(pdfium.PdfDocument(self.pdf))

    def locate(self, ms):
        """(page PDF, moitié) — 0 pour le cadre du haut, 1 pour celui du bas."""
        k = self.echanges.get(ms, ms) - self.base
        return k // 2, k % 2

    def filets(self, ms):
        """Ordonnées des filets pleine largeur du cadre, en fractions de page."""
        if ms in self._filets:
            return self._filets[ms]
        pp, _ = self.locate(ms)
        a = np.asarray(self.render(pp, 3), dtype=float)
        H, W = a.shape
        band = a[:, int(0.12 * W):int(0.85 * W)]
        frac = (band < np.percentile(band, 25) - 8).mean(axis=1)
        rows = [i for i in range(H) if frac[i] > 0.30]
        gs = []
        for i in rows:
            if gs and i - gs[-1][-1] <= 5:
                gs[-1].append(i)
            else:
                gs.append([i])
        self._filets[ms] = [(g[0] + g[-1]) / 2 / H for g in gs]
        return self._filets[ms]

    def _candidats(self, ms):
        lo, hi = ((0.19, 0.34) if self.locate(ms)[1] == 0 else (0.54, 0.68))
        return [m for m in self.filets(ms) if lo < m < hi]

    def _reference(self, h):
        """Ordonnée typique du haut de table, sur l'ensemble du recueil.

        Le filet du haut tombe au même endroit à quelques millièmes près d'une
        page à l'autre. Prendre simplement le plus bas des filets candidats
        suffit presque partout, mais une réglure parasite le fait sauter de six
        lignes (page 99) : la médiane du recueil sert de garde-fou.
        """
        if h not in self._ref:
            v = [max(c) for ms in range(self.base, self.base + 2 * self.pages())
                 if self.locate(ms)[1] == h for c in [self._candidats(ms)] if c]
            self._ref[h] = float(np.median(v))
        return self._ref[h]

    def frame(self, ms):
        """Bornes verticales du cadre : filet du haut des 25 lignes, filet du bas."""
        if ms in self._frame:
            return self._frame[ms]
        c = self._candidats(ms)
        if not c:
            raise RuntimeError('haut de table non trouvé p.%s: %s'
                               % (ms, [round(m, 3) for m in self.filets(ms)]))
        ref = self._reference(self.locate(ms)[1])
        proches = [m for m in c if m <= ref + 0.03]
        t = max(proches) if proches else max(c)
        # 25 lignes occupent 0.235 de la page : entre deux filets candidats pour
        # le bas, retenir celui qui en approche le plus (page 62, où une réglure
        # intermédiaire arrive la première).
        bots = [m for m in self.filets(ms) if t + 0.20 < m < t + 0.26]
        self._frame[ms] = (t, min(bots, key=lambda m: abs(m - t - 0.235)) if bots else t + 0.235)
        return self._frame[ms]

    def strip(self, ms, l0, l1, x0f=0.0, x1f=1.0, scale=8, name=None, ac=True):
        t, b = self.frame(ms)
        im = self.render(self.locate(ms)[0], scale)
        W, H = im.size
        step = (b - t) * H / 25.0
        y1 = t * H + step * 0.55
        ya = int(y1 + (l0 - 1) * step - 0.75 * step)
        yb = int(y1 + (l1 - 1) * step + 0.85 * step)
        c = im.crop((int(x0f * W), max(0, ya), int(x1f * W), min(H, yb)))
        if ac:
            c = ImageOps.autocontrast(c, cutoff=1)
        p = name or os.path.join(OUT, f'ms{ms}_L{l0:02d}-{l1:02d}.png')
        c.save(p)
        print(p, c.size)
        return p
