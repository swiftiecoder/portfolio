<script setup>
import { shallowRef, ref, watch, nextTick } from 'vue'
import * as THREE from 'three'
import { GLTFModel } from '@tresjs/cientos'

// Back-right wall corner: center.x -> 10.5, min.y -> -5.0 (floor), min.z -> -14.80 (against back wall z = -14.9)
const GUITAR_TARGET = { x: 10.5, y: -5.0, z: -14.80 }
const guitarGroupRef = shallowRef(null)
const guitarModelRef = shallowRef(null)
const guitarPos = ref({ x: GUITAR_TARGET.x, y: GUITAR_TARGET.y, z: GUITAR_TARGET.z })
const guitarSnapped = ref(false)

watch(
  () => guitarModelRef.value?.instance?.value || guitarModelRef.value?.instance,
  (gltf) => {
    if (!gltf || guitarSnapped.value) return
    const attemptSnap = () => {
      if (guitarSnapped.value) return
      const group = guitarGroupRef.value
      if (!group) return
      group.traverse?.((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      group.updateMatrixWorld(true)
      const box = new THREE.Box3().setFromObject(group)
      if (!box.isEmpty() && Number.isFinite(box.min.y)) {
        const center = box.getCenter(new THREE.Vector3())
        guitarPos.value = {
          x: guitarPos.value.x + (GUITAR_TARGET.x - center.x),
          y: guitarPos.value.y + (GUITAR_TARGET.y - box.min.y),
          z: guitarPos.value.z + (GUITAR_TARGET.z - box.min.z)
        }
        guitarSnapped.value = true
      } else {
        requestAnimationFrame(attemptSnap)
      }
    }
    nextTick(attemptSnap)
  },
  { flush: 'post', immediate: true }
)
</script>

<template>
  <TresGroup
    ref="guitarGroupRef"
    :position="[guitarPos.x, guitarPos.y, guitarPos.z]"
  >
    <TresGroup :rotation="[-0.22, -0.18, 0.05]" :scale="[3.5, 3.5, 3.5]">
      <TresGroup :rotation="[0, -Math.PI / 2, 0]">
        <Suspense>
          <GLTFModel
            ref="guitarModelRef"
            path="/files/acoustic_guitar-compressed.glb"
            cast-shadow
            receive-shadow
          />
        </Suspense>
      </TresGroup>
    </TresGroup>
  </TresGroup>
</template>
