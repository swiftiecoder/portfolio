<script setup>
import { shallowRef, ref, watch, onMounted, nextTick } from 'vue'
import * as THREE from 'three'
import { GLTFModel } from '@tresjs/cientos'

const emits = defineEmits(['itemClick'])

const onBooksEnter = () => {
  document.body.style.cursor = 'pointer'
}
const onBooksLeave = () => {
  document.body.style.cursor = ''
}

// Botanical 3D sunflower generator (multi-layered elliptical petals + back calyx bracts)
const makeFlower = (seedRadius, petalLen, petalW) => {
  const outer = []
  const mid = []
  const inner = []
  const sepals = []

  const outerCount = 18
  const midCount = 18
  const innerCount = 14
  const sepalCount = 14

  for (let i = 0; i < outerCount; i++) {
    const angle = (i / outerCount) * Math.PI * 2
    outer.push({
      angle,
      rMid: seedRadius * 0.78 + petalLen * 0.45,
      pz: -0.012,
      tilt: 0.22 + Math.sin(i * 1.7) * 0.06,
      roll: Math.cos(i * 1.3) * 0.08,
      len: petalLen,
      w: petalW
    })
  }

  for (let i = 0; i < midCount; i++) {
    const angle = ((i + 0.5) / midCount) * Math.PI * 2
    mid.push({
      angle,
      rMid: seedRadius * 0.76 + petalLen * 0.41,
      pz: 0.002,
      tilt: 0.10 + Math.cos(i * 1.9) * 0.05,
      roll: Math.sin(i * 1.5) * 0.07,
      len: petalLen * 0.92,
      w: petalW * 0.92
    })
  }

  for (let i = 0; i < innerCount; i++) {
    const angle = (i / innerCount) * Math.PI * 2 + 0.18
    inner.push({
      angle,
      rMid: seedRadius * 0.78 + petalLen * 0.25,
      pz: 0.014,
      tilt: -0.08 + Math.sin(i * 2.1) * 0.04,
      roll: 0,
      len: petalLen * 0.62,
      w: petalW * 0.72
    })
  }

  for (let i = 0; i < sepalCount; i++) {
    const angle = ((i + 0.35) / sepalCount) * Math.PI * 2
    sepals.push({
      angle,
      rMid: seedRadius * 0.72 + petalLen * 0.18,
      pz: -0.032,
      tilt: 0.35 + Math.cos(i * 1.4) * 0.05,
      len: petalLen * 0.52,
      w: petalW * 0.65
    })
  }

  return { seedRadius, outer, mid, inner, sepals }
}

const makeSegment = (startArr, endArr, rBottom, rTop, color) => {
  const start = new THREE.Vector3(...startArr)
  const end = new THREE.Vector3(...endArr)
  const dir = new THREE.Vector3().subVectors(end, start)
  const len = dir.length()
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
  const euler = new THREE.Euler().setFromQuaternion(quat)
  return {
    pos: [mid.x, mid.y, mid.z],
    rot: [euler.x, euler.y, euler.z],
    len,
    rBottom,
    rTop,
    color
  }
}

const makeSunflower = (id, rootPos, bendPos, headPos, headRot, seedRadius, petalLen, petalW) => {
  // Exact back receptacle socket position in stem-group space
  const socketLocal = new THREE.Vector3(0, 0, -0.06)
  socketLocal.applyEuler(new THREE.Euler(...headRot))
  const socketPos = [headPos[0] + socketLocal.x, headPos[1] + socketLocal.y, headPos[2] + socketLocal.z]

  return {
    id,
    headPos,
    headRot,
    data: makeFlower(seedRadius, petalLen, petalW),
    lowerStem: makeSegment(rootPos, bendPos, 0.036, 0.030, '#2E6B28'),
    upperStem: makeSegment(bendPos, socketPos, 0.030, 0.025, '#388E3C')
  }
}

const sunflowers = [
  makeSunflower('f1', [-0.04, 0.0, 0.02], [0.04, 0.52, -0.02], [0.12, 1.05, 0.05], [0.5, 0.0, 0.1], 0.15, 0.22, 0.072),
  makeSunflower('f2', [0.02, 0.0, 0.06], [-0.08, 0.38, 0.12], [-0.18, 0.74, 0.15], [0.3, -0.5, -0.15], 0.125, 0.185, 0.062),
  makeSunflower('f3', [0.06, 0.0, -0.04], [0.14, 0.58, -0.15], [0.16, 1.15, -0.18], [0.65, 0.3, -0.1], 0.11, 0.16, 0.055)
]

