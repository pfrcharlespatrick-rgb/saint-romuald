import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { manuel, protege, touche, sansRelecture } from './atelier.mjs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
/* Même ossature que pat1.mjs, pour le fichier de 1891 division 1.

   Règle intangible : **une correction faite à la main dans l'atelier l'emporte.**
   Un champ que Patrick a corrigé n'est jamais réécrit par une relecture
   automatique, et la ligne qui en porte une est tenue pour tranchée — elle perd
   son drapeau `incertain` et les remarques empilées par les relectures
   précédentes. Voir `atelier.mjs`. */
export function apply(fn){
  const FILE = RACINE + '/data/recensement-1891-d1-data.js';
  const raw = fs.readFileSync(FILE,'utf8'); const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
  const D = JSON.parse(raw.slice(a,b+1)); const idx = new Map();
  for(const m of D.maisons) for(const f of m.familles) for(const p of f.membres) idx.set(p.page_ms+':'+p.ligne,{m,f,p});
  let n = 0; const refuses = [];
  const R = o => `Relecture du manuscrit : ${o}`;
  const set = (page, lignes, champs, o={}) => { for(const l of lignes){ const r = idx.get(`${page}:${l}`);
    if(!r) throw new Error('ligne absente '+page+':'+l);
    const garde = Object.keys(champs).filter(k => protege(r.p.id, k));
    for(const k of garde) refuses.push(`p${page}:${l} ${k} — la main a écrit « ${manuel(r.p.id)[k]} », la relecture proposait « ${champs[k]} »`);
    const retenus = Object.fromEntries(Object.entries(champs).filter(([k]) => !garde.includes(k)));
    if(!Object.keys(retenus).length && !o.rem) continue;
    Object.assign(r.p, retenus);
    // Une ligne corrigée à la main est tranchée : ni drapeau, ni remarque ajoutée.
    if(!touche(r.p.id)){
      if(o.inc !== undefined) r.p.incertain = o.inc;
      if(o.rem) r.p.remarque = r.p.remarque ? `${r.p.remarque} ${o.rem}` : o.rem;
    }
    if((retenus.nom || retenus.prenom) && r.f.membres[0] === r.p && r.f.chef)
      r.f.chef = `${r.p.nom} ${r.p.prenom}`.trim();
    n++; } };
  fn({set,R});
  fs.writeFileSync(FILE, raw.slice(0,a) + JSON.stringify(D) + raw.slice(b+1));
  console.log('champs modifiés sur', n, 'lignes');
  if(refuses.length){
    console.log('\n' + refuses.length + ' champ(s) laissé(s) à la main de Patrick :');
    for(const m of refuses) console.log('  ' + m);
  }
}

/** Applique au fichier ce que la main a écrit dans l'atelier, et retire de ces
    lignes les traces des relectures automatiques. Renvoie le compte-rendu. */
export function fondreAtelier({ essai = false } = {}) {
  const FILE = RACINE + '/data/recensement-1891-d1-data.js';
  const raw = fs.readFileSync(FILE, 'utf8'); const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
  const D = JSON.parse(raw.slice(a, b + 1));
  const faits = [];
  for (const m of D.maisons) for (const f of m.familles) for (const p of f.membres) {
    if (!touche(p.id)) continue;
    for (const [k, v] of Object.entries(manuel(p.id))) {
      if (p[k] === v) continue;
      faits.push(`${p.id} ${k} : « ${p[k]} » -> « ${v} »`);
      p[k] = v;
    }
    if (p.incertain) { p.incertain = false; faits.push(`${p.id} drapeau « incertain » levé`); }
    const propre = sansRelecture(p.remarque);
    if (propre !== (p.remarque || '')) { p.remarque = propre; faits.push(`${p.id} remarques de relecture retirées`); }
    if (f.membres[0] === p && f.chef) f.chef = `${p.nom} ${p.prenom}`.trim();
  }
  if (!essai && faits.length) fs.writeFileSync(FILE, raw.slice(0, a) + JSON.stringify(D) + raw.slice(b + 1));
  return faits;
}
