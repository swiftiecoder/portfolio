<script setup>
import { shallowRef, markRaw, onMounted, onBeforeUnmount, ref, computed, defineAsyncComponent, watch, nextTick } from 'vue'
import * as THREE from 'three'

import DeskScene from '../components/DeskScene.vue'
import DeskDecorations from '../components/DeskDecorations.vue'
import TarotDeck from '../components/TarotDeck.vue'
import StrewnPages from '../components/StrewnPages.vue'
import BusinessCards from '../components/BusinessCards.vue'
import WallPosters from '../components/WallPosters.vue'
import Noticeboard from '../components/Noticeboard.vue'
import WallCertificates from '../components/WallCertificates.vue'
import TypewriterLoading from '../components/TypewriterLoading.vue'
import AcousticGuitar from '../components/AcousticGuitar.vue'

// Nuxt auto-imports TresCanvas via @tresjs/nuxt
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
import {
  createOutdoorSceneTexture,
  createTreeCanopyTextures,
  createWalnutWoodTexture
} from '../utils/textureGenerator'

// Lazy-loaded content views
const AcademicCV = defineAsyncComponent(() => import('../views/AcademicCV.vue'))
const Bio = defineAsyncComponent(() => import('../views/Bio.vue'))
const GuardianAngel = defineAsyncComponent(() => import('../views/GuardianAngel.vue'))
const HTS = defineAsyncComponent(() => import('../views/HTS.vue'))
const FSNNA = defineAsyncComponent(() => import('../views/FSNNA.vue'))
const Resume = defineAsyncComponent(() => import('../views/Resume.vue'))
const NoticeboardUpdates = defineAsyncComponent(() => import('../views/NoticeboardUpdates.vue'))
const StrudelCreations = defineAsyncComponent(() => import('../views/StrudelCreations.vue'))
const DevAdvocate = defineAsyncComponent(() => import('../views/DevAdvocate.vue'))

// Load generated textures client-side to prevent Nuxt SSR crashes
const rugTex = shallowRef(null)
const shadowTex = shallowRef(null)
const hardwoodTex = shallowRef(null)
const lumsFlagTex = shallowRef(null)
const outdoorDayTex = shallowRef(null)
const outdoorNightTex = shallowRef(null)
const canopyDayTex = shallowRef(null)
const canopyNightTex = shallowRef(null)
const blindWoodTex = shallowRef(null)

const blindLadderXs = [-4.5, -1.5, 1.5, 4.5]

let animationFrameId
const animateShadows = (timestamp) => {
  const elapsed = timestamp * 0.001 // Convert ms to seconds
  const ox = 0.03 + Math.sin(elapsed * 0.65) * 0.014
  const oy = 0.03 + Math.cos(elapsed * 0.45) * 0.01
  if (shadowTex.value) {
    shadowTex.value.offset.set(ox, oy)
  }
  if (canopyDayTex.value) {
    canopyDayTex.value.offset.set(ox, oy)
  }
  if (canopyNightTex.value) {
    canopyNightTex.value.offset.set(ox, oy)
  }
  animationFrameId = requestAnimationFrame(animateShadows)
}

const activeProject = shallowRef(null)
const activeProjectName = shallowRef('')

const isMicrofiche = computed(() => activeProjectName.value === 'Bio')

const controlsRef = shallowRef(null)
const cameraRef = shallowRef(null)

const isDiscoverMode = ref(false)

const isNightMode = ref(false)
const toggleNightMode = () => {
  isNightMode.value = !isNightMode.value
}

// Responsive camera framing
const isMobile = ref(false)
const updateViewport = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}
const cameraPosition = computed(() => (isMobile.value ? [0, 5.8, 13.5] : [0, 4.8, 9.2]))
const cameraFov = computed(() => (isMobile.value ? 58 : 45))
const defaultControlsTarget = [0, 1.8, 0]

// Sony Headphones Box3 centering + desk Y-snapping
const HEADPHONES_TARGET = { x: -1.65, y: 0.0, z: 1.8 }
const headphonesGroupRef = shallowRef(null)
const headphonesModelRef = shallowRef(null)
const headphonesAdjust = ref({ x: 0, y: 0, z: 0 })
let headphonesSnapped = false
let headphonesRafId = null

