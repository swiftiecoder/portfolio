<script setup>
import { shallowRef, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const emits = defineEmits(['cardClick'])

// 4 Crown Jewels mapped to curated Tarot Arcana
const cardData = [
  { id: 'DevAdvocate', title: 'Developer Advocacy', arcana: 'V · The Hierophant', image: '/tarot/05-TheHierophant.webp' },
  { id: 'GuardianAngel', title: 'Guardian Angel', arcana: 'XIV · Temperance', image: '/tarot/14-Temperance.webp' },
  { id: 'FSNNA', title: 'Fan Studies (AO3)', arcana: 'VI · The Lovers', image: '/tarot/06-TheLovers.webp' },
  { id: 'HTS', title: 'Hook, Time & Singer', arcana: 'XIX · The Sun', image: '/tarot/19-TheSun.webp' }
]

const handOffsets = [
  { x: -0.07, z: 0.04, rot: -0.06 },
  { x: 0.04, z: -0.05, rot: 0.05 },
  { x: -0.04, z: -0.03, rot: -0.04 },
  { x: 0.06, z: 0.05, rot: 0.07 }
]

const cardRefs = shallowRef([])

// Layout math for an arc spread
const spreadRadius = 1.8
const spreadAngle = Math.PI / 3

const baseTransforms = cardData.map((_, index) => {
  const t = cardData.length > 1 ? index / (cardData.length - 1) : 0.5
  const angle = -spreadAngle / 2 + t * spreadAngle
  const mess = handOffsets[index]

  return {
    x: Math.sin(angle) * spreadRadius + mess.x,
    z: (1 - Math.cos(angle)) * spreadRadius - 1.2 + mess.z,
    rotY: -angle + mess.rot
  }
})

const cardBackTex = shallowRef(null)
const cardFaceTextures = shallowRef([])

// Animation state
const hoveredCardIndex = shallowRef(null)
const flippedCardIndex = shallowRef(null)
const flipProgress = shallowRef(0)
let animationFrameId = null
let targetFlipProgress = 0

// Geometry and Materials
const cardGeo = new THREE.BoxGeometry(0.8, 0.02, 1.4)
const edgeMaterial = new THREE.MeshStandardMaterial({ color: '#D4AF37', metalness: 0.8, roughness: 0.2 })

const onCardEnter = (index) => {
  hoveredCardIndex.value = index
  document.body.style.cursor = 'pointer'
}

const onCardLeave = (index) => {
  if (hoveredCardIndex.value === index) {
    hoveredCardIndex.value = null
    document.body.style.cursor = ''
  }
}

onMounted(() => {
  const loader = new THREE.TextureLoader()
  
  cardBackTex.value = loader.load('/tarot/CardBacks2.webp')
  cardBackTex.value.colorSpace = THREE.SRGBColorSpace
  
  const loadedFaces = []
  cardData.forEach(data => {
    const tex = loader.load(data.image)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.center.set(0.5, 0.5)
    loadedFaces.push(tex)
  })
  cardFaceTextures.value = loadedFaces
  
  startAnimationLoop()
})

const startAnimationLoop = () => {
  const animate = () => {
    // Smoothly interpolate flip progress
    const diff = targetFlipProgress - flipProgress.value
    if (Math.abs(diff) > 0.001) {
      flipProgress.value += diff * 0.25 
    } else {
      flipProgress.value = targetFlipProgress
    }
    
    // Update meshes directly for performance instead of through Vue template bindings
    if (cardRefs.value && cardRefs.value.length > 0) {
      cardRefs.value.forEach((mesh, index) => {
        if (!mesh) return
        
        const base = baseTransforms[index]
        const isHovered = hoveredCardIndex.value === index
        const isFlipped = flippedCardIndex.value === index
        
        let x = base.x
        let y = -0.01 + (index * 0.002) // Dropped slightly below 0 to sit perfectly on table
        let z = base.z
        
        // Base rotation starts face-down (bottom edge faces +Z/Viewer)
        let rotX = Math.PI 
        let rotY = base.rotY
        let rotZ = 0
        
        if (isHovered && !isFlipped && flippedCardIndex.value === null) {
          y += 0.2 // Levitate
          z += 0.1 // Pull forward
        }
        
        if (isFlipped) {
          // Simply flip over in place
          // Add a slight lift during the flip to prevent clipping through the desk
          const lift = Math.sin(flipProgress.value * Math.PI) * 0.4
          
          // Add a height offset so the flipped card lands resting visibly on top of all other cards
          const heightOffset = 0.08 * flipProgress.value
          
          y += lift + heightOffset
          
          // Rotate around X axis to flip it face up
          // Starts at Math.PI (face down), goes to 0 (face up)
          rotX = Math.PI - (Math.PI * flipProgress.value) 
        }
        
        // Directly apply to THREE.js objects
        mesh.position.set(x, y, z)
        mesh.rotation.set(rotX, rotY, rotZ)
      })
    }
    
    // If flip is basically done and we were flipping open
    if (targetFlipProgress === 1 && Math.abs(diff) < 0.01 && flippedCardIndex.value !== null) {
      // Prevent re-triggering this block while we wait
      const currentIndex = flippedCardIndex.value
      targetFlipProgress = 1.01 // Slight offset so diff < 0.01 is false on next frame
      
      // Wait before opening modal and putting card back
      setTimeout(() => {
        emits('cardClick', cardData[currentIndex].id)
        
        // Reset after emitting so they slowly flip back down
        targetFlipProgress = 0
        setTimeout(() => {
          flippedCardIndex.value = null
        }, 300)
      }, 500)
    }
    
    animationFrameId = requestAnimationFrame(animate)
  }
  animate()
}

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})

const handleCardClick = (index) => {
  if (flippedCardIndex.value !== null) return // Already animating a card
  
  flippedCardIndex.value = index
  targetFlipProgress = 1
}

// Layout and Rotations are now handled in the render loop for performance

</script>

<template>
  <TresGroup>
    <template v-if="cardFaceTextures.length > 0 && cardBackTex">
      <TresMesh 
        v-for="(card, index) in cardData" 
        :key="card.id"
        ref="cardRefs"

        cast-shadow 
        receive-shadow
        @pointer-enter="onCardEnter(index)"
        @pointer-leave="onCardLeave(index)"
        @click.stop="handleCardClick(index)"
      >
        <primitive :object="cardGeo" />
        
        <!-- BoxGeometry materials array order: right, left, top, bottom, front, back -->
        <TresMeshStandardMaterial :color="edgeMaterial.color" :metalness="0.8" :roughness="0.2" attach="material-0" /> <!-- right -->
        <TresMeshStandardMaterial :color="edgeMaterial.color" :metalness="0.8" :roughness="0.2" attach="material-1" /> <!-- left -->
        <TresMeshStandardMaterial :map="cardFaceTextures[index]" roughness="0.5" metalness="0.1" attach="material-2" /> <!-- top (face) -->
        <TresMeshStandardMaterial :map="cardBackTex" roughness="0.4" metalness="0.3" attach="material-3" /> <!-- bottom (back, pointing up initially since X rot is Math.PI) -->
        <TresMeshStandardMaterial :color="edgeMaterial.color" :metalness="0.8" :roughness="0.2" attach="material-4" /> <!-- front -->
        <TresMeshStandardMaterial :color="edgeMaterial.color" :metalness="0.8" :roughness="0.2" attach="material-5" /> <!-- back -->
      </TresMesh>
    </template>
  </TresGroup>
</template>
