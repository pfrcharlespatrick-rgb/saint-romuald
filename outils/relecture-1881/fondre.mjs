import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {
  corrections, manuel, touche, sansRelecture,
  correctionsMaisons, correctionsFamilles, manuelMaison, cleMaisonAtelier, recensementDeCle,
  resoudreLiens, rejets,
} from './atelier.mjs';
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/* Verse dans les recensements ce que Patrick a corrigé à la main dans l'atelier.

     node fondre.mjs             # tous les recensements concernés
     node fondre.mjs 1891-D1     # un seul
     node fondre.mjs --essai     # montre sans écrire

   L'atelier garde ses corrections à part, dans data/travail-personnel.json : sur
   ses propres écrans elles s'appliquent par-dessus les données, mais le site
   public, lui, lit les recensements. Les verser est donc ce qui les rend
   visibles partout — et ce qui met les fichiers d'accord avec la main.

   Trois clés du fichier de travail sont versées ici, champ par champ, sans
   jamais toucher au fichier de travail lui-même (c'est l'archive de ce qui a
   été tranché) :

   - `suivi-familles-corrections`, par personne. Une ligne corrigée à la main
     est tenue pour tranchée : elle perd son drapeau `incertain` et les
     remarques « Relecture du manuscrit : … » empilées par les passes
     automatiques. Ce que Patrick a écrit lui-même dans une remarque est
     conservé.
   - `suivi-corr-maison`, par maison : la colonne du formulaire (2 maison en
     construction, 3 inhabitée, 4 habitée) va dans `colonne_logement` ;
     `materiau`, `etages` et `chambres` dans `logement`, dont le drapeau
     `incertain` tombe dès que la main s'y est posée ; `adresse` dans
     `adresse`. Le numéro de maison, lui, n'est pas versé : c'est l'identifiant
     dont dépendent toutes les clés (atelier, lieux, annexes) — il est signalé,
     et se change à la main avec ce qui s'y rattache.
   - `suivi-corr-famille`, par famille : le numéro corrigé va dans
     `no_famille`. La clé de l'atelier porte le numéro d'origine (« 31 [?] »),
     la valeur le nouveau (« 31 ») ; une fois versée, la famille se retrouve
     sous son nouveau numéro et l'entrée est tenue pour versée.

   Le quatrième chantier de la main, `suivi-liens`, ne se verse pas dans un
   recensement : l'analyse des filiations (outils/analyse-filiation.mjs) le
   relit elle-même à chaque recalcul. On vérifie seulement ici que
   data/filiation-data.js est à jour de la main, et on dit sinon quoi relancer.

   L'opération est idempotente : un second passage ne change rien. Voir CLAUDE.md. */

const FICHIERS = {
  '1871-D1': 'data/recensement-1871-d1-data.js',
  '1871-D2': 'data/recensement-1871-d2-data.js',
  '1881-D1': 'data/recensement-1881-d1-data.js',
  '1881-D2': 'data/recensement-1881-d2-data.js',
  '1891-D1': 'data/recensement-1891-d1-data.js',
};

const FILIATION = 'data/filiation-data.js';

function lireJson(chemin) {
  const raw = fs.readFileSync(RACINE + '/' + chemin, 'utf8');
  const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
  return { raw, a, b, D: JSON.parse(raw.slice(a, b + 1)) };
}

/** Les recensements sur lesquels une main s'est posée. */
export function recensementsTouches() {
  const vises = new Set();
  for (const id of Object.keys(corrections())) vises.add(id.slice(0, id.indexOf('-P')));
  for (const cle of [...Object.keys(correctionsMaisons()), ...Object.keys(correctionsFamilles())]) {
    const r = recensementDeCle(cle);
    if (r) vises.add(r);
  }
  return [...vises].filter(r => FICHIERS[r]).sort();
}

const memeValeur = (a, b) => String(a === undefined || a === null ? '' : a) === String(b);

