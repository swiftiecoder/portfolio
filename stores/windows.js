import { defineStore } from "pinia";

export const useWindowsStore = defineStore("windows", {
  state: () => ({
    // Height of Fullscreen Window
    // fullscreenWindowHeight: window.innerHeight + "px",

    activeWindow: "",

    // Active Windows Array State
    activeWindows: [],

    // Z-index State
    zIndex: 2,

    windows: [
      {
        windowId: "BiographyWindow", // Unique ID
        windowState: "close", // Window State [open, close, minimize]
        displayName: "Biography", // Display Name (title under icon)
        windowComponent: "window", // Window Component (can be changed to use modified windows)
        windowContent: "bio", // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        }, // Window Content Padding
        position: "absolute", // Window Position
        positionX: "calc(50vw - 200px)", // Window Position X (when first opened)
        positionY: "calc(50vh - 250px)", // Window Position Y (when first opened)
        iconImage: "bio.png", // Window Icon Image
        altText: "Biography", // Window Icon Alt Text
        fullscreen: false, // Window Fullscreen State [true, false]
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "ResumeWindow", // Unique ID
        windowState: "close", // Window State [open, close, minimize]
        displayName: "Résumé", // Display Name (title under icon)
        windowComponent: "window", // Window Component (can be changed to use modified windows)
        windowContent: "resume", // Window Content (used under slots)
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        }, // Window Content Padding
        position: "absolute", // Window Position
        positionX: "10vw", // Window Position X (when first opened)
        positionY: "5vh", // Window Position Y (when first opened)
        iconImage: "resume.png", // Window Icon Image
        altText: "Résumé", // Window Icon Alt Text
        fullscreen: false, // Window Fullscreen State [true, false]
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "CVWindow", // Unique ID
        windowState: "close", // Window State [open, close, minimize]
        displayName: "Academic CV", // Display Name (title under icon)
        windowComponent: "window", // Window Component (can be changed to use modified windows)
        windowContent: "academic-cv", // Window Content (used under slots)
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        }, // Window Content Padding
        position: "absolute", // Window Position
        positionX: "13vw", // Window Position X (when first opened)
        positionY: "9vh", // Window Position Y (when first opened)
        iconImage: "resume.png", // Window Icon Image
        altText: "Academic CV", // Window Icon Alt Text
        fullscreen: false, // Window Fullscreen State [true, false]
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "ImagePreviewWindow",
        windowState: "close",
        displayName: "Media Viewer",
        windowComponent: "ImagePreviewWindow",
        windowContent: "",
        windowContentPadding: {
          top: "1px",
          right: "10px",
          bottom: "10px",
          left: "10px",
        },
        position: "absolute",
        positionX: "6vw",
        positionY: "12vh",
        iconImage: "file.png",
        altText: "Photos",
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: false,
        // imagePreview: file.src
      },
      {
        windowId: "GUARDIANANGELWindow",
        windowState: "close",
        displayName: "Guardian Angel",
        windowComponent: "window",
        windowContent: "guardianangel",
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        position: "absolute",
        positionX: "6vw",
        positionY: "12vh",
        iconImage: "guardian.png",
        altText: "Guardian Angel Project",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "AppleWWDC2021",
        windowState: "close",
        displayName: "WWDC 2021",
        windowComponent: "window",
        windowContent: "wwdc2021",
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        position: "absolute",
        positionX: "4vw",
        positionY: "12vh",
        iconImage: "apple.png",
        altText: "Apple WWDC 2021",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "AppleWWDC2022",
        windowState: "close",
        displayName: "WWDC 2022",
        windowComponent: "window",
        windowContent: "wwdc2022",
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        position: "absolute",
        positionX: "4vw",
        positionY: "12vh",
        iconImage: "apple2.png",
        altText: "Apple WWDC 2022",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "AppleWWDC2023",
        windowState: "close",
        displayName: "WWDC 2023",
        windowComponent: "window",
        windowContent: "wwdc2023",
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        position: "absolute",
        positionX: "4vw",
        positionY: "12vh",
        iconImage: "apple3.png",
        altText: "Apple WWDC 2023",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "MailWindow",
        windowState: "close",
        displayName: "Mail",
        windowComponent: "mail",
        windowContent: "",
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
        position: "absolute",
        positionX: "6vw",
        positionY: "12vh",
        iconImage: "mail.png",
        altText: "Mail",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "ChatWindow",
        windowState: "close",
        displayName: "Chat",
        windowComponent: "chat",
        windowContent: "",
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
        position: "absolute",
        positionX: "8vw",
        positionY: "12vh",
        iconImage: "chat.png",
        altText: "Chat",
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: true,
      },
    ],
  }),

  getters: {
    getFullscreenWindowHeight() {
      let height = "0px";
      if (typeof window !== "undefined") {
        height = window.innerHeight + "px";
      }
      return height;
    },
  },

  actions: {
    getWindowById(windowId) {
      return this.windows.find((window) => window.windowId === windowId);
    },

    getWindowFullscreen(windowId) {
      return this.windows.find((window) => window.windowId === windowId)
        .fullscreen;
    },

    getActiveWindow() {
      return this.activeWindow;
    },

    setActiveWindow(windowId) {
      this.activeWindow = windowId;
    },

    setFullscreen(payload) {
      const getArrItem = () => {
        return this.windows.find(
          (windows) => windows.windowId === payload.windowId
        );
      };
      const window = getArrItem();
      window.fullscreen = payload.fullscreen;
    },

    zIndexIncrement(windowId) {
      this.zIndex++;
      if (document.getElementById(windowId)) {
        document.getElementById(windowId).style.zIndex = this.zIndex;
      }
    },

    // Push Active Window
    pushActiveWindow(window) {
      this.activeWindows.push(window);
    },

    // Pop Active Window
    popActiveWindow(window) {
      const windowIndex = this.activeWindows.indexOf(window);
      if (windowIndex !== -1) {
        this.activeWindows.splice(windowIndex, 1);
      }
    },

    pushNewWindow(window) {
      this.windows.push(window);
    },

    setPhotoFolderContent(payload) {
      this.photoFolderContent = payload;
    },

    setWindowState(payload) {
      // payload = {'windowState': 'open', 'windowId': 'WindowOne'}

      const getArrItem = () => {
        return this.windows.find(
          (windows) => windows.windowId === payload.windowId
        );
      };

      const window = getArrItem();

      let preventAppendingOpenWindow = false;
      if (window.windowState == "open" || window.windowState == "minimize") {
        preventAppendingOpenWindow = true;
      }

      if (payload.windowState == "open") {
        window.windowState = payload.windowState;
        setTimeout(() => {
          this.zIndexIncrement(payload.windowId);
        }, 0);
        setTimeout(() => {
          this.setActiveWindow(payload.windowId);
        }, 0);
        if (preventAppendingOpenWindow == false) {
          this.pushActiveWindow(window);
        }
      } else if (payload.windowState == "close") {
        setTimeout(() => {
          window.windowState = payload.windowState;
        }, 0);
        setTimeout(() => {
          this.popActiveWindow(window);
        }, 0);
        setTimeout(() => {
          this.setActiveWindow("nil");
        }, 0);
      } else if (payload.windowState == "minimize") {
        setTimeout(() => {
          window.windowState = payload.windowState;
        }, 0);
        setTimeout(() => {
          this.setActiveWindow("nil");
        }, 0);
      } else {
        console.log("Error: windowState not found or invalid");
      }
    },
  },
});
