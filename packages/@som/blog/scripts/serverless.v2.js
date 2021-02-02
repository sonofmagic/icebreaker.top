// test
// prepub
// release
const fs = require('fs')
const path = require('path')
const { functionName, layerName, name, serviceName } = require('./base.js')
const rootList = fs.readdirSync('./')
const include = [
  '.nuxt',
  'sls.js',
  'dist',
  'nuxt.config.js',
  'nuxt.config',
  'statistics',
  'content',
  'serverMiddleware',
  'loadServerMiddleware',
]
const exclude = rootList.reduce((acc, cur) => {
  if (!include.includes(cur)) {
    acc.push(cur)
  }
  return acc
}, [])

const {
  NODE_ENV,
  SLS_ENV,
  TENCENT_CLOUDBASE_ENVID,
  TENCENT_SECRET_KEY,
  TENCENT_SECRET_ID,
  TENCENT_APIGATEWAY_SERVICEID,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} = process.env
// https://github.com/serverless-components/tencent-nuxtjs/blob/master/docs/configure.md
const config = {
  component: 'nuxtjs',
  name,
  stage: 'dev',
  inputs: {
    region: 'ap-shanghai',
    functionName,
    serviceName,
    runtime: 'Nodejs12.16',
    // serviceId为空时会主动去申请api网关
    serviceId: TENCENT_APIGATEWAY_SERVICEID,
    src: {
      src: './',
      bucket: 'sls-cloudfunction-ap-shanghai-code',
      exclude,
    },
    layers: [
      {
        name: layerName,
        version: 18,
      },
    ],
    functionConf: {
      timeout: 30,
      memorySize: 1024,
      environment: {
        variables: {
          NODE_ENV,
          SLS_ENV,
          SLS_ENTRY_FILE: 'sls.js',
          TENCENT_CLOUDBASE_ENVID,
          TENCENT_SECRET_KEY,
          TENCENT_SECRET_ID,
          GITHUB_CLIENT_ID,
          GITHUB_CLIENT_SECRET,
        },
      },
    },
    apigatewayConf: {
      isDisabled: true, // 是否禁用自动创建 API 网关功能
      protocols: ['http', 'https'],
      environment: 'release',
    },
  },
}

const customDomainsPath = path.resolve(__dirname, 'customDomains.js')
if (fs.existsSync(customDomainsPath)) {
  const customDomains = require('./customDomains.js')
  config.inputs.apigatewayConf.customDomains = customDomains
}
module.exports = config
