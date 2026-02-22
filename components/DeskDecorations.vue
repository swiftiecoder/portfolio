<template>
  <TresGroup>
    <!-- Coffee Cup -->
    <TresGroup :position="[1, -0.2, -2]">
      <!-- Cup base -->
      <TresMesh :position="[0, 0.25, 0]" cast-shadow>
        <TresCylinderGeometry :args="[0.2, 0.15, 0.5, 32]" />
        <TresMeshStandardMaterial color="#EAEAEA" roughness="0.2" />
      </TresMesh>
      <!-- Coffee inside -->
      <TresMesh :position="[0, 0.49, 0]">
        <TresCylinderGeometry :args="[0.18, 0.18, 0.01, 32]" />
        <TresMeshStandardMaterial color="#3E2723" roughness="0.9" />
      </TresMesh>
      <!-- Cup handle -->
      <TresMesh :position="[0.2, 0.25, 0]" :rotation="[0, 0, -0.2]" cast-shadow>
        <TresTorusGeometry :args="[0.1, 0.03, 16, 32]" />
        <TresMeshStandardMaterial color="#EAEAEA" roughness="0.2" />
      </TresMesh>
    </TresGroup>

    <!-- Stack of Books -->
    <TresGroup :position="[-1.5, -0.2, 1.5]" :rotation="[0, 0.4, 0]">
      <!-- Bottom book -->
      <TresMesh :position="[0, 0.08, 0]" cast-shadow>
        <TresBoxGeometry :args="[1.2, 0.15, 1.6]" />
        <TresMeshStandardMaterial color="#2d3748" roughness="0.8" />
      </TresMesh>
      <!-- Middle book -->
      <TresMesh :position="[0.05, 0.22, -0.05]" :rotation="[0, -0.2, 0]" cast-shadow>
        <TresBoxGeometry :args="[1.1, 0.12, 1.5]" />
        <TresMeshStandardMaterial color="#742a2a" roughness="0.7" />
      </TresMesh>
      <!-- Top book -->
      <TresMesh :position="[-0.02, 0.33, 0.02]" :rotation="[0, 0.1, 0]" cast-shadow>
        <TresBoxGeometry :args="[1.0, 0.1, 1.4]" />
        <TresMeshStandardMaterial color="#276749" roughness="0.7" />
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

    <!-- V3: Potted Plant -->
    <TresGroup :position="[3.5, -0.2, -2]">
      <!-- Terracotta Pot -->
      <TresMesh :position="[0, 0.4, 0]" cast-shadow receive-shadow>
        <TresCylinderGeometry :args="[0.5, 0.35, 0.8, 32]" />
        <TresMeshStandardMaterial color="#D87A5D" roughness="0.9" />
      </TresMesh>
      <!-- Pot Soil -->
      <TresMesh :position="[0, 0.79, 0]" receive-shadow>
        <TresCylinderGeometry :args="[0.48, 0.48, 0.02, 32]" />
        <TresMeshStandardMaterial color="#2B1B17" roughness="1.0" />
      </TresMesh>
      <!-- Plant Leaves (Abstracted as a cluster of overlapping green spheres/ellipsoids) -->
      <TresGroup :position="[0, 0.8, 0]">
         <TresMesh :position="[0, 0.5, 0]" :rotation="[0.2, 0, 0.1]" cast-shadow>
           <TresSphereGeometry :args="[0.4, 16, 16]" />
           <TresMeshStandardMaterial color="#4CAF50" roughness="0.6" />
         </TresMesh>
         <TresMesh :position="[-0.3, 0.3, 0.2]" :rotation="[-0.2, 0.4, -0.1]" cast-shadow>
           <TresSphereGeometry :args="[0.35, 16, 16]" />
           <TresMeshStandardMaterial color="#388E3C" roughness="0.6" />
         </TresMesh>
         <TresMesh :position="[0.3, 0.4, -0.2]" :rotation="[0.1, -0.3, 0.2]" cast-shadow>
           <TresSphereGeometry :args="[0.3, 16, 16]" />
           <TresMeshStandardMaterial color="#2E7D32" roughness="0.6" />
         </TresMesh>
         <TresMesh :position="[0, 0.8, 0.1]" :rotation="[-0.1, 0.1, -0.2]" cast-shadow>
           <TresSphereGeometry :args="[0.25, 16, 16]" />
           <TresMeshStandardMaterial color="#4CAF50" roughness="0.6" />
         </TresMesh>
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
