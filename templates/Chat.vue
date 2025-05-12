<script setup>
import interact from 'interactjs';
import { onMounted, ref, computed, watch, nextTick } from 'vue';
import { useWindowsStore } from '@/stores/windows';
import.meta.env;
import OpenAI from 'openai';

const props = defineProps({
  windowId: String,
  nameOfWindow: String,
  content_padding_left: {
    required: false,
    type: String,
    default: '15%',
  },
  content_padding_right: {
    required: false,
    type: String,
    default: '15%',
  },
  content_padding_top: {
    required: false,
    type: String,
    default: '5%',
  },
  content_padding_bottom: {
    required: false,
    type: String,
    default: '5%',
  },
});

const windowsStore = useWindowsStore();
const window = ref({});
const ComponentName = props.nameOfWindow || 'ChatWindow';
const position = ref({ x: 0, y: 0 });
const tempPosition = ref({ x: 0, y: 0 });
const w = ref(280);
const h = ref(400);

const style = computed(() => ({
  height: `${h.value}px`,
  width: `${w.value}px`,
  transform: `translate(${position.value.x}px, ${position.value.y}px)`,
  '--content-padding-left': props.content_padding_left || '15%',
  '--content-padding-right': props.content_padding_right || '15%',
  '--content-padding-top': props.content_padding_top || '5%',
  '--content-padding-bottom': props.content_padding_bottom || '5%',
  '--fullscreen': windowsStore.getFullscreenWindowHeight,
}));

const setActiveWindow = () => {
  windowsStore.setActiveWindow(window.value.windowId);
  windowsStore.zIndexIncrement(window.value.windowId);
};

const toggleWindowSize = () => {
  if (windowsStore.getWindowFullscreen(window.value.windowId) == true) {
    const payload = {
      fullscreen: false,
      windowId: window.value.windowId,
    };
    windowsStore.setFullscreen(payload);
    position.value.x = tempPosition.value.x;
    position.value.y = tempPosition.value.y;
  } else if (windowsStore.getWindowFullscreen(window.value.windowId) == false) {
    const payload = {
      fullscreen: true,
      windowId: window.value.windowId,
    };
    windowsStore.setFullscreen(payload);
    const tempX = position.value.x;
    const tempY = position.value.y;
    tempPosition.value.x = tempX;
    tempPosition.value.y = tempY;
    position.value.x = 0;
    position.value.y = 0;
  }
};

const minimizeWindow = () => {
  const payload = {
    windowState: 'minimize',
    windowId: window.value.windowId,
  };
  windowsStore.setActiveWindow('');
  windowsStore.setWindowState(payload);
};

const closeWindow = () => {
  const payload = {
    windowState: 'close',
    windowId: window.value.windowId,
  };
  windowsStore.setWindowState(payload);
};

const getImagePath = (iconImage) => {
  const path = `../assets/win95Icons/${iconImage}`;
  const modules = import.meta.glob('../assets/win95Icons/*', { eager: true });
  const mod = modules[path];
  if (mod == undefined) {
    return '';
  } else {
    return mod.default;
  }
};

let isDragging = false;

// Chat logic
const input = ref('');
const messages = ref([]);
const threadId = ref(null);
let openai = null;

const chatMessagesRef = ref(null);

function scrollToBottom() {
  nextTick(() => {
    const el = chatMessagesRef.value;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  });
}

// Auto-scroll to bottom when messages change
watch(messages, () => {
  scrollToBottom();
});

const initializeChat = async () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const assistantId = import.meta.env.VITE_OPENAI_ASSISTANT_ID;

  if (!apiKey || !assistantId) {
    messages.value.push({ from: 'bot', text: 'OpenAI API Key or Assistant ID is missing. Chat is disabled.' });
    return;
  }

  try {
    openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    const thread = await openai.beta.threads.create();
    threadId.value = thread.id;
    messages.value.push({ from: 'bot', text: "I'm not available at the moment, my OpenAI assistant can help you know whatever you want about me." });
  } catch (e) {
    messages.value.push({ from: 'bot', text: 'Failed to initialize chat. Please try again later.' });
  }
};

