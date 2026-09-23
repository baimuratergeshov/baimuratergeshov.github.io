# Portfolio de Baimurat Ergeshov

Portfolio personnel, réalisé dans le cadre du BTS SIO option SLAM.
Trois pages : présentation et projets, récapitulatif de stage, veille technologique.

## Structure

```
index.html          Présentation, compétences, projets
stage.html          Stage chez Adyl Plombier (mai / juin 2025)
veille.html         Veille technologique sur l'accessibilité numérique
CV-Baimurat-Ergeshov.pdf
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

## Ajouter une capture

1. Dépose l'original (PNG ou JPG) dans `img/originaux/`.
2. Lance la conversion depuis la racine du projet :

   ```bash
   python3 optimiser-images.py
   ```

   Chaque image est réduite à 1400 px de large et enregistrée en `.webp`
   dans `img/`. Les originaux ne sont pas modifiés, et ce qui est déjà
   converti est ignoré. `--force` refait tout.

3. Référence le `.webp` dans la galerie du projet concerné, en bas
   d'`index.html` :

   ```html
   <img src="./img/ma_capture.webp" alt="Ce que montre l'image"
        onerror="imgFail(this)" />
   ```

Le `alt` doit décrire l'image, pas la nommer : il sert aux lecteurs
d'écran et s'affiche aussi en légende dans la visionneuse. Une image
absente du dossier disparaît d'elle-même, sans icône cassée.

`img/originaux/` est exclu du dépôt : les originaux restent sur ton
disque, seuls les `.webp` sont publiés.

## Accessibilité

L'accessibilité étant le sujet de la veille, le site sert lui-même de terrain
d'application. Contrastes mesurés au seuil WCAG AA de 4,5:1, navigation
complète au clavier, lien d'évitement, `prefers-reduced-motion` respecté,
fenêtres modales reposant sur l'élément `<dialog>` natif.

Le détail de l'audit, avec les valeurs avant et après correction, figure
dans `veille.html`.
