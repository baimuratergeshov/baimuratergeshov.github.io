# Portfolio de Baimurat Ergeshov

Portfolio personnel, réalisé dans le cadre du BTS SIO option SLAM.
Trois pages : présentation et projets, récapitulatif de stage, veille technologique.

## Structure

```
index.html          Présentation, compétences, projets
stage.html          Stage chez Adyl Plombier (mai / juin 2026)
veille.html         Veille technologique sur l'accessibilité numérique
CV_Baimurat_Ergeshov.pdf
assets/
  tw-config.js      Configuration Tailwind (couleurs, polices)
  style.css         Feuille de style commune
  script.js         Script commun aux trois pages
img/
  *.webp            Captures optimisées, affichées sur le site
  originaux/        Captures d'origine, hors dépôt
  favicon.svg
optimiser-images.py Convertit originaux/ en .webp
```

## Technologies

HTML, Tailwind CSS (via CDN), CSS et JavaScript sans bibliothèque.
Polices : Fraunces (titres), Sora (texte), JetBrains Mono (métadonnées).

Aucune étape de compilation : ouvrir `index.html` dans un navigateur suffit.

## Accessibilité

L'accessibilité étant le sujet de la veille, le site sert lui-même de terrain
d'application. Contrastes mesurés au seuil WCAG AA de 4,5:1, navigation
complète au clavier, lien d'évitement, `prefers-reduced-motion` respecté,
fenêtres modales reposant sur l'élément `<dialog>` natif.

Le détail de l'audit, avec les valeurs avant et après correction, figure
dans `veille.html`.
