<script setup>
import { shallowRef } from 'vue'

const CERT_LINK = 'https://www.linkedin.com/in/shaharyar-ahsan13/details/certifications/'

// Using an explicit array of positions to place them on either side of the window
// The window is at x=-14.9, z=0, width=12 (covers z -6 to 6)
const certificates = [
    { id: 0, pos: [-8.5, 1.2, 0.01] },   // Left side of window (Top)
    { id: 1, pos: [-8.5, -1.2, 0.01] },  // Left side of window (Bottom)
    { id: 2, pos: [8.5, 1.2, 0.01] },    // Right side of window (Top)
    { id: 3, pos: [8.5, -1.2, 0.01] }    // Right side of window (Bottom)
]

const openCertifications = () => {
    window.open(CERT_LINK, '_blank')
}

const hoveredIndex = shallowRef(null)
const handleHover = (i) => {
    hoveredIndex.value = i
    document.body.style.cursor = 'pointer'
}
const handleLeave = (i) => {
    if (hoveredIndex.value === i) {
        hoveredIndex.value = null
        document.body.style.cursor = 'auto'
    }
}
</script>

<template>
    <!-- Left Wall is at x=-14.9. We place at -14.8 to be slightly in front. -->
    <TresGroup :position="[-14.8, 4.0, 0]" :rotation="[0, Math.PI / 2, 0]">
        <TresGroup v-for="(cert, i) in certificates" :key="cert.id" :position="cert.pos">
            <!-- Dark Wooden Frame -->
            <TresMesh cast-shadow receive-shadow @click="openCertifications" @pointer-enter="handleHover(i)"
                @pointer-leave="handleLeave(i)">
                <TresBoxGeometry :args="[2.2, 1.7, 0.12]" />
                <TresMeshStandardMaterial color="#3e2315" roughness="0.75" />
            </TresMesh>

            <!-- Inner Gold Mat -->
            <TresMesh :position="[0, 0, 0.02]">
                <TresBoxGeometry :args="[2.0, 1.5, 0.04]" />
                <TresMeshStandardMaterial color="#c9a84c" roughness="0.5" metalness="0.3" />
            </TresMesh>

            <!-- Blank White Certificate Face -->
            <TresMesh :position="[0, 0, 0.065]" @click="openCertifications" @pointer-enter="handleHover(i)"
                @pointer-leave="handleLeave(i)">
                <TresPlaneGeometry :args="[1.8, 1.3]" />
                <TresMeshStandardMaterial color="#fdf8ef" roughness="0.85" :side="2" />
            </TresMesh>

            <!-- Glass Reflection Overlay -->
            <TresMesh :position="[0, 0, 0.07]">
                <TresPlaneGeometry :args="[1.9, 1.4]" />
                <TresMeshPhysicalMaterial color="#ffffff" :transparent="true" :opacity="0.06" :roughness="0.1"
                    :metalness="0.0" :clearcoat="1.0" />
            </TresMesh>
        </TresGroup>
    </TresGroup>
</template>
