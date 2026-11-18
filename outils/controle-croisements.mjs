#!/usr/bin/env node
// Contrôle des croisements — ce que les données se disent entre elles, et ce
// qu'elles ne se disent pas encore.
//
// Le site tient par des renvois : une personne d'un recensement vers la même
// dix ans plus tard, un acte vers les gens qu'il nomme, un décès vers la
// maison où il a frappé. Un renvoi oublié ne casse rien — il manque, c'est
// tout, et personne ne le voit. Ce programme les cherche.
//
// Il ne tranche rien et n'écrit dans aucune donnée : il dresse la liste de ce
// qui mérite un regard, dans docs/CONTROLE-CROISEMENTS.md. Chaque section dit
// où la décision se prend (l'atelier, l'annexe des filiations, le manifeste).
//
//   node outils/controle-croisements.mjs            écrit le rapport
//   node outils/controle-croisements.mjs --essai    l'affiche sans l'écrire
//   node outils/controle-croisements.mjs --json     sort les sections en JSON, sans rien écrire
//                                                   (c'est de là que se monte le relevé à cocher)
//
// À relancer après un versement de l'atelier ou une série d'actes : la liste
// se vide à mesure que les questions sont tranchées.

import fs from 'node:fs';
import path from 'node:path';
import { chargerDonnees, cleMaison, RACINE } from './lib/charger-donnees.mjs';
import { clePatronyme, similarPatronyme, normaliser, distance, ageEnAnnees, clesPrenom, similarPrenom } from './noms.mjs';
import { corrections, protege } from './relecture-1881/atelier.mjs';

const ESSAI = process.argv.includes('--essai');
const JSON_SEUL = process.argv.includes('--json');
const d = chargerDonnees();
const nomDe = (p) => [p.prenom, p.nom].filter(Boolean).join(' ') || '—';
const ou = (p) => `${p.annee}, div. ${p.division}, maison ${p.no_maison}, p. ${p.page_ms} l. ${p.ligne}`;
const sections = [];

// ───────────── 1. corrections manuelles dont le prénom et le sexe se contredisent ─────────────
// Une correction posée dans l'atelier ne se réécrit jamais (CLAUDE.md). Mais
// une ligne insérée après coup décale les identifiants, et la correction peut
// se retrouver sur la ligne voisine ; ou bien le prénom a été corrigé et le
// sexe est resté celui de l'ancienne lecture. On le signale, on n'y touche pas.
{
  const sexeDuPrenom = new Map();
  for (const p of d.personnes.values()) {
    const k = normaliser(p.prenom).split(' ')[0];
    if (!k || (p.sexe !== 'M' && p.sexe !== 'F')) continue;
    const s = sexeDuPrenom.get(k) || { M: 0, F: 0 };
    s[p.sexe]++;
    sexeDuPrenom.set(k, s);
  }
  const voisine = (id, delta) => {
    const m = id.match(/^(.*-L)(\d+)$/);
    return m ? d.personnes.get(m[1] + String(Number(m[2]) + delta).padStart(2, '0')) : null;
  };
  const lignes = [];
  for (const [id, corr] of Object.entries(corrections())) {
    const p = d.personnes.get(id);
    if (!p || !corr.prenom || corr.sexe) continue;
    const s = sexeDuPrenom.get(normaliser(corr.prenom).split(' ')[0]);
    if (!s || s.M + s.F < 5) continue;
    const attendu = s.M > 4 * s.F ? 'M' : s.F > 4 * s.M ? 'F' : '';
    if (!attendu || !p.sexe || attendu === p.sexe) continue;
    const proches = [-1, 1].map((dl) => voisine(id, dl)).filter(Boolean)
      .filter((v) => normaliser(v.prenom) && distance(normaliser(v.prenom), normaliser(corr.prenom), 2) <= 2);
    lignes.push(`| \`${id}\` | ${corr.prenom} ${p.nom} | ${p.sexe}, ${p.age || '?'} ans${p.profession ? ', ' + p.profession.toLowerCase() : ''} | ` +
      (proches.length
        ? `la ligne voisine \`${proches[0].id}\` porte « ${proches[0].prenom} » : la correction a peut-être glissé d'une ligne`
        : `prénom ${attendu === 'M' ? 'masculin' : 'féminin'}, sexe « ${p.sexe} » : le sexe est sans doute à corriger aussi`) + ' |');
  }
  sections.push({
    cle: 'corrections',
    titre: 'Corrections manuelles à relire',
    ou: 'dans l\'atelier, sur la ligne indiquée',
    intro: 'Le prénom posé à la main ne s\'accorde pas avec le sexe de la ligne. Rien n\'a été modifié : la main l\'emporte, c\'est à elle de se relire.',
    entete: '| Ligne | Nom corrigé | Au registre | Ce qui cloche |\n|---|---|---|---|',
    lignes
  });
}

// ───────────── 2. rapprochements proposés par le ménage ─────────────
{
  const lignes = d.filiation.liens.filter((l) => l.par_menage || l.transitif).map((l) =>
    `| ${l.resume_de} | ${l.resume_vers} | ${l.transitif ? 'maillon déduit' : (l.motifs.find((m) => /différent|proches/.test(m)) || '').replace(/ — .*$/, '')} | \`${l.de}\` → \`${l.vers}\` |`);
  sections.push({
    cle: 'par-menage',
    titre: 'Rapprochements proposés par le ménage',
    ou: 'dans l\'annexe des filiations (boutons Confirmer / Écarter)',
    intro: 'Le nom seul ne reliait pas ces deux mentions ; le ménage, lui, les désigne : seule personne du foyer dont le sexe et l\'âge concordent, quand deux autres membres au moins se retrouvent ensemble. Confiance « moyenne », à confirmer ou à écarter (voir docs/FILIATION.md, « Compléter les ménages reconnus »).',
    entete: '| Avant | Après | Indice | Identifiants |\n|---|---|---|---|',
    lignes
  });
}

