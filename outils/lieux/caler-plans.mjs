#!/usr/bin/env node
// Cale les plans anciens sur la carte, à partir des lieux que Patrick a relevés.
//
// Un plan ancien se pose par trois coins (data/plans-data.js). Les poser à
// l'œil avait donné, en 2026, des calages approximatifs que Patrick a fini par
// retirer. Ce programme les calcule : chaque lieu de data/lieux-data.js qui
// porte un renvoi Goad (feuillet et numéro) et une position relevée est un
// point d'appui — son numéro se lit sur la feuille, sa position sur le terrain.
// Les correspondances (pixel de la feuille ↔ lieu) sont dans
// data/plans-reperes.json ; ce fichier-là se complète à la main, à mesure que
// de nouveaux numéros Goad sont attachés à des lieux.
//
// Trois façons de poser une feuille, selon ce qu'on sait d'elle :
//
//   similitude  trois repères ou plus : on cherche l'échelle, l'orientation et
//               la position qui les satisfont au mieux (moindres carrés). Pas
//               de cisaillement : une feuille ne se déforme pas.
//   ancre       un ou deux repères : l'échelle est celle de la feuille de
//               référence, l'orientation vient de la flèche du nord dessinée
//               sur la feuille (toutes les feuilles la portent), et le repère
//               fixe la position.
//   raccord     aucun repère sûr : la feuille est accrochée à sa voisine par
//               leur ligne de raccord (« See sheet No »), même échelle, flèche
//               du nord.
//
// Puis, pour une feuille marquée « etirer » (Patrick a levé le 2026-11-17 la
// règle qui interdisait d'étirer une feuille), la pose est reprise en
// transformation affine — deux échelles, des axes qui peuvent ne plus être
// d'équerre — ajustée à la fois sur :
//   - ses repères (poids 4) ;
//   - le chemin public qu'elle dessine (« chemin », pixels), posé sur l'axe du
//     chemin du Fleuve d'aujourd'hui (« chemin_actuel », en tête du fichier des
//     repères) : chaque point du chemin dessiné va au point le plus proche de
//     l'axe actuel (poids 1), et l'on recommence jusqu'à ce que rien ne bouge ;
//     un point qui tomberait au-delà d'un bout de l'axe actuel ne compte pas ;
//   - le raccord avec les voisines qu'elle nomme dans « accroche » (poids 2) ;
//   - un rappel vers la similitude (poids 0,3), pour que la feuille ne se
//     déforme que là où les points l'y obligent.
//
// Ce que le programme dit, et qu'il faut lire : l'écart de chaque repère, celui
// des points de contrôle (des lieux qu'on n'a pas voulu faire peser — douteux,
// ou placés autrefois d'après un ancien calage), et l'écart aux raccords entre
// feuilles voisines. Ces plans d'assurance ne sont pas dessinés à une échelle
// constante d'un bout à l'autre : une feuille n'est juste qu'autour de ses
// repères, et deux feuilles bien posées peuvent ne pas se rejoindre à cent
// mètres près. Voir docs/PLANS-ANCIENS.md.
//
//   node outils/lieux/caler-plans.mjs            calcule et écrit data/plans-data.js
//   node outils/lieux/caler-plans.mjs --essai    montre sans écrire
//   node outils/lieux/caler-plans.mjs --forcer   réécrit aussi un plan réglé à la main
//
// La main l'emporte : un plan dont les coins ont été déplacés aux poignées dans
// l'atelier de la carte (ils ne sont plus ceux du dernier calcul) est laissé
// tel quel, et signalé. Seuls les coins sont écrits ; le titre, la note,
// l'opacité et le drapeau `cale` d'un plan déjà présent ne sont pas touchés.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const ESSAI = process.argv.includes('--essai');
const FORCER = process.argv.includes('--forcer');
const F_REPERES = path.join(RACINE, 'data', 'plans-reperes.json');
const F_PLANS = path.join(RACINE, 'data', 'plans-data.js');
const F_LIEUX = path.join(RACINE, 'data', 'lieux-data.js');

