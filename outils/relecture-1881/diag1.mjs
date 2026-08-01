import path from 'path';
import { fileURLToPath } from 'url';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
import fs from 'fs';
const raw = fs.readFileSync(RACINE + '/data/recensement-1881-d1-data.js', 'utf8');
const D = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
const P = [];
for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || []) P.push({ m, f, p });

console.log('=== 1. INTÉGRITÉ ===');
const ids = P.map(r => r.p.id), dup = ids.filter((v, i) => ids.indexOf(v) !== i);
console.log('  ids dupliqués :', dup.length || 'aucun');
const ms = D.maisons.map(m => +m.no_maison);
let rupt = [];
for (let i = 1; i < ms.length; i++) if (ms[i] - ms[i - 1] !== 1) rupt.push(`${ms[i-1]} -> ${ms[i]}`);
console.log('  maisons :', ms.length, '| de', ms[0], 'à', ms[ms.length-1], '| ruptures :', rupt.length);
rupt.slice(0, 12).forEach(x => console.log('     ' + x));
const fam = []; for (const m of D.maisons) for (const f of m.familles) fam.push(+f.no_famille);
let rf = []; for (let i = 1; i < fam.length; i++) if (fam[i] - fam[i-1] !== 1) rf.push(`${fam[i-1]} -> ${fam[i]}`);
console.log('  familles :', fam.length, '| ruptures :', rf.length, rf.slice(0,8).join('  '));

console.log('\n=== 2. CHAMP SEXE ===');
const s = {}; for (const r of P) s[r.p.sexe || '(vide)'] = (s[r.p.sexe || '(vide)'] || 0) + 1;
console.log(' ', JSON.stringify(s), '— attendu ~50/50');
let ok = 0, bad = 0;
for (const m of D.maisons) for (const f of m.familles) {
  const mar = f.membres.filter(p => p.etat_matrimonial === 'M');
  if (mar.length === 2) (mar[0].sexe !== mar[1].sexe ? ok++ : bad++);
}
console.log('  couples mariés de 2 personnes — sexes opposés :', ok, '| même sexe :', bad);

console.log('\n=== 3. FAMILLES À DEUX PATRONYMES (le motif qui a tout révélé en D2) ===');
let n3 = 0;
for (const m of D.maisons) for (const f of m.familles) {
  const noms = [...new Set(f.membres.map(p => p.nom).filter(Boolean))];
  if (noms.length > 1) {
    const pages = [...new Set(f.membres.map(p => p.page_ms))];
    if (pages.length > 1) { n3++; if (n3 <= 12) console.log(`  F${f.no_famille} p${pages.join('/')} : ${noms.join(' + ')}`); }
  }
}
console.log('  familles à cheval sur deux pages avec deux patronymes :', n3);

console.log('\n=== 4. SIGNATURE DE LA BOUCLE DU 7 (âge 1 au milieu d\'une fratrie) ===');
let n4 = 0;
for (const m of D.maisons) for (const f of m.familles) {
  const a = f.membres.map(p => parseInt(p.age, 10));
  for (let i = 1; i < a.length - 1; i++)
    if (a[i] === 1 && a[i-1] >= 12 && a[i+1] >= 10) {
      n4++; if (n4 <= 10) console.log(`  p${f.membres[i].page_ms} L${f.membres[i].ligne} ${f.membres[i].nom} ${f.membres[i].prenom} : 1 an entre ${a[i-1]} et ${a[i+1]}`);
    }
}
console.log('  cas suspects :', n4);

console.log('\n=== 5. PRÉNOM DUPLIQUÉ DANS UNE MÊME FAMILLE ===');
let n5 = 0;
for (const m of D.maisons) for (const f of m.familles) {
  const c = {}; for (const p of f.membres) if (p.prenom) c[p.prenom] = (c[p.prenom] || 0) + 1;
  for (const k in c) if (c[k] > 1) { n5++; if (n5 <= 8) console.log(`  F${f.no_famille} (${f.chef}) : « ${k} » ×${c[k]}`); }
}
console.log('  cas :', n5);

console.log('\n=== 6. CHEF ≠ 1re PERSONNE ===');
let n6 = 0;
for (const m of D.maisons) for (const f of m.familles) {
  const p0 = f.membres[0]; if (!p0) continue;
  const att = `${p0.nom} ${p0.prenom}`.trim();
  if (f.chef && f.chef !== att) { n6++; if (n6 <= 8) console.log(`  F${f.no_famille} : « ${f.chef} » vs « ${att} »`); }
}
console.log('  cas :', n6);
