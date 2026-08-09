import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
/* Contrôles d'intégrité de 1891 division 1, à passer après chaque lot de corrections. */
const ATTENDU = { personnes: 3548, maisons: 637, familles: 644 };
const raw = fs.readFileSync(RACINE + '/data/recensement-1891-d1-data.js', 'utf8');
const D = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));

let personnes = 0, familles = 0;
const ids = new Map(), maisons = new Map(), pages = new Map();
for (const m of D.maisons) {
  if (maisons.has(m.no_maison)) console.log('  no_maison dupliqué :', m.no_maison);
  maisons.set(m.no_maison, 1);
  for (const f of m.familles || []) {
    familles++;
    for (const p of f.membres || []) {
      personnes++;
      if (ids.has(p.id)) console.log('  id dupliqué :', p.id);
      ids.set(p.id, 1);
      const k = `${p.page_ms}:${p.ligne}`;
      if (pages.has(k)) console.log('  page:ligne dupliquée :', k);
      pages.set(k, 1);
    }
  }
}
const ecart = (nom, vu, att) => console.log(`  ${nom} : ${vu}${vu === att ? ' ✓' : ` ✗ (attendu ${att})`}`);
console.log('=== INTÉGRITÉ 1891-D1 ===');
ecart('personnes', personnes, ATTENDU.personnes);
ecart('maisons', maisons.size, ATTENDU.maisons);
ecart('familles', familles, ATTENDU.familles);

// Une page du manuscrit compte 25 lignes : une page qui en compte moins cache
// une personne omise, et décale tous les numéros de ligne qui suivent.
const parPage = new Map();
for (const k of pages.keys()) {
  const p = k.split(':')[0];
  parPage.set(p, (parPage.get(p) || 0) + 1);
}
const courtes = [...parPage.entries()].filter(([p, n]) => n !== 25 && Number(p) < 142);
console.log('  pages de moins de 25 lignes :', courtes.length ? courtes.map(([p, n]) => `${p} (${n})`).join(', ') : 'aucune');

// Le chef enregistré doit rester celui du premier membre après une correction de nom.
// Le fichier accentue les chefs là où les membres ne le sont pas toujours : ces
// écarts-là sont d'origine et ne signalent pas une correction mal propagée.
const pli = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
let desync = 0, accents = 0;
for (const m of D.maisons) for (const f of m.familles || []) {
  const p = (f.membres || [])[0];
  if (!p || !f.chef) continue;
  const attendu = `${p.nom || ''} ${p.prenom || ''}`.trim();
  if (f.chef === attendu) continue;
  if (pli(f.chef) === pli(attendu)) { accents++; continue; }
  desync++; if (desync <= 10) console.log(`  chef désynchronisé F${f.no_famille} : « ${f.chef} » ≠ « ${attendu} »`);
}
console.log('  chefs désynchronisés :', desync, `(+ ${accents} écarts d'accent d'origine)`);
console.log('  lignes marquées incertain :', [...ids.keys()].length && (() => {
  let n = 0;
  for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || []) if (p.incertain) n++;
  return n;
})());