function chargerGlobal(fichier) {
  const bac = {};
  new Function('window', fs.readFileSync(fichier, 'utf8'))(bac);
  return bac[Object.keys(bac)[0]];
}

// ─── projection ─────────────────────────────────────────────────────────────
// Mercator sphérique, en mètres : conforme, donc une similitude y reste une
// similitude. LAT0 ramène l'échelle de la projection à des mètres au sol.
const R = 6378137, LAT0 = 46.752, K0 = Math.cos(LAT0 * Math.PI / 180);
const versPlan = (lat, lon) => [R * lon * Math.PI / 180, -R * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))]; // y vers le sud, comme l'image
const versTerre = ([x, y]) => ({
  lat: Number(((2 * Math.atan(Math.exp(-y / R)) - Math.PI / 2) * 180 / Math.PI).toFixed(6)),
  lon: Number((x / R * 180 / Math.PI).toFixed(6))
});
const metres = ([dx, dy]) => Math.hypot(dx, dy) * K0;

// ─── poses ──────────────────────────────────────────────────────────────────
// Une pose est une transformation affine { a, b, c, d, tx, ty } :
// (x, y) ↦ (a·x + b·y + tx, c·x + d·y + ty). Une similitude est le cas a = d,
// b = −c : même échelle dans les deux sens, axes d'équerre.
const similitude = (a, b, tx, ty) => ({ a, b: -b, c: b, d: a, tx, ty });
const appliquer = (m, [x, y]) => [m.a * x + m.b * y + m.tx, m.c * x + m.d * y + m.ty];
const echelleX = (m) => Math.hypot(m.a, m.c) * K0;                   // mètres par pixel, largeur de la feuille
const echelleY = (m) => Math.hypot(m.b, m.d) * K0;                   // mètres par pixel, hauteur de la feuille
const echelleDe = (m) => (echelleX(m) + echelleY(m)) / 2;
const rotationDe = (m) => Math.atan2(m.c, m.a) * 180 / Math.PI;      // degrés, sens horaire à l'écran
const anglesAxes = (m) => Math.acos((m.a * m.b + m.c * m.d) / Math.hypot(m.a, m.c) / Math.hypot(m.b, m.d)) * 180 / Math.PI;
const estEtiree = (m) => Math.abs(echelleX(m) - echelleY(m)) > 0.0005 || Math.abs(anglesAxes(m) - 90) > 0.05;

/** Moindres carrés sur des couples (pixel, sol). */
function ajuster(couples) {
  const n = couples.length;
  let sx = 0, sy = 0, su = 0, sv = 0;
  for (const [[x, y], [u, v]] of couples) { sx += x; sy += y; su += u; sv += v; }
  const mx = sx / n, my = sy / n, mu = su / n, mv = sv / n;
  let num1 = 0, num2 = 0, den = 0;
  for (const [[x, y], [u, v]] of couples) {
    const dx = x - mx, dy = y - my, du = u - mu, dv = v - mv;
    num1 += dx * du + dy * dv; num2 += dx * dv - dy * du; den += dx * dx + dy * dy;
  }
  const a = num1 / den, b = num2 / den;
  return similitude(a, b, mu - (a * mx - b * my), mv - (b * mx + a * my));
}

/** Échelle (m/px) et rotation (degrés) données, passant par un couple (pixel, sol). */
function poser(echelle, rotation, pixel, sol) {
  const s = echelle / K0, t = rotation * Math.PI / 180;
  const a = s * Math.cos(t), b = s * Math.sin(t);
  return similitude(a, b, sol[0] - (a * pixel[0] - b * pixel[1]), sol[1] - (b * pixel[0] + a * pixel[1]));
}

