import path from 'path';
import { fileURLToPath } from 'url';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
import fs from 'fs';
export function apply(fn){
  const FILE=RACINE + '/data/recensement-1881-d1-data.js';
  const raw=fs.readFileSync(FILE,'utf8'); const a=raw.indexOf('{'),b=raw.lastIndexOf('}');
  const D=JSON.parse(raw.slice(a,b+1)); const idx=new Map();
  for(const m of D.maisons) for(const f of m.familles) for(const p of f.membres) idx.set(p.page_ms+':'+p.ligne,{m,f,p});
  let n=0;
  const R=o=>`Relecture du manuscrit : ${o}`;
  const set=(page,lignes,champs,o={})=>{ for(const l of lignes){ const r=idx.get(`${page}:${l}`);
    if(!r) throw new Error('ligne absente '+page+':'+l);
    Object.assign(r.p,champs);
    if(o.inc!==undefined) r.p.incertain=o.inc;
    if(o.rem) r.p.remarque=r.p.remarque?`${r.p.remarque} ${o.rem}`:o.rem;
    if(champs.nom&&r.f.membres[0]===r.p&&r.f.chef) r.f.chef=`${r.p.nom} ${r.p.prenom}`.trim();
    if(champs.prenom&&r.f.membres[0]===r.p&&r.f.chef) r.f.chef=`${r.p.nom} ${r.p.prenom}`.trim();
    n++; } };
  fn({set,R});
  fs.writeFileSync(FILE, raw.slice(0,a)+JSON.stringify(D)+raw.slice(b+1));
  console.log('champs modifiés sur',n,'lignes');
}
