/* ======================================
   main.js — Aksila Portofolio
   ====================================== */

/* ---- Tahun Footer ---- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---- Navbar: scroll effect & active link ---- */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Scrolled style
  if (window.scrollY > 60) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }

  // Active link tracking
  let currentSection = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) currentSection = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });

  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('scroll-top');
  if (window.scrollY > 400) {
    scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
  } else {
    scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
  }
});

/* ---- Hamburger menu (mobile) ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
  });
});

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Scroll-to-top ---- */
document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Reveal on scroll (Intersection Observer) ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger animation for siblings
      const siblings = entry.target.parentElement?.querySelectorAll('.reveal');
      if (siblings) {
        siblings.forEach((el, idx) => {
          setTimeout(() => el.classList.add('visible'), idx * 100);
        });
      }
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- Skill bar animation (triggered on scroll into view) ---- */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        const targetWidth = bar.getAttribute('data-w');
        setTimeout(() => { bar.style.width = targetWidth; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

/* ---- Typewriter effect (Hero) ---- */
const typewriterEl = document.getElementById('typewriter');
const words = [
  'Web Enthusiast 💻',
  'System Analyst 📊',
  'UI/UX Explorer 🎨',
  'Peneliti Sistem Informasi 🔍',
];
let wordIdx = 0, charIdx = 0, deleting = false;

function typeEffect() {
  const current = words[wordIdx];
  if (!deleting) {
    typewriterEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typewriterEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
  }
  setTimeout(typeEffect, deleting ? 60 : 90);
}
typeEffect();

/* ---- Contact Form Handler ---- */
function handleForm(e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  const form = document.getElementById('contact-form');
  form.style.display = 'none';
  msg.classList.remove('hidden');
  setTimeout(() => {
    form.style.display = 'block';
    msg.classList.add('hidden');
    form.reset();
  }, 3500);
}
