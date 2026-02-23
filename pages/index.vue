<script setup>
import { shallowRef, markRaw, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

import DeskScene from '../components/DeskScene.vue'
import DeskDecorations from '../components/DeskDecorations.vue'
import VinylPlayer from '../components/VinylPlayer.vue'
import TarotDeck from '../components/TarotDeck.vue'
import StrewnPages from '../components/StrewnPages.vue'
import WallPosters from '../components/WallPosters.vue'
import Noticeboard from '../components/Noticeboard.vue'

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

// Function to check if everything is ready to hide the loading screen
const checkReadyState = () => {
  if (isAssetsLoaded.value && isShadersCompiled.value) {
    // Add a slight delay for aesthetic smoothness
    setTimeout(() => {
      isLoading.value = false
    }, 800)
  }
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
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
})

const projectComponents = {
  AcademicCV: markRaw(AcademicCV),
  Bio: markRaw(Bio),
  GuardianAngel: markRaw(GuardianAngel),
  HTS: markRaw(HTS),
  MyDoctor: markRaw(MyDoctor),
  PortalLLM: markRaw(PortalLLM),
  Resume: markRaw(Resume),
  NoticeboardUpdates: markRaw(NoticeboardUpdates)
}

// Refs for active project handled above
</script>

<template>
  <div class="canvas-container">
    <Transition name="fade">
      <div v-if="isLoading" class="loading-screen">
        <div class="loader-content">
          <div class="spinner"></div>
          <h2 class="loading-text">{{ isAssetsLoaded ? 'Compiling Shaders...' : 'Loading Project Assets' }}</h2>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: loadingProgress + '%' }"></div>
          </div>
          <p class="progress-text">{{ isAssetsLoaded ? 'Optimizing Scene' : Math.round(loadingProgress) + '%' }}</p>
        </div>
      </div>
    </Transition>

    <div id="tres-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
      <TresCanvas shadows :shadow-map-type="1" clear-color="#fdf6e3" window-size @ready="onTresReady">
      <TresPerspectiveCamera
        :position="[0, 5, 8]"
        :look-at="[0, 0, 0]"
      />
      
      <OrbitControls 
        :enable-pan="false" 
        :min-polar-angle="0.5" 
        :max-polar-angle="1.4"
        :min-distance="4"
        :max-distance="12"
      />

      <!-- Bright overall lighting -->
      <TresAmbientLight :intensity="1.5" color="#ffffff" />
      
      <!-- Window Sunlight (Casting Blinds Shadows) -->
      <TresDirectionalLight 
        :position="[-12, 12, 5]" 
        :intensity="3.5" 
        cast-shadow 
        color="#FFF1D0" 
        :shadow-mapSize-width="2048"
        :shadow-mapSize-height="2048"
      />
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
            <TresMesh v-for="i in 20" :key="`blind-${i}`" :position="[0, 3.8 - (i * 0.38), 0.1]" :rotation="[0.5, 0, 0]" cast-shadow>
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
          <GLTFModel path="/files/sony_headphone_model-compressed.glb" draco cast-shadow receive-shadow :position="[-1, 0.9, 2]" :rotation="[-0.2, -1, 1.57]" :scale="0.1" />
      </Suspense>
      <TarotDeck :position="[3, 0.05, 1]" @cardClick="handleCardClick" />
      <StrewnPages @pageClick="handleCardClick" />

      <!-- HTML Overlay logic moved to 2D space outside TresCanvas -->
      </TresCanvas>
    </div>

    <div v-if="activeProject" class="project-modal-overlay" @click.self="unmountOverlay">
      <div class="project-modal">
        <div class="modal-header">
          <button class="close-btn" @click="unmountOverlay">✕ Close</button>
        </div>
        <div class="modal-content">
           <component :is="activeProject" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.canvas-container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #fdf6e3;
  position: absolute;
  top: 0;
  left: 0;
}

/* Loading Screen Styles */
.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fdf6e3;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Georgia', serif;
  color: #333;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #333;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.2rem;
  letter-spacing: 2px;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.progress-bar-container {
  width: 250px;
  height: 4px;
  background: #E5E0D8;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar {
  height: 100%;
  background: #333;
  transition: width 0.3s ease-out;
}

.progress-text {
  font-size: 0.9rem;
  color: #666;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.project-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* Simple darkened backdrop with blur */
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: auto;
  backdrop-filter: blur(8px);
  animation: fadeIn 0.3s ease-out;
}

.project-modal {
  /* Crisp, warm academic paper light theme */
  background: #FDFBF7;
  border-radius: 8px;
  width: 900px;
  max-width: 90vw;
  height: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  font-family: 'Georgia', serif;
  color: #333333;
  overflow: hidden;
  border: 1px solid #E5E0D8;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-header {
  padding: 1.2rem 2rem;
  background: #F4F1EA;
  border-bottom: 1px solid #E5E0D8;
  display: flex;
  justify-content: flex-end;
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 2.5rem 3rem;
  background: transparent;
  line-height: 1.6;
}

/* Elegant scrollbar */
.modal-content::-webkit-scrollbar {
  width: 6px;
}
.modal-content::-webkit-scrollbar-track {
  background: transparent;
}
.modal-content::-webkit-scrollbar-thumb {
  background: #D8D2C9;
  border-radius: 3px;
}
.modal-content::-webkit-scrollbar-thumb:hover {
  background: #BDB6AB;
}

.close-btn {
  padding: 0.4rem 1rem;
  background: transparent;
  color: #555555;
  border: 1px solid #CCCCCC;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.close-btn:hover {
  background: #FFFFFF;
  color: #111111;
  border-color: #999999;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