// ─── étirer : affine sur repères, chemin et raccords ────────────────────────
/** Résout le système linéaire n × n (élimination de Gauss, pivot partiel). */
function resoudre(A, y) {
  const n = y.length, M = A.map((ligne, i) => [...ligne, y[i]]);
  for (let k = 0; k < n; k++) {
    let p = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[p][k])) p = i;
    [M[k], M[p]] = [M[p], M[k]];
    for (let i = k + 1; i < n; i++) {
      const f = M[i][k] / M[k][k];
      for (let j = k; j <= n; j++) M[i][j] -= f * M[k][j];
    }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = M[i][n];
    for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j];
    x[i] = s / M[i][i];
  }
  return x;
}

/** Le point de l'axe actuel le plus proche ; null s'il tombe au-delà d'un bout. */
function lePlusProche(p, axe) {
  let mieux = null;
  for (let i = 0; i < axe.length - 1; i++) {
    const [ax, ay] = axe[i], [bx, by] = axe[i + 1];
    const ux = bx - ax, uy = by - ay;
    let t = ((p[0] - ax) * ux + (p[1] - ay) * uy) / (ux * ux + uy * uy);
    const bout = (t <= 0 && i === 0) || (t >= 1 && i === axe.length - 2);
    t = Math.min(1, Math.max(0, t));
    const q = [ax + t * ux, ay + t * uy], dist = Math.hypot(p[0] - q[0], p[1] - q[1]);
    if (!mieux || dist < mieux.dist) mieux = { q, dist, bout };
  }
  return mieux && !mieux.bout ? mieux : null;
}

const POIDS = { repere: 4, chemin: 1, raccord: 2, similitude: 0.3 };
const PORTEE = 150 / K0;   // un point du chemin à plus de 150 m de l'axe actuel ne compte pas

/** Reprend une pose en affine : repères, chemin dessiné ↔ chemin actuel, raccords. */
function etirer(depart, { repere, chemin, raccord, axe, taille }) {
  // Coordonnées centrées : la feuille autour de son milieu, le sol autour de
  // l'image de ce milieu — sans quoi les grands nombres de la projection
  // noieraient le calcul.
  const pc = [taille[0] / 2, taille[1] / 2], o = appliquer(depart, pc), L = Math.max(...taille);
  let m = depart;
  for (let tour = 0; tour < 40; tour++) {
    const N = Array.from({ length: 6 }, () => new Array(6).fill(0)), y = new Array(6).fill(0);
    const ajouter = (ligne, cible, w) => {
      for (let i = 0; i < 6; i++) { y[i] += w * w * ligne[i] * cible; for (let j = 0; j < 6; j++) N[i][j] += w * w * ligne[i] * ligne[j]; }
    };
    const observer = (px, sol, w) => {
      const dx = px[0] - pc[0], dy = px[1] - pc[1];
      ajouter([dx, dy, 1, 0, 0, 0], sol[0] - o[0], w);
      ajouter([0, 0, 0, dx, dy, 1], sol[1] - o[1], w);
    };
    for (const [px, sol] of repere) observer(px, sol, POIDS.repere);
    for (const [px, sol] of raccord) observer(px, sol, POIDS.raccord);
    for (const px of chemin) {
      const p = lePlusProche(appliquer(m, px), axe);
      if (p && p.dist < PORTEE) observer(px, p.q, POIDS.chemin);
    }
    ajouter([L, 0, 0, 0, -L, 0], 0, POIDS.similitude);   // a = d
    ajouter([0, L, 0, L, 0, 0], 0, POIDS.similitude);    // b = −c
    const [a, b, t1, c, d, t2] = resoudre(N, y);
    m = { a, b, c, d, tx: o[0] + t1 - (a * pc[0] + b * pc[1]), ty: o[1] + t2 - (c * pc[0] + d * pc[1]) };
  }
  return m;
}

const milieu = (pts) => [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];

