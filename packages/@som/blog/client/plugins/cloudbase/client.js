import cloudbase, { auth, db } from '@/cloudbase/index.js'
export default async (ctx, inject) => {
  try {
    console.log(ctx)
    inject('cloudbase', cloudbase)
    inject('auth', auth)
    inject('db', db)

    auth.onLoginStateChanged((loginState) => {
      console.log('onLoginStateChanged')
      const flag = Boolean(loginState)
      ctx.store.dispatch('user/setIsLogined', flag)
    })
    auth.onLoginStateExpired(() => {
      console.log('onLoginStateExpired')
      // 此时登录状态过期，需要重新登录
    })

    auth.onAccessTokenRefreshed(() => {
      console.log('onAccessTokenRefreshed')
      // 此时短期访问令牌已经被刷新
    })

    auth.onAnonymousConverted(() => {
      console.log('onAnonymousConverted')
      // 此时匿名登录状态已经被转换
    })

    auth.onLoginTypeChanged(() => {
      console.log('onLoginTypeChanged')
      // 此时登录类型已经发生变化
    })
    const loginState = auth.hasLoginState()
    // console.log(loginState)
    const flag = Boolean(loginState)
    if (flag) {
      console.log('已登录')
      await ctx.store.dispatch('user/refresh')
    } else {
      await auth.anonymousAuthProvider().signIn()
      console.log('未登录')
    }
    ctx.store.dispatch('user/setIsLogined', flag)
  } catch (error) {
    console.log(error)
  }
}
