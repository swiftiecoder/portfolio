<script setup>
import { shallowRef, markRaw, onMounted, onBeforeUnmount, ref, provide, computed } from 'vue'
import * as THREE from 'three'

import DeskScene from '../components/DeskScene.vue'
import DeskDecorations from '../components/DeskDecorations.vue'
import VinylPlayer from '../components/VinylPlayer.vue'
import TarotDeck from '../components/TarotDeck.vue'
import StrewnPages from '../components/StrewnPages.vue'
import BusinessCards from '../components/BusinessCards.vue'
import WallPosters from '../components/WallPosters.vue'
import Noticeboard from '../components/Noticeboard.vue'
import WallCertificates from '../components/WallCertificates.vue'
import TypewriterLoading from '../components/TypewriterLoading.vue'

// Nuxt auto-imports TresCanvas via @tresjs/nuxt
import { OrbitControls, Html, GLTFModel } from '@tresjs/cientos'

// Import all existing views
import AcademicCV from '../views/AcademicCV.vue'
import Bio from '../views/Bio.vue'
import GuardianAngel from '../views/GuardianAngel.vue'
import HTS from '../views/HTS.vue'
import MyDoctor from '../views/My Doctor.vue'
import PortalLLM from '../views/PortalLLM.vue'
import Resume from '../views/Resume.vue'
import NoticeboardUpdates from '../views/NoticeboardUpdates.vue'
import StrudelCreations from '../views/StrudelCreations.vue'

// Load generated textures client-side to prevent Nuxt SSR crashes
const rugTex = shallowRef(null)
const shadowTex = shallowRef(null)
const hardwoodTex = shallowRef(null)
const lumsFlagTex = shallowRef(null)

let animationFrameId
const animateShadows = (timestamp) => {
  if (shadowTex.value) {
    const elapsed = timestamp * 0.001 // Convert ms to seconds
    shadowTex.value.offset.x = Math.sin(elapsed * 0.7) * 0.02
    shadowTex.value.offset.y = Math.cos(elapsed * 0.5) * 0.015
  }
  animationFrameId = requestAnimationFrame(animateShadows)
}

const activeProject = shallowRef(null)
const activeProjectName = shallowRef('')

const isMicrofiche = computed(() => activeProjectName.value === 'Bio')

const controlsRef = shallowRef(null)
const cameraRef = shallowRef(null)

const isDiscoverMode = ref(false)
provide('isDiscoverMode', isDiscoverMode)

// Loading State
const isLoading = shallowRef(true)
const loadingProgress = shallowRef(0)
const isAssetsLoaded = shallowRef(false)
const isShadersCompiled = shallowRef(false)

const handleCardClick = (projectId) => {
  activeProjectName.value = projectId
  activeProject.value = projectComponents[projectId]
}

const unmountOverlay = () => {
  activeProject.value = null
  activeProjectName.value = ''
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    if (activeProject.value) {
      unmountOverlay()
    }
    if (isDiscoverMode.value) {
      isDiscoverMode.value = false
    }
    return
  }

  // Disable camera movement if overlay is active or scene is loading
  if (activeProject.value || isLoading.value) return

  // Attempt to resolve the unwrapped ThreeJS instance from the Tres component ref
  const controls = controlsRef.value?.value || controlsRef.value?.instance || controlsRef.value
  const camera = cameraRef.value?.value || cameraRef.value?.instance || cameraRef.value

  if (!controls || !camera) return

  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault() // prevent page scrolling

    // Double check we have actual ThreeJS objects
    if (!controls.target || !camera.position) return

    const zoomSpeed = 0.5
    const angleSpeed = 0.05

    // Forward vector for zooming (towards target)
    const forward = new THREE.Vector3().subVectors(controls.target, camera.position)
    const distance = forward.length()
    forward.normalize()

    let needsUpdate = false

    switch (e.key) {
      case 'ArrowUp': // Zoom In
        if (distance - zoomSpeed >= (controls.minDistance || 0)) {
          camera.position.addScaledVector(forward, zoomSpeed)
          needsUpdate = true
        }
        break
      case 'ArrowDown': // Zoom Out
        if (distance + zoomSpeed <= (controls.maxDistance || Infinity)) {
          camera.position.addScaledVector(forward, -zoomSpeed)
          needsUpdate = true
        }
        break
      case 'ArrowLeft': { // Rotate Left
        const offset = new THREE.Vector3().subVectors(camera.position, controls.target)
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -angleSpeed)
        camera.position.copy(controls.target).add(offset)
        needsUpdate = true
        break
      }
      case 'ArrowRight': { // Rotate Right
        const offset = new THREE.Vector3().subVectors(camera.position, controls.target)
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), angleSpeed)
        camera.position.copy(controls.target).add(offset)
        needsUpdate = true
        break
      }
    }

    if (needsUpdate) {
      controls.update()
    }
  }
}

