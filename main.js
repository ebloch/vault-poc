// ── Scroll fade-in animations ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// ── Nav glassmorphism on scroll ──
const nav = document.getElementById('nav');

function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Signup form handling ──
document.querySelectorAll('[data-signup-form]').forEach((form) => {
  const emailInput = form.querySelector('[data-email]');
  const passwordInput = form.querySelector('[data-password]');
  const submitBtn = form.querySelector('[data-submit]');
  const errorEl = form.querySelector('[data-form-error]');
  const successEl = form.querySelector('[data-form-success]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset state
    errorEl.textContent = '';
    successEl.style.display = 'none';

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errorEl.textContent = 'Please enter a valid email address.';
      emailInput.focus();
      return;
    }

    // Validate password
    if (!password || password.length < 8) {
      errorEl.textContent = 'Password must be at least 8 characters.';
      passwordInput.focus();
      return;
    }

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Fake submit (1.5s delay)
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      // Hide fields, show success
      form.querySelector('.form-fields').style.display = 'none';
      successEl.textContent =
        "You're in. We'll notify you when Vault is ready.";
      successEl.style.display = 'block';
    }, 1500);
  });
});
