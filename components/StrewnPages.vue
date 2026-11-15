<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'

const emits = defineEmits(['pageClick'])

const pageMaterials = ref({})

const pagesData = [
  {
    id: 'Resume',
    position: [-0.5, 0.012, 0.5],
    rotation: [0, 0.2, 0]
  },
  {
    id: 'AcademicCV',
    position: [0.8, 0.018, 1.2],
    rotation: [0, -0.3, 0]
  }
]

onMounted(() => {
  const loader = new THREE.TextureLoader()

  const buildPageMaterials = (texturePath) => {
    const tex = loader.load(texturePath)
    tex.colorSpace = THREE.SRGBColorSpace

    const edgeMat = new THREE.MeshStandardMaterial({ color: '#e8e2d5', roughness: 0.9 })
    const faceMat = new THREE.MeshStandardMaterial({
      map: tex,
      color: '#b5afa3',
      roughness: 0.85
    })

    return [edgeMat, edgeMat, faceMat, edgeMat, edgeMat, edgeMat]
  }

  pageMaterials.value = {
    Resume: buildPageMaterials('/resume_preview.webp'),
    AcademicCV: buildPageMaterials('/acad_cv_preview.webp')
  }
})

const handlePageClick = (id) => {
  emits('pageClick', id)
}

const onEnter = () => {
  document.body.style.cursor = 'pointer'
}

const onLeave = () => {
  document.body.style.cursor = ''
}
</script>

<template>
  <TresGroup>
    <template v-for="page in pagesData" :key="page.id">
      <TresMesh
        v-if="pageMaterials[page.id]"
        :position="page.position"
        :rotation="page.rotation"
        :material="pageMaterials[page.id]"
        cast-shadow
        receive-shadow
        @click.stop="handlePageClick(page.id)"
        @pointer-enter="onEnter"
        @pointer-leave="onLeave"
      >
        <TresBoxGeometry :args="[1.4, 0.012, 1.8]" />
      </TresMesh>
    </template>
  </TresGroup>
</template>
