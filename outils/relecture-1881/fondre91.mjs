import { fondreAtelier } from './pat91.mjs';
/* Verse dans le recensement de 1891 division 1 ce que la main a corrigé dans
   l'atelier, et retire de ces lignes les traces des relectures automatiques.

     node fondre91.mjs [--essai]

   L'atelier garde ses corrections à part, dans data/travail-personnel.json : sur
   ses propres écrans elles s'appliquent par-dessus les données, mais le site
   public, lui, lit les recensements. Verser les corrections est donc ce qui les
   rend visibles partout — et ce qui met le fichier d'accord avec la main. */
const essai = process.argv.includes('--essai');
const faits = fondreAtelier({ essai });
console.log(faits.length ? faits.join('\n') : 'rien à fondre : le fichier est déjà d\'accord avec l\'atelier');
if (faits.length) console.log('\n' + faits.length + (essai ? ' changement(s) — essai à blanc, rien écrit' : ' changement(s) écrit(s)'));
