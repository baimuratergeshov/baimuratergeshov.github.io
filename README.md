# Portfolio de Baimurat Ergeshov

Mon portfolio de BTS SIO option SLAM, en ligne sur
[baimuratergeshov.github.io](https://baimuratergeshov.github.io).
Je cherche un stage de 8 semaines, du lundi 4 janvier au vendredi 26 février 2027.

## Les pages

| Page | Contenu |
| --- | --- |
| `index.html` | Présentation, parcours, compétences (avec les projets qui les prouvent), liste des projets avec une fiche détaillée pour chacun, contact |
| `stage.html` | Rapport du stage de première année chez Adyl Plombier (18 mai au 26 juin 2026) : besoin, démarche, architecture MVC, back-office, sécurité, difficultés, compétences du référentiel, bilan |
| `veille.html` | Veille technologique sur l'accessibilité numérique : méthode, sources, brèves datées, audit de ce portfolio, glossaire |

Le CV est dans `CV_Baimurat_Ergeshov.pdf`.

## Les projets présentés

- **Adyl Plombier** : site et espace d'administration d'un plombier d'urgence, en PHP MVC sans framework (stage)
- **Hôtel Chambord** : gestion des salariés (CRUD) et site multi-pages d'un hôtel fictif
- **MovieDB** : catalogue de films alimenté par l'API TMDb
- **Gestion des stagiaires** : application PHP MVC avec tableau de bord
- **Passerelle Python / PHP** : échange de données en JSON entre un script Python et une application PHP
- **Serveur maison sous Ubuntu** : Jellyfin sous Docker, accès distant par Tailscale
- **Ce portfolio**

## Technologies

HTML, CSS et JavaScript, sans framework ni bibliothèque. Police Geist, hébergée
dans `assets/fonts/`. Pas d'étape de compilation : ouvrir `index.html` suffit.

## Organisation du dépôt

```
index.html, stage.html, veille.html
CV_Baimurat_Ergeshov.pdf
assets/        style.css, script.js, fonts/
img/           captures au format .webp, favicon
optimiser-images.py   convertit les captures en .webp (usage dans le fichier)
```

## Accessibilité

Le site sert de terrain d'application à ma veille sur l'accessibilité :
contrastes de texte à 4,5:1 minimum, navigation au clavier, lien d'évitement,
focus visible, fenêtres basées sur `<dialog>`, `prefers-reduced-motion` respecté.
Les mesures détaillées sont dans `veille.html`.
