#!/usr/bin/env python3
"""
Convertit les captures de img/originaux/ en .webp dans img/.

  python3 optimiser-images.py          convertit ce qui manque
  python3 optimiser-images.py --force  refait tout

Les originaux ne sont jamais modifies.
"""
import os
import sys
from PIL import Image

SOURCE = 'img/originaux'
CIBLE = 'img'
LARGEUR_MAX = 1400
QUALITE = 82
FORMATS = ('.png', '.jpg', '.jpeg', '.webp', '.bmp', '.tif', '.tiff')

force = '--force' in sys.argv

if not os.path.isdir(SOURCE):
    sys.exit(f"Dossier {SOURCE} introuvable. Lance le script depuis la racine du projet.")

faits = ignores = 0
for nom in sorted(os.listdir(SOURCE)):
    if not nom.lower().endswith(FORMATS):
        continue

    src = os.path.join(SOURCE, nom)
    dst = os.path.join(CIBLE, os.path.splitext(nom)[0] + '.webp')

    if os.path.exists(dst) and not force and os.path.getmtime(dst) >= os.path.getmtime(src):
        ignores += 1
        continue

    image = Image.open(src).convert('RGB')
    largeur, hauteur = image.size
    if largeur > LARGEUR_MAX:
        image = image.resize((LARGEUR_MAX, round(hauteur * LARGEUR_MAX / largeur)), Image.LANCZOS)

    image.save(dst, 'WEBP', quality=QUALITE, method=6)

    avant = os.path.getsize(src) / 1024
    apres = os.path.getsize(dst) / 1024
    print(f"{nom:<28} {avant:8.0f} Ko -> {apres:7.0f} Ko   {image.size[0]}x{image.size[1]}")
    faits += 1

print(f"\n{faits} image(s) convertie(s), {ignores} deja a jour.")
if faits:
    print("Pense a referencer le .webp dans le HTML, avec un alt qui decrit l'image.")