/* L'atelier garde ce que le clavier lui donne, du texte ; le recensement de 1891
   porte les étages et les chambres en nombres. On écrit un nombre quand la
   main a écrit un nombre, pour que le fichier reste d'une seule pièce. */
const nombreOuTexte = (v) => (typeof v === 'string' && /^\d+$/.test(v) ? Number(v) : v);

/** Pose une valeur si elle diffère, et le consigne. */
function poser(objet, champ, valeur, etiquette, faits) {
  if (memeValeur(objet[champ], valeur)) return false;
  faits.push(`${etiquette} ${champ} : « ${objet[champ] === undefined ? '' : objet[champ]} » -> « ${valeur} »`);
  objet[champ] = valeur;
  return true;
}

const CHAMPS_LOGEMENT = ['materiau', 'etages', 'chambres'];

function verserMaison(m, corr, etiquette, faits, laisses) {
  let mainSurLogement = false;
  for (const [champ, valeur] of Object.entries(corr)) {
    if (valeur === '' || valeur === undefined || valeur === null) {
      laisses.push(`${etiquette} ${champ} : case vidée dans l'atelier, rien à verser`);
      continue;
    }
    if (champ === 'no_maison') {
      if (!memeValeur(m.no_maison, valeur)) {
        laisses.push(`${etiquette} no_maison « ${m.no_maison} » -> « ${valeur} » : le numéro de maison est un identifiant`
          + ' (clés de l\'atelier, lieux, annexes) — outils/relecture-1881/renumeroter.mjs le change avec tout ce qui s\'y rattache');
      }
      continue;
    }
    if (champ === 'colonne') poser(m, 'colonne_logement', String(valeur), etiquette, faits);
    else if (CHAMPS_LOGEMENT.includes(champ)) {
      if (!m.logement) m.logement = {};
      poser(m.logement, champ, nombreOuTexte(valeur), `${etiquette} logement.`, faits);
      mainSurLogement = true;
    } else if (champ === 'adresse') poser(m, 'adresse', String(valeur), etiquette, faits);
    else laisses.push(`${etiquette} ${champ} : champ inconnu de l'atelier, laissé`);
  }
  // Une main sur le logement le tranche : le doute posé par le dépouillement tombe.
  if (mainSurLogement && m.logement && m.logement.incertain) {
    m.logement.incertain = false;
    faits.push(`${etiquette} drapeau « incertain » du logement levé`);
  }
}

