import { renderMenu, renderIframe } from './ui';

// URLs de desarrollo y producción
const isProd = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

const MODULES = {
  quiz: isProd ? '/angular/' : 'http://localhost:4200',      
  matching: isProd ? '/react/' : 'http://localhost:5173',  
  cards: isProd ? '/vue/' : 'http://localhost:5174'      
};

export function handleRoute() {
  const hash = window.location.hash;

  if (hash === '#quiz') {
    renderIframe(MODULES.quiz);
  } else if (hash === '#matching') {
    renderIframe(MODULES.matching);
  } else if (hash === '#cards') {
    renderIframe(MODULES.cards);
  } else {
    // Default to menu
    renderMenu();
  }
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
}
