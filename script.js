const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const form = document.querySelector('[data-contact-form]');
if (form) {
  const status = document.querySelector('[data-form-status]');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = 'Submitting...';
    status.className = 'form-status';

    const data = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        form.reset();
        status.textContent = 'Your consultation request was sent successfully.';
        status.className = 'form-status success';
      } else {
        status.textContent = 'Something went wrong. Please try again or call the office directly.';
        status.className = 'form-status error';
      }
    } catch (error) {
      status.textContent = 'Network issue. Please try again or call the office directly.';
      status.className = 'form-status error';
    }
  });
}