// ───────────── 3. décès de 1871 sans maison ─────────────
{
  const lignes = [];
  for (const l of d.annexes.deces || []) {
    if (l.ref_maison) continue;
    const cp = clePatronyme(l.nom);
    const menages = new Map();
    for (const p of d.personnes.values()) {
      if (p.annee !== String(l.annee) || similarPatronyme(cp, clePatronyme(p.nom)) < 0.85) continue;
      const k = `div. ${p.division}, maison ${p.no_maison}`;
      if (!menages.has(k)) menages.set(k, p);
    }
    const liste = [...menages.keys()];
    lignes.push(`| ${nomDe(l)}, ${l.age}${/\d$/.test(String(l.age)) ? ' ans' : ''} | ${l.mois || ''} — ${l.cause || ''} | ` +
      (liste.length ? `${liste.length} ménage(s) de ce nom : ${liste.slice(0, 6).join(' ; ')}${liste.length > 6 ? ' ; …' : ''}` : 'aucun ménage de ce nom au recensement — graphie à vérifier') + ' |');
  }
  sections.push({
    cle: 'deces',
    titre: 'Décès de 1871 sans maison',
    ou: 'dans `data/annexe-deces-data.js` (champ `ref_maison`), une fois l\'acte de sépulture trouvé',
    intro: 'Le tableau 2 ne renvoie à aucune maison. Un rattachement n\'est proposé d\'office que lorsqu\'un seul ménage de la paroisse porte le nom ; les autres attendent un acte.',
    entete: '| Défunt | Mois et cause | Ménages possibles |\n|---|---|---|',
    lignes
  });
}

// ───────────── 4. documents : rattachée ici, pas là ─────────────
{
  const refs = new Map(); // nom normalisé -> [{ doc, ref }]
  for (const doc of d.manifeste.documents || []) {
    for (const p of doc.personnes || []) {
      if (!p.ref_personne) continue;
      const k = normaliser(p.nom);
      if (!refs.has(k)) refs.set(k, []);
      refs.get(k).push({ doc: doc.id, ref: p.ref_personne });
    }
  }
  const lignes = [];
  for (const doc of d.manifeste.documents || []) {
    for (const p of doc.personnes || []) {
      if (p.ref_personne || p.role === 'notaire') continue;
      // Un acte notarié dont la note explique le non-rattachement est une
      // décision prise : on ne la repose pas.
      if (doc.type === 'notarie' && p.note) continue;
      const ailleurs = (refs.get(normaliser(p.nom)) || []).filter((a) => a.doc !== doc.id);
      if (!ailleurs.length) continue;
      const cibles = [...new Set(ailleurs.map((a) => a.ref))].map((id) => {
        const x = d.personnes.get(id);
        return x ? `\`${id}\` (${nomDe(x)}, ${x.age} ans, fiche « ${ailleurs.find((a) => a.ref === id).doc} »)` : `\`${id}\``;
      });
      lignes.push(`| ${doc.id} | ${p.nom} (${p.role}) | ${cibles.join(' ; ')} | ${(p.note || '').slice(0, 140)} |`);
    }
  }
  sections.push({
    cle: 'documents',
    titre: 'Documents : la même personne, rattachée dans une fiche et pas dans l\'autre',
    ou: 'dans `documents/manifeste.json` (champ `ref_personne`)',
    intro: 'Le même nom porte un rattachement au recensement dans un autre document. Ce peut être la même personne — ou un homonyme : à vérifier avant de verser.',
    entete: '| Document | Personne | Rattachée ailleurs à | Note de la fiche |\n|---|---|---|---|',
    lignes
  });
}

// ───────────── 5. lignes incomplètes ou qui se contredisent ─────────────
{
  const lignes = [];
  for (const p of d.personnes.values()) {
    if (!String(p.prenom || '').trim() && !/\(Fr[èe]re\)|\(S(œ|oe)ur\)/.test(p.nom)) lignes.push(`| \`${p.id}\` | ${nomDe(p)} | prénom vide — ${ou(p)} |`);
    if (!String(p.nom || '').trim()) lignes.push(`| \`${p.id}\` | ${nomDe(p)} | nom vide — ${ou(p)} |`);
    if (p.sexe && p.sexe !== 'M' && p.sexe !== 'F') lignes.push(`| \`${p.id}\` | ${nomDe(p)} | sexe noté « ${p.sexe} » : compté comme inconnu dans les statistiques et les filiations |`);
    const age = ageEnAnnees(p.age);
    if (age != null && age < 14 && p.etat_matrimonial === 'M') lignes.push(`| \`${p.id}\` | ${nomDe(p)} | ${p.age} ans et dit marié(e) — ${ou(p)} |`);
  }
  const familles = new Map();
  for (const [cle, m] of d.maisons) for (const f of m.familles) {
    const k = `${m.annee}-D${m.division}, famille ${f.no_famille}`;
    if (!familles.has(k)) familles.set(k, []);
    familles.get(k).push(m.no_maison);
  }
  for (const [k, maisons] of familles) if (maisons.length > 1) lignes.push(`| ${k} | — | même numéro de famille dans les maisons ${maisons.join(' et ')} |`);
  for (const l of d.lieux) for (const o of l.occupations) {
    if (!d.maisons.has(cleMaison(o.annee, o.division, o.no_maison))) lignes.push(`| lieu \`${l.id}\` | — | renvoie à la maison ${o.no_maison} de ${o.annee}, division ${o.division}, qui n'existe pas |`);
  }
  for (const doc of d.manifeste.documents || []) for (const p of doc.personnes || []) {
    if (p.ref_personne && !d.personnes.has(p.ref_personne)) lignes.push(`| document \`${doc.id}\` | ${p.nom} | renvoie à \`${p.ref_personne}\`, qui n'existe pas |`);
  }
  for (const doc of d.manifeste.documents || []) for (const a of doc.affirmations || []) for (const id of a.personnes || []) {
    if (!d.personnes.has(id)) lignes.push(`| document \`${doc.id}\` | — | une affirmation (« ${a.type} ») renvoie à \`${id}\`, qui n'existe pas |`);
  }
  // Les pages et les lignes : chaque page se suit de 1 à sa dernière ligne,
  // sans trou ni doublon, et l'identifiant dit la page et la ligne.
  const pages = new Map();
  for (const p of d.personnes.values()) {
    const k = `${p.annee}, div. ${p.division}, p. ${p.page_ms}`;
    if (!pages.has(k)) pages.set(k, []);
    pages.get(k).push(Number(p.ligne));
    const m = p.id.match(/P(\d+)-L(\d+)$/);
    if (!m || Number(m[1]) !== Number(p.page_ms) || Number(m[2]) !== Number(p.ligne)) lignes.push(`| \`${p.id}\` | ${nomDe(p)} | l'identifiant ne dit pas la page ${p.page_ms}, ligne ${p.ligne}, que porte la fiche |`);
  }
  for (const [k, ls] of pages) {
    const doubles = ls.filter((v, i) => ls.indexOf(v) !== i);
    const absentes = [];
    for (let i = 1; i <= Math.max(...ls); i++) if (!ls.includes(i)) absentes.push(i);
    if (doubles.length) lignes.push(`| ${k} | — | ligne(s) ${doubles.join(', ')} portée(s) deux fois |`);
    if (absentes.length) lignes.push(`| ${k} | — | ligne(s) ${absentes.join(', ')} absente(s) : une personne a pu être oubliée au dépouillement |`);
  }
  // Les tableaux annexes : la personne et la maison auxquelles ils renvoient.
  for (const [nom, tableau] of Object.entries(d.annexes)) for (const r of Array.isArray(tableau) ? tableau : []) {
    const c = r.ref_personne ? d.personnes.get(r.ref_personne) : null;
    if (r.ref_personne && !c) lignes.push(`| annexe « ${nom} », p. ${r.page} l. ${r.ligne} | — | renvoie à \`${r.ref_personne}\`, qui n'existe pas |`);
    else if (c && r.ref_maison && String(r.ref_maison) !== c.no_maison) lignes.push(`| annexe « ${nom} », p. ${r.page} l. ${r.ligne} | ${nomDe(c)} | renvoie à la maison ${r.ref_maison}, mais la personne est dans la maison ${c.no_maison} |`);
    if (r.ref_maison && !d.maisons.has(cleMaison(r.annee, r.division, r.ref_maison))) lignes.push(`| annexe « ${nom} », p. ${r.page} l. ${r.ligne} | — | renvoie à la maison ${r.ref_maison} de ${r.annee}, division ${r.division}, qui n'existe pas |`);
  }
  for (const l of d.filiation.liens || []) {
    if (!d.personnes.has(l.de) || !d.personnes.has(l.vers)) lignes.push(`| lien \`${l.de}\` → \`${l.vers}\` | — | l'un des deux bouts n'existe plus : relancer \`analyse-filiation.mjs\` |`);
  }
  sections.push({
    cle: 'lignes',
    titre: 'Lignes incomplètes ou renvois cassés',
    ou: 'dans l\'atelier pour une ligne de recensement ; dans le fichier nommé pour un renvoi',
    intro: 'Ce qu\'un contrôle mécanique relève : un prénom manquant, un sexe douteux, un renvoi vers un identifiant disparu.',
    entete: '| Où | Qui | Ce qui cloche |\n|---|---|---|',
    lignes
  });
}

