import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Réinsère dans le recensement de 1871 une personne que le dépouillement a
   sautée, puis renumérote sa page.

     node insere71.mjs insertions.json [--essai]

   Le fichier décrit chaque insertion :

     { "division": 1,
       "insertions": [
         { "page": 49,
           "apres": { "page": 48, "ligne": 20 },
           "personne": { "nom": "Lecours", "prenom": "Catherine", "sexe": "F",
                         "age": "80", "etat_matrimonial": "V", … } } ] }

   `apres` désigne la personne que la nouvelle suit **dans le registre** : c'est
   elle qui fixe la maison et la famille. Une page sautée ne se répare pas au
   numéro de ligne — une ligne de trop décale tout ce qui suit, et c'est ainsi
   qu'on écrit à côté. On insère donc à la bonne place dans l'ordre des visites,
   puis on renumérote la page **d'un seul tenant**, de 1 à 20.

   Quand l'insertion fait déborder la page, la renumérotation doit porter sur
   plusieurs pages à la suite. On le dit par `renumeroter` :

     "renumeroter": [{ "de": 60, "a": 61 }]

   Les personnes de la plage sont alors reprises dans l'ordre du registre et
   redistribuées vingt par page — ce qui ramène sur la page suivante la ligne
   que le dépouillement avait gardée sur la précédente. Sans `renumeroter`,
   chaque page touchée est renumérotée seule.

   Contrôles avant écriture : chaque plage doit compter vingt lignes par page
   une fois les personnes ajoutées, aucun identifiant ne doit se retrouver en
   double, et l'ancre doit exister. Sinon on s'arrête sans rien écrire.

   Les identifiants changent : passer ensuite `node outils/analyse-filiation.mjs`.
*/
const FICHIER = process.argv[2];
const ESSAI = process.argv.includes('--essai');
if (!FICHIER) { console.error('usage : node insere71.mjs insertions.json [--essai]'); process.exit(1); }
const plan = JSON.parse(fs.readFileSync(FICHIER, 'utf8'));

const FILE = `${RACINE}/data/recensement-1871-d${plan.division}-data.js`;
const raw = fs.readFileSync(FILE, 'utf8');
const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
const D = JSON.parse(raw.slice(a, b + 1));

const avant = compte();
const pages = new Set();

for (const ins of plan.insertions) {
  const page = String(ins.page);
  pages.add(page);
  let pose = null;
  for (const m of D.maisons) for (const f of m.familles || []) {
    const i = (f.membres || []).findIndex(
      (p) => String(p.page_ms) === String(ins.apres.page) && String(p.ligne) === String(ins.apres.ligne));
    if (i !== -1) pose = { f, i };
  }
  if (!pose) throw new Error(`ancre absente : p${ins.apres.page}:${ins.apres.ligne}`);

  const p = {
    ...ins.personne,
    page_ms: page,
    ligne: String(ins.ligne || 0),   // provisoire : la renumérotation tranche
    annee: '1871',
    division: String(plan.division),
    id: `1871-D${plan.division}-P${page.padStart(3, '0')}-L00`,
  };
  pose.f.membres.splice(pose.i + 1, 0, p);
  console.log(`  inséré  p${page}  ${p.prenom} ${p.nom} (${p.age})  après p${ins.apres.page}:${ins.apres.ligne}` +
              `, famille ${pose.f.no_famille}`);
}

// Les plages à renuméroter : celles du plan, plus les pages touchées qui n'y
// figurent pas encore (chacune seule).
const plages = (plan.renumeroter || []).map((r) => [Number(r.de), Number(r.a)]);
for (const page of pages)
  if (!plages.some(([a, b]) => Number(page) >= a && Number(page) <= b))
    plages.push([Number(page), Number(page)]);
plages.sort((x, y) => x[0] - y[0]);

// Renumérotation d'un seul tenant, dans l'ordre du registre.
for (const [de, a] of plages) {
  const suite = [];
  for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || []) {
    const n = Number(p.page_ms);
    if (n >= de && n <= a) suite.push(p);
  }
  const attendu = 20 * (a - de + 1);
  if (suite.length !== attendu)
    throw new Error(`pages ${de} à ${a} : ${suite.length} lignes après insertion, ${attendu} attendues`);
  const bouge = [];
  suite.forEach((p, i) => {
    const page = String(de + Math.floor(i / 20));
    const ligne = String((i % 20) + 1);
    const neuf = `1871-D${plan.division}-P${page.padStart(3, '0')}-L${ligne.padStart(2, '0')}`;
    if (p.id !== neuf) bouge.push(`${p.id} → p${page}:L${ligne.padStart(2, '0')}   ${p.prenom} ${p.nom}`);
    p.page_ms = page;
    p.ligne = ligne;
    p.id = neuf;
  });
  console.log(`\npages ${de} à ${a} : ${bouge.length} identifiant(s) renumérotés`);
  for (const l of bouge.slice(0, 8)) console.log('  ' + l);
  if (bouge.length > 8) console.log(`  … et ${bouge.length - 8} autres`);
}

const tous = [];
for (const m of D.maisons) for (const f of m.familles || []) for (const p of f.membres || []) tous.push(p.id);
if (new Set(tous).size !== tous.length) throw new Error('identifiants en double après renumérotation');
console.log(`\ntotal de la division : ${tous.length} personnes (${avant} avant)`);

if (ESSAI) { console.log('\nessai à blanc — rien écrit'); process.exit(0); }
fs.writeFileSync(FILE, raw.slice(0, a) + JSON.stringify(D) + raw.slice(b + 1));
console.log('\nécrit. Rejouer ensuite : node outils/analyse-filiation.mjs');

function compte() {
  let n = 0;
  for (const m of D.maisons) for (const f of m.familles || []) n += (f.membres || []).length;
  return n;
}