const snapHeadphones = () => {
  if (headphonesSnapped) return
  const group = headphonesGroupRef.value?.value || headphonesGroupRef.value?.instance || headphonesGroupRef.value
  if (!group) return
  group.traverse?.((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  group.updateWorldMatrix(true, true)
  const box = new THREE.Box3().setFromObject(group)
  if (box.isEmpty()) {
    headphonesRafId = requestAnimationFrame(snapHeadphones)
    return
  }
  const center = box.getCenter(new THREE.Vector3())
  headphonesAdjust.value = {
    x: headphonesAdjust.value.x + (HEADPHONES_TARGET.x - center.x),
    y: headphonesAdjust.value.y + (HEADPHONES_TARGET.y - box.min.y),
    z: headphonesAdjust.value.z + (HEADPHONES_TARGET.z - center.z)
  }
  headphonesSnapped = true
}

watch(
  () => headphonesModelRef.value?.instance?.value || headphonesModelRef.value?.instance,
  (instance) => {
    if (!instance || headphonesSnapped) return
    nextTick(() => {
      if (headphonesRafId) cancelAnimationFrame(headphonesRafId)
      headphonesRafId = requestAnimationFrame(snapHeadphones)
    })
  },
  { flush: 'post', immediate: true }
)

const onHeadphonesEnter = () => {
  document.body.style.cursor = 'pointer'
}

const onHeadphonesLeave = () => {
  document.body.style.cursor = ''
}

// Loading State
const isLoading = shallowRef(true)
const loadingProgress = shallowRef(0)
const isAssetsLoaded = shallowRef(false)
const isShadersCompiled = shallowRef(false)

const unregisterLoadingManager = () => {
  THREE.DefaultLoadingManager.onStart = undefined
  THREE.DefaultLoadingManager.onLoad = undefined
  THREE.DefaultLoadingManager.onProgress = undefined
}

const finishLoading = () => {
  isLoading.value = false
  unregisterLoadingManager()
}

const handleCardClick = (projectId) => {
  document.body.style.cursor = ''
  activeProjectName.value = projectId
  activeProject.value = projectComponents[projectId]
}

const unmountOverlay = () => {
  activeProject.value = null
  activeProjectName.value = ''
}

const getCameraAndControls = () => {
  const controls = controlsRef.value?.value || controlsRef.value?.instance || controlsRef.value
  const camera = cameraRef.value?.value || cameraRef.value?.instance || cameraRef.value
  return { controls, camera }
}

watch(isMobile, () => {
  nextTick(() => {
    const { controls, camera } = getCameraAndControls()
    if (!camera) return
    camera.fov = cameraFov.value
    if (typeof camera.updateProjectionMatrix === 'function') {
      camera.updateProjectionMatrix()
    }
    camera.position.set(...cameraPosition.value)
    if (controls) {
      controls.target.set(...defaultControlsTarget)
      controls.update()
    }
  })
})

const ROOM_BOUNDS = {
  minX: -13.8,
  maxX: 13.8,
  minY: -4.2,
  maxY: 13.2,
  minZ: -13.8,
  maxZ: 13.8
}
let isClamping = false

const clampCameraToRoom = () => {
  if (isClamping) return
  const { controls, camera } = getCameraAndControls()
  if (!controls || !camera || !controls.target || !camera.position) return

  isClamping = true
  try {
    // 1. Keep orbit target safely inside interior walls
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, -12.5, 12.5)
    controls.target.y = THREE.MathUtils.clamp(controls.target.y, -3.0, 6.5)
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, -12.5, 12.5)

    // 2. Stop camera position at interior walls along the target -> camera ray
    const offset = camera.position.clone().sub(controls.target)
    let maxT = 1.0

    if (offset.x > 1e-5) maxT = Math.min(maxT, (ROOM_BOUNDS.maxX - controls.target.x) / offset.x)
    else if (offset.x < -1e-5) maxT = Math.min(maxT, (ROOM_BOUNDS.minX - controls.target.x) / offset.x)

    if (offset.y > 1e-5) maxT = Math.min(maxT, (ROOM_BOUNDS.maxY - controls.target.y) / offset.y)
    else if (offset.y < -1e-5) maxT = Math.min(maxT, (ROOM_BOUNDS.minY - controls.target.y) / offset.y)

    if (offset.z > 1e-5) maxT = Math.min(maxT, (ROOM_BOUNDS.maxZ - controls.target.z) / offset.z)
    else if (offset.z < -1e-5) maxT = Math.min(maxT, (ROOM_BOUNDS.minZ - controls.target.z) / offset.z)

    if (maxT < 1.0) {
      maxT = Math.max(0.05, maxT)
      camera.position.copy(controls.target).addScaledVector(offset, maxT)
    }

    // 3. Final hard clamp inside room bounds
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, ROOM_BOUNDS.minX, ROOM_BOUNDS.maxX)
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, ROOM_BOUNDS.minY, ROOM_BOUNDS.maxY)
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, ROOM_BOUNDS.minZ, ROOM_BOUNDS.maxZ)
  } finally {
    isClamping = false
  }
}

let swoopAnimId = null
const cancelSwoop = () => {
  if (swoopAnimId) {
    cancelAnimationFrame(swoopAnimId)
    swoopAnimId = null
  }
}

