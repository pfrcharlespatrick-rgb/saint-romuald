import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Répare le décalage des pages 28 à 31 de 1871 division 1.

   CE QUI S'EST PASSÉ. Le dépouillement porte, à la page 28 lignes 1 à 5, cinq
   enfants Paradis rattachés à la famille 104 — celle de Léon Paradis, 28 ans, et
   d'Emélie, 23 ans. Ce sont les mêmes cinq personnes, aux mêmes âges, que les
   enfants de Paradis François et Marie à la page 34 : Molina 20, Louis 17,
   Cyprienne 15, Marie 12 et Catherine 26. Un couple de 28 et 23 ans n'a pas de
   fille de 26 ans ; et le manuscrit, à la page 28, ne porte rien de tel — il
   ouvre sur Montigny François, 85 ans.

   CE QUE ÇA A FAIT. Ces cinq lignes de trop ont poussé de cinq rangs tout ce qui
   suit, sur quatre pages. Arrivé à la page 31, le dépouillement s'est
   resynchronisé en réutilisant les numéros 16 à 20, déjà pris : d'où les cinq
   identifiants en « -2 » et la remarque « lignes 16-20 en conflit avec la maison
   80 ». **C'était le seul conflit de position des cinq recensements du site.**

   LA RÉPARATION. On retire les cinq doublons, puis on renumérote d'un seul tenant
   les pages 28 à 31 dans l'ordre du registre. Le compte retombe juste au
   caractère près : chacune des quatre pages reprend exactement vingt lignes, et
   chaque ligne retrouve la personne que le manuscrit y porte — vérifié aux
   quatre charnières (Montigny François en tête de la 28, Lépine Philomène en
   tête de la 29, Clavette Luce en 29 ligne 16, Leclerc Philippe en tête de la
   31, Gosselin Bénoni en 31 ligne 16).

     node repar71.mjs [--essai]

   Les identifiants changent : passer ensuite `node outils/analyse-filiation.mjs`
   pour que les liens et les événements suivent.
*/
const ESSAI = process.argv.includes('--essai');
const FILE = RACINE + '/data/recensement-1871-d1-data.js';
const raw = fs.readFileSync(FILE, 'utf8');
const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
const D = JSON.parse(raw.slice(a, b + 1));

// Les cinq doublons, reconnus au nom, au prénom et à l'âge — jamais au seul
// numéro de ligne : une réparation qui se trompe de cible est pire que le mal.
const DOUBLONS = [
  { ligne: '1', nom: 'Paradis', prenom: 'Molina', age: '20' },
  { ligne: '2', nom: 'Paradis', prenom: 'Louis', age: '17' },
  { ligne: '3', nom: 'Paradis', prenom: 'Cyprienne', age: '15' },
  { ligne: '4', nom: 'Paradis', prenom: 'Marie', age: '12' },
  { ligne: '5', nom: 'Paradis', prenom: 'Catherine', age: '26' },
];

let retires = 0;
for (const m of D.maisons) for (const f of m.familles || []) {
  const avant = (f.membres || []).length;
  f.membres = (f.membres || []).filter((p) => {
    const d = DOUBLONS.find((x) => String(p.page_ms) === '28' && String(p.ligne) === x.ligne);
    if (!d) return true;
    if (p.nom !== d.nom || p.prenom !== d.prenom || p.age !== d.age)
      throw new Error(`p28:${d.ligne} n'est pas ${d.prenom} ${d.nom} (${d.age}) mais ${p.prenom} ${p.nom} (${p.age}) — réparation interrompue`);
    console.log(`  retiré  p28:${d.ligne}  ${p.prenom} ${p.nom} (${p.age})  — doublon des enfants de la page 34`);
    retires++;
    return false;
  });
  if (avant !== f.membres.length && !f.membres.length)
    throw new Error('une famille se retrouverait vide — réparation interrompue');
}
if (retires !== 5) throw new Error(`${retires} doublon(s) retiré(s), 5 attendus`);

// Renumérotation d'un seul tenant, dans l'ordre du registre.
const suite = [];
for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || [])
  if (['28', '29', '30', '31'].includes(String(p.page_ms))) suite.push(p);
if (suite.length !== 80)
  throw new Error(`${suite.length} lignes sur les pages 28 à 31, 80 attendues (4 × 20)`);

const mapping = [];
suite.forEach((p, i) => {
  const page = 28 + Math.floor(i / 20);
  const ligne = (i % 20) + 1;
  const neuf = `1871-D1-P${String(page).padStart(3, '0')}-L${String(ligne).padStart(2, '0')}`;
  if (p.id !== neuf) mapping.push([p.id, neuf, `${p.prenom} ${p.nom}`]);
  p.page_ms = String(page);
  p.ligne = String(ligne);
  p.id = neuf;
  // Le conflit de position n'existe plus : la remarque qui le signalait non plus.
  if (p.remarque) {
    p.remarque = p.remarque
      .replace(/Page \d+, lignes? [\d-]+ en conflit avec la maison \d+[^.]*\.?\s*/g, '')
      .trim();
    if (!p.remarque) delete p.remarque;
  }
});

console.log(`\n${mapping.length} identifiant(s) renumérotés :`);
for (const [avant, apres, qui] of mapping.slice(0, 12)) console.log(`  ${avant} → ${apres}   ${qui}`);
if (mapping.length > 12) console.log(`  … et ${mapping.length - 12} autres`);

// Contrôle : chaque page porte bien vingt lignes, sans trou ni doublon.
for (const page of ['28', '29', '30', '31']) {
  const l = suite.filter((p) => p.page_ms === page).map((p) => Number(p.ligne)).sort((x, y) => x - y);
  const attendu = Array.from({ length: 20 }, (_, i) => i + 1);
  if (JSON.stringify(l) !== JSON.stringify(attendu))
    throw new Error(`page ${page} : lignes ${l.join(',')}`);
}
const tous = [];
for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || []) tous.push(p.id);
if (new Set(tous).size !== tous.length) throw new Error('identifiants en double après renumérotation');
console.log(`\npages 28 à 31 : vingt lignes chacune, aucun identifiant en double`);
console.log(`total de la division : ${tous.length} personnes (${tous.length + retires} avant)`);

if (ESSAI) { console.log('\nessai à blanc — rien écrit'); process.exit(0); }
fs.writeFileSync(FILE, raw.slice(0, a) + JSON.stringify(D) + raw.slice(b + 1));
console.log('\nécrit. Rejouer ensuite : node outils/analyse-filiation.mjs');
