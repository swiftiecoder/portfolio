<script setup>
import { shallowRef, onMounted, onBeforeUnmount } from 'vue'
import { Html } from '@tresjs/cientos'

const props = defineProps({
  position: { type: Array, default: () => [0, 0, 0] }
})

const recordRef = shallowRef()
const isPlaying = shallowRef(false)

let animationFrameId
const loop = () => {
  if (isPlaying.value && recordRef.value) {
    recordRef.value.rotation.y += 0.02
  }
  animationFrameId = requestAnimationFrame(loop)
}

onMounted(() => {
  loop()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
})

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

// Mock Spotify Data
const currentSong = {
  title: "Supernova",
  artist: "aespa",
  albumUrl: "https://i.scdn.co/image/ab67616d0000b273b5bd02816f1a8afb1b0cb53f" // dummy aesthetic url
}
</script>

<template>
  <TresGroup :position="position">
    <!-- Body -->
    <TresMesh :position="[0, 0.1, 0]" cast-shadow receive-shadow>
      <TresBoxGeometry :args="[1.8, 0.2, 1.4]" />
      <TresMeshStandardMaterial color="#2D211F" roughness="0.7" />
    </TresMesh>
    
    <!-- Turntable Platter -->
    <TresMesh :position="[-0.2, 0.22, 0]" cast-shadow receive-shadow>
      <TresCylinderGeometry :args="[0.6, 0.6, 0.05, 32]" />
      <TresMeshStandardMaterial color="#555555" metalness="0.5" roughness="0.3" />
    </TresMesh>
    
    <!-- Record / Vinyl -->
    <TresMesh 
      ref="recordRef" 
      :position="[-0.2, 0.25, 0]" 
      @click="togglePlay"
      cast-shadow
    >
      <TresCylinderGeometry :args="[0.55, 0.55, 0.02, 32]" />
      <TresMeshStandardMaterial color="#0A0A0A" roughness="0.2" />
      
      <!-- Record Center Label -->
      <TresMesh :position="[0, 0.02, 0]">
        <TresCylinderGeometry :args="[0.18, 0.18, 0.01, 16]" />
        <TresMeshStandardMaterial color="#1DB954" />
      </TresMesh>
    </TresMesh>

    <!-- Tonearm -->
    <TresGroup :position="[0.6, 0.3, -0.4]" :rotation="[0, isPlaying ? 0.3 : 0, 0]">
      <TresMesh :position="[0, 0, 0]" cast-shadow>
        <TresCylinderGeometry :args="[0.08, 0.08, 0.1, 16]" />
        <TresMeshStandardMaterial color="#C0C0C0" metalness="0.8" />
      </TresMesh>
      <TresMesh :position="[-0.1, 0.05, 0.2]" :rotation="[1.57, 0.2, 0]" cast-shadow>
        <TresCylinderGeometry :args="[0.02, 0.02, 0.5, 8]" />
        <TresMeshStandardMaterial color="#E5E7EB" metalness="0.8" />
      </TresMesh>
    </TresGroup>

    <!-- Floating Spotify UI (Commented out per user request)
    <Html transform :position="[0, 1.0, 0]" center wrapper-class="spotify-float">
      <div class="spotify-card" :class="{ 'playing': isPlaying }">
        <div class="now-playing-header">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1DB954" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.195c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.859zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/></svg>
           <span>Now Playing</span>
        </div>
        <div class="song-info">
          <div>
            <strong>{{ currentSong.title }}</strong>
            <small>{{ currentSong.artist }}</small>
          </div>
          <div class="equalizer" v-if="isPlaying">
            <span class="bar"></span><span class="bar"></span><span class="bar"></span>
          </div>
        </div>
      </div>
    </Html>
    -->
    
  </TresGroup>
</template>

<style scoped>
:deep(.spotify-float) {
  pointer-events: none;
}
.spotify-card {
  background: rgba(18, 18, 18, 0.85);
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.05);
  font-family: system-ui, -apple-system, sans-serif;
  width: 220px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  transition: transform 0.3s;
  opacity: 0.7;
}
.spotify-card.playing {
  opacity: 1;
  transform: scale(1.05);
  border: 1px solid rgba(29, 185, 84, 0.3);
}
.now-playing-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  color: #1DB954;
  font-weight: 600;
}
.song-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.song-info strong {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 2px;
}
.song-info small {
  color: #b3b3b3;
  font-size: 0.9rem;
}
.equalizer {
  display: flex;
  gap: 2px;
  height: 12px;
  align-items: flex-end;
}
.equalizer .bar {
  width: 3px;
  background: #1DB954;
  animation: eq 1s infinite;
}
.equalizer .bar:nth-child(1) { animation-duration: 0.7s; }
.equalizer .bar:nth-child(2) { animation-duration: 0.5s; }
.equalizer .bar:nth-child(3) { animation-duration: 0.9s; }
@keyframes eq {
  0%, 100% { height: 4px; }
  50% { height: 12px; }
}
</style>
