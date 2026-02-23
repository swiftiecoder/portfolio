// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      title: "sherry's world",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // You can add other meta tags here
      ],
      link: [
        // You can add global link tags here, like for favicons
        { rel: 'icon', type: 'image/x-icon', href: '/sushicatfavicon.ico' }
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
    '@pinia/nuxt',
    '@tresjs/nuxt'
  ],
  vite: {
    build: {
      cssCodeSplit: false,
    },
  },
})