// ─── données ────────────────────────────────────────────────────────────────
const reperes = JSON.parse(fs.readFileSync(F_REPERES, 'utf8'));
const lieux = new Map(chargerGlobal(F_LIEUX).lieux.map((l) => [l.id, l]));
const fichierPlans = fs.existsSync(F_PLANS) ? chargerGlobal(F_PLANS) : { format: 'plans-saint-romuald', version: 1, plans: [] };

const avis = [];
function solDe(r, plan) {
  if (r.lat != null && r.lon != null) return versPlan(r.lat, r.lon);
  const l = lieux.get(r.lieu);
  if (!l) { avis.push(`${plan} : le lieu « ${r.lieu} » n'existe plus dans data/lieux-data.js — repère ignoré`); return null; }
  if (!l.coord) { avis.push(`${plan} : le lieu « ${r.lieu} » n'a pas de position — repère ignoré`); return null; }
  if (l.coord.precision !== 'releve') avis.push(`${plan} : la position de « ${r.lieu} » n'est pas relevée à la main (${l.coord.precision}) — repère douteux`);
  return versPlan(l.coord.lat, l.coord.lon);
}
const couplesDe = (liste, plan) => (liste || []).map((r) => ({ r, pixel: [r.x, r.y], sol: solDe(r, plan) })).filter((c) => c.sol);

// ─── pose de chaque feuille ─────────────────────────────────────────────────
// La feuille de référence d'abord (elle donne l'échelle et, par sa flèche du
// nord, l'orientation des autres) ; puis les feuilles ancrées ; puis celles
// qui s'accrochent à une voisine déjà posée.
const poses = new Map();
const methodes = new Map();
const ref = reperes.reference;
const plans = reperes.plans;

function poserParSimilitude(id) {
  const c = couplesDe(plans[id].reperes, id);
  if (c.length < 3) throw new Error(`${id} : la méthode « similitude » demande trois repères au moins (${c.length} utilisables)`);
  poses.set(id, ajuster(c.map((x) => [x.pixel, x.sol])));
  methodes.set(id, `similitude sur ${c.length} repères`);
}
/** L'orientation d'une feuille d'après sa flèche du nord, rapportée à la référence. */
const rotationParFleche = (id) => rotationDe(poses.get(ref)) + (plans[ref].fleche_nord - plans[id].fleche_nord);

if (!plans[ref] || plans[ref].methode !== 'similitude') throw new Error('la feuille de référence doit être posée par similitude');
poserParSimilitude(ref);
for (const [id, p] of Object.entries(plans)) {
  if (id === ref) continue;
  if (p.methode === 'similitude') poserParSimilitude(id);
  else if (p.methode === 'ancre') {
    const c = couplesDe(p.reperes, id);
    if (!c.length) throw new Error(`${id} : la méthode « ancre » demande au moins un repère`);
    poses.set(id, poser(echelleDe(poses.get(ref)), rotationParFleche(id), milieu(c.map((x) => x.pixel)), milieu(c.map((x) => x.sol))));
    methodes.set(id, `échelle de la feuille ${plans[ref].feuillet}, flèche du nord, ancrée sur ${c.length} repère(s)`);
  }
}
for (const [id, p] of Object.entries(plans)) {
  if (p.methode !== 'raccord') continue;
  const voisin = p.voisin;
  if (!poses.has(voisin)) throw new Error(`${id} : la voisine « ${voisin} » n'est pas posée`);
  const ici = p.raccords[voisin], la = plans[voisin].raccords[id];
  poses.set(id, poser(echelleDe(poses.get(ref)), rotationParFleche(id), milieu(ici), milieu(la.map((px) => appliquer(poses.get(voisin), px)))));
  methodes.set(id, `accrochée à la feuille ${plans[voisin].feuillet} par leur ligne de raccord, même échelle, flèche du nord`);
}

