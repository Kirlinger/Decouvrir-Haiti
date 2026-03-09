/* =====================================================
   Découvrir Haïti — Script principal
   Auteur : Kirlinger Jeune
   ===================================================== */

(function () {
  'use strict';

  /* ---- Navigation mobile ---- */
  const toggle = document.querySelector('.navbar__toggle');
  const menu   = document.querySelector('.navbar__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Fermer le menu quand on clique sur un lien
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Marquer le lien actif ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Retour en haut ---- */
  const backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Accordion ---- */
  document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const item   = header.closest('.accordion__item');
      const body   = item.querySelector('.accordion__body');
      const isOpen = header.classList.contains('open');

      // Fermer tous les items ouverts du même accordion
      const accordion = item.closest('.accordion');
      accordion.querySelectorAll('.accordion__header.open').forEach(h => {
        h.classList.remove('open');
        h.closest('.accordion__item').querySelector('.accordion__body').classList.remove('open');
      });

      if (!isOpen) {
        header.classList.add('open');
        body.classList.add('open');
      }
    });
  });

  /* ---- Animation au défilement (Intersection Observer) ---- */
  const animateElements = document.querySelectorAll(
    '.card, .leader-card, .dish-card, .holiday-card, .place-card, .lwa-card, .article-card, .stat-card, .info-box'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(el => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(20px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      observer.observe(el);
    });
  }

  /* ---- Formulaire de contact ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn     = this.querySelector('button[type="submit"]');
      const success = document.getElementById('form-success');
      btn.disabled       = true;
      btn.textContent    = 'Envoi en cours…';

      // Simulation d'envoi (à remplacer par un vrai backend)
      setTimeout(() => {
        btn.disabled    = false;
        btn.textContent = 'Envoyer le message';
        if (success) {
          success.style.display = 'block';
          this.reset();
          setTimeout(() => { success.style.display = 'none'; }, 5000);
        }
      }, 1200);
    });
  }

  /* ---- Recherche simple sur la page Dirigeants ---- */
  const leaderSearch = document.getElementById('leader-search');
  if (leaderSearch) {
    leaderSearch.addEventListener('input', function () {
      const q = this.value.toLowerCase().trim();
      document.querySelectorAll('.leader-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

})();
