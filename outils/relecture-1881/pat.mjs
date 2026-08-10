import { load, save, persons } from './lib.mjs';
import { filtrer } from './atelier.mjs';
/* Une correction faite à la main dans l'atelier l'emporte — voir CLAUDE.md. */
export function apply(fn) {
  const { D, prefix, suffix } = load();
  const idx = new Map();
  for (const r of persons(D)) idx.set(`${r.p.page_ms}:${r.p.ligne}`, r);
  let n = 0; const refuses = [];
  const R = (o) => `Relecture du manuscrit : ${o}`;
  const set = (page, lignes, champs, o = {}) => {
    for (const l of lignes) {
      const r = idx.get(`${page}:${l}`); if (!r) throw new Error(`ligne absente ${page}:${l}`);
      const { retenus, refuses: laisses, tranchee } = filtrer(r.p, champs, `p${page}:${l}`);
      refuses.push(...laisses);
      if (!Object.keys(retenus).length && !o.rem) continue;
      Object.assign(r.p, retenus);
      // Une ligne corrigée à la main est tranchée : ni drapeau, ni remarque ajoutée.
      if (!tranchee) {
        if (o.inc !== undefined) r.p.incertain = o.inc;
        if (o.rem) r.p.remarque = r.p.remarque ? `${r.p.remarque} ${o.rem}` : o.rem;
      }
      n++;
    }
  };
  const chef = (page, ligne, v) => { idx.get(`${page}:${ligne}`).famille.chef = v; };
  fn({ set, chef, R });
  save(D, prefix, suffix);
  console.log('champs modifiés sur', n, 'lignes');
  if (refuses.length) {
    console.log('\n' + refuses.length + ' champ(s) laissé(s) à la main de Patrick :');
    for (const m of refuses) console.log('  ' + m);
  }
}
