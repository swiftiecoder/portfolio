<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  progress: { type: Number, default: 0 },
  isReady: { type: Boolean, default: false }
})

const emit = defineEmits(['enter'])

const statusMessages = [
  'turning pages...',
  'chasing white rabbits...',
  'going through the wardrobe...',
  'following the yellow brick road...',
  'falling down rabbit holes...',
  'counting impossible things...',
  'opening chapter one...',
  'brewing some ink...'
]

const quotes = [
  {
    text: "You must be [mad], said the Cat, or you wouldn't have come here.",
    author: "Lewis Carroll, Alice in Wonderland"
  }
]

const currentQuoteIndex = ref(0)
const displayedLength = ref(0)
const showAttribution = ref(false)
const showButton = ref(false)
const isTyping = ref(true)
const currentStatusIndex = ref(0)
const quoteComplete = ref(false)
const fadeOut = ref(false)

const currentQuote = computed(() => quotes[currentQuoteIndex.value])
const currentStatus = computed(() => statusMessages[currentStatusIndex.value])
const actionLabel = computed(() => quoteComplete.value ? 'Enter' : 'Skip')

let typeTimer = null
let statusTimer = null

const CHAR_SPEED = 28

const typeNextChar = () => {
  if (displayedLength.value < currentQuote.value.text.length) {
    displayedLength.value++
    typeTimer = setTimeout(typeNextChar, CHAR_SPEED)
  } else {
    isTyping.value = false
    showAttribution.value = true

    if (!quoteComplete.value) {
      quoteComplete.value = true
      if (props.isReady) {
        triggerButtonReveal()
      }
    }
  }
}

const triggerButtonReveal = () => {
  if (showButton.value) return
  clearInterval(statusTimer)
  showButton.value = true
}

const handleEnter = () => {
  if (fadeOut.value) return
  fadeOut.value = true
  setTimeout(() => emit('enter'), 800)
}

watch(() => props.isReady, (ready) => {
  if (ready && quoteComplete.value && !showButton.value) {
    triggerButtonReveal()
  }
})

onMounted(() => {
  typeNextChar()
  statusTimer = setInterval(() => {
    currentStatusIndex.value = (currentStatusIndex.value + 1) % statusMessages.length
  }, 3200)
})

onBeforeUnmount(() => {
  clearTimeout(typeTimer)
  clearInterval(statusTimer)
})
</script>

<template>
  <div class="typewriter-page" :class="{ 'page-fade-out': fadeOut }"
    style="background-color: #fdf6e3; position: fixed; inset: 0; width: 100vw; height: 100dvh; z-index: 9999;">
    <div class="paper-grain"></div>

    <div class="typewriter-area">
      <div class="typewriter-text-block">
        <p class="typewriter-line" style="text-align: center;">
          <span class="open-quote">&ldquo;</span>
          <template v-for="(char, i) in currentQuote.text.split('')" :key="i">
            <span v-if="i < displayedLength">{{ char }}</span>
          </template>
          <span class="cursor" :class="{ typing: isTyping }">|</span>
          <span v-if="displayedLength >= currentQuote.text.length" class="close-quote">&rdquo;</span>
        </p>
        <Transition name="attr-fade">
          <p v-if="showAttribution" class="attribution" style="text-align: center;">
            &mdash; {{ currentQuote.author }}
          </p>
        </Transition>
      </div>

      <!-- Status area + skip/enter button -->
      <div class="inline-action">
        <template v-if="!showButton">
          <div class="ink-progress">
            <div class="ink-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <p class="status-text">{{ currentStatus }}</p>
          <!-- Skip button appears once page is ready -->
          <Transition name="btn-appear">
            <button v-if="isReady" class="skip-btn" @click="handleEnter">
              {{ actionLabel }}
            </button>
          </Transition>
        </template>
        <Transition name="btn-appear">
          <button v-if="showButton" class="enter-toggle" @click="handleEnter">
            Enter
          </button>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Courier+Prime&display=swap');

.typewriter-page {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  background-color: #fdf6e3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
  cursor: url('/mouse2.cur'), auto;
  pointer-events: auto;
}

.typewriter-page.page-fade-out {
  opacity: 0;
  transition: opacity 0.8s ease;
  pointer-events: none;
}

.paper-grain {
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml,%3Csvg width="200" height="200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="200" height="200" filter="url(%23n)" opacity="0.035"/%3E%3C/svg%3E');
  pointer-events: none;
  z-index: 1;
}