// Function to check if everything is ready (door sequence will trigger in TypewriterLoading)
const checkReadyState = () => {
  // No auto-dismiss — user clicks Enter in the typewriter door
}

// Intercept TresJS ready event to force shader compilation before rendering
const onTresReady = ({ renderer, scene, camera }) => {
  // TresJS context properties are Vue refs, so we need to access .value
  const _renderer = renderer.value || renderer
  const _scene = scene.value || scene
  const _camera = camera.value || camera

  if (_renderer && typeof _renderer.compile === 'function') {
    // Pre-compile all shaders for the current scene to prevent post-load freezing
    _renderer.compile(_scene, _camera)
  }

  isShadersCompiled.value = true
  checkReadyState()
}

onMounted(() => {
  // Track Global Load Progress
  THREE.DefaultLoadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
    isLoading.value = true
    const progress = (itemsLoaded / itemsTotal) * 100
    loadingProgress.value = Math.max(loadingProgress.value, progress)
  }

  THREE.DefaultLoadingManager.onLoad = () => {
    isAssetsLoaded.value = true
    checkReadyState()
  }

  THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const progress = (itemsLoaded / itemsTotal) * 100
    // Guarantee that progress can never go backwards when new embedded assets are discovered
    loadingProgress.value = Math.max(loadingProgress.value, progress)
  }

  const loader = new THREE.TextureLoader()
  rugTex.value = loader.load('/persian_rug.webp')

  const st = loader.load('/tree_shadow.webp')
  st.wrapS = THREE.RepeatWrapping
  st.wrapT = THREE.RepeatWrapping
  shadowTex.value = st

  lumsFlagTex.value = loader.load('/files/lums_flag.png')
  lumsFlagTex.value.colorSpace = THREE.SRGBColorSpace

  // Process hardwood floor with correct scaling wrap
  const hw = loader.load('/hardwood_floor.webp')
  hw.wrapS = THREE.RepeatWrapping
  hw.wrapT = THREE.RepeatWrapping
  hw.wrapS = 1000 // RepeatWrapping
  hw.wrapT = 1000 // RepeatWrapping
  hw.repeat.set(4, 4)
  hardwoodTex.value = hw

  // Start animation loop
  animationFrameId = requestAnimationFrame(animateShadows)

  window.addEventListener('keydown', handleKeyDown, { passive: false })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('keydown', handleKeyDown)
})

const projectComponents = {
  AcademicCV: markRaw(AcademicCV),
  Bio: markRaw(Bio),
  GuardianAngel: markRaw(GuardianAngel),
  HTS: markRaw(HTS),
  MyDoctor: markRaw(MyDoctor),
  PortalLLM: markRaw(PortalLLM),
  Resume: markRaw(Resume),
  NoticeboardUpdates: markRaw(NoticeboardUpdates),
  StrudelCreations: markRaw(StrudelCreations)
}

