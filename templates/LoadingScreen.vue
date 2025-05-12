<template>
  <div class="loading-overlay" :class="{ 'fade-out': fadeOut }">
    <div class="loading-window">
      <div class="loading-title-bar">
        <img src="@/assets/win95.png" class="loading-icon" />
        <span class="loading-title">Loading...</span>
      </div>
      <div class="loading-content">
        <div class="loading-bar-outer">
          <div class="loading-bar-inner" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="loading-text">Please wait</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const progress = ref(0);
const fadeOut = ref(false);
onMounted(() => {
  const start = performance.now();
  const update = () => {
    const elapsed = performance.now() - start;
    progress.value = Math.min((elapsed / 4000) * 100, 100);
    if (elapsed < 4000) {
      requestAnimationFrame(update);
    } else {
      setTimeout(() => {
        fadeOut.value = true;
      }, 400);
    }
  };
  requestAnimationFrame(update);
});
</script>

<style scoped>
@keyframes progress-stripes {
  from { background-position: 0 0; }
  to   { background-position: 40px 0; }
}

.loading-overlay {
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #bdbdbd;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1s ease; /* increased fade duration */
  opacity: 1;
}
.loading-overlay.fade-out {
  opacity: 0;
  pointer-events: none;
}
.loading-window {
  width: 320px;
  background: #c3c3c3;
  border: 2px solid #000;
  box-shadow: 4px 4px #888;
  font-family: 'MS Sans Serif', Arial, sans-serif;
}
.loading-title-bar {
  background: #00007c;
  color: #fff;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
}
.loading-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.loading-content {
  padding: 24px 20px 20px 20px;
  text-align: center;
}
.loading-bar-outer {
  width: 100%;
  height: 18px;
  background: #fff;
  border: 2px inset #888;
  margin-bottom: 16px;
  box-sizing: border-box;
}
.loading-bar-inner {
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    #0066cc 0px,
    #0066cc 10px,
    #003399 10px,
    #003399 20px
  );
  animation: progress-stripes 1s linear infinite; /* moving stripes */
  transition: width 0.5s ease; /* widen transition for smoother fill */
}
.loading-text {
  font-size: 13px;
  color: #222;
  margin-top: 8px;
  letter-spacing: 1px;
}
</style>
