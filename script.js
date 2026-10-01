const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? 'Close' : 'Menu';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = 'Menu';
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

// Replace this address before launch.
const WEBOLY_EMAIL = 'hello@weboly.in';
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const project = String(data.get('project') || '').trim();
  const message = String(data.get('message') || '').trim();

  const subject = encodeURIComponent(`WEBOLY enquiry — ${project}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject type: ${project}\n\n${message}`);
  window.location.href = `mailto:${WEBOLY_EMAIL}?subject=${subject}&body=${body}`;
  if (note) note.textContent = `Opening your email client for ${WEBOLY_EMAIL}.`;
});
