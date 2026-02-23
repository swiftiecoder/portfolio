<script setup>
import { ref, onMounted } from 'vue'

const updates = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/updates.json')
    if (res.ok) {
      updates.value = await res.json()
    }
  } catch (e) {
    console.error('Error fetching updates:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="noticeboard-container">
    <h1 class="font-serif text-3xl font-bold mb-6 text-gray-800">Noticeboard</h1>
    
    <div v-if="loading" class="text-gray-500 italic">
      Loading updates...
    </div>
    <div v-else-if="updates.length === 0" class="text-gray-500 italic">
      No updates posted yet.
    </div>
    
    <div v-else class="updates-list">
      <div v-for="update in updates" :key="update.id" class="update-card mb-6 p-5 border border-gray-200 rounded-md bg-white shadow-sm">
        <div class="flex justify-between items-center border-b border-gray-100 pb-2 mb-3">
          <h2 class="text-xl font-bold text-gray-800">{{ update.title }}</h2>
          <span class="text-sm text-gray-500 font-sans">{{ update.date }}</span>
        </div>
        <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ update.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.noticeboard-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.updates-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}
.font-serif { font-family: 'Georgia', serif; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.font-bold { font-weight: 700; }
.mb-6 { margin-bottom: 1.5rem; }
.text-gray-800 { color: #1f2937; }
.text-gray-700 { color: #374151; }
.text-gray-500 { color: #6b7280; }
.italic { font-style: italic; }
.p-5 { padding: 1.25rem; }
.border { border-width: 1px; }
.border-gray-200 { border-color: #e5e7eb; }
.border-gray-100 { border-color: #f3f4f6; }
.border-b { border-bottom-width: 1px; }
.pb-2 { padding-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.rounded-md { border-radius: 0.375rem; }
.bg-white { background-color: #ffffff; }
.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.flex { display: flex; }
.justify-between { justify-content: space-between; }
.items-center { align-items: center; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }
.leading-relaxed { line-height: 1.625; }
.whitespace-pre-wrap { white-space: pre-wrap; }
</style>
