"""Monte en planche le « PAGE n » imprimé en tête des demi-pages d'un recueil.

À QUOI ÇA SERT. Le découpage de `d1.locate` — quelle demi-page de quel PDF porte
telle page du manuscrit — **dépend des fichiers déposés dans la session**, et le
même nom de fichier a déjà désigné tantôt un tiers du manuscrit, tantôt le
manuscrit entier. Une erreur d'un rang ne se voit pas : elle rend une page
voisine, qui a l'air d'une page.

Le formulaire porte son numéro imprimé en tête, à gauche. Ce script en fait une
planche : une ligne par demi-page demandée, le numéro lisible à l'œil. Trois
sondages par recueil suffisent à fixer le découpage.

    python3 verif_pages.py 0 1,2,3,30
    python3 verif_pages.py 1 2,3,31,61,90 --sortie=/tmp
    python3 verif_pages.py --tout          # le premier, le deuxième et le dernier de chaque
"""
import sys

sys.path.insert(0, __file__.rsplit('/', 1)[0])
from render1 import half_raw
from PIL import Image, ImageDraw
import pypdfium2 as pdfium
from sources import D1


def planche(cas, sortie='.'):
    """cas : liste de (partie, idx)."""
    bandes = []
    for part, idx in cas:
        im = half_raw(part, idx, 160).convert('L')
        W, H = im.size
        bandes.append((f'recueil {part} · demi-page {idx}', im.crop((int(0.02 * W), 0, int(0.32 * W), int(0.35 * H)))))
    larg = max(b.width for _, b in bandes) + 210
    haut = sum(b.height + 4 for _, b in bandes)
    out = Image.new('L', (larg, haut), 255)
    dessin = ImageDraw.Draw(out)
    y = 0
    for etiquette, b in bandes:
        out.paste(b, (210, y))
        dessin.text((6, y + b.height // 2), etiquette, fill=0)
        dessin.line((0, y + b.height + 2, larg, y + b.height + 2), fill=170)
        y += b.height + 4
    f = f'{sortie}/verif_pages.png'
    out.save(f)
    print(f, out.size)
    return f


if __name__ == '__main__':
    sortie = '.'
    for a in sys.argv[1:]:
        if a.startswith('--sortie='): sortie = a.split('=', 1)[1]
    if '--tout' in sys.argv:
        cas = []
        for part, chemin in enumerate(D1()):
            n = 2 * len(pdfium.PdfDocument(chemin))
            cas += [(part, 1), (part, 2), (part, 3), (part, n)]
        planche(cas, sortie)
    else:
        args = [a for a in sys.argv[1:] if not a.startswith('--')]
        part = int(args[0])
        planche([(part, int(i)) for i in args[1].split(',')], sortie)