const isZoomedIn = ref(false)
const activeLegendId = ref(null)

const focusOn = (pos, target) => {
  const { controls, camera } = getCameraAndControls()
  if (!controls || !camera || !controls.target || !camera.position) return
  cancelSwoop()

  const startPos = camera.position.clone()
  const startTarget = controls.target.clone()
  const endPos = new THREE.Vector3(...pos)
  const endTarget = new THREE.Vector3(...target)
  const startTime = performance.now()
  const duration = 500

  const step = (now) => {
    const elapsed = now - startTime
    const t = Math.min(1, elapsed / duration)
    const ease = 1 - Math.pow(1 - t, 3)

    camera.position.lerpVectors(startPos, endPos, ease)
    controls.target.lerpVectors(startTarget, endTarget, ease)
    controls.update()

    if (t < 1) {
      swoopAnimId = requestAnimationFrame(step)
    } else {
      swoopAnimId = null
    }
  }

  swoopAnimId = requestAnimationFrame(step)
}

const resetCameraView = () => {
  focusOn(cameraPosition.value, defaultControlsTarget)
  isZoomedIn.value = false
  activeLegendId.value = null
}

const legendItems = [
  {
    id: 'tomes',
    icon: '📚',
    title: 'Tomes',
    desc: 'About Me',
    camPos: [-1.5, 2.2, 5.0],
    target: [-3.5, 0.45, 1.5]
  },
  {
    id: 'tarot',
    icon: '🎴',
    title: 'Tarot Deck',
    desc: 'Projects',
    camPos: [2.6, 2.5, 4.8],
    target: [2.8, 0.25, 1.0]
  },
  {
    id: 'noticeboard',
    icon: '📌',
    title: 'Noticeboard',
    desc: 'Updates',
    camPos: [7.2, 3.0, 3.5],
    target: [12.5, 2.8, 3.5]
  },
  {
    id: 'parchment',
    icon: '📄',
    title: 'Parchment',
    desc: 'Resume & CV',
    camPos: [0.15, 2.6, 3.2],
    target: [0.15, 0.05, 0.85]
  },
  {
    id: 'cards',
    icon: '📇',
    title: 'Calling Cards',
    desc: 'Social Links',
    camPos: [3.7, 2.2, 4.2],
    target: [3.7, 0.1, 1.9]
  },
  {
    id: 'certificates',
    icon: '🏅',
    title: 'Certificates',
    desc: 'Certifications',
    camPos: [-10.2, 3.5, 7.8],
    target: [-12.5, 3.4, 7.8]
  },
  {
    id: 'headphones',
    icon: '🎧',
    title: 'Headphones',
    desc: 'Strudel Lab',
    camPos: [-0.8, 2.2, 5.2],
    target: [-1.65, 0.3, 1.8]
  },
  {
    id: 'lamp',
    icon: '🕯️',
    title: 'Mushroom Lamp',
    desc: 'Atmosphere',
    camPos: [-1.8, 2.4, 1.8],
    target: [-3.8, 0.7, -2.1]
  }
]

