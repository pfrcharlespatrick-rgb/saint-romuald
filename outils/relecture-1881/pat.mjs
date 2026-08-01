import { load, save, persons } from './lib.mjs';
export function apply(fn) {
  const { D, prefix, suffix } = load();
  const idx = new Map();
  for (const r of persons(D)) idx.set(`${r.p.page_ms}:${r.p.ligne}`, r);
  let n = 0;
  const R = (o) => `Relecture du manuscrit : ${o}`;
  const set = (page, lignes, champs, o = {}) => {
    for (const l of lignes) {
      const r = idx.get(`${page}:${l}`); if (!r) throw new Error(`ligne absente ${page}:${l}`);
      Object.assign(r.p, champs);
      if (o.inc !== undefined) r.p.incertain = o.inc;
      if (o.rem) r.p.remarque = r.p.remarque ? `${r.p.remarque} ${o.rem}` : o.rem;
      n++;
    }
  };
  const chef = (page, ligne, v) => { idx.get(`${page}:${ligne}`).famille.chef = v; };
  fn({ set, chef, R });
  save(D, prefix, suffix);
  console.log('champs modifiés sur', n, 'lignes');
}
