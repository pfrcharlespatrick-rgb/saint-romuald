#!/usr/bin/env node
// Audit du site public sur petit écran — voir la section « Passe téléphone »
// de docs/REFONTE.md, dont ce programme vérifie les règles.
//
// Ce qu'il fait
// -------------
// Il sert le site en local, l'ouvre dans un Chromium en contexte tactile à
// plusieurs largeurs, et mesure ce qu'un coup d'œil ne voit pas :
//
//   1. la page déborde-t-elle à l'horizontale (le défaut qui oblige à
//      pincer pour lire) ;
//   2. une commande autonome est-elle trop petite pour être visée au doigt ;
//   3. la barre de rubriques tient-elle sur une ligne, et l'onglet courant
//      est-il dans le champ (une barre défilante qui ne recadre pas est pire
//      que le repli qu'elle remplace) ;
//   4. un conteneur qui défile à l'horizontale annonce-t-il qu'il défile
//      (les ombres de bord des registres) ;
//   5. reste-t-il du texte sous le seuil de lisibilité.
//
// Ce qu'il ne fait pas
// --------------------
// Il ne juge pas l'esthétique et ne remplace pas un coup d'œil : il attrape
// les régressions mesurables. Un rendu qui passe l'audit peut rester laid.
//
// Il ne modifie rien : ni les données, ni le site, ni les fichiers générés.
//
// Emploi
// ------
//   node outils/audit-telephone.mjs                  # 320, 390 et 430px
//   node outils/audit-telephone.mjs --largeurs 360   # une seule largeur
//   node outils/audit-telephone.mjs --page methode   # une seule page
//   node outils/audit-telephone.mjs --captures /tmp/audit   # + copies d'écran
//
// Sort en code 1 dès qu'un manquement est relevé, pour servir de garde-fou.
//
// Il demande Playwright, qui n'est pas une dépendance du site (celui-ci ne
// charge rien depuis le réseau, et cela ne changera pas — voir « Pièges
// connus » dans docs/REFONTE.md). Si Playwright manque :
//   npm install -g playwright && npx playwright install chromium

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ───────────────────────── seuils ─────────────────────────
// Les valeurs de docs/REFONTE.md. Les changer ici, pas dans les contrôles.

const SEUILS = {
  cibleHauteur: 40,   // une commande autonome, au doigt (la règle vise 44px,
  cibleLargeur: 32,   // on tolère 40 pour ne pas signaler les arrondis)
  texteMinimal: 11.5, // plancher des étiquettes en capitales
  navUneLigne: 760,   // sous cette largeur la barre doit tenir sur une ligne
  navHauteurMax: 60,  // au-delà, elle a replié
};

const LARGEURS_DEFAUT = [320, 390, 430];

// Exclusions, chacune avec sa raison — ne pas en ajouter sans en écrire une.
const EXCLUSIONS_CIBLE = [
  ['.leaflet-control-attribution a',
   "crédit d'attribution de Leaflet, mention légale et non commande"],
];

// ───────────────────────── arguments ─────────────────────────

function lireArguments(argv) {
  const o = { largeurs: LARGEURS_DEFAUT, page: null, captures: null, port: 0 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--largeurs') o.largeurs = argv[++i].split(',').map(Number);
    else if (a === '--page') o.page = argv[++i];
    else if (a === '--captures') o.captures = path.resolve(argv[++i]);
    else if (a === '--port') o.port = Number(argv[++i]);
    else if (a === '--aide' || a === '-h') { o.aide = true; }
    else { console.error(`Argument inconnu : ${a}`); process.exit(2); }
  }
  return o;
}

// ───────────────────────── serveur local ─────────────────────────
// Le site est une pile de fichiers statiques : quelques lignes suffisent, et
// cela évite une dépendance de plus.

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.gif': 'image/gif',
};

