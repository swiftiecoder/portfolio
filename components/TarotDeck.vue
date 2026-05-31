<script setup>
import { shallowRef, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { Html } from '@tresjs/cientos'

const props = defineProps({ activeProject: { type: String, default: '' } })
const emits = defineEmits(['cardClick'])

// When the modal closes (activeProject goes truthy → falsy), flip the card back down
watch(() => props.activeProject, (newVal, oldVal) => {
  if (!newVal && oldVal && flippedCardIndex.value !== null) {
    targetFlipProgress = 0
    setTimeout(() => {
      flippedCardIndex.value = null
    }, 700)
  }
})

// 4 Projects mapped to provided images
const cardData = [
  { id: 'HTS', title: 'HTS', image: '/tarot/00-TheFool.webp' },
  { id: 'PortalLLM', title: 'PortalLLM', image: '/tarot/05-TheHierophant.webp' },
  { id: 'GuardianAngel', title: 'Guardian Angel', image: '/tarot/19-TheSun.webp' },
  { id: 'MyDoctor', title: 'My Doctor', image: '/tarot/14-Temperance.webp' }
]

const randomOffsets = cardData.map(() => ({
  x: (Math.random() - 0.5) * 0.3, // Reduced messiness slightly to keep them safer on table
  z: (Math.random() - 0.5) * 0.3,
  rot: (Math.random() - 0.5) * 0.3
}))

const tooltipPos = [0, 0.5, 0]
const tooltipRot = [-Math.PI/2, 0, 0]

const cardRefs = shallowRef([])

// Layout math for an arc spread
const spreadRadius = 1.8 // Reduced radius so cards group closer together
const spreadAngle = Math.PI / 3 // Tighter angle so edges don't fall off the desk

// Precalculate base transforms so we don't recalculate math.sin every frame
const baseTransforms = cardData.map((_, index) => {
  const t = cardData.length > 1 ? index / (cardData.length - 1) : 0.5
  const angle = -spreadAngle/2 + (t * spreadAngle)
  const mess = randomOffsets[index]
  
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
const flipProgress = shallowRef(0) // 0 to 1 value for click-flip animation
let animationFrameId = null
let targetFlipProgress = 0

// Per-card hover flip progress (0 = face-down, 1 = face-up)
const hoverFlipProgress = ref(cardData.map(() => 0))
const targetHoverFlip = cardData.map(() => 0)

// Geometry and Materials (Made smaller as requested)
const cardGeo = new THREE.BoxGeometry(0.8, 0.02, 1.4) 
const edgeMaterial = new THREE.MeshStandardMaterial({ color: '#D4AF37', metalness: 0.8, roughness: 0.2 }) // Gold edges

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
    // Smoothly interpolate click-flip progress
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
        const isAnyFlipping = flippedCardIndex.value !== null
        
        // Update hover flip progress per card
        targetHoverFlip[index] = (isHovered && !isAnyFlipping) ? 1 : 0
        const hDiff = targetHoverFlip[index] - hoverFlipProgress.value[index]
        if (Math.abs(hDiff) > 0.001) {
          hoverFlipProgress.value[index] += hDiff * 0.12
        } else {
          hoverFlipProgress.value[index] = targetHoverFlip[index]
        }
        
        let x = base.x
        let y = -0.01 + (index * 0.002)
        let z = base.z
        
        // Two-phase flip animation:
        // Phase 1 (progress 0 → LIFT_END): card rises vertically, no rotation
        // Phase 2 (LIFT_END → 1): card flips, Y eases back down to resting position
        const LIFT_END = 0.35 // 35% of animation is pure lift
        const LIFT_HEIGHT = 0.3
        
        // liftY (hover): rises in phase 1, cosine-eases back to 0 in phase 2
        const liftY = (p) => {
          if (p <= LIFT_END) return LIFT_HEIGHT * (p / LIFT_END)
          const t = (p - LIFT_END) / (1 - LIFT_END)
          return LIFT_HEIGHT * Math.cos(t * Math.PI / 2)
        }
        // liftYClick (click): rises in phase 1, stays at LIFT_HEIGHT for the rest
        // — card remains raised while the modal is open, only lowers when returning (p→0)
        const liftYClick = (p) => {
          if (p <= LIFT_END) return LIFT_HEIGHT * (p / LIFT_END)
          return LIFT_HEIGHT
        }
        
        // flipRot: 0 during phase 1, then 0→1 during phase 2
        const flipRot = (p) => {
          if (p <= LIFT_END) return 0
          return (p - LIFT_END) / (1 - LIFT_END)
        }
        
        const hProgress = hoverFlipProgress.value[index]
        let rotX = Math.PI * (1 - flipRot(hProgress))
        let rotY = base.rotY
        let rotZ = 0
        
        y += liftY(hProgress)
        
        if (isFlipped) {
          rotX = Math.PI * (1 - flipRot(flipProgress.value))
          y += liftYClick(flipProgress.value)
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
      
      // Wait a beat then open the modal — card stays raised until modal closes
      setTimeout(() => {
        emits('cardClick', cardData[currentIndex].id)
        // Reset is now handled by the activeProject watcher in defineProps
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
          :position="[0, 0.4, 0]" 
          :rotation="tooltipRot"
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
  white-space: nowrap;
}
@keyframes floatIn {
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
</style>