// ═════════════ Ce que les documents disent d'une ligne de recensement ═════════════
// Les actes versés au manifeste nomment des gens que le recensement porte
// aussi : ils signent ou ne signent pas, ils ont un prénom, une date de
// naissance. Là où l'acte et le recensement se contredisent, l'un des deux
// est à relire — et ce n'est pas toujours l'acte. Rien n'est tranché ici.

const P = d.personnes;
const DOUTE = /\[\s*\?\s*\]/;
const cell = (t) => String(t == null ? '' : t).replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
const court = (t, n = 200) => { const s = cell(t); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s; };
// Un acte du greffe se nomme par son numéro de minute et sa date — c'est ainsi
// que Patrick le retrouve ; les autres fiches par leur identifiant.
const docParId = new Map((d.manifeste.documents || []).map((doc) => [doc.id, doc]));
const nomFiche = (id) => {
  const doc = docParId.get(id);
  const n = doc && doc.type === 'notarie' && String(doc.cote || '').match(/Minute n° (\d+)/);
  return n ? `acte n° ${n[1]} du ${doc.date}` : `« ${id} »`;
};
const fiches = (ids) => {
  const u = [...new Set(ids)];
  return u.slice(0, 2).map(nomFiche).join(', ') + (u.length > 2 ? ` et ${u.length - 2} autre(s)` : '');
};
const anneeDe = (texte) => { const m = String(texte || '').match(/\b(1[6-9]\d\d)\b/); return m ? Number(m[1]) : null; };
// « 36 » se dit « 36 ans » ; « 7/12 » et « 2 mois » se disent tels quels.
const ageDit = (age) => (/^\d+(\s*\[\s*\?\s*\])?$/.test(String(age || '').trim()) ? `${String(age).trim()} ans` : String(age || 'âge inconnu').trim());
const sexeSur = (p) => (p.sexe === 'M' || p.sexe === 'F' ? p.sexe : '');
const voisineDe = (id, delta) => {
  const m = id.match(/^(.*-L)(\d+)$/);
  return m ? P.get(m[1] + String(Number(m[2]) + delta).padStart(2, '0')) : null;
};

// Toutes les lignes que les liens entre recensements tiennent pour une seule
// et même personne : la ligne elle-même, et ce que les liens y rattachent.
const suiteDe = (id) => {
  const vus = new Set([id]);
  let front = [id];
  while (front.length) {
    const suivant = [];
    for (const x of front) {
      for (const l of d.liensDe.get(x) || []) if (!vus.has(l.vers)) { vus.add(l.vers); suivant.push(l.vers); }
      for (const l of d.liensVers.get(x) || []) if (!vus.has(l.de)) { vus.add(l.de); suivant.push(l.de); }
    }
    front = suivant;
  }
  return vus;
};

// Le sexe que porte d'ordinaire un prénom, d'après les dix mille lignes : ne
// vaut que pour un prénom fréquent et presque toujours du même côté.
const sexeDuPrenom = (() => {
  // Le premier mot du prénom ; le « é » final est gardé (Élisé n'est pas
  // Élise), et une initiale (« M. Joseph ») n'est pas un prénom.
  const cle = (prenom) => {
    const brut = String(prenom || '').replace(DOUTE, ' ').trim().split(/[\s.-]+/)[0] || '';
    const k = normaliser(brut);
    return k.length < 3 ? '' : k + (/[ée]e?$/i.test(brut) && /é$/i.test(brut) ? '~' : '');
  };
  const compte = new Map();
  for (const p of P.values()) {
    const k = cle(p.prenom);
    if (!k || !sexeSur(p)) continue;
    const s = compte.get(k) || { M: 0, F: 0 };
    s[p.sexe]++;
    compte.set(k, s);
  }
  return (prenom) => {
    const s = compte.get(cle(prenom));
    if (!s || s.M + s.F < 8) return '';
    return s.M > 12 * s.F ? 'M' : s.F > 12 * s.M ? 'F' : '';
  };
})();

