import path from 'path';
import { fileURLToPath } from 'url';
import { chargerDonnees } from '../lib/charger-donnees.mjs';
const ICI = path.dirname(fileURLToPath(import.meta.url));

/* Contrôle de cohérence de 1881 et de 1891.

   POURQUOI, ET CE QUE CE N'EST PAS. Relire, c'est confronter une page à son
   image. Contrôler, c'est chercher **ce qu'une lecture juste ne produit
   jamais** : un enfant de cinq ans porté marié, une épouse qui n'est pas
   mariée, un nourrisson né deux mois après qu'on l'a recensé. Le second
   travail ne remplace pas le premier et ne s'y substitue pas — il trouve ce
   que le premier ne voit pas de lui-même, parce qu'une valeur fausse mais
   bien formée n'a l'air de rien.

   Sur 1871, c'est ce contrôle qui a débusqué neuf chaînes de marques décalées
   d'un rang, cinq frontières de famille mal placées et vingt nourrissons au
   mauvais âge. Aucune de ces erreurs ne se voyait en relisant une page.

     node controle.mjs             # 1881 et 1891
     node controle.mjs 1881
     node controle.mjs 1891 --tout # sans plafonner les listes

   L'outil montre, il ne tranche pas. Beaucoup de signalements sont légitimes :
   au Québec la veuve qui mène le ménage est inscrite sous son nom de fille et
   ses enfants sous celui du père ; un fils de vingt-deux ans marié vit chez ses
   parents. Chaque ligne demande le manuscrit.

   ————————————————————————————————————————————————————————————————————————
   CE QUI A ÉTÉ REPRIS DE `controle71.mjs`, ET CE QUI A DÛ ÊTRE RÉÉCRIT

   Reprise telle quelle — ce sont des invariants d'état civil, pas des
   particularités de formulaire : le couple de tête dissymétrique, l'enfant
   présumé porté marié, l'âge absent ou aberrant, la valeur restée entre
   crochets, la frontière de famille ouverte trop tôt.

   **Le recoupement fraction / mois ne vaut que pour 1881.** Le formulaire de
   1881 a, comme celui de 1871, la paire de colonnes qui se contrôle elle-même :
   la colonne 9 porte l'âge en douzièmes, la colonne 10 nomme le mois de
   naissance, et le recensement est arrêté à une date connue — **le 4 avril
   1881**. Un nourrisson de m douzièmes est né m mois plus tôt. Les deux cases
   disent la même chose deux fois : c'est le seul endroit du formulaire où l'on
   peut prendre le recenseur en défaut sans rien ouvrir. **1891 n'a pas de
   colonne de mois de naissance** — le recoupement n'y existe pas.

   **L'alphabétisation a changé de polarité, et le contrôle avec.** En 1871 les
   colonnes 18-19 recensent l'*incapacité*, et seulement au-dessus de vingt ans :
   un mineur marqué y est un artefact, et c'est ce que `controle71.mjs` cherche.
   **En 1891 les colonnes 21-22 disent qui *sait* lire et écrire** : un enfant à
   `false` y est parfaitement normal, et le même contrôle n'y produirait que du
   bruit. Il est donc remplacé par les deux invariants qui tiennent dans la
   polarité directe : on n'écrit pas sans savoir lire, et on ne lit pas à trois
   ans. **1881 n'a aucune de ces colonnes** — rien à contrôler de ce côté.

   **1891 apporte ce que les deux autres n'ont pas : la colonne 5, le lien de
   parenté.** Elle dit « Chef », « Épouse », « Fils », « Bru ». C'est une
   seconde description du ménage, indépendante de l'ordre des lignes et des
   patronymes — donc un contrôle que ni 1871 ni 1881 ne permettent, et le plus
   sûr des trois pour trouver une frontière de famille mal placée.
*/
const ARGS = process.argv.slice(2);
const TOUT = ARGS.includes('--tout');
const ANNEES = ARGS.filter((a) => /^18\d\d$/.test(a));
const PLAFOND = TOUT ? Infinity : 40;

const d = chargerDonnees();

