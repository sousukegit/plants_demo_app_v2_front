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
       apiOrigin: process.env.NUXT_API_ORIGIN,
       googleMapsApiKey:process.env.NUXT_GOOGLE_MAPS_API_KEY
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

  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => /^(swiper|swiper-slide|swiper-container)$/.test(tag),
    },
  },

})
