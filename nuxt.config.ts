// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/vue-fontawesome",
    ],
  },
  runtimeConfig:{
    public:{
       apiOrigin: process.env.NUXT_API_ORIGIN
      //apiOrigin: ""
    }
  },
  typescript:{
    strict:true,
  },
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  modules:["@nuxtjs/tailwindcss",'@pinia/nuxt'],
  plugins: [
    '@/plugins/fontawesome.ts'
  ]
})
