# Portfolio de Baimurat Ergeshov

Portfolio personnel, réalisé dans le cadre du BTS SIO option SLAM.
Trois pages : présentation et projets, récapitulatif de stage, veille technologique.

## Structure

```
index.html          Présentation, compétences, projets
stage.html          Stage chez Adyl-Plombier (mai / juin 2025)
veille.html         Veille technologique sur l'accessibilité numérique
assets/
  tw-config.js      Configuration Tailwind (couleurs, polices)
  style.css         Feuille de style commune
  script.js         Script commun aux trois pages
img/
  *.webp            Captures optimisées, affichées sur le site
  originaux/        Captures d'origine en PNG, non utilisées par le site
  favicon.svg
```

## Technologies

HTML, Tailwind CSS (via CDN), CSS et JavaScript sans bibliothèque.
Polices : Fraunces (titres), Sora (texte), JetBrains Mono (métadonnées).

Aucune étape de compilation : ouvrir `index.html` dans un navigateur suffit.

## Ajouter une capture à un projet

Les captures d'un projet vivent dans la `<dialog>` correspondante, en bas
d'`index.html`. Dans le bloc `<div class="gallery">`, copier une ligne :

```html
<img src="./img/mon_image.webp" alt="Description précise de ce que montre l'image"
     onerror="imgFail(this)" />
```

Le `alt` doit décrire l'image, pas la nommer : il sert aux lecteurs d'écran et
s'affiche aussi en légende dans la visionneuse. Une image absente du dossier
disparaît d'elle-même, sans icône cassée.

## Optimiser une image

Les captures sont converties en WebP, largeur maximale 1400 px, qualité 82.
Les originaux restent dans `img/originaux/`.

```bash
python3 -c "
from PIL import Image
im = Image.open('img/originaux/ma_capture.png').convert('RGB')
w, h = im.size
if w > 1400: im = im.resize((1400, round(h*1400/w)), Image.LANCZOS)
im.save('img/ma_capture.webp', 'WEBP', quality=82, method=6)
"
```

## Accessibilité

L'accessibilité étant le sujet de la veille, le site sert lui-même de terrain
d'application. Contrastes mesurés au seuil WCAG AA de 4,5:1, navigation
complète au clavier, lien d'évitement, `prefers-reduced-motion` respecté,
fenêtres modales reposant sur l'élément `<dialog>` natif.

Le détail de l'audit, avec les valeurs avant et après correction, figure
dans `veille.html`.
