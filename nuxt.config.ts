// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head: {
      title: "BotaniSpot",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" }, // これを追記する
      ],
    },
  },
  imports: {
    dirs: ['composables/**'],
  },
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
       googleMapsApiKey:process.env.NUXT_GOOGLE_MAPS_API_KEY,
       gestUserName:process.env.NUXT_GEST_USER_NAME,
       gestUserPassword:process.env.NUXT_GEST_USER_PASSWORD
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
