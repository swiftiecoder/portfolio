<script setup>
import { shallowRef, ref, onMounted } from 'vue'
import * as THREE from 'three'
import { Html } from '@tresjs/cientos'

const emits = defineEmits(['pageClick'])

const docTexture = shallowRef(null)

onMounted(() => {
  // Generate a procedural SVG texture that looks like text blocks
  const svgString = `
  <svg width="400" height="520" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#FDFBF7"/>
    <!-- Header / Name -->
    <rect x="40" y="40" width="200" height="24" fill="#333" rx="2"/>
    <rect x="40" y="70" width="120" height="10" fill="#666" rx="2"/>
    
    <!-- Content Blocks -->
    <rect x="40" y="110" width="100" height="12" fill="#555" rx="2"/>
    <rect x="40" y="130" width="320" height="6" fill="#888" rx="2"/>
    <rect x="40" y="142" width="300" height="6" fill="#888" rx="2"/>
    <rect x="40" y="154" width="280" height="6" fill="#888" rx="2"/>
    
    <rect x="40" y="190" width="140" height="12" fill="#555" rx="2"/>
    <rect x="40" y="210" width="320" height="6" fill="#888" rx="2"/>
    <rect x="40" y="222" width="310" height="6" fill="#888" rx="2"/>
    <rect x="40" y="234" width="290" height="6" fill="#888" rx="2"/>
    <rect x="40" y="246" width="150" height="6" fill="#888" rx="2"/>
    
    <rect x="40" y="282" width="110" height="12" fill="#555" rx="2"/>
    <rect x="40" y="302" width="320" height="6" fill="#888" rx="2"/>
    <rect x="40" y="314" width="300" height="6" fill="#888" rx="2"/>
    <rect x="40" y="326" width="315" height="6" fill="#888" rx="2"/>
    <rect x="40" y="338" width="220" height="6" fill="#888" rx="2"/>
  </svg>
  `
  
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  
  const loader = new THREE.TextureLoader()
  const tex = loader.load(url, () => {
    URL.revokeObjectURL(url)
  })
  
  tex.colorSpace = THREE.SRGBColorSpace
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  
  docTexture.value = tex
})

// Data for the strewn pages using Y-axis rotations for a box lying flat
const pagesData = [
  { 
    id: 'Resume', 
    title: 'Resume', 
    position: [-0.5, 0.015, 0.5], 
    rotation: [0, 0.2, 0] 
  },
  { 
    id: 'AcademicCV', 
    title: 'Academic CV', 
    position: [0.8, 0.01, 1.2], 
    rotation: [0, -0.3, 0] 
  }
]

// State
const hoveredPageIndex = shallowRef(null)

const handlePageClick = (id) => {
  emits('pageClick', id)
}
</script>

<template>
  <TresGroup>
    <TresMesh 
      v-for="(page, index) in pagesData" 
      :key="page.id"
      :position="page.position"
      :rotation="hoveredPageIndex === index ? [0, page.rotation[1], 0] : page.rotation"
      cast-shadow 
      receive-shadow
      @pointer-enter="hoveredPageIndex = index"
      @pointer-leave="hoveredPageIndex = hoveredPageIndex === index ? null : hoveredPageIndex"
      @click="handlePageClick(page.id)"
    >
      <!-- A4 Paper Box -->
      <TresBoxGeometry :args="[1.4, 0.005, 1.8]" />
      <TresMeshStandardMaterial 
        :color="hoveredPageIndex === index ? '#FFFFFF' : '#EEEEEE'" 
        :map="docTexture"
        roughness="0.9" 
        metalness="0.0" 
      />

      <!-- Hover Tooltip -->
      <Html 
        v-if="hoveredPageIndex === index" 
        transform 
        :position="[0, 0.2, 0]" 
        :rotation="[-Math.PI/4, 0, 0]"
        center 
        wrapper-class="page-tooltip"
      >
        <div class="page-label">
           {{ page.title }}
        </div>
      </Html>
    </TresMesh>
  </TresGroup>
</template>

<style scoped>
:deep(.page-tooltip) {
  pointer-events: none;
}
.page-label {
  background: rgba(245, 245, 236, 0.95);
  color: #333;
  padding: 6px 12px;
  border-radius: 2px;
  font-family: 'Georgia', serif;
  font-size: 0.9rem;
  letter-spacing: 1px;
  border: 1px solid #CCC;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  animation: floatUp 0.2s ease-out forwards;
}
@keyframes floatUp {
  0% { transform: translateY(5px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
</style>
