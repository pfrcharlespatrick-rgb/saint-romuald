# Mettre le site en ligne — sans rien payer

Contexte : consultation publique, saisie réservée à Patrick, « le plus simple
possible, même si c'est limité ». Tout ce qui suit tient dans des offres gratuites.

---

## Étape 1 — En ligne cette semaine : GitHub Pages

Le plus simple qui fonctionne vraiment.

**Comment ça marche.** Le site est un ensemble de fichiers statiques (HTML, CSS, JS)
plus les données en JSON, tous dans un dépôt GitHub. GitHub les publie
automatiquement à une adresse publique. Aucun serveur, aucune base de données,
aucune facture — et aucune limite pratique de trafic pour un site de recherche.

**Consultation.** Publique et immédiate. Le site charge les JSON et fait tout le
travail dans le navigateur du visiteur : recherche, filtres, fiches. Les 10 170
personnes représentent quelques mégaoctets — c'est parfaitement tenable.

**Saisie.** Tu corriges dans le navigateur comme aujourd'hui ; le travail
s'accumule localement. Deux façons de le publier :

- **Le panneau Sauvegarde de l'atelier**, bouton « Pousser vers GitHub » (chantier 3) :
  avec un jeton d'accès personnel GitHub saisi une fois, il écrit ton travail
  (`data/travail-personnel.json`) sur une branche dédiée et ouvre une pull request —
  jamais directement sur `main`. Tu la fusionnes toi-même quand tu veux publier.
- **Le fichier de sauvegarde**, comme avant : tu exportes et tu me l'envoies, ou tu
  remplaces les fichiers de données dans le dépôt à la main. Avec Claude Code, c'est
  une phrase : « intègre ma sauvegarde et publie ». C'est aussi la seule voie pour
  les photos (IndexedDB), que le bouton GitHub ne transporte pas.

**La limite, dite franchement.** Tes corrections ne sont pas publiées tant que tu ne
les as pas versées dans le dépôt d'une des deux façons. Si tu travailles sur ton
téléphone et que tu continues sur ton ordinateur sans avoir poussé entre les deux,
il faut passer par le fichier de sauvegarde. Et une nuance de sécurité à ne pas
perdre de vue : tant qu'aucun jeton GitHub n'est enregistré dans un navigateur,
« personne d'autre que toi ne peut modifier le dépôt » reste vrai sans aucun système
de mot de passe à construire. Dès que tu enregistres un jeton pour pousser depuis
l'atelier, cette garantie devient « quiconque a accès à cet appareil et à ce profil
de navigateur peut modifier le dépôt en ton nom » — utilise un jeton fin
(« fine-grained »), limité à ce dépôt, et révoque-le si l'appareil change de mains.

**Mise en place.** Créer un dépôt, y déposer les fichiers, activer Pages dans les
réglages. Claude Code fait les trois en une session.

---

## Étape 2 — Quand tu voudras saisir depuis n'importe où : Cloudflare

À faire seulement quand l'étape 1 te limitera pour de bon. Même adresse, même site,
on ajoute une vraie base de données derrière.

