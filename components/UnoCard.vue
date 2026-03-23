<script setup>
import { shallowRef, onMounted } from 'vue'
import * as THREE from 'three'
import { Html } from '@tresjs/cientos'

const emits = defineEmits(['itemClick'])

const hovered = shallowRef(false)
const textureRef = shallowRef(null)

const cardGeo = new THREE.BoxGeometry(0.56, 0.005, 0.88)

onMounted(() => {
    const loader = new THREE.TextureLoader()
    const texture = loader.load('/uno card.webp')
    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    textureRef.value = texture
})

const handleHover = (state) => {
    hovered.value = state
    document.body.style.cursor = state ? 'pointer' : 'auto'
}
</script>

<template>
  <TresGroup v-if="textureRef">
    <TresMesh
      :position="[0, hovered ? 0.05 : 0, 0]"
      :rotation="[hovered ? -0.1 : 0, 0, hovered ? 0.05 : 0]"
      cast-shadow
      receive-shadow
      @pointer-enter="handleHover(true)"
      @pointer-leave="handleHover(false)"
      @click="emits('itemClick', 'DevAdvocate')"
    >
      <primitive :object="cardGeo" />
      
      <TresMeshStandardMaterial color="#111111" roughness="0.7" attach="material-0" />
      <TresMeshStandardMaterial color="#111111" roughness="0.7" attach="material-1" />
      <!-- Top (Face) with texture - applying a slight warm/dark filter and reducing glare -->
      <TresMeshStandardMaterial color="#d4cbb8" :map="textureRef" roughness="0.85" attach="material-2" />
      <!-- Bottom (Back) - simple red with high roughness for the back of the card -->
      <TresMeshStandardMaterial color="#d32f2f" roughness="0.9" attach="material-3" />
      <TresMeshStandardMaterial color="#111111" roughness="0.7" attach="material-4" />
      <TresMeshStandardMaterial color="#111111" roughness="0.7" attach="material-5" />

      <!-- Hover Tooltip -->
      <Html 
        v-if="hovered" 
        transform 
        :position="[0, 0.05, 0]" 
        :rotation="[-Math.PI / 2, 0, 0]"
        center 
        wrapper-class="ucard-tooltip"
      >
        <div class="card-label">
           Developer Advocate
        </div>
      </Html>
    </TresMesh>
  </TresGroup>
</template>

<style scoped>
:deep(.ucard-tooltip) {
  pointer-events: none;
}
.card-label {
  background: rgba(15, 10, 25, 0.9);
  color: #fff;
  padding: 6px 16px;
  border-radius: 4px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  letter-spacing: 1px;
  border: 1px solid #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  animation: floatIn 0.2s ease-out forwards;
  white-space: nowrap;
}

@keyframes floatIn {
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
</style>