const handleLegendClick = (item) => {
  if (activeLegendId.value === item.id && isZoomedIn.value) {
    resetCameraView()
    return
  }
  focusOn(item.camPos, item.target)
  isZoomedIn.value = true
  activeLegendId.value = item.id
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    if (activeProject.value) {
      unmountOverlay()
      return
    }
    if (isZoomedIn.value) {
      resetCameraView()
      return
    }
    if (isDiscoverMode.value) {
      isDiscoverMode.value = false
    }
    return
  }

  // Disable camera movement if overlay is active, scene is loading, or modifier keys are held
  if (activeProject.value || isLoading.value || e.ctrlKey || e.metaKey || e.altKey) return
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) return

  const { controls, camera } = getCameraAndControls()
  if (!controls || !camera || !controls.target || !camera.position) return

  const zoomKeys = ['+', '=', '-', '_', 'w', 'W', 's', 'S']
  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

  if (arrowKeys.includes(e.key) || zoomKeys.includes(e.key)) {
    e.preventDefault()
    cancelSwoop()

    const zoomSpeed = 0.5
    const angleSpeed = 0.06
    const minPolar = controls.minPolarAngle ?? 0.3
    const maxPolar = controls.maxPolarAngle ?? 1.52
    const minDist = controls.minDistance ?? 1.5
    const maxDist = controls.maxDistance ?? 18

    const offset = new THREE.Vector3().subVectors(camera.position, controls.target)
    const spherical = new THREE.Spherical().setFromVector3(offset)

    switch (e.key) {
      case 'ArrowLeft':
        spherical.theta -= angleSpeed
        break
      case 'ArrowRight':
        spherical.theta += angleSpeed
        break
      case 'ArrowUp':
        spherical.phi = Math.max(minPolar, spherical.phi - angleSpeed)
        break
      case 'ArrowDown':
        spherical.phi = Math.min(maxPolar, spherical.phi + angleSpeed)
        break
      case '+':
      case '=':
      case 'w':
      case 'W':
        spherical.radius = Math.max(minDist, spherical.radius - zoomSpeed)
        break
      case '-':
      case '_':
      case 's':
      case 'S':
        spherical.radius = Math.min(maxDist, spherical.radius + zoomSpeed)
        break
    }

    spherical.makeSafe()
    offset.setFromSpherical(spherical)
    camera.position.copy(controls.target).add(offset)
    controls.update()
    clampCameraToRoom()
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
  updateViewport()
  window.addEventListener('resize', updateViewport)

  // Track Global Load Progress
  THREE.DefaultLoadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
    if (!isLoading.value) return
    const progress = itemsTotal > 0 ? (itemsLoaded / itemsTotal) * 100 : 0
    loadingProgress.value = Math.max(loadingProgress.value, progress)
  }

  THREE.DefaultLoadingManager.onLoad = () => {
    isAssetsLoaded.value = true
    checkReadyState()
  }

  THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    if (!isLoading.value) return
    const progress = itemsTotal > 0 ? (itemsLoaded / itemsTotal) * 100 : 0
    // Guarantee that progress can never go backwards when new embedded assets are discovered
    loadingProgress.value = Math.max(loadingProgress.value, progress)
  }

  const loader = new THREE.TextureLoader()
  rugTex.value = loader.load('/persian_rug.webp')
  rugTex.value.colorSpace = THREE.SRGBColorSpace

  outdoorDayTex.value = createOutdoorSceneTexture(THREE, false)
  outdoorNightTex.value = createOutdoorSceneTexture(THREE, true)
  blindWoodTex.value = createWalnutWoodTexture(THREE)

  // Seed procedural canopy & dappled shadow immediately, then upgrade from /tree_shadow.webp
  const fallbackCanopy = createTreeCanopyTextures(THREE, null)
  canopyDayTex.value = fallbackCanopy.canopyDayTex
  canopyNightTex.value = fallbackCanopy.canopyNightTex
  shadowTex.value = fallbackCanopy.dappledShadowTex

  loader.load('/tree_shadow.webp', (tex) => {
    const oldDay = canopyDayTex.value
    const oldNight = canopyNightTex.value
    const oldShadow = shadowTex.value
    const { canopyDayTex: dayTex, canopyNightTex: nightTex, dappledShadowTex } =
      createTreeCanopyTextures(THREE, tex.image)
    canopyDayTex.value = dayTex
    canopyNightTex.value = nightTex
    shadowTex.value = dappledShadowTex
    oldDay?.dispose?.()
    oldNight?.dispose?.()
    oldShadow?.dispose?.()
    tex.dispose?.()
  })

  lumsFlagTex.value = loader.load('/files/lums_flag.png')
  lumsFlagTex.value.colorSpace = THREE.SRGBColorSpace

  // Process hardwood floor with correct scaling wrap
  const hw = loader.load('/hardwood_floor.webp')
  hw.wrapS = THREE.RepeatWrapping
  hw.wrapT = THREE.RepeatWrapping
  hw.repeat.set(4, 4)
  hw.colorSpace = THREE.SRGBColorSpace
  hardwoodTex.value = hw

  // Start animation loop
  animationFrameId = requestAnimationFrame(animateShadows)

  window.addEventListener('keydown', handleKeyDown, { passive: false })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  cancelSwoop()
  if (headphonesRafId) cancelAnimationFrame(headphonesRafId)
  unregisterLoadingManager()
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('resize', updateViewport)
  outdoorDayTex.value?.dispose?.()
  outdoorNightTex.value?.dispose?.()
  canopyDayTex.value?.dispose?.()
  canopyNightTex.value?.dispose?.()
  shadowTex.value?.dispose?.()
  blindWoodTex.value?.dispose?.()
})

const projectComponents = {
  AcademicCV: markRaw(AcademicCV),
  Bio: markRaw(Bio),
  GuardianAngel: markRaw(GuardianAngel),
  HTS: markRaw(HTS),
  FSNNA: markRaw(FSNNA),
  Resume: markRaw(Resume),
  NoticeboardUpdates: markRaw(NoticeboardUpdates),
  StrudelCreations: markRaw(StrudelCreations),
  DevAdvocate: markRaw(DevAdvocate)
}

