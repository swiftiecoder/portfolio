<script setup>
import { shallowRef, ref } from 'vue'
import { Html } from '@tresjs/cientos'

const emits = defineEmits(['cardClick'])

const projects = [
  'HTS', 'PortalLLM', 'GuardianAngel', 'MyDoctor', 'AcademicCV', 'Resume', 'Bio'
]
let currentCardIndex = 0

// Track hover state for interactivity feedback
const isHovered = shallowRef(false)
const deckGroupRef = shallowRef(null)

const drawCard = () => {
    const proj = projects[currentCardIndex]
    currentCardIndex = (currentCardIndex + 1) % projects.length
    emits('cardClick', proj)
}
</script>

<template>
  <TresGroup ref="deckGroupRef" @pointer-enter="isHovered = true" @pointer-leave="isHovered = false" @click="drawCard">
    <!-- Deck Pile -->
    <TresMesh :position="[0, 0.15, 0]" cast-shadow receive-shadow>
      <TresBoxGeometry :args="[1.2, 0.3, 2]" />
      <TresMeshStandardMaterial color="#2B1B24" roughness="0.9" />
    </TresMesh>
    
    <!-- Top Card (Lifts slightly on hover) -->
    <TresMesh :position="[0.05, isHovered ? 0.35 : 0.31, 0]" :rotation="[0, isHovered ? -0.1 : 0.1, 0]" cast-shadow>
      <TresBoxGeometry :args="[1.15, 0.02, 1.9]" />
      <!-- The back of the tarot card -->
      <TresMeshStandardMaterial color="#882233" roughness="0.6" metalness="0.2" />
    </TresMesh>

    <!-- Visual Polish: decorative band on the deck -->
    <TresMesh :position="[0, 0.15, 0]" cast-shadow receive-shadow>
      <TresBoxGeometry :args="[1.22, 0.1, 0.5]" />
      <TresMeshStandardMaterial color="#D4AF37" metalness="0.8" roughness="0.3" />
    </TresMesh>

    <Html v-if="isHovered" transform :position="[0, 1.5, 0]" center wrapper-class="tarot-tooltip">
      <div class="deck-label">
         Draw a Card
      </div>
    </Html>
  </TresGroup>
</template>

<style scoped>
:deep(.tarot-tooltip) {
  pointer-events: none;
}
.deck-label {
  background: rgba(43, 27, 36, 0.9);
  color: #EED8C0;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  letter-spacing: 1px;
  border: 1px solid #D4AF37;
  animation: popIn 0.2s ease-out forwards;
}
@keyframes popIn {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