onMounted(async () => {
  window.value = windowsStore.getWindowById(ComponentName);
  await initializeChat(); // Initialize chat and create thread

  const draggableWindow = interact('#' + window.value.windowId);
  draggableWindow
    .draggable({
      listeners: {
        move(event) {
          position.value.x += event.dx;
          position.value.y += event.dy;
        },
      },
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: '#screen',
          endOnly: true,
        }),
      ],
      allowFrom: '#top-bar',
    })
    .on('dragstart', () => {
      isDragging = true;
    })
    .on('dragmove', () => {
      if (isDragging) {
        setActiveWindow();
        isDragging = false;
      }
    })
    .on('dragend', () => {
      isDragging = false;
    })
    .resizable({
      edges: {
        left: true,
        right: true,
        bottom: true,
        top: false,
      },
      listeners: {
        move(event) {
          const target = event.target;
          w.value = event.rect.width;
          h.value = event.rect.height;
          target.style.width = `${w.value}px`;
          target.style.height = `${h.value}px`;
          position.value.x += event.deltaRect.left;
          position.value.y += event.deltaRect.top;
        },
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: {
            width: 300, // Match Window.vue min width
            height: 300, // Match Window.vue min height
          },
          max: {
            width: document.getElementById('screen').clientWidth - position.value.x,
            height: document.getElementById('screen').clientHeight - position.value.y,
          },
        }),
      ],
    });
});

async function getAssistantResponse(userMessage) {
  if (!openai || !threadId.value) {
    return 'Chat not initialized. Please wait or try refreshing.';
  }
  const assistantId = import.meta.env.VITE_OPENAI_ASSISTANT_ID;

  try {
    await openai.beta.threads.messages.create(threadId.value, {
      role: 'user',
      content: userMessage,
    });

    const run = await openai.beta.threads.runs.create(threadId.value, {
      assistant_id: assistantId,
    });

    let status = run.status;
    let runId = run.id;
    let retries = 0;
    const maxRetries = 30; // Approx 30 seconds timeout

    while (status !== 'completed' && status !== 'failed' && status !== 'cancelled') {
      if (retries >= maxRetries) {
        return "The assistant is taking a while to respond. Please try sending your message again.";
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      const check = await openai.beta.threads.runs.retrieve(threadId.value, runId);
      status = check.status;
      retries++;
    }

    if (status !== 'completed') {
      return 'Run did not complete. Status: ' + status;
    }

    const assistantMessages = await openai.beta.threads.messages.list(threadId.value);
    const latestAssistantMsg = assistantMessages.data
      .filter(m => m.role === 'assistant')
      .sort((a, b) => b.created_at - a.created_at)[0];
    return latestAssistantMsg?.content?.[0]?.text?.value || 'No response from assistant.';
  } catch (error) {
    return 'Error contacting assistant.';
  }
}

async function sendMessage() {
  if (input.value.trim() !== '' && threadId.value) {
    messages.value.push({ from: 'user', text: input.value });
    const userInput = input.value;
    input.value = '';
    scrollToBottom();
    // DEBUG shortcut
    if (userInput.trim().toUpperCase() === 'DEBUG') {
      messages.value.push({ from: 'bot', text: 'hello' });
      scrollToBottom();
      return;
    }
    messages.value.push({ from: 'bot', text: 'Thinking...' });
    scrollToBottom();
    const botReply = await getAssistantResponse(userInput);
    messages.value[messages.value.length - 1].text = botReply;
    messages.value = [...messages.value]; // Force watcher to trigger for auto-scroll
    scrollToBottom();
  } else if (!threadId.value) {
    messages.value.push({ from: 'bot', text: 'Chat is not ready yet, please wait a moment.'});
    scrollToBottom();
  }
}
</script>

<template>
<div :id="window.windowId" :style="style" class="window window-style chat-window" :class="{
        'fullscreen': window.fullscreen == true,
        'minimize': window.fullscreen == 'minimize',
    }"
    @click="setActiveWindow" 
    @dragstart="setActiveWindow" @click.native="setActiveWindow">
    <div id="top-bar" class="top-bar-window" :class="
        windowsStore.activeWindow == window.windowId
            ? 'top-bar'
            : 'top-bar-deactivated'
        " @dblclick="toggleWindowSize">
        <div class="window-name">
            <img class="icon-image" :src="getImagePath(window.iconImage || 'chat.png')" :alt="window.altText || 'Chat'" />{{ window.displayName || 'Chat' }}
        </div>
        <div class="triple-button">
            <button class="minimize-button button" @click="minimizeWindow">
                <span style="
                height: 2px;
                width: 6px;
                background: black;
                margin-top: 8px;
                margin-right: 2px;
            ">
                </span>
            </button>
            <button class="expand-button button" @click="toggleWindowSize">
                <span style="
                height: 8px;
                width: 9px;
                border-left: black 1px solid;
                border-right: black 1px solid;
                border-left: black 1px solid;
                border-bottom: black 1px solid;
                border-top: black 2px solid;
            ">
                </span>
            </button>
            <button class="close-button button" style="margin-right: 3px; padding-left: 1px" @click="closeWindow">
                ×
            </button>
        </div>
    </div>
    <div class="content chat-content">
      <div class="chat-messages" ref="chatMessagesRef">
        <div v-for="(msg, idx) in messages" :key="idx" :class="['chat-msg', msg.from]">
          {{ msg.text }}
        </div>
      </div>
      <form class="chat-input-bar" @submit.prevent="sendMessage">
        <input v-model="input" class="chat-input" placeholder="Type a message..." autocomplete="off" />
        <button type="submit" class="chat-send">Send</button>
      </form>
    </div>
