// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', 'nuxt-icon', "@nuxt/image"],
  colorMode: {
    preference: 'mytheme',
    fallback: 'light',
    dataValue: 'theme',
    classSuffix: '',
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in' // default
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in' // default
    }
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || 'http://localhost:3000',
    }
  }
})