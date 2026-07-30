/* ================================================================
   BIRTHDAY & ANNIVERSARY WEBSITE — Soumyasri Mandal
   script.js — Animations & Interactions
   ================================================================ */


/* ────────────────────────────────────────────────────────────────
   1. FLOATING ROSE PETALS
   ──────────────────────────────────────────────────────────────── */
// (function createPetals() {
//   const container = document.querySelector('.petals-container');
//   if (!container) return;

//   const PETAL_COUNT = 20;

//   for (let i = 0; i < PETAL_COUNT; i++) {
//     const petal      = document.createElement('div');
//     petal.className  = 'petal';

//     const size        = Math.random() * 9 + 5;          // 5–14px
//     const duration    = Math.random() * 12 + 9;          // 9–21s
//     const delay       = Math.random() * 20;              // staggered start
//     const leftPct     = Math.random() * 100;             // random horizontal

//     petal.style.cssText = `
//       width: ${size}px;
//       height: ${size}px;
//       left: ${leftPct}vw;
//       animation-duration: ${duration}s;
//       animation-delay: ${delay}s;
//       opacity: ${(Math.random() * 0.45 + 0.2).toFixed(2)};
//     `;

//     container.appendChild(petal);
//   }
// })();


/* ────────────────────────────────────────────────────────────────
   2. SCROLL REVEAL  (fade-in sections when they enter viewport)
   ──────────────────────────────────────────────────────────────── */
(function setupScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);   // animate once
        }
      });
    },
    { threshold: 0.13 }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ────────────────────────────────────────────────────────────────
   3. NUMBER COUNTER ANIMATION  (365, 12 counting up)
   ──────────────────────────────────────────────────────────────── */
(function setupCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;

        const DURATION = 1800;   // ms
        const startTime = performance.now();

        function tick(now) {
          const elapsed  = now - startTime;
          const progress = Math.min(elapsed / DURATION, 1);
          // Ease-out cubic
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();


/* ────────────────────────────────────────────────────────────────
   4. ACTIVE NAV DOT  (highlight dot for the current section)
   ──────────────────────────────────────────────────────────────── */
(function setupNavDots() {
  const dots     = document.querySelectorAll('.nav-dot');
  const sections = document.querySelectorAll('section[id], footer');
  if (!dots.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        dots.forEach(d => d.classList.remove('active'));
        const active = document.querySelector(`.nav-dot[href="#${id}"]`);
        if (active) active.classList.add('active');
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach(s => observer.observe(s));
})();


/* ────────────────────────────────────────────────────────────────
   5. FLIP CARDS  (click / tap to flip friend wish cards)
   ──────────────────────────────────────────────────────────────── */
(function setupFlipCards() {
  const cards = document.querySelectorAll('.wish-card');

  cards.forEach(card => {
    // Click (desktop + mobile)
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    // Keyboard: Enter or Space for accessibility
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
})();


/* ────────────────────────────────────────────────────────────────
   6. SMOOTH SCROLL for all anchor links
   ──────────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ────────────────────────────────────────────────────────────────
   7. TIMELINE PHOTO: hide overlay once real image loads
   ──────────────────────────────────────────────────────────────── */
document.querySelectorAll('.tl-photo img, .hero-photo-img').forEach(img => {
  if (img.complete && img.naturalWidth > 0) {
    // Already loaded — hide placeholder
    const placeholder = img.nextElementSibling;
    if (placeholder) placeholder.style.display = 'none';
  } else {
    img.addEventListener('load', () => {
      const placeholder = img.nextElementSibling;
      if (placeholder) placeholder.style.display = 'none';
    });
  }
});
