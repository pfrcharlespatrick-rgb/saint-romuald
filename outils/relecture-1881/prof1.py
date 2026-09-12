"""La colonne 14 de la division 1 de 1881 — la profession, enfin dans le cadre.

POURQUOI CE FICHIER. La relecture de 1881 s'est faite sur la fenêtre
`REF_X0F, REF_X1F = 0.075, 0.420` de `d1.py`, qui s'arrête juste après la colonne
des âges. Les colonnes 14 (profession) et 15 (marié ou en veuvage) n'ont donc
jamais été dans le cadre — ni pour être vérifiées, ni même pour être lues. Les
667 professions du fichier viennent du dépouillement seul, et les 1 522 cases
vides n'ont pas plus été regardées que les autres.

Les deux constantes ne bougent pas : elles servent au recalage entre pages
(`geometry`, `_shift`), et les élargir déréglerait l'alignement. On passe donc
par des fenêtres à soi, **exprimées dans le repère de la page de référence** et
décalées page à page du même `dx` que le cadre — sinon le recalage serait perdu
en chemin.

LA PLANCHE. Les colonnes utiles sont aux deux bouts du formulaire : les noms en
7, la profession en 14. Entre les deux, six colonnes déjà dépouillées qui ne
feraient qu'écarter l'œil et diluer l'image. On les découpe donc séparément et
on les recolle côte à côte :

    nos de ligne | nom (7) | profession (14) | marié/veuvage (15) | nos de ligne

**Les deux marges de numéros y sont, et c'est la GAUCHE qui fait foi.** Le
formulaire numérote ses rangées aux deux bords, mais la prise de vue est parfois
de guingois : à la page 32, la marge de droite est d'une rangée plus bas que
celle de gauche — un degré de rotation suffit. La marge de gauche, elle, touche
la colonne des noms : rien ne peut glisser entre les deux. Quand les deux marges
ne disent pas la même chose, **c'est la gauche qu'il faut suivre**, et le
désaccord lui-même avertit que la page est de travers.

Une page tient ainsi sur une image, ses vingt-cinq rangées d'un coup.

    python3 prof1.py 1 2 3 --sortie=/tmp/img
"""
import sys

sys.path.insert(0, __file__.rsplit('/', 1)[0])
from d1 import geometry, half_image, REF_X0F
from PIL import Image

# Bords relevés sur l'en-tête imprimé de la page 1, dans le repère de la référence.
# Chaque fenêtre est prise plus large que sa colonne : le recalage horizontal de
# `geometry` se trompe parfois de deux centièmes de largeur de page (les recueils
# de la fin, surtout), et une fenêtre juste à la colonne coupe alors la moitié de
# ce qu'on vient y lire — sans le dire.
RANGS = (0.075, 0.125)        # la marge des numéros de ligne, à gauche — celle qui fait foi
NOM = (0.222, 0.360)          # colonne 7, les noms
PROF = (0.578, 0.730)         # colonnes 14 et 15
NUMEROS = (0.868, 0.905)      # la marge des numéros de ligne, à droite — témoin de travers
AGE = (0.348, 0.432)          # colonnes 8 et 9 — le sexe et l'âge
ECOLE = (0.648, 0.758)        # colonnes 15, 16 et le bord de la 17

# Deux vues, selon la colonne qu'on vient lire. Celle de l'école porte la
# colonne 15 *avec* la 16, et ce n'est pas un luxe : le trait de pointage du
# greffier suit le « M. » de la 15 et déborde sur le bord gauche de la 16. Lire
# la 16 seule, c'est prendre ce trait pour une marque d'école — c'est ce qui est
# arrivé au premier dépouillement, qui s'en méfiait pourtant par écrit.
VUES = {
    'prof':  (RANGS, NOM, PROF, NUMEROS),
    'ecole': (RANGS, AGE, ECOLE),          # le rang et l'âge suffisent à situer
    'ecole+': (RANGS, (0.222, 0.335), AGE, ECOLE),   # avec les noms, quand il faut trancher
}
FENETRES = VUES['prof']

SEPARATEUR = 6                # filet blanc entre deux fenêtres recollées


def _recolle(img, dx, W, haut, bas, fenetres):
    morceaux = [img.crop((int((a + dx) * W), haut, int((b + dx) * W), bas)) for a, b in fenetres]
    larg = sum(m.width for m in morceaux) + SEPARATEUR * (len(morceaux) - 1)
    bande = Image.new('L', (larg, bas - haut), 255)
    x = 0
    for m in morceaux:
        bande.paste(m.convert('L'), (x, 0))
        x += m.width + SEPARATEUR
    return bande


def planche(ms, dpi=500, fenetres=FENETRES, l0=1, l1=25, sortie='.', tag='prof', reglette=False):
    """Recolle côte à côte les fenêtres utiles des rangées `l0` à `l1` de la page `ms`.

    `reglette` empile par-dessus la rangée imprimée des numéros de colonne, prise
    aux mêmes abscisses. C'est ce qui permet de dire sans hésiter dans quelle
    colonne tombe une marque — 15 « marié ou en veuvage » et 16 « allant à
    l'école » sont voisines et étroites, et une marque lue d'une colonne à côté
    est une erreur qu'aucune relecture ultérieure ne rattrape.
    """
    x0f, _, y0f, sf = geometry(ms)
    dx = x0f - REF_X0F                       # le recalage de cette page-là
    img = half_image(ms, dpi)
    W, H = img.size
    top, rh = y0f * H, sf * H
    haut = int(max(0, top + (l0 - 1) * rh - rh * 0.40))
    bas = int(min(H, top + l1 * rh + rh * 0.40))
    out = _recolle(img, dx, W, haut, bas, fenetres)
    if reglette:
        # La rangée imprimée « 13 14 15 … » tient juste au-dessus de la rangée 1.
        r = _recolle(img, dx, W, int(top - 1.15 * rh), int(top - 0.10 * rh), fenetres)
        pile = Image.new('L', (max(r.width, out.width), r.height + out.height + 4), 255)
        pile.paste(r, (0, 0)); pile.paste(out, (0, r.height + 4))
        out = pile
    f = f"{sortie}/d1_ms{ms:02d}_{tag}_L{l0:02d}-{l1:02d}.png"
    out.save(f)
    return f, out.size


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    sortie, dpi, l0, l1 = '.', 500, 1, 25
    vue = 'prof'
    for a in sys.argv[1:]:
        if a.startswith('--vue='): vue = a.split('=', 1)[1]
        if a.startswith('--sortie='): sortie = a.split('=', 1)[1]
        if a.startswith('--dpi='): dpi = int(a.split('=', 1)[1])
        if a.startswith('--lignes='): l0, l1 = (int(x) for x in a.split('=', 1)[1].split('-'))
    for ms in (int(a) for a in args):
        f, taille = planche(ms, dpi=dpi, l0=l0, l1=l1, sortie=sortie,
                            fenetres=VUES[vue], tag=vue,
                            reglette='--reglette' in sys.argv)
        print(f, taille)
