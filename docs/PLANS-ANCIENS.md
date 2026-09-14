# Les plans anciens — ce qu'il faudra pour les reposer

*Retirés du dépôt le 14 septembre 2026, sur décision de Patrick : leurs calages
étaient approximatifs, et mieux vaut repartir des numéros de lot et des renvois
Goad, qu'il ajoute aux notes des lieux, que d'un ancrage posé à l'œil.*

Ce document garde tout ce qui ne se retrouve pas d'un clic : les cotes d'archives,
ce que chaque feuille montre, et surtout **ce que le calage a appris** — y compris
ses échecs. Les images elles-mêmes ont été supprimées ; elles se retéléchargent aux
adresses ci-dessous.

## Comment on les remettra

1. Retélécharger les feuilles aux cotes BAnQ données plus bas, dans `assets/plans/`.
2. Recréer une entrée par plan dans `data/plans-data.js` (le format est décrit dans
   l'en-tête du fichier : `id`, `titre`, `annee`, `fichier`, `source`, `note`,
   `points` — les trois coins nord-ouest, nord-est et sud-ouest **de l'image**, non
   du terrain —, `opacite`, `cale`).
3. Caler dans l'atelier de la carte (`carte.html`, mode Atelier), en s'appuyant cette
   fois sur les numéros de lot et les renvois Goad consignés dans les notes des lieux.
4. Passer `cale` à `true` : le plan n'apparaît sur la carte publique qu'à ce moment.

---

## Plan officiel de la paroisse de St-Romuald d'Etchemin (1879)

- **Identifiant** : `cadastre-1879` — **année** : 1879
- **Fichier** : `assets/plans/cadastre-1879.jpg` *(supprimé)*
- **Source** : Plan officiel de la paroisse de St-Romuald d'Etchemin, comté de Lévis, Québec, 11 juin 1879. Cadastre dressé après l'abolition du régime seigneurial ; porte en renvoi les numéros du cadastre seigneurial de la seigneurie de Lauzon (numéros encerclés) et des corrections ultérieures (lot 462 corrigé 22 oct. 1900, corrections de 1935).

### Ce que le calage avait appris

Fourni par Patrick Blanchet, août 2026. Trois échelles sur une même feuille : la paroisse entière en haut (5 arpents au pouce), le village du chemin du Fleuve au centre et en bas (1 arpent au pouce). Le calage ne peut donc être juste que pour une bande à la fois — caler sur la bande centrale, celle du chemin du Fleuve, où vivent les maisons du recensement.

### Dernier ancrage posé (approximatif — repère de départ, non une position établie)

| coin de l'image | latitude | longitude |
|---|---|---|
| NW | 46.7731 | -71.2997 |
| NE | 46.7731 | -71.2047 |
| SW | 46.7061 | -71.2997 |

Opacité : 0.6. Jamais marqué calé.

---

## Goad 1876, feuille 12 — village d'Etchemin et moulins Atkinson

- **Identifiant** : `goad-1876-f12` — **année** : 1876
- **Fichier** : `assets/plans/goad-1876-f12.jpg` *(supprimé)*
- **Source** : Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 12. Plans d'assurance-incendie, échelle 200 pieds au pouce. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049

### Ce que le calage avait appris

Le village d'Etchemin au complet : son église (l'église Saint-Romuald), les moulins Etchemin (Henry Atkinson junior) à l'embouchure de la rivière, les étangs de flottage Mill Pond et Rigolet Pond (« all water power, no steam used »), un hôtel, et la grève de Saint-Romuald vers l'ouest. Le fleuve est en bas de la feuille : le nord est donc vers le bas, la gauche vers l'aval (feuille 11). Calage par l'église Saint-Romuald et le raccord à la feuille 13 — les deux repères divergent d'environ 300 m (le plateau est dessiné approximativement chez Goad), le calage coupe la poire en deux, et le raccord d'imbrication avec la feuille 13 (lignes « See Sheet No ») est maintenant tenu à ~60 m. Une capture d'écran de la carte zoomée sur le vieux Saint-Romuald permettrait de trancher ; en attendant, réglage aux poignées dans l'atelier.

### Dernier ancrage posé (approximatif — repère de départ, non une position établie)

| coin de l'image | latitude | longitude |
|---|---|---|
| NW | 46.756947 | -71.225659 |
| NE | 46.752811 | -71.240598 |
| SW | 46.763205 | -71.22935 |

