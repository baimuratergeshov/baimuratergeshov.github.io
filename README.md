# Portfolio de Baimurat Ergeshov

Portfolio personnel, réalisé dans le cadre du BTS SIO option SLAM.
Je cherche un stage de 8 semaines, du lundi 4 janvier au vendredi 26 février 2027.

Trois pages : présentation et projets, rapport du stage de première année,
veille technologique.

## Structure

```
index.html          Présentation, compétences, projets
stage.html          Stage chez Adyl Plombier (18 mai au 26 juin 2026)
veille.html         Veille technologique sur l'accessibilité numérique
CV_Baimurat_Ergeshov.pdf
assets/
  style.css         Feuille de style commune
  script.js         Script commun aux trois pages
  fonts/            Police Geist (woff2) et sa licence OFL
img/
  *.webp            Captures optimisées, affichées sur le site
  originaux/        Captures d'origine, hors dépôt
  favicon.svg
optimiser-images.py Convertit originaux/ en .webp
```

## Technologies

HTML, CSS et JavaScript, sans framework ni bibliothèque.
Police : Geist, hébergée dans `assets/fonts/` (aucune requête vers un
service externe).

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

3. Référence le `.webp` dans la galerie du projet concerné, dans la fiche
   correspondante en bas d'`index.html` :

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
d'application :

- contrastes de texte mesurés au seuil WCAG AA de 4,5:1 (couleurs définies
  dans `assets/style.css`)
- navigation complète au clavier, lien d'évitement, focus visible
- fenêtres modales reposant sur l'élément `<dialog>` natif
- `prefers-reduced-motion` respecté : les déplacements sont coupés, les
  fondus restent

Le détail de l'audit, avec les valeurs avant et après correction, figure
dans `veille.html`. Si les couleurs de `assets/style.css` changent, il faut
recalculer les rapports de contraste et mettre à jour ce tableau.
