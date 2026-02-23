<script setup>
import { onErrorCaptured, onMounted } from 'vue'

onErrorCaptured((err) => {
  console.error('[App Error Captured]:', err)
  // return false to stop propagation to the default app errorHandler (which crashes on ThreeJS objects)
  return false
})

onMounted(() => {
  // Mute specific noisy warnings from upstream libraries (Vue Suspense, ThreeJS Clock)
  const originalWarn = console.warn
  console.warn = (...args) => {
    const msg = args[0]
    if (typeof msg === 'string') {
      if (msg.includes('THREE.Clock: This module has been deprecated')) return
      if (msg.includes('<Suspense> is an experimental feature')) return
      if (msg.includes('Hydration children mismatch')) return // Expected minor mismatch from TresJS
      if (msg.includes('Hydration node mismatch')) return // Expected minor mismatch from TresJS
    }
    originalWarn(...args)
  }
})
</script>

<template>
  <NuxtPage />
</template>

<style>
/* Reset global styles that might interfere with TresJS. Specific retro styles should be inside retro.vue or handled per page. */
html, body, #__nuxt {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
