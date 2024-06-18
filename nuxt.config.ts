// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
})
