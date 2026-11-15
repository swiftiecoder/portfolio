// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  app: {
    head: {
      title: "shaharyar ahsan",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // You can add other meta tags here
      ],
      link: [
        // You can add global link tags here, like for favicons
        { rel: 'icon', type: 'image/x-icon', href: '/sushicatfavicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&family=VT323&display=swap'
        }
      ]
    }
  },
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@tresjs/nuxt'
  ],
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
})
