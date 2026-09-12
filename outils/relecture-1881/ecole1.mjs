import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Verse un lot de la passe de la colonne 16 — « allant à l'école » — de 1881
   division 1.

   POURQUOI CETTE PASSE. Le complément portait déjà, par écrit, la mise en garde
   qu'il fallait :

     « En colonne 15, le recenseur accole au "M." ou au "V°" une petite marque de
       pointage qui déborde sur la colonne 16. […] Le relevé est donc prudent :
       il peut manquer des écoliers, il n'en invente pas. »

   **Le contrôle de cohérence a montré que la prudence n'a pas tenu.** À la
   page 48, la seule école relevée est la ligne 5 — Martel Jean Baptiste, 48 ans,
   pharmacien, qui porte un « M. » en colonne 15 : c'est exactement la marque que
   la note dit avoir écartée. Et les six vraies écoles de la page, sur des
   enfants de 6 à 12 ans, manquent toutes.

   CE QUI DISTINGUE LES DEUX MARQUES, et qui se voit d'un coup d'œil sur la vue
   `--vue=ecole` de `prof1.py`, qui porte la colonne 15 à côté de la 16 :

     école    un « 1 » franc, haut, **centré** sous le 16
     pointage un petit signe bas et penché, **collé au bord gauche**, et qui
              suit toujours un « M. » ou un « Ve. » de la colonne 15

   LE LOT. `ecole` porte **la liste complète** des lignes de la page qui portent
   une marque d'école — pas les ajouts, la liste entière. L'outil dit ce qu'il
   ajoute et ce qu'il retire, et écrit dans `data/complement-1881-d1-data.js`,
   **là où la colonne 16 vit**.

     node ecole1.mjs lots81/ecole-001-012.json [--essai]
*/
const ESSAI = process.argv.includes('--essai');
const LOTS = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!LOTS.length) { console.error('usage : node ecole1.mjs lots81/ecole-001-012.json [--essai]'); process.exit(1); }

const FICHIER = RACINE + '/data/complement-1881-d1-data.js';
let texte = fs.readFileSync(FICHIER, 'utf8');
const debutPages = texte.indexOf('  pages: {');
if (debutPages < 0) throw new Error('« pages: { » introuvable dans le complément');

/** Les bornes du bloc d'une page dans le texte du complément. */
function blocDe(page) {
  const ouvre = new RegExp(`^    ${page}: \\{`, 'm');
  const m = ouvre.exec(texte.slice(debutPages));
  if (!m) throw new Error(`page ${page} absente du complément`);
  const debut = debutPages + m.index;
  const suite = /^    \d+: \{|^  \},/m.exec(texte.slice(debut + m[0].length));
  const fin = suite ? debut + m[0].length + suite.index : texte.length;
  return [debut, fin];
}

let pagesLues = 0, ajouts = 0, retraits = 0;
for (const chemin of LOTS) {
  const lot = JSON.parse(fs.readFileSync(chemin, 'utf8'));
  for (const [page, o] of Object.entries(lot.pages)) {
    const veut = [...new Set((o.ecole || []).map(Number))].sort((a, b) => a - b);
    const [debut, fin] = blocDe(page);
    const bloc = texte.slice(debut, fin);
    const trouve = /ecole:\s*\[([^\]]*)\]/.exec(bloc);
    const avait = trouve
      ? trouve[1].split(',').map((x) => x.trim()).filter(Boolean)
          .map(Number).filter((n) => Number.isFinite(n)).sort((a, b) => a - b)
      : [];
    pagesLues++;

    const plus = veut.filter((l) => !avait.includes(l));
    const moins = avait.filter((l) => !veut.includes(l));
    ajouts += plus.length; retraits += moins.length;
    if (!plus.length && !moins.length) continue;
    console.log(`p${String(page).padStart(2)} : ${avait.length} → ${veut.length}` +
      (plus.length ? `   + ${plus.join(', ')}` : '') +
      (moins.length ? `   − ${moins.join(', ')}` : '') +
      (o.note ? `\n        ${o.note}` : ''));

    const neuf = `ecole: [${veut.join(', ')}]`;
    let blocNeuf;
    if (trouve) blocNeuf = bloc.replace(/ecole:\s*\[[^\]]*\]/, neuf);
    else {
      // Une page qui n'en portait pas encore : on glisse la clé après `lignes:`.
      const apres = /lignes:\s*\d+,/.exec(bloc);
      if (!apres) throw new Error(`page ${page} : ni « ecole » ni « lignes » où l'accrocher`);
      blocNeuf = bloc.slice(0, apres.index + apres[0].length) + ' ' + neuf + ',' +
        bloc.slice(apres.index + apres[0].length);
    }
    texte = texte.slice(0, debut) + blocNeuf + texte.slice(fin);
  }
}

console.log(`\n${pagesLues} page(s) lue(s) — ${ajouts} écolier(s) ajouté(s), ${retraits} retiré(s).`);
if (ESSAI) { console.log('--essai : rien n\'a été écrit.'); process.exit(0); }
if (!ajouts && !retraits) process.exit(0);
fs.writeFileSync(FICHIER, texte);
console.log(`écrit dans ${path.relative(RACINE, FICHIER)}`);
