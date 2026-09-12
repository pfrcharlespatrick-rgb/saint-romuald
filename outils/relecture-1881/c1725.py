"""Les colonnes 17 à 25 de 1891 division 1, une page en deux bandes.

**Pourquoi cette vue plutôt qu'un recadrage libre.** Onze colonnes étroites se
suivent sur la moitié droite du formulaire (17 à 25, puis la marge des numéros
de ligne). Rien, dans la bande seule, ne dit laquelle est laquelle : la seule
parade est d'empiler au-dessus la **rangée imprimée des numéros de colonne**,
comme `prof1.py --reglette` pour 1881. C'est `vue91.bande` qui le fait ; ce
module-ci n'en fixe que le cadrage et le découpage en deux.

**Le cadrage.** `0.672`–`0.915` va du filet 16|17 au bord droit de la marge des
numéros de ligne, relevé sur les filets verticaux de la page 67 :

    16|17 0.680   17|18 0.706   18|19 0.728   19|20 0.754   20|21 0.779
    21|22 0.800   22|23 0.820   …   25|marge 0.881   marge 0.913

La marge est dans le cadrage **parce qu'elle est l'ancre** : chaque marque est
sur la ligne de son numéro imprimé, et les cadres du microfilm ne tombent pas
au même endroit d'une page à l'autre.

**Deux bandes et non une.** Vingt-cinq lignes sur une seule image se lisent
trop petit une fois l'image réduite, et compter les rangs à l'œil est
exactement l'erreur que la marge doit empêcher. Treize lignes puis douze, la
hauteur de rang reste franche.

    python3 c1725.py 110 111 112        # deux images par page
    python3 c1725.py 110 --entier       # une seule, pour un coup d'œil
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from vue91 import bande

X0, X1 = 0.672, 0.915
OUT = os.environ.get('Z91_OUT', '/tmp')


def page(ms, entier=False, scale=9, sortie=None):
    import r91e
    s = sortie or OUT
    if entier:
        return [bande(r91e.R, ms, 1, 25, X0, X1, scale, s, 'c')]
    return [bande(r91e.R, ms, 1, 13, X0, X1, scale, s, 'c'),
            bande(r91e.R, ms, 14, 25, X0, X1, scale, s, 'c')]


if __name__ == '__main__':
    entier = '--entier' in sys.argv
    for a in sys.argv[1:]:
        if not a.startswith('--'):
            page(int(a), entier)
