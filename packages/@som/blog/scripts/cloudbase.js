const path = require('path')
require('dotenv').config({
  path: path.resolve(process.cwd(), '.env'),
})
const dayjs = require('dayjs')
const CloudBase = require('@cloudbase/manager-node')

// const isProd = process.env.NODE_ENV === 'production'

const {
  SLS_ENV,
  TENCENT_CLOUDBASE_ENVID,
  TENCENT_SECRET_KEY,
  TENCENT_SECRET_ID,
} = process.env
const app = CloudBase.init({
  secretId: TENCENT_SECRET_ID,
  secretKey: TENCENT_SECRET_KEY,
  // token: 'Your SecretToken', // 使用临时凭证需要此字段
  envId: TENCENT_CLOUDBASE_ENVID, // 云环境 ID，可在腾讯云-云开发控制台获取
})

async function main() {
  const cloudPath = `www/${SLS_ENV}/${dayjs().format('YYYYMMDD')}`
  await Promise.all([
    app.hosting.uploadFiles({
      localPath: './.nuxt/dist/client',
      cloudPath,
      // ignore: []
    }),
    app.hosting.uploadFiles({
      localPath: './client/static',
      cloudPath,
      // ignore: []
    }),
  ])
}
main().then(() => {
  console.log('success at ' + dayjs().format('YYYY-MM-DD HH:mm:ss'))
})
