import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Contrôle de cohérence du recensement de 1871, sur les pages relues.

   POURQUOI. Les colonnes à marques — 15 état matrimonial, 17 école, 18 et 19
   instruction — se lisent comme des chaînes de vingt caractères, une par page.
   C'est la bonne forme : elle force à se prononcer sur les vingt lignes. Mais
   elle a un défaut, et il est sournois : **une chaîne décalée d'un rang reste
   une chaîne valide.** Rien, dans le fichier, ne dit qu'elle est fausse.

   Ce contrôle cherche ce que le décalage produit : un enfant de cinq ans porté
   marié, un chef de ménage dont la femme seule est dite mariée, un nourrisson
   qui ne sait pas lire. Il a débusqué neuf chaînes de colonne 15 décalées d'un
   rang, toutes en bas de page — le déphasage des prises de vue s'y accumule.

   Il regarde aussi ce que la relecture ne voit pas d'elle-même : les âges
   absents, les valeurs restées entre crochets, les frontières de famille que le
   dépouillement a ouvertes une ligne trop tôt.

     node controle71.mjs              # les pages relues
     node controle71.mjs --tout       # tout le recensement

   Chaque signalement demande le manuscrit. Beaucoup sont légitimes : au Québec
   la veuve qui mène le ménage est inscrite sous son nom de fille et ses enfants
   sous celui du père ; un fils de vingt-deux ans marié vit chez ses parents ;
   la colonne 19 se coche parfois sans la 18. L'outil montre, il ne tranche pas.
*/
const TOUT = process.argv.includes('--tout');
// Ce que les six recueils PDF portent. Au-delà, le dépouillement n'a pas été
// confronté au manuscrit : le signaler serait du bruit.
const RELU = { 1: [1, 78], 2: [1, 35] };

const nombre = (a) => {
  const s = String(a ?? '').trim();
  if (!s) return null;
  if (/^\d+\s*\/\s*12$/.test(s)) return Number(s.split('/')[0]) / 12;
  if (/^\d+\s*mois$/.test(s)) return Number(s.split(' ')[0]) / 12;
  const n = Number(s.replace(/[^\d.]/g, ''));
  return /\d/.test(s) && Number.isFinite(n) ? n : null;
};

const gens = [], fams = [];
for (const div of [1, 2]) {
  const brut = fs.readFileSync(`${RACINE}/data/recensement-1871-d${div}-data.js`, 'utf8');
  const D = JSON.parse(brut.slice(brut.indexOf('{'), brut.lastIndexOf('}') + 1));
  for (const m of D.maisons) for (const f of m.familles || []) {
    fams.push({ div, m, f });
    f.membres.forEach((p, rang) => gens.push({ ...p, div, rang, f, m }));
  }
}
const relu = (p) => TOUT || (Number(p.page_ms) >= RELU[p.div][0] && Number(p.page_ms) <= RELU[p.div][1]);
const dit = (p, sup) => `D${p.div} p${String(p.page_ms).padStart(2)} L${String(p.ligne).padStart(2)} ` +
  `${(p.nom + ' ' + p.prenom).padEnd(24)} ${(p.sexe || ' ')} ${String(p.age ?? '').padStart(6)} ` +
  `[${p.etat_matrimonial || '·'}]${sup ? '  ' + sup : ''}`;

let total = 0;
const bloc = (titre, lignes) => {
  if (!lignes.length) return;
  total += lignes.length;
  console.log(`\n### ${titre} — ${lignes.length}`);
  for (const l of lignes.slice(0, 40)) console.log('   ' + l);
  if (lignes.length > 40) console.log(`   … et ${lignes.length - 40} autres`);
};
const sur = (test, sup) => gens.filter((p) => relu(p) && test(p)).map((p) => dit(p, sup && sup(p)));

// — Ce qu'un décalage de chaîne produit ————————————————————————————————
bloc('mineur porté incapable de lire — la colonne 18 ne vise que les vingt ans et plus',
  sur((p) => p.sait_lire === false && nombre(p.age) !== null && nombre(p.age) < 20));
bloc("mineur porté incapable d'écrire — la colonne 19, de même",
  sur((p) => p.sait_ecrire === false && nombre(p.age) !== null && nombre(p.age) < 20));
bloc('marié ou veuf avant seize ans',
  sur((p) => ['M', 'V'].includes(p.etat_matrimonial) && nombre(p.age) !== null && nombre(p.age) < 16));
bloc("à l'école au-dessus de vingt ans",
  sur((p) => p.ecole === true && nombre(p.age) >= 20));
bloc("à l'école au-dessous de quatre ans",
  sur((p) => p.ecole === true && nombre(p.age) !== null && nombre(p.age) < 4));
// La 19 se coche parfois sans la 18 — on lisait sans savoir écrire, c'est
// courant. L'inverse ne se rencontre pas : c'est le signal, non le contraire.
bloc("ne sait pas lire mais sait écrire — l'inverse arrive, celui-ci non",
  sur((p) => p.sait_lire === false && p.sait_ecrire === true));

