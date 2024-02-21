// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig:{
    public:{
       apiOrigin: process.env.NUXT_API_ORIGIN
      //apiOrigin: ""
    }
  }
})
