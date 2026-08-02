/* Interface : formulaire client, fiche parfumeur, partage. */

const $ = (sel) => document.querySelector(sel);

const ETAT_INITIAL = {
  recit: '',
  emotions: [],
  curseurs: { lumiere: 0, temperature: 0, presence: 0, caractere: 0, texture: 0 },
  saison: 'toutes',
  moment: 'indifferent',
  exclusions: [],
  concentration: 'edp'
};

let etat = structuredClone(ETAT_INITIAL);
let vueParfumeur = true;

/* ------------------------------------------------------------------ */
/* Construction du formulaire                                          */
/* ------------------------------------------------------------------ */

function construireEmotions() {
  $('#emotions').innerHTML = EMOTIONS.map((e) => `
    <button type="button" class="emotion" data-emotion="${e.id}" aria-pressed="false">
      <span class="titre">${e.icone} ${e.nom}</span>
      <span class="phrase">${e.phrase}</span>
    </button>`).join('');

  $('#emotions').addEventListener('click', (ev) => {
    const bouton = ev.target.closest('[data-emotion]');
    if (!bouton) return;
    const id = bouton.dataset.emotion;
    etat.emotions = etat.emotions.includes(id)
      ? etat.emotions.filter((x) => x !== id)
      : [...etat.emotions, id];
    rafraichir();
  });
}

function construireCurseurs() {
  $('#curseurs').innerHTML = CURSEURS.map((c) => `
    <div class="curseur">
      <div class="legende">
        <span data-cote="${c.id}-gauche">${c.gauche}</span>
        <span data-cote="${c.id}-droite">${c.droite}</span>
      </div>
      <input type="range" min="-100" max="100" step="5" value="0"
             data-curseur="${c.id}" aria-label="${c.gauche} vers ${c.droite}">
    </div>`).join('');

  $('#curseurs').addEventListener('input', (ev) => {
    const champ = ev.target.closest('[data-curseur]');
    if (!champ) return;
    etat.curseurs[champ.dataset.curseur] = Number(champ.value) / 100;
    rafraichir();
  });
}

function construireExclusions() {
  const zone = $('#exclusions');
  zone.insertAdjacentHTML('beforeend', EXCLUSIONS.map((x) => `
    <label><input type="checkbox" data-exclusion="${x.id}"> ${x.nom}</label>`).join(''));

  zone.addEventListener('change', (ev) => {
    const champ = ev.target.closest('[data-exclusion]');
    if (!champ) return;
    const id = champ.dataset.exclusion;
    etat.exclusions = champ.checked
      ? [...etat.exclusions, id]
      : etat.exclusions.filter((x) => x !== id);
    rafraichir();
  });
}

function brancherChamps() {
  let minuterie;
  $('#recit').addEventListener('input', (ev) => {
    etat.recit = ev.target.value;
    clearTimeout(minuterie);
    minuterie = setTimeout(rafraichir, 280);
  });
  ['saison', 'moment', 'concentration'].forEach((id) => {
    $('#' + id).addEventListener('change', (ev) => { etat[id] = ev.target.value; rafraichir(); });
  });
}

/* ------------------------------------------------------------------ */
/* Reflet de l'état dans le formulaire                                 */
/* ------------------------------------------------------------------ */

function refleterFormulaire() {
  $('#recit').value = etat.recit;
  document.querySelectorAll('[data-emotion]').forEach((b) => {
    b.setAttribute('aria-pressed', etat.emotions.includes(b.dataset.emotion) ? 'true' : 'false');
  });
  document.querySelectorAll('[data-curseur]').forEach((c) => {
    c.value = (etat.curseurs[c.dataset.curseur] || 0) * 100;
  });
  document.querySelectorAll('[data-exclusion]').forEach((c) => {
    c.checked = etat.exclusions.includes(c.dataset.exclusion);
  });
  ['saison', 'moment', 'concentration'].forEach((id) => { $('#' + id).value = etat[id]; });

  // le côté du curseur vers lequel on penche s'allume
  CURSEURS.forEach((c) => {
    const v = etat.curseurs[c.id] || 0;
    const g = document.querySelector(`[data-cote="${c.id}-gauche"]`);
    const d = document.querySelector(`[data-cote="${c.id}-droite"]`);
    g.classList.toggle('actif', v < -.15);
    d.classList.toggle('actif', v > .15);
  });
}