export function fondre(recensement, { essai = false } = {}) {
  const chemin = FICHIERS[recensement];
  if (!chemin) throw new Error('recensement inconnu : ' + recensement);
  const { raw, a, b, D } = lireJson(chemin);
  const annee = String(D.annee), division = String(D.division);
  const faits = [];
  const laisses = [];
  const vus = { personnes: 0, maisons: 0, familles: 0 };

  // ── Personnes ──
  for (const m of D.maisons || []) for (const f of m.familles || []) for (const p of f.membres || []) {
    if (!touche(p.id)) continue;
    vus.personnes++;
    for (const [k, v] of Object.entries(manuel(p.id))) {
      if (p[k] === v) continue;
      faits.push(`${p.id} ${k} : « ${p[k] === undefined ? '' : p[k]} » -> « ${v} »`);
      p[k] = v;
    }
    if (p.incertain) { p.incertain = false; faits.push(`${p.id} drapeau « incertain » levé`); }
    const propre = sansRelecture(p.remarque);
    if (propre !== (p.remarque || '')) { p.remarque = propre; faits.push(`${p.id} remarques de relecture retirées`); }
    if (f.membres[0] === p && f.chef) f.chef = `${p.nom || ''} ${p.prenom || ''}`.trim();
  }

  // ── Maisons ──
  const clesMaisonsVues = new Set();
  for (const m of D.maisons || []) {
    const corr = manuelMaison(annee, division, m.no_maison);
    if (!Object.keys(corr).length) continue;
    vus.maisons++;
    clesMaisonsVues.add(cleMaisonAtelier(annee, division, m.no_maison));
    verserMaison(m, corr, `maison ${m.no_maison}`, faits, laisses);
  }
  // Une maison renumérotée depuis (outils/relecture-1881/renumeroter.mjs)
  // n'est plus sous le numéro que porte la clé de l'atelier : on la reconnaît
  // sous le nouveau — celui que la main a écrit dans no_maison — et le reste
  // de la correction s'y verse. L'ancien numéro sert encore aux familles.
  const renumerotees = new Map(); // ancien numéro (clé de l'atelier) -> maison
  for (const [cle, corr] of Object.entries(correctionsMaisons())) {
    if (recensementDeCle(cle) !== recensement || clesMaisonsVues.has(cle)) continue;
    const ancien = cle.slice(cleMaisonAtelier(annee, division, '').length);
    const m = corr.no_maison ? (D.maisons || []).find(x => memeValeur(x.no_maison, corr.no_maison)) : null;
    if (!m) { laisses.push(`${cle} : aucune maison de ce numéro dans le recensement, correction laissée`); continue; }
    vus.maisons++;
    clesMaisonsVues.add(cle);
    renumerotees.set(ancien, m);
    const reste = { ...corr };
    delete reste.no_maison;
    if (Object.keys(reste).length) verserMaison(m, reste, `maison ${m.no_maison} (ex-« ${ancien} »)`, faits, laisses);
  }

  // ── Familles ──
  // La clé porte le numéro tel qu'il était ; une fois versé, la famille est
  // sous le nouveau. On reconnaît donc les deux cas : à verser, ou déjà versé.
  const clesFamillesVues = new Set();
  for (const m of D.maisons || []) {
    const prefixes = [cleMaisonAtelier(annee, division, m.no_maison) + '-'];
    for (const [ancien, mm] of renumerotees) if (mm === m) prefixes.push(cleMaisonAtelier(annee, division, ancien) + '-');
    for (const [cle, corr] of Object.entries(correctionsFamilles())) {
      const prefixe = prefixes.find(p => cle.startsWith(p));
      if (!prefixe) continue;
      const noOrigine = cle.slice(prefixe.length);
      const nouveau = corr.no_famille;
      const f = (m.familles || []).find(x => memeValeur(x.no_famille, noOrigine));
      if (f) {
        vus.familles++;
        clesFamillesVues.add(cle);
        if (nouveau === '' || nouveau === undefined) {
          laisses.push(`maison ${m.no_maison} famille ${noOrigine} : numéro vidé dans l'atelier, rien à verser`);
        } else if (!memeValeur(f.no_famille, nouveau)) {
          if ((m.familles || []).some(x => x !== f && memeValeur(x.no_famille, nouveau))) {
            laisses.push(`maison ${m.no_maison} famille « ${noOrigine} » -> « ${nouveau} » : une autre famille de la maison porte déjà ce numéro, laissé`);
          } else {
            poser(f, 'no_famille', String(nouveau), `maison ${m.no_maison} famille`, faits);
          }
        }
      } else if (nouveau && (m.familles || []).some(x => memeValeur(x.no_famille, nouveau))) {
        vus.familles++;
        clesFamillesVues.add(cle); // déjà versée : la famille est sous son nouveau numéro
      }
    }
  }
  for (const cle of Object.keys(correctionsFamilles())) {
    if (recensementDeCle(cle) === recensement && !clesFamillesVues.has(cle)) {
      laisses.push(`${cle} : aucune famille de ce numéro dans le recensement, correction laissée`);
    }
  }

  if (!essai && faits.length) fs.writeFileSync(RACINE + '/' + chemin, raw.slice(0, a) + JSON.stringify(D) + raw.slice(b + 1));
  return { faits, laisses, vus, chemin };
}

/** Les liens posés à la main, confrontés à data/filiation-data.js : ceux que
    l'analyse a repris, ceux qui lui manquent, ceux qu'on laisse et pourquoi. */
