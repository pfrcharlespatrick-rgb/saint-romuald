/* Analyse des liens de filiation entre les recensements de Saint-Romuald.
 *
 * Ce que fait ce programme
 * ------------------------
 * Il rapproche les personnes d'un recensement à l'autre (1871 → 1881 → 1891)
 * à partir du patronyme, du prénom, de la progression de l'âge et — surtout —
 * du voisinage domestique : si huit membres d'un ménage se retrouvent
 * ensemble dix ans plus tard, chacun des huit rapprochements se confirme
 * mutuellement. C'est cette corroboration collective qui distingue un
 * rapprochement solide d'une homonymie.
 *
 * Il en déduit ensuite des événements : la disparition d'un chef de ménage
 * suivie du veuvage de son épouse, l'essaimage d'un enfant qui fonde son
 * propre ménage, l'arrivée d'une famille inconnue.
 *
 * Ce qu'il ne fait pas
 * --------------------
 * Il ne tranche rien. Chaque lien porte un degré de confiance et la liste
 * des indices qui l'ont produit, pour que le chercheur puisse le vérifier ou
 * l'écarter. Les propositions automatiques ne remplacent jamais une preuve
 * documentaire : un acte de sépulture verse au dossier vaut mieux que le plus
 * beau score de ce programme, et l'annexe des documents est là pour ça.
 *
 * Deux réserves de méthode, à garder présentes à l'esprit
 * ------------------------------------------------------
 * 1. Les femmes changent de patronyme en se mariant. Une fille qui disparaît
 *    entre deux recensements n'est pas présumée morte : elle est signalée
 *    comme possiblement mariée, et le programme le dit explicitement.
 * 2. Les âges déclarés sont approximatifs. Un écart de dix ans exactement est
 *    l'exception, pas la règle ; la tolérance est donc large, ce qui ouvre la
 *    porte aux homonymes. D'où le poids donné au voisinage domestique.
 *
 * Usage : node outils/analyse-filiation.mjs
 * Écrit  : data/filiation-data.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  clesPrenom, clePatronyme, clesIndex, similarPatronyme, similarPrenom, ageEnAnnees, normaliser,
} from './noms.mjs';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* Jeux de données, groupés par année de recensement. Les limites de division
   ont bougé d'un recensement à l'autre : on rapproche donc à l'échelle de la
   paroisse entière, jamais division par division. */
const JEUX = [
  { annee: '1871', fichiers: ['recensement-1871-d1-data.js', 'recensement-1871-d2-data.js'], variables: ['RECENSEMENT_1871_D1', 'RECENSEMENT_1871_D2'] },
  { annee: '1881', fichiers: ['recensement-1881-d1-data.js', 'recensement-1881-d2-data.js'], variables: ['RECENSEMENT_1881_D1', 'RECENSEMENT_1881_D2'] },
  { annee: '1891', fichiers: ['recensement-1891-d1-data.js', 'recensement-1891-d2-data.js'], variables: ['RECENSEMENT_1891_D1', 'RECENSEMENT_1891_D2'] },
];

/* Jeux dont la colonne « sexe » est inexploitable et ne doit pas servir de
   preuve. 1881 division 2 porte 1 334 « F » pour 104 « M » : les fils
   navigateurs de la famille Lee y sont notés féminins. Le déséquilibre est
   mesuré au chargement, cette liste n'est qu'un garde-fou de dernier recours. */
const SEXE_DOUTEUX = new Set();

const SEUILS = { forte: 0.80, moyenne: 0.62, faible: 0.48 };

/* ─── Chargement ─────────────────────────────────────────────────────── */

/* Compléments de dépouillement, chargés par-dessus les recensements. Ils ne
   remplacent jamais une valeur attestée : ils comblent les colonnes vides ou
   corrigent une colonne dont le contrôle de cohérence a montré qu'elle est
   inexploitable. Voir outils/deduire-sexe.mjs. */
const COMPLEMENTS = ['complement-sexe-1881-d2-data.js'];

