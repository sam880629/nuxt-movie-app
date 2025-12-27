// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-10' ,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      tmdbApiKey: '',
      tmdbApiBaseUrl: '',
      tmdbImageBaseUrl: ''
    }
  }
})
