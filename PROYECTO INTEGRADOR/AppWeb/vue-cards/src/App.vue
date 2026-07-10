<template>
  <div class="container">
    <div v-if="!auth.isReady">
      <p>Conectando con QuestiaSpace...</p>
    </div>
    <div v-else>
      <header style="margin-bottom: 2rem;">
        <h1 style="color: var(--color-primary);">Módulo Cards</h1>
        <p>Aprende con tarjetas didácticas.</p>
      </header>
      
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'

const auth = useAuthStore()

onMounted(() => {
  auth.setupListener()
})
</script>
