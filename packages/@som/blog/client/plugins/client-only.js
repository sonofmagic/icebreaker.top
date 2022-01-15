// import Vue from 'vue'

import svg4everybody from 'svg4everybody'
import mobile from 'is-mobile'
import Aegis from 'aegis-web-sdk'
// import { LocalStorageKey } from '@/enum/user'
// Vue.use(BaiduMap, {
//   /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
//   /* 有 refer 限制，可以自行注册 */
//   ak: 'sqI1kLIdG3RYscExAHvGP8LXTPW43vRI',
// })

// if (process.env.SENTRY_VUE_DSN) {
//   Sentry.init({
//     Vue,
//     dsn: process.env.SENTRY_VUE_DSN,
//     autoSessionTracking: true,
//     integrations: [new Integrations.BrowserTracing()],
//     tracesSampleRate: 1.0,
//   })
// }

// const mode = localStorage.getItem(LocalStorageKey.ThemeMode) || 'dark'
// document.documentElement.setAttribute(LocalStorageKey.ThemeMode, mode)
// import './echarts'
// import * as Sentry from '@sentry/vue'
// import { Integrations } from '@sentry/tracing'
// import BaiduMap from 'vue-baidu-map'

// import { isRelease } from '@@/constants'

// if (!isRelease) {
//   if (
//     /eruda=true/.test(window.location) ||
//     localStorage.getItem('active-eruda') === 'true'
//   ) {
//     const eruda = require('eruda')
//     eruda.init()
//   }
// }

svg4everybody()

export default (ctx, inject) => {
  // 这里可以获得客户端的store,进行动态注册module
  // console.log(ctx)
  // Injec  t $hello(msg) in Vue, context and store.
  // inject('hello', (msg) => console.log(`Hello ${msg}!`))

  const aegis = new Aegis({
    id: 'Kb5Z6VMPJxGPAozvey', // 上报 id
    // uin: 'xxx', // 用户唯一 ID（可选）
    reportApiSpeed: true, // 接口测速
    reportAssetSpeed: true, // 静态资源测速
    spa: true, // spa 应用页面跳转的时候开启 pv 计算
  })

  const isMobile = mobile()
  console.log(`isMobile:${isMobile}`)
  ctx.store.dispatch('device/setIsMobile', isMobile)
  inject('aegis', aegis)
}