const projectTitles = {
  AcademicCV: "Academic Curriculum Vitae",
  Bio: "sherry's world",
  GuardianAngel: "Guardian Angel: Building a Low-Cost Health Monitoring System",
  HTS: "Hook, Time and Singer: Grammy Song Analysis",
  MyDoctor: "Khpaltabib: AI Medical Chatbot",
  PortalLLM: "Portal-LLM: Chatting Up Characters",
  Resume: "Resume",
  NoticeboardUpdates: "Noticeboard Updates",
  StrudelCreations: "Strudel Creations"
}

// Refs for active project handled above
</script>

<template>
  <div class="canvas-container">
    <!-- Loading Screen: client-only to avoid SSR hydration mismatch -->
    <ClientOnly>
      <TypewriterLoading v-if="isLoading" :progress="loadingProgress" :is-ready="isAssetsLoaded && isShadersCompiled"
        @enter="isLoading = false" />
      <template #fallback>
        <div
          style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #fdf6e3; z-index: 9999;">
        </div>
      </template>
    </ClientOnly>

    <div id="tres-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
      <TresCanvas shadows :shadow-map-type="1" clear-color="#fdf6e3" window-size @ready="onTresReady">
        <TresPerspectiveCamera ref="cameraRef" :position="[0, 5, 8]" :look-at="[0, 0, 0]" />

        <OrbitControls ref="controlsRef" :enable-pan="false" :min-polar-angle="0.5" :max-polar-angle="1.4"
          :min-distance="4" :max-distance="12" />

        <!-- Bright overall lighting -->
        <TresAmbientLight :intensity="1.5" color="#ffffff" />

        <!-- Window Sunlight (Casting Blinds Shadows) -->
        <TresDirectionalLight :position="[-12, 12, 5]" :intensity="3.5" cast-shadow color="#FFF1D0"
          :shadow-mapSize-width="2048" :shadow-mapSize-height="2048" />
        <TresDirectionalLight :position="[10, 10, -10]" :intensity="1.5" color="#E6F4F1" />

        <!-- Right Wall LUMS Flag -->
        <TresGroup :position="[14.9, 4, -5]" :rotation="[0, -Math.PI / 2, 0]">
          <TresMesh :position="[0, 0, 0.1]" receive-shadow>
            <TresPlaneGeometry :args="[8, 4]" />
            <TresMeshStandardMaterial :map="lumsFlagTex" roughness="0.8" :transparent="true" />
          </TresMesh>
        </TresGroup>

        <!-- Environmental Room Box -->
        <TresMesh :position="[0, 4.5, 0]" receive-shadow>
          <!-- A very large box, viewed from inside -->
          <TresBoxGeometry :args="[30, 20, 30]" />
          <!-- using side=1 (THREE.BackSide) to render the inside of the box -->
          <TresMeshStandardMaterial color="#8A9A5B" :side="1" roughness="1.0" />
        </TresMesh>

        <!-- Dynamic Wall Posters -->
        <WallPosters />

        <!-- Noticeboard -->
        <Noticeboard @boardClick="handleCardClick" />

        <!-- Wall Certificates -->
        <WallCertificates />

        <!-- V4 Larger Window with Curtains and Tree Shadow -->
        <TresGroup :position="[-14.9, 4, 0]" :rotation="[0, Math.PI / 2, 0]">
          <!-- Enlarged Window Frame cutout illusion -->
          <TresMesh :position="[0, 0, 0]" receive-shadow>
            <TresBoxGeometry :args="[12, 8, 0.2]" />
            <TresMeshStandardMaterial color="#E0E0E0" />
          </TresMesh>
          <!-- Outer sky glow -->
          <TresMesh :position="[0, 0, -0.5]">
            <TresPlaneGeometry :args="[11.6, 7.6]" />
            <TresMeshBasicMaterial color="#E6F4F1" />
          </TresMesh>

          <!-- Horizontal Blinds (V5 replacement for curtains) -->
          <TresGroup>
            <TresMesh v-for="i in 20" :key="`blind-${i}`" :position="[0, 3.8 - (i * 0.38), 0.1]" :rotation="[0.5, 0, 0]"
              cast-shadow>
              <TresBoxGeometry :args="[11.8, 0.15, 0.05]" />
              <TresMeshStandardMaterial color="#2d3748" emissive="#1a202c" :emissiveIntensity="0.2" roughness="0.8" />
            </TresMesh>
          </TresGroup>

          <!-- Tree Shadow mask on the window blinds (moved to z=0.3 to overlay blinds) -->
          <TresMesh :position="[0, 0, 0.3]" receive-shadow>
            <TresPlaneGeometry :args="[11.6, 7.6]" />
            <!-- Multiply blend the shadow directly onto the blinds and glass -->
            <TresMeshBasicMaterial :map="shadowTex" :transparent="true" :opacity="0.8" :blending="2" />
          </TresMesh>
        </TresGroup>

        <!-- V4 Floor/Persian Rug -->
        <!-- Rectangular rug under desk -->
        <TresMesh :position="[0, -4.95, 0]" :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
          <TresPlaneGeometry :args="[16, 12]" />
          <TresMeshStandardMaterial :map="rugTex" roughness="1.0" />
        </TresMesh>
        <!-- Base Floor layer seamlessly mapped with hardwood -->
        <TresMesh :position="[0, -5, 0]" :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
          <TresPlaneGeometry :args="[30, 30]" />
          <TresMeshStandardMaterial :map="hardwoodTex" roughness="0.5" />
        </TresMesh>

        <!-- Desk Structure details (legs) so it doesn't float -->
        <!-- Legs are handled in DeskScene, but we might need to add them there if not present. Assuming DeskScene has just surface for now, we will add leg stubs in DeskScene later -->

        <DeskScene />
        <DeskDecorations @itemClick="handleCardClick" />
        <!-- <VinylPlayer :position="[-3, 0, -1]" /> -->
        <Suspense>
          <GLTFModel path="/files/sony_headphone_model-compressed.glb" draco cast-shadow receive-shadow
            :position="[-1, 0.9, 2]" :rotation="[-0.2, -1, 1.57]" :scale="0.1"
            @click="handleCardClick('StrudelCreations')" />
        </Suspense>
        <TarotDeck :position="[3, 0.05, 1]" @cardClick="handleCardClick" />
        <StrewnPages @pageClick="handleCardClick" />
        <BusinessCards />

        <!-- HTML Overlay logic moved to 2D space outside TresCanvas -->
      </TresCanvas>
    </div>

    <div v-if="activeProject" class="project-modal-overlay" :class="{ 'ao3-overlay': !isMicrofiche }"
      @click.self="unmountOverlay">
      <div class="project-modal" :class="isMicrofiche ? 'microfiche-modal' : 'ao3-modal'">
        <div class="modal-header">
          <button class="close-btn" @click="unmountOverlay">{{ isMicrofiche ? '[ EJECT ]' : '✕ Close' }}</button>
          <div v-if="!isMicrofiche" class="ao3-header-meta">
            <h2 class="ao3-title">{{ projectTitles[activeProjectName] || activeProjectName }}</h2>
            <p class="ao3-author">by <span class="ao3-link">Shaharyar Ahsan</span></p>
          </div>
        </div>
        <div class="modal-content">
          <component :is="activeProject" />
        </div>
      </div>
    </div>

    <!-- Discover Mode UI (Fantastical & Rustic Theme) -->
    <div class="discover-ui">
      <button class="discover-toggle" :data-state="isDiscoverMode ? 'unveiled' : 'concealed'"
        @click="isDiscoverMode = !isDiscoverMode">
        {{ isDiscoverMode ? 'Conceal' : 'Unveil' }}
      </button>

      <Transition name="float-fade">
        <div v-if="isDiscoverMode" class="legend-panel">
          <div class="panel-inner">
            <h3>Secrets</h3>
            <ul>
              <li>
                <div class="legend-icon">📚</div>
                <div class="legend-text">
                  <span class="legend-title">Tomes</span>
                  <span class="legend-desc">About Me</span>
                </div>
              </li>
              <li>
                <div class="legend-icon">🎴</div>
                <div class="legend-text">
                  <span class="legend-title">Tarot Deck</span>
                  <span class="legend-desc">Projects</span>
                </div>
              </li>
              <li>
                <div class="legend-icon">📌</div>
                <div class="legend-text">
                  <span class="legend-title">Noticeboard</span>
                  <span class="legend-desc">Updates</span>
                </div>
              </li>
              <li>
                <div class="legend-icon">📄</div>
                <div class="legend-text">
                  <span class="legend-title">Parchment</span>
                  <span class="legend-desc">Resume & CV</span>
                </div>
              </li>
              <li>
                <div class="legend-icon">📇</div>
                <div class="legend-text">
                  <span class="legend-title">Calling Cards</span>
                  <span class="legend-desc">Social Links</span>
                </div>
              </li>
              <li>
                <div class="legend-icon">🏅</div>
                <div class="legend-text">
                  <span class="legend-title">Certificates</span>
                  <span class="legend-desc">Certifications</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=IM+Fell+English:ital@0;1&family=Courier+Prime&family=Lucida+Grande&display=swap');

