<script setup>
import { useWindowsStore } from '@/stores/windows'
const windowsStore = useWindowsStore()
</script>

<template>
<div class="ao3-work" style="display: flex; height: 100%; flex-direction: column">
    <div class="userstuff module">
        <h3 class="landmark heading" id="work">Actions:</h3>
        <div class="ao3-actions">
            <a href="/files/shaharyar_acad_cv.pdf" class="ao3-btn" download target="_blank">
                ↓ Download PDF
            </a>
            <a href="/files/shaharyar_acad_cv.pdf" class="ao3-btn" target="_blank">
                ↗ Open in New Tab
            </a>
        </div>
    </div>
    
    <div class="frame-container" style="flex: 1; z-index: 99">
        <iframe class="pdf-frame" src="/files/shaharyar_acad_cv.pdf" title="Academic CV PDF"></iframe>
    </div>
</div>
</template>

<style scoped>
.ao3-work {
  font-family: 'Lucida Grande', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #2a2a2a;
  line-height: 1.6;
}

.module {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.heading {
  font-family: 'Georgia', serif;
  color: #990000;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.ao3-actions {
  display: flex;
  gap: 10px;
  padding-left: 1rem;
}

.ao3-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #eeeeee;
  color: #333333;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 6px 14px;
  font-family: 'Lucida Grande', sans-serif;
  font-size: 0.85rem;
  font-weight: bold;
  text-decoration: none;
  cursor: url('/mouse2.cur'), pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.ao3-btn:hover {
  background: #e0e0e0;
  color: #990000;
  border-color: #999999;
}

.frame-container {
    width: 100%;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 2px;
    background: #f5f5f5;
    padding: 4px;
}

.pdf-frame {
    width: 100%;
    height: 100%;
    border: none;
    background: white;
}
</style>
