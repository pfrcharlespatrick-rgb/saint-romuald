// Reconstituer, maison par maison, la division de 1891 — voir docs/DIVISIONS-1891.md.
//
// Le formulaire de 1891 n'a pas de case « division » : l'en-tête porte
// « District 163 Lévis, S. District L, St Romuald », un seul recenseur (Olivier
// Lambert) et une seule suite de pages, 1 à 142. La coupure en deux divisions
// n'existe qu'en 1871 et 1881. Ce script la projette sur 1891 en suivant le
// parcours du recenseur : chaque maison de 1891 reçoit la division de 1881 vers
// laquelle pointent les liens de filiation de ses habitants, et les maisons sans
// lien prennent celle du bloc de parcours où elles se trouvent.
//
//   node outils/relecture-1881/divisions91.mjs --essai    # montre sans écrire
//   node outils/relecture-1881/divisions91.mjs --table    # la table maison par maison
//   node outils/relecture-1881/divisions91.mjs            # écrit division_reconstituee
//
// Les blocs ci-dessous sont une décision, prise sur la table (--table) et
// consignée dans le journal : le script vérifie que les liens la soutiennent
// (majorité nette dans chaque bloc) et refuse d'écrire sinon.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const FICHIER = RACINE + '/data/recensement-1891-d1-data.js';
const FILIATION = RACINE + '/data/filiation-data.js';

// Blocs du parcours de 1891 : [première maison, dernière maison, division].
// Les bornes sont fixées à la première maison dont les liens changent de bord ;
// là où plusieurs maisons de suite n'ont aucun lien (415-418, 445-447), la borne
// est posée au plus près du bloc que le voisinage lié désigne, et l'appui le dit.
export const BLOCS = [
  [1, 307, '1'],     // pages 1 à 69
  [308, 325, '2'],   // pages 69 à 74 — début du parcours de 1881 D2 (pages 2 à 11)
  [326, 400, '1'],   // pages 74 à 90
  [401, 414, '2'],   // pages 91 à 93
  [415, 444, '1'],   // pages 93 à 100
  [445, 611, '2'],   // pages 100 à 137 — le gros de 1881 D2 (pages 15 à 58)
  [612, 642, '1'],   // pages 137 à 142
];

function charger(f) {
  const raw = fs.readFileSync(f, 'utf8');
  const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
  return { D: JSON.parse(raw.slice(a, b + 1)), prefix: raw.slice(0, a), suffix: raw.slice(b + 1) };
}

export function calculer() {
  const { D, prefix, suffix } = charger(FICHIER);
  const F = charger(FILIATION).D;
  const liens = F.liens.filter((l) => l.confiance !== 'faible');

  // Division de 1871 des personnes de 1881, par les liens 1871 → 1881 : elle
  // remonte ensuite jusqu'en 1891 par le lien 1881 → 1891 (la chaîne).
  const div71de81 = new Map();
  for (const l of liens) {
    if (l.de.startsWith('1871') && l.vers.startsWith('1881')) div71de81.set(l.vers, l.de.match(/-D(\d)-/)[1]);
  }

  const maisonDe = new Map();
  const maisons = [];
  for (const m of D.maisons) {
    if (!/^\d+$/.test(String(m.no_maison))) throw new Error(`numéro de maison non numérique : ${m.no_maison}`);
    const rec = { m, no: Number(m.no_maison), pages: new Set(), n: 0, d81: { 1: 0, 2: 0 }, d71: { 1: 0, 2: 0 }, chef: '' };
    for (const f of m.familles || []) {
      if (!rec.chef && f.chef) rec.chef = f.chef;
      for (const p of f.membres || []) {
        rec.n++;
        maisonDe.set(p.id, rec);
        const pg = p.page_ms || (p.id.match(/-P(\d+)-/) || [])[1];
        if (pg) rec.pages.add(Number(pg));
      }
    }
    maisons.push(rec);
  }
  for (const l of liens) {
    if (!l.vers.startsWith('1891')) continue;
    const rec = maisonDe.get(l.vers);
    if (!rec) continue;
    const [, annee, div] = l.de.match(/^(\d{4})-D(\d)-/);
    if (annee === '1881') {
      rec.d81[div]++;
      const d71 = div71de81.get(l.de);
      if (d71) rec.d71[d71]++;
    } else if (annee === '1871') {
      rec.d71[div]++;
    }
  }

  const blocDe = (no) => BLOCS.find(([a, b]) => no >= a && no <= b);
  for (const rec of maisons) {
    const bloc = blocDe(rec.no);
    if (!bloc) throw new Error(`maison ${rec.no} hors de tout bloc`);
    rec.division = bloc[2];
    const autre = bloc[2] === '1' ? '2' : '1';
    const pour = rec.d81[bloc[2]], contre = rec.d81[autre];
    const s71 = (rec.d71[1] || rec.d71[2]) ? ` ; 1871 : ${rec.d71[1]} D1, ${rec.d71[2]} D2` : '';
    if (pour > contre) {
      rec.appui = `${pour} lien${pour > 1 ? 's' : ''} vers 1881 D${bloc[2]}` + (contre ? ` (${contre} vers D${autre})` : '') + s71;
      rec.sorte = 'liens';
    } else if (!pour && !contre) {
      rec.appui = 'par continuité du parcours du recenseur (aucun lien vers 1881)' + s71;
      rec.sorte = 'continuite';
    } else if (pour === contre) {
      rec.appui = `par continuité du parcours ; liens partagés (${pour} vers D1, ${contre} vers D2)`.replace(`${pour} vers D1, ${contre} vers D2`, `${rec.d81[1]} vers D1, ${rec.d81[2]} vers D2`) + s71;
      rec.sorte = 'partage';
    } else {
      rec.appui = `par continuité du parcours ; ses ${contre} lien${contre > 1 ? 's' : ''} vers 1881 pointent vers D${autre} — ménage venu de l'autre division` + s71;
      rec.sorte = 'contre-courant';
    }
  }

  // Contrôle : dans chaque bloc, les maisons liées doivent désigner nettement
  // la division retenue.
  const bilan = BLOCS.map(([a, b, div]) => {
    const dans = maisons.filter((r) => r.no >= a && r.no <= b);
    const pages = dans.flatMap((r) => [...r.pages]);
    const c = { maisons: `${a}-${b}`, pages: `${Math.min(...pages)}-${Math.max(...pages)}`, division: div,
      nb_maisons: dans.length, personnes: dans.reduce((s, r) => s + r.n, 0),
      maisons_liees_pour: dans.filter((r) => r.sorte === 'liens').length,
      maisons_contre_courant: dans.filter((r) => r.sorte === 'contre-courant').length,
      maisons_partagees: dans.filter((r) => r.sorte === 'partage').length,
      maisons_sans_lien: dans.filter((r) => r.sorte === 'continuite').length,
      liens_1881: { D1: dans.reduce((s, r) => s + r.d81[1], 0), D2: dans.reduce((s, r) => s + r.d81[2], 0) },
      liens_1871: { D1: dans.reduce((s, r) => s + r.d71[1], 0), D2: dans.reduce((s, r) => s + r.d71[2], 0) } };
    return c;
  });
  for (const c of bilan) {
    const pour = c.liens_1881['D' + c.division], contre = c.liens_1881[c.division === '1' ? 'D2' : 'D1'];
    if (pour < 3 * contre) throw new Error(`bloc ${c.maisons} : les liens de 1881 ne soutiennent pas D${c.division} (${pour} pour, ${contre} contre)`);
    if (c.maisons_liees_pour < 2 * c.maisons_contre_courant) throw new Error(`bloc ${c.maisons} : trop de maisons à contre-courant`);
  }
  return { D, prefix, suffix, maisons, bilan };
}

