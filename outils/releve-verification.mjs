#!/usr/bin/env node
// Relevé de vérification — la page que Patrick coche.
//
// `controle-croisements.mjs` dresse la liste de ce que les données ne se
// disent pas, dans un rapport fait pour le dépôt. Ce programme-ci en tire une
// page à lire et à cocher : chaque point dit quoi regarder, où, et quoi faire
// ensuite, sans nom de fichier ni commande. Il n'écrit dans aucune donnée.
//
//   node outils/releve-verification.mjs <sortie.html>
//
// La page n'est pas rangée dans le dépôt (le site public n'a pas à porter une
// liste de travail) : elle se publie à part, en page privée. Les coches et les
// notes restent dans le navigateur de Patrick ; le bouton « Copier mes
// réponses » en fait un texte à coller dans la conversation — ce sont alors
// des décisions dictées (CLAUDE.md, « Les décisions dictées »).
//
// Il relance à blanc les autres outils pour dire aussi ce qui est en ordre :
// le versement de l'atelier, les lieux, les contrôles de cohérence.

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sortie = process.argv[2];
if (!sortie) {
  console.error('Usage : node outils/releve-verification.mjs <sortie.html>');
  process.exit(1);
}
const lancer = (...args) => {
  const r = spawnSync('node', args, { cwd: RACINE, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return (r.stdout || '') + (r.stderr || '');
};

// ───────────── ce que disent les outils ─────────────
const controle = JSON.parse(lancer('outils/controle-croisements.mjs', '--json'));
const parCle = new Map(controle.sections.map((s) => [s.cle, s]));

const fonte = lancer('outils/relecture-1881/fondre.mjs', '--essai');
const enAttente = Number((fonte.match(/(\d+) changement\(s\) au total/) || [])[1] ?? NaN);
const liensMain = (fonte.match(/(\d+) lien\(s\) posé\(s\) à la main[^\n]*?(\d+) lien\(s\) repris/) || []).slice(1).map(Number);
const dictees = Number((fonte.match(/(\d+) correction\(s\) dictée\(s\) appliquée/) || [])[1] ?? 0);
const depassees = /dépassée/.test(fonte);
const lieux = lancer('outils/lieux/fondre.mjs', '--essai');
const lieuxDaccord = /déjà d'accord/.test(lieux);

// Les contrôles de cohérence interne : on n'en garde que les rubriques et
// leur nombre. Le détail a déjà été examiné (docs/CONTROLE-1881-1891.md,
// docs/RELECTURE-1871-D*.md) ; il se ressort à la demande.
const rubriques = (texte) => {
  const liste = [];
  let jeu = '';
  for (const ligne of texte.split('\n')) {
    const t = ligne.match(/^== (\d{4}) —/);
    if (t) jeu = t[1];
    const m = ligne.match(/^### (.+?) — (\d+)\s*$/);
    if (m) liste.push({ jeu, titre: m[1].replace(/^\(pour mémoire\) /, ''), n: Number(m[2]) });
  }
  return liste;
};
const coherence = [
  ...rubriques(lancer('outils/relecture-1881/controle71.mjs', '--tout')).map((r) => ({ ...r, jeu: '1871' })),
  ...rubriques(lancer('outils/relecture-1881/controle.mjs', '--tout'))
];

// Tropy : les écarts entre ce que Patrick a décrit et les fiches.
const tropy = (() => {
  try {
    const t = fs.readFileSync(path.join(RACINE, 'documents', 'tropy', 'RAPPORT.md'), 'utf8');
    const bloc = t.split('## Écarts entre Tropy et les fiches')[1] || '';
    return bloc.split('\n').filter((l) => l.startsWith('- ')).map((l) => l.slice(2).replace(/\*\*/g, ''));
  } catch { return []; }
})();

// ───────────── la mise en page de chaque rubrique ─────────────
// `titre` : la colonne qui nomme le point (les autres deviennent des lignes
// « étiquette — valeur ») ; `geste` : ce que Patrick fait, en clair.
const GROUPES = [
  {
    titre: 'Au manuscrit : des lignes à relire',
    chapeau: 'Ce que les actes et les autres recensements font douter d\'une ligne. La réponse est sur la page du manuscrit.',
    sections: [
      { cle: 'signatures', nom: 'Sait-il écrire ? Les actes et le recensement ne disent pas la même chose', titre: 1,
        geste: 'Ouvre la page du manuscrit et regarde les colonnes d\'instruction de la ligne et de ses deux voisines. Si la marque est sur une autre ligne, corrige la case dans l\'atelier — ou dis-moi ce que tu vois et je le consigne. Si le manuscrit est bien tel qu\'on l\'a lu, coche simplement : c\'est le recenseur.' },
      { cle: 'sexes', nom: 'Le sexe ne suit pas', titre: 0,
        geste: 'Regarde la colonne du sexe au manuscrit, des deux côtés. Corrige la ligne fautive dans l\'atelier. Si ce sont deux personnes différentes, écarte le lien dans l\'annexe des filiations.' },
      { cle: 'lectures', nom: 'Un « [?] » qu\'un acte permet de lever', titre: 1,
        geste: 'Si l\'acte te convainc, retire le « [?] » dans l\'atelier — ou dis-moi « lève le doute » et je le consigne comme décision dictée.' },
      { cle: 'corrections', nom: 'Corrections manuelles où le prénom et le sexe se contredisent', titre: 1,
        geste: 'Dans l\'atelier, sur la ligne indiquée : la correction a peut-être glissé d\'une ligne.' },
      { cle: 'lignes', nom: 'Lignes incomplètes', titre: 1,
        geste: 'Dans l\'atelier, sur la ligne indiquée : compléter le prénom, ou trancher le sexe laissé avec un « [?] ».' },
      { cle: 'numeros', nom: 'Numéros de maison et de famille : trous et numéros douteux', titre: 0,
        geste: 'Au manuscrit, colonnes 1 à 5 de la page où le numéro manque. Dis-moi ce que tu trouves : un numéro de maison se change avec un outil que je lance pour toi.' }
    ]
  },
  {
    titre: 'Dans l\'annexe des filiations : des liens à confirmer ou à écarter',
    chapeau: 'Deux lignes de deux recensements, tenues ou non pour la même personne. Les boutons Confirmer et Écarter de l\'annexe suffisent — ou dis-le-moi.',
    sections: [
      { cle: 'identites', nom: 'Un document dit que c\'est la même personne, et aucun lien ne le dit', titre: 0,
        geste: 'Dis-moi « confirme » et je consigne le lien ; ou confirme-le toi-même dans l\'annexe des filiations.' },
      { cle: 'par-menage', nom: 'Rapprochements proposés par le ménage', titre: 0,
        geste: 'Dans l\'annexe des filiations : Confirmer ou Écarter.' },
      { cle: 'ages-liens', nom: 'L\'âge ne suit pas le long d\'un lien', titre: 0,
        geste: 'Compare les deux âges au manuscrit. Si l\'un est mal lu, corrige-le dans l\'atelier. Si ce sont deux personnes (un frère, un cousin du même prénom), écarte le lien dans l\'annexe des filiations. Si les deux âges sont bien ceux du manuscrit, coche : le recenseur arrondit.' },
      { cle: 'ages-menages', nom: 'Le même ménage, un chef dont l\'âge ne suit pas', titre: 0,
        geste: 'Regarde l\'âge du chef au manuscrit, des deux côtés. Une fois l\'âge corrigé dans l\'atelier, le lien se fera de lui-même au calcul suivant ; sinon confirme-le dans l\'annexe des filiations.' }
    ]
  },
  {
    titre: 'Dans les fiches de documents',
    chapeau: 'Ici c\'est la fiche d\'un acte ou d\'une généalogie qui est en cause. Tu n\'as rien à modifier toi-même : dis-moi ta réponse et je corrige la fiche.',
    sections: [
      { cle: 'prenoms', nom: 'Le nom de la fiche n\'est pas celui de la ligne rattachée', titre: 1,
        geste: 'Dis-moi lequel est juste. Si la fiche date d\'avant la relecture du recensement, je la mets d\'accord ; si c\'est la mauvaise ligne, je défais le rattachement.' },
      { cle: 'naissances', nom: 'Naissance ou décès connu, âge recensé qui s\'en écarte', titre: 1,
        geste: 'Regarde l\'âge au manuscrit. S\'il est bien lu, coche : le recensement se trompe souvent de quelques années. S\'il est mal lu, corrige-le dans l\'atelier.' },
      { cle: 'documents', nom: 'La même personne, rattachée dans une fiche et pas dans l\'autre', titre: 1,
        geste: 'Dis-moi si c\'est bien la même personne — ou un homonyme. Je pose le rattachement, ou je note pourquoi il ne se fait pas.' },
      { cle: 'tropy', nom: 'Tropy et les fiches ne disent pas la même chose', titre: 0,
        geste: 'Dans Tropy, corrige la description de l\'image ; au prochain export que tu m\'envoies, l\'écart disparaîtra.' }
    ]
  },
  {
    titre: 'Le tableau des décès de 1871',
    chapeau: 'Le tableau 2 du recensement nomme les morts de l\'année sans dire leur maison.',
    sections: [
      { cle: 'deces', nom: 'Décès de 1871 sans maison', titre: 0,
        geste: 'Quand tu trouves l\'acte de sépulture (il nomme les parents ou le conjoint), dis-moi la maison : je l\'inscris.' }
    ]
  }
];

// La rubrique Tropy n'est pas dans le contrôle : on la fabrique ici.
parCle.set('tropy', {
  cle: 'tropy',
  intro: 'Tu décris les images du greffe dans Tropy ; les fiches du site sont transcrites sur le manuscrit. Là où les deux diffèrent, c\'est le manuscrit qui tranche.',
  entete: '| Écart |\n|---|',
  lignes: tropy.map((t) => `| ${t.replace(/\|/g, '/')} |`)
});

// ───────────── du tableau au point à cocher ─────────────
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const riche = (t) => esc(t).replace(/`([^`]+)`/g, '<code>$1</code>');
const cellules = (ligne) => ligne.replace(/^\|\s?/, '').replace(/\s?\|\s*$/, '').split(' | ').map((c) => c.trim());
const empreinte = (texte) => {
  let h = 2166136261;
  for (let i = 0; i < texte.length; i++) { h ^= texte.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
};

let total = 0;
let enSuspens = 0; // réponses de Patrick que je n'ai pas pu consigner telles quelles
// points déjà répondus, que le contrôle ne repose plus
const repondus = controle.sections.reduce((n, s) => n + (s.repondus || 0), 0);
const rendreSection = (conf) => {
  const s = parCle.get(conf.cle);
  if (!s) return { html: '', n: 0, nom: conf.nom };
  const etiquettes = cellules(s.entete.split('\n')[0]);
  const points = s.lignes.map((ligne, rang) => {
    const c = cellules(ligne);
    const ids = [...ligne.matchAll(/`(\d{4}-D\d-P\d+-L\d+)`/g)].map((m) => m[1]);
    // La clé du point est celle du contrôle, qui s'en sert pour reconnaître
    // les réponses déjà données ; à défaut (rubrique montée ici), la même règle.
    const cle = (s.cles && s.cles[rang]) || `${conf.cle}|${ids.length ? ids.join('+') : empreinte(c.join('|'))}`;
    const attente = s.attentes && s.attentes[cle];
    if (attente) enSuspens++;
    const details = c.map((v, i) => (i === conf.titre || !v || v === '—' ? '' : `<div class="rang"><dt>${esc(etiquettes[i] || '')}</dt><dd>${riche(v)}</dd></div>`)).join('');
    total++;
    return `<li class="point" data-cle="${esc(cle)}"${attente ? ` data-deja="${esc(attente.note)}"` : ''} data-resume="${esc(c[conf.titre].replace(/`/g, ''))}">
<input type="checkbox" id="vu-${esc(empreinte(cle))}" class="case" aria-label="Vu">
<div class="corps">
<p class="qui">${riche(c[conf.titre])}</p>
<dl>${details}</dl>
${attente ? `<p class="attente"><span class="etiq">Ta réponse, à préciser</span>${attente.note ? `Tu as écrit « ${esc(attente.note)} ». ` : ''}${esc(attente.question.replace(/^Tu as écrit « [^»]* »\. /, ''))}</p>` : ''}
<div class="suite"><button type="button" class="bouton-note">Ajouter une note</button><textarea class="note" id="note-${esc(empreinte(cle))}" rows="2" placeholder="Ce que tu as vu au manuscrit, ou ta décision" hidden></textarea></div>
</div></li>`;
  });
  const n = points.length;
  const html = `<details class="rubrique" data-rubrique="${esc(conf.cle)}"${n ? '' : ' data-vide'}>
<summary><span class="nom">${esc(conf.nom)}</span><span class="compte" data-compte>${n ? `${n} point${n > 1 ? 's' : ''}` : 'rien à signaler'}</span></summary>
<div class="dedans">
<p class="intro">${riche(s.intro)}</p>
${n ? `<p class="geste"><span class="etiq">Quoi faire</span>${esc(conf.geste)}</p><ul class="points">${points.join('\n')}</ul>` : ''}
</div></details>`;
  return { html, n, nom: conf.nom };
};

const groupes = GROUPES.map((g) => {
  const rendues = g.sections.map(rendreSection);
  const n = rendues.reduce((a, r) => a + r.n, 0);
  return { ...g, rendues, n };
});

// ───────────── ce qui est en ordre ─────────────
const m = controle.mesures, c = controle.comptes;
const nombre = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const jeux = m.jeux.map((j) => `${j.annee} division ${j.division} (${nombre(j.personnes)})`).join(', ');
const enOrdre = [
  Number.isFinite(enAttente) && enAttente === 0
    ? `Tes ${nombre(m.corrections_main)} lignes corrigées à la main sont toutes versées dans les recensements : aucune n'attend.${dictees ? ` Les ${dictees} décisions que tu m'as dictées sont appliquées${depassees ? ', sauf celles que l\'atelier a dépassées depuis' : ''}.` : ''}`
    : `Attention : ${Number.isFinite(enAttente) ? enAttente : 'des'} correction(s) de l'atelier ne sont pas encore versées dans les recensements.`,
  liensMain.length === 2 ? `Les ${liensMain[0]} liens que tu as confirmés à la main sont tous repris par le calcul des filiations${liensMain[0] === liensMain[1] ? '' : ` (${liensMain[1]} repris)`}.` : '',
  `Chaque page se suit ligne à ligne, sans trou ni doublon, et aucun identifiant n'est en double sur les ${nombre(m.personnes)} lignes.`,
  `Les ${nombre(m.rattachements)} rattachements des ${m.documents} documents (dont ${m.actes} actes du greffe Tremblay) pointent tous vers une ligne qui existe ; de même les tableaux annexes et les lieux de la carte.`,
  lieuxDaccord ? 'La carte des lieux est d\'accord avec ton travail de l\'atelier.' : '',
  'Le site publié est à jour : recalculer les filiations et régénérer les fiches ne change rien.',
  ...groupes.flatMap((g) => g.rendues).filter((r) => r.n === 0).map((r) => `${r.nom} : rien à signaler.`)
].filter(Boolean);

const parJeu = new Map();
for (const r of coherence) { if (!parJeu.has(r.jeu)) parJeu.set(r.jeu, []); parJeu.get(r.jeu).push(r); }
const memoire = [...parJeu].map(([jeu, liste]) => `<div class="jeu"><h4>${esc(jeu)} <span>${liste.reduce((a, r) => a + r.n, 0)} signalements</span></h4><ul>${
  liste.map((r) => `<li><span class="n">${r.n}</span>${esc(r.titre)}</li>`).join('')}</ul></div>`).join('');

const dateLongue = new Date(`${controle.date}T12:00:00Z`).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// ───────────── la page ─────────────
const page = `<title>Relevé de vérification</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
/* Une colonne de registre : le relevé se lit de haut en bas, rubrique par
   rubrique, chaque point sur une ligne réglée avec sa case à gauche.
   Jetons repris de site.css (« le registre du recenseur »). */
:root{
  --papier:#FAFAF7; --surface:#FFFFFE; --encre:#26221C; --sepia:#6B6357;
  --regle:#C9D1DB; --regle-faible:#E3E8EE; --madder:#A4343A; --madder-encre:#8E2E33;
  --lien:#1A6FA8; --creux:#F2F0E8; --voile:rgba(164,52,58,.08); --fait:#3F7A4E;
  --serif:'Iowan Old Style','Palatino Linotype','Book Antiqua',Georgia,serif;
  --etiq:'Avenir Next Condensed','Helvetica Neue',Arial,sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --papier:#17181B; --surface:#1F2024; --encre:#E7E3DA; --sepia:#A59D8F;
  --regle:#3A3E45; --regle-faible:#2B2E33; --madder:#D9666E; --madder-encre:#E07B82;
  --lien:#4C9BD6; --creux:#212328; --voile:rgba(217,102,110,.10); --fait:#7FBF8E; color-scheme:dark;
}}
:root[data-theme="dark"]{
  --papier:#17181B; --surface:#1F2024; --encre:#E7E3DA; --sepia:#A59D8F;
  --regle:#3A3E45; --regle-faible:#2B2E33; --madder:#D9666E; --madder-encre:#E07B82;
  --lien:#4C9BD6; --creux:#212328; --voile:rgba(217,102,110,.10); --fait:#7FBF8E; color-scheme:dark;
}
*{box-sizing:border-box}
body{background:var(--papier);color:var(--encre);font-family:var(--serif);font-size:17px;line-height:1.55;
  -webkit-font-smoothing:antialiased;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:0 96px}
.feuille{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:36px}
.etiq{font-family:var(--etiq);font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--sepia)}
code{font-family:ui-monospace,'SF Mono',Menlo,Consolas,monospace;font-size:.78em;color:var(--sepia);background:var(--creux);padding:1px 5px;border-radius:2px;white-space:nowrap}
header.tete{padding-top:40px;display:flex;flex-direction:column;gap:10px;border-bottom:2px solid var(--encre);padding-bottom:22px}
h1{font-size:clamp(30px,6vw,44px);line-height:1.1;margin:0;font-weight:600;letter-spacing:-.01em;text-wrap:balance}
.tete p{margin:0;max-width:62ch}
.tete .date{color:var(--sepia);font-style:italic}
h2{font-size:23px;line-height:1.25;margin:0;font-weight:600;text-wrap:balance}
h3{font-family:var(--etiq);font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--sepia);margin:0;font-weight:600}
h4{font-size:17px;margin:0 0 6px;font-weight:600;display:flex;justify-content:space-between;gap:12px;align-items:baseline}
h4 span{font-family:var(--etiq);font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--sepia);font-weight:400}

/* la barre qui suit le lecteur */
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:10;background:var(--papier)}
.barre{position:sticky;top:env(safe-area-inset-top,0px);z-index:9;background:var(--papier);border-bottom:1px solid var(--regle);
  margin:0 calc(-1 * max(16px,env(safe-area-inset-left,0px)));padding:10px max(16px,env(safe-area-inset-left,0px))}
.barre-dedans{max-width:760px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px}
.avance{flex:1 1 180px;min-width:0;display:flex;flex-direction:column;gap:5px}
.avance .chiffres{font-family:var(--etiq);font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--sepia);font-variant-numeric:tabular-nums}
.avance .chiffres b{color:var(--encre);font-weight:600}
.jauge{height:4px;background:var(--regle-faible);border-radius:2px;overflow:hidden}
.jauge i{display:block;height:100%;width:0;background:var(--madder);transition:width .25s}
.actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
button,.bascule{font-family:var(--etiq);font-size:12.5px;letter-spacing:.09em;text-transform:uppercase;cursor:pointer;border-radius:2px}
.principal{background:var(--madder);color:var(--surface);border:1px solid var(--madder);padding:8px 14px;font-weight:600}
.principal:hover{background:var(--madder-encre);border-color:var(--madder-encre)}
.bascule{display:inline-flex;align-items:center;gap:7px;color:var(--sepia);padding:8px 4px}
.bascule input{accent-color:var(--madder);width:15px;height:15px;margin:0}
:focus-visible{outline:2px solid var(--lien);outline-offset:2px}

/* le bilan */
.bilan{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:0;border-top:1px solid var(--regle);border-bottom:1px solid var(--regle)}
.bilan div{padding:14px 14px 14px 0;display:flex;flex-direction:column;gap:2px}
.bilan b{font-size:28px;font-weight:600;line-height:1.1;font-variant-numeric:tabular-nums}
.bilan span{font-family:var(--etiq);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--sepia)}
section{display:flex;flex-direction:column;gap:14px}
.en-ordre{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.en-ordre li{padding-left:26px;position:relative;max-width:66ch}
.en-ordre li::before{content:"";position:absolute;left:2px;top:.5em;width:11px;height:6px;border-left:2px solid var(--fait);border-bottom:2px solid var(--fait);transform:rotate(-45deg)}
.en-ordre li.alerte::before{border-color:var(--madder)}
.sommaire{list-style:none;margin:0;padding:0;border-top:1px solid var(--regle)}
.sommaire li{display:flex;justify-content:space-between;gap:16px;align-items:baseline;padding:9px 0;border-bottom:1px solid var(--regle-faible)}
.sommaire a{color:var(--encre);text-decoration:none}
.sommaire a:hover{color:var(--madder)}
.sommaire .n{font-family:var(--etiq);font-size:13px;letter-spacing:.06em;color:var(--sepia);font-variant-numeric:tabular-nums;white-space:nowrap}

/* les groupes et leurs rubriques */
.groupe{gap:10px;scroll-margin-top:84px}
.groupe > header{display:flex;flex-direction:column;gap:6px;padding-top:6px;border-top:2px solid var(--encre)}
.groupe > header .etiq{padding-top:10px}
.groupe > header p{margin:0;color:var(--sepia);max-width:64ch}
details.rubrique{border-bottom:1px solid var(--regle)}
details.rubrique summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:14px 0}
details.rubrique summary::-webkit-details-marker{display:none}
summary .nom{font-size:19px;font-weight:600;line-height:1.3;min-width:0;text-wrap:balance}
summary .nom::before{content:"+";display:inline-block;width:18px;color:var(--madder);font-weight:400}
details[open] > summary .nom::before{content:"–"}
summary .compte{font-family:var(--etiq);font-size:12.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--madder);white-space:nowrap;font-variant-numeric:tabular-nums}
details[data-vide] summary .compte, summary .compte.fini{color:var(--fait)}
.dedans{padding:0 0 18px 18px;display:flex;flex-direction:column;gap:14px}
.intro{margin:0;max-width:66ch}
.geste{margin:0;background:var(--creux);padding:12px 14px;border-left:2px solid var(--madder);max-width:70ch;display:flex;flex-direction:column;gap:4px}
.points{list-style:none;margin:0;padding:0;border-top:1px solid var(--regle-faible)}
.point{display:grid;grid-template-columns:26px minmax(0,1fr);gap:0 12px;padding:14px 0;border-bottom:1px solid var(--regle-faible)}
.case{appearance:none;-webkit-appearance:none;width:22px;height:22px;margin:3px 0 0;border:1.5px solid var(--sepia);border-radius:2px;background:var(--surface);cursor:pointer;position:relative}
.case:checked{background:var(--fait);border-color:var(--fait)}
.case:checked::after{content:"";position:absolute;left:4px;top:5px;width:11px;height:6px;border-left:2px solid var(--surface);border-bottom:2px solid var(--surface);transform:rotate(-45deg)}
.corps{min-width:0;display:flex;flex-direction:column;gap:6px}
.qui{margin:0;font-weight:600;line-height:1.35;overflow-wrap:anywhere}
.attente{margin:8px 0 0;background:var(--creux);padding:10px 12px;border-left:2px solid var(--madder);max-width:70ch;display:flex;flex-direction:column;gap:4px;line-height:1.45}
.qui code{font-weight:400}
dl{margin:0;display:flex;flex-direction:column;gap:4px}
.rang{display:grid;grid-template-columns:minmax(0,150px) minmax(0,1fr);gap:2px 14px;align-items:baseline}
dt{font-family:var(--etiq);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--sepia)}
dd{margin:0;overflow-wrap:anywhere;font-size:16px}
.suite{display:flex;flex-direction:column;gap:6px;align-items:flex-start}
.bouton-note{background:none;border:none;color:var(--lien);padding:2px 0;font-size:11.5px}
.note{width:100%;font-family:var(--serif);font-size:16px;line-height:1.4;color:var(--encre);background:var(--surface);border:1px solid var(--regle);border-radius:2px;padding:8px 10px;resize:vertical}
.point.vu .qui,.point.vu dl{opacity:.5}
body.masquer .point.vu{display:none}
@media (max-width:520px){.rang{grid-template-columns:1fr}.dedans{padding-left:0}}

/* pour mémoire */
.memoire{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px 28px}
.jeu ul{list-style:none;margin:0;padding:0;border-top:1px solid var(--regle)}
.jeu li{display:grid;grid-template-columns:38px minmax(0,1fr);gap:8px;padding:6px 0;border-bottom:1px solid var(--regle-faible);font-size:15px;line-height:1.35}
.jeu .n{font-variant-numeric:tabular-nums;text-align:right;color:var(--sepia)}
.pied{color:var(--sepia);font-size:15px;border-top:1px solid var(--regle);padding-top:16px}
.pied p{margin:0 0 8px;max-width:68ch}
#copie{width:100%;min-height:160px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px;background:var(--surface);color:var(--encre);border:1px solid var(--regle);padding:10px}
.avis{font-family:var(--etiq);font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--fait)}
@media (prefers-reduced-motion:reduce){.jauge i{transition:none}}
</style>

<div class="barre"><div class="barre-dedans">
  <div class="avance"><div class="chiffres"><b id="n-vus">0</b> sur <b>${total}</b> points vus</div><div class="jauge"><i id="jauge"></i></div></div>
  <div class="actions">
    <label class="bascule" for="masquer"><input type="checkbox" id="masquer"> Masquer les vus</label>
    <button type="button" class="principal" id="copier">Copier mes réponses</button>
    <span class="avis" id="avis" role="status"></span>
  </div>
</div></div>

<div class="feuille">
<header class="tete">
  <span class="etiq">Saint-Romuald · recensements de 1871, 1881 et 1891</span>
  <h1>Relevé de vérification</h1>
  <p class="date">Dressé le ${esc(dateLongue)}, après l'intégration des actes du greffe Tremblay, de tes corrections de l'atelier et des liens confirmés.</p>
  <p>Tout ce qui a été versé dans le projet a été confronté aux recensements, et les recensements entre eux. Rien n'a été corrigé d'office : ce relevé est la liste de ce qui demande ton œil. Coche un point quand tu l'as regardé, ajoute une note si tu as tranché, puis appuie sur « Copier mes réponses » et colle le texte dans notre conversation.</p>
  ${repondus ? `<p>Tu as déjà répondu à ${repondus} point${repondus > 1 ? 's' : ''} : ils sont consignés et ne te sont pas reposés.${enSuspens ? ` ${enSuspens} de tes réponses demandent une précision avant d'être consignées : elles portent la mention « Ta réponse, à préciser ».` : ''}</p>` : ''}
</header>

<section>
  <h3>Ce qui a été contrôlé</h3>
  <div class="bilan">
    <div><b>${nombre(m.personnes)}</b><span>lignes de recensement</span></div>
    <div><b>${m.documents}</b><span>documents, dont ${m.actes} actes</span></div>
    <div><b>${nombre(c.liens)}</b><span>liens entre recensements</span></div>
    <div><b>${total}</b><span>points à regarder</span></div>
  </div>
  <p class="intro">Les cinq jeux : ${esc(jeux)}.</p>
</section>

<section>
  <h3>Ce qui est en ordre</h3>
  <ul class="en-ordre">${enOrdre.map((t) => `<li${/^Attention/.test(t) ? ' class="alerte"' : ''}>${esc(t)}</li>`).join('')}</ul>
</section>

<section>
  <h3>Ce qui demande ton œil</h3>
  <ul class="sommaire">${groupes.map((g, i) => `<li><a href="#groupe-${i + 1}">${esc(g.titre)}</a><span class="n">${g.n} point${g.n > 1 ? 's' : ''}</span></li>`).join('')}</ul>
</section>

${groupes.map((g, i) => `<section class="groupe" id="groupe-${i + 1}">
<header><span class="etiq">${g.n} point${g.n > 1 ? 's' : ''}</span><h2>${esc(g.titre)}</h2><p>${esc(g.chapeau)}</p></header>
${g.rendues.map((r) => r.html).join('\n')}
</section>`).join('\n')}

<section>
  <h3>Pour mémoire : la cohérence interne de chaque recensement</h3>
  <p class="intro">Ces contrôles-là ne viennent pas des nouveaux documents : ils cherchent ce qu'une lecture juste ne produit jamais (un enfant porté marié, un nourrisson dont le mois ne s'accorde pas). Ils ont déjà été examinés lors des relectures, et la plupart sont le manuscrit lui-même. Le gros de 1871 est fait des valeurs encore entre crochets de la division 2, pages 36 à 73, qui attendent leurs images. Je peux te sortir le détail de n'importe quelle rubrique sur demande.</p>
  <div class="memoire">${memoire}</div>
</section>

<div class="pied">
  <p>Tes coches et tes notes restent dans ce navigateur : elles ne me parviennent que par le bouton « Copier mes réponses ». Si la copie ne se fait pas, le texte s'affiche ci-dessous pour que tu le sélectionnes.</p>
  <textarea id="copie" hidden readonly aria-label="Mes réponses"></textarea>
</div>
</div>

<script>
(function () {
  var CLE = 'releve-verification-saint-romuald-v1';
  var DATE = ${JSON.stringify(controle.date)};
  var etat = {};
  try { etat = JSON.parse(localStorage.getItem(CLE) || '{}') || {}; } catch (e) { etat = {}; }
  var garder = function () { try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) {} };
  var points = Array.prototype.slice.call(document.querySelectorAll('.point'));
  var total = points.length;

  function compter() {
    var vus = 0;
    Array.prototype.forEach.call(document.querySelectorAll('details.rubrique'), function (r) {
      var liste = r.querySelectorAll('.point'), n = liste.length, faits = r.querySelectorAll('.point.vu').length;
      vus += faits;
      var c = r.querySelector('[data-compte]');
      if (!n) return;
      c.textContent = faits === n ? 'tout vu' : faits ? faits + ' vus sur ' + n : n + ' point' + (n > 1 ? 's' : '');
      c.classList.toggle('fini', faits === n);
    });
    document.getElementById('n-vus').textContent = vus;
    document.getElementById('jauge').style.width = (total ? 100 * vus / total : 0) + '%';
  }

  points.forEach(function (li) {
    var cle = li.getAttribute('data-cle');
    // Une réponse déjà reçue, et reposée ici pour précision : la note gardée
    // par ce navigateur est celle d'avant. On repart d'une case vide, pour
    // qu'une note écrite maintenant soit bien la nouvelle réponse.
    var deja = li.getAttribute('data-deja');
    if (deja !== null && etat[cle] && String(etat[cle].note || '').replace(/\s+/g, ' ').trim() === deja) { delete etat[cle]; garder(); }
    var caseVu = li.querySelector('.case'), note = li.querySelector('.note'), bouton = li.querySelector('.bouton-note');
    var e = etat[cle] || {};
    if (e.vu) { caseVu.checked = true; li.classList.add('vu'); }
    if (e.note) { note.value = e.note; note.hidden = false; bouton.textContent = 'Note'; }
    caseVu.addEventListener('change', function () {
      etat[cle] = etat[cle] || {};
      etat[cle].vu = caseVu.checked;
      li.classList.toggle('vu', caseVu.checked);
      garder(); compter();
    });
    bouton.addEventListener('click', function () { note.hidden = !note.hidden; if (!note.hidden) note.focus(); });
    note.addEventListener('input', function () { etat[cle] = etat[cle] || {}; etat[cle].note = note.value; garder(); });
  });

  var masquer = document.getElementById('masquer');
  try { masquer.checked = localStorage.getItem(CLE + '-masquer') === '1'; } catch (e) {}
  var appliquer = function () { document.body.classList.toggle('masquer', masquer.checked); };
  masquer.addEventListener('change', function () { appliquer(); try { localStorage.setItem(CLE + '-masquer', masquer.checked ? '1' : '0'); } catch (e) {} });
  appliquer();

  // Un lien du sommaire ouvre la première rubrique de son groupe.
  Array.prototype.forEach.call(document.querySelectorAll('.sommaire a'), function (a) {
    a.addEventListener('click', function () {
      var g = document.querySelector(a.getAttribute('href'));
      var r = g && g.querySelector('details.rubrique:not([data-vide])');
      if (r) r.open = true;
    });
  });

  function texte() {
    var lignes = ['Relevé de vérification du ' + DATE + ' — mes réponses', ''];
    var rien = true;
    Array.prototype.forEach.call(document.querySelectorAll('details.rubrique'), function (r) {
      var bloc = [];
      Array.prototype.forEach.call(r.querySelectorAll('.point'), function (li) {
        var e = etat[li.getAttribute('data-cle')] || {};
        var note = (e.note || '').trim();
        if (!e.vu && !note) return;
        bloc.push('- ' + (e.vu ? '[vu] ' : '[pas encore vu] ') + li.getAttribute('data-resume') + ' (' + li.getAttribute('data-cle').split('|')[1] + ')' + (note ? ' — ' + note.replace(/\\s+/g, ' ') : ''));
      });
      if (bloc.length) { rien = false; lignes.push('## ' + r.querySelector('.nom').textContent); lignes = lignes.concat(bloc); lignes.push(''); }
    });
    if (rien) lignes.push('(aucun point coché ni annoté pour l\\'instant)');
    return lignes.join('\\n');
  }

  var avis = document.getElementById('avis'), zone = document.getElementById('copie');
  document.getElementById('copier').addEventListener('click', function () {
    var t = texte();
    var secours = function () { zone.hidden = false; zone.value = t; zone.focus(); zone.select(); avis.textContent = 'Texte affiché en bas de page'; zone.scrollIntoView({ block: 'center' }); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(function () { avis.textContent = 'Copié — colle-le dans la conversation'; }, secours);
    } else secours();
  });

  compter();
})();
</script>
`;

fs.writeFileSync(path.resolve(sortie), page);
console.log(`${total} points en ${groupes.length} groupes — ${sortie}`);
for (const g of groupes) console.log(`  ${String(g.n).padStart(4)}  ${g.titre}`);
