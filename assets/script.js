/* Portfolio Baimurat Ergeshov : script commun aux trois pages.
   Chargé depuis le <head> sans defer, imgFail doit exister avant
   la première image. Chaque bloc vérifie que ses éléments sont là,
   les trois pages n'ayant pas les mêmes sections. */

/* appelée en onerror : retire une image absente, et la galerie si elle finit vide */
function imgFail(img) {
  var box = img.parentNode;
  img.remove();
  if (box && box.classList.contains('gallery') && !box.querySelector('img')) box.remove();
}

document.addEventListener('DOMContentLoaded', function () {

  /* année du pied de page */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* repli des sections longues, sur mobile */
  (function () {
    var boxes = document.querySelectorAll('[data-collapse]');
    if (!boxes.length) return;

    var small = window.matchMedia('(max-width: 767px)');
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    var rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    var seq = 0;

    function fold(box) {
      var limit = (parseFloat(box.getAttribute('data-collapse')) || 20) * rem;

      // Déjà traité : on ne recrée pas le bouton à chaque appel
      var btn = box.nextElementSibling;
      if (btn && btn.classList.contains('collapse-btn')) return;

      // Rien à replier si le contenu dépasse à peine
      if (box.scrollHeight <= limit * 1.3) return;

      box.style.setProperty('--collapse-h', (limit / rem) + 'rem');
      box.classList.add('is-collapsed');
      if (!box.id) box.id = 'repli-' + (++seq);

      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'collapse-btn';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', box.id);
      btn.textContent = 'Voir la suite';
      box.insertAdjacentElement('afterend', btn);

      btn.addEventListener('click', function () {
        var collapsed = box.classList.toggle('is-collapsed');
        btn.setAttribute('aria-expanded', String(!collapsed));
        btn.textContent = collapsed ? 'Voir la suite' : 'Réduire';

        /* si le haut du bloc est sorti de l'écran, on y revient */
        if (collapsed && box.getBoundingClientRect().top < 0) {
          box.scrollIntoView({ block: 'start', behavior: calm.matches ? 'auto' : 'smooth' });
        }
      });
    }

    function unfold(box) {
      box.classList.remove('is-collapsed');
      box.style.removeProperty('--collapse-h');
      var btn = box.nextElementSibling;
      if (btn && btn.classList.contains('collapse-btn')) btn.remove();
    }

    function sync() {
      boxes.forEach(small.matches ? fold : unfold);
    }

    sync();
    small.addEventListener('change', sync);

    /* on remesure une fois les polices chargées */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
  })();

  /* lien actif du menu selon la section affichée (page d'accueil seulement) */
  (function () {
    var home = document.querySelector('.site-nav a[aria-current="page"]');
    var items = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'))
      .map(function (a) { return { link: a, section: document.getElementById(a.getAttribute('href').slice(1)) }; })
      .filter(function (i) { return i.section; });
    if (!home || !items.length) return;

    var waiting = false;

    function update() {
      waiting = false;
      var active = null;
      items.forEach(function (i, n) {
        /* la dernière section est courte : on l'active plus tôt */
        var line = window.innerHeight * (n === items.length - 1 ? 0.7 : 0.35);
        if (i.section.getBoundingClientRect().top <= line) active = i;
      });
      /* en bas de page, la dernière section n'atteint pas toujours la ligne */
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        active = items[items.length - 1];
      }

      home.removeAttribute('aria-current');
      items.forEach(function (i) { i.link.removeAttribute('aria-current'); });
      if (active) active.link.setAttribute('aria-current', 'true');
      else home.setAttribute('aria-current', 'page');
    }

    function onScroll() {
      if (!waiting) { waiting = true; requestAnimationFrame(update); }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

  /* défilement de l'arrière-plan */
  function restoreScroll() {
    if (!document.querySelector('dialog[open]')) document.body.style.overflow = '';
  }

  /* fiches projet */
  document.querySelectorAll('[data-dialog]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dlg = document.getElementById(btn.getAttribute('data-dialog'));
      if (!dlg) return;
      if (typeof dlg.showModal === 'function') dlg.showModal();
      else dlg.setAttribute('open', '');       // navigateurs sans <dialog>
      document.body.style.overflow = 'hidden';
    });
  });

  document.querySelectorAll('dialog.modal').forEach(function (dlg) {
    dlg.addEventListener('close', restoreScroll);

    var closeBtn = dlg.querySelector('[data-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        if (typeof dlg.close === 'function') dlg.close();
        else { dlg.removeAttribute('open'); restoreScroll(); }
      });
    }

    /* clic sur le fond : la cible est la dialog elle-même */
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg && typeof dlg.close === 'function') dlg.close();
    });
  });

  /* visionneuse d'images */
  (function () {
    var lb = document.getElementById('lightbox');
    if (!lb) return;

    var stage = document.getElementById('lbStage');
    var img = document.getElementById('lbImg');
    var caption = document.getElementById('lbCaption');
    var counter = document.getElementById('lbCount');
    var zoomLabel = document.getElementById('lbZoom');
    var prevBtn = lb.querySelector('[data-lb-prev]');
    var nextBtn = lb.querySelector('[data-lb-next]');
    var closeBtn = lb.querySelector('[data-lb-close]');
    if (!stage || !img || !prevBtn || !nextBtn || !closeBtn) return;

    var group = [];        // images de la galerie d'origine
    var index = 0;
    var scale = 1, tx = 0, ty = 0;
    var MIN = 1, MAX = 6;

    function apply() {
      img.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
      if (zoomLabel) zoomLabel.textContent = Math.round(scale * 100) + ' %';
      stage.classList.toggle('is-zoomed', scale > 1);
    }

    function setZoom(value) {
      scale = Math.min(MAX, Math.max(MIN, value));
      if (scale === 1) { tx = 0; ty = 0; }   // recentre en revenant à 100 %
      apply();
    }

    function show(i) {
      if (!group.length) return;
      index = (i + group.length) % group.length;
      var source = group[index];
      img.src = source.currentSrc || source.src;
      /* la légende reprend le alt de la vignette */
      img.alt = source.alt || '';
      if (caption) caption.textContent = source.alt || '';
      if (counter) counter.textContent = group.length > 1 ? (index + 1) + ' / ' + group.length : '';
      prevBtn.hidden = nextBtn.hidden = group.length < 2;
      setZoom(1);
    }

    function open(el) {
      group = Array.prototype.slice.call(el.parentNode.querySelectorAll('img'));
      show(group.indexOf(el));
      if (typeof lb.showModal === 'function') lb.showModal();
      else lb.setAttribute('open', '');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      if (typeof lb.close === 'function') lb.close();
      else { lb.removeAttribute('open'); restoreScroll(); }
    }

    /* rôle et tabulation ajoutés ici pour garder un simple <img> dans le HTML */
    document.querySelectorAll('.gallery img').forEach(function (el) {
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.draggable = false;
      el.addEventListener('click', function () { open(el); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el); }
      });
    });

    lb.addEventListener('close', restoreScroll);
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function () { show(index - 1); });
    nextBtn.addEventListener('click', function () { show(index + 1); });

    lb.querySelectorAll('[data-lb-zoom]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var mode = btn.getAttribute('data-lb-zoom');
        if (mode === 'in') setZoom(scale * 1.3);
        else if (mode === 'out') setZoom(scale / 1.3);
        else setZoom(1);
      });
    });

    stage.addEventListener('wheel', function (e) {
      e.preventDefault();
      setZoom(scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15));
    }, { passive: false });

    /* Déplacement une fois zoomé */
    var dragging = false, moved = false, sx = 0, sy = 0, ox = 0, oy = 0;

    /* le navigateur veut lancer son propre glisser d'image : on le
       coupe, sinon il prend la main sur le deplacement de la vue.
       Le CSS -webkit-user-drag ne suffit pas, Firefox l'ignore. */
    img.draggable = false;
    img.addEventListener('dragstart', function (e) { e.preventDefault(); });

    stage.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      moved = false;
      if (scale <= 1) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY; ox = tx; oy = ty;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add('is-panning');
    });

    stage.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      moved = true;
      tx = ox + (e.clientX - sx);
      ty = oy + (e.clientY - sy);
      apply();
    });

    ['pointerup', 'pointercancel'].forEach(function (evt) {
      stage.addEventListener(evt, function () {
        dragging = false;
        stage.classList.remove('is-panning');
      });
    });

    stage.addEventListener('click', function (e) {
      if (moved) { moved = false; return; }       // fin de déplacement
      if (e.target !== img) { close(); return; }  // clic à côté de l'image
      setZoom(scale > 1 ? 1 : 2.2);
    });

    stage.addEventListener('dblclick', function () { setZoom(1); });

    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
      else if (e.key === '+' || e.key === '=') { e.preventDefault(); setZoom(scale * 1.3); }
      else if (e.key === '-') { e.preventDefault(); setZoom(scale / 1.3); }
      else if (e.key === '0') { e.preventDefault(); setZoom(1); }
    });
  })();

});