</div>
</template>

<style scoped>
.window-style {
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  user-select: none;
  -ms-touch-action: none;
  touch-action: none;
  flex-flow: column;
  display: flex;
  max-width: 100vw !important;
  background: #ececec; /* Match window background */
  border: 2px solid #bdbdbd; /* Match window border */
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.chat-window {
  min-width: 300px;
  min-height: 300px;
  background: #f3f3f3;
  border: 2px solid #bdbdbd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}
.fullscreen {
  width: 100% !important;
  height: calc(var(--fullscreen) - 35px) !important; /* Subtract navbar height */
  margin: 0;
  transition: all 0.5s ease;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.content.chat-content {
  flex-grow: 1;
  overflow-x: hidden;
  padding-right: var(--content-padding-right);
  padding-left: var(--content-padding-left);
  padding-top: var(--content-padding-top);
  padding-bottom: var(--content-padding-bottom);
  display: flex;
  flex-direction: column;
  background: transparent; /* Remove chat's own background */
  min-height: 0;
}
.top-bar {
  background: rgb(0, 0, 124);
}
.icon-image {
  width: 15px;
  height: 15px;
  margin-right: 5px;
  margin-top: 0;
  margin-bottom: 0;
}
.top-bar-window {
  display: flex;
  width: auto;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  z-index: 10;
  margin: 2px;
  padding: 2px 2px 2px 2px;
  border-bottom: 1.5px solid #bdbdbd;
  border-radius: 6px 6px 0 0;
}
.top-bar-deactivated {
  background: rgb(123, 125, 123);
}
.top-bar:hover {
  cursor: default;
}
.window-name {
  color: white;
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 0;
  font-size: 16px;
  margin: 0 0 0 3px;
}
.minimize {
  display: none;
}
.chat-messages {
  flex: 1;
  padding: 10px 6px 6px 6px;
  overflow-y: auto;
  background: transparent;
  font-size: 14px;
  border-radius: 0 0 0 0;
  box-shadow: none;
  min-height: 0;
}
.chat-msg {
  margin-bottom: 8px;
  padding: 4px 10px;
  border-radius: 4px;
  max-width: 80%;
  word-break: break-word;
  border: 1px solid #d3d3d3;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
.chat-msg.user {
  background: #e3f0ff;
  align-self: flex-end;
  border-color: #b3d1f7;
}
.chat-msg.bot {
  background: #f7f7f7;
  align-self: flex-start;
  border-color: #e0e0e0;
}
.chat-input-bar {
  display: flex;
  border-top: 1.5px solid #bdbdbd;
  background: #f4f4f4;
  padding: 8px 8px 8px 8px;
  border-radius: 0 0 6px 6px;
  z-index: 2;
  position: relative;
}
.chat-input {
  flex: 1;
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  padding: 6px 10px;
  font-size: 14px;
  background: #fff;
}
.chat-send {
  margin-left: 8px;
  padding: 6px 16px;
  background: rgb(192, 192, 192);
  border: 1px solid #888;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
.chat-send:hover {
  background: #e0e0e0;
}
</style>