export function etatDesLiens() {
  const positions = new Map();
  const ids = new Set();
  for (const chemin of Object.values(FICHIERS)) {
    const { D } = lireJson(chemin);
    for (const m of D.maisons || []) for (const f of m.familles || []) for (const p of f.membres || []) {
      ids.add(p.id);
      positions.set(`${D.annee}|${D.division}|${p.page_ms}|${p.ligne}`, p.id);
    }
  }
  const { resolus, laisses } = resoudreLiens(positions, id => ids.has(id));
  const ecartes = rejets();
  if (!fs.existsSync(RACINE + '/' + FILIATION)) {
    return { resolus, laisses, ecartes, repris: [], manquants: resolus, revenus: [...ecartes], sansIndice: [], analyse: false };
  }
  const { D: F } = lireJson(FILIATION);
  const reprisParCle = new Set((F.liens || []).filter(l => l.origine === 'main').map(l => `${l.de}__${l.vers}`));
  const retenus = new Set((F.liens || []).map(l => `${l.de}__${l.vers}`));
  const repris = resolus.filter(r => reprisParCle.has(`${r.de}__${r.vers}`));
  // Retenu parce que la main l'a dit, mais que rien ne corrobore : à montrer.
  const sansIndice = (F.liens || []).filter(l => l.origine === 'main' && l.sans_indice);
  const manquants = resolus.filter(r => !reprisParCle.has(`${r.de}__${r.vers}`));
  // Un rapprochement écarté à la main ne doit plus figurer parmi les liens retenus.
  const revenus = [...ecartes].filter(cle => retenus.has(cle));
  return { resolus, laisses, ecartes, repris, manquants, revenus, sansIndice, analyse: true };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const essai = process.argv.includes('--essai');
  const voulus = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const cibles = voulus.length ? voulus : recensementsTouches();
  let total = 0;
  for (const r of cibles) {
    const { faits, laisses, vus, chemin } = fondre(r, { essai });
    console.log(`\n=== ${r} — ${chemin} ===`);
    console.log(`${vus.personnes} ligne(s), ${vus.maisons} maison(s), ${vus.familles} famille(s) corrigée(s) à la main, ${faits.length} changement(s)`);
    faits.forEach(x => console.log('  ' + x));
    if (laisses.length) {
      console.log(`${laisses.length} laissé(s) :`);
      laisses.forEach(x => console.log('  ✕ ' + x));
    }
    total += faits.length;
  }
  console.log(`\n${total} changement(s) au total${essai ? ' — essai à blanc, rien écrit' : ''}`);

  // ── Liens entre recensements ──
  const etat = etatDesLiens();
  console.log(`\n=== Liens entre recensements — ${FILIATION} ===`);
  if (!etat.resolus.length && !etat.laisses.length && !etat.ecartes.size) {
    console.log('aucun lien posé à la main');
  } else {
    console.log(`${etat.resolus.length} lien(s) posé(s) à la main, ${etat.ecartes.size} rapprochement(s) écarté(s)`
      + (etat.analyse ? ` ; ${etat.repris.length} lien(s) repris par l'analyse` : ' ; analyse jamais lancée'));
    if (etat.manquants.length || etat.revenus.length) {
      etat.manquants.forEach(r => console.log(`  ! ${r.de} → ${r.vers}${r.nom ? ' (' + r.nom + ')' : ''} : absent de l'analyse`));
      etat.revenus.forEach(cle => console.log(`  ! ${cle.replace('__', ' → ')} : écarté à la main, mais encore retenu par l'analyse`));
      console.log('  → relancer `node outils/analyse-filiation.mjs`, puis `node outils/generer-site.mjs`');
    }
    if (etat.sansIndice.length) {
      console.log(`${etat.sansIndice.length} lien(s) tenu(s) par la main seule, sans aucun indice calculé — à vérifier dans l'annexe des filiations :`);
      etat.sansIndice.forEach(l => console.log(`  ? ${l.de} → ${l.vers} : ${l.resume_de} → ${l.resume_vers}`));
    }
    if (etat.laisses.length) {
      console.log(`${etat.laisses.length} laissé(s) :`);
      etat.laisses.forEach(x => console.log('  ✕ ' + x));
    }
  }
}
