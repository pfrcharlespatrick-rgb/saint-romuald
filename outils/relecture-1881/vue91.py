"""Une bande du manuscrit de 1891 avec la réglette imprimée des numéros de colonne.

`recueil91.strip` découpe bien, mais sans repère horizontal : sur la moitié
droite du formulaire de 1891, onze colonnes étroites se suivent (17 à 25) et
lire une marque d'une colonne à côté est trop facile. Cette vue-ci empile
au-dessus de la bande **la rangée imprimée des numéros**, prise aux mêmes
abscisses — la même parade que `prof1.py --reglette` pour 1881.

    python3 vue91.py 11 1 3 --x=0.30,0.92
"""
import sys

sys.path.insert(0, __file__.rsplit('/', 1)[0])
from PIL import Image, ImageOps

# Bords relevés sur l'en-tête imprimé, en fractions de largeur de page.
NOMS = (0.16, 0.37)       # colonnes 6 à 9 : noms, sexe, âge, état matrimonial
ALPHA = (0.775, 0.905)    # colonnes 21 à 25, plus les numéros de ligne de droite
TRAVAIL = (0.60, 0.80)    # colonnes 16 à 20 : profession, patron, employé, chômage


def bande(R, ms, l0, l1, x0, x1, scale=9, sortie='.', tag='v'):
    t, b = R.frame(ms)
    im = R.render(R.locate(ms)[0], scale)
    W, H = im.size
    step = (b - t) * H / 25.0
    y1 = t * H + step * 0.55
    ya = int(y1 + (l0 - 1) * step - 0.8 * step)
    yb = int(y1 + (l1 - 1) * step + 0.85 * step)
    corps = im.crop((int(x0 * W), max(0, ya), int(x1 * W), min(H, yb)))
    # La rangée des numéros de colonne tient juste au-dessus du filet du haut.
    tete = im.crop((int(x0 * W), int(t * H - 0.0105 * H), int(x1 * W), int(t * H - 0.0015 * H)))
    out = Image.new('L', (max(tete.width, corps.width), tete.height + corps.height + 5), 255)
    out.paste(tete, (0, 0))
    out.paste(corps, (0, tete.height + 5))
    out = ImageOps.autocontrast(out, cutoff=1)
    f = f'{sortie}/ms{ms}_{tag}_L{l0:02d}-{l1:02d}.png'
    out.save(f)
    print(f, out.size)
    return f


if __name__ == '__main__':
    import r91e
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    x0, x1 = ALPHA
    sortie, scale = '.', 9
    for a in sys.argv[1:]:
        if a.startswith('--x='): x0, x1 = (float(v) for v in a.split('=', 1)[1].split(','))
        if a.startswith('--sortie='): sortie = a.split('=', 1)[1]
        if a.startswith('--scale='): scale = int(a.split('=', 1)[1])
    bande(r91e.R, int(args[0]), int(args[1]), int(args[2]), x0, x1, scale, sortie)
