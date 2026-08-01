// Division 1 : la colonne 8 du manuscrit est fiable. Toute contradiction entre
// le prénom et le sexe enregistré désigne donc le PRÉNOM comme suspect.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sexeAttendu } from './prenoms.mjs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const raw = fs.readFileSync(RACINE + '/data/recensement-1881-d1-data.js', 'utf8');
const D = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));

const PROF_F = /servante|couturi|institutrice|renti[èe]re|m[ée]nag|cuisini[èe]re/i;
const PROF_M = /journalier|cultivateur|navigateur|menuisier|forgeron|commis|laboureur|fermier|meunier|charretier|notaire|ouvrier|boulanger|matelot|charpentier|tailleur|cordonnier|batelier|pilote|charron|mécanicien|colleur|butcher|forman|arrimeur|voyageur/i;

const conflits = [];
for (const m of D.maisons) for (const f of m.familles) for (const p of f.membres) {
  const att = sexeAttendu(p.prenom);
  if (att && p.sexe && att !== p.sexe) {
    const prof = p.profession || '';
    conflits.push({ p, prof, appui: PROF_M.test(prof) ? 'M' : PROF_F.test(prof) ? 'F' : null, att });
  }
}
conflits.sort((a, b) => +a.p.page_ms - +b.p.page_ms || +a.p.ligne - +b.p.ligne);
console.log(`${conflits.length} contradictions prénom / sexe\n`);
for (const c of conflits) {
  const note = c.appui === c.p.sexe ? '  <- profession confirme le sexe : le PRÉNOM est fautif'
             : c.appui ? '  <- profession contredit le sexe : à examiner' : '';
  console.log(`p${String(c.p.page_ms).padStart(2)} L${String(c.p.ligne).padStart(2)}  ${(c.p.nom+' '+c.p.prenom).padEnd(30)} sexe=${c.p.sexe}  prénom->${c.att}  ${c.prof.padEnd(12)}${note}`);
}
