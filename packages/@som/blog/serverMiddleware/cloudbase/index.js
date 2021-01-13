const tcb = require('@cloudbase/node-sdk')

const {
  TENCENT_CLOUDBASE_ENVID,
  TENCENT_SECRET_KEY,
  TENCENT_SECRET_ID,
} = process.env

function getApp(config) {
  const { secretId, secretKey, env } = config
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

module.exports = {
  app,
  auth: app.auth(),
  db: app.database(),
}
