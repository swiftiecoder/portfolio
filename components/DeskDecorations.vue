<script setup>
import { shallowRef, ref, onMounted } from 'vue'
import * as THREE from 'three'

// Generate two rings of 3D petals for sunflower heads
const outerCount = 14
const innerCount = 14

const makeFlower = (outerR, innerR, petalLen, innerPetalLen) => {
  const outer = []
  const inner = []
  // Outer ring — petals fan slightly outward in Z
  for (let i = 0; i < outerCount; i++) {
    const angle = (i / outerCount) * Math.PI * 2
    outer.push({
      px: Math.cos(angle) * outerR,
      py: Math.sin(angle) * outerR,
      pz: -0.02,
      rz: angle + Math.PI / 2,
      tilt: 0.35 + Math.sin(i * 1.3) * 0.1, // slight variation
      len: petalLen
    })
  }
  // Inner ring — offset by half-petal, slightly shorter, tilted more upright
  for (let i = 0; i < innerCount; i++) {
    const angle = ((i + 0.5) / innerCount) * Math.PI * 2
    inner.push({
      px: Math.cos(angle) * innerR,
      py: Math.sin(angle) * innerR,
      pz: 0.01,
      rz: angle + Math.PI / 2,
      tilt: 0.15 + Math.sin(i * 1.7) * 0.08,
      len: innerPetalLen
    })
  }
  return { outer, inner }
}

const flower1 = makeFlower(0.22, 0.15, 0.2, 0.14)
const flower2 = makeFlower(0.18, 0.12, 0.17, 0.12)
const flower3 = makeFlower(0.15, 0.10, 0.14, 0.10)

// Textures for Books
const katabasisTex = shallowRef(null)
const achillesTex = shallowRef(null)
const katabasisMaterials = shallowRef([])
const achillesMaterials = shallowRef([])

onMounted(() => {
  const loader = new THREE.TextureLoader()
  
  const loadBookTexture = (path) => {
    const tex = loader.load(path)
    tex.colorSpace = THREE.SRGBColorSpace
    
    // Create an array of 6 materials for the BoxGeometry
    // [right, left, top, bottom, front, back]
    // Textures typically go on top (2) and bottom (3)
    const spineMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 })
    const coverMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })
    const pagesMat = new THREE.MeshStandardMaterial({ color: '#f5f5dc', roughness: 1.0 })
    
    return [
      pagesMat, // Right
      spineMat, // Left (the side facing the front-left edge)
      coverMat, // Top (cover)
      coverMat, // Bottom (back cover)
      pagesMat, // Front 
      pagesMat  // Back
    ]
  }
  
  // Very dark mystical grey/black for Katabasis
  katabasisMaterials.value = loadBookTexture('/files/katabasis.png')
  
  // Deep elegant blue for Achilles
  achillesMaterials.value = loadBookTexture('/files/achilles.png')
})
</script>

