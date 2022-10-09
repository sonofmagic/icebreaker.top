import { createApp } from 'vue'
import '@/assets/scss/global.scss'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App)
app.use(store).use(router)
app.mount('#app')
