// test
// prepub
// release
const fs = require('fs')
const path = require('path')
const baseInfo = {
  functionName: '',
  layerName: '',
  name: '',
  serviceName: '',
}
const { functionName, layerName, name, serviceName } = baseInfo
const rootList = fs.readdirSync('./')
const include = [
  // '.nuxt',
  // 'sls.js',
  // 'dist',
  // 'nuxt.config.js',
  // 'nuxt.config',
  // 'statistics',
  // 'content',
  // 'loadServerMiddleware',
  // 'loadServerMiddleware',
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
} = process.env

const config = {
  component: 'nuxtjs',
  name,
  stage: 'dev',
  inputs: {
    region: 'ap-shanghai',
    functionName,
    serviceName,
    runtime: 'Nodejs12.16',
    // serviceId: '',
    src: {
      src: './',
      bucket: 'sls-cloudfunction-ap-shanghai-code',
      exclude,
    },
    layers: [
      {
        name: layerName,
        version: '10',
      },
    ],
    functionConf: {
      timeout: 30,
      memorySize: 256,
      environment: {
        variables: {
          NODE_ENV,
          SLS_ENV,
          SLS_ENTRY_FILE: 'sls.js',
          TENCENT_CLOUDBASE_ENVID,
          TENCENT_SECRET_KEY,
          TENCENT_SECRET_ID,
        },
      },
    },
    apigatewayConf: {
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