// Étirer : la référence d'abord, puis les feuilles dans l'ordre du fichier ;
// une feuille qui s'accroche à une voisine la prend telle qu'elle vient d'être
// reprise. La pose de départ est celle qu'on vient de calculer.
const axe = (reperes.chemin_actuel?.points || []).map(([lat, lon]) => versPlan(lat, lon));
const aEtirer = Object.keys(plans).filter((id) => plans[id].etirer);
aEtirer.sort((x, y) => (x === ref ? -1 : y === ref ? 1 : 0));
const repris = new Set();
for (const id of aEtirer) {
  const p = plans[id];
  if (!poses.has(id)) continue;
  if (axe.length < 2 && p.chemin?.length) throw new Error(`${id} : « etirer » avec un chemin demande « chemin_actuel » en tête de ${path.basename(F_REPERES)}`);
  const raccord = [];
  for (const voisin of p.accroche || []) {
    if (!repris.has(voisin) && plans[voisin]?.etirer) throw new Error(`${id} : la voisine « ${voisin} » doit être reprise avant elle`);
    const ici = p.raccords?.[voisin], la = plans[voisin]?.raccords?.[id];
    if (!ici || !la || !poses.has(voisin)) throw new Error(`${id} : pas de raccord utilisable avec « ${voisin} »`);
    ici.forEach((px, i) => raccord.push([px, appliquer(poses.get(voisin), la[i])]));
  }
  poses.set(id, etirer(poses.get(id), {
    repere: couplesDe(p.reperes, id).map((c) => [c.pixel, c.sol]),
    chemin: p.chemin || [], raccord, axe, taille: [p.largeur, p.hauteur]
  }));
  repris.add(id);
  methodes.set(id, `${methodes.get(id)}, puis étirée sur ${(p.reperes || []).length ? 'ses repères, ' : ''}son chemin et le chemin du Fleuve d'aujourd'hui` +
    (raccord.length ? `, accrochée à la feuille ${p.accroche.map((v) => plans[v].feuillet).join(', ')}` : ''));
}

// ─── compte rendu ───────────────────────────────────────────────────────────
const lignes = [];
const dire = (t = '') => lignes.push(t);
const coins = new Map();
for (const [id, p] of Object.entries(plans)) {
  const m = poses.get(id);
  if (!m) { avis.push(`${id} : méthode « ${p.methode} » inconnue — non posé`); continue; }
  coins.set(id, { nw: versTerre(appliquer(m, [0, 0])), ne: versTerre(appliquer(m, [p.largeur, 0])), sw: versTerre(appliquer(m, [0, p.hauteur])) });
  dire(`\n── feuille ${p.feuillet} (${id}) — ${methodes.get(id)}`);
  if (estEtiree(m)) dire(`   échelles ${echelleX(m).toFixed(3)} (largeur) et ${echelleY(m).toFixed(3)} (hauteur) m par pixel ; axes à ${anglesAxes(m).toFixed(1)}° ; orientation ${rotationDe(m).toFixed(1)}°`);
  else dire(`   échelle ${echelleDe(m).toFixed(3)} m par pixel ; orientation ${rotationDe(m).toFixed(1)}°`);
  const ecart = (c) => { const q = appliquer(m, c.pixel); return metres([q[0] - c.sol[0], q[1] - c.sol[1]]); };
  const rep = couplesDe(p.reperes, id);
  if (rep.length) {
    const e = rep.map(ecart);
    dire(`   repères : écart moyen ${(Math.sqrt(e.reduce((s, x) => s + x * x, 0) / e.length)).toFixed(0)} m, le pire ${Math.max(...e).toFixed(0)} m`);
    rep.forEach((c, i) => dire(`     ${String(e[i].toFixed(0)).padStart(4)} m  ${c.r.quoi} — ${c.r.lieu || 'point donné'}`));
  }
  if (p.etirer && p.chemin?.length && axe.length > 1) {
    const e = p.chemin.map((px) => lePlusProche(appliquer(m, px), axe)).filter(Boolean).map((q) => q.dist * K0).sort((x, y) => x - y);
    if (e.length) dire(`   chemin dessiné ↔ chemin du Fleuve d'aujourd'hui : ${e[Math.floor(e.length / 2)].toFixed(0)} m au milieu, le pire ${e[e.length - 1].toFixed(0)} m (${e.length} points sur ${p.chemin.length})`);
  }
  const ctl = couplesDe(p.controle, id);
  if (ctl.length) {
    dire('   contrôle (ne pèse pas dans le calage) :');
    ctl.forEach((c) => dire(`     ${String(ecart(c).toFixed(0)).padStart(4)} m  ${c.r.quoi} — ${c.r.lieu}`));
  }
}
dire('\n── raccords entre feuilles voisines');
const vus = new Set();
for (const [id, p] of Object.entries(plans)) {
  for (const [voisin, ici] of Object.entries(p.raccords || {})) {
    const cle = [id, voisin].sort().join('|');
    if (vus.has(cle) || !poses.has(id) || !poses.has(voisin) || !plans[voisin].raccords?.[id]) continue;
    vus.add(cle);
    const la = plans[voisin].raccords[id];
    const e = ici.map((px, i) => { const a = appliquer(poses.get(id), px), b = appliquer(poses.get(voisin), la[i]); return metres([a[0] - b[0], a[1] - b[1]]); });
    dire(`   ${plans[id].feuillet} – ${plans[voisin].feuillet} : ${Math.max(...e).toFixed(0)} m` +
      (Math.max(...e) > 30 ? ' — les deux feuilles ne se rejoignent pas : chacune est juste près de ses repères, pas à sa lisière' : ''));
  }
}

