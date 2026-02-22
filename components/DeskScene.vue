<script setup>
import * as THREE from 'three';

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
      <TresMeshStandardMaterial color="#d4b595" roughness="0.6" />
    </TresMesh>
    
    <!-- Desk Legs -->
    <!-- Front Left -->
    <TresMesh :position="[-4.8, -2.7, 2.8]" cast-shadow receive-shadow>
      <TresCylinderGeometry :args="[0.1, 0.05, 4.6, 16]" />
      <TresMeshStandardMaterial color="#8b5a2b" roughness="0.8" />
    </TresMesh>
    <!-- Front Right -->
    <TresMesh :position="[4.8, -2.7, 2.8]" cast-shadow receive-shadow>
      <TresCylinderGeometry :args="[0.1, 0.05, 4.6, 16]" />
      <TresMeshStandardMaterial color="#8b5a2b" roughness="0.8" />
    </TresMesh>
    <!-- Back Left -->
    <TresMesh :position="[-4.8, -2.7, -2.8]" cast-shadow receive-shadow>
      <TresCylinderGeometry :args="[0.1, 0.05, 4.6, 16]" />
      <TresMeshStandardMaterial color="#8b5a2b" roughness="0.8" />
    </TresMesh>
    <!-- Back Right -->
    <TresMesh :position="[4.8, -2.7, -2.8]" cast-shadow receive-shadow>
      <TresCylinderGeometry :args="[0.1, 0.05, 4.6, 16]" />
      <TresMeshStandardMaterial color="#8b5a2b" roughness="0.8" />
    </TresMesh>

    <!-- Desk Ambient Light -->
    <TresAmbientLight :intensity="0.8" color="#ffffff" />
    
    <!-- Literal Mushroom Desk Lamp -->
    <TresGroup :position="[-3.5, -0.2, -2]">
      <!-- Mushroom Stalk (Taller) -->
      <TresMesh :position="[0, 0.75, 0]" cast-shadow>
         <TresCylinderGeometry :args="[0.12, 0.25, 1.5, 32]" />
         <TresMeshStandardMaterial color="#fdfaee" roughness="0.9" />
      </TresMesh>
      
      <!-- Mushroom Cap -->
      <TresGroup :position="[0, 1.5, 0]">
         <TresMesh cast-shadow>
           <TresSphereGeometry :args="[1.0, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]" />
           <TresMeshStandardMaterial color="#d32f2f" emissive="#e53935" :emissiveIntensity="0.6" roughness="0.5" />
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
            <TresMeshStandardMaterial color="#ffcdd2" emissive="#ffcdd2" :emissiveIntensity="0.8" />
         </TresMesh>
      </TresGroup>
      
      <!-- Mushroom Light Source (Intensified) -->
      <TresPointLight 
        :position="[0, 1.0, 0]" 
        :intensity="20" 
        :distance="18"
        cast-shadow 
        color="#ffcdd2"
        :decay="1.5"
      />
    </TresGroup>

  </TresGroup>
</template>