.typewriter-area {
  position: relative;
  z-index: 2;
  max-width: 680px;
  width: 90vw;
  padding: 0 2rem;
  transition: opacity 0.8s ease, transform 0.8s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.typewriter-area.fade-away {
  opacity: 0;
  transform: translateY(-30px);
}

.typewriter-text-block {
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.typewriter-line {
  font-family: 'IM Fell English', serif;
  font-size: 1.65rem;
  line-height: 1.75;
  color: #2a1f16;
  margin: 0;
  letter-spacing: 0.02em;
  text-align: center;
}

.open-quote,
.close-quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.4rem;
  color: #b5967a;
  line-height: 0;
  vertical-align: -0.15em;
}

.open-quote {
  margin-right: 2px;
}

.close-quote {
  margin-left: 2px;
}


.cursor {
  font-family: 'Courier Prime', monospace;
  font-weight: 300;
  color: #2a1f16;
  animation: blink 0.9s steps(2) infinite;
  margin-left: 1px;
  font-size: 1.5rem;
}

.cursor.typing {
  animation: none;
  opacity: 1;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1
  }

  50% {
    opacity: 0
  }
}

.attribution {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.1rem;
  color: #6d5c4f;
  margin: 16px 0 0 0;
  text-align: center;
  letter-spacing: 0.04em;
}

.attr-fade-enter-active {
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.attr-fade-leave-active {
  transition: opacity 0.3s ease;
}

.attr-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.attr-fade-leave-to {
  opacity: 0;
}


/* Inline action: status or enter button */
.inline-action {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-height: 50px;
}

.ink-progress {
  width: 200px;
  height: 2px;
  background: #e5ddd0;
  border-radius: 1px;
  overflow: hidden;
}

.ink-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5a2b, #2a1f16);
  border-radius: 1px;
  transition: width 0.5s ease-out;
}

.status-text {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 0.85rem;
  color: #a08b74;
  margin: 0;
  letter-spacing: 0.05em;
  animation: statusFade 3.2s ease-in-out infinite;
}

@keyframes statusFade {

  0%,
  100% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }
}

.skip-btn {
  margin-top: 8px;
  background: none;
  border: 1px solid rgba(139, 90, 43, 0.3);
  padding: 5px 16px;
  border-radius: 20px;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 0.85rem;
  color: #8b5a2b;
  cursor: url('/mouse2.cur'), pointer;
  pointer-events: auto;
  transition: all 0.3s ease;
  letter-spacing: 0.04em;
  opacity: 0.6;
}

.skip-btn:hover {
  opacity: 1;
  border-color: #8b5a2b;
  background: rgba(139, 90, 43, 0.06);
}

/* Unveil-style pill button */
.enter-toggle {
  z-index: 10;
  background: radial-gradient(circle at center, #3d3024 0%, #201811 100%);
  border: 1px solid #7a6146;
  padding: 8px 32px;
  border-radius: 40px;
  font-family: 'IM Fell English', serif;
  font-style: italic;
  font-size: 1.6rem;
  color: #e3d3bd;
  cursor: url('/mouse2.cur'), pointer;
  pointer-events: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35), inset 0 0 8px rgba(255, 255, 255, 0.05);
  transition: transform 0.15s cubic-bezier(0.25, 1, 0.5, 1),
    filter 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
  letter-spacing: 0.05em;
  will-change: transform, filter;
  animation: enter-pulse 3s ease-in-out infinite;
}

.enter-toggle:hover {
  transform: translateY(-2px) scale(1.04);
  filter: brightness(1.18) drop-shadow(0 6px 14px rgba(100, 75, 40, 0.45));
  border-color: #a38562;
  color: #fff4e6;
  animation: none;
}

.enter-toggle:active {
  transform: translateY(0) scale(0.96);
  filter: brightness(0.95);
}

@keyframes enter-pulse {

  0%,
  100% {
    filter: brightness(1);
  }

  50% {
    filter: brightness(1.08);
  }
}


@keyframes gentle-float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}

.btn-appear-enter-active {
  animation: btn-bloom 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes btn-bloom {
  0% {
    opacity: 0;
    transform: translateY(14px) scale(0.88);
    filter: blur(4px) brightness(2);
  }

  40% {
    opacity: 1;
    filter: blur(0px) brightness(1.2);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px) brightness(1);
  }
}

@media (max-width: 600px) {
  .typewriter-line {
    font-size: 1.25rem;
  }

  .typewriter-area {
    padding: 0 1rem;
  }

  .enter-toggle {
    font-size: 1.2rem;
    padding: 7px 22px;
    gap: 12px;
  }

  .enter-icon {
    font-size: 1.4rem;
  }

  .skip-btn {
    font-size: 0.8rem;
    padding: 4px 14px;
  }
}
</style>