const flowerLeaves = [
  { pos: [0.16, 0.48, -0.02], rot: [0.25, 0.15, -0.55], len: 0.28, w: 0.14, color: '#2E7D32', petiolePos: [0.08, 0.45, -0.02], petioleRot: [0, 0, -1.05] },
  { pos: [-0.19, 0.35, 0.18], rot: [0.2, -0.35, 0.62], len: 0.25, w: 0.13, color: '#388E3C', petiolePos: [-0.11, 0.33, 0.14], petioleRot: [0.1, 0, 1.0] },
  { pos: [0.26, 0.68, -0.19], rot: [-0.25, 0.4, -0.48], len: 0.23, w: 0.12, color: '#43A047', petiolePos: [0.19, 0.64, -0.16], petioleRot: [-0.2, 0, -1.0] },
  { pos: [-0.05, 0.58, -0.16], rot: [-0.3, -0.25, 0.52], len: 0.22, w: 0.11, color: '#2E7D32', petiolePos: [0.02, 0.55, -0.10], petioleRot: [-0.25, 0, 1.05] },
  { pos: [0.02, 0.26, 0.20], rot: [0.45, 0.2, -0.35], len: 0.24, w: 0.12, color: '#388E3C', petiolePos: [0.01, 0.24, 0.12], petioleRot: [0.85, 0, -0.3] },
  { pos: [-0.22, 0.52, 0.04], rot: [0.15, -0.5, 0.42], len: 0.21, w: 0.11, color: '#43A047', petiolePos: [-0.13, 0.49, 0.07], petioleRot: [0.15, 0, 1.05] }
]

const soilAccents = [
  { pos: [-0.20, 0.84, 0.18], scale: [0.12, 0.045, 0.09], rot: [0.1, 0.4, 0.05], color: '#4A6B3B' },
  { pos: [0.22, 0.835, 0.14], scale: [0.08, 0.035, 0.07], rot: [-0.1, -0.3, 0.08], color: '#8D867E' },
  { pos: [-0.14, 0.84, -0.22], scale: [0.10, 0.04, 0.08], rot: [0.05, 0.8, -0.05], color: '#6E655F' },
  { pos: [0.18, 0.84, -0.20], scale: [0.11, 0.042, 0.09], rot: [-0.08, 0.2, 0.04], color: '#4A6B3B' },
  { pos: [0.02, 0.845, 0.27], scale: [0.07, 0.03, 0.06], rot: [0.12, 0.5, 0], color: '#8D867E' }
]

// Materials for Stacked Books
const katabasisMaterials = shallowRef([])
const achillesMaterials = shallowRef([])
const giovanniMaterials = shallowRef([])

// Exact Box3 centering + Y-snapping for decorative Nikon Coolpix camera onto desk top (y = 0)
const NIKON_TARGET = { x: -2.3, y: 0.0, z: -1.6 }
const nikonGroupRef = shallowRef(null)
const nikonModelRef = shallowRef(null)
const nikonAdjust = ref({ x: 0, y: 0, z: 0 })
const nikonSnapped = ref(false)

watch(
  () => nikonModelRef.value?.instance?.value || nikonModelRef.value?.instance,
  (gltf) => {
    if (!gltf || nikonSnapped.value) return
    const attemptSnap = () => {
      if (nikonSnapped.value) return
      const group = nikonGroupRef.value
      if (!group) return
      group.updateMatrixWorld(true)
      const box = new THREE.Box3().setFromObject(group)
      if (!box.isEmpty() && Number.isFinite(box.min.y)) {
        const center = box.getCenter(new THREE.Vector3())
        nikonAdjust.value = {
          x: NIKON_TARGET.x - center.x,
          y: NIKON_TARGET.y - box.min.y,
          z: NIKON_TARGET.z - center.z
        }
        nikonSnapped.value = true
      } else {
        requestAnimationFrame(attemptSnap)
      }
    }
    nextTick(attemptSnap)
  },
  { flush: 'post', immediate: true }
)

