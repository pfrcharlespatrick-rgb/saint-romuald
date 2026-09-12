"""Les colonnes 17 à 25 de 1891 division 1, une page en deux bandes.

**Pourquoi cette vue plutôt qu'un recadrage libre.** Onze colonnes étroites se
suivent sur la moitié droite du formulaire (17 à 25, puis la marge des numéros
de ligne). Rien, dans la bande seule, ne dit laquelle est laquelle : la seule
parade est d'empiler au-dessus la **rangée imprimée des numéros de colonne**,
comme `prof1.py --reglette` pour 1881. C'est `vue91.bande` qui le fait.

**Les numéros de ligne sont recopiés à gauche.** Le formulaire ne les porte
qu'à droite, à sept colonnes de la 17 ; une coche écrite haut dans sa case se
retrouve alors à mi-chemin entre deux numéros, et l'œil hésite d'une ligne.
C'est exactement l'erreur qui a produit les faux patrons. La bande recopie donc
la marge **contre la colonne 17**, de sorte que chaque marque ait un numéro à
sa gauche immédiate et un à sa droite. Rien n'est déplacé ni redessiné : c'est
la même bande de pixels, collée deux fois.

**Le cadrage.** `0.672`–`0.915` va du filet 16|17 au bord droit de la marge.
La position exacte des filets varie d'une page à l'autre, d'où le repérage du
dernier filet vertical plutôt qu'une abscisse fixe.

**Deux bandes et non une.** Vingt-cinq lignes sur une seule image se lisent
trop petit une fois l'image réduite. Les deux bandes se chevauchent d'une ligne
et débordent d'une ligne de chaque côté : la grille des 25 rangs que
`recueil91.frame` déduit des filets se décale parfois d'un rang entier (page 1),
et une bande calée au plus juste perdrait alors la ligne 25. Le débord ne coûte
rien — les numéros imprimés disent de toute façon quel rang est lequel.

    python3 c1725.py 110 111 112        # deux images par page
    python3 c1725.py 110 --entier       # une seule, pour un coup d'œil
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from PIL import Image
from vue91 import bande

X0, X1 = 0.672, 0.915
OUT = os.environ.get('Z91_OUT', '/tmp')


def _marge(a):
    """Bornes en x de la marge des numéros de ligne, dans la bande déjà découpée."""
    H, W = a.shape
    sombre = (a < np.percentile(a, 30) - 8).mean(axis=0)
    gs = []
    for x in (x for x in range(W) if sombre[x] > 0.5):
        if gs and x - gs[-1][-1] <= 4:
            gs[-1].append(x)
        else:
            gs.append([x])
    if not gs:
        return int(0.86 * W), W
    # Le filet extérieur du formulaire tombe juste au-delà du cadrage sur la
    # plupart des pages : la marge va du filet 25|marge au bord de la bande.
    if gs[-1][0] > 0.93 * W and len(gs) > 1:
        return gs[-2][-1], gs[-1][0]
    return gs[-1][-1], W


def _recopier_marge(chemin):
    im = Image.open(chemin).convert('L')
    a = np.asarray(im, dtype=float)
    x0, x1 = _marge(a)
    m = im.crop((x0, 0, x1, im.height))
    out = Image.new('L', (im.width + m.width + 6, im.height), 255)
    out.paste(m, (0, 0))
    out.paste(im, (m.width + 6, 0))
    out.save(chemin)
    return chemin


def page(ms, entier=False, scale=9, sortie=None):
    import r91e
    s = sortie or OUT
    coupes = [(0, 26)] if entier else [(0, 14), (12, 26)]
    return [_recopier_marge(bande(r91e.R, ms, a, b, X0, X1, scale, s, 'c')) for a, b in coupes]


if __name__ == '__main__':
    entier = '--entier' in sys.argv
    for a in sys.argv[1:]:
        if not a.startswith('--'):
            page(int(a), entier)