.canvas-container {
  width: 100vw;
  height: 100dvh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #fdf6e3;
  position: absolute;
  top: 0;
  left: 0;
  cursor: url('/mouse2.cur'), auto;
}


.project-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: auto;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease-out;
}

/* ========================================= */
/* 1. MICROFICHE MODAL (For 'Bio' only)      */
/* ========================================= */
.microfiche-modal {
  background-color: #e8f4f8;
  background-image:
    repeating-linear-gradient(transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.05) 2px,
      rgba(0, 0, 0, 0.05) 4px),
    radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(200, 230, 240, 0.2) 100%);
  border-radius: 4px;
  width: 900px;
  max-width: 90vw;
  height: 600px;
  max-height: 80dvh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 40px rgba(18, 160, 219, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.1);
  font-family: 'Courier Prime', monospace;
  color: #1a2035;
  border: 12px solid #222;
  animation: snapOn 0.15s ease-out;
}

.microfiche-modal .modal-header {
  padding: 0.8rem 1.5rem;
  background: #111;
  border-bottom: 2px solid #333;
  display: flex;
  justify-content: flex-end;
}

.microfiche-modal .close-btn {
  padding: 0.4rem 1rem;
  background: transparent;
  color: #4ade80;
  border: 1px solid #4ade80;
  font-family: 'Courier Prime', monospace;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 2px;
  cursor: url('/mouse2.cur'), pointer;
  transition: all 0.1s steps(2);
  text-transform: uppercase;
}