// Le couple de tête : l'un porté marié, l'autre non. C'est le signal le plus
// sûr d'une chaîne de colonne 15 décalée — le chef perd son « M », la ligne
// suivante en gagne un.
const dissymetrie = [];
for (const { div, f } of fams) {
  const [c, conj] = f.membres;
  if (!conj || !c.sexe || !conj.sexe || c.sexe === conj.sexe) continue;
  if (!(nombre(c.age) >= 16) || !(nombre(conj.age) >= 16)) continue;
  if ((c.etat_matrimonial === 'M') === (conj.etat_matrimonial === 'M')) continue;
  const a = { ...c, div }, b = { ...conj, div };
  if (relu(a)) dissymetrie.push(`${dit(a)}  |  ${dit(b)}`);
}
bloc('couple de tête : un seul des deux porté marié', dissymetrie);

bloc('enfant présumé porté marié ou veuf', gens.filter((p) => relu(p) && p.rang >= 2 &&
  ['M', 'V'].includes(p.etat_matrimonial) &&
  nombre(p.f.membres[0].age) !== null && nombre(p.age) !== null &&
  nombre(p.f.membres[0].age) - nombre(p.age) >= 15)
  .map((p) => dit(p, `chef ${p.f.membres[0].prenom} ${p.f.membres[0].age} ans`)));

// — Ce que la relecture n'a pas comblé —————————————————————————————————
bloc('âge absent', sur((p) => nombre(p.age) === null));
bloc('mois de naissance porté alors que l\'âge dépasse un an — la colonne 10 ne vise que les nourrissons',
  sur((p) => p.ne_douze_mois && nombre(p.age) >= 1));
// Le recensement est arrêté au **2 avril 1871**. Un nourrisson de m douzièmes
// est donc né m mois plus tôt, et la colonne 10 doit nommer ce mois-là. Les deux
// cases se contrôlent l'une l'autre, gratuitement : c'est le seul endroit du
// formulaire où le recenseur écrit deux fois la même chose. Un écart de plus
// d'un mois est une lecture à reprendre — la fraction, le mois, ou les deux.
const MOIS = { janvier: 1, février: 2, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6,
  juillet: 7, août: 8, aout: 8, septembre: 9, octobre: 10, novembre: 11, décembre: 12, decembre: 12 };
const attendu = (m) => ((4 - m - 1 + 12) % 12) + 1;   // m douzièmes avant avril
bloc('fraction et mois de naissance qui ne s\'accordent pas', gens.filter((p) => {
  if (!relu(p) || !p.ne_douze_mois) return false;
  const m = nombre(p.age);
  if (m === null || m <= 0 || m >= 1) return false;
  const douziemes = Math.round(m * 12);
  const dit = MOIS[String(p.ne_douze_mois).trim().toLowerCase()];
  if (!dit) return false;
  const cible = attendu(douziemes);
  const ecart = Math.min(Math.abs(dit - cible), 12 - Math.abs(dit - cible));
  return ecart > 1;
}).map((p) => dit(p, `${Math.round(nombre(p.age) * 12)}/12 appelle ${
  Object.keys(MOIS).find((k) => MOIS[k] === attendu(Math.round(nombre(p.age) * 12)))}, la colonne 10 porte « ${p.ne_douze_mois} »`)));

bloc("âge en fraction de douze sans mois de naissance",
  sur((p) => !p.ne_douze_mois && nombre(p.age) !== null && nombre(p.age) > 0 && nombre(p.age) < 1));
bloc('marié dans les douze mois sans état matrimonial',
  sur((p) => p.marie_12_mois === true && !['M', 'V'].includes(p.etat_matrimonial)));
bloc('état matrimonial hors formulaire — autre que M, V ou rien',
  sur((p) => p.etat_matrimonial && !['M', 'V'].includes(p.etat_matrimonial)));
// `age_original_csv` garde la trace de ce que portait le fichier d'origine :
// le crochet y est à sa place et n'est pas un doute qui resterait à lever.
bloc('valeur encore entre crochets',
  gens.filter((p) => relu(p)).flatMap((p) => Object.entries(p)
    .filter(([k, v]) => typeof v === 'string' && /\[\s*\?\s*\]/.test(v) &&
      !['remarque', 'age_original_csv'].includes(k))
    .map(([k, v]) => dit(p, `${k} = « ${v} »`))));

// — Les frontières de famille ——————————————————————————————————————————
// Le formulaire n'écrit les numéros des colonnes 5 et 6 qu'à la première ligne
// du ménage. Ouvrir une famille une ligne trop tôt décroche du ménage précédent
// ce qui lui restait — une servante, des enfants, un pensionnaire.
const frontieres = [];
for (const { div, m, f } of fams) {
  const mem = f.membres;
  if (mem.length < 3 || !relu({ ...mem[0], div })) continue;
  const compte = {};
  for (const p of mem) compte[p.nom] = (compte[p.nom] || 0) + 1;
  const dominant = Object.entries(compte).sort((a, b) => b[1] - a[1])[0][0];
  const tete = mem.findIndex((p) => p.nom === dominant);
  if (tete <= 0 || !(nombre(mem[tete].age) >= 18)) continue;
  frontieres.push(`D${div} famille ${f.no_famille} (maison ${m.no_maison}) : ` +
    `${tete} en tête avant le premier ${dominant} — ` +
    mem.slice(0, tete).map((p) => `${p.nom} ${p.prenom} ${p.age}${p.profession ? ' ' + p.profession : ''}`).join(', ') +
    ` | puis ${mem[tete].nom} ${mem[tete].prenom} ${mem[tete].age}`);
}
bloc('famille dont la tête ne porte pas le patronyme dominant — veuve sous son nom de fille, ou frontière mal placée', frontieres);

console.log(`\n${gens.filter(relu).length} personne(s) examinée(s) — ${total} signalement(s).`);
