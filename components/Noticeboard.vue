<script setup>
const emit = defineEmits(['boardClick'])

const handleBoardClick = () => {
  emit('boardClick', 'NoticeboardUpdates')
}

const onEnter = () => {
  document.body.style.cursor = 'pointer'
}

const onLeave = () => {
  document.body.style.cursor = ''
}
</script>

<template>
  <TresGroup
    :position="[14.9, 2.8, 3.5]"
    :rotation="[0, -Math.PI / 2, 0]"
    @pointer-enter="onEnter"
    @pointer-leave="onLeave"
  >
    <!-- Corkboard Base -->
    <TresMesh @click.stop="handleBoardClick" cast-shadow receive-shadow>
      <TresBoxGeometry :args="[4, 3, 0.1]" />
      <TresMeshStandardMaterial color="#8b5a2b" roughness="0.9" />
    </TresMesh>
    
    <!-- Wooden Frame -->
    <TresGroup>
      <!-- Top -->
      <TresMesh :position="[0, 1.55, 0.05]" cast-shadow>
        <TresBoxGeometry :args="[4.2, 0.1, 0.15]" />
        <TresMeshStandardMaterial color="#3e2723" roughness="0.8" />
      </TresMesh>
      <!-- Bottom -->
      <TresMesh :position="[0, -1.55, 0.05]" cast-shadow>
        <TresBoxGeometry :args="[4.2, 0.1, 0.15]" />
        <TresMeshStandardMaterial color="#3e2723" roughness="0.8" />
      </TresMesh>
      <!-- Left -->
      <TresMesh :position="[-2.05, 0, 0.05]" cast-shadow>
        <TresBoxGeometry :args="[0.1, 3, 0.15]" />
        <TresMeshStandardMaterial color="#3e2723" roughness="0.8" />
      </TresMesh>
      <!-- Right -->
      <TresMesh :position="[2.05, 0, 0.05]" cast-shadow>
        <TresBoxGeometry :args="[0.1, 3, 0.15]" />
        <TresMeshStandardMaterial color="#3e2723" roughness="0.8" />
      </TresMesh>
    </TresGroup>

    <!-- Pinned Papers -->
    <!-- Paper 1 -->
    <TresMesh :position="[-1, 0.5, 0.055]" :rotation="[0, 0, 0.1]" cast-shadow @click.stop="handleBoardClick">
      <TresPlaneGeometry :args="[1.2, 1.5]" />
      <TresMeshStandardMaterial
        color="#ffffff"
        roughness="0.9"
      />
    </TresMesh>
    <TresMesh :position="[-0.8, 1, 0.06]" :rotation="[1.57, 0, 0]" @click.stop="handleBoardClick">
      <TresCylinderGeometry :args="[0.05, 0.05, 0.05, 8]" />
      <TresMeshStandardMaterial color="#e53e3e" />
    </TresMesh>

    <!-- Paper 2 -->
    <TresMesh :position="[0.5, -0.2, 0.055]" :rotation="[0, 0, -0.15]" cast-shadow @click.stop="handleBoardClick">
      <TresPlaneGeometry :args="[1, 1.2]" />
      <TresMeshStandardMaterial
        color="#fefcbf"
        roughness="0.9"
      />
    </TresMesh>
    <TresMesh :position="[0.4, 0.3, 0.06]" :rotation="[1.57, 0, 0]" @click.stop="handleBoardClick">
      <TresCylinderGeometry :args="[0.05, 0.05, 0.05, 8]" />
      <TresMeshStandardMaterial color="#3182ce" />
    </TresMesh>
  </TresGroup>
</template>
