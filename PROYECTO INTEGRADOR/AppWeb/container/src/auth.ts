import { supabase } from './api';

export async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error checking session:', error.message);
    return null;
  }
  return data.session;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  }
}

// Inyectamos el token en los iframes cuando se comunican con la contenedora
export function setupIframeCommunication(session: any) {
  window.addEventListener('message', (event) => {
    // Escucha peticiones de token desde los iframes
    if (event.data && event.data.type === 'REQUEST_SESSION') {
      if (event.source) {
        (event.source as Window).postMessage({
          type: 'SESSION_DATA',
          payload: session
        }, '*');
      }
    }
  });
}
