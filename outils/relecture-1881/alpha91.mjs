import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
/* Colonnes 21-22 de 1891 division 1 : ce que porte le fichier, page par page. */
const raw = fs.readFileSync(RACINE + '/data/recensement-1891-d1-data.js','utf8');
const D = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}')+1));
const want = process.argv.slice(2);
const s = v => v===true?'1':v===false?'0':'.';
for (const m of D.maisons) for (const f of m.familles||[]) for (const p of f.membres||[]) {
  if (!want.includes(String(p.page_ms))) continue;
  console.log([String(p.page_ms).padStart(3), String(p.ligne).padStart(2),
    (p.nom+' '+p.prenom).slice(0,26).padEnd(26), (p.age||'').padStart(6),
    (p.profession||'').slice(0,20).padEnd(20), s(p.sait_lire)+s(p.sait_ecrire)].join(' '));
}
