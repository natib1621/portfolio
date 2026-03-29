/* ============================================================
   script.js — Natnael Bekele | Data Science Portfolio
   ============================================================ */

/* ── Typing effect ─────────────────────────────────────────── */
const titles = ['Data Science Student', 'Machine Learning Enthusiast', 'Deep Learning Explorer', 'AI & Data Analyst'];
let tIdx = 0, cIdx = 0, deleting = false;
const dynamicEl = document.getElementById('dynamic-title');

function type() {
  if (!dynamicEl) return;
  const word = titles[tIdx];
  if (!deleting) {
    dynamicEl.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(type, 1600); return; }
  } else {
    dynamicEl.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; tIdx = (tIdx + 1) % titles.length; }
  }
  setTimeout(type, deleting ? 60 : 110);
}
type();

/* ── Navbar scroll behaviour ───────────────────────────────── */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 20);
  backTop.classList.toggle('visible', y > 400);
  updateActiveNav();
});

backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Mobile hamburger ──────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Active nav link on scroll ─────────────────────────────── */
const sections = ['home','about','skills','projects','contact'];
function updateActiveNav() {
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
}

/* ── Scroll reveal ─────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Counter animation ─────────────────────────────────────── */
function animateCounter(el) {
  const target = +el.dataset.target;
  let count = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = Math.floor(count);
    if (count >= target) clearInterval(timer);
  }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-number').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);

/* ── Skills data & rendering ───────────────────────────────── */
const skillsData = {
  ml: [
    { icon: '🤖', name: 'Machine Learning', pct: 82 },
    { icon: '🧠', name: 'Deep Learning',    pct: 75 },
    { icon: '👁️', name: 'Computer Vision',  pct: 70 },
    { icon: '💬', name: 'NLP',              pct: 68 },
    { icon: '📈', name: 'Data Analysis',    pct: 88 },
    { icon: '📊', name: 'Statistics',       pct: 85 },
  ],
  prog: [
    { icon: '🐍', name: 'Python',      pct: 90 },
    { icon: '📐', name: 'R Language',  pct: 72 },
    { icon: '🗄️', name: 'SQL',         pct: 78 },
    { icon: '🟨', name: 'JavaScript',  pct: 60 },
    { icon: '💻', name: 'C++',         pct: 65 },
    { icon: '🔢', name: 'MATLAB',      pct: 60 },
  ],
  tools: [
    { icon: '🔬', name: 'TensorFlow',   pct: 75 },
    { icon: '🔥', name: 'PyTorch',      pct: 70 },
    { icon: '🔭', name: 'Scikit-learn', pct: 85 },
    { icon: '🐼', name: 'Pandas',       pct: 88 },
    { icon: '🔢', name: 'NumPy',        pct: 90 },
    { icon: '📉', name: 'Matplotlib',   pct: 82 },
  ]
};

let activeTab = 'ml';

function renderSkills(tab) {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.innerHTML = '';
  skillsData[tab].forEach((skill, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <span class="skill-icon">${skill.icon}</span>
      <span>${skill.name}</span>
      <div class="skill-bar-wrap">
        <div class="skill-bar" data-pct="${skill.pct}"></div>
      </div>
    `;
    grid.appendChild(card);
    requestAnimationFrame(() => {
      setTimeout(() => {
        card.querySelector('.skill-bar').style.width = skill.pct + '%';
      }, 100 + i * 70);
    });
  });
}

document.querySelectorAll('.skill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeTab = tab.dataset.tab;
    renderSkills(activeTab);
  });
});

renderSkills(activeTab);

/* ── Contact form validation ───────────────────────────────── */
const form = document.getElementById('contact-form');

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearErrors() {
  ['error-name','error-email','error-message'].forEach(id => showError(id, ''));
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();
  const name    = document.getElementById('contact-name');
  const email   = document.getElementById('contact-email');
  const message = document.getElementById('contact-message');
  let valid = true;

  if (!name.value.trim()) {
    showError('error-name', 'Name is required.');
    name.classList.add('error'); valid = false;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError('error-email', 'Please enter a valid email.');
    email.classList.add('error'); valid = false;
  }
  if (!message.value.trim()) {
    showError('error-message', 'Message cannot be empty.');
    message.classList.add('error'); valid = false;
  }
  if (!valid) return;

  const btnText   = document.getElementById('btn-text');
  const btnLoader = document.getElementById('btn-loader');
  const successEl = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');
  submitBtn.disabled = true;

  setTimeout(() => {
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
    submitBtn.disabled = false;
    successEl.classList.remove('hidden');
    form.reset();
    setTimeout(() => successEl.classList.add('hidden'), 5000);
  }, 1800);
});

/* ── Smooth scroll for hash links ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
