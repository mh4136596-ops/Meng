// Dark mode — persist across pages
function toggleDark() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateDarkIcon();
}

function updateDarkIcon() {
  const btn = document.getElementById('darkToggleBtn');
  if (btn) {
    btn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  }
}

// Apply saved theme on every page load
(function () {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }
  // Run after DOM is ready
  document.addEventListener('DOMContentLoaded', updateDarkIcon);
})();

// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('menu');
  if (menu) menu.classList.toggle('hidden');
}

// Language toggle (English / Khmer)
const translations = {
  en: {
    home: 'Home',
    about: 'About',
    places: 'Places',
    gallery: 'Gallery',
    contact: 'Contact',
    heroTitle: 'Explore Angkor Wat',
    heroSub: 'Discover Cambodia',
  },
  km: {
    home: 'ទំព័រដើម',
    about: 'អំពី',
    places: 'គោលដៅ',
    gallery: 'វិចិត្រសាល',
    contact: 'ទំនាក់ទំនង',
    heroTitle: 'រុករកអង្គរវត្ត',
    heroSub: 'រកឃើញកម្ពុជា',
  },
};

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyLang(lang);
}

function applyLang(lang) {
  const t = translations[lang];
  if (!t) return;

  const title = document.getElementById('title');
  if (title) title.textContent = t.heroTitle;

  const sub = document.getElementById('subtitle');
  if (sub) sub.textContent = t.heroSub;

  // Nav links by data-key
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if (t[key]) el.textContent = t[key];
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyLang(localStorage.getItem('lang') || 'en');
  updateDarkIcon();
});