const projectTitles = {
  AcademicCV: "Academic Curriculum Vitae",
  Bio: "shaharyar ahsan",
  GuardianAngel: "Guardian Angel: Adaptive Wearable Fall & Health Monitoring",
  HTS: "Hook, Time and Singer: Structural Anatomy of Grammy Hits",
  FSNNA: "A Fan-Sourced Network & Narrative Analysis of Fandom Dynamics",
  Resume: "Resume",
  NoticeboardUpdates: "Noticeboard Updates",
  StrudelCreations: "Strudel Experiments",
  DevAdvocate: "GoSaaS & Educative: Developer Advocacy & Engineering"
}

// Refs for active project handled above
</script>

<template>
  <div class="canvas-container" :class="{ 'night-active': isNightMode }">
    <!-- Loading Screen: client-only to avoid SSR hydration mismatch -->
    <ClientOnly>
      <TypewriterLoading v-if="isLoading" :progress="loadingProgress" :is-ready="isAssetsLoaded && isShadersCompiled"
        @enter="finishLoading" />
      <template #fallback>
        <div
          style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #fdf6e3; z-index: 9999;">
        </div>
      </template>
    </ClientOnly>

    <div id="tres-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
      <TresCanvas shadows :shadow-map-type="1" :clear-color="isNightMode ? '#070b18' : '#fdf6e3'" window-size
        @ready="onTresReady">
        <TresPerspectiveCamera ref="cameraRef" :fov="cameraFov" :position="cameraPosition"
          :look-at="defaultControlsTarget" />

        <OrbitControls ref="controlsRef" :target="defaultControlsTarget" :enable-pan="true" :min-polar-angle="0.3"
          :max-polar-angle="1.52" :min-distance="1.5" :max-distance="18" @change="clampCameraToRoom"
          @start="cancelSwoop" />

        <!-- Golden Hour / Midnight Overall Lighting -->
        <TresAmbientLight :intensity="isNightMode ? 0.38 : 1.35" :color="isNightMode ? '#24344d' : '#ffffff'" />

        <!-- Window Sunlight / Moonlight (Casting Blinds Shadows) -->
        <TresDirectionalLight :position="[-12, 12, 5]" :intensity="isNightMode ? 0.55 : 3.4" cast-shadow
          :color="isNightMode ? '#7ea8e0' : '#FFF1D0'" :shadow-mapSize-width="2048" :shadow-mapSize-height="2048"
          :shadow-camera-left="-15" :shadow-camera-right="15" :shadow-camera-top="15" :shadow-camera-bottom="-15"
          :shadow-camera-near="1" :shadow-camera-far="40" :shadow-bias="-0.0005" />
        <TresDirectionalLight :position="[10, 10, -10]" :intensity="isNightMode ? 0.35 : 1.4"
          :color="isNightMode ? '#415a77' : '#E6F4F1'" />

        <!-- Right Wall LUMS Flag -->
        <TresGroup :position="[14.9, 2.8, -4.5]" :rotation="[0, -Math.PI / 2, 0]">
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

        <!-- Window: Outdoor Landscape, Swaying Canopy, Architectural Frame & Wooden Venetian Blinds -->
        <TresGroup :position="[-14.9, 4, 0]" :rotation="[0, Math.PI / 2, 0]">
          <!-- 1. Dark Perimeter Wall Reveal Backing (prevents oblique gaps without occluding the view) -->
          <TresGroup :position="[0, 0, -0.06]">
            <TresMesh :position="[0, 3.85, 0]">
              <TresBoxGeometry :args="[12.2, 0.4, 0.04]" />
              <TresMeshStandardMaterial color="#2B2620" roughness="0.95" />
            </TresMesh>
            <TresMesh :position="[0, -3.85, 0]">
              <TresBoxGeometry :args="[12.2, 0.4, 0.04]" />
              <TresMeshStandardMaterial color="#2B2620" roughness="0.95" />
            </TresMesh>
            <TresMesh :position="[-5.85, 0, 0]">
              <TresBoxGeometry :args="[0.45, 7.7, 0.04]" />
              <TresMeshStandardMaterial color="#2B2620" roughness="0.95" />
            </TresMesh>
            <TresMesh :position="[5.85, 0, 0]">
              <TresBoxGeometry :args="[0.45, 7.7, 0.04]" />
              <TresMeshStandardMaterial color="#2B2620" roughness="0.95" />
            </TresMesh>
          </TresGroup>

          <!-- 2. Outdoor Sky & Distant Hills/Garden Landscape Backdrop -->
          <TresMesh :position="[0, 0, -0.04]">
            <TresPlaneGeometry :args="[11.5, 7.5]" />
            <TresMeshBasicMaterial :map="isNightMode ? outdoorNightTex : outdoorDayTex" />
          </TresMesh>

          <!-- 3. Outdoor Swaying Tree Canopy Silhouette -->
          <TresMesh :position="[0, 0, 0.01]">
            <TresPlaneGeometry :args="[11.5, 7.5]" />
            <TresMeshBasicMaterial
              :map="isNightMode ? canopyNightTex : canopyDayTex"
              :transparent="true"
              :depth-write="false"
            />
          </TresMesh>

          <!-- 4. Window Glass Pane -->
          <TresMesh :position="[0, 0, 0.04]">
            <TresPlaneGeometry :args="[11.4, 7.4]" />
            <TresMeshStandardMaterial
              :color="isNightMode ? '#9ec5ff' : '#fff8e7'"
              :transparent="true"
              :opacity="isNightMode ? 0.07 : 0.11"
              :roughness="0.08"
              :metalness="0.15"
              :depth-write="false"
            />
          </TresMesh>

          <!-- 5. Interior Window Sash & Mullion Grid -->
          <TresGroup :position="[0, 0, 0.07]">
            <TresMesh :position="[-1.9, 0, 0]" cast-shadow receive-shadow>
              <TresBoxGeometry :args="[0.14, 7.4, 0.08]" />
              <TresMeshStandardMaterial color="#E6DFD1" roughness="0.55" />
            </TresMesh>
            <TresMesh :position="[1.9, 0, 0]" cast-shadow receive-shadow>
              <TresBoxGeometry :args="[0.14, 7.4, 0.08]" />
              <TresMeshStandardMaterial color="#E6DFD1" roughness="0.55" />
            </TresMesh>
            <TresMesh :position="[0, 1.25, 0]" cast-shadow receive-shadow>
              <TresBoxGeometry :args="[11.4, 0.14, 0.08]" />
              <TresMeshStandardMaterial color="#E6DFD1" roughness="0.55" />
            </TresMesh>
            <!-- Inner Sash Perimeter -->
            <TresMesh :position="[0, 3.63, 0]" receive-shadow>
              <TresBoxGeometry :args="[11.4, 0.16, 0.08]" />
              <TresMeshStandardMaterial color="#E6DFD1" roughness="0.55" />
            </TresMesh>
            <TresMesh :position="[0, -3.63, 0]" receive-shadow>
              <TresBoxGeometry :args="[11.4, 0.16, 0.08]" />
              <TresMeshStandardMaterial color="#E6DFD1" roughness="0.55" />
            </TresMesh>
            <TresMesh :position="[-5.63, 0, 0]" receive-shadow>
              <TresBoxGeometry :args="[0.16, 7.4, 0.08]" />
              <TresMeshStandardMaterial color="#E6DFD1" roughness="0.55" />
            </TresMesh>
            <TresMesh :position="[5.63, 0, 0]" receive-shadow>
              <TresBoxGeometry :args="[0.16, 7.4, 0.08]" />
              <TresMeshStandardMaterial color="#E6DFD1" roughness="0.55" />
            </TresMesh>
          </TresGroup>

          <!-- 6. 3D Architectural Window Casing, Crown Molding & Projecting Sill -->
          <TresMesh :position="[0, 3.88, 0.15]" cast-shadow receive-shadow>
            <TresBoxGeometry :args="[12.3, 0.42, 0.28]" />
            <TresMeshStandardMaterial color="#EBE4D6" roughness="0.6" />
          </TresMesh>
          <TresMesh :position="[0, 4.14, 0.19]" cast-shadow receive-shadow>
            <TresBoxGeometry :args="[12.6, 0.12, 0.36]" />
            <TresMeshStandardMaterial color="#E2DACB" roughness="0.55" />
          </TresMesh>
          <TresMesh :position="[-5.88, 0, 0.15]" cast-shadow receive-shadow>
            <TresBoxGeometry :args="[0.42, 7.5, 0.28]" />
            <TresMeshStandardMaterial color="#EBE4D6" roughness="0.6" />
          </TresMesh>
          <TresMesh :position="[5.88, 0, 0.15]" cast-shadow receive-shadow>
            <TresBoxGeometry :args="[0.42, 7.5, 0.28]" />
            <TresMeshStandardMaterial color="#EBE4D6" roughness="0.6" />
          </TresMesh>
          <TresMesh :position="[0, -3.84, 0.24]" cast-shadow receive-shadow>
            <TresBoxGeometry :args="[12.7, 0.20, 0.46]" />
            <TresMeshStandardMaterial color="#E2DACB" roughness="0.5" />
          </TresMesh>
          <TresMesh :position="[0, -4.06, 0.14]" cast-shadow receive-shadow>
            <TresBoxGeometry :args="[12.1, 0.24, 0.22]" />
            <TresMeshStandardMaterial color="#DED5C3" roughness="0.6" />
          </TresMesh>

          <!-- 7. Warm-Wood Venetian Blinds Assembly -->
          <TresGroup>
            <!-- Headrail & Valance Box -->
            <TresMesh :position="[0, 3.55, 0.19]" cast-shadow receive-shadow>
              <TresBoxGeometry :args="[11.3, 0.26, 0.26]" />
              <TresMeshStandardMaterial :map="blindWoodTex" color="#D8B384" roughness="0.45" />
            </TresMesh>
            <TresMesh :position="[0, 3.60, 0.33]" cast-shadow receive-shadow>
              <TresBoxGeometry :args="[11.34, 0.16, 0.03]" />
              <TresMeshStandardMaterial :map="blindWoodTex" color="#C99E6B" roughness="0.45" />
            </TresMesh>

            <!-- 19 Thin Angled Warm-Wood Slats -->
            <TresMesh
              v-for="i in 19"
              :key="`blind-${i}`"
              :position="[0, 3.35 - (i * 0.30), 0.18]"
              :rotation="[0.28, 0, 0]"
              cast-shadow
              receive-shadow
            >
              <TresBoxGeometry :args="[11.2, 0.018, 0.22]" />
              <TresMeshStandardMaterial
                :map="blindWoodTex"
                color="#DDA772"
                :emissive="isNightMode ? '#1a2436' : '#8c5828'"
                :emissiveIntensity="isNightMode ? 0.08 : 0.18"
                roughness="0.45"
              />
            </TresMesh>

            <!-- Weighted Bottom Rail -->
            <TresMesh :position="[0, -2.58, 0.18]" cast-shadow receive-shadow>
              <TresBoxGeometry :args="[11.2, 0.09, 0.22]" />
              <TresMeshStandardMaterial :map="blindWoodTex" color="#D8B384" roughness="0.45" />
            </TresMesh>

            <!-- 4 Woven Cloth Ladder Tape Pairs & Rungs -->
            <TresGroup v-for="lx in blindLadderXs" :key="`ladder-${lx}`">
              <TresMesh :position="[lx, 0.48, 0.27]" receive-shadow>
                <TresBoxGeometry :args="[0.055, 6.15, 0.012]" />
                <TresMeshStandardMaterial color="#EFE8DC" roughness="0.85" />
              </TresMesh>
              <TresMesh :position="[lx, 0.48, 0.09]">
                <TresBoxGeometry :args="[0.055, 6.15, 0.012]" />
                <TresMeshStandardMaterial color="#EFE8DC" roughness="0.85" />
              </TresMesh>
              <TresMesh
                v-for="i in 19"
                :key="`rung-${lx}-${i}`"
                :position="[lx, 3.35 - (i * 0.30) - 0.012, 0.18]"
                :rotation="[0.28, 0, 0]"
              >
                <TresBoxGeometry :args="[0.05, 0.008, 0.19]" />
                <TresMeshStandardMaterial color="#EFE8DC" roughness="0.85" />
              </TresMesh>
            </TresGroup>

            <!-- Left-Side Tilt Wand -->
            <TresMesh :position="[-5.15, 3.38, 0.28]">
              <TresCylinderGeometry :args="[0.025, 0.025, 0.12, 12]" />
              <TresMeshStandardMaterial color="#C5A059" :metalness="0.7" roughness="0.3" />
            </TresMesh>
            <TresMesh :position="[-5.15, 1.45, 0.28]" cast-shadow>
              <TresCylinderGeometry :args="[0.018, 0.018, 3.8, 12]" />
              <TresMeshStandardMaterial color="#EDE4D3" roughness="0.35" />
            </TresMesh>
            <TresMesh :position="[-5.15, -0.45, 0.28]" cast-shadow>
              <TresCylinderGeometry :args="[0.032, 0.028, 0.45, 12]" />
              <TresMeshStandardMaterial color="#B87B48" roughness="0.5" />
            </TresMesh>

            <!-- Right-Side Pull Cords & Wooden Acorn Tassels -->
            <TresMesh :position="[5.15, 1.575, 0.27]">
              <TresCylinderGeometry :args="[0.01, 0.01, 3.95, 8]" />
              <TresMeshStandardMaterial color="#EDE6D8" roughness="0.85" />
            </TresMesh>
            <TresMesh :position="[5.11, -0.825, 0.27]">
              <TresCylinderGeometry :args="[0.009, 0.009, 0.85, 8]" />
              <TresMeshStandardMaterial color="#EDE6D8" roughness="0.85" />
            </TresMesh>
            <TresMesh :position="[5.11, -1.25, 0.27]" cast-shadow>
              <TresCylinderGeometry :args="[0.03, 0.048, 0.14, 12]" />
              <TresMeshStandardMaterial color="#A86B3E" roughness="0.5" />
            </TresMesh>
            <TresMesh :position="[5.19, -0.925, 0.27]">
              <TresCylinderGeometry :args="[0.009, 0.009, 1.05, 8]" />
              <TresMeshStandardMaterial color="#EDE6D8" roughness="0.85" />
            </TresMesh>
            <TresMesh :position="[5.19, -1.45, 0.27]" cast-shadow>
              <TresCylinderGeometry :args="[0.03, 0.048, 0.14, 12]" />
              <TresMeshStandardMaterial color="#A86B3E" roughness="0.5" />
            </TresMesh>
          </TresGroup>

          <!-- 8. Dappled Leaf Shadow Overlay across Glass & Blinds -->
          <TresMesh :position="[0, 0, 0.22]">
            <TresPlaneGeometry :args="[11.3, 7.3]" />
            <TresMeshBasicMaterial
              :map="shadowTex"
              :transparent="true"
              :opacity="isNightMode ? 0.45 : 0.75"
              :depth-write="false"
            />
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

        <DeskScene :is-night-mode="isNightMode" @toggleNightMode="toggleNightMode" />
        <DeskDecorations @itemClick="handleCardClick" />
        <AcousticGuitar />
        <TresGroup ref="headphonesGroupRef"
          :position="[HEADPHONES_TARGET.x + headphonesAdjust.x, HEADPHONES_TARGET.y + headphonesAdjust.y, HEADPHONES_TARGET.z + headphonesAdjust.z]"
          @click.stop="handleCardClick('StrudelCreations')" @pointer-enter="onHeadphonesEnter"
          @pointer-leave="onHeadphonesLeave">
          <TresGroup :rotation="[-0.2, -1, 1.57]" :scale="0.1">
            <Suspense>
              <GLTFModel ref="headphonesModelRef" path="/files/sony_headphone_model-compressed.glb" cast-shadow
                receive-shadow />
            </Suspense>
          </TresGroup>
        </TresGroup>
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
      <div class="discover-actions">
        <button v-if="isZoomedIn" type="button" class="discover-toggle reset-view-btn"
          :data-state="isDiscoverMode ? 'unveiled' : 'concealed'" @click="resetCameraView">
          ← Reset View
        </button>
        <button class="discover-toggle" :data-state="isDiscoverMode ? 'unveiled' : 'concealed'"
          @click="isDiscoverMode = !isDiscoverMode">
          {{ isDiscoverMode ? 'Conceal' : 'Unveil' }}
        </button>
      </div>

      <Transition name="float-fade">
        <div v-if="isDiscoverMode" class="legend-panel">
          <div class="panel-inner">
            <h3>Secrets</h3>
            <ul>
              <li v-for="(item, idx) in legendItems" :key="item.id" class="legend-item"
                :style="{ animationDelay: `${0.06 * (idx + 1)}s` }">
                <button type="button" class="legend-main"
                  :class="{ 'is-active': activeLegendId === item.id && isZoomedIn }"
                  @click="handleLegendClick(item)" :title="`Focus camera on ${item.title}`">
                  <div class="legend-icon">{{ item.icon }}</div>
                  <div class="legend-text">
                    <span class="legend-title">{{ item.title }}</span>
                    <span class="legend-desc">{{ item.desc }}</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=IM+Fell+English:ital@0;1&family=Courier+Prime&display=swap');

