<script setup>
import FileWindow from './templates/FileWindow.vue'
import Window from './templates/Window.vue'
import Mail from './templates/Mail.vue'
import Navbar from './templates/Navbar.vue'
import AppGrid from './templates/AppGrid.vue'
import Bio from './views/Bio.vue'
import Resume from './views/Resume.vue'
import GuardianAngel from './views/GuardianAngel.vue'
import Chat from './templates/Chat.vue'
import ImagePreviewWindow from './templates/ImagePreviewWindow.vue'
import StartMenu from './templates/StartMenu.vue'
import AcademicCV from './views/AcademicCV.vue'
import PortalLLM from './views/PortalLLM.vue'
import MyDoctor from './views/My Doctor.vue'
import HTS from './views/HTS.vue'
import LoadingScreen from './templates/LoadingScreen.vue'
import { ref, onMounted } from 'vue';
import {
    useWindowsStore
} from './stores/windows'
const windowsStore = useWindowsStore()
const windows = windowsStore.windows

const windowComponents = [
  { name: 'window', comp: Window },
  { name: 'ImagePreviewWindow', comp: ImagePreviewWindow },
  { name: 'mail', comp: Mail },
  { name: 'chat', comp: Chat },
  { name: 'FilesWindow', comp: FileWindow }
]

const slotViews = [
  { name: 'bio', comp: Bio },
  { name: 'resume', comp: Resume },
  { name: 'academic-cv', comp: AcademicCV },
  { name: 'guardianangel', comp: GuardianAngel },
  { name: 'portal-llm', comp: PortalLLM },
  { name: 'my-doctor', comp: MyDoctor },
  { name: 'hts', comp: HTS }
]

const windowCheck = (windowId) => {
    if (windowsStore.getWindowById(windowId).windowState == "open") {
        return true
    } 
}

const deinitWindows = () => {
  if (windowsStore.activeWindow == "Menu") {
    windowsStore.setActiveWindow("")
    windowsStore.zIndexIncrement("")
  }
}

const openWindow = (windowId) => {
  const payload = {
    windowState: "open",
    windowId: windowId
  }
  windowsStore.setWindowState(payload)
}

const showLoading = ref(true);

onMounted(() => {
  let navbar = document.getElementById("navbar");
  let navbarHeight = navbar.clientHeight;

  document.getElementById("screen").style.height =
  window.innerHeight - navbarHeight + "px";

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  openWindow('BiographyWindow')
  setTimeout(() => {
    showLoading.value = false;
  }, 2000); // Show loading for 2 seconds
})

</script>

<template>
  <div id="app">
    <LoadingScreen v-if="showLoading" />
    <transition name="screen-fade" appear>
      <div class="screen" id="screen" @click="deinitWindows" v-show="!showLoading">
        <div 
          v-for="window in windows" 
          :key="window.key" 
          :aria-label="window.displayName"
        >
            <component 
              :is="windowComponents.find(comp => comp.name === window.windowComponent).comp"
              :nameOfWindow="window.windowId" 
              :content_padding_bottom="window.windowContentPadding['bottom']" 
              :content_padding_left="window.windowContentPadding['left']" 
              :content_padding_right="window.windowContentPadding['right']" 
              :content_padding_top="window.windowContentPadding['top']" 
              :id="window.windowId" 
              :style="{
                      position: window.position,
                      left: window.positionX,
                      top: window.positionY,
                    }" 
              :folderContent="window.folderContent" 
              :folderSize="window.folderSize" 
              v-if="windowCheck(window.windowId)" 
            >
            <template v-slot:content>
              <component :is="slotViews.find(comp => comp.name === window.windowContent).comp"></component>
            </template>
            </component>
          </div>
          <AppGrid />
      </div>
    </transition>
    <StartMenu
      v-if="windowsStore.activeWindow == 'Menu'"
      style="position: absolute; z-index: 9999; left: 0; bottom: 36px"
    ></StartMenu>
    <navbar style="position: absolute; bottom: 0; z-index: 9999" id="navbar" />
  </div>
</template>

<style>

@import "./assets/css/utils/normalize.css";
@import "./assets/css/windows/app.css";
@import "./assets/css/windows/window.css";
@import "./assets/css/windows/appgrid.css";

@font-face {
  font-family: "MS Sans Serif";
  src: url("@/assets/fonts/MS-Sans-Serif.ttf");
}

/*-------------------------------------------*\
    Utilities
\*-------------------------------------------*/

html {
  overflow: hidden;
}

h6 {
    margin-top: 5px !important;
}

#app {
  font-family: "MS Sans Serif";
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  flex-direction: column;
}

.screen {
  width: 100%;
  position: relative;
  z-index: 999;
}

::-webkit-scrollbar {
  width: 15px;
  background: repeating-conic-gradient(
      rgb(189, 190, 189) 0% 25%,
      rgb(255, 255, 255) 0% 50%
    )
    50% / 2px 2px;
}
::-webkit-scrollbar-thumb {
  background: rgb(189, 190, 189);
  /* box-shadow: 1.5px 1.5px black; */
  border-top: solid rgb(250, 250, 250) 1.5px;
  border-left: solid rgb(250, 250, 250) 1.5px;
  border-bottom: solid rgb(90, 90, 90) 1.5px;
  border-right: solid rgb(90, 90, 90) 1.5px;
  outline: rgb(219, 219, 219);
}

/*-------------------------------------------*\
    Fullscreen
\*-------------------------------------------*/

.fullscreen {
  left: 0 !important;
  position: relative;
  display: block;
  top: 0 !important;
  right: 0 !important;
}

/* Screen fade-in transition */
.screen-fade-enter-active, .screen-fade-leave-active {
  transition: opacity 1s ease;
}
.screen-fade-enter-from, .screen-fade-leave-to {
  opacity: 0;
}
.screen-fade-enter-to, .screen-fade-leave-from {
  opacity: 1;
}
</style>
