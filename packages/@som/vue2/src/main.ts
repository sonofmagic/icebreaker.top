import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => {
    const v = h(App)
    return v
  }
}).$mount('#app')