function chargerJeux() {
  const bac = {};
  const contexte = { window: bac };
  const fichiers = [...JEUX.flatMap(j => j.fichiers), ...COMPLEMENTS];
  for (const fichier of fichiers) {
    const chemin = path.join(RACINE, 'data', fichier);
    if (!fs.existsSync(chemin)) continue;
    const source = fs.readFileSync(chemin, 'utf8');
    // Les fichiers de données posent un objet sur `window` : on leur en fournit un.
    const fn = new Function('window', source);
    fn(contexte.window);
  }
  return bac;
}

/** Index id → sexe déduit, issu des fichiers de complément. */
function indexerSexesDeduits(bac) {
  const index = new Map();
  const c = bac.COMPLEMENT_SEXE_1881_D2;
  if (c && c.deductions) {
    for (const [id, d] of Object.entries(c.deductions)) {
      if (d && (d.sexe === 'M' || d.sexe === 'F')) index.set(id, d.sexe);
    }
  }
  return index;
}

/** Un jeu dont le sexe penche à plus de 75 % d'un côté est déclaré douteux. */
function verifierSexes(personnes) {
  const parJeu = new Map();
  for (const p of personnes) {
    const cle = `${p.annee}-D${p.division}`;
    if (!parJeu.has(cle)) parJeu.set(cle, { M: 0, F: 0, total: 0 });
    const c = parJeu.get(cle);
    if (p.sexe === 'M') c.M++;
    else if (p.sexe === 'F') c.F++;
    c.total++;
  }
  const anomalies = [];
  for (const [cle, c] of parJeu) {
    const connus = c.M + c.F;
    if (connus < 50) continue;
    const partMax = Math.max(c.M, c.F) / connus;
    if (partMax > 0.75) {
      SEXE_DOUTEUX.add(cle);
      anomalies.push({
        jeu: cle, hommes: c.M, femmes: c.F,
        note: `Répartition ${(partMax * 100).toFixed(0)} % d'un seul sexe sur ${connus} fiches — colonne vraisemblablement inexploitable. Le sexe n'a pas servi de preuve pour ce jeu.`,
      });
    }
  }
  return anomalies;
}

/** Aplatit les recensements en fiches de personnes enrichies de leur ménage. */
function extrairePersonnes(bac) {
  const personnes = [];
  const menages = new Map();
  const sexesDeduits = indexerSexesDeduits(bac);

  for (const jeu of JEUX) {
    for (const variable of jeu.variables) {
      const data = bac[variable];
      if (!data || !Array.isArray(data.maisons)) continue;
      const annee = data.annee || jeu.annee;
      const division = data.division || '';

      for (const maison of data.maisons) {
        for (const famille of maison.familles || []) {
          const cleMenage = `${annee}-D${division}-M${maison.no_maison}-F${famille.no_famille}`;
          const membres = famille.membres || [];

          menages.set(cleMenage, {
            cle: cleMenage, annee, division,
            no_maison: String(maison.no_maison ?? ''),
            no_famille: String(famille.no_famille ?? ''),
            chef: famille.chef || '',
            logement: maison.logement || null,
            membres: [],
          });

          membres.forEach((personne, rang) => {
            if (!personne || !personne.id) return;
            const estChef = personne.lien_parente
              ? normaliser(personne.lien_parente).startsWith('chef')
              : rang === 0;
            const fiche = {
              id: personne.id,
              annee, division,
              menage: cleMenage,
              no_maison: String(maison.no_maison ?? ''),
              no_famille: String(famille.no_famille ?? ''),
              rang,
              estChef,
              nom: personne.nom || '',
              prenom: personne.prenom || '',
              // Le complément ne recouvre que ce que le jeu d'origine ne peut
              // pas fournir de façon fiable ; le sexe attesté prime toujours.
              sexe: sexesDeduits.get(personne.id) || personne.sexe || '',
              sexe_deduit: sexesDeduits.has(personne.id) || undefined,
              age: ageEnAnnees(personne.age),
              ageBrut: personne.age || '',
              etat: personne.etat_matrimonial || '',
              lien_parente: personne.lien_parente || '',
              profession: personne.profession || '',
              page_ms: personne.page_ms || '',
              ligne: personne.ligne || '',
              clePatronyme: clePatronyme(personne.nom),
              clesPrenom: clesPrenom(personne.prenom),
            };
            personnes.push(fiche);
            menages.get(cleMenage).membres.push(fiche.id);
          });
        }
      }
    }
  }
  return { personnes, menages };
}