// ───────────── 6. lignes incertaines qu'un document éclaire ─────────────
{
  const parPersonne = new Map();
  const fiche = (id) => {
    if (!parPersonne.has(id)) parPersonne.set(id, { ecrits: new Set(), docs: [], lectures: [], notes: [] });
    return parPersonne.get(id);
  };
  for (const doc of d.manifeste.documents || []) {
    for (const p of doc.personnes || []) {
      if (!p.ref_personne || !P.has(p.ref_personne)) continue;
      const f = fiche(p.ref_personne);
      f.ecrits.add(p.nom);
      f.docs.push(doc.id);
      if (p.note) f.notes.push(p.note);
    }
    for (const a of doc.affirmations || []) {
      if (a.type !== 'lecture') continue;
      for (const id of a.personnes || []) if (P.has(id)) fiche(id).lectures.push(a.enonce);
    }
  }
  const CHAMPS = { nom: 'le nom', prenom: 'le prénom', age: 'l\'âge', sexe: 'le sexe', etat_matrimonial: 'l\'état matrimonial', profession: 'le métier' };
  const lignes = [];
  for (const [id, f] of parPersonne) {
    const p = P.get(id);
    const douteux = Object.keys(CHAMPS).filter((ch) => DOUTE.test(String(p[ch] || '')) && !protege(id, ch));
    if (!douteux.length) continue;
    const porte = [p.nom, p.prenom, `${ageDit(p.age)}`, p.etat_matrimonial, p.profession].filter(Boolean).join(', ');
    lignes.push(`| \`${id}\` — ${ou(p)} | ${cell(porte)} | ${douteux.map((ch) => CHAMPS[ch]).join(', ')} | écrit « ${[...f.ecrits].map(cell).join(' », « ')} » dans ${fiches(f.docs)} — ${court(f.lectures[0] || f.notes[0] || '', 260)} |`);
  }
  sections.push({
    cle: 'lectures',
    titre: 'Lignes incertaines qu\'un document éclaire',
    ou: 'dans l\'atelier, sur la ligne indiquée : retirer le « [?] » ou corriger la valeur',
    intro: 'Le dépouillement a laissé un « [?] » sur ces lignes, et un acte versé depuis nomme la même personne en toutes lettres. La ligne n\'a pas été touchée : c\'est à la main de dire si le doute est levé.',
    entete: '| Ligne | Le recensement porte | Reste douteux | Ce que disent les documents |\n|---|---|---|---|',
    lignes
  });
}

// ───────────── 7. la signature au bas de l'acte, et « sait écrire » ─────────────
// En 1871 la question est posée à l'envers (colonnes 18 et 19 : ne sait pas
// lire, ne sait pas écrire, au-dessus de vingt ans) : une marque oubliée par
// le recenseur, ou décalée d'un rang au dépouillement, fait d'un illettré
// quelqu'un qui écrit. La signature d'un acte notarié est un témoin
// indépendant — imparfait (on signe parfois sans savoir écrire), mais daté.
{
  const NE_SIGNE = /ne sai[st] (pas |point )?(ni écrire ni )?signer|ne sachant (pas )?signer|ne signe pas|n'a (pas )?su signer|déclar\w* ne (le )?savoir|sa marque|fait une croix/i;
  const SIGNE = /\bsigne\b|\ba signé\b|\bparaphe\b/i;
  const parPersonne = new Map();
  for (const doc of d.manifeste.documents || []) for (const p of doc.personnes || []) {
    const c = P.get(p.ref_personne);
    if (!c || !p.note) continue;
    const ne = NE_SIGNE.test(p.note);
    const oui = !ne && SIGNE.test(p.note);
    if (!ne && !oui) continue;
    if (!parPersonne.has(c.id)) parPersonne.set(c.id, { ne: [], oui: [] });
    parPersonne.get(c.id)[ne ? 'ne' : 'oui'].push(doc.id);
  }
  const bilan = { compares: 0, accord: 0 };
  const lignes = [];
  for (const [id, f] of parPersonne) {
    const p = P.get(id);
    const actes = f.ne.length && f.oui.length ? `ne signe pas dans ${fiches(f.ne)}, mais signe dans ${fiches(f.oui)}`
      : f.ne.length ? `ne sait pas signer — ${f.ne.length} acte(s) : ${fiches(f.ne)}`
        : `signe — ${f.oui.length} acte(s) : ${fiches(f.oui)}`;
    if (typeof p.sait_ecrire !== 'boolean') {
      if (f.ne.length && f.oui.length) lignes.push(`| \`${id}\` — ${ou(p)} | ${nomDe(p)}, ${ageDit(p.age)} | — (colonne absente en ${p.annee}) | ${actes} | les actes se contredisent entre eux : relire la fiche de l'acte, ou deux personnes du même nom |`);
      continue;
    }
    // Un enfant recensé ne sait pas encore écrire : qu'il signe un acte
    // vingt ans plus tard ne contredit rien.
    const ageRec = ageEnAnnees(p.age);
    if (ageRec != null && ageRec < 15 && !(f.ne.length && f.oui.length)) continue;
    bilan.compares++;
    const dit = p.sait_ecrire ? (p.sait_lire ? 'sait lire et écrire' : 'sait écrire') : (p.sait_lire ? 'sait lire, pas écrire' : 'ne sait ni lire ni écrire');
    const contredit = f.ne.length && f.oui.length ? 'actes'
      : f.ne.length && p.sait_ecrire ? 'ecrit'
        : f.oui.length && !p.sait_ecrire ? 'signe' : '';
    if (!contredit) { bilan.accord++; continue; }
    if (protege(id, 'sait_ecrire')) continue;
    const colonnes = p.annee === '1871' ? 'colonnes 18 et 19' : p.annee === '1891' ? 'colonnes 21 et 22' : 'colonnes d\'instruction';
    const age = ageEnAnnees(p.age);
    let indice = '';
    if (contredit === 'actes') indice = 'les actes se contredisent entre eux : relire la fiche de l\'acte, ou deux personnes du même nom';
    else if (p.annee === '1871' && age != null && age <= 20) indice = `${age} ans : en 1871 les ${colonnes} ne visent que les plus de vingt ans — l'absence de marque ne dit rien`;
    else if (contredit === 'ecrit') {
      const marquee = [-1, 1].map((dl) => voisineDe(id, dl)).find((v) => v && v.sait_ecrire === false);
      indice = marquee
        ? `la ligne voisine (l. ${marquee.ligne}, ${marquee.prenom}) porte la marque « ne sait pas écrire » : marque peut-être décalée d'un rang — ${colonnes}`
        : `aucune marque sur la ligne ni sur ses voisines : marque omise par le recenseur, ou effacée — ${colonnes}`;
    } else {
      indice = `la marque « ne sait pas » est peut-être celle d'une ligne voisine — ${colonnes}`;
    }
    lignes.push(`| \`${id}\` — ${ou(p)} | ${nomDe(p)}, ${ageDit(p.age)}${p.profession ? ', ' + p.profession.toLowerCase() : ''} | ${dit} | ${actes} | ${indice} |`);
  }
  sections.push({
    cle: 'signatures',
    titre: 'Signature au bas des actes et « sait écrire » au recensement',
    ou: 'au manuscrit, dans les colonnes d\'instruction ; puis dans l\'atelier si la marque est à déplacer',
    intro: `Les actes disent qui signe et qui « a déclaré ne le savoir ». Sur ${bilan.compares} personnes rattachées dont le recensement dit si elles écrivent, ${bilan.accord} s'accordent avec leurs actes ; les autres sont ici. Signer n'est pas écrire, et le recenseur a pu omettre une marque : chaque ligne demande le manuscrit.`,
    entete: '| Ligne | Qui | Le recensement dit | Les actes disent | Indice |\n|---|---|---|---|---|',
    lignes
  });
}

