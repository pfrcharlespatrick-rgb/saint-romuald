"""Découpe les pages du manuscrit de 1871 en images pour le site public.

    python3 outils/manuscrit/pages71.py 1          # division 1, toutes les pages des recueils
    python3 outils/manuscrit/pages71.py 1 8 40     # seulement les pages 8 et 40

Lit les recueils PDF « Recensements_1871NewLiverpool_PartieN » par
`outils/relecture-1881/recueil71.py` (même table page → recueil, même
redressement) et écrit manuscrit/1871-D<division>/P<nnn>.jpg : le cadre entier,
redressé, à l'échelle 4 (environ 2450 pixels de large), JPEG qualité 62 —
environ 300 Ko la page, assez pour lire une ligne au zoom.

Les recueils se joignent à la conversation ; recueil71 les cherche sous
/root/.claude/uploads/ et veut le nom sans tiret (« 1871NewLiverpool ») : un
lien symbolique sous ce nom suffit. Après un découpage, relancer
`node outils/generer-site.mjs`, qui ajoute `image_ms` aux fiches des personnes
dont la page existe.
"""
import os
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.dirname(os.path.dirname(ICI))
sys.path.insert(0, os.path.join(RACINE, 'outils', 'relecture-1881'))
import recueil71 as R  # noqa: E402


def main():
    division = int(sys.argv[1])
    pages = [int(x) for x in sys.argv[2:]]
    disponibles = []
    for ms in range(1, R.PAGES[division] + 1):
        try:
            p, pp, _ = R.locate(division, ms)
            R._pdf(p)
            disponibles.append(ms)
        except (KeyError, FileNotFoundError, RuntimeError):
            break
    # L'inclinaison se lisse sur les pages voisines : on ne la calcule que sur
    # les pages dont le recueil est présent.
    R.PAGES[division] = max(disponibles)
    sortie = os.path.join(RACINE, 'manuscrit', f'1871-D{division}')
    os.makedirs(sortie, exist_ok=True)
    for ms in pages or disponibles:
        c, a = R.redresse(division, ms, 4)
        chemin = os.path.join(sortie, f'P{ms:03d}.jpg')
        c.save(chemin, quality=62, optimize=True, progressive=True)
        print(chemin, c.size, f'{a:+.1f}°')
    manquantes = [ms for ms in range(1, {1: 78, 2: 73}[division] + 1) if ms not in disponibles]
    if manquantes:
        print(f'Pages sans recueil joint : {manquantes[0]} à {manquantes[-1]} ({len(manquantes)})')


if __name__ == '__main__':
    main()
