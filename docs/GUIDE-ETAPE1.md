# GitHub Pages — Guide pas à pas

Ton site en ligne en 15 minutes, gratuitement, sans serveur ni base de données.

---

## Avant de commencer

**Tu as besoin de :**
- Un compte GitHub (gratuit, 2 minutes d'inscription sur github.com)
- Les fichiers du dossier `transfert-claude-code/` — c'est là où ils sont

**Résultat final :** une adresse publique comme `https://tonnom.github.io/saint-romuald/`
où tout le monde peut chercher et consulter ; toi seul peux modifier les données.

---

## Étape 1 : Créer le dépôt GitHub

1. Va sur **github.com** et connecte-toi (ou crée un compte).
2. En haut à droite, clique sur **+** → **New repository**.
3. Remplis :
   - **Repository name** : `saint-romuald` (ou le nom que tu veux)
   - **Description** : « Recensements de Saint-Romuald 1871-1891 »
   - **Public** : cocher cette case (sinon GitHub Pages ne fonctionne pas en gratuit)
   - **Add a README file** : cocher (ça aide)
4. Clique **Create repository**.

Tu as maintenant un dépôt vide. C'est là qu'on va mettre les fichiers.

---

## Étape 2 : Préparer les fichiers

**Sur ton ordinateur,** crée une structure de dossiers comme ceci :

```
saint-romuald/
├── index.html              ← la page d'accueil
├── Suivi des maisons et familles.dc.html
├── support.js
├── _ds/                    ← copie le dossier design-system au complet
├── assets/                 ← images et photos
├── data/
│   ├── recensement-1871-d1-data.js
│   ├── recensement-1871-d2-data.js
│   ├── recensement-1881-d1-data.js
│   ├── recensement-1881-d2-data.js
│   ├── recensement-1891-d1-data.js
│   ├── annexe-animaux-data.js
│   ├── annexe-foncier-data.js
│   ├── annexe-forets-data.js
│   ├── annexe-terres-data.js
│   ├── annexe-navigation-data.js
│   ├── annexe-etablissements-data.js
│   ├── annexe-rapport-data.js
│   └── bussiere1990-data.js
└── _config.yml             ← configuration Jekyll (voir plus bas)
```

**Les fichiers à copier du projet :**
- `Suivi des maisons et familles.dc.html`
- `support.js`
- Tous les fichiers `recensement-*.js` et `annexe-*.js`
- `bussiere1990-data.js`
- Tout le dossier `_ds/`
- Tout le dossier `assets/`

**Crée `index.html`** (voir plus bas)

**Crée `_config.yml`** avec ce contenu :
```yaml
title: Suivi des familles et maisons — Saint-Romuald
baseurl: "/saint-romuald"
```

---

## Étape 3 : Créer `index.html`

C'est la page d'accueil. Copie ceci et sauvegarde-le en `index.html` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Saint-Romuald — Suivi des familles et maisons</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #1a3a52; margin-top: 0; }
    p { color: #666; line-height: 1.6; }
    .buttons { margin-top: 30px; display: flex; gap: 20px; }
    a { display: inline-block; padding: 12px 24px; background: #1a3a52; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
    a:hover { background: #0f2738; }
    .subtitle { color: #999; font-size: 14px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📋 Saint-Romuald — Recensements nominatifs</h1>
    <p>Base de données des familles et maisons, 1871–1891.</p>
    <p>Recherchez une personne, une famille, une adresse. Explorez les liens entre recensements. Consultez les données foncières, les animaux, les établissements.</p>
    <div class="buttons">
      <a href="./Suivi des maisons et familles.dc.html">Ouvrir la base de données</a>
    </div>
    <p class="subtitle">Données brutes : 1 629 maisons, 1 851 familles, 10 170 personnes. Mise à jour : juillet 2026.</p>
  </div>
</body>
</html>
```

---

## Étape 4 : Mettre les fichiers sur GitHub

**Option A : Via l'interface GitHub (le plus simple)**

1. Va sur ton dépôt `https://github.com/tonnom/saint-romuald`.
2. Clique sur **Add file** → **Upload files**.
3. Sélectionne tous les fichiers du dossier `saint-romuald/` et envoie-les.
4. En bas, écris un message : « Mise en ligne des données et de l'interface ».
5. Clique **Commit changes**.

**Option B : Avec Git en ligne de commande (si tu te sens à l'aise)**

```bash
cd saint-romuald/
git init
git add .
git commit -m "Mise en ligne des données et de l'interface"
git branch -M main
git remote add origin https://github.com/tonnom/saint-romuald.git
git push -u origin main
```

---

## Étape 5 : Activer GitHub Pages

1. Va sur ton dépôt.
2. Clique sur **Settings** (engrenage en haut à droite).
3. À gauche, clique sur **Pages**.
4. Sous « Source », sélectionne **Deploy from a branch**.
5. Sélectionne **main** et **/ (root)**.
6. Clique **Save**.

GitHub te donne une adresse comme `https://tonnom.github.io/saint-romuald/`. Attends 2–3 minutes, puis visite-la.

---

## Étape 6 : Tester

1. Va à `https://tonnom.github.io/saint-romuald/`.
2. Tu dois voir la page d'accueil.
3. Clique sur « Ouvrir la base de données ».
4. Recherche une personne, déplie une famille, modifie une note.

**Attention :** tes modifications sont sauvegardées **localement dans ton navigateur** (dans le localStorage de ce site). Elles ne sont pas en ligne — c'est normal.

---

## Mettre à jour tes données

Chaque fois que tu veux publier tes corrections en ligne :

1. Dans l'interface actuelle (`Suivi des maisons et familles.dc.html`), clique sur **Sauvegarde** et **Exporter tout**.
2. Ouvre le fichier JSON téléchargé.
3. Dis à Claude Code : « Intègre cette sauvegarde dans `data/` et publie sur GitHub ».

Claude Code fera :
- Fusionner tes corrections avec les fichiers de données
- Les uploader sur GitHub
- Les redéployer en ligne (2 minutes)

Et c'est tout. Ton site sera à jour.

---

## Ton premier déploiement avec Claude Code

Une fois le site en ligne et à jour, tu peux à tout moment dire :

> Mes corrections sont ici [fichier JSON]. Intègre-les dans le site et publie.

Et Claude Code fera les trois étapes (fusion, upload, déploiement) en une seule phrase.

---

## Problèmes courants

**« J'ai attendu 10 minutes et le site n'apparaît pas »**
→ Attends encore 2–3 minutes. GitHub Pages met parfois du temps. Ensuite, recharge la page (Ctrl+Maj+R pour vider le cache).

**« Le site charge mais l'interface est vide »**
→ Ouvre la console du navigateur (F12). Tu verras si les fichiers `.js` se chargent. Si un JSON manque, c'est que le chemin n'est pas bon.

**« Je vois une erreur 404 »**
→ Tu as oublié un dossier ou un fichier. Revérife l'arborescence.

**« Je veux que seules certaines personnes voient le site »**
→ Ce n'est pas possible en gratuit avec GitHub Pages. Tout le monde qui connaît l'adresse y accède. Si tu veux vraiment limiter, c'est l'étape 2 (Cloudflare Access).

---

## Prochaines étapes

Une fois ce site stabilisé et en ligne depuis quelques semaines, tu pourras ajouter :

1. **La visionneuse de scans** — page par page, reliée aux familles
2. **Les liens entre années** — suivre une personne de 1871 à 1891
3. **La carte** — position des maisons sur le chemin du Fleuve
4. **La base de données** (étape 2 de HEBERGEMENT.md) — pour saisir depuis n'importe quel appareil

Mais d'abord, mets ça en ligne et laisse-le respirer deux semaines. Tu apprendras plus en utilisant le site réel que par la théorie.
