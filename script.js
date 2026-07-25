document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach((opened) => {
        if (opened !== item) opened.classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
    });
  });

  const caseTabs = document.querySelectorAll('.case-tab');
  const casePanels = document.querySelectorAll('.case-panel');

  caseTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const client = tab.dataset.client;
      if (!client) return;

      caseTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      casePanels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.client === client);
      });
    });
  });

  const langButtons = document.querySelectorAll('.lang-btn');

  function setLanguage(lang) {
    const isRu = lang === 'ru';

    langButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (!key) return;

      if (key.endsWith('-ru')) {
        el.classList.toggle('hidden', !isRu);
      } else if (key.endsWith('-en')) {
        el.classList.toggle('hidden', isRu);
      }
    });
  }

  setLanguage('ru');

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang) setLanguage(lang);
    });
  });

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  const bgGradient = document.getElementById('bg-gradient');
  const navLinks = document.querySelectorAll('.main-nav a[data-section]');

  function setGradientFocus(sectionKey) {
    if (!bgGradient) return;

    let position = '0% 0%';

    switch (sectionKey) {
      case 'cases':
        position = '50% 20%';
        break;
      case 'about':
        position = '20% 40%';
        break;
      case 'services':
        position = '80% 40%';
        break;
      case 'faq':
        position = '50% 70%';
        break;
      case 'contacts':
        position = '50% 100%';
        break;
      default:
        position = '0% 0%';
    }

    bgGradient.style.backgroundPosition = position;
  }

  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const key = link.dataset.section;
      if (key) setGradientFocus(key);
    });

    link.addEventListener('focus', () => {
      const key = link.dataset.section;
      if (key) setGradientFocus(key);
    });
  });
});