// ─── écriture ───────────────────────────────────────────────────────────────
// `calcul` garde, dans le fichier des repères, les coins du dernier passage :
// c'est ce qui permet de reconnaître un plan que la main a déplacé depuis.
const memes = (a, b) => a && b && ['nw', 'ne', 'sw'].every((k) => Math.abs(a[k].lat - b[k].lat) < 2e-6 && Math.abs(a[k].lon - b[k].lon) < 2e-6);
const ecrits = [], laisses = [], absents = [];
for (const [id, c] of coins) {
  const plan = (fichierPlans.plans || []).find((x) => x.id === id);
  if (!plan) { absents.push(id); continue; }
  const dernier = plans[id].calcul;
  if (plan.points && dernier && !memes(plan.points, dernier) && !FORCER) {
    laisses.push(id);
    continue;
  }
  if (!memes(plan.points, c)) ecrits.push(id);
  plan.points = c;
  plans[id].calcul = c;
}
dire('');
if (ecrits.length) dire(`${ESSAI ? '[essai] seraient recalés' : 'Recalés'} : ${ecrits.join(', ')}`);
else dire('Aucun coin à changer : data/plans-data.js est déjà d\'accord avec le calcul.');
for (const id of laisses) dire(`Laissé : ${id} — ses coins ont été réglés à la main dans l'atelier depuis le dernier calcul (--forcer pour les recalculer)`);
for (const id of absents) dire(`Absent de data/plans-data.js : ${id} — y créer l'entrée du plan (id, titre, fichier…) pour qu'il reçoive ses coins`);
for (const a of avis) dire(`! ${a}`);
console.log(lignes.join('\n'));

if (!ESSAI) {
  fichierPlans.mis_a_jour = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(F_PLANS,
    '// Plans anciens posés en surimpression de la carte — voir docs/PLANS-ANCIENS.md.\n' +
    '// Les coins sont calculés par outils/lieux/caler-plans.mjs depuis data/plans-reperes.json,\n' +
    '// puis réglables aux poignées dans carte.html (mode Atelier) et versés par outils/lieux/fondre.mjs.\n' +
    'window.PLANS = ' + JSON.stringify(fichierPlans, null, 2) + ';\n');
  fs.writeFileSync(F_REPERES, JSON.stringify(reperes, null, 2) + '\n');
}
