// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
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
  modules:["@nuxtjs/tailwindcss",
          '@pinia/nuxt',
          '@pinia-plugin-persistedstate/nuxt',
          "nuxt-rating"          
        ],
  plugins: [
    '@/plugins/fontawesome.ts',
    '@/plugins/refreshTokenInit.client.ts',
    '@/plugins/history-state.ts',

  ]
})
