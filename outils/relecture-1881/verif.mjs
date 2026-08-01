import path from 'path';
import { fileURLToPath } from 'url';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
import fs from 'fs';
import { load, persons } from './lib.mjs';

const raw = fs.readFileSync(RACINE + '/data/recensement-1881-d2-data.js','utf8');
let ok = true;
const fail = (m) => { ok = false; console.log('  ECHEC :', m); };

// 1. le fichier se charge comme du JS
if (!raw.startsWith('window.RECENSEMENT_1881_D2')) fail('préfixe window.* perdu');
if (!raw.trimEnd().endsWith(';')) fail('« ; » final perdu');
if (raw.split('\n').length > 2) fail('le fichier n\'est plus sur une seule ligne');
const { D } = load();
const P = persons(D);

// 2. total
console.log('  personnes :', P.length, P.length === 1452 ? '(OK)' : '(ATTENDU 1452)');
if (P.length !== 1452) fail('total différent de 1452');

// 3. ids uniques
const ids = P.map(r => r.p.id), dupIds = ids.filter((v,i) => ids.indexOf(v) !== i);
console.log('  ids dupliqués :', dupIds.length ? dupIds.join(', ') : 'aucun');
if (dupIds.length) fail('id dupliqué');

// 4. numéros de maison uniques
const ms = D.maisons.map(m => m.no_maison), dupM = ms.filter((v,i) => ms.indexOf(v) !== i);
console.log('  no_maison dupliqués :', dupM.length ? dupM.join(', ') : 'aucun');
if (dupM.length) fail('no_maison dupliqué');

// 5. no_famille : un seul doublon attendu, le « 139 » de la page 31
const fs_ = []; for (const m of D.maisons) for (const f of m.familles) fs_.push(f.no_famille);
const dupF = fs_.filter((v,i) => fs_.indexOf(v) !== i);
console.log('  no_famille dupliqués :', dupF.length ? dupF.join(', ') : 'aucun');
if (dupF.length !== 1 || dupF[0] !== '139') fail('doublon de no_famille inattendu (seul « 139 » est admis)');

// 6. références du manifeste
const man = JSON.parse(fs.readFileSync(RACINE + '/documents/manifeste.json','utf8'));
const known = new Set(ids); for (const r of P) if (r.p.id_ancien) known.add(r.p.id_ancien);
const refs = [];
JSON.stringify(man).replace(/"(1881-D2-[^"]+|D2-1881-[^"]+)"/g, (_, v) => { refs.push(v); return _; });
const brisees = [...new Set(refs.filter(v => !known.has(v)))];
console.log('  références manifeste 1881-D2 :', refs.length, '| brisées :', brisees.length ? brisees.join(', ') : 'aucune');
if (brisees.length) fail('référence de manifeste brisée');

// 7. cohérence chef / première personne de chaque famille
let bad = 0;
for (const m of D.maisons) for (const f of m.familles) {
  const p0 = f.membres[0]; if (!p0) continue;
  const attendu = `${p0.nom} ${p0.prenom}`.trim();
  if (f.chef && f.chef !== attendu) { if (bad < 8) console.log(`  chef ≠ 1re personne : F${f.no_famille} « ${f.chef} » vs « ${attendu} »`); bad++; }
}
console.log('  familles dont le chef diffère de la 1re personne :', bad, '(informatif)');

console.log(ok ? '\n  ==> toutes les vérifications passent' : '\n  ==> DES VERIFICATIONS ONT ECHOUE');
process.exit(ok ? 0 : 1);