function servir(port) {
  const serveur = http.createServer((req, rep) => {
    let rel;
    try { rel = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
    catch { rep.writeHead(400).end(); return; }
    const chemin = path.join(RACINE, rel === '/' ? 'index.html' : rel);
    if (!chemin.startsWith(RACINE + path.sep)) { rep.writeHead(403).end(); return; }
    fs.readFile(chemin, (err, contenu) => {
      if (err) { rep.writeHead(404).end('introuvable'); return; }
      rep.writeHead(200, { 'Content-Type': TYPES[path.extname(chemin).toLowerCase()] || 'application/octet-stream' });
      rep.end(contenu);
    });
  });
  return new Promise((resoudre) => {
    serveur.listen(port, '127.0.0.1', () => resoudre({ serveur, port: serveur.address().port }));
  });
}

// ───────────────────────── pages à visiter ─────────────────────────
// Les fiches ont besoin d'un identifiant réel : on le prend dans les fichiers
// produits par generer-site.mjs, pour que l'audit suive les données plutôt
// qu'un exemple figé qui finira par disparaître.

function lireJson(rel) {
  try { return JSON.parse(fs.readFileSync(path.join(RACINE, rel), 'utf8')); }
  catch { return null; }
}

function pagesAVisiter() {
  const pages = [
    { cle: 'accueil', url: 'index.html', nom: 'Accueil' },
    { cle: 'carte', url: 'carte.html', nom: 'Carte' },
    { cle: 'stats', url: 'stats.html', nom: 'Statistiques' },
    { cle: 'methode', url: 'methode.html', nom: 'Méthode' },
    { cle: 'filiations', url: 'filiation.html', nom: 'Filiations', nav: '.onglets', actif: '.btn-primary' },
  ];

  const index = lireJson('recherche-index.json');
  if (index && index.length) {
    pages.splice(1, 0, { cle: 'personne', url: `personne.html#${index[0][0]}`, nom: 'Personne' });
  }
  const lots = fs.existsSync(path.join(RACINE, 'fiches/maison'))
    ? fs.readdirSync(path.join(RACINE, 'fiches/maison')).filter((f) => f.endsWith('.json')).sort()
    : [];
  if (lots.length) {
    const lot = lireJson(`fiches/maison/${lots[0]}`);
    const id = lot && Object.keys(lot)[0];
    if (id) pages.splice(2, 0, { cle: 'maison', url: `maison.html#${id}`, nom: 'Maison' });
  }
  const lieux = lireJson('fiches/lieux.json');
  const lieu = lieux && lieux.lieux && lieux.lieux[0];
  if (lieu && lieu.id) {
    pages.splice(4, 0, { cle: 'lieu', url: `lieu.html#${lieu.id}`, nom: 'Lieu' });
  }
  return pages;
}

// ───────────────────────── les contrôles, dans la page ─────────────────────────
// Cette fonction est sérialisée et exécutée dans le navigateur : elle ne peut
// rien appeler d'extérieur, tout ce dont elle a besoin passe en argument.

function controler({ seuils, exclusions, largeur, navSel, actifSel }) {
  const manques = [];
  const remarques = [];
  const visible = (b) => b.width > 0 && b.height > 0;

  const dansUnDefilement = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') return p;
    }
    return null;
  };
  const nommer = (el) => {
    const cls = (el.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.');
    return el.tagName.toLowerCase() + (cls ? '.' + cls : '');
  };

  // 1 ─ la page déborde-t-elle
  const de = document.documentElement;
  const deborde = de.scrollWidth - de.clientWidth;
  if (deborde > 0) {
    let pire = null;
    for (const el of document.querySelectorAll('body *')) {
      const b = el.getBoundingClientRect();
      if (!visible(b) || b.right <= largeur + 1) continue;
      if (dansUnDefilement(el)) continue;
      if (!pire || b.right > pire.droite) pire = { el: nommer(el), droite: Math.round(b.right) };
    }
    manques.push(`la page déborde de ${deborde}px${pire ? ` — le plus large : ${pire.el} jusqu'à ${pire.droite}px` : ''}`);
  }

  // 2 ─ les commandes autonomes se visent-elles au doigt
  //     Un lien en incise dans une phrase garde la hauteur du texte : c'est
  //     normal. On ne retient donc que ce qui n'est pas un `display:inline`.
  const exclus = new Set();
  for (const [sel] of exclusions) {
    for (const el of document.querySelectorAll(sel)) exclus.add(el);
  }
  const petites = new Map();
  for (const el of document.querySelectorAll('a, button, input, select, summary, [role="button"]')) {
    if (exclus.has(el)) continue;
    const b = el.getBoundingClientRect();
    if (!visible(b)) continue;
    if (el.tagName === 'A' && getComputedStyle(el).display === 'inline') continue;
    if (b.height >= seuils.cibleHauteur && b.width >= seuils.cibleLargeur) continue;
    const cle = nommer(el);
    const v = petites.get(cle) || { cle, n: 0, h: Infinity, w: Infinity };
    v.n++; v.h = Math.min(v.h, Math.round(b.height)); v.w = Math.min(v.w, Math.round(b.width));
    petites.set(cle, v);
  }
  for (const v of petites.values()) {
    manques.push(`cible trop petite : ${v.cle} ${v.h}×${v.w}px (×${v.n})`);
  }

  // 3 ─ la barre de rubriques
  const nav = document.querySelector(navSel);
  if (nav) {
    const nb = nav.getBoundingClientRect();
    if (largeur <= seuils.navUneLigne && nb.height > seuils.navHauteurMax) {
      manques.push(`la barre de rubriques replie : ${Math.round(nb.height)}px de haut`);
    }
    const actif = nav.querySelector(actifSel);
    if (!actif) {
      manques.push(`aucune rubrique courante (${actifSel}) dans la barre`);
    } else {
      const ab = actif.getBoundingClientRect();
      if (ab.left < nb.left - 1 || ab.right > nb.right + 1) {
        manques.push(`la rubrique courante « ${actif.textContent.trim()} » est hors du champ — le recadrage n'a pas joué`);
      }
      if (nav.scrollWidth > nav.clientWidth) {
        remarques.push(`barre défilante, recadrée sur « ${actif.textContent.trim()} »`);
      }
    }
  }

  // 4 ─ ce qui défile doit dire qu'il défile
  for (const el of document.querySelectorAll('*')) {
    if (el.scrollWidth <= el.clientWidth + 2) continue;
    const cs = getComputedStyle(el);
    if (cs.overflowX !== 'auto' && cs.overflowX !== 'scroll') continue;
    if (el.closest('.leaflet-container')) continue; // la carte se manipule, elle ne défile pas
    const trop = el.scrollWidth - el.clientWidth;
    if (!/radial-gradient/.test(cs.backgroundImage)) {
      manques.push(`${nommer(el)} défile de ${trop}px sans l'annoncer (ombres de bord absentes)`);
    } else {
      remarques.push(`${nommer(el)} défile de ${trop}px, annoncé`);
    }
  }

  // 5 ─ le texte sous le plancher de lisibilité
  const minuscules = new Map();
  for (const el of document.querySelectorAll('body *')) {
    let propre = '';
    for (const n of el.childNodes) if (n.nodeType === 3) propre += n.textContent.trim();
    if (propre.length < 8) continue;
    const taille = parseFloat(getComputedStyle(el).fontSize);
    if (taille >= seuils.texteMinimal) continue;
    const cle = `${nommer(el)} @${taille}px`;
    minuscules.set(cle, (minuscules.get(cle) || 0) + 1);
  }
  for (const [cle, n] of minuscules) remarques.push(`texte sous ${seuils.texteMinimal}px : ${cle} (×${n})`);

  return { manques, remarques };
}

// ───────────────────────── déroulé ─────────────────────────

const AIDE = `Audit du site public sur petit écran.

  node outils/audit-telephone.mjs [options]

  --largeurs 320,390,430   largeurs à contrôler (défaut : 320,390,430)
  --page <clé>             une seule page (accueil, personne, maison, carte,
                           lieu, stats, methode, filiations)
  --captures <dossier>     y déposer une copie d'écran par page et largeur
  --port <n>               port du serveur local (défaut : libre)
  --aide                   ce texte
`;

const opts = lireArguments(process.argv.slice(2));
if (opts.aide) { console.log(AIDE); process.exit(0); }

// Playwright peut être posé dans le projet ou, plus souvent, en global. Un
// `import` nu ne trouve pas un paquet global : on va le chercher là où npm
// l'installe, sans quoi l'instruction affichée plus bas serait un mensonge.
async function chargerPlaywright() {
  const essais = ['playwright'];
  try {
    const racineGlobale = execFileSync('npm', ['root', '-g'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    if (racineGlobale) {
      essais.push(pathToFileURL(path.join(racineGlobale, 'playwright', 'index.mjs')).href);
    }
  } catch { /* npm hors du chemin : on se contente de l'essai local */ }
  for (const essai of essais) {
    try {
      const module = await import(essai);
      if (module.chromium) return module.chromium;
    } catch { /* essai suivant */ }
  }
  return null;
}

const chromium = await chargerPlaywright();
if (!chromium) {
  console.error(
    "Playwright est nécessaire et n'a pas été trouvé, ni dans le projet ni en global.\n" +
    '  npm install -g playwright && npx playwright install chromium\n' +
    "Il n'est pas une dépendance du site : celui-ci ne charge rien depuis le réseau,\n" +
    'et cela ne changera pas (voir « Pièges connus » dans docs/REFONTE.md).');
  process.exit(2);
}

let pages = pagesAVisiter();
if (opts.page) {
  pages = pages.filter((p) => p.cle === opts.page);
  if (!pages.length) { console.error(`Page inconnue : ${opts.page}`); process.exit(2); }
}
if (opts.captures) fs.mkdirSync(opts.captures, { recursive: true });

const { serveur, port } = await servir(opts.port);
const navigateur = await chromium.launch();
let manquesTotal = 0;

console.log(`Audit téléphone — ${pages.length} page(s), largeurs ${opts.largeurs.join(', ')}px\n`);

for (const largeur of opts.largeurs) {
  console.log(`── ${largeur}px ──`);
  for (const p of pages) {
    const contexte = await navigateur.newContext({
      viewport: { width: largeur, height: 800 },
      deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    });
    const onglet = await contexte.newPage();
    const erreurs = [];
    onglet.on('pageerror', (e) => erreurs.push(e.message));

    await onglet.goto(`http://127.0.0.1:${port}/${p.url}`, { waitUntil: 'networkidle' })
      .catch(() => { /* les tuiles de carte ne répondent pas hors ligne */ });
    await onglet.waitForTimeout(1500);

    const r = await onglet.evaluate(controler, {
      seuils: SEUILS,
      exclusions: EXCLUSIONS_CIBLE,
      largeur,
      navSel: p.nav || 'nav.onglets',
      actifSel: p.actif || 'a.actif',
    });
    for (const e of erreurs) r.manques.push(`erreur de script : ${e}`);

    if (opts.captures) {
      await onglet.screenshot({ path: path.join(opts.captures, `${p.cle}-${largeur}.png`), fullPage: true });
    }

    const etat = r.manques.length ? `${r.manques.length} manquement(s)` : 'rien à signaler';
    console.log(`  ${p.nom.padEnd(12)} ${etat}`);
    for (const m of r.manques) console.log(`      ✗ ${m}`);
    for (const q of r.remarques) console.log(`      · ${q}`);
    manquesTotal += r.manques.length;
    await contexte.close();
  }
  console.log('');
}

await navigateur.close();
serveur.close();

if (opts.captures) console.log(`Copies d'écran dans ${opts.captures}\n`);
if (manquesTotal) {
  console.log(`${manquesTotal} manquement(s) au total.`);
  process.exit(1);
}
console.log('Aucun manquement.');
