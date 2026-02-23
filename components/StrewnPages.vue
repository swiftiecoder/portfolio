<script setup>
import { shallowRef, onMounted } from 'vue'
import * as THREE from 'three'

const emits = defineEmits(['pageClick'])

const resumeTex = shallowRef(null)
const cvTex = shallowRef(null)

onMounted(() => {
  const loader = new THREE.TextureLoader()

  resumeTex.value = loader.load('/shaharyar_resume_pages-to-jpg-0001.jpg')
  resumeTex.value.colorSpace = THREE.SRGBColorSpace

  cvTex.value = loader.load('/shaharyar_acad_cv_page-0001.jpg')
  cvTex.value.colorSpace = THREE.SRGBColorSpace
})

const pagesData = [
  { 
    id: 'Resume', 
    position: [-0.5, 0.015, 0.5], 
    rotation: [0, 0.2, 0]
  },
  { 
    id: 'AcademicCV', 
    position: [0.8, 0.01, 1.2], 
    rotation: [0, -0.3, 0]
  }
]

const pageGeo = new THREE.BoxGeometry(1.4, 0.005, 1.8)

const handlePageClick = (id) => {
  emits('pageClick', id)
}
</script>

<template>
  <TresGroup v-if="resumeTex && cvTex">
    <TresMesh 
      v-for="page in pagesData" 
      :key="page.id"
      :position="page.position"
      :rotation="page.rotation"
      cast-shadow 
      receive-shadow
      @click="handlePageClick(page.id)"
    >
      <primitive :object="pageGeo" />
      
      <TresMeshStandardMaterial color="#EEEEEE" roughness="0.9" attach="material-0" />
      <TresMeshStandardMaterial color="#EEEEEE" roughness="0.9" attach="material-1" />
      <!-- Tinted the material color grey/black to darken the white paper texture and make text pop under the bright light -->
      <TresMeshStandardMaterial :map="page.id === 'Resume' ? resumeTex : cvTex" color="#999999" roughness="0.9" attach="material-2" />
      <TresMeshStandardMaterial color="#EEEEEE" roughness="0.9" attach="material-3" />
      <TresMeshStandardMaterial color="#EEEEEE" roughness="0.9" attach="material-4" />
      <TresMeshStandardMaterial color="#EEEEEE" roughness="0.9" attach="material-5" />
    </TresMesh>
  </TresGroup>
</template>
