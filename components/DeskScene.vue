<script setup>
import { ref, shallowRef, watch, onMounted } from 'vue'
import * as THREE from 'three'
import { createWalnutWoodTexture } from '../utils/textureGenerator'

const props = defineProps({
  isNightMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggleNightMode'])

const walnutTex = ref(null)
const capMatRef = shallowRef(null)
const underglowMatRef = shallowRef(null)
const lampLightRef = shallowRef(null)

const applyLampNightMode = () => {
  const night = props.isNightMode
  const capMat = capMatRef.value?.value || capMatRef.value?.instance || capMatRef.value
  if (capMat) {
    capMat.emissive?.set(night ? '#ff8a65' : '#e53935')
    capMat.emissiveIntensity = night ? 0.95 : 0.6
  }
  const underglowMat = underglowMatRef.value?.value || underglowMatRef.value?.instance || underglowMatRef.value
  if (underglowMat) {
    const col = night ? '#ffb74d' : '#ffcdd2'
    underglowMat.color?.set(col)
    underglowMat.emissive?.set(col)
    underglowMat.emissiveIntensity = night ? 1.2 : 0.8
  }
  const light = lampLightRef.value?.value || lampLightRef.value?.instance || lampLightRef.value
  if (light) {
    light.intensity = night ? 32 : 18
    light.color?.set(night ? '#ffb74d' : '#ffcdd2')
  }
}

watch([() => props.isNightMode, capMatRef, underglowMatRef, lampLightRef], applyLampNightMode, {
  flush: 'post',
  immediate: true
})

onMounted(() => {
  walnutTex.value = createWalnutWoodTexture(THREE)
})

const onLampEnter = () => {
  document.body.style.cursor = 'pointer'
}

const onLampLeave = () => {
  document.body.style.cursor = ''
}

const spots = [];
const numSpots = 15;
const minDist = 0.35; // Minimum distance to prevent unrealistic clumping
const r = 1.01; 

const dummy = new THREE.Object3D();

let attempts = 0;
while (spots.length < numSpots && attempts < 300) {
  attempts++;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * (Math.PI / 2.3);
  
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.sin(theta);
  
  // Reject if too close to an existing spot
  const tooClose = spots.some(spot => {
    const dx = spot.position[0] - x;
    const dy = spot.position[1] - y;
    const dz = spot.position[2] - z;
    return Math.sqrt(dx*dx + dy*dy + dz*dz) < minDist;
  });
  
  if (!tooClose) {
    dummy.position.set(x, y, z);
    dummy.lookAt(0, 0, 0);
    
    spots.push({
      position: [x, y, z],
      rotation: [dummy.rotation.x, dummy.rotation.y, dummy.rotation.z],
      radius: 0.06 + Math.random() * 0.10 // Slightly varied sizes
    });
  }
}
</script>

<template>
  <TresGroup>
    <!-- Desk Wooden Surface -->
    <TresMesh :position="[0, -0.2, 0]" receive-shadow cast-shadow>
      <TresBoxGeometry :args="[10, 0.4, 6]" />
      <TresMeshStandardMaterial :map="walnutTex" color="#c89f78" roughness="0.55" />
    </TresMesh>
    
    <!-- Desk Legs -->
    <!-- Front Left -->
    <TresMesh :position="[-4.8, -2.7, 2.8]" cast-shadow receive-shadow>
      <TresCylinderGeometry :args="[0.1, 0.05, 4.6, 16]" />
      <TresMeshStandardMaterial color="#4A2E19" roughness="0.7" />
    </TresMesh>
    <!-- Front Right -->
    <TresMesh :position="[4.8, -2.7, 2.8]" cast-shadow receive-shadow>
      <TresCylinderGeometry :args="[0.1, 0.05, 4.6, 16]" />
      <TresMeshStandardMaterial color="#4A2E19" roughness="0.7" />
    </TresMesh>
    <!-- Back Left -->
    <TresMesh :position="[-4.8, -2.7, -2.8]" cast-shadow receive-shadow>
      <TresCylinderGeometry :args="[0.1, 0.05, 4.6, 16]" />
      <TresMeshStandardMaterial color="#4A2E19" roughness="0.7" />
    </TresMesh>
    <!-- Back Right -->
    <TresMesh :position="[4.8, -2.7, -2.8]" cast-shadow receive-shadow>
      <TresCylinderGeometry :args="[0.1, 0.05, 4.6, 16]" />
      <TresMeshStandardMaterial color="#4A2E19" roughness="0.7" />
    </TresMesh>

    <!-- Wooden Baseboards along all 4 walls -->
    <TresMesh :position="[0, -4.85, -14.92]" receive-shadow>
      <TresBoxGeometry :args="[30, 0.3, 0.16]" />
      <TresMeshStandardMaterial color="#4A2E19" roughness="0.7" />
    </TresMesh>
    <TresMesh :position="[0, -4.85, 14.92]" receive-shadow>
      <TresBoxGeometry :args="[30, 0.3, 0.16]" />
      <TresMeshStandardMaterial color="#4A2E19" roughness="0.7" />
    </TresMesh>
    <TresMesh :position="[-14.92, -4.85, 0]" receive-shadow>
      <TresBoxGeometry :args="[0.16, 0.3, 30]" />
      <TresMeshStandardMaterial color="#4A2E19" roughness="0.7" />
    </TresMesh>
    <TresMesh :position="[14.92, -4.85, 0]" receive-shadow>
      <TresBoxGeometry :args="[0.16, 0.3, 30]" />
      <TresMeshStandardMaterial color="#4A2E19" roughness="0.7" />
    </TresMesh>
    
    <!-- Literal Mushroom Desk Lamp (clickable Golden Hour / Midnight toggle) -->
    <TresGroup
      :position="[-3.8, 0.0, -2.1]"
      @click.stop="emit('toggleNightMode')"
      @pointer-enter="onLampEnter"
      @pointer-leave="onLampLeave"
    >
      <!-- Mushroom Stalk (Taller, flush on y = 0.0) -->
      <TresMesh :position="[0, 0.75, 0]" cast-shadow>
         <TresCylinderGeometry :args="[0.12, 0.25, 1.5, 32]" />
         <TresMeshStandardMaterial color="#fdfaee" roughness="0.9" />
      </TresMesh>
      
      <!-- Mushroom Cap -->
      <TresGroup :position="[0, 1.5, 0]">
         <TresMesh cast-shadow>
           <TresSphereGeometry :args="[1.0, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]" />
           <TresMeshStandardMaterial
             ref="capMatRef"
             color="#d32f2f"
             emissive="#e53935"
             :emissiveIntensity="0.6"
             roughness="0.5"
           />
         </TresMesh>
         
         <!-- Mushroom Spots (Randomly placed flat circles) -->
         <TresMesh 
           v-for="(spot, index) in spots" 
           :key="`spot-${index}`"
           :position="spot.position"
           :rotation="spot.rotation"
         >
           <TresCircleGeometry :args="[spot.radius, 16]" />
           <TresMeshBasicMaterial color="#ffffff" :side="2" />
         </TresMesh>
         
         <!-- Soft under-glow for the cap -->
         <TresMesh :rotation="[Math.PI / 2, 0, 0]">
            <TresCircleGeometry :args="[1.0, 32]" />
            <TresMeshStandardMaterial
              ref="underglowMatRef"
              color="#ffcdd2"
              emissive="#ffcdd2"
              :emissiveIntensity="0.8"
              :side="2"
            />
         </TresMesh>
      </TresGroup>
      
      <!-- Mushroom Light Source -->
      <TresPointLight 
        ref="lampLightRef"
        :position="[0, 1.0, 0]" 
        :intensity="18" 
        :distance="18"
        cast-shadow 
        color="#ffcdd2"
        :decay="1.5"
      />
    </TresGroup>

  </TresGroup>
</template>