/* ─── Rapprochement ──────────────────────────────────────────────────── */

/** Note la progression d'âge attendue sur `ecartAnnees`. 0 = à rejeter. */
function noterAge(ageAvant, ageApres, ecartAnnees) {
  if (ageAvant == null || ageApres == null) return { note: 0.5, connu: false };
  const attendu = ageAvant + ecartAnnees;
  const derive = Math.abs(ageApres - attendu);
  // Les âges déclarés sont approximatifs : la tolérance est volontairement large.
  let note;
  if (derive <= 1) note = 1;
  else if (derive <= 2) note = 0.88;
  else if (derive <= 3) note = 0.7;
  else if (derive <= 4) note = 0.5;
  else if (derive <= 6) note = 0.28;
  else note = 0;
  // Un enfant né entre les deux recensements ne peut pas précéder son propre âge.
  if (ageApres < ecartAnnees - 2 && ageAvant > 0) note = 0;
  return { note, connu: true, derive };
}

function sexeFiable(fiche) {
  return fiche.sexe === 'M' || fiche.sexe === 'F'
    ? !SEXE_DOUTEUX.has(`${fiche.annee}-D${fiche.division}`)
    : false;
}

/** Score de base d'un couple de fiches, hors corroboration domestique. */
function scorerCouple(avant, apres, ecart) {
  const sPat = similarPatronyme(avant.clePatronyme, apres.clePatronyme);
  if (sPat < 0.6) return null;
  const sPre = similarPrenom(avant.clesPrenom, apres.clesPrenom);
  if (sPre < 0.5) return null;

  const age = noterAge(avant.age, apres.age, ecart);
  if (age.note === 0) return null;

  let score = 0.42 * sPat + 0.34 * sPre + 0.24 * age.note;

  const motifs = [];
  if (sPat === 1) motifs.push('patronyme identique');
  else motifs.push(`patronyme proche (${avant.nom} / ${apres.nom})`);
  if (sPre === 1) motifs.push('prénom concordant');
  else motifs.push(`prénom proche (${avant.prenom} / ${apres.prenom})`);
  if (age.connu) {
    motifs.push(age.derive <= 2
      ? `âge cohérent (${avant.age} → ${apres.age}, écart de ${ecart} ans)`
      : `âge plausible (${avant.age} → ${apres.age}, ${age.derive} an(s) de dérive)`);
  } else {
    motifs.push('âge non exploitable');
  }

  // Le sexe ne sert que lorsqu'il est fiable des deux côtés.
  if (sexeFiable(avant) && sexeFiable(apres)) {
    if (avant.sexe !== apres.sexe) {
      score -= 0.45;
      motifs.push(`sexe divergent (${avant.sexe} → ${apres.sexe})`);
    } else {
      score += 0.03;
      motifs.push('sexe concordant');
    }
  }

  if (score <= 0) return null;
  return { score, motifs, sPat, sPre, age };
}

/**
 * Rapproche deux recensements.
 * Passe 1 : couples plausibles, indexés par patronyme pour rester rapide.
 * Passe 2 : corroboration domestique — un ménage qui se retrouve en bloc
 *           confirme chacun de ses membres.
 * Passe 3 : attribution, au mieux-disant, en gardant les concurrents.
 */