onMounted(() => {
  const loader = new THREE.TextureLoader()

  const loadBookMaterials = (path, spineColor) => {
    const tex = loader.load(path)
    tex.colorSpace = THREE.SRGBColorSpace

    // [right, left(spine), top(front cover), bottom(back cover), front, back]
    const spineMat = new THREE.MeshStandardMaterial({ color: spineColor, roughness: 0.85 })
    const coverMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })
    const pagesMat = new THREE.MeshStandardMaterial({ color: '#f5f5dc', roughness: 1.0 })

    return [
      pagesMat, // Right
      spineMat, // Left (rich solid leather/cloth spine)
      coverMat, // Top (cover)
      coverMat, // Bottom (back cover)
      pagesMat, // Front
      pagesMat  // Back
    ]
  }

  katabasisMaterials.value = loadBookMaterials('/files/katabasis.webp', '#4a1c1d')
  achillesMaterials.value = loadBookMaterials('/files/achilles.webp', '#1d3557')
  giovanniMaterials.value = loadBookMaterials('/files/giovanni.webp', '#2b463c')
})
</script>

<template>
  <TresGroup>
    <!-- Stack of Books (flush on desk surface y = 0.0) -->
    <TresGroup :position="[-3.5, 0.0, 1.5]" :rotation="[0, 0.5, 0]">
      <!-- Proxy Box for Interaction -->
      <TresMesh
        :position="[0, 0.375, 0]"
        @pointer-enter="onBooksEnter"
        @pointer-leave="onBooksLeave"
        @click.stop="emits('itemClick', 'Bio')"
        :visible="false"
      >
        <TresBoxGeometry :args="[1.4, 0.85, 1.9]" />
        <TresMeshBasicMaterial />
      </TresMesh>

      <!-- Bottom book: Katabasis (thickness 0.30 -> center y = 0.15) -->
      <TresMesh v-if="katabasisMaterials.length" :position="[0, 0.15, 0]" :rotation="[0, -0.1, 0]" cast-shadow receive-shadow
        :material="katabasisMaterials">
        <TresBoxGeometry :args="[1.2, 0.3, 1.8]" />
      </TresMesh>

      <!-- Middle book: The Song of Achilles (thickness 0.25 -> center y = 0.425) -->
      <TresMesh v-if="achillesMaterials.length" :position="[0.05, 0.425, 0.05]" :rotation="[0, 0.15, 0]" cast-shadow receive-shadow
        :material="achillesMaterials">
        <TresBoxGeometry :args="[1.1, 0.25, 1.6]" />
      </TresMesh>

      <!-- Top book: Giovanni's Room (thickness 0.20 -> center y = 0.65) -->
      <TresMesh v-if="giovanniMaterials.length" :position="[-0.02, 0.65, 0.02]" :rotation="[0, -0.05, 0]" cast-shadow receive-shadow
        :material="giovanniMaterials">
        <TresBoxGeometry :args="[1.0, 0.2, 1.5]" />
      </TresMesh>
    </TresGroup>

    <!-- Potted Sunflowers & Sculpted Terracotta Planter (flush on desk surface y = 0.0) -->
    <TresGroup :position="[3.6, 0.0, -2.0]">
      <!-- Terracotta Saucer Trivet -->
      <TresMesh :position="[0, 0.03, 0]" cast-shadow receive-shadow>
        <TresCylinderGeometry :args="[0.45, 0.40, 0.06, 32]" />
        <TresMeshStandardMaterial color="#B85D43" roughness="0.82" />
      </TresMesh>
      <TresMesh :position="[0, 0.06, 0]" :rotation="[Math.PI / 2, 0, 0]" cast-shadow receive-shadow>
        <TresTorusGeometry :args="[0.435, 0.026, 14, 36]" />
        <TresMeshStandardMaterial color="#C86D51" roughness="0.78" />
      </TresMesh>

      <!-- Sculpted Terracotta Planter Body -->
      <TresMesh :position="[0, 0.42, 0]" cast-shadow receive-shadow>
        <TresCylinderGeometry :args="[0.50, 0.36, 0.76, 36]" />
        <TresMeshStandardMaterial color="#C86D51" roughness="0.78" />
      </TresMesh>
      <!-- Upper Flared Collar Band -->
      <TresMesh :position="[0, 0.77, 0]" cast-shadow receive-shadow>
        <TresCylinderGeometry :args="[0.545, 0.515, 0.13, 36]" />
        <TresMeshStandardMaterial color="#D4795C" roughness="0.75" />
      </TresMesh>
      <!-- Top Rolled Lip -->
      <TresMesh :position="[0, 0.835, 0]" :rotation="[Math.PI / 2, 0, 0]" cast-shadow receive-shadow>
        <TresTorusGeometry :args="[0.525, 0.032, 16, 36]" />
        <TresMeshStandardMaterial color="#D4795C" roughness="0.74" />
      </TresMesh>
      <!-- Lower Collar Trim Ring -->
      <TresMesh :position="[0, 0.705, 0]" :rotation="[Math.PI / 2, 0, 0]" receive-shadow>
        <TresTorusGeometry :args="[0.512, 0.018, 12, 36]" />
        <TresMeshStandardMaterial color="#B85D43" roughness="0.8" />
      </TresMesh>
      <!-- Hand-Painted Cream Ceramic Band -->
      <TresMesh :position="[0, 0.50, 0]" :rotation="[Math.PI / 2, 0, 0]" receive-shadow>
        <TresTorusGeometry :args="[0.452, 0.012, 12, 36]" />
        <TresMeshStandardMaterial color="#F3E5D0" roughness="0.65" />
      </TresMesh>

      <!-- Mounded Organic Soil & Moss/Pebble Accents -->
      <TresMesh :position="[0, 0.79, 0]" :scale="[1, 0.16, 1]" receive-shadow>
        <TresSphereGeometry :args="[0.485, 24, 16]" />
        <TresMeshStandardMaterial color="#261712" roughness="1.0" />
      </TresMesh>
      <TresMesh
        v-for="(accent, idx) in soilAccents"
        :key="'soil-accent-' + idx"
        :position="accent.pos"
        :rotation="accent.rot"
        :scale="accent.scale"
        receive-shadow
      >
        <TresSphereGeometry :args="[1, 12, 10]" />
        <TresMeshStandardMaterial :color="accent.color" roughness="0.9" />
      </TresMesh>

      <!-- Botanical Curved Stems, 3D Leaves & Solid 360° Sunflower Heads -->
      <TresGroup :position="[0, 0.8, 0]">
        <!-- Tapered Lower & Upper Stems -->
        <template v-for="flower in sunflowers" :key="'stem-' + flower.id">
          <TresMesh :position="flower.lowerStem.pos" :rotation="flower.lowerStem.rot" cast-shadow>
            <TresCylinderGeometry :args="[flower.lowerStem.rTop, flower.lowerStem.rBottom, flower.lowerStem.len, 12]" />
            <TresMeshStandardMaterial :color="flower.lowerStem.color" roughness="0.72" />
          </TresMesh>
          <TresMesh :position="flower.upperStem.pos" :rotation="flower.upperStem.rot" cast-shadow>
            <TresCylinderGeometry :args="[flower.upperStem.rTop, flower.upperStem.rBottom, flower.upperStem.len, 12]" />
            <TresMeshStandardMaterial :color="flower.upperStem.color" roughness="0.7" />
          </TresMesh>
        </template>

        <!-- 3D Almond Leaves & Petiole Stemlets -->
        <template v-for="(leaf, idx) in flowerLeaves" :key="'leaf-' + idx">
          <TresMesh :position="leaf.petiolePos" :rotation="leaf.petioleRot" cast-shadow>
            <TresCylinderGeometry :args="[0.01, 0.014, 0.14, 8]" />
            <TresMeshStandardMaterial color="#2E6B28" roughness="0.72" />
          </TresMesh>
          <TresMesh :position="leaf.pos" :rotation="leaf.rot" :scale="[leaf.len, leaf.w, 0.024]" cast-shadow receive-shadow>
            <TresSphereGeometry :args="[0.5, 14, 10]" />
            <TresMeshStandardMaterial :color="leaf.color" roughness="0.62" />
          </TresMesh>
        </template>

        <!-- 360° Solid Sunflower Heads -->
        <TresGroup v-for="flower in sunflowers" :key="flower.id" :position="flower.headPos" :rotation="flower.headRot">
          <!-- Outer Petals -->
          <TresGroup v-for="(p, i) in flower.data.outer" :key="flower.id + '-o-' + i" :rotation="[0, 0, p.angle]">
            <TresMesh :position="[p.rMid, 0, p.pz]" :rotation="[p.roll, p.tilt, 0]" :scale="[p.len, p.w, 0.016]">
              <TresSphereGeometry :args="[0.5, 12, 10]" />
              <TresMeshStandardMaterial color="#FFD54F" roughness="0.48" emissive="#FFB300" :emissiveIntensity="0.16" />
            </TresMesh>
          </TresGroup>

          <!-- Middle Offset Petals -->
          <TresGroup v-for="(p, i) in flower.data.mid" :key="flower.id + '-m-' + i" :rotation="[0, 0, p.angle]">
            <TresMesh :position="[p.rMid, 0, p.pz]" :rotation="[p.roll, p.tilt, 0]" :scale="[p.len, p.w, 0.016]">
              <TresSphereGeometry :args="[0.5, 12, 10]" />
              <TresMeshStandardMaterial color="#FFC107" roughness="0.46" emissive="#FF9800" :emissiveIntensity="0.16" />
            </TresMesh>
          </TresGroup>

          <!-- Inner Ray Floret Petals -->
          <TresGroup v-for="(p, i) in flower.data.inner" :key="flower.id + '-i-' + i" :rotation="[0, 0, p.angle]">
            <TresMesh :position="[p.rMid, 0, p.pz]" :rotation="[0, p.tilt, 0]" :scale="[p.len, p.w, 0.016]">
              <TresSphereGeometry :args="[0.5, 12, 10]" />
              <TresMeshStandardMaterial color="#FFB300" roughness="0.45" emissive="#FF8F00" :emissiveIntensity="0.18" />
            </TresMesh>
          </TresGroup>

          <!-- Back Green Sepal Bracts -->
          <TresGroup v-for="(p, i) in flower.data.sepals" :key="flower.id + '-s-' + i" :rotation="[0, 0, p.angle]">
            <TresMesh :position="[p.rMid, 0, p.pz]" :rotation="[0, p.tilt, 0]" :scale="[p.len, p.w, 0.018]">
              <TresSphereGeometry :args="[0.5, 10, 8]" />
              <TresMeshStandardMaterial color="#387A31" roughness="0.68" />
            </TresMesh>
          </TresGroup>

          <!-- Solid Front-and-Back Oblate Seed Cushion -->
          <TresMesh :scale="[1, 1, 0.48]" cast-shadow receive-shadow>
            <TresSphereGeometry :args="[flower.data.seedRadius, 24, 20]" />
            <TresMeshStandardMaterial color="#2B1810" roughness="0.96" />
          </TresMesh>
          <!-- Textured Golden-Amber Floret Rim Ring -->
          <TresMesh :position="[0, 0, 0.035]">
            <TresTorusGeometry :args="[flower.data.seedRadius * 0.82, flower.data.seedRadius * 0.13, 14, 28]" />
            <TresMeshStandardMaterial color="#9E5B16" roughness="0.82" />
          </TresMesh>
          <!-- Raised Inner Disc Boss -->
          <TresMesh :position="[0, 0, 0.03]" :scale="[1, 1, 0.45]">
            <TresSphereGeometry :args="[flower.data.seedRadius * 0.56, 16, 14]" />
            <TresMeshStandardMaterial color="#4A2A18" roughness="0.92" />
          </TresMesh>

          <!-- Back Green Calyx / Receptacle Cup & Stem Socket -->
          <TresMesh :position="[0, 0, -0.035]" :scale="[1, 1, 0.6]" cast-shadow receive-shadow>
            <TresSphereGeometry :args="[flower.data.seedRadius * 0.95, 20, 16]" />
            <TresMeshStandardMaterial color="#2E6B28" roughness="0.72" />
          </TresMesh>
          <TresMesh :position="[0, 0, -0.085]" :rotation="[Math.PI / 2, 0, 0]" cast-shadow>
            <TresCylinderGeometry :args="[flower.data.seedRadius * 0.55, 0.038, 0.11, 16]" />
            <TresMeshStandardMaterial color="#2E6B28" roughness="0.72" />
          </TresMesh>
        </TresGroup>
      </TresGroup>
    </TresGroup>

    <!-- Purely Decorative Nikon Coolpix Camera (flush on desk y = 0.0 via Box3) -->
    <TresGroup
      ref="nikonGroupRef"
      :position="[NIKON_TARGET.x + nikonAdjust.x, NIKON_TARGET.y + nikonAdjust.y, NIKON_TARGET.z + nikonAdjust.z]"
      :rotation="[0, 0.35, 0]"
      :scale="5.0"
    >
      <Suspense>
        <GLTFModel ref="nikonModelRef" path="/files/nikon_camera-compressed.glb" cast-shadow receive-shadow />
      </Suspense>
    </TresGroup>

  </TresGroup>
</template>
