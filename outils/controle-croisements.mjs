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
//
// À relancer après un versement de l'atelier ou une série d'actes : la liste
// se vide à mesure que les questions sont tranchées.

import fs from 'node:fs';
import path from 'node:path';
import { chargerDonnees, cleMaison, RACINE } from './lib/charger-donnees.mjs';
import { clePatronyme, similarPatronyme, normaliser, distance, ageEnAnnees } from './noms.mjs';
import { corrections } from './relecture-1881/atelier.mjs';

const ESSAI = process.argv.includes('--essai');
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
  sections.push({
    titre: 'Lignes incomplètes ou renvois cassés',
    ou: 'dans l\'atelier pour une ligne de recensement ; dans le fichier nommé pour un renvoi',
    intro: 'Ce qu\'un contrôle mécanique relève : un prénom manquant, un sexe douteux, un renvoi vers un identifiant disparu.',
    entete: '| Où | Qui | Ce qui cloche |\n|---|---|---|',
    lignes
  });
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

| Section | À regarder |
|---|---|
${sections.map((s) => `| ${s.titre} | ${s.lignes.length} |`).join('\n')}

État des rapprochements entre recensements : ${c.liens} liens, dont ${c.liens_forte} de
confiance forte, ${c.liens_moyenne} moyenne, ${c.liens_main} confirmés à la main,
${c.liens_par_menage || 0} proposés par le ménage ; ${c.veuvage} veuvages, ${c.age_incoherent} âges à vérifier.
`;
for (const s of sections) {
  md += `\n## ${s.titre} — ${s.lignes.length}\n\n${s.intro}\n\n**Où trancher :** ${s.ou}.\n\n`;
  md += s.lignes.length ? `${s.entete}\n${s.lignes.join('\n')}\n` : 'Rien à signaler.\n';
}

const resume = sections.map((s) => `  ${String(s.lignes.length).padStart(4)}  ${s.titre}`).join('\n');
if (ESSAI) {
  console.log(md);
} else {
  fs.writeFileSync(path.join(RACINE, 'docs', 'CONTROLE-CROISEMENTS.md'), md);
  console.log(`${resume}\n\nRapport : docs/CONTROLE-CROISEMENTS.md`);
}
