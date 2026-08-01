import path from 'path';
import { fileURLToPath } from 'url';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
import fs from 'fs';
const FILE=RACINE + '/data/recensement-1881-d1-data.js';
const raw=fs.readFileSync(FILE,'utf8');
const D=JSON.parse(raw.slice(raw.indexOf('{'),raw.lastIndexOf('}')+1));
const want=process.argv.slice(2);
let lm=null,lf=null;
for(const m of D.maisons) for(const f of m.familles||[]) for(const p of f.membres||[]){
  if(!want.includes(String(p.page_ms))) continue;
  const mm=m.no_maison!==lm?'M'+m.no_maison:''; const ff=f.no_famille!==lf?'F'+f.no_famille:'';
  lm=m.no_maison; lf=f.no_famille;
  console.log([String(p.page_ms).padStart(2),String(p.ligne).padStart(2),mm.padStart(5),ff.padStart(5),
    (p.nom||'').padEnd(14),(p.prenom||'').padEnd(16),(p.sexe||'').padEnd(2),(p.age||'').padStart(4),
    (p.profession||'').padEnd(12),p.incertain?'INC':'   '].join(' | '));
}
