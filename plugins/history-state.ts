import HistoryStatePlugin from 'vue-history-state'

export default defineNuxtPlugin(app => {
  app.vueApp.use(HistoryStatePlugin, {
    /* options */
  })
})