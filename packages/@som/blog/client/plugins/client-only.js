import Vue from 'vue'

import svg4everybody from 'svg4everybody'

import BaiduMap from 'vue-baidu-map'
svg4everybody()
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  /* 有 refer 限制，可以自行注册 */
  ak: 'sqI1kLIdG3RYscExAHvGP8LXTPW43vRI',
})

export default (ctx, inject) => {
  // 这里可以获得客户端的store,进行动态注册module
  // console.log(ctx)
  // Injec  t $hello(msg) in Vue, context and store.
  // inject('hello', (msg) => console.log(`Hello ${msg}!`))
}