<template>
  <TresGroup>
    <!-- Stack of Books (Moved to front-left corner to make room for CV pages) -->
    <TresGroup :position="[-3.5, -0.2, 1.5]" :rotation="[0, 0.5, 0]">
      <!-- Bottom book: Katabasis (Thicker) -->
      <TresMesh v-if="katabasisMaterials.length" :position="[0, 0.15, 0]" :rotation="[0, -0.1, 0]" cast-shadow :material="katabasisMaterials">
        <TresBoxGeometry :args="[1.2, 0.3, 1.8]" />
      </TresMesh>
      
      <!-- Top book: The Song of Achilles -->
      <TresMesh v-if="achillesMaterials.length" :position="[0.05, 0.4, 0.05]" :rotation="[0, 0.15, 0]" cast-shadow :material="achillesMaterials">
        <TresBoxGeometry :args="[1.1, 0.25, 1.6]" />
      </TresMesh>
    </TresGroup>
    
    <!-- Scattered Polaroids / Papers -->
    <TresMesh :position="[2.5, -0.19, -1.5]" :rotation="[0, -0.5, 0]" receive-shadow>
       <TresBoxGeometry :args="[0.8, 0.01, 1]" />
       <TresMeshStandardMaterial color="#f7fafc" roughness="1.0" />
    </TresMesh>
    
    <TresMesh :position="[2.2, -0.18, -1.2]" :rotation="[0, 0.3, 0]" receive-shadow>
       <TresBoxGeometry :args="[0.8, 0.01, 1]" />
       <TresMeshStandardMaterial color="#edf2f7" roughness="1.0" />
    </TresMesh>

    <!-- V3: Potted Sunflowers -->
    <TresGroup :position="[3.5, -0.2, -2]">
      <!-- Terracotta Pot -->
      <TresMesh :position="[0, 0.4, 0]" cast-shadow receive-shadow>
        <TresCylinderGeometry :args="[0.5, 0.35, 0.8, 32]" />
        <TresMeshStandardMaterial color="#D87A5D" roughness="0.9" />
      </TresMesh>
      <!-- Pot Soil -->
      <TresMesh :position="[0, 0.795, 0]" receive-shadow>
        <TresCylinderGeometry :args="[0.47, 0.47, 0.02, 32]" />
        <TresMeshStandardMaterial color="#2B1B17" roughness="1.0" />
      </TresMesh>
      
      <!-- Stems with Leaves -->
      <TresGroup :position="[0, 0.8, 0]">
         <!-- Stem 1 (tallest, slight lean) -->
         <TresMesh :position="[0.1, 0.5, 0]" :rotation="[0, 0, -0.08]" cast-shadow>
            <TresCylinderGeometry :args="[0.03, 0.04, 1.0, 8]" />
            <TresMeshStandardMaterial color="#388E3C" roughness="0.7" />
         </TresMesh>
         <!-- Leaf on stem 1 -->
         <TresMesh :position="[0.22, 0.35, 0]" :rotation="[0, 0.3, -0.6]" cast-shadow>
            <TresPlaneGeometry :args="[0.25, 0.12]" />
            <TresMeshStandardMaterial color="#2E7D32" :side="2" roughness="0.6" />
         </TresMesh>

         <!-- Stem 2 (medium, lean other way) -->
         <TresMesh :position="[-0.15, 0.35, 0.1]" :rotation="[0, 0, 0.15]" cast-shadow>
            <TresCylinderGeometry :args="[0.03, 0.04, 0.7, 8]" />
            <TresMeshStandardMaterial color="#2E7D32" roughness="0.7" />
         </TresMesh>
         <!-- Leaf on stem 2 -->
         <TresMesh :position="[-0.3, 0.25, 0.1]" :rotation="[0, -0.4, 0.5]" cast-shadow>
            <TresPlaneGeometry :args="[0.22, 0.1]" />
            <TresMeshStandardMaterial color="#388E3C" :side="2" roughness="0.6" />
         </TresMesh>

         <!-- Stem 3 (shortest, slight forward lean) -->
         <TresMesh :position="[0.12, 0.55, -0.18]" :rotation="[0.12, 0, -0.12]" cast-shadow>
            <TresCylinderGeometry :args="[0.025, 0.035, 1.1, 8]" />
            <TresMeshStandardMaterial color="#4CAF50" roughness="0.7" />
         </TresMesh>
         <!-- Leaf on stem 3 -->
         <TresMesh :position="[0.02, 0.5, -0.25]" :rotation="[0.3, 0, 0.4]" cast-shadow>
            <TresPlaneGeometry :args="[0.2, 0.1]" />
            <TresMeshStandardMaterial color="#388E3C" :side="2" roughness="0.6" />
         </TresMesh>
      </TresGroup>

      <!-- Sunflower Heads -->
      <TresGroup :position="[0, 0.8, 0]">
         <!-- Flower 1 (Tallest) -->
         <TresGroup :position="[0.12, 1.05, 0.05]" :rotation="[0.5, 0, 0.1]">
            <!-- Outer ring of petals (cone-shaped, fanning backward) -->
            <TresGroup v-for="(p, i) in flower1.outer" :key="'f1o-' + i"
              :position="[p.px, p.py, p.pz]"
              :rotation="[p.tilt, 0, p.rz]"
            >
              <TresMesh cast-shadow>
                <TresConeGeometry :args="[0.04, p.len, 6]" />
                <TresMeshStandardMaterial color="#FFD54F" roughness="0.45" emissive="#FFB300" :emissiveIntensity="0.2" />
              </TresMesh>
            </TresGroup>
            <!-- Inner ring of petals (more upright, fills gaps) -->
            <TresGroup v-for="(p, i) in flower1.inner" :key="'f1i-' + i"
              :position="[p.px, p.py, p.pz]"
              :rotation="[p.tilt, 0, p.rz]"
            >
              <TresMesh cast-shadow>
                <TresConeGeometry :args="[0.035, p.len, 6]" />
                <TresMeshStandardMaterial color="#FFC107" roughness="0.45" emissive="#FF8F00" :emissiveIntensity="0.2" />
              </TresMesh>
            </TresGroup>
            <!-- Domed Seed Center -->
            <TresMesh cast-shadow :rotation="[Math.PI/2, 0, 0]">
              <TresSphereGeometry :args="[0.14, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]" />
              <TresMeshStandardMaterial color="#3E2723" roughness="1.0" />
            </TresMesh>
            <!-- Seed texture bump -->
            <TresMesh :position="[0, 0, 0.01]" :rotation="[Math.PI/2, 0, 0]">
              <TresSphereGeometry :args="[0.08, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]" />
              <TresMeshStandardMaterial color="#5D4037" roughness="0.9" />
            </TresMesh>
         </TresGroup>

         <!-- Flower 2 (Medium) -->
         <TresGroup :position="[-0.18, 0.72, 0.15]" :rotation="[0.3, -0.5, -0.15]">
            <TresGroup v-for="(p, i) in flower2.outer" :key="'f2o-' + i"
              :position="[p.px, p.py, p.pz]"
              :rotation="[p.tilt, 0, p.rz]"
            >
              <TresMesh cast-shadow>
                <TresConeGeometry :args="[0.035, p.len, 6]" />
                <TresMeshStandardMaterial color="#FFCA28" roughness="0.45" emissive="#FFA000" :emissiveIntensity="0.2" />
              </TresMesh>
            </TresGroup>
            <TresGroup v-for="(p, i) in flower2.inner" :key="'f2i-' + i"
              :position="[p.px, p.py, p.pz]"
              :rotation="[p.tilt, 0, p.rz]"
            >
              <TresMesh cast-shadow>
                <TresConeGeometry :args="[0.03, p.len, 6]" />
                <TresMeshStandardMaterial color="#FFB300" roughness="0.45" emissive="#FF8F00" :emissiveIntensity="0.2" />
              </TresMesh>
            </TresGroup>
            <TresMesh cast-shadow :rotation="[Math.PI/2, 0, 0]">
              <TresSphereGeometry :args="[0.11, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]" />
              <TresMeshStandardMaterial color="#3E2723" roughness="1.0" />
            </TresMesh>
            <TresMesh :position="[0, 0, 0.01]" :rotation="[Math.PI/2, 0, 0]">
              <TresSphereGeometry :args="[0.06, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]" />
              <TresMeshStandardMaterial color="#4E342E" roughness="0.9" />
            </TresMesh>
         </TresGroup>

         <!-- Flower 3 (Tallest stem, slightly drooping) -->
         <TresGroup :position="[0.2, 1.15, -0.25]" :rotation="[0.7, 0.3, -0.1]">
            <TresGroup v-for="(p, i) in flower3.outer" :key="'f3o-' + i"
              :position="[p.px, p.py, p.pz]"
              :rotation="[p.tilt, 0, p.rz]"
            >
              <TresMesh cast-shadow>
                <TresConeGeometry :args="[0.03, p.len, 6]" />
                <TresMeshStandardMaterial color="#FFE082" roughness="0.45" emissive="#FFCA28" :emissiveIntensity="0.2" />
              </TresMesh>
            </TresGroup>
            <TresGroup v-for="(p, i) in flower3.inner" :key="'f3i-' + i"
              :position="[p.px, p.py, p.pz]"
              :rotation="[p.tilt, 0, p.rz]"
            >
              <TresMesh cast-shadow>
                <TresConeGeometry :args="[0.025, p.len, 6]" />
                <TresMeshStandardMaterial color="#FFD54F" roughness="0.45" emissive="#FFB300" :emissiveIntensity="0.2" />
              </TresMesh>
            </TresGroup>
            <TresMesh cast-shadow :rotation="[Math.PI/2, 0, 0]">
              <TresSphereGeometry :args="[0.09, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]" />
              <TresMeshStandardMaterial color="#3E2723" roughness="1.0" />
            </TresMesh>
            <TresMesh :position="[0, 0, 0.01]" :rotation="[Math.PI/2, 0, 0]">
              <TresSphereGeometry :args="[0.05, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]" />
              <TresMeshStandardMaterial color="#5D4037" roughness="0.9" />
            </TresMesh>
         </TresGroup>
      </TresGroup>
    </TresGroup>

    <!-- V3: Subtle Atmospheric Dust Particles -->
    <TresGroup :position="[-3, 2, 0]">
       <TresMesh v-for="i in 30" :key="`dust-${i}`" 
                 :position="[Math.random() * 8 - 4, Math.random() * 4 - 2, Math.random() * 6 - 3]" 
                 :rotation="[Math.random() * Math.PI, Math.random() * Math.PI, 0]">
          <TresPlaneGeometry :args="[0.02, 0.02]" />
          <TresMeshBasicMaterial color="#ffffff" :transparent="true" :opacity="0.3" :side="2" />
       </TresMesh>
    </TresGroup>

  </TresGroup>
</template>
