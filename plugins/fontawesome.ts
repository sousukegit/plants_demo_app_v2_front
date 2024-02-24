import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//以下は個別にアイコンを指定してimportする方法。こちらのほうが軽量で済む。
//{}には使いたいアイコン名を書く
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import {  fas } from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {

  config.autoAddCss = false
  //↓自分が使いたいライブラリ（solidやbrands）をインポートする
  library.add(fas)  

  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})