// ───────────── 8. le prénom du document n'est pas celui du recensement ─────────────
{
  const TITRES = new Set(['docteur', 'dr', 'veuve', 'vve', 'madame', 'mme', 'dame', 'sieur', 'monsieur', 'capitaine', 'reverend', 'abbe',
    'messire', 'cure', 'notaire', 'ecuyer', 'fils', 'pere', 'mere', 'junior', 'senior', 'dit', 'dite', 'lu', 'prenom', 'de', 'la', 'le', 'du', 'des']);
  const lignes = [];
  const vus = new Set();
  for (const doc of d.manifeste.documents || []) for (const p of doc.personnes || []) {
    const c = P.get(p.ref_personne);
    if (!c) continue;
    const mots = normaliser(p.nom).replace(/-/g, ' ').split(' ').filter(Boolean);
    const cp = clePatronyme(c.nom);
    const candidats = [...mots, ...mots.slice(0, -1).map((m, i) => m + mots[i + 1])];
    const simPat = Math.max(0, ...candidats.map((m) => similarPatronyme(clePatronyme(m), cp)));
    const prenoms = mots.filter((m) => !TITRES.has(m) && similarPatronyme(clePatronyme(m), cp) < 0.6);
    const clesRec = clesPrenom(c.prenom);
    // « Veuve Charles Ward » : le prénom écrit est celui du mari, pas le sien.
    const veuve = /^(veuve|vve)$/.test(mots[0] || '');
    const simPre = !veuve && prenoms.length && clesRec.length ? similarPrenom(clesPrenom(prenoms.join(' ')), clesRec) : 1;
    let quoi = '';
    if (simPre < 0.75) quoi = simPre >= 0.5 ? 'prénom voisin, pas identique' : 'prénom différent';
    // Une femme change de nom en se mariant ; un homme, non.
    if (simPat === 0 && c.sexe === 'M') quoi = quoi ? quoi + ', patronyme différent' : 'patronyme différent';
    if (!quoi) continue;
    const k = `${doc.id}|${c.id}`;
    if (vus.has(k)) continue;
    vus.add(k);
    lignes.push(`| « ${doc.id} » (${doc.type}, ${doc.date || 's. d.'}) | ${cell(p.nom)} (${p.role}) | \`${c.id}\` — ${nomDe(c)}, ${ageDit(c.age)} — ${ou(c)} | ${quoi} | ${court(p.note, 160)} |`);
  }
  sections.push({
    cle: 'prenoms',
    titre: 'Documents : le nom écrit n\'est pas celui de la ligne rattachée',
    ou: 'au manuscrit pour la ligne ; dans `documents/manifeste.json` si c\'est la fiche qui porte une ancienne lecture ou un rattachement à défaire',
    intro: 'La fiche d\'un document rattache une personne à une ligne dont le prénom (ou, pour un homme, le patronyme) n\'est pas le sien. Trois cas : la ligne du recensement est mal lue ; la fiche reprend une lecture que la relecture a corrigée depuis ; ou le rattachement vise la mauvaise ligne.',
    entete: '| Document | Le document écrit | La ligne rattachée | Ce qui diffère | Note de la fiche |\n|---|---|---|---|---|',
    lignes
  });
}

