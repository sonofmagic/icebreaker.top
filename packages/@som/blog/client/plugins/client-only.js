// import Vue from 'vue'

import svg4everybody from 'svg4everybody'
import mobile from 'is-mobile'
import 'giscus'
// import Aegis from 'aegis-web-sdk'
import { LocalStorageKey } from '@/enum/user'
svg4everybody()

export default (ctx, inject) => {
  // 这里可以获得客户端的store,进行动态注册module
  // console.log(ctx)
  // Injec  t $hello(msg) in Vue, context and store.
  // inject('hello', (msg) => console.log(`Hello ${msg}!`))
  const theme = localStorage.getItem(LocalStorageKey.ThemeMode) || 'dark'

  ctx.store.commit('set_theme', theme)
  // const aegis = new Aegis({
  //   id: 'Kb5Z6VMPJxGPAozvey', // 上报 id
  //   // uin: 'xxx', // 用户唯一 ID（可选）
  //   reportApiSpeed: true, // 接口测速
  //   reportAssetSpeed: true, // 静态资源测速
  //   spa: true, // spa 应用页面跳转的时候开启 pv 计算
  // })

  const isMobile = mobile()
  console.log(`isMobile:${isMobile}`)
  ctx.store.dispatch('device/setIsMobile', isMobile)
  // inject('aegis', aegis)
}
