import mobile from 'is-mobile'
import svg4everybody from 'svg4everybody'
import { LocalStorageKey } from '@/enum/user'

svg4everybody()

export default (ctx) => {
  // 这里可以获得客户端的store,进行动态注册module
  // console.log(ctx)
  // Injec  t $hello(msg) in Vue, context and store.
  // inject('hello', (msg) => console.log(`Hello ${msg}!`))
  const theme = localStorage.getItem(LocalStorageKey.ThemeMode) || 'dark'

  ctx.store.commit('set_theme', theme)

  const isMobile = mobile()
  console.log(`isMobile:${isMobile}`)
  ctx.store.dispatch('device/setIsMobile', isMobile)
  // inject('aegis', aegis)
}

const baseUrls = ['fastly.jsdelivr.net', 'gcore.jsdelivr.net', 'cdn.jsdelivr.net']

const offsetWeakMap = new WeakMap()

window.addEventListener(
  'error',
  (event) => {
    const dom = event.target
    if (!/img/i.test(dom.nodeName)) {
      return
    }
    const src = dom.src
    const isJsdelivr = /jsdelivr\.net/.test(src)
    if (isJsdelivr) {
      let offset = offsetWeakMap.get(dom) ?? 0
      if (offset < baseUrls.length) {
        const url = new URL(src)
        for (let i = offset; i < baseUrls.length; i++) {
          const baseUrl = baseUrls[i]
          if (url.hostname === baseUrl) {
            continue
          }
          url.hostname = baseUrl
          offset++
          dom.src = url
          offsetWeakMap.set(dom, offset)
          break
        }
      }
    }
  },
  true,
)
