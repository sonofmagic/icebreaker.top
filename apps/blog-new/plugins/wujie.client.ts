import WujieVue from "wujie-vue3";
import { bus, setupApp, preloadApp, startApp, destroyApp } from "wujie";


export default defineNuxtPlugin(nuxtApp => {
  // console.log(nuxtApp)
  nuxtApp.vueApp.use(WujieVue)

  // setupApp({ name: "aaaa", url: "http://localhost:9000/", exec: true, el: "#blog-nuxt2", sync: true })

})