/* Un âge se lit « 49 », « 5 mois », « 9/12 (juillet) », « 0 (mars) ». On en tire
   un nombre d'années, et séparément le mois que la parenthèse nomme — les deux
   servent à des contrôles différents. */
const annees = (a) => {
  const s = String(a ?? '').trim();
  if (!s) return null;
  const f = s.match(/^(\d+)\s*\/\s*12/);
  if (f) return Number(f[1]) / 12;
  const m = s.match(/^(\d+)\s*mois/);
  if (m) return Number(m[1]) / 12;
  const n = s.match(/^(\d+)/);
  return n ? Number(n[1]) : null;
};
const moisDeLAge = (a) => (String(a ?? '').match(/\(([^)]+)\)/) || [])[1] || null;

const MOIS = {
  janvier: 1, janv: 1, jan: 1, février: 2, fevrier: 2, fév: 2, fev: 2, mars: 3, mrs: 3,
  avril: 4, avr: 4, mai: 5, juin: 6, juillet: 7, juil: 7, août: 8, aout: 8,
  septembre: 9, sept: 9, octobre: 10, oct: 10, novembre: 11, nov: 11,
  décembre: 12, decembre: 12, déc: 12, dec: 12,
};
const mois = (v) => MOIS[String(v ?? '').trim().toLowerCase().replace(/\.$/, '')] ?? null;
const NOMS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet',
  'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const nomDuMois = (n) => NOMS[n - 1];

/* Le recensement de 1881 est arrêté au 4 avril. Un nourrisson de m douzièmes
   est né m mois avant avril. (Celui de 1871 l'était au 2 avril : même mois,
   donc même arithmétique — c'est une coïncidence, pas une règle.) */
const RECENSEMENT = 4;
const moisAttendu = (douziemes) => ((RECENSEMENT - douziemes - 1 + 12) % 12) + 1;