// ───────────── 9. naissance et décès connus, face au recensement ─────────────
{
  const lignes = [];
  const vus = new Set();
  for (const doc of d.manifeste.documents || []) for (const p of doc.personnes || []) {
    const c = P.get(p.ref_personne);
    if (!c) continue;
    const ne = anneeDe(p.naissance), mort = anneeDe(p.deces), age = ageEnAnnees(c.age);
    if (ne && age != null) {
      const attendu = Number(c.annee) - ne;
      const k = `n|${c.id}|${ne}`;
      if (Math.abs(age - attendu) >= 3 && !vus.has(k)) {
        vus.add(k);
        lignes.push(`| « ${doc.id} » | ${cell(p.nom)}, né(e) ${cell(p.naissance)} | \`${c.id}\` — ${nomDe(c)}, ${ageDit(c.age)} — ${ou(c)} | ${attendu} ans attendus en ${c.annee}, ${age} recensés : écart de ${Math.abs(age - attendu)} ans${protege(c.id, 'age') ? ' (âge posé à la main)' : ''} |`);
      }
    }
    if (mort) {
      const apres = [...suiteDe(c.id)].map((id) => P.get(id)).filter((x) => x && Number(x.annee) > mort);
      const k = `d|${c.id}|${mort}`;
      if (apres.length && !vus.has(k)) {
        vus.add(k);
        lignes.push(`| « ${doc.id} » | ${cell(p.nom)}, décédé(e) ${cell(p.deces)} | ${apres.map((x) => `\`${x.id}\` — ${nomDe(x)}, ${ageDit(x.age)}, ${x.annee}`).join(' ; ')} | recensé(e) ou suivi(e) après la date du décès : rattachement ou lien à défaire |`);
      }
    }
  }
  sections.push({
    cle: 'naissances',
    titre: 'Naissances et décès connus, face au recensement',
    ou: 'au manuscrit pour l\'âge ; dans `documents/manifeste.json` ou l\'annexe des filiations si c\'est le rattachement qui est en cause',
    intro: 'Un document donne l\'année de naissance ou de décès d\'une personne rattachée. L\'âge recensé s\'en écarte de trois ans ou plus, ou la personne reparaît après sa mort. Les âges du recensement sont approximatifs — deux ou trois ans ne prouvent rien —, mais un écart de cinq ou six ans mérite le manuscrit.',
    entete: '| Document | Ce que dit le document | La ligne rattachée | Ce qui cloche |\n|---|---|---|---|',
    lignes
  });
}

// ───────────── 10. identité établie par un document, sans lien entre les recensements ─────────────
{
  const lignes = [];
  const vus = new Set();
  for (const doc of d.manifeste.documents || []) for (const a of doc.affirmations || []) {
    if (a.type !== 'identite' || a.certitude === 'hypothese') continue;
    const cs = (a.personnes || []).map((id) => P.get(id)).filter(Boolean);
    for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) {
      const [x, y] = Number(cs[i].annee) <= Number(cs[j].annee) ? [cs[i], cs[j]] : [cs[j], cs[i]];
      if (x.annee === y.annee) continue;
      if (sexeSur(x) && sexeSur(y) && sexeSur(x) !== sexeSur(y)) continue;
      const ax = ageEnAnnees(x.age), ay = ageEnAnnees(y.age);
      if (ax == null || ay == null || Math.abs((Number(x.annee) - ax) - (Number(y.annee) - ay)) > 6) continue;
      if (similarPrenom(clesPrenom(x.prenom), clesPrenom(y.prenom)) < 0.75) continue;
      const suite = suiteDe(x.id);
      if (suite.has(y.id)) continue;
      const k = `${x.id}|${y.id}`;
      if (vus.has(k)) continue;
      vus.add(k);
      const autre = [...suite].map((id) => P.get(id)).find((z) => z && z.annee === y.annee);
      lignes.push(`| ${nomDe(x)}, ${ageDit(x.age)} — ${ou(x)} | ${nomDe(y)}, ${ageDit(y.age)} — ${ou(y)} | « ${doc.id} » (${a.certitude === 'etabli' ? 'établi' : 'probable'}) | ${autre ? `la première est déjà liée à une autre ligne de ${y.annee} : \`${autre.id}\` (${nomDe(autre)}) — l'un des deux est faux` : 'aucun lien entre les deux lignes'} | \`${x.id}\` → \`${y.id}\` |`);
    }
  }
  // La même fiche rattache un même nom à deux recensements : elle les tient
  // pour une seule personne, même sans le dire dans une affirmation.
  for (const doc of d.manifeste.documents || []) {
    const parNom = new Map();
    for (const p of doc.personnes || []) {
      const c = P.get(p.ref_personne);
      if (!c) continue;
      const k = normaliser(p.nom);
      if (!parNom.has(k)) parNom.set(k, []);
      parNom.get(k).push(c);
    }
    for (const cs of parNom.values()) for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) {
      const [x, y] = Number(cs[i].annee) <= Number(cs[j].annee) ? [cs[i], cs[j]] : [cs[j], cs[i]];
      if (x.annee === y.annee || suiteDe(x.id).has(y.id)) continue;
      const k = `${x.id}|${y.id}`;
      if (vus.has(k)) continue;
      vus.add(k);
      const autre = [...suiteDe(x.id)].map((id) => P.get(id)).find((z) => z && z.annee === y.annee);
      lignes.push(`| ${nomDe(x)}, ${ageDit(x.age)} — ${ou(x)} | ${nomDe(y)}, ${ageDit(y.age)} — ${ou(y)} | « ${doc.id} » (même nom, deux rattachements) | ${autre ? `la première est déjà liée à une autre ligne de ${y.annee} : \`${autre.id}\` (${nomDe(autre)}) — l'un des deux est faux` : 'aucun lien entre les deux lignes'} | \`${x.id}\` → \`${y.id}\` |`);
    }
  }
  sections.push({
    cle: 'identites',
    titre: 'Identité dite par un document, sans lien entre les recensements',
    ou: 'dans l\'annexe des filiations, ou en le dictant (« confirme le lien ») — il ira dans `data/decisions-dictees.json`',
    intro: 'Un document affirme que deux lignes de deux recensements sont la même personne — le plus souvent une femme qui a changé de nom —, et le calcul des filiations ne les relie pas. Le lien n\'a pas été posé d\'office : il se confirme à la main.',
    entete: '| Avant | Après | Document | État | Identifiants |\n|---|---|---|---|---|',
    lignes
  });
}

// ═════════════ D'un recensement à l'autre ═════════════
// Un lien entre deux recensements est aussi un contrôle : la même personne
// garde son sexe et vieillit de dix ans. Quand ce n'est pas le cas, ou bien
// le lien est faux, ou bien l'une des deux lignes est mal lue.

// ───────────── 11. le sexe change ─────────────
{
  const lignes = [];
  const dites = new Set();
  for (const l of d.filiation.liens || []) {
    const a = P.get(l.de), b = P.get(l.vers);
    if (!a || !b || !sexeSur(a) || !sexeSur(b) || a.sexe === b.sexe) continue;
    const fautive = [a, b].filter((p) => sexeDuPrenom(p.prenom) && sexeDuPrenom(p.prenom) !== p.sexe);
    for (const p of [a, b]) dites.add(p.id);
    lignes.push(`| ${nomDe(a)}, ${a.sexe}, ${ageDit(a.age)} — ${ou(a)} | ${nomDe(b)}, ${b.sexe}, ${ageDit(b.age)}${b.profession ? ', ' + b.profession.toLowerCase() : ''} — ${ou(b)} | ${fautive.length === 1
      ? `le prénom « ${fautive[0].prenom} » de ${fautive[0].annee} ne va pas avec le sexe « ${fautive[0].sexe} » : c'est sans doute cette ligne${protege(fautive[0].id, 'sexe') ? ' — mais le sexe y est posé à la main' : ''}`
      : 'prénom ou sexe mal lu d\'un côté, ou lien à écarter'}${l.origine === 'main' ? ' — lien confirmé à la main' : ` — lien de confiance ${l.confiance}`} | \`${l.de}\` → \`${l.vers}\` |`);
  }
  for (const p of P.values()) {
    const attendu = sexeDuPrenom(p.prenom);
    if (!attendu || !sexeSur(p) || attendu === p.sexe || dites.has(p.id) || protege(p.id, 'sexe')) continue;
    lignes.push(`| ${nomDe(p)}, ${p.sexe}, ${ageDit(p.age)}${p.profession ? ', ' + p.profession.toLowerCase() : ''}${p.lien_parente ? ', ' + p.lien_parente.toLowerCase() : ''} — ${ou(p)} | — | prénom d'ordinaire ${attendu === 'M' ? 'masculin' : 'féminin'}, sexe noté « ${p.sexe} » : prénom ou sexe à relire | \`${p.id}\` |`);
  }
  sections.push({
    cle: 'sexes',
    titre: 'Le sexe ne suit pas — d\'un recensement à l\'autre, ou sur la ligne même',
    ou: 'au manuscrit, colonne du sexe ; dans l\'atelier pour corriger la ligne, dans l\'annexe des filiations pour écarter le lien',
    intro: 'Deux lignes reliées comme une seule personne ne portent pas le même sexe, ou un prénom presque toujours masculin (ou féminin) porte l\'autre sexe. Les filiations comptent ces lignes telles quelles : un garçon noté « F » passe pour une fille dans les statistiques.',
    entete: '| Avant | Après | Ce qui cloche | Identifiants |\n|---|---|---|---|',
    lignes
  });
}

