import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { corrections, manuel, touche, sansRelecture } from './atelier.mjs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Verse dans les recensements ce que Patrick a corrigé à la main dans l'atelier.

     node fondre.mjs             # tous les recensements concernés
     node fondre.mjs 1891-D1     # un seul
     node fondre.mjs --essai     # montre sans écrire

   L'atelier garde ses corrections à part, dans data/travail-personnel.json : sur
   ses propres écrans elles s'appliquent par-dessus les données, mais le site
   public, lui, lit les recensements. Les verser est donc ce qui les rend
   visibles partout — et ce qui met les fichiers d'accord avec la main.

   Une ligne corrigée à la main est tenue pour tranchée : elle perd son drapeau
   `incertain` et les remarques « Relecture du manuscrit : … » empilées par les
   passes automatiques. Ce que Patrick a écrit lui-même dans une remarque est
   conservé. Voir CLAUDE.md. */

const FICHIERS = {
  '1871-D1': 'data/recensement-1871-d1-data.js',
  '1871-D2': 'data/recensement-1871-d2-data.js',
  '1881-D1': 'data/recensement-1881-d1-data.js',
  '1881-D2': 'data/recensement-1881-d2-data.js',
  '1891-D1': 'data/recensement-1891-d1-data.js',
};

/** Les recensements sur lesquels une main s'est posée. */
export function recensementsTouches() {
  return [...new Set(Object.keys(corrections()).map(id => id.slice(0, id.indexOf('-P'))))]
    .filter(r => FICHIERS[r]).sort();
}

export function fondre(recensement, { essai = false } = {}) {
  const chemin = FICHIERS[recensement];
  if (!chemin) throw new Error('recensement inconnu : ' + recensement);
  const FILE = RACINE + '/' + chemin;
  const raw = fs.readFileSync(FILE, 'utf8');
  const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
  const D = JSON.parse(raw.slice(a, b + 1));
  const faits = [];
  let vus = 0;
  for (const m of D.maisons || []) for (const f of m.familles || []) for (const p of f.membres || []) {
    if (!touche(p.id)) continue;
    vus++;
    for (const [k, v] of Object.entries(manuel(p.id))) {
      if (p[k] === v) continue;
      faits.push(`${p.id} ${k} : « ${p[k] === undefined ? '' : p[k]} » -> « ${v} »`);
      p[k] = v;
    }
    if (p.incertain) { p.incertain = false; faits.push(`${p.id} drapeau « incertain » levé`); }
    const propre = sansRelecture(p.remarque);
    if (propre !== (p.remarque || '')) { p.remarque = propre; faits.push(`${p.id} remarques de relecture retirées`); }
    if (f.membres[0] === p && f.chef) f.chef = `${p.nom || ''} ${p.prenom || ''}`.trim();
  }
  if (!essai && faits.length) fs.writeFileSync(FILE, raw.slice(0, a) + JSON.stringify(D) + raw.slice(b + 1));
  return { faits, vus, chemin };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const essai = process.argv.includes('--essai');
  const voulus = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const cibles = voulus.length ? voulus : recensementsTouches();
  let total = 0;
  for (const r of cibles) {
    const { faits, vus, chemin } = fondre(r, { essai });
    console.log(`\n=== ${r} — ${chemin} ===`);
    console.log(`${vus} ligne(s) corrigée(s) à la main, ${faits.length} changement(s)`);
    faits.forEach(x => console.log('  ' + x));
    total += faits.length;
  }
  console.log(`\n${total} changement(s) au total${essai ? ' — essai à blanc, rien écrit' : ''}`);
}