function rapprocher(personnesAvant, personnesApres, ecart) {
  const parPatronyme = new Map();
  for (const p of personnesApres) {
    if (!p.clePatronyme) continue;
    for (const cle of clesIndex(p.clePatronyme)) {
      if (!parPatronyme.has(cle)) parPatronyme.set(cle, []);
      parPatronyme.get(cle).push(p);
    }
  }

  const couples = [];
  for (const avant of personnesAvant) {
    if (!avant.clePatronyme) continue;
    // Un même candidat peut tomber dans deux seaux : on ne le note qu'une fois.
    const vus = new Set();
    for (const cle of clesIndex(avant.clePatronyme)) {
      for (const apres of parPatronyme.get(cle) || []) {
        if (vus.has(apres.id)) continue;
        vus.add(apres.id);
        const note = scorerCouple(avant, apres, ecart);
        if (note) couples.push({ avant, apres, ...note });
      }
    }
  }

  // Passe 2 — corroboration domestique.
  const parMenages = new Map();
  for (const c of couples) {
    if (c.score < 0.5) continue;
    const cle = `${c.avant.menage} ${c.apres.menage}`;
    if (!parMenages.has(cle)) parMenages.set(cle, []);
    parMenages.get(cle).push(c);
  }
  const forceMenage = new Map();
  for (const [cle, liste] of parMenages) {
    // Un même individu ne compte qu'une fois dans la corroboration.
    const distincts = new Set(liste.map(c => c.avant.id)).size;
    forceMenage.set(cle, distincts);
  }

  for (const c of couples) {
    const cle = `${c.avant.menage} ${c.apres.menage}`;
    const compagnons = (forceMenage.get(cle) || 1) - 1;
    if (compagnons > 0) {
      const bonus = Math.min(0.26, 0.07 * compagnons);
      // Le score reste borné à 1 : au-delà, la confiance ne veut plus rien dire.
      c.score = Math.min(1, c.score + bonus);
      c.compagnons = compagnons;
      c.motifs.push(`${compagnons} autre(s) membre(s) du ménage se retrouvent ensemble`);
    } else {
      c.compagnons = 0;
    }
  }

  // Passe 3 — attribution. Le meilleur couple gagne ; les autres restent
  // consultables comme concurrents, jamais supprimés en silence.
  couples.sort((a, b) => b.score - a.score);
  const prisAvant = new Map();
  const prisApres = new Map();
  const retenus = [];
  const concurrents = new Map();

  for (const c of couples) {
    if (c.score < SEUILS.faible) continue;
    if (prisAvant.has(c.avant.id) || prisApres.has(c.apres.id)) {
      const detenteur = prisAvant.get(c.avant.id);
      if (detenteur && c.score >= detenteur.score - 0.12) {
        if (!concurrents.has(detenteur.avant.id)) concurrents.set(detenteur.avant.id, []);
        const liste = concurrents.get(detenteur.avant.id);
        if (liste.length < 2) {
          liste.push({ id: c.apres.id, score: Math.round(c.score * 100) / 100, resume: resumer(c.apres) });
        }
      }
      continue;
    }
    prisAvant.set(c.avant.id, c);
    prisApres.set(c.apres.id, c);
    retenus.push(c);
  }

  for (const c of retenus) {
    c.score = Math.min(1, c.score);
    c.concurrents = concurrents.get(c.avant.id) || [];
    // Un concurrent quasiment à égalité veut dire que le programme a tranché
    // entre deux homonymes sur presque rien. Le dire franchement plutôt que
    // d'afficher une confiance « forte » qui n'est pas méritée.
    const meilleurConcurrent = c.concurrents.length
      ? Math.max(...c.concurrents.map(x => x.score)) : 0;
    c.homonymie = meilleurConcurrent >= c.score - 0.05;
    if (c.homonymie) {
      c.motifs.push(`homonyme de force comparable dans le même recensement — le choix entre les deux ne repose pas sur les données disponibles`);
    }
  }
  return retenus;
}

function niveau(score, homonymie) {
  // L'ambiguïté d'homonymie plafonne la confiance, quel que soit le score.
  if (homonymie) return score >= SEUILS.moyenne ? 'moyenne' : 'faible';
  if (score >= SEUILS.forte) return 'forte';
  if (score >= SEUILS.moyenne) return 'moyenne';
  return 'faible';
}

function resumer(p) {
  const bouts = [`${p.prenom} ${p.nom}`.trim()];
  if (p.age != null) bouts.push(`${p.age} ans`);
  if (p.profession) bouts.push(p.profession);
  return `${bouts.join(', ')} — ${p.annee} D${p.division}, maison ${p.no_maison}`;
}

