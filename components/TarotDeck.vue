<script setup>
import { shallowRef, ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { Html } from '@tresjs/cientos'

const emits = defineEmits(['cardClick'])

// 4 Projects mapped to provided images
const cardData = [
  { id: 'HTS', title: 'HTS', image: '/tarot/00-TheFool.png' },
  { id: 'PortalLLM', title: 'PortalLLM', image: '/tarot/05-TheHierophant.png' },
  { id: 'GuardianAngel', title: 'Guardian Angel', image: '/tarot/06-TheLovers.png' },
  { id: 'MyDoctor', title: 'My Doctor', image: '/tarot/14-Temperance.png' }
]

const randomOffsets = cardData.map(() => ({
  x: (Math.random() - 0.5) * 0.3, // Reduced messiness slightly to keep them safer on table
  z: (Math.random() - 0.5) * 0.3,
  rot: (Math.random() - 0.5) * 0.3
}))

const cardBackTex = shallowRef(null)
const cardFaceTextures = shallowRef([])

// Animation state
const hoveredCardIndex = shallowRef(null)
const flippedCardIndex = shallowRef(null)
const flipProgress = shallowRef(0) // 0 to 1 value for animation
let animationFrameId = null
let targetFlipProgress = 0

// Geometry and Materials (Made smaller as requested)
const cardGeo = new THREE.BoxGeometry(0.8, 0.02, 1.4) 
const edgeMaterial = new THREE.MeshStandardMaterial({ color: '#D4AF37', metalness: 0.8, roughness: 0.2 }) // Gold edges

onMounted(() => {
  const loader = new THREE.TextureLoader()
  
  cardBackTex.value = loader.load('/tarot/CardBacks.png')
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
    // Smoothly interpolate flip progress (increased ease factor for faster animation)
    const diff = targetFlipProgress - flipProgress.value
    flipProgress.value += diff * 0.25 
    
    // If flip is basically done and we were flipping open
    if (targetFlipProgress === 1 && diff < 0.01 && flippedCardIndex.value !== null) {
      // Prevent re-triggering this block while we wait
      const currentIndex = flippedCardIndex.value
      targetFlipProgress = 1.01 // Slight offset so diff < 0.01 is false on next frame
      
      // Wait 2 seconds before opening modal and putting card back
      setTimeout(() => {
        emits('cardClick', cardData[currentIndex].id)
        
        // Reset after emitting so they slowly flip back down
        targetFlipProgress = 0
        setTimeout(() => {
          flippedCardIndex.value = null
        }, 300)
      }, 2000)
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

// Layout math for an arc spread
const spreadRadius = 1.8 // Reduced radius so cards group closer together
const spreadAngle = Math.PI / 3 // Tighter angle so edges don't fall off the desk
const getCardPosition = (index, isHovered, isFlipped) => {
  const t = cardData.length > 1 ? index / (cardData.length - 1) : 0.5
  const angle = -spreadAngle/2 + (t * spreadAngle)
  const mess = randomOffsets[index]
  
  let x = Math.sin(angle) * spreadRadius + mess.x
  // Invert Z to arc upward (away from the user on the screen) AND shift deeper into the desk
  // Adjusted offset since radius changes the depth
  let z = (1 - Math.cos(angle)) * spreadRadius - 1.2 + mess.z 
  
  let y = 0.02 + (index * 0.01) // Slight stacking overlap
  
  if (isHovered && !isFlipped && flippedCardIndex.value === null) {
    y += 0.2 // Levitate
    z += 0.1 // Pull forward
  }
  
  if (isFlipped) {
    // When flipping, move it up significantly and forward to the camera
    y += 1.5 * flipProgress.value
    z += 3 * flipProgress.value // Positive Z is toward the camera (viewer)
    x *= (1 - flipProgress.value) // Center it horizontally as it flips
  }
  
  return [x, y, z]
}

const getCardRotation = (index, isFlipped) => {
  const t = cardData.length > 1 ? index / (cardData.length - 1) : 0.5
  const angle = -spreadAngle/2 + (t * spreadAngle)
  const mess = randomOffsets[index]
  
  // Base rotation adjusted for the upward arc + messiness
  let rotY = -angle + mess.rot
  // rotX = Math.PI starts the card face-down (bottom edge faces +Z/Viewer)
  let rotX = Math.PI 
  let rotZ = 0
  
  if (isFlipped) {
     // Flatten out Y rotation to perfectly face camera
     rotY *= (1 - flipProgress.value)
     
     // Rotate X toward the screen (decreasing from Math.PI)
     // Target ~Math.PI/3 (60 degrees) so it tilts perfectly toward the camera looking down
     const targetRotX = Math.PI / 3
     rotX = Math.PI - ((Math.PI - targetRotX) * flipProgress.value) 
  }
  
  return [rotX, rotY, rotZ]
}
</script>

<template>
  <TresGroup>
    <template v-if="cardFaceTextures.length > 0 && cardBackTex">
      <TresMesh 
        v-for="(card, index) in cardData" 
        :key="card.id"
        :position="getCardPosition(index, hoveredCardIndex === index, flippedCardIndex === index)"
        :rotation="getCardRotation(index, flippedCardIndex === index)"
        cast-shadow 
        receive-shadow
        @pointer-enter="hoveredCardIndex = index"
        @pointer-leave="hoveredCardIndex = hoveredCardIndex === index ? null : hoveredCardIndex"
        @click="handleCardClick(index)"
      >
        <primitive :object="cardGeo" />
        
        <!-- BoxGeometry materials array order: right, left, top, bottom, front, back -->
        <TresMeshStandardMaterial :color="edgeMaterial.color" :metalness="0.8" :roughness="0.2" attach="material-0" /> <!-- right -->
        <TresMeshStandardMaterial :color="edgeMaterial.color" :metalness="0.8" :roughness="0.2" attach="material-1" /> <!-- left -->
        <TresMeshStandardMaterial :color="edgeMaterial.color" :metalness="0.8" :roughness="0.2" attach="material-2" /> <!-- top (face) -->
        <TresMeshStandardMaterial :color="edgeMaterial.color" :metalness="0.8" :roughness="0.2" attach="material-3" /> <!-- bottom (back) -->
        <TresMeshStandardMaterial :color="edgeMaterial.color" :metalness="0.8" :roughness="0.2" attach="material-4" /> <!-- front -->
        <TresMeshStandardMaterial :color="edgeMaterial.color" :metalness="0.8" :roughness="0.2" attach="material-5" /> <!-- back -->
        
        <!-- We override the top and bottom with textures -->
        <TresMeshStandardMaterial :map="cardFaceTextures[index]" roughness="0.5" metalness="0.1" attach="material-2" /> <!-- Face -->
        <TresMeshStandardMaterial :map="cardBackTex" roughness="0.4" metalness="0.3" attach="material-3" /> <!-- Back (pointing up initially since X rot is 0) -->

        <!-- Hover Tooltip -->
        <Html 
          v-if="hoveredCardIndex === index && flippedCardIndex === null" 
          transform 
          :position="[0, 0.5, 0]" 
          :rotation="[-Math.PI/2, 0, 0]"
          center 
          wrapper-class="tarot-tooltip"
        >
          <div class="deck-label">
             {{ card.title }}
          </div>
        </Html>
      </TresMesh>
    </template>
  </TresGroup>
</template>

<style scoped>
:deep(.tarot-tooltip) {
  pointer-events: none;
}
.deck-label {
  background: rgba(15, 10, 25, 0.9);
  color: #D4AF37;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: serif;
  font-style: italic;
  font-size: 1.1rem;
  letter-spacing: 2px;
  border: 1px solid #D4AF37;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
  animation: floatIn 0.3s ease-out forwards;
}
@keyframes floatIn {
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
</style>
