// année dans le footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ombre sur le header quand on scroll un peu
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('border-border', 'shadow-lg', 'shadow-black/30');
  } else {
    header.classList.remove('border-border', 'shadow-lg', 'shadow-black/30');
  }
}, { passive: true });

// menu hamburger mobile
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuBars = menuBtn.querySelectorAll('.menu-bar');
let menuOpen = false;

function toggleMenu(open) {
  menuOpen = open;
  mobileMenu.style.maxHeight = open ? mobileMenu.scrollHeight + 'px' : '0px';
  
  menuBars[0].style.transform = open ? 'translateY(8px) rotate(45deg)' : '';
  menuBars[1].style.opacity = open ? '0' : '1';
  menuBars[2].style.transform = open ? 'translateY(-8px) rotate(-45deg)' : '';
  menuBtn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}

menuBtn.addEventListener('click', () => toggleMenu(!menuOpen));

// fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// scroll fluide vers les sections (offset pour pas se retrouver sous le header)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// bouton retour en haut, apparaît après 400px de scroll
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const show = window.scrollY > 400;
  backToTop.classList.toggle('opacity-0', !show);
  backToTop.classList.toggle('pointer-events-none', !show);
  backToTop.classList.toggle('translate-y-2', !show);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// les sections apparaissent en douceur au scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// filtre des projets
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projectGrid .project-card');

projectCards.forEach(card => {
  card.style.transition = 'opacity .25s ease, transform .25s ease';
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const categories = card.dataset.category.split(' ');
      const visible = filter === 'all' || categories.includes(filter);

      if (visible) {
        card.style.display = 'flex';
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        card.addEventListener('transitionend', function handler() {
          if (card.style.opacity === '0') card.style.display = 'none';
          card.removeEventListener('transitionend', handler);
        });
      }
    });
  });
});

// lightbox sur les images de projets
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.remove('opacity-0', 'pointer-events-none');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    lightboxImg.classList.remove('scale-95');
    lightboxImg.classList.add('scale-100');
  });
}

function closeLightbox() {
  lightboxImg.classList.remove('scale-100');
  lightboxImg.classList.add('scale-95');
  lightbox.classList.add('opacity-0', 'pointer-events-none');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-img-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', () => {
    const img = wrapper.querySelector('img');
    openLightbox(img.src, img.alt);
  });
});

// fermer la lightbox : bouton x, clic dehors, ou Escape
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});