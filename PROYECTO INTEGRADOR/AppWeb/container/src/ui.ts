import { supabase } from './api';

export function renderLogin() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="auth-container">
      <div class="auth-card glass-panel">
        <h2 class="auth-title">Iniciar Sesión</h2>
        <form id="login-form">
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" required placeholder="correo@ejemplo.com">
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" required placeholder="••••••••">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
            Entrar
          </button>
        </form>
        <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem;">
          ¿No tienes cuenta? <a href="#" id="go-to-register">Regístrate</a>
        </p>
      </div>
    </div>
  `;

  const form = document.getElementById('login-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Error: ' + error.message);
    } else {
      window.location.hash = '#menu';
      window.location.reload();
    }
  });
}

export function renderRegister() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="auth-container">
      <div class="auth-card glass-panel">
        <h2 class="auth-title">Registro</h2>
        <form id="register-form">
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" required placeholder="correo@ejemplo.com">
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" required placeholder="••••••••">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
            Registrarse
          </button>
        </form>
        <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem;">
          ¿Ya tienes cuenta? <a href="#" id="go-to-login">Inicia Sesión</a>
        </p>
      </div>
    </div>
  `;

  const form = document.getElementById('register-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Registro exitoso. Revisa tu correo o inicia sesión.');
      renderLogin();
    }
  });

  document.getElementById('go-to-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    renderLogin();
  });
}

export function renderLayout(session: any) {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <nav class="navbar">
      <div class="navbar-brand">QuestiaSpace</div>
      <div class="navbar-menu">
        <span style="font-size: 0.9rem; color: var(--text-muted)">
          ${session?.user?.email}
        </span>
        <button id="theme-btn" class="theme-toggle">🌙</button>
        <button id="logout-btn" class="btn btn-secondary">Salir</button>
      </div>
    </nav>
    <main id="main-content" class="main-content">
      <!-- El contenido dinámico va aquí -->
    </main>
  `;

  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.hash = '';
    window.location.reload();
  });

  const themeBtn = document.getElementById('theme-btn');
  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeBtn.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  });
}

export function renderMenu() {
  const main = document.getElementById('main-content');
  if (!main) return;

  main.innerHTML = `
    <div class="module-grid">
      <div class="module-card" id="card-quiz">
        <div class="module-icon">📝</div>
        <h3 class="module-title">Quiz</h3>
        <p class="module-desc">Evalúa tus conocimientos con cuestionarios interactivos (Angular).</p>
      </div>
      <div class="module-card" id="card-matching">
        <div class="module-icon">🔗</div>
        <h3 class="module-title">Matching</h3>
        <p class="module-desc">Ejercicios de relación de conceptos (React).</p>
      </div>
      <div class="module-card" id="card-cards">
        <div class="module-icon">📇</div>
        <h3 class="module-title">Cards</h3>
        <p class="module-desc">Estudia con tarjetas didácticas (Vue 3).</p>
      </div>
    </div>
  `;

  document.getElementById('card-quiz')?.addEventListener('click', () => {
    window.location.hash = '#quiz';
  });
  document.getElementById('card-matching')?.addEventListener('click', () => {
    window.location.hash = '#matching';
  });
  document.getElementById('card-cards')?.addEventListener('click', () => {
    window.location.hash = '#cards';
  });
}

export function renderIframe(moduleUrl: string) {
  const main = document.getElementById('main-content');
  if (!main) return;

  main.innerHTML = `
    <div style="padding: 1rem;">
      <button class="btn btn-secondary" id="back-btn">← Volver al Menú</button>
    </div>
    <iframe id="module-container" src="${moduleUrl}"></iframe>
  `;

  document.getElementById('back-btn')?.addEventListener('click', () => {
    window.location.hash = '#menu';
  });
}
