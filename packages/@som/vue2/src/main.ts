import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'ant-design-vue/dist/antd.css'
import '@/assets/scss/global.scss'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCompositionAPI)

new Vue({
  router,
  store,
  render: h => {
    const v = h(App)
    return v
  }
}).$mount('#app')
