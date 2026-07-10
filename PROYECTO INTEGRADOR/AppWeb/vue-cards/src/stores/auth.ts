import { defineStore } from 'pinia'
import { ref } from 'vue'
import { initSupabase } from '../services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const isReady = ref(false)
  const userId = ref<string | null>(null)

  const setupListener = () => {
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.data && event.data.type === 'SESSION_DATA') {
        const session = event.data.payload
        userId.value = session.user?.id || null
        initSupabase(session.access_token)
        isReady.value = true
      }
    })
    
    // Petición inicial
    window.parent.postMessage({ type: 'REQUEST_SESSION' }, '*')
  }

  return { isReady, userId, setupListener }
})
