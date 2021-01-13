const tcb = require('@cloudbase/node-sdk')
const {
  TENCENT_CLOUDBASE_ENVID,
  TENCENT_SECRET_KEY,
  TENCENT_SECRET_ID
} = process.env
const app = tcb.init({
  secretId: TENCENT_SECRET_ID,
  secretKey: TENCENT_SECRET_KEY,
  env: TENCENT_CLOUDBASE_ENVID
})
module.exports = app
