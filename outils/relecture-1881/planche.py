"""Une planche de contact : une rangée de manuscrit, découpée page à page.

À QUOI ÇA SERT. Quand un contrôle sort trente lignes à trancher, éparpillées sur
trente pages, les rendre une par une coûte trente images. On découpe donc, pour
chacune, la seule bande qui porte le nom, l'âge et les colonnes en cause, et on
les empile sur une planche unique, chaque bande étiquetée.

Le gain n'est pas seulement le nombre d'images : **l'œil compare les chiffres
entre eux**. C'est ce qui permet de distinguer un 2 d'un 8 dans cette main, là où
une bande isolée laisse hésiter.

    python3 planche.py "2:16:16,2:19:20,1:4:13" sortie.png

Chaque cas s'écrit `division:page:ligne`.

DEUX PIÈGES, appris à l'usage.

1. **Le calibrage dérive d'une page à l'autre**, d'un rang parfois deux : la
   hauteur du cadre n'est pas constante d'une prise de vue à l'autre. La parade
   est de partir de `x0 = 0.085`, c'est-à-dire d'inclure **la marge des numéros
   de ligne** : le numéro imprimé lève le doute, et l'on n'a plus besoin que le
   calibrage tombe juste — seulement qu'il tombe à trois rangs près.

2. **La bande doit être large de trois rangées de part et d'autre**, pour la même
   raison. Une bande serrée sur la rangée visée la manque une fois sur trois.

Calibré pour les recueils de 1871 (`recueil71.py`, vingt lignes par page). Pour
1881 ou 1891, changer l'import et les deux constantes de `bande` : le pas d'une
rangée et l'ordonnée de la première.
"""
import sys

sys.path.insert(0, __file__.rsplit('/', 1)[0])
import recueil71 as R
from PIL import Image, ImageDraw

# La rangée n a son centre vers ORIGINE + n * PAS de la hauteur du cadre redressé.
ORIGINE, PAS = 0.2528, 0.0311
MARGE_HAUT, MARGE_BAS = 0.085, 0.065      # trois rangées de part et d'autre
X0, X1 = 0.085, 0.47                      # de la marge des numéros à la colonne 10


def bande(division, page, ligne):
    cadre, _ = R.redresse(division, page, 9)
    W, H = cadre.size
    y = ORIGINE + ligne * PAS
    return cadre.crop((int(X0 * W), int((y - MARGE_HAUT) * H),
                       int(X1 * W), int((y + MARGE_BAS) * H)))


def planche(cas, sortie):
    bandes = [(f'D{d} p{p} L{l}', bande(d, p, l)) for d, p, l in cas]
    larg = max(im.width for _, im in bandes) + 230
    haut = sum(im.height + 8 for _, im in bandes)
    out = Image.new('L', (larg, haut), 255)
    dessin = ImageDraw.Draw(out)
    y = 0
    for etiquette, im in bandes:
        out.paste(im, (230, y))
        dessin.text((10, y + im.height // 2 - 6), etiquette, fill=0)
        dessin.line((0, y + im.height + 4, larg, y + im.height + 4), fill=170)
        y += im.height + 8
    out.save(sortie)
    print(sortie, out.size, f'{len(bandes)} bandes')
    return sortie


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('usage : python3 planche.py "div:page:ligne,div:page:ligne,…" sortie.png')
        raise SystemExit(1)
    planche([tuple(int(x) for x in c.split(':')) for c in sys.argv[1].split(',')], sys.argv[2])
