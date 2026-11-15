<script setup>
import { shallowRef, onMounted } from 'vue'
import * as THREE from 'three'
import { createCertificateTexture } from '../utils/textureGenerator'

const CERT_LINK = 'https://www.linkedin.com/in/shaharyar-ahsan13/details/certifications/'

const certificates = [
  {
    id: 0,
    pos: [-7.8, 1.0, 0.01],
    title: 'Oracle Fusion AI Agent Studio Foundations Associate (Rel 26-2)',
    issuer: 'Oracle University',
    date: '2026',
    code: 'ORA-AI-26'
  },
  {
    id: 1,
    pos: [-7.8, -1.0, 0.01],
    title: 'Meta Front-End Developer Specialization',
    issuer: 'Meta · Coursera',
    date: 'Specialization',
    code: 'META-FE'
  },
  {
    id: 2,
    pos: [7.8, 1.0, 0.01],
    title: 'Google Project Management Specialization',
    issuer: 'Google · Coursera',
    date: 'Specialization',
    code: 'GOOG-PM'
  },
  {
    id: 3,
    pos: [7.8, -1.0, 0.01],
    title: 'AWS Cloud Technical Essentials',
    issuer: 'Amazon Web Services',
    date: 'Verified Certificate',
    code: 'AWS-CTE'
  }
]

const certTextures = shallowRef([])

onMounted(() => {
  certTextures.value = certificates.map((cert) =>
    createCertificateTexture(THREE, {
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      id: cert.code
    })
  )
})

const openCertifications = () => {
  window.open(CERT_LINK, '_blank', 'noopener,noreferrer')
}

const handleHover = () => {
  document.body.style.cursor = 'pointer'
}
const handleLeave = () => {
  document.body.style.cursor = ''
}
</script>

<template>
  <!-- Left Wall is at x=-14.9. Centered lower around window at y = 3.0 -->
  <TresGroup :position="[-14.8, 3.0, 0]" :rotation="[0, Math.PI / 2, 0]">
    <TresGroup v-for="(cert, i) in certificates" :key="cert.id" :position="cert.pos">
      <!-- Dark Wooden Frame -->
      <TresMesh
        cast-shadow
        receive-shadow
        @click.stop="openCertifications"
        @pointer-enter="handleHover(i)"
        @pointer-leave="handleLeave(i)"
      >
        <TresBoxGeometry :args="[2.2, 1.7, 0.10]" />
        <TresMeshStandardMaterial
          color="#3e2315"
          roughness="0.75"
        />
      </TresMesh>

      <!-- Visible Gold Inner Mat (sits cleanly in front of frame front z=0.05) -->
      <TresMesh :position="[0, 0, 0.055]">
        <TresBoxGeometry :args="[2.0, 1.5, 0.015]" />
        <TresMeshStandardMaterial
          color="#c9a84c"
          roughness="0.45"
          metalness="0.35"
        />
      </TresMesh>

      <!-- Inscribed Parchment Certificate Face -->
      <TresMesh
        v-if="certTextures[i]"
        :position="[0, 0, 0.068]"
        @click.stop="openCertifications"
        @pointer-enter="handleHover(i)"
        @pointer-leave="handleLeave(i)"
      >
        <TresPlaneGeometry :args="[1.75, 1.25]" />
        <TresMeshStandardMaterial :map="certTextures[i]" roughness="0.85" :side="2" />
      </TresMesh>

      <!-- Glass Reflection Overlay -->
      <TresMesh :position="[0, 0, 0.072]">
        <TresPlaneGeometry :args="[1.85, 1.35]" />
        <TresMeshPhysicalMaterial
          color="#ffffff"
          :transparent="true"
          :opacity="0.06"
          :roughness="0.1"
          :metalness="0.0"
          :clearcoat="1.0"
        />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
