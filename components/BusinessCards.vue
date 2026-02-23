<script setup>
import { shallowRef, ref, onMounted } from 'vue'
import * as THREE from 'three'
import { Html } from '@tresjs/cientos'

const emits = defineEmits(['linkClick'])

const hoveredCardIndex = shallowRef(null)
const cardTextures = shallowRef([])

const cards = [
  {
    name: "LinkedIn",
    link: "https://linkedin.com",
    color: "#ffffff",
    textColor: "#0a66c2",
    pos: [3.2, 0.011, 2.0],
    rot: [0, -0.4, 0],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
  },
  {
    name: "GitHub",
    link: "https://github.com",
    color: "#24292e",
    textColor: "#ffffff",
    pos: [4.2, 0.015, 2.1],
    rot: [0, 0.2, 0],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
  },
  {
    name: "Substack",
    link: "https://substack.com",
    color: "#ff6719",
    textColor: "#ffffff",
    pos: [3.7, 0.015, 1.5],
    rot: [0, 0.8, 0],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>`
  }
]

const cardGeo = new THREE.BoxGeometry(0.75, 0.005, 0.42)

const createCardTexture = (card) => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
        resolve(null)
        return
    }
    const canvas = document.createElement('canvas')
    canvas.width = 550
    canvas.height = 320
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = card.color
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Text Setup
    ctx.fillStyle = card.textColor
    ctx.font = 'bold 64px "Helvetica Neue", Arial, sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    // Compute layout
    // We'll place the icon and text roughly in the center
    const img = new Image()
    const svgData = `data:image/svg+xml;base64,${btoa(card.svg)}`
    
    img.onload = () => {
      const iconSize = 80
      const gap = 30
      // Approximate text width
      const textWidth = ctx.measureText(card.name).width
      
      const totalWidth = iconSize + gap + textWidth
      const startX = (canvas.width - totalWidth) / 2
      const centerY = canvas.height / 2
      
      ctx.drawImage(img, startX, centerY - iconSize / 2, iconSize, iconSize)
      ctx.fillText(card.name, startX + iconSize + gap, centerY)

      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      resolve(texture)
    }
    img.src = svgData
  })
}

onMounted(async () => {
  const textures = await Promise.all(cards.map(card => createCardTexture(card)))
  cardTextures.value = textures
})

const handleHover = (index) => {
  hoveredCardIndex.value = index
  document.body.style.cursor = 'pointer'
}

const handleLeave = (index) => {
  if (hoveredCardIndex.value === index) {
    hoveredCardIndex.value = null
    document.body.style.cursor = 'auto'
  }
}

const openLink = (link) => {
  if (link && link !== "#") {
     window.open(link, '_blank')
  }
}
</script>

<template>
  <TresGroup v-if="cardTextures.length === cards.length">
    <TresMesh
      v-for="(card, i) in cards"
      :key="card.name"
      :position="[
        card.pos[0], 
        hoveredCardIndex === i ? card.pos[1] + 0.1 : card.pos[1], 
        card.pos[2]
      ]"
      :rotation="[
        hoveredCardIndex === i ? -0.1 : 0,
        card.rot[1],
        hoveredCardIndex === i ? 0.05 : 0
      ]"
      cast-shadow
      receive-shadow
      @pointer-enter="handleHover(i)"
      @pointer-leave="handleLeave(i)"
      @click="openLink(card.link)"
    >
      <primitive :object="cardGeo" />
      
      <!-- Materials for the 6 sides of a BoxGeometry: right, left, top, bottom, front, back -->
      <TresMeshStandardMaterial :color="card.color" roughness="0.7" attach="material-0" />
      <TresMeshStandardMaterial :color="card.color" roughness="0.7" attach="material-1" />
      <!-- Top (Face) with dynamically generated CanvasTexture -->
      <TresMeshStandardMaterial :color="card.color" :map="cardTextures[i]" roughness="0.4" attach="material-2" />
      <TresMeshStandardMaterial :color="card.color" roughness="0.8" attach="material-3" />
      <TresMeshStandardMaterial :color="card.color" roughness="0.7" attach="material-4" />
      <TresMeshStandardMaterial :color="card.color" roughness="0.7" attach="material-5" />

      <!-- Hover Tooltip -->
      <Html 
        v-if="hoveredCardIndex === i" 
        transform 
        :position="[0, 0.05, 0]" 
        :rotation="[-Math.PI / 2, 0, 0]"
        center 
        wrapper-class="bcard-tooltip"
      >
        <div class="card-label">
           {{ card.name }}
        </div>
      </Html>
    </TresMesh>
  </TresGroup>
</template>

<style scoped>
:deep(.bcard-tooltip) {
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