Opacité : 0.6. Jamais marqué calé.

---

## Goad 1876, feuille 13 — anse Hamilton et anse de New Liverpool

- **Identifiant** : `goad-1876-f13` — **année** : 1876
- **Fichier** : `assets/plans/goad-1876-f13.jpg` *(supprimé)*
- **Source** : Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 13. Plans d'assurance-incendie, échelle 200 pieds au pouce. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049

### Ce que le calage avait appris

Anse Hamilton (Hamilton Bros.) et anse de New Liverpool (Benson Brothers) ; porte la ligne de démarcation entre les villages d'Etchemin et de New Liverpool, une scierie de 75 chevaux-vapeur et une boulangerie. Le fleuve est en bas de la feuille : le nord est donc vers le bas, la gauche vers l'aval (feuille 12, côté Etchemin). Calage ajusté par moindres carrés : la route dessinée sur la feuille, mesurée pixel par pixel, est posée sur le tracé réel du chemin du Fleuve, et les feuilles voisines sont emboîtées par leurs lignes de raccord « See Sheet No ». Dernier réglage aux poignées dans l'atelier.

### Dernier ancrage posé (approximatif — repère de départ, non une position établie)

| coin de l'image | latitude | longitude |
|---|---|---|
| NW | 46.752946 | -71.239132 |
| NE | 46.747964 | -71.253558 |
| SW | 46.758971 | -71.243563 |

Opacité : 0.6. Jamais marqué calé.

---

## Goad 1876, feuille 14 — village de New Liverpool

- **Identifiant** : `goad-1876-f14` — **année** : 1876
- **Fichier** : `assets/plans/goad-1876-f14.jpg` *(supprimé)*
- **Source** : Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 14. Plans d'assurance-incendie, échelle 200 pieds au pouce. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049

### Ce que le calage avait appris

Le cœur du village de New Liverpool : les maisons de bois numérotées une à une le long du chemin public, la New Liverpool Steam Saw Mill (Ritchie and Cull) et l'anse des Benson Brothers. Le fleuve est en bas de la feuille : le nord est donc vers le bas, la gauche vers l'aval (feuille 13). Calage ajusté par moindres carrés : la route dessinée sur la feuille, mesurée pixel par pixel, est posée sur le tracé réel du chemin du Fleuve, et les feuilles voisines sont emboîtées par leurs lignes de raccord « See Sheet No ». Dernier réglage aux poignées dans l'atelier.

### Dernier ancrage posé (approximatif — repère de départ, non une position établie)

| coin de l'image | latitude | longitude |
|---|---|---|
| NW | 46.748126 | -71.252136 |
| NE | 46.74286 | -71.266291 |
| SW | 46.7541 | -71.25687 |

Opacité : 0.6. Jamais marqué calé.

---

## Goad 1876, feuille 15 — anse Albert et bassin de la Chaudière

- **Identifiant** : `goad-1876-f15` — **année** : 1876
- **Fichier** : `assets/plans/goad-1876-f15.jpg` *(supprimé)*
- **Source** : Charles E. Goad, « Quebec Coves. South Shore », mars 1876, feuille 15. Plans d'assurance-incendie, échelle 200 pieds au pouce. BAnQ, Archives nationales à Québec, cote P600,S4,SS1,D67 — https://collections.banq.qc.ca/ark:/52327/3121049

### Ce que le calage avait appris

Anse Albert (Ritchie and Cull), bassin de la Chaudière (bois empilé de Henry King & Co) et embouchure de la rivière Chaudière ; renvoi vers les moulins de St. Nicholas à 5 ¾ milles. Le fleuve est en bas de la feuille : le nord est donc vers le bas, la gauche vers l'aval (feuille 14). Calage ajusté par moindres carrés sur la route dessinée (portion commune avec la 14) et raccordé à la feuille 14. À l'ouest de la marina, 1876 et aujourd'hui divergent pour de vrai : la route d'époque filait droit vers la rivière, l'embouchure a été remodelée (marina, remblais) — ne pas chercher à y faire coïncider les rives. Réglage aux poignées dans l'atelier.

### Dernier ancrage posé (approximatif — repère de départ, non une position établie)

| coin de l'image | latitude | longitude |
|---|---|---|
| NW | 46.743095 | -71.265255 |
| NE | 46.73838 | -71.279848 |
| SW | 46.749247 | -71.26949 |

Opacité : 0.6. Jamais marqué calé.

---
