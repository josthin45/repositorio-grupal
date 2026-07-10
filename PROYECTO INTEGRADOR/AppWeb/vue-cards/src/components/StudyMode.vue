<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 2rem;">
      <h2>Modo Estudio</h2>
      <router-link to="/" class="btn btn-outline">Salir</router-link>
    </div>

    <div v-if="loading" style="text-align: center;">Cargando mazo...</div>
    <div v-else-if="tarjetas.length === 0" style="text-align: center;">No hay tarjetas disponibles.</div>
    <div v-else-if="currentIndex >= tarjetas.length" style="text-align: center;">
      <h3>¡Has terminado de repasar!</h3>
      <button class="btn btn-primary" @click="resetStudy" style="margin-top: 1rem;">Repasar de nuevo</button>
    </div>
    
    <div v-else>
      <div class="flashcard-scene" @click="flipCard">
        <div class="flashcard" :class="{ 'is-flipped': isFlipped }">
          <!-- Anverso -->
          <div class="flashcard-face">
            <h3 style="margin-bottom: 1rem;">Pregunta</h3>
            <p style="font-size: 1.5rem; font-weight: 500;">{{ currentCard.pregunta }}</p>
            <p style="font-size: 0.9rem; color: var(--text-muted); position: absolute; bottom: 1rem;">
              Clic para voltear
            </p>
          </div>
          <!-- Reverso -->
          <div class="flashcard-face flashcard-back">
            <h3 style="margin-bottom: 1rem;">Respuesta</h3>
            <p style="font-size: 1.5rem; font-weight: 500; color: var(--color-primary)">{{ currentCard.respuesta }}</p>
          </div>
        </div>
      </div>

      <!-- Controles de Autoevaluación -->
      <div v-if="isFlipped" style="display: flex; justify-content: center; gap: 1rem; margin-top: 2rem;">
        <button class="btn btn-outline" @click.stop="nextCard(false)" style="color: #ef4444; border-color: #ef4444;">
          No me la sabía
        </button>
        <button class="btn btn-primary" @click.stop="nextCard(true)">
          Me la sabía
        </button>
      </div>
      
      <p style="text-align: center; margin-top: 2rem; color: var(--text-muted);">
        Tarjeta {{ currentIndex + 1 }} de {{ tarjetas.length }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getSupabase } from '../services/supabase'
import type { Tarjeta } from '../types'

const tarjetas = ref<Tarjeta[]>([])
const loading = ref(true)
const currentIndex = ref(0)
const isFlipped = ref(false)

onMounted(async () => {
  const supabase = getSupabase()
  if (supabase) {
    const { data } = await supabase.from('tarjetas').select('*')
    if (data) {
      tarjetas.value = data.sort(() => Math.random() - 0.5) // Aleatorizar
    }
  }
  loading.value = false
})

const currentCard = computed(() => tarjetas.value[currentIndex.value])

const flipCard = () => {
  isFlipped.value = !isFlipped.value
}

const nextCard = (knewIt: boolean) => {
  // Aquí se podría guardar el nivel en Supabase para el algoritmo tipo Anki (SRS)
  console.log(`¿Se la sabía?: ${knewIt}`)
  
  isFlipped.value = false
  // Esperar a que gire antes de cambiar el texto
  setTimeout(() => {
    currentIndex.value++
  }, 300)
}

const resetStudy = () => {
  currentIndex.value = 0
  tarjetas.value = [...tarjetas.value].sort(() => Math.random() - 0.5)
}
</script>
