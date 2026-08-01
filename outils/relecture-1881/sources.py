"""Localise les PDF du manuscrit, où que la session les ait déposés.

Les fichiers joints à une conversation atterrissent dans un dossier propre à
la session. Plutôt que de coder un chemin en dur, on cherche les PDF par leur
nom. Pour pointer ailleurs : export RELECTURE_PDF_DIR=/chemin/vers/les/pdf
"""
import os, glob

RACINES = [os.environ.get('RELECTURE_PDF_DIR', ''), '/root/.claude/uploads', os.path.expanduser('~'), '/tmp']

def trouver(motif):
    """Renvoie le premier PDF dont le nom contient `motif` (insensible à la casse)."""
    for racine in RACINES:
        if not racine or not os.path.isdir(racine): continue
        for chemin in sorted(glob.glob(os.path.join(racine, '**', '*.pdf'), recursive=True)):
            if motif.lower() in os.path.basename(chemin).lower():
                return chemin
    raise FileNotFoundError(
        f"PDF introuvable pour « {motif} ». Joignez le manuscrit à la conversation, "
        f"ou définissez RELECTURE_PDF_DIR.")

# Division 2 : deux parties. Division 1 : trois parties.
D2 = lambda: [trouver('D2_vivants_partie1'), trouver('D2_vivants_partie2')]
D1 = lambda: [trouver('D1_Vivants_Partie1'), trouver('D1_Vivants_partie2'), trouver('D1_vivants_partie3')]
