"""Rendu en ligne de commande des bandes de 1891-D1 (pages 84-142).

    python3 z91.py 97          # les deux bandes de la page 97
    python3 z91.py 97 13 17 0.22 0.40 20   # zoom sur les lignes 13-17
"""
import sys, os
import r91b
OUT = os.environ.get('Z91_OUT', '/tmp')
def bandes(ms):
    r91b.strip(ms, 1, 13, 0.10, 0.62, 6, os.path.join(OUT, f'p{ms}a.png'))
    r91b.strip(ms, 14, 25, 0.10, 0.62, 6, os.path.join(OUT, f'p{ms}b.png'))
if __name__ == '__main__':
    a = sys.argv[1:]
    if len(a) == 1:
        bandes(int(a[0]))
    else:
        ms, l0, l1 = int(a[0]), int(a[1]), int(a[2])
        x0, x1 = float(a[3]), float(a[4])
        sc = int(a[5]) if len(a) > 5 else 20
        r91b.strip(ms, l0, l1, x0, x1, sc, os.path.join(OUT, f'z{ms}_{l0}-{l1}.png'))
