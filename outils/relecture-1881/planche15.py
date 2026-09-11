"""La planche de contact des cases de la colonne 15 à trancher.

Une bande par cas, empilées sur une image, chacune étiquetée du nom, de l'âge,
de ce que porte le fichier et de ce que porte le manuscrit. On y voit la colonne
des noms et les colonnes 14-15 côte à côte, plus la marge des numéros de ligne —
de quoi juger sans ouvrir le registre.

    python3 planche15.py cas.json sortie.png

`cas.json` : [{"page":12,"ligne":10,"etiquette":"Bégin Rigobert, 38 — fichier M, manuscrit Ve."}, …]
"""
import json
import sys

sys.path.insert(0, __file__.rsplit('/', 1)[0])
from prof1 import planche, RANGS
from PIL import Image, ImageDraw

MARGE = 470           # la place laissée à l'étiquette
FENETRES = (RANGS, (0.222, 0.360), (0.578, 0.730))


def contact(cas, sortie, dpi=620, avant=1, apres=1):
    bandes = []
    for c in cas:
        l0 = max(1, c['ligne'] - avant)
        l1 = min(25, c['ligne'] + apres)
        f, _ = planche(c['page'], dpi=dpi, fenetres=FENETRES, l0=l0, l1=l1,
                       sortie='/tmp', tag='c15')
        bandes.append((c['etiquette'], Image.open(f).convert('L')))
    larg = max(b.width for _, b in bandes) + MARGE
    haut = sum(b.height + 14 for _, b in bandes)
    out = Image.new('L', (larg, haut), 255)
    dessin = ImageDraw.Draw(out)
    y = 0
    for etiquette, b in bandes:
        out.paste(b, (MARGE, y))
        for i, ligne in enumerate(etiquette.split('\n')):
            dessin.text((10, y + b.height // 2 - 12 + i * 13), ligne, fill=0)
        dessin.line((0, y + b.height + 7, larg, y + b.height + 7), fill=120)
        y += b.height + 14
    out.save(sortie)
    print(sortie, out.size, f'{len(bandes)} cas')


if __name__ == '__main__':
    contact(json.load(open(sys.argv[1])), sys.argv[2])
