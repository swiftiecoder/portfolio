<script setup>
import { shallowRef, onMounted } from 'vue'
import * as THREE from 'three'

// The list of poster images to display on the wall.
// You can add or remove items from this array to dynamically update the wall.
const posterFiles = [
  'bad bunny.webp',
  'bosco polaroid.webp',
  'charles.webp',
  'folklore.webp',
  'hr.webp',
  'katseye.webp',
  'katya polaroid.webp',
  'lux.webp',
  'lydia polaroid.webp',
  'nini coco.webp',
  'reading poste.webp',
  'snoopy rivalry.webp',
  'spiderman.webp',
  'superman.webp',
  'tgi halsey.webp',
  'the traitors.webp',
  'trixie polaroid.webp',
  'wandavision.webp',
  'wuthering heights album cover.webp'
  'wha.webp',
  'HAVE YOU SEEN HIM.webp'
]

const posters = shallowRef([])

const getPosterDimensions = (aspectRatio, baseHeight) => {
  return [baseHeight * aspectRatio, baseHeight]
}

onMounted(() => {
  const loader = new THREE.TextureLoader()
  const loadedPosters = []

  // Configuration for the wall area where posters can be placed
  const startX = -8
  const endX = 10
  const startY = 1
  const endY = 7

  // Helper to calculate area of intersection between two rectangles (unrotated aabbs)
  const getOverlapArea = (r1, r2) => {
    const xOverlap = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left))
    const yOverlap = Math.max(0, Math.min(r1.top, r2.top) - Math.max(r1.bottom, r2.bottom))
    return xOverlap * yOverlap
  }

  posterFiles.forEach((filename, index) => {
    loader.load(`/posters/${filename}`, (texture) => {
      // Fix washed out colors by setting correct color space for Three.js PBR materials
      texture.colorSpace = THREE.SRGBColorSpace

      const aspectRatio = texture.image.width / texture.image.height
      // Make them slightly larger as requested
      const baseHeight = 2.0 + (Math.random() * 0.8)
      const dimensions = getPosterDimensions(aspectRatio, baseHeight)
      const width = dimensions[0]
      const height = dimensions[1]
      const area = width * height

      let x, y
      let attempts = 0
      let maxOverlap = 1.0 // Start at 100% overlap
      const maxAttempts = 100 // Prevent infinite loops

      // Try random positions until we find one that doesn't overlap too much
      while (maxOverlap > 0.25 && attempts < maxAttempts) {
        x = startX + (Math.random() * (endX - startX))
        y = startY + (Math.random() * (endY - startY))
        attempts++

        // Calculate AABB for current candidate
        const currentRect = {
          left: x - (width / 2),
          right: x + (width / 2),
          bottom: y - (height / 2),
          top: y + (height / 2)
        }

        // Check overlap against all already placed posters
        let currentMaxOverlap = 0
        for (const p of loadedPosters) {
          const pRect = {
            left: p.position[0] - (p.dimensions[0] / 2),
            right: p.position[0] + (p.dimensions[0] / 2),
            bottom: p.position[1] - (p.dimensions[1] / 2),
            top: p.position[1] + (p.dimensions[1] / 2)
          }

          const overlapArea = getOverlapArea(currentRect, pRect)
          // As a percentage of the CURRENT poster's area, or the OTHER poster's area (whichever is smaller)
          const minArea = Math.min(area, p.dimensions[0] * p.dimensions[1])
          const overlapPercentage = overlapArea / minArea

          if (overlapPercentage > currentMaxOverlap) {
            currentMaxOverlap = overlapPercentage
          }
        }
        
        maxOverlap = currentMaxOverlap
      }

      // Z depth layering slightly to prevent z-fighting
      const z = 0.1 + (index * 0.001)

      // Random rotation
      const rotZ = (Math.random() - 0.5) * 0.25

      loadedPosters.push({
        id: index,
        texture,
        dimensions: dimensions,
        position: [x, y, z],
        rotation: [0, 0, rotZ],
      })
      
      posters.value = [...loadedPosters]
    })
  })
})
</script>

<template>
  <TresGroup :position="[0, 0, -14.9]">
    <TresMesh v-for="poster in posters" :key="poster.id" :position="poster.position" :rotation="poster.rotation">
      <TresPlaneGeometry :args="poster.dimensions" />
      <TresMeshStandardMaterial :map="poster.texture" roughness="0.9" :side="2" />
    </TresMesh>
  </TresGroup>
</template>