// ───────────── 12. l'âge ne suit pas le long d'un lien ─────────────
{
  const rangs = [];
  for (const l of d.filiation.liens || []) {
    const a = P.get(l.de), b = P.get(l.vers);
    if (!a || !b) continue;
    const ea = ageEnAnnees(a.age), eb = ageEnAnnees(b.age);
    if (ea == null || eb == null) continue;
    const ans = Number(b.annee) - Number(a.annee);
    const derive = eb - ea - ans;
    if (Math.abs(derive) < 6) continue;
    rangs.push({ poids: Math.abs(derive) + (ea < 15 ? 100 : 0), texte:
      `| ${nomDe(a)}, ${ageDit(a.age)} — ${ou(a)} | ${nomDe(b)}, ${ageDit(b.age)} — ${ou(b)} | ${eb - ea} ans de plus en ${ans} ans${ea < 15 ? ' — un enfant : un tel écart ne s\'explique pas par un âge arrondi' : ''}${l.origine === 'main' ? ' — lien confirmé à la main' : ` — lien de confiance ${l.confiance}`} | \`${l.de}\` → \`${l.vers}\` |` });
  }
  rangs.sort((x, y) => y.poids - x.poids);
  sections.push({
    cle: 'ages-liens',
    titre: 'L\'âge ne suit pas le long d\'un lien',
    ou: 'au manuscrit, colonne de l\'âge, des deux côtés ; dans l\'annexe des filiations si c\'est un homonyme (frère, cousin) qu\'il faut écarter',
    intro: 'Ces deux lignes sont reliées comme une seule personne, mais l\'âge avance de six ans de trop ou de trop peu. Chez un adulte c\'est souvent le recenseur ; chez un enfant, c\'est un chiffre mal lu (1 pour 7, 0 pour 6) ou un frère du même prénom. Les enfants sont en tête.',
    entete: '| Avant | Après | Écart | Identifiants |\n|---|---|---|---|',
    lignes: rangs.map((r) => r.texte)
  });
}

// ───────────── 13. le même ménage, un chef dont l'âge ne suit pas ─────────────
{
  const lignes = (d.filiation.evenements || []).filter((e) => e.type === 'age_incoherent').map((e) => {
    const a = P.get(e.personne), b = P.get(e.personne_apres);
    return `| ${a ? `${nomDe(a)}, ${ageDit(a.age)} — ${ou(a)}` : e.personne} | ${b ? `${nomDe(b)}, ${ageDit(b.age)} — ${ou(b)}` : e.personne_apres} | ${cell((e.motifs || [])[1] || '')} | \`${e.personne}\` → \`${e.personne_apres}\` |`;
  });
  sections.push({
    cle: 'ages-menages',
    titre: 'Le même ménage, un chef dont l\'âge ne suit pas',
    ou: 'au manuscrit, colonne de l\'âge ; puis dans l\'annexe des filiations pour confirmer le lien une fois l\'âge corrigé',
    intro: 'Le calcul reconnaît le ménage — plusieurs membres s\'y retrouvent ensemble — mais n\'a pas osé relier son chef d\'un recensement à l\'autre, tant les deux âges s\'écartent. L\'un des deux est vraisemblablement mal transcrit.',
    entete: '| Avant | Après | Ce qui tient le ménage | Identifiants |\n|---|---|---|---|',
    lignes
  });
}

// ───────────── 14. numérotation des maisons et des familles ─────────────
// Un numéro sauté par le recenseur n'est pas une faute ; une maison oubliée
// au dépouillement en est une. Le contrôle ne sait pas les distinguer : il
// montre les trous, et les numéros que le dépouillement a laissés douteux.
{
  const lignes = [];
  const plage = (a, b) => (a === b ? `${a}` : `${a} à ${b}`);
  for (const rec of d.recensements) {
    if (!(rec.maisons || []).length) continue;
    const jeu = `${rec.annee}, division ${rec.division}`;
    const nm = [], nf = [];
    let douteuses = 0, horsOrdre = 0, plusHaute = 0;
    for (const m of rec.maisons) {
      if (DOUTE.test(String(m.no_maison))) douteuses++;
      const n = parseInt(m.no_maison, 10);
      if (Number.isFinite(n)) { if (n < plusHaute) horsOrdre++; plusHaute = Math.max(plusHaute, n); nm.push(n); }
      for (const f of m.familles || []) { const k = parseInt(f.no_famille, 10); if (Number.isFinite(k)) nf.push(k); }
    }
    const trous = (liste) => {
      const pris = new Set(liste), sortie = [];
      let debut = null;
      for (let i = 1; i <= Math.max(...liste); i++) {
        if (!pris.has(i)) { if (debut == null) debut = i; } else if (debut != null) { sortie.push(plage(debut, i - 1)); debut = null; }
      }
      return sortie;
    };
    if (douteuses) lignes.push(`| ${jeu} | ${douteuses} maison(s) portent encore un numéro douteux « [?] »${horsOrdre ? `, et ${horsOrdre} sont rangées après une maison de numéro plus élevé` : ''} — le numéro se relit au manuscrit, et se change avec \`renumeroter.mjs\` |`);
    else if (horsOrdre) lignes.push(`| ${jeu} | ${horsOrdre} maison(s) rangée(s) après une maison de numéro plus élevé |`);
    const tm = trous(nm), tf = trous(nf);
    if (tm.length) lignes.push(`| ${jeu} | aucun numéro de maison ${tm.join(', ')} : numéro sauté par le recenseur, maison inhabitée, ou maison oubliée |`);
    if (tf.length) lignes.push(`| ${jeu} | aucun numéro de famille ${tf.join(', ')} : numéro sauté par le recenseur, ou famille fondue dans sa voisine |`);
  }
  sections.push({
    cle: 'numeros',
    titre: 'Numéros de maison et de famille : trous et numéros douteux',
    ou: 'au manuscrit, colonnes 1 à 5 ; un numéro de maison se change avec `outils/relecture-1881/renumeroter.mjs`, un numéro de famille dans l\'atelier',
    intro: 'La suite des numéros du recenseur devrait être continue. Un trou n\'est pas forcément une faute — le recenseur saute parfois un numéro, et une maison inhabitée n\'a pas de ligne —, mais c\'est là qu\'une maison oubliée ou une famille fondue dans la précédente se trahit.',
    entete: '| Recensement | Constat |\n|---|---|',
    lignes
  });
}