function afficherDetections() {
  const lu = analyserRecit(etat.recit);
  const nouvelles = lu.emotions.filter((id) => !etat.emotions.includes(id));
  const facettes = Object.keys(lu.facettes);

  if (!nouvelles.length && !facettes.length) {
    $('#detections').innerHTML = etat.recit.trim()
      ? '<em>Aucun mot reconnu pour l\'instant — les émotions choisies ci-dessous prennent le relais.</em>'
      : '';
    return;
  }

  const jetonsEmotions = nouvelles.map((id) => {
    const e = EMOTIONS.find((x) => x.id === id);
    return `<button type="button" class="jeton" data-emotion="${id}">${e.icone} ${e.nom} +</button>`;
  }).join('');
  const jetonsFacettes = facettes
    .map((f) => `<span class="jeton">${FACETTES[f]}</span>`).join('');

  $('#detections').innerHTML =
    `Dans votre texte : ${jetonsEmotions}${jetonsFacettes}` +
    (nouvelles.length ? ' <em>— cliquez pour confirmer une émotion.</em>' : '');

  $('#detections').querySelectorAll('[data-emotion]').forEach((b) => {
    b.addEventListener('click', () => {
      etat.emotions = [...etat.emotions, b.dataset.emotion];
      rafraichir();
    });
  });
}

/* ------------------------------------------------------------------ */
/* Fiche                                                               */
/* ------------------------------------------------------------------ */

const nb = (x, d = 1) => x.toFixed(d).replace('.', ',');

function ligneMatiere(l, avecChiffres) {
  const m = l.matiere;
  return `
    <tr>
      <td class="nom">${m.nom}<span class="etiquette-nature">${m.nature}</span>
        ${m.latin ? `<small>${m.latin}</small>` : ''}</td>
      <td class="note">${m.note}</td>
      ${avecChiffres ? `<td class="chiffre">${nb(l.pct)} %</td>
                        <td class="chiffre">${nb(l.pct / 10, 2)} g</td>` : ''}
    </tr>`;
}

function tableEtage(titre, classe, lignes, part, avecChiffres) {
  if (!lignes.length) return '';
  return `
  <div class="etage ${classe}">
    <h3>${titre} <span class="part">${nb(part)} % du concentré</span></h3>
    <table class="formule">
      <thead><tr>
        <th>Matière</th><th>Caractère</th>
        ${avecChiffres ? '<th style="text-align:right">Part</th><th style="text-align:right">Pour 10 g</th>' : ''}
      </tr></thead>
      <tbody>${lignes.map((l) => ligneMatiere(l, avecChiffres)).join('')}</tbody>
    </table>
  </div>`;
}

function barres(items, libelle, valeur, unite = '%') {
  return `<div class="barres">${items.map((i) => `
    <div class="barre">
      <span>${libelle(i)}</span>
      <span class="piste"><span class="remplissage" style="width:${Math.round(valeur(i))}%"></span></span>
      <span class="valeur">${Math.round(valeur(i))}${unite}</span>
    </div>`).join('')}</div>`;
}