.microfiche-modal .close-btn:hover {
  background: #4ade80;
  color: #111;
  text-shadow: none;
  box-shadow: 0 0 10px #4ade80;
}

.microfiche-modal .modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 2.5rem 3rem;
  background: transparent;
  line-height: 1.6;
}

/* Scrollbar for Microfiche */
.microfiche-modal .modal-content::-webkit-scrollbar {
  width: 12px;
}

.microfiche-modal .modal-content::-webkit-scrollbar-track {
  background: #222;
  border-left: 2px solid #111;
}

.microfiche-modal .modal-content::-webkit-scrollbar-thumb {
  background: #555;
  border: 2px solid #222;
}

.microfiche-modal .modal-content::-webkit-scrollbar-thumb:hover {
  background: #4ade80;
}


/* ========================================= */
/* 2. AO3 MODAL (For Projects)               */
/* ========================================= */
.ao3-overlay {
  background: rgba(255, 255, 255, 0.5);
  /* Lighter backdrop for AO3 */
}

.ao3-modal {
  background: #ffffff;
  width: 900px;
  max-width: 90vw;
  height: 700px;
  max-height: 85dvh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-family: 'Lucida Grande', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #2a2a2a;
  border: 1px solid #cccccc;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.ao3-modal .modal-header {
  padding: 1rem 1.5rem;
  background: #eeeeee;
  border-bottom: 2px solid #990000;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.ao3-header-meta {
  display: block;
  flex: 1;
  min-width: 0;
}