**Les pièces.** Cloudflare Pages héberge le site (gratuit). Cloudflare D1 est une
base de données SQLite (gratuite : 5 Go de stockage, 5 millions de lignes lues par
jour — pour ton volume, tu n'en verras jamais le fond). Un Worker fait le lien entre
les deux (gratuit jusqu'à 100 000 requêtes par jour, soit largement plus qu'un site
de recherche n'en reçoit).

**Ce que ça change.** Tu corriges depuis le téléphone dans l'autobus, c'est
enregistré, et c'est en ligne. Plus de fichier de sauvegarde à promener. Les
visiteurs consultent toujours librement ; l'écriture passe derrière une
authentification.

**Saisie réservée, sans construire de comptes.** Cloudflare Access protège les pages
d'édition et envoie un code par courriel à une liste d'adresses que tu décides.
Gratuit jusqu'à 50 personnes. Tu n'as ni mot de passe à gérer, ni page de connexion
à faire coder.

**Le prix à payer.** Un compte Cloudflare, et des données qui vivent chez un
hébergeur plutôt que dans des fichiers que tu vois. Garde l'export de sauvegarde
même après la migration : c'est ton filet, et il te rend indépendant de Cloudflare.

---

## La carte du chemin du Fleuve

**Leaflet + tuiles OpenStreetMap.** Gratuit, sans clé d'accès, sans inscription.
C'est le choix évident.

Il faut une latitude et une longitude par bâtiment — le schéma les prévoit déjà
(`batiment.latitude`, `batiment.longitude`). Deux façons de les obtenir :

1. **Automatique** : les 38 adresses du chemin du Fleuve passées dans Nominatim, le
   service de géocodage d'OpenStreetMap (gratuit, une requête par seconde). À faire
   une fois, en enregistrant les résultats — pas à chaque affichage de la carte.
2. **À la main** : cliquer sur la carte pour poser un point. Plus long, mais plus
   fiable pour un bâtiment démoli ou renuméroté — et c'est justement le cas de la
   plupart des tiens.

Le plus juste est de combiner : géocoder d'abord, puis corriger à la main les points
tombés à côté, en marquant lesquels ont été placés par toi.

**Ce qui rendrait la carte vraiment utile** : superposer le plan Goad de 1876 aux
tuiles actuelles. Les données cadastrales de l'annexe (feuillet Goad, n°
d'enregistrement) existent déjà pour ça. Leaflet sait afficher une image géoréférencée
par-dessus la carte — il faut caler le plan sur trois points connus. C'est un chantier
à part entière, mais c'est là que le projet deviendrait spectaculaire : voir la maison
de 1871, le lot de 1876 et la rue de 2026 au même endroit.

---

## Les scans

Les dossiers `scan-pages*/` et `scan-1891/` sont volumineux. GitHub Pages accepte
mal les gros dépôts d'images (limite pratique autour de 1 Go, 20 000 fichiers).

Deux options gratuites :
- **Cloudflare R2** — 10 Go gratuits, compatible S3. Suffisant, et cohérent avec
  l'étape 2.
- **Les laisser dans Drive** et ne stocker que le lien. Moins élégant, zéro travail.

Pour la saisie, une visionneuse page à page à côté du tableau de la famille serait le
plus gros gain de temps possible. Aujourd'hui il faut faire l'aller-retour entre
l'écran et le scan à la main. C'est la première chose que je construirais après la
mise en ligne.

---

## Ce que je ne recommande pas

**Une base de données hébergée avec un plan gratuit qui s'endort** (certaines offres
Postgres suspendent les projets inactifs). Un projet de recherche connaît des mois
creux ; ce n'est pas le moment de découvrir que la base a été mise en pause.

**Un système de gestion de contenu généraliste.** Tes données ont une structure
précise — colonnes de manuscrit, incertitudes de lecture, distinction entre ce que
dit la source et ce que le chercheur établit. Un outil généraliste te forcera à
tordre tout ça, et tu perdras exactement ce qui fait la valeur du projet.

**Tout reconstruire d'un coup.** Mets d'abord en ligne ce qui existe, à l'étape 1.
Ce que tu apprendras des trois premières semaines d'usage vaut plus que n'importe
quel plan fait d'avance.

---

## Ordre de travail suggéré

1. Le site statique en ligne, avec les données actuelles et la recherche. (Étape 1)
2. La visionneuse de scans reliée aux familles — le gain de temps de saisie.
3. Les liens entre recensements avec une vraie cible : suivre une personne de 1871 à
   1891. C'est ta priorité n° 3 et le prototype ne sait pas le faire.
4. La carte, points géocodés puis corrigés à la main.
5. La base de données, quand la saisie depuis plusieurs appareils devient gênante.
   (Étape 2)
6. Le plan Goad de 1876 en surimpression.

Chiffres d'offres gratuites vérifiés en juillet 2026 ; ils changent, revérifie avant
de t'engager.