function controler(annee) {
  const gens = [...d.personnes.values()].filter((p) => p.annee === String(annee));
  const familles = new Map();
  for (const p of gens) {
    const cle = `${p.division}|${p.no_maison}|${p.no_famille}`;
    if (!familles.has(cle)) familles.set(cle, []);
    familles.get(cle).push(p);
  }
  for (const mem of familles.values()) mem.sort((a, b) =>
    (Number(a.page_ms) - Number(b.page_ms)) || (Number(a.ligne) - Number(b.ligne)));
  const rangDe = new Map();
  for (const mem of familles.values()) mem.forEach((p, i) => rangDe.set(p.id, i));

  const dit = (p, sup) => `D${p.division} p${String(p.page_ms).padStart(3)} L${String(p.ligne).padStart(2)} ` +
    `${(p.nom + ' ' + p.prenom).slice(0, 26).padEnd(26)} ${p.sexe || ' '} ${String(p.age ?? '').padStart(7)} ` +
    `[${p.etat_matrimonial || '·'}]${sup ? '  ' + sup : ''}`;

  let total = 0;
  const bloc = (titre, lignes) => {
    if (!lignes.length) return;
    total += lignes.length;
    console.log(`\n### ${titre} — ${lignes.length}`);
    for (const l of lignes.slice(0, PLAFOND)) console.log('   ' + l);
    if (lignes.length > PLAFOND) console.log(`   … et ${lignes.length - PLAFOND} autres`);
  };
  const sur = (test, sup) => gens.filter(test).map((p) => dit(p, sup && sup(p)));

  console.log(`\n${'='.repeat(72)}\n== ${annee} — ${gens.length} personnes, ${familles.size} familles\n${'='.repeat(72)}`);

  // — Ce qu'une chaîne de marques décalée d'un rang produit ————————————
  bloc('marié ou veuf avant seize ans',
    sur((p) => ['M', 'V'].includes(p.etat_matrimonial) && annees(p.age) !== null && annees(p.age) < 16));

  // Le couple de tête : l'un porté marié, l'autre non. C'est le signal le plus
  // sûr d'une colonne d'état matrimonial décalée — le chef perd sa marque, la
  // ligne suivante en gagne une.
  const dissymetrie = [];
  for (const mem of familles.values()) {
    const [c, conj] = mem;
    if (!conj || !c.sexe || !conj.sexe || c.sexe === conj.sexe) continue;
    if (!(annees(c.age) >= 16) || !(annees(conj.age) >= 16)) continue;
    if ((c.etat_matrimonial === 'M') === (conj.etat_matrimonial === 'M')) continue;
    // En 1891 le lien de parenté dit si la seconde ligne est bien l'épouse :
    // sans cela on signale des sœurs, des mères, des pensionnaires.
    if (annee === 1891 && conj.lien_parente && !/épouse|epouse|femme/i.test(conj.lien_parente)) continue;
    dissymetrie.push(`${dit(c)}\n     ${dit(conj)}`);
  }
  bloc('couple de tête : un seul des deux porté marié', dissymetrie);

  // En 1891 la colonne 5 nomme le lien : inutile de présumer qui est un enfant,
  // et le présumer n'y produirait que du bruit — un fils de vingt-trois ans
  // marié sous le toit de son père est la chose la plus ordinaire du monde.
  if (annee !== 1891) bloc('enfant présumé porté marié ou veuf', gens.filter((p) => rangDe.get(p.id) >= 2 &&
    ['M', 'V'].includes(p.etat_matrimonial) && (() => {
      const chef = familles.get(`${p.division}|${p.no_maison}|${p.no_famille}`)[0];
      return annees(chef.age) !== null && annees(p.age) !== null && annees(chef.age) - annees(p.age) >= 15;
    })()).map((p) => {
      const chef = familles.get(`${p.division}|${p.no_maison}|${p.no_famille}`)[0];
      return dit(p, `chef ${chef.prenom} ${chef.age} ans`);
    }));

  // — Ce que la relecture ne comble pas d'elle-même ——————————————————————
  bloc('âge absent', sur((p) => annees(p.age) === null));
  bloc('âge aberrant — plus de 105 ans', sur((p) => annees(p.age) > 105));
  bloc('état matrimonial hors formulaire — autre que M, V ou rien',
    sur((p) => p.etat_matrimonial && !['M', 'V'].includes(p.etat_matrimonial)));
  bloc('valeur encore entre crochets', gens.flatMap((p) => Object.entries(p)
    .filter(([k, v]) => typeof v === 'string' && /\[\s*\?\s*\]/.test(v) &&
      !['remarque', 'age_original_csv'].includes(k))
    .map(([k, v]) => dit(p, `${k} = « ${v} »`))));

  if (annee === 1881) {
    // — Le recoupement gratuit du formulaire de 1881 ——————————————————————
    // La colonne 9 en douzièmes et la colonne 10 en toutes lettres disent deux
    // fois la même chose. Un écart de plus d'un mois est une lecture à reprendre.
    bloc('fraction et mois de naissance qui ne s\'accordent pas — le recensement est arrêté au 4 avril 1881',
      gens.filter((p) => {
        const a = annees(p.age);
        if (a === null || a < 0 || a >= 1) return false;
        const porte = mois(p.ne_douze_mois);
        if (!porte) return false;
        const cible = moisAttendu(Math.round(a * 12));
        return Math.min(Math.abs(porte - cible), 12 - Math.abs(porte - cible)) > 1;
      }).map((p) => dit(p, `${Math.round(annees(p.age) * 12)}/12 appelle ${
        nomDuMois(moisAttendu(Math.round(annees(p.age) * 12)))}, la colonne 10 porte « ${p.ne_douze_mois} »`)));

    // Le mois figure deux fois dans le fichier : dans la parenthèse de l'âge et
    // dans la colonne 10 du complément. Les deux viennent de dépouillements
    // différents — qu'ils divergent est un signal, pas une redondance.
    bloc('le mois de l\'âge et celui de la colonne 10 ne sont pas le même',
      gens.filter((p) => {
        const a = mois(moisDeLAge(p.age)), b = mois(p.ne_douze_mois);
        return a && b && a !== b;
      }).map((p) => dit(p, `l'âge dit « ${moisDeLAge(p.age)} », la colonne 10 « ${p.ne_douze_mois} »`)));

    bloc('mois de naissance porté alors que l\'âge dépasse un an — la colonne 10 ne vise que les nourrissons',
      sur((p) => p.ne_douze_mois && annees(p.age) >= 1));
    // Deux manques différents, qu'il ne faut pas confondre. Le mois figure à
    // deux endroits : la parenthèse de l'âge, venue du dépouillement, et la
    // colonne 10, venue du complément. Quand la parenthèse le porte et pas la
    // colonne, c'est le complément qui n'a pas relevé la case ; quand ni l'une
    // ni l'autre ne le porte, le mois manque tout court.
    bloc('nourrisson sans mois de naissance nulle part — ni dans l\'âge, ni en colonne 10',
      sur((p) => annees(p.age) !== null && annees(p.age) < 1 && !p.ne_douze_mois && !moisDeLAge(p.age)));
    bloc('mois de naissance dans l\'âge mais pas en colonne 10 — le complément n\'a pas relevé la case',
      sur((p) => annees(p.age) !== null && annees(p.age) < 1 && !p.ne_douze_mois && moisDeLAge(p.age),
        (p) => `l'âge porte « ${moisDeLAge(p.age)} »`));
    bloc('à l\'école au-dessus de vingt ans', sur((p) => p.ecole === true && annees(p.age) >= 20));
    bloc('à l\'école au-dessous de quatre ans',
      sur((p) => p.ecole === true && annees(p.age) !== null && annees(p.age) < 4));
  }

  if (annee === 1891) {
    // — L'alphabétisation, en polarité directe ————————————————————————————
    // Les colonnes 21-22 disent qui SAIT. Un enfant à `false` est normal : c'est
    // l'inverse du contrôle de 1871, et le recopier n'aurait produit que du bruit.
    bloc('sait écrire sans savoir lire — l\'inverse est courant, celui-ci ne se rencontre pas',
      sur((p) => p.sait_lire === false && p.sait_ecrire === true));
    bloc('sait lire avant cinq ans', sur((p) => p.sait_lire === true && annees(p.age) !== null && annees(p.age) < 5));

    // — La colonne 5, que ni 1871 ni 1881 ne portent ——————————————————————
    // Un numéro de famille à suffixe (« 458-2 ») est un second ménage sous le
    // même toit. Sa colonne 5 se rapporte au chef du LOGIS, non au sien : le
    // gendre, le père, le fils marié y mènent leur ménage sans être « Chef ».
    // Ce n'est pas une anomalie, c'est la forme du formulaire — on le dit une
    // fois et on ne le compte pas.
    const second = (p) => /-\d+$/.test(String(p.no_famille));
    const sansChef = [], plusieursChefs = [], chefDeplace = [], seconds = [];
    for (const mem of familles.values()) {
      const chefs = mem.filter((p) => /^chef/i.test(p.lien_parente || ''));
      const t = mem[0];
      if (second(t)) { seconds.push(dit(t, `famille ${t.no_famille}, ${mem.length} personnes — en tête : ${t.lien_parente}`)); continue; }
      if (!chefs.length) sansChef.push(dit(t, `famille ${t.no_famille} — ${mem.length} personnes, aucun « Chef » en colonne 5`));
      else if (chefs.length > 1) plusieursChefs.push(dit(t, `famille ${t.no_famille} — ${chefs.length} « Chef » : ` +
        chefs.map((p) => `L${p.ligne} ${p.prenom}`).join(', ')));
      else if (chefs[0] !== mem[0]) chefDeplace.push(dit(chefs[0], `le « Chef » est au rang ${mem.indexOf(chefs[0]) + 1} de la famille ${t.no_famille}, derrière ${mem[0].prenom} ${mem[0].nom}`));
    }
    bloc('famille sans chef en colonne 5', sansChef);
    if (seconds.length) console.log(`\n### (pour mémoire) seconds ménages sous un même toit — ${seconds.length}\n` +
      seconds.map((l) => '   ' + l).join('\n') + '\n   La colonne 5 s\'y rapporte au chef du logis : ce n\'est pas une anomalie.');
    bloc('famille à plusieurs chefs', plusieursChefs);
    bloc('le chef n\'est pas en tête de sa famille', chefDeplace);

    bloc('« Fils » ou « Fille » porté marié ou veuf avant dix-huit ans',
      sur((p) => /^(fils|fille|petit-fils|petite-fille)$/i.test(p.lien_parente || '') &&
        ['M', 'V'].includes(p.etat_matrimonial) && annees(p.age) !== null && annees(p.age) < 18));
    bloc('« Épouse » qui n\'est pas portée mariée',
      sur((p) => /épouse|epouse/i.test(p.lien_parente || '') && p.etat_matrimonial !== 'M'));
    bloc('enfant plus âgé que le chef, ou à moins de quinze ans de lui',
      gens.filter((p) => /^(fils|fille)$/i.test(p.lien_parente || '')).filter((p) => {
        const chef = familles.get(`${p.division}|${p.no_maison}|${p.no_famille}`)[0];
        // Dans un second ménage (« 467-2 ») la colonne 5 se rapporte au chef du
        // logis : la « Fille » y est la fille du logis, non celle de la première
        // ligne de son propre ménage. La comparaison n'a pas de sens.
        if (chef === p || /-\d+$/.test(String(p.no_famille))) return false;
        return annees(chef.age) !== null && annees(p.age) !== null && annees(chef.age) - annees(p.age) < 15;
      }).map((p) => {
        const chef = familles.get(`${p.division}|${p.no_maison}|${p.no_famille}`)[0];
        return dit(p, `${p.lien_parente} — chef ${chef.prenom} ${chef.age} ans`);
      }));

    // — Les colonnes 17 à 25 ————————————————————————————————————————————
    bloc('patron et employé à la fois', sur((p) => p.patron === true && p.employe === true));
    bloc('nombre d\'employés sans être patron',
      sur((p) => p.nb_employes && p.patron !== true, (p) => `${p.nb_employes} employé(s)`));
    bloc('mois de travail hors de l\'année',
      sur((p) => [p.mois_metier, p.mois_manufacture].some((v) => Number(v) > 12),
        (p) => `métier ${p.mois_metier ?? '·'}, manufacture ${p.mois_manufacture ?? '·'}`));
    bloc('ligne biffée au manuscrit, encore au registre',
      sur((p) => p.biffee === true));
  }

  // — Les frontières de famille ————————————————————————————————————————
  // Le formulaire n'écrit les numéros de ménage qu'à la première ligne. Ouvrir
  // une famille une ligne trop tôt décroche du ménage précédent ce qui lui
  // restait — une servante, des enfants, un pensionnaire.
  const frontieres = [];
  for (const mem of familles.values()) {
    if (mem.length < 3) continue;
    const compte = {};
    for (const p of mem) compte[p.nom] = (compte[p.nom] || 0) + 1;
    const dominant = Object.entries(compte).sort((a, b) => b[1] - a[1])[0][0];
    const tete = mem.findIndex((p) => p.nom === dominant);
    if (tete <= 0 || !(annees(mem[tete].age) >= 18)) continue;
    // En 1891 la colonne 5 lève l'ambiguïté : si la première ligne se dit
    // « Chef », la famille commence bien là, patronyme ou non.
    if (annee === 1891 && /^chef/i.test(mem[0].lien_parente || '')) continue;
    frontieres.push(`D${mem[0].division} famille ${mem[0].no_famille} (maison ${mem[0].no_maison}, p${mem[0].page_ms}) : ` +
      `${tete} en tête avant le premier ${dominant} — ` +
      mem.slice(0, tete).map((p) => `${p.nom} ${p.prenom} ${p.age}`).join(', ') +
      ` | puis ${mem[tete].nom} ${mem[tete].prenom} ${mem[tete].age}`);
  }
  bloc('famille dont la tête ne porte pas le patronyme dominant — veuve sous son nom de fille, ou frontière mal placée', frontieres);

  console.log(`\n${gens.length} personne(s) examinée(s) — ${total} signalement(s).`);
  return total;
}

const aFaire = ANNEES.length ? ANNEES.map(Number) : [1881, 1891];
let grand = 0;
for (const a of aFaire) grand += controler(a);
if (aFaire.length > 1) console.log(`\n${'='.repeat(72)}\n${grand} signalement(s) au total.`);
