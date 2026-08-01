import { load, persons } from './lib.mjs';
const { D } = load();
const want = process.argv.slice(2);
const rows = persons(D).filter(r => want.includes(String(r.p.page_ms)));
let lastM = null, lastF = null;
for (const r of rows) {
  const m = r.maison.no_maison !== lastM ? `M${r.maison.no_maison}` : '';
  const f = r.famille.no_famille !== lastF ? `F${r.famille.no_famille}` : '';
  lastM = r.maison.no_maison; lastF = r.famille.no_famille;
  const p = r.p;
  console.log(
    [String(p.page_ms).padStart(2), String(p.ligne).padStart(2), m.padStart(5), f.padStart(5),
     (p.nom||'').padEnd(14), (p.prenom||'').padEnd(16), (p.sexe||'').padEnd(2),
     (p.age||'').padStart(3), (p.profession||'').padEnd(14), (p.etat_matrimonial||'').padEnd(2),
     p.incertain ? 'INC' : '   ', (p.remarque||'').slice(0,50)].join(' | '));
}
console.log('--- lignes:', rows.length, '| chefs:', [...new Set(rows.map(r=>r.famille.no_famille+':'+r.famille.chef))].join(' / '));
