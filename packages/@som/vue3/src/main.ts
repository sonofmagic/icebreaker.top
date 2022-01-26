import { createApp } from 'vue'
import App from './App.vue'
import echarts from './plugins/echarts'
import '@/assets/scss/global.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(echarts)
app.mount('#app')
