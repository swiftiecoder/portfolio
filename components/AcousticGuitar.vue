<script setup>
import { GLTFModel } from '@tresjs/cientos'

// Right side of room, on the floor, near the back wall
const position = [12, -5, -12]

// Model lies flat by default (neck along Z). -Math.PI/2 on X stands it upright.
// Math.PI on Y faces it toward the camera. Small Z tilt for a natural lean.
const rotation = [0.3, 4.5, 0.7]

// Scaled to 6x (slightly larger than final) for easy position confirmation
const scale = [3.5, 3.5, 3.5]
</script>

<template>
  <TresGroup>
    <Suspense>
      <GLTFModel
        path="/files/acoustic_guitar-compressed.glb"
        draco
        cast-shadow
        receive-shadow
        :position="position"
        :rotation="rotation"
        :scale="scale"
      />
    </Suspense>
  </TresGroup>
</template>
