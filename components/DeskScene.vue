<script setup>
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
    
    <!-- Desk Lamp Setup (Adjusted for Light Mode) -->
    <TresGroup :position="[-3.5, -0.3, -2]">
      <!-- Lamp base -->
      <TresMesh :position="[0, 0.1, 0]" cast-shadow>
         <TresCylinderGeometry :args="[0.5, 0.5, 0.1, 32]" />
         <TresMeshStandardMaterial color="#e5e5e5" metalness="0.2" roughness="0.5" />
      </TresMesh>
      
      <!-- Lamp neck / stand -->
      <TresMesh :position="[0.2, 1, 0]" :rotation="[0, 0, -0.2]" cast-shadow>
        <TresCylinderGeometry :args="[0.05, 0.05, 2, 8]" />
        <TresMeshStandardMaterial color="#cccccc" metalness="0.5" />
      </TresMesh>
      
      <!-- Lamp bulb casing -->
      <TresMesh :position="[0.6, 2, 0]" :rotation="[0, 0, -1]" cast-shadow>
        <TresSphereGeometry :args="[0.4, 16, 16, 0, Math.PI]" />
        <TresMeshStandardMaterial color="#f8f9fa" metalness="0.1" roughness="0.3" />
      </TresMesh>
      
      <!-- Lamp Light Source -->
      <TresSpotLight 
        :position="[0.6, 1.8, 0]" 
        :angle="Math.PI / 4" 
        :penumbra="0.3" 
        :intensity="10" 
        :distance="15"
        cast-shadow 
        color="#ffffff"
        :decay="2"
      />
    </TresGroup>

  </TresGroup>
</template>
