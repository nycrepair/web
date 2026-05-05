/* ===== MOBILE NAV TOGGLE ===== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
}

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq__question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId = btn.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);

    // Close all others
    document.querySelectorAll('.faq__question').forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.setAttribute('aria-expanded', 'false');
        const otherId = otherBtn.getAttribute('aria-controls');
        const otherAnswer = document.getElementById(otherId);
        if (otherAnswer) otherAnswer.classList.remove('open');
      }
    });

    btn.setAttribute('aria-expanded', String(!expanded));
    if (answer) answer.classList.toggle('open', !expanded);
  });
});

/* ===== CONTACT FORM (demo handler) ===== */
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm && successMessage) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const required = contactForm.querySelectorAll('[required]');
    let valid = true;

    required.forEach((field) => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#C0392B';
        valid = false;
        field.focus();
      }
    });

    if (!valid) return;

    const submitBtn = contactForm.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      successMessage.classList.add('visible');
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Estimate Request →';
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 900);
  });
}

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 68;
      const offset = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ===== INTERSECTION OBSERVER: ANIMATE ON SCROLL ===== */
const animatables = document.querySelectorAll(
  '.service-card, .why__feature, .process-step, .testimonial-card, .team-card, .value-card, .milestone-card'
);

if ('IntersectionObserver' in window && animatables.length) {
  animatables.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, (Array.from(animatables).indexOf(entry.target) % 4) * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  animatables.forEach((el) => observer.observe(el));
}
