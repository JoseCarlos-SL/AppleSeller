// ── FORM: Enviar mensagem ──
const btnSend = document.querySelector('.btn-send');

if (btnSend) {
  btnSend.addEventListener('click', () => {
    const name    = document.querySelector('input[type="text"]').value.trim();
    const email   = document.querySelector('input[type="email"]').value.trim();
    const message = document.querySelector('.form-textarea').value.trim();

    if (!name || !email || !message) {
      showToast('Por favor, preencha todos os campos.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('Insira um e-mail válido.', 'error');
      return;
    }

    // Simulação de envio
    btnSend.disabled = true;
    btnSend.style.opacity = '0.7';
    btnSend.textContent = 'Enviando…';

    setTimeout(() => {
      showToast('Mensagem enviada com sucesso! ✓', 'success');
      document.querySelector('input[type="text"]').value  = '';
      document.querySelector('input[type="email"]').value = '';
      document.querySelector('.form-textarea').value      = '';
      btnSend.disabled = false;
      btnSend.style.opacity = '1';
      btnSend.innerHTML = `Enviar mensagem <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }, 1200);
  });
}

// ── HELPER: validação de e-mail ──
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── HELPER: toast de feedback ──
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: ${type === 'success' ? '#1d1d1f' : '#c0392b'};
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    padding: 14px 28px;
    border-radius: 980px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.18);
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 9999;
    white-space: nowrap;
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── HEADER: sombra ao rolar ──
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 1px 12px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// ── NAV: active link highlight ao rolar ──
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));