/* ─── Événements ─────────────────────────────────────────────────────── */

/**
 * Déduit les événements de ménage d'un intervalle : veuvage, essaimage,
 * disparition, arrivée. Chaque événement porte le raisonnement qui l'a produit.
 */
function deduireEvenements(liens, personnesAvant, personnesApres, menages, ecart, intervalle) {
  const evenements = [];
  const versApres = new Map(liens.map(l => [l.avant.id, l]));
  const depuisAvant = new Map(liens.map(l => [l.apres.id, l]));
  const ficheParId = new Map([...personnesAvant, ...personnesApres].map(p => [p.id, p]));

  // Ménages rapprochés : on compte les correspondances membre à membre.
  const paires = new Map();
  for (const l of liens) {
    const cle = `${l.avant.menage} ${l.apres.menage}`;
    if (!paires.has(cle)) paires.set(cle, []);
    paires.get(cle).push(l);
  }

  for (const [cle, liste] of paires) {
    const [cleAvant, cleApres] = cle.split(' ');
    const menageAvant = menages.get(cleAvant);
    const menageApres = menages.get(cleApres);
    if (!menageAvant || !menageApres || liste.length < 2) continue;

    const chefAvant = menageAvant.membres.map(id => ficheParId.get(id)).find(p => p && p.estChef);
    const chefApres = menageApres.membres.map(id => ficheParId.get(id)).find(p => p && p.estChef);

    evenements.push({
      type: 'menage_continu',
      intervalle,
      menage_avant: cleAvant,
      menage_apres: cleApres,
      membres_retrouves: liste.length,
      membres_avant: menageAvant.membres.length,
      membres_apres: menageApres.membres.length,
      confiance: liste.length >= 4 ? 'forte' : liste.length >= 3 ? 'moyenne' : 'faible',
      resume: `${menageAvant.chef || 'ménage'} (${menageAvant.annee}, maison ${menageAvant.no_maison}) → maison ${menageApres.no_maison} en ${menageApres.annee} — ${liste.length} membre(s) retrouvé(s)`,
    });

    /* Veuvage.
       Un chef masculin cesse de paraître, et son épouse se retrouve dans le
       ménage successeur : c'est la signature du veuvage. Les explications
       concurrentes — désertion, migration de travail — laisseraient l'épouse
       mariée, et le mari recensé ailleurs sous le même nom.

       La règle ne demande pas que la veuve prenne la tête du ménage. C'est le
       cas le plus visible, mais pas le plus fréquent : bien souvent un fils
       devient chef et la mère demeure sous son toit — Cécile Croteau, veuve,
       vit chez Joseph Croteau. Exiger qu'elle soit chef ferait manquer près
       des deux tiers des cas.

       Le fait est tenu pour établi. Ce qui reste inconnu, et que le résumé ne
       prétend pas savoir, c'est la date du décès : elle tombe quelque part
       dans l'intervalle. Un acte de sépulture versé aux documents la fixera.
       L'état matrimonial « V » au manuscrit, quand il est porté, atteste le
       veuvage en propre — la distinction est conservée dans `atteste`. */
    if (chefAvant && chefAvant.sexe === 'M' && !versApres.has(chefAvant.id) && liste.length >= 2) {
      // Épouse présumée : femme adulte du ménage d'origine, la première venue
      // au rôle, d'un âge proche de celui du chef.
      const epouse = menageAvant.membres
        .map(id => ficheParId.get(id))
        .filter(p => p && !p.estChef && p.sexe === 'F' && p.age != null && p.age >= 16
          && chefAvant.age != null && Math.abs(p.age - chefAvant.age) <= 15)
        .sort((a, b) => a.rang - b.rang)[0];

      const lienEpouse = epouse ? versApres.get(epouse.id) : null;
      const veuve = lienEpouse ? lienEpouse.apres : null;

      /* Garde-fou contre le faux veuvage par âge erroné.
         Si le ménage successeur est tenu par un homme qui porte le nom du chef
         disparu, ce n'est pas une succession : c'est le même homme, que le
         rapprochement a manqué parce que son âge est mal transcrit quelque
         part. Le cas est réel — James Thompson est noté 25 ans en 1871 alors
         qu'il a un fils de 12 ans, et se retrouve chef à 47 ans en 1881 avec
         la même épouse. Déclarer sa mort serait une erreur grave, et d'autant
         plus trompeuse qu'elle se lirait comme un fait établi.
         On refuse donc le veuvage, et on signale l'incohérence d'âge, qui est
         la vraie information à retenir. */
      const homonymeAuxCommandes = chefApres && chefApres.sexe === 'M'
        && similarPatronyme(chefApres.clePatronyme, chefAvant.clePatronyme) >= 0.85
        && similarPrenom(chefApres.clesPrenom, chefAvant.clesPrenom) >= 0.9;

      if (homonymeAuxCommandes) {
        evenements.push({
          type: 'age_incoherent',
          intervalle,
          personne: chefAvant.id,
          personne_apres: chefApres.id,
          menage_avant: cleAvant,
          menage_apres: cleApres,
          confiance: 'indicative',
          motifs: [
            `${chefAvant.prenom} ${chefAvant.nom} (${chefAvant.ageBrut} en ${chefAvant.annee}) n'a pas pu être rapproché de ${chefApres.prenom} ${chefApres.nom} (${chefApres.ageBrut} en ${chefApres.annee})`,
            `les deux tiennent pourtant le même ménage, et ${liste.length} membre(s) s'y retrouvent`,
            'la progression d\'âge est incompatible : l\'un des deux âges est vraisemblablement mal transcrit',
          ],
          resume: `Âge à vérifier — ${chefAvant.prenom} ${chefAvant.nom} : ${chefAvant.ageBrut} en ${chefAvant.annee}, ${chefApres.ageBrut} en ${chefApres.annee}, à la tête du même ménage`,
        });
      }

      if (veuve && veuve.menage === cleApres && !homonymeAuxCommandes) {
        const atteste = veuve.etat === 'V';
        const veuveEstChef = veuve.estChef;
        evenements.push({
          type: 'veuvage',
          intervalle,
          personne_disparue: chefAvant.id,
          personne_veuve: veuve.id,
          menage_avant: cleAvant,
          menage_apres: cleApres,
          confiance: 'forte',
          atteste,
          veuve_chef: veuveEstChef,
          motifs: [
            `${chefAvant.prenom} ${chefAvant.nom}, chef de ménage en ${chefAvant.annee}, ne reparaît pas en ${veuve.annee}`,
            `${veuve.prenom} ${veuve.nom}, son épouse présumée, se retrouve dans le ménage`,
            veuveEstChef
              ? 'elle est désormais à la tête du ménage'
              : `le ménage est tenu par ${menageApres.chef || 'un autre membre'}, chez qui elle demeure`,
            atteste
              ? 'état matrimonial « veuf/veuve » porté au manuscrit — le veuvage est attesté, non déduit'
              : 'état matrimonial non porté au manuscrit ; le veuvage se déduit de la disparition du mari et du maintien de l\'épouse au foyer',
            `${liste.length} membre(s) du ménage se retrouvent d'un recensement à l'autre`,
          ],
          resume: `${chefAvant.prenom} ${chefAvant.nom} meurt entre ${chefAvant.annee} et ${veuve.annee} ; ${veuve.prenom} ${veuve.nom} ${veuveEstChef ? 'prend la tête du ménage' : 'demeure chez ' + (menageApres.chef || 'un proche')}`,
        });
      }
    }
  }

  // Essaimage : un enfant du ménage fonde le sien. Une veuve qui prend la
  // tête du ménage familial n'essaime pas — elle reste chez elle, et
  // l'événement est déjà décrit comme un veuvage.
  const veuves = new Set(evenements.filter(e => e.type === 'veuvage').map(e => e.personne_veuve));
  for (const lien of liens) {
    const { avant, apres } = lien;
    if (avant.estChef || !apres.estChef) continue;
    if (veuves.has(apres.id)) continue;
    if (avant.age != null && avant.age > 40) continue; // un chef tardif n'est pas un essaimage
    evenements.push({
      type: 'essaimage',
      intervalle,
      personne: avant.id,
      personne_apres: apres.id,
      menage_origine: avant.menage,
      menage_fonde: apres.menage,
      confiance: niveau(lien.score, lien.homonymie),
      resume: `${apres.prenom} ${apres.nom} quitte le ménage de ${menages.get(avant.menage)?.chef || 'ses parents'} et devient chef de la maison ${apres.no_maison} en ${apres.annee}`,
      motifs: lien.motifs,
    });
  }

  /* Disparitions et arrivées.
     Elles sont nombreuses — c'est la mesure du renouvellement de population
     d'un port de bois — et se lisent surtout en masse. On les garde donc sous
     forme compacte : identité, ménage, et une catégorie d'hypothèse. Le nom
     et l'âge se retrouvent dans les données de recensement par l'identifiant,
     inutile de les recopier ici huit mille fois.

     `categorie` vaut :
       'mariage_possible' — femme en âge de se marier et non déclarée mariée :
                            son patronyme a pu changer, le rapprochement par
                            le nom ne peut structurellement pas la suivre.
                            Ne jamais lire cette disparition comme un décès.
       'depart_ou_deces'  — départ de la paroisse, décès, ou lacune de
                            dépouillement : les trois sont indiscernables ici. */
  for (const p of personnesAvant) {
    if (versApres.has(p.id)) continue;
    const femmeNubile = p.sexe === 'F' && p.age != null && p.age >= 12 && p.age <= 45 && p.etat !== 'M';
    evenements.push({
      type: 'disparition',
      intervalle,
      personne: p.id,
      menage: p.menage,
      confiance: 'indicative',
      categorie: femmeNubile ? 'mariage_possible' : 'depart_ou_deces',
    });
  }
  for (const p of personnesApres) {
    if (depuisAvant.has(p.id)) continue;
    if (p.age != null && p.age < ecart) continue; // né dans l'intervalle : normal
    evenements.push({
      type: 'arrivee',
      intervalle,
      personne: p.id,
      menage: p.menage,
      confiance: 'indicative',
    });
  }

  return evenements;
}

