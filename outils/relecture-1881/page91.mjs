import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
/* Dump aligné des données de 1891 division 1, une ou plusieurs pages du manuscrit. */
const FILE = RACINE + '/data/recensement-1891-d1-data.js';
const raw = fs.readFileSync(FILE, 'utf8');
const D = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
const want = process.argv.slice(2);
let lm = null, lf = null;
for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || []) {
  if (!want.includes(String(p.page_ms))) continue;
  const mm = m.no_maison !== lm ? 'M' + m.no_maison : '';
  const ff = f.no_famille !== lf ? 'F' + f.no_famille : '';
  lm = m.no_maison; lf = f.no_famille;
  console.log([String(p.page_ms).padStart(3), String(p.ligne).padStart(2), mm.padStart(5), ff.padStart(5),
    (p.nom || '').padEnd(14), (p.prenom || '').padEnd(17), (p.sexe || '').padEnd(1),
    (p.age || '').padStart(5), (p.etat_matrimonial || '').padEnd(1), (p.lien_parente || '').padEnd(13),
    (p.lieu_naissance || '').padEnd(9), (p.religion || '').padEnd(6),
    (p.profession || '').padEnd(18), p.incertain ? 'INC' : '   '].join('|'));
}
