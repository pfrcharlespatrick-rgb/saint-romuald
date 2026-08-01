import path from 'path';
import { fileURLToPath } from 'url';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
import fs from 'fs';
export const FILE = RACINE + '/data/recensement-1881-d2-data.js';
export function load() {
  const raw = fs.readFileSync(FILE, 'utf8');
  const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
  return { D: JSON.parse(raw.slice(a, b + 1)), prefix: raw.slice(0, a), suffix: raw.slice(b + 1) };
}
export function save(D, prefix, suffix) {
  fs.writeFileSync(FILE, prefix + JSON.stringify(D) + suffix);
}
export function persons(D) {
  const out = [];
  for (const m of D.maisons)
    for (const f of (m.familles || []))
      for (const p of (f.membres || []))
        out.push({ maison: m, famille: f, p });
  return out;
}
