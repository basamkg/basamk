// Плавный скролл по якорям
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

// Мобильное меню
const mobileToggle = document.querySelector('.mobile-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileToggle && mainNav) {
  mobileToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });
}

// FAQ-аккордеон
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

// Табы кейсов: переключение панелей 16:9
const caseTabs = document.querySelectorAll('.case-tab');
const casePanels = document.querySelectorAll('.case-panel');

caseTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const client = tab.dataset.client;
    if (!client) return;

    caseTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    casePanels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.client === client);
    });
  });
});

// Переключение языка (RU / EN)
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

// Год в футере
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Scroll reveal animation (IntersectionObserver)
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
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('visible'));
}

// Лёгкий параллакс для hero-аватара
const heroAvatar = document.querySelector('.hero-avatar');

if (
  heroAvatar &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches
) {
  window.addEventListener('scroll', () => {
    const rect = heroAvatar.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const progress = 1 - Math.max(0, Math.min(1, rect.top / viewportHeight));
    const translateY = progress * -10;

    heroAvatar.style.transform = `translateY(${translateY}px)`;
  });
}

// Переходы между секциями (overlay)
const sections = document.querySelectorAll('.snap-section');
const overlay = document.createElement('div');
overlay.className = 'transition-overlay';
document.body.appendChild(overlay);

let lastActiveId = null;

function handleSectionTransitions() {
  let currentSection = null;
  let minDistance = Infinity;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);
    if (distance < minDistance) {
      minDistance = distance;
      currentSection = section;
    }
  });

  if (!currentSection) return;

  const currentId = currentSection.id;
  if (currentId !== lastActiveId) {
    overlay.classList.add('transition-overlay--active');
    setTimeout(() => {
      overlay.classList.remove('transition-overlay--active');
    }, 240);
    lastActiveId = currentId;
  }
}

window.addEventListener('scroll', () => {
  window.requestAnimationFrame(handleSectionTransitions);
});

// Интерактивное меню‑маяк: смещение градиента по секциям
const bgGradient = document.getElementById('bg-gradient');
const navLinks = document.querySelectorAll('.main-nav a[data-section]');

function setGradientFocus(sectionKey) {
  if (!bgGradient) return;

  let position;
  switch (sectionKey) {
    case 'cases':
      position = '50% 30%';
      break;
    case 'about':
      position = '10% 50%';
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
});

// Запрет контекстного меню на процесс‑видео
const processVideos = document.querySelectorAll('.process-video');

processVideos.forEach((video) => {
  video.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});

// Inline-стили для overlay
const style = document.createElement('style');
style.innerHTML = `
.transition-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 50% 0%, rgba(5,5,9,0.0), rgba(5,5,9,0.5) 55%, rgba(5,5,9,0.9) 100%);
  opacity: 0;
  transition: opacity 0.24s ease-out;
  z-index: -1;
}
.transition-overlay--active {
  opacity: 0.25;
  z-index: 90;
}
`;
document.head.appendChild(style);
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  if (
    (e.ctrlKey || e.metaKey) &&
    ['c', 'x', 's', 'u', 'a', 'p'].includes(key)
  ) {
    e.preventDefault();
  }

  if (key === 'printscreen') {
    e.preventDefault();
  }

  if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
    e.preventDefault();
  }

  if (key === 'f12') {
    e.preventDefault();
  }
});