// ───────────── ce que Patrick a déjà répondu ─────────────
// Le relevé à cocher (outils/releve-verification.mjs) lui revient avec ses
// réponses ; elles sont consignées sous `releve` dans
// data/decisions-dictees.json, une entrée par point, sous la clé du point :
// la rubrique, puis les identifiants de la ligne. Un point répondu ne lui est
// pas reposé — il sort de la liste et n'est plus que compté. Un point dont la
// réponse n'a pas pu être consignée telle quelle (`attente` : la question à
// lui reposer) reste dans la liste, avec la question.
const cellules = (ligne) => ligne.replace(/^\|\s?/, '').replace(/\s?\|\s*$/, '').split(' | ').map((x) => x.trim());
const empreinte = (texte) => {
  let h = 2166136261;
  for (let i = 0; i < texte.length; i++) { h ^= texte.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
};
const cleDuPoint = (cle, ligne) => {
  const ids = [...ligne.matchAll(/`(\d{4}-D\d-P\d+-L\d+)`/g)].map((m) => m[1]);
  return `${cle}|${ids.length ? ids.join('+') : empreinte(cellules(ligne).join('|'))}`;
};
const releve = (() => {
  try { return JSON.parse(fs.readFileSync(path.join(RACINE, 'data', 'decisions-dictees.json'), 'utf8')).releve || {}; } catch { return {}; }
})();
for (const s of sections) {
  const gardees = [];
  s.cles = [];
  s.attentes = {};
  s.repondus = 0;
  for (const ligne of s.lignes) {
    const k = cleDuPoint(s.cle, ligne);
    // Un lien que Patrick a confirmé là où le calcul hésitait (chef du même
    // ménage, identité dite par un document) reparaît ensuite ici, parmi les
    // liens dont l'âge ne suit pas : c'est la même question, déjà répondue.
    const r = releve[k] || (s.cle === 'ages-liens'
      ? ['ages-menages', 'identites'].map((autre) => releve[k.replace(/^ages-liens\|/, autre + '|')]).find((x) => x && !x.attente)
      : undefined);
    if (r && !r.attente) { s.repondus++; continue; }
    gardees.push(ligne);
    s.cles.push(k);
    if (r) s.attentes[k] = { note: r.note || '', question: r.attente, resume: r.resume || '' };
  }
  s.lignes = gardees;
}

// ───────────── rapport ─────────────
const c = d.filiation.comptes;
let md = `# Contrôle des croisements

Produit par \`node outils/controle-croisements.mjs\` le ${new Date().toISOString().slice(0, 10)}. Ne pas le
corriger à la main : il est réécrit à chaque passage, et se vide à mesure que les
questions sont tranchées.

Il dresse la liste de ce que les données ne se disent pas encore entre elles —
ou se disent de travers. **Rien de ce qui suit n'a été modifié d'office** : chaque
section dit où la décision se prend.

| Section | À regarder | Déjà répondus |
|---|---|---|
${sections.map((s) => `| ${s.titre} | ${s.lignes.length} | ${s.repondus || ''} |`).join('\n')}

« Déjà répondus » : les points auxquels Patrick a répondu dans le relevé à cocher
(\`releve\`, dans \`data/decisions-dictees.json\`). Ils ne lui sont pas reposés.

État des rapprochements entre recensements : ${c.liens} liens, dont ${c.liens_forte} de
confiance forte, ${c.liens_moyenne} moyenne, ${c.liens_main} confirmés à la main,
${c.liens_par_menage || 0} proposés par le ménage ; ${c.veuvage} veuvages, ${c.age_incoherent} âges à vérifier.
`;
for (const s of sections) {
  md += `\n## ${s.titre} — ${s.lignes.length}\n\n${s.intro}\n\n**Où trancher :** ${s.ou}.\n\n`;
  md += s.lignes.length ? `${s.entete}\n${s.lignes.join('\n')}\n` : 'Rien à signaler.\n';
  const attentes = Object.entries(s.attentes);
  if (attentes.length) {
    md += `\n**Réponses de Patrick en attente d'une précision — ${attentes.length} :**\n\n`;
    md += attentes.map(([k, a]) => `- ${a.resume || k.split('|')[1]}${a.note ? ` — il a écrit « ${a.note} »` : ''}. ${a.question}`).join('\n') + '\n';
  }
  if (s.repondus) md += `\n${s.repondus} autre(s) point(s) de cette rubrique ont déjà reçu la réponse de Patrick.\n`;
}

const resume = sections.map((s) => `  ${String(s.lignes.length).padStart(4)}  ${s.titre}`).join('\n');
if (JSON_SEUL) {
  const docs = d.manifeste.documents || [];
  const jeux = d.recensements.filter((r) => (r.maisons || []).length).map((r) => ({
    annee: r.annee, division: r.division,
    personnes: [...d.personnes.values()].filter((p) => p.annee === String(r.annee) && p.division === String(r.division)).length
  }));
  console.log(JSON.stringify({
    date: new Date().toISOString().slice(0, 10),
    mesures: {
      personnes: d.personnes.size, jeux,
      documents: docs.length, actes: docs.filter((x) => x.type === 'notarie').length,
      rattachements: docs.reduce((n, x) => n + (x.personnes || []).filter((p) => p.ref_personne).length, 0),
      corrections_main: Object.keys(corrections()).length
    },
    comptes: c, sections
  }));
} else if (ESSAI) {
  console.log(md);
} else {
  fs.writeFileSync(path.join(RACINE, 'docs', 'CONTROLE-CROISEMENTS.md'), md);
  console.log(`${resume}\n\nRapport : docs/CONTROLE-CROISEMENTS.md`);
}
