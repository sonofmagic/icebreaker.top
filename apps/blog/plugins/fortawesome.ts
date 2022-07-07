import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
export default defineNuxtPlugin((nuxtApp) => {
  library.add(faSun, faMoon)
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
