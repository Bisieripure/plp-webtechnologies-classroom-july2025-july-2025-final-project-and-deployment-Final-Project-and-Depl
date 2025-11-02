/* main.js — site scripts: nav toggle, reveal on scroll, simple form validation, project filter */

document.addEventListener('DOMContentLoaded', () => {
  // set years in footer
  const yrs = new Date().getFullYear();
  ['year','year2','year3','year4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = yrs;
  });

  // Nav toggle (works for all header instances)
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const navId = btn.getAttribute('aria-controls');
      const nav = document.getElementById(navId);
      if (!nav) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      // toggle display for small screens by using aria-hidden
      if (nav.style.display === 'block') {
        nav.style.display = '';
        nav.setAttribute('aria-hidden', 'true');
      } else {
        nav.style.display = 'block';
        nav.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // Intersection Observer for reveal animations
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, {threshold: 0.12});
    reveals.forEach(el => io.observe(el));
  }

  // Project filter (projects.html)
  const filter = document.getElementById('filter');
  const grid = document.getElementById('projectsGrid');
  if (filter && grid) {
    filter.addEventListener('change', (e) => {
      const val = e.target.value;
      const items = grid.querySelectorAll('.project');
      items.forEach(item => {
        const type = item.getAttribute('data-type');
        if (val === 'all' || type === val) item.style.display = '';
        else item.style.display = 'none';
      });
    });
  }

  // Simple form validation & submit (contact.html)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // built-in validation
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // If using Netlify forms the form will submit normally.
      // Here we'll simulate a success state for demo (or you'd wire up fetch to your backend)
      formStatus.textContent = 'Sending…';

      // Simulate async send
      setTimeout(() => {
        contactForm.reset();
        formStatus.textContent = 'Thanks — your message was sent!';
      }, 900);
    });
  }

  // Keyboard accessibility: close nav with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.primary-nav').forEach(nav => {
        nav.style.display = '';
        nav.setAttribute('aria-hidden','true');
      });
      document.querySelectorAll('.nav-toggle').forEach(btn => btn.setAttribute('aria-expanded','false'));
    }
  });
});