function renderFiche(c) {
  const emos = c.emotionsRetenues.map((e) => `${e.icone} ${e.nom}`).join(' · ') || 'à préciser';
  const p = c.pyramide;

  const partsAlcool = {
    edt: .10, edp: .175, extrait: .25
  }[c.etat.concentration];

  $('#fiche').innerHTML = `
    <h2 class="titre-fiche">Fiche de composition</h2>
    <p style="margin:0;color:var(--encre-doux)">${emos}
       — ${c.concentration.nom} (${c.concentration.plage}), tenue estimée ${c.concentration.tenue}.</p>

    <p class="intention">${c.intention}</p>

    <div class="bandeau-outils">
      <button class="action pleine" id="basculer-vue">${vueParfumeur ? 'Vue client (sans dosages)' : 'Vue parfumeur (avec dosages)'}</button>
      <button class="action" id="imprimer">Imprimer la fiche</button>
      <button class="action" id="copier">Copier le texte</button>
      <button class="action" id="json">Exporter en JSON</button>
      <button class="action" id="lien">Copier le lien de partage</button>
    </div>

    ${tableEtage('Notes de tête', 'tete', p.tete, c.equilibre.tete, vueParfumeur)}
    ${tableEtage('Notes de cœur', 'coeur', p.coeur, c.equilibre.coeur, vueParfumeur)}
    ${tableEtage('Notes de fond', 'fond', p.fond, c.equilibre.fond, vueParfumeur)}

    ${vueParfumeur && c.diluant > .5 ? `
    <div class="avertissement" style="margin-bottom:26px">
      <h4>Solvant de mise au point — ${nb(c.diluant)} % du concentré</h4>
      <p style="margin:0">Les exclusions demandées réduisent fortement la palette : les matières
         retenues ne peuvent pas, à leurs dosages usuels, remplir le concentré. Le solde est
         complété au DPG (ou à l'éthanol), ce qui est une pratique courante. Pour un concentré plus
         dense, il faudrait lever une exclusion ou élargir la palette de la maison.</p>
    </div>` : ''}

    <div class="deux-colonnes">
      <div>
        <h3 style="font-size:15px">Familles dominantes</h3>
        ${barres(c.familles.slice(0, 7), (f) => f.nom, (f) => f.pct)}
      </div>
      <div>
        <h3 style="font-size:15px">Profil olfactif</h3>
        ${barres(c.profil.slice(0, 7), (f) => f.nom, (f) => f.part * 100)}
      </div>
    </div>

    ${vueParfumeur ? `
    <div class="avertissement">
      <h4>Mise en alcool et points de vigilance</h4>
      <p style="margin:0 0 8px">Pour <strong>30 mL</strong> de jus fini en ${c.concentration.nom.toLowerCase()} :
         environ <strong>${nb(30 * partsAlcool, 1)} g</strong> de concentré dans
         <strong>${nb(30 * (1 - partsAlcool), 1)} mL</strong> d'éthanol à 96°,
         plus 1 à 3 % d'eau distillée si l'on veut arrondir. Macération conseillée : 3 à 6 semaines au frais et à l'abri de la lumière.</p>
      ${c.alertes.length ? `<ul>${c.alertes.map((a) => `<li><strong>${a.nom}</strong> — ${a.texte}</li>`).join('')}</ul>`
                          : '<p style="margin:0">Aucune matière de la sélection ne porte de restriction particulière ; vérifier malgré tout le calcul des allergènes déclarables.</p>'}
    </div>` : ''}
  `;

  $('#basculer-vue').addEventListener('click', () => { vueParfumeur = !vueParfumeur; rafraichir(); });
  $('#imprimer').addEventListener('click', () => window.print());
  $('#copier').addEventListener('click', (ev) => copier(texteFiche(c), ev.target));
  $('#json').addEventListener('click', () => exporterJson(c));
  $('#lien').addEventListener('click', (ev) => copier(lienPartage(), ev.target));
}

/* ------------------------------------------------------------------ */
/* Exports                                                             */
/* ------------------------------------------------------------------ */

function texteFiche(c) {
  const bloc = (titre, lignes, part) =>
    `${titre.toUpperCase()} (${nb(part)} %)\n` +
    lignes.map((l) => `  ${l.matiere.nom} — ${nb(l.pct)} % (${nb(l.pct / 10, 2)} g pour 10 g)`).join('\n');

  return [
    'FICHE DE COMPOSITION',
    'Émotions : ' + (c.emotionsRetenues.map((e) => e.nom).join(', ') || '—'),
    'Concentration : ' + c.concentration.nom + ' (' + c.concentration.plage + ')',
    '',
    c.intention,
    '',
    bloc('Notes de tête', c.pyramide.tete, c.equilibre.tete),
    '',
    bloc('Notes de cœur', c.pyramide.coeur, c.equilibre.coeur),
    '',
    bloc('Notes de fond', c.pyramide.fond, c.equilibre.fond),
    c.diluant > .5 ? `\nSOLVANT DE MISE AU POINT (DPG ou éthanol) — ${nb(c.diluant)} %` : '',
    '',
    'Familles dominantes : ' + c.familles.slice(0, 5).map((f) => `${f.nom} ${Math.round(f.pct)} %`).join(', '),
    c.alertes.length ? '\nVigilance :\n' + c.alertes.map((a) => `  - ${a.nom} : ${a.texte}`).join('\n') : '',
    '',
    'Dosages indicatifs, à valider par le parfumeur (IFRA, allergènes, équilibre réel).'
  ].join('\n');
}

function exporterJson(c) {
  const donnees = {
    version: 1,
    demande: c.etat,
    emotions: c.emotionsRetenues.map((e) => e.nom),
    intention: c.intention,
    concentration: c.concentration,
    equilibre: c.equilibre,
    formule: ['tete', 'coeur', 'fond'].flatMap((role) =>
      c.pyramide[role].map((l) => ({
        role,
        id: l.matiere.id,
        nom: l.matiere.nom,
        famille: l.matiere.famille,
        nature: l.matiere.nature,
        pourcentage: Number(l.pct.toFixed(2))
      }))),
    solvant: Number(c.diluant.toFixed(2)),
    familles: c.familles.map((f) => ({ nom: f.nom, pourcentage: Number(f.pct.toFixed(1)) })),
    vigilance: c.alertes
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(donnees, null, 2)], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'fiche-composition.json';
  a.click();
  URL.revokeObjectURL(url);
}

function copier(texte, bouton) {
  const fini = () => {
    const avant = bouton.textContent;
    bouton.textContent = 'Copié ✓';
    setTimeout(() => { bouton.textContent = avant; }, 1600);
  };
  if (navigator.clipboard) navigator.clipboard.writeText(texte).then(fini, () => {});
  else {
    const z = document.createElement('textarea');
    z.value = texte; document.body.appendChild(z); z.select();
    document.execCommand('copy'); z.remove(); fini();
  }
}

/* --- partage par lien : l'état tient dans le fragment d'URL --- */

function encoder(objet) {
  const octets = new TextEncoder().encode(JSON.stringify(objet));
  return btoa(String.fromCharCode(...octets)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decoder(chaine) {
  const b64 = chaine.replace(/-/g, '+').replace(/_/g, '/');
  const brut = atob(b64 + '==='.slice((b64.length + 3) % 4));
  const octets = Uint8Array.from(brut, (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(octets));
}

function lienPartage() {
  const url = new URL(location.href);
  url.hash = 'd=' + encoder(etat);
  history.replaceState(null, '', url);
  return url.toString();
}

function lireLien() {
  const h = location.hash.replace(/^#/, '');
  if (!h.startsWith('d=')) return;
  try {
    const lu = decoder(h.slice(2));
    etat = Object.assign(structuredClone(ETAT_INITIAL), lu);
    etat.curseurs = Object.assign({}, ETAT_INITIAL.curseurs, lu.curseurs || {});
  } catch (e) {
    console.warn('Lien de partage illisible', e);
  }
}

/* ------------------------------------------------------------------ */

function rafraichir() {
  refleterFormulaire();
  afficherDetections();

  const rienDeChoisi = !etat.emotions.length && !analyserRecit(etat.recit).emotions.length
    && !Object.keys(analyserRecit(etat.recit).facettes).length;

  if (rienDeChoisi) {
    $('#fiche').innerHTML = `<p style="color:var(--encre-doux)">
      <em>Racontez quelque chose ou choisissez au moins une émotion : la fiche de composition
      s'écrit toute seule, ici même.</em></p>`;
    return;
  }
  renderFiche(composer(etat));
}

construireEmotions();
construireCurseurs();
construireExclusions();
brancherChamps();
lireLien();
rafraichir();
