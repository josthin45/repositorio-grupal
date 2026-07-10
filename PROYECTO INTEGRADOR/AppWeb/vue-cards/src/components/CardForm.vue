<template>
  <div class="card-container">
    <h2>Nueva Tarjeta</h2>
    
    <form @submit.prevent="submitForm" style="margin-top: 1.5rem;">
      <div class="form-group">
        <label>ID Categoría (Temporal)</label>
        <input type="text" v-model="form.categoria_id" required>
      </div>
      
      <div class="form-group">
        <label>Pregunta (Anverso)</label>
        <input type="text" v-model="form.pregunta" required>
      </div>
      
      <div class="form-group">
        <label>Respuesta (Reverso)</label>
        <input type="text" v-model="form.respuesta" required>
      </div>
      
      <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Guardando...' : 'Guardar' }}
        </button>
        <router-link to="/" class="btn btn-outline">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSupabase } from '../services/supabase'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const form = ref({
  categoria_id: '',
  pregunta: '',
  respuesta: ''
})

const submitForm = async () => {
  const supabase = getSupabase()
  if (!supabase || !auth.userId) return
  
  loading.value = true
  const { error } = await supabase.from('tarjetas').insert({
    ...form.value,
    usuario_id: auth.userId
  })
  
  loading.value = false
  if (error) {
    alert(error.message)
  } else {
    router.push('/')
  }
}
</script>
