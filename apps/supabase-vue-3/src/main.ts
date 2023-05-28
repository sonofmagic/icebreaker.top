import { createApp } from 'vue'
import '@/assets/scss/global.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import '@/plugins/fortawesome'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia).use(router)
app.mount('#app')
