import tcb from '@cloudbase/node-sdk'
import managerNode from './manager/index.js'
// 获取执行当前云函数的环境
// const currentEnv = tcb.SYMBOL_CURRENT_ENV

const {
  TENCENT_CLOUDBASE_ENVID,
  TENCENT_SECRET_KEY,
  TENCENT_SECRET_ID,
} = process.env

export function getApp(config) {
  const {
    secretId,
    secretKey,
    env
  } = config
  return tcb.init({
    secretId,
    secretKey,
    env,
  })
}

const app = getApp({
  env: TENCENT_CLOUDBASE_ENVID,
  secretKey: TENCENT_SECRET_KEY,
  secretId: TENCENT_SECRET_ID,
})

export default app
export const auth = app.auth()
export const db = app.database()

export const manager = managerNode