/* ─── Programme ──────────────────────────────────────────────────────── */

function main() {
  const bac = chargerJeux();
  const { personnes, menages } = extrairePersonnes(bac);
  const anomalies = verifierSexes(personnes);

  const parAnnee = new Map();
  for (const p of personnes) {
    if (!parAnnee.has(p.annee)) parAnnee.set(p.annee, []);
    parAnnee.get(p.annee).push(p);
  }

  const annees = [...parAnnee.keys()].sort();
  const liens = [];
  const evenements = [];

  for (let i = 0; i < annees.length - 1; i++) {
    const anneeAvant = annees[i];
    const anneeApres = annees[i + 1];
    const avant = parAnnee.get(anneeAvant) || [];
    const apres = parAnnee.get(anneeApres) || [];
    if (!avant.length || !apres.length) continue;

    const ecart = parseInt(anneeApres, 10) - parseInt(anneeAvant, 10);
    const intervalle = `${anneeAvant}-${anneeApres}`;
    process.stderr.write(`Rapprochement ${intervalle} : ${avant.length} → ${apres.length} personnes…\n`);

    const retenus = rapprocher(avant, apres, ecart);
    process.stderr.write(`  ${retenus.length} lien(s) retenu(s)\n`);

    for (const l of retenus) {
      liens.push({
        de: l.avant.id,
        vers: l.apres.id,
        intervalle,
        score: Math.round(l.score * 100) / 100,
        confiance: niveau(l.score, l.homonymie),
        homonymie: l.homonymie || undefined,
        origine: 'analyse',
        motifs: l.motifs,
        concurrents: l.concurrents,
        resume_de: resumer(l.avant),
        resume_vers: resumer(l.apres),
      });
    }

    evenements.push(...deduireEvenements(retenus, avant, apres, menages, ecart, intervalle));
  }

  /* Passe par-dessus le recensement intermédiaire.
     Le chaînage d'un recensement au suivant perd toute personne absente de
     celui du milieu — et l'absence est fréquente : on quitte la paroisse pour
     un chantier, on y revient dix ans plus tard. Albert Forcade est recensé en
     1871 puis en 1891, jamais en 1881 ; sans cette passe, ses deux mentions
     restent deux inconnus. On ne rapproche ici que ceux que les passes
     consécutives ont laissés sans rattachement, pour ne rien défaire de ce
     qu'elles ont établi. */
  if (annees.length >= 3) {
    const premiere = annees[0], derniere = annees[annees.length - 1];
    const dejaSortant = new Set(liens.map(l => l.de));
    const dejaEntrant = new Set(liens.map(l => l.vers));
    const orphelinsAvant = (parAnnee.get(premiere) || []).filter(p => !dejaSortant.has(p.id));
    const orphelinsApres = (parAnnee.get(derniere) || []).filter(p => !dejaEntrant.has(p.id));
    const ecart = parseInt(derniere, 10) - parseInt(premiere, 10);
    const intervalle = `${premiere}-${derniere}`;
    process.stderr.write(`Rapprochement ${intervalle} par-dessus ${annees[1]} : ${orphelinsAvant.length} → ${orphelinsApres.length} personnes sans rattachement…\n`);

    const retenus = rapprocher(orphelinsAvant, orphelinsApres, ecart);
    process.stderr.write(`  ${retenus.length} lien(s) retenu(s)\n`);

    for (const l of retenus) {
      liens.push({
        de: l.avant.id,
        vers: l.apres.id,
        intervalle,
        saut: annees[1],
        score: Math.round(l.score * 100) / 100,
        confiance: niveau(l.score, l.homonymie),
        homonymie: l.homonymie || undefined,
        origine: 'analyse',
        motifs: [...l.motifs, `absent du recensement de ${annees[1]} — rapprochement établi par-dessus`],
        concurrents: l.concurrents,
        resume_de: resumer(l.avant),
        resume_vers: resumer(l.apres),
      });
    }
    evenements.push(...deduireEvenements(retenus, orphelinsAvant, orphelinsApres, menages, ecart, intervalle)
      .filter(e => e.type !== 'disparition' && e.type !== 'arrivee'));
  }

  const comptes = {
    personnes: personnes.length,
    menages: menages.size,
    liens: liens.length,
    liens_forte: liens.filter(l => l.confiance === 'forte').length,
    liens_moyenne: liens.filter(l => l.confiance === 'moyenne').length,
    liens_faible: liens.filter(l => l.confiance === 'faible').length,
    liens_homonymie: liens.filter(l => l.homonymie).length,
    liens_par_dessus: liens.filter(l => l.saut).length,
  };
  for (const t of ['menage_continu', 'veuvage', 'essaimage', 'disparition', 'arrivee', 'age_incoherent']) {
    comptes[t] = evenements.filter(e => e.type === t).length;
  }

  const sortie = {
    format: 'filiation-saint-romuald',
    version: 1,
    genere_le: new Date().toISOString().slice(0, 10),
    methode: 'Rapprochement automatique par patronyme, prénom, progression de l\'âge et corroboration domestique. Aucun lien n\'est une preuve : chacun porte ses indices et doit être validé par le chercheur.',
    seuils: SEUILS,
    comptes,
    anomalies_donnees: anomalies,
    liens,
    evenements,
  };

  const chemin = path.join(RACINE, 'data', 'filiation-data.js');
  fs.writeFileSync(chemin, `window.FILIATION = ${JSON.stringify(sortie)};\n`);
  process.stderr.write(`\nÉcrit : ${chemin}\n`);
  process.stderr.write(`${JSON.stringify(comptes, null, 2)}\n`);
  if (anomalies.length) {
    process.stderr.write(`\nAnomalies de données relevées :\n`);
    for (const a of anomalies) process.stderr.write(`  - ${a.jeu} : ${a.note}\n`);
  }
}

main();
