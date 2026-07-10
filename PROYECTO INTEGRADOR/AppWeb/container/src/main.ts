import './styles.css';
import { checkSession, setupIframeCommunication } from './auth';
import { renderLogin, renderLayout, renderRegister } from './ui';
import { initRouter, handleRoute } from './router';

async function bootstrap() {
  const session = await checkSession();

  if (!session) {
    // Escuchar si el usuario quiere ir a registro (muy simple, se maneja en el DOM)
    renderLogin();
    
    // Un hack rápido para escuchar el link de registro
    setTimeout(() => {
      document.getElementById('go-to-register')?.addEventListener('click', (e) => {
        e.preventDefault();
        renderRegister();
      });
    }, 100);
    return;
  }

  // Usuario autenticado
  setupIframeCommunication(session);
  renderLayout(session);
  initRouter();
  handleRoute();
}

bootstrap();