.ao3-title {
  font-family: 'Georgia', serif;
  font-size: 1.4rem;
  margin: 0;
  color: #990000;
  font-weight: bold;
  word-break: break-word;
}

.ao3-author {
  margin: 0;
  font-size: 0.9rem;
  color: #111;
}

.ao3-link {
  color: #0000cc;
  cursor: url('/mouse2.cur'), pointer;
}

.ao3-link:hover {
  text-decoration: underline;
}

.ao3-modal .close-btn {
  flex-shrink: 0;
  margin: 0;
  padding: 0.4rem 0.8rem;
  background: #eeeeee;
  color: #555555;
  border: 1px solid #cccccc;
  font-family: 'Lucida Grande', sans-serif;
  font-size: 0.8rem;
  border-radius: 4px;
  cursor: url('/mouse2.cur'), pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.ao3-modal .close-btn:hover {
  background: #e0e0e0;
  color: #111111;
  border-color: #999999;
}

.ao3-modal .modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 3rem;
  background: transparent;
  line-height: 1.5;
  font-size: 1rem;
}

/* Scrollbar for AO3 */
.ao3-modal .modal-content::-webkit-scrollbar {
  width: 8px;
}

.ao3-modal .modal-content::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.ao3-modal .modal-content::-webkit-scrollbar-thumb {
  background: #cccccc;
  border-radius: 4px;
}

.ao3-modal .modal-content::-webkit-scrollbar-thumb:hover {
  background: #999999;
}

/* Animations */
@keyframes snapOn {
  0% {
    opacity: 0;
    filter: brightness(2) contrast(2) hue-rotate(90deg);
    transform: scale(0.98);
  }

  50% {
    opacity: 1;
    filter: brightness(1.5) contrast(1.5);
  }

  100% {
    opacity: 1;
    filter: none;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Discover UI Styles - Fantastical & Rustic Theme */
.discover-ui {
  position: absolute;
  bottom: clamp(16px, 3vw, 40px);
  right: clamp(12px, 3vw, 40px);
  z-index: 50;
  display: flex;
  flex-direction: column-reverse;
  /* Expands upwards */
  align-items: flex-end;
  gap: 16px;
  max-width: 90vw;
}

.discover-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 6px 16px;
  border-radius: 999px;
  font-family: 'IM Fell English', serif;
  font-style: italic;
  font-size: 0.92rem;
  cursor: url('/mouse2.cur'), pointer;
  transition: all 220ms ease;
  border: 1px solid transparent;
  user-select: none;
  line-height: 1.4;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Concealed State (Dark — mysterious, hidden) */
.discover-toggle[data-state="concealed"] {
  background: #2c2219;
  color: #ddc9b0;
  border-color: rgba(200, 170, 130, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.28);
}

/* Unveiled State (Light — revealed, warm parchment) */
.discover-toggle[data-state="unveiled"] {
  background: #ede0cc;
  color: #5c4633;
  border-color: #b09a7e;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.discover-toggle:hover {
  transform: translateY(-1.5px);
  filter: brightness(1.05);
}

.discover-toggle[data-state="concealed"]:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  background: #342820;
}

.discover-toggle[data-state="unveiled"]:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.14);
  background: #e4d4bb;
}