const essai = process.argv.includes('--essai');
const table = process.argv.includes('--table');

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const { D, prefix, suffix, maisons, bilan } = calculer();

  if (table) {
    console.log('maison  pages     pers | 1881 D1 D2 | 1871 D1 D2 | div  appui — chef');
    for (const r of maisons) {
      const pg = [...r.pages].sort((x, y) => x - y);
      console.log(String(r.no).padStart(5) + '  ' + (pg.length > 1 && pg[0] !== pg[pg.length - 1] ? `${pg[0]}-${pg[pg.length - 1]}` : String(pg[0])).padEnd(8)
        + String(r.n).padStart(5) + ' | ' + String(r.d81[1]).padStart(7) + String(r.d81[2]).padStart(3)
        + ' | ' + String(r.d71[1]).padStart(7) + String(r.d71[2]).padStart(3)
        + ' |  ' + r.division + '   ' + r.sorte.padEnd(14) + ' ' + r.chef);
    }
  }
  console.log('\nBlocs du parcours :');
  for (const c of bilan) {
    console.log(`  maisons ${c.maisons.padEnd(8)} pages ${c.pages.padEnd(8)} → D${c.division}  ${String(c.nb_maisons).padStart(3)} maisons, ${String(c.personnes).padStart(4)} pers.`
      + ` | liens 1881 : D1 ${String(c.liens_1881.D1).padStart(3)}, D2 ${String(c.liens_1881.D2).padStart(3)}`
      + ` | 1871 : D1 ${String(c.liens_1871.D1).padStart(3)}, D2 ${String(c.liens_1871.D2).padStart(3)}`
      + ` | maisons : ${c.maisons_liees_pour} liées pour, ${c.maisons_contre_courant} à contre-courant, ${c.maisons_partagees} partagées, ${c.maisons_sans_lien} sans lien`);
  }
  const totaux = { 1: { maisons: 0, personnes: 0 }, 2: { maisons: 0, personnes: 0 } };
  for (const r of maisons) { totaux[r.division].maisons++; totaux[r.division].personnes += r.n; }
  console.log(`\nTerritoire de la division 1 : ${totaux[1].maisons} maisons, ${totaux[1].personnes} personnes ; division 2 : ${totaux[2].maisons} maisons, ${totaux[2].personnes} personnes.`);

  let change = 0;
  for (const r of maisons) {
    if (r.m.division_reconstituee !== r.division || r.m.appui_division !== r.appui) change++;
    r.m.division_reconstituee = r.division;
    r.m.appui_division = r.appui;
  }
  D.divisions_reconstituees = {
    note: "Le formulaire de 1891 n'a pas de case « division » : un seul sous-district (L, St Romuald), un seul recenseur, une seule suite de pages. Les deux divisions de 1871 et 1881 sont projetées sur le parcours de 1891 d'après les liens de filiation (confiance forte ou moyenne) de chaque maison vers 1881, 1871 servant de contre-épreuve. maison.division_reconstituee est cette projection, maison.appui_division dit sur quoi elle repose. Le champ division (« 1 ») et les identifiants restent ceux du dépouillement.",
    methode: 'outils/relecture-1881/divisions91.mjs',
    journal: 'docs/DIVISIONS-1891.md',
    blocs: bilan,
    totaux: { D1: totaux[1], D2: totaux[2] }
  };
  if (essai) {
    console.log(`\n--essai : ${change} maison(s) changeraient ; rien n'est écrit.`);
  } else {
    fs.writeFileSync(FICHIER, prefix + JSON.stringify(D) + suffix);
    console.log(`\nÉcrit : ${change} maison(s) mises à jour dans ${path.relative(RACINE, FICHIER)}.`);
  }
}
