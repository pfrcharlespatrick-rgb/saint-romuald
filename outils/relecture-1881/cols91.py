"""Bande des colonnes 20 à 25 d'une page de 1891, avec les numéros de ligne.

Une seule image par page : les 25 lignes, cadrées sur les colonnes serrées et
sur la marge droite, où le formulaire répète les numéros de ligne. Ce sont eux
qui ancrent la lecture — chaque marque est sur la ligne de son numéro.

    python3 cols91.py 46 47 48        # écrit cols46.png, cols47.png, …
"""
import sys, os
import r91b, r91c
OUT = os.environ.get('Z91_OUT', '/tmp')
def bande(ms, scale=8):
    R = r91c if ms <= 83 else r91b
    # jusqu la ligne 28 : quelques cadres sont detectes un peu courts (page 47),
    # et les numeros imprimes dans la marge permettent de lire sans ambiguite.
    return R.strip(ms, 1, 28, 0.74, 0.93, scale, os.path.join(OUT, f"cols{ms}.png"))
if __name__ == '__main__':
    for a in sys.argv[1:]:
        bande(int(a))