.discover-toggle:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2) !important;
}

.discover-toggle .icon {
  font-size: 1.05rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.discover-toggle[data-state="concealed"] .icon {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6));
}

.legend-panel {
  background: #eae0d0;
  background-image: url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.04"/%3E%3C/svg%3E');
  border: 1px solid #5c4633;
  padding: 6px;
  width: min(200px, 85vw);
  border-radius: 110px 110px 16px 16px;
  /* Apothecary Arch */
  box-shadow: 8px 12px 25px rgba(32, 24, 17, 0.25), inset 0 0 30px rgba(100, 75, 50, 0.1);
  transform-origin: bottom right;
  /* Pin origin to align with the toggle button */
}

/* Inner dashed border */
.panel-inner {
  border: 1px dashed #a38d72;
  border-radius: 104px 104px 10px 10px;
  padding: 36px 16px 24px 16px;
  background: transparent;
}

.legend-panel h3 {
  margin: 0 0 20px 0;
  font-family: 'IM Fell English', serif;
  font-size: 1.3rem;
  color: #2a1f16;
  text-align: center;
  border-bottom: 1px solid #c9b49a;
  padding-bottom: 16px;
  position: relative;
  line-height: 1.1;
}

.legend-panel h3::after {
  content: '✦';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  background: #eae0d0;
  /* Match panel base */
  padding: 0 8px;
  font-size: 0.8rem;
  color: #8c7052;
}

.legend-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 70dvh;
  overflow-y: auto;
  padding-right: 6px;
}

.legend-panel ul::-webkit-scrollbar {
  width: 4px;
}

.legend-panel ul::-webkit-scrollbar-track {
  background: rgba(140, 112, 82, 0.1);
  border-radius: 4px;
}

.legend-panel ul::-webkit-scrollbar-thumb {
  background: rgba(140, 112, 82, 0.5);
  border-radius: 4px;
}

.legend-panel ul::-webkit-scrollbar-thumb:hover {
  background: rgba(140, 112, 82, 0.8);
}

.legend-panel li {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  animation: floatUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform: translateY(10px);
}

.legend-panel li:nth-child(1) {
  animation-delay: 0.1s;
}

.legend-panel li:nth-child(2) {
  animation-delay: 0.2s;
}

.legend-panel li:nth-child(3) {
  animation-delay: 0.3s;
}

.legend-panel li:nth-child(4) {
  animation-delay: 0.4s;
}

.legend-panel li:nth-child(5) {
  animation-delay: 0.5s;
}

.legend-panel li:nth-child(6) {
  animation-delay: 0.6s;
}

@keyframes floatUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.legend-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(181, 155, 124, 0.2);
  border: 1px solid #c9b49a;
  border-radius: 50%;
  font-size: 1rem;
  flex-shrink: 0;
  filter: sepia(0.4) saturate(0.8);
}

.legend-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.legend-title {
  font-family: 'IM Fell English', serif;
  font-size: 1rem;
  color: #2a1f16;
  font-weight: 600;
}

.legend-desc {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.85rem;
  color: #6d5c4f;
  font-style: italic;
}

/* Transition for the panel */
.float-fade-enter-active,
.float-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.float-fade-enter-from,
.float-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

/* ========================================= */
/* Responsive Overrides                       */
/* ========================================= */
@media (max-width: 600px) {

  /* Modals */
  .ao3-modal .modal-content {
    padding: 1.25rem 1.25rem;
  }

  .microfiche-modal .modal-content {
    padding: 1.25rem 1.25rem;
  }

  .ao3-title {
    font-size: 1.1rem;
  }

  /* Legend panel smaller on very small screens */
  .legend-panel {
    width: 170px;
  }
}

@media (max-width: 480px) {
  .ao3-modal .modal-content {
    padding: 1rem;
  }

  .microfiche-modal .modal-content {
    padding: 1rem;
  }
}
</style>
