<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
      <h2>Mis Flashcards</h2>
      <div style="display: flex; gap: 1rem;">
        <router-link to="/study" class="btn btn-outline">Modo Estudio</router-link>
        <router-link to="/new" class="btn btn-primary">Nueva Tarjeta</router-link>
      </div>
    </div>

    <div v-if="loading">Cargando tarjetas...</div>
    <div v-else-if="tarjetas.length === 0">No tienes tarjetas. ¡Crea algunas!</div>
    
    <div v-else style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
      <div v-for="t in tarjetas" :key="t.id" class="card-container">
        <h4 style="margin-bottom: 0.5rem; color: var(--text-color);">Q: {{ t.pregunta }}</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem;">A: {{ t.respuesta }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSupabase } from '../services/supabase'
import type { Tarjeta } from '../types'

const tarjetas = ref<Tarjeta[]>([])
const loading = ref(true)

onMounted(async () => {
  const supabase = getSupabase()
  if (supabase) {
    const { data, error } = await supabase.from('tarjetas').select('*')
    if (!error && data) {
      tarjetas.value = data
    }
  }
  loading.value = false
})
</script>