.canvas-container {
  width: 100vw;
  height: 100dvh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #fdf6e3;
  transition: background-color 0.6s ease;
  position: absolute;
  top: 0;
  left: 0;
  cursor: url('/mouse2.cur'), auto;
}

.canvas-container.night-active {
  background-color: #070b18;
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

.discover-actions {
  display: flex;
  align-items: center;
  gap: 10px;
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
  width: min(230px, 85vw);
  border-radius: 90px 90px 16px 16px;
  /* Apothecary Arch */
  box-shadow: 8px 12px 25px rgba(32, 24, 17, 0.25), inset 0 0 30px rgba(100, 75, 50, 0.1);
  transform-origin: bottom right;
  /* Pin origin to align with the toggle button */
}

/* Inner dashed border */
.panel-inner {
  border: 1px dashed #a38d72;
  border-radius: 84px 84px 10px 10px;
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

.legend-panel li,
.legend-item {
  display: flex;
  align-items: center;
  opacity: 0;
  animation: floatUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform: translateY(10px);
}

.legend-main {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
  padding: 5px 6px;
  margin: -5px -6px;
  background: transparent;
  border: none;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.legend-main:hover,
.legend-main.is-active {
  background: rgba(140, 112, 82, 0.16);
}

.legend-main.is-active {
  box-shadow: inset 2px 0 0 #8c7052;
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
  min-width: 0;
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

  /* Legend panel fits cleanly on narrow viewports */
  .legend-panel {
    width: min(215px, calc(100vw - 32px));
    overflow-x: hidden;
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
