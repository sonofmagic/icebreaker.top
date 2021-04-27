const path = require('path')
const fs = require('fs')
const {
  TENCENT_APIGATEWAY_SERVICEID,
  TENCENT_APIGATEWAY_SERVICENAME
} = process.env

const config = {
  app: 'cms-wordpress-app',
  component: 'wordpress',
  name: 'cms-wordpress',
  stage: 'dev',
  inputs: {
    region: 'ap-shanghai',
    zone: 'ap-shanghai-2',
    src: {
      // src: './wordpress',
      exclude: ['.env', 'node_modules', 'scripts', 'yarn.lock']
    },
    // faas: {

    // },
    apigw: {
      id: TENCENT_APIGATEWAY_SERVICEID,
      name: TENCENT_APIGATEWAY_SERVICENAME

    }
  }
  // app:'cms-'
}
const customDomainsPath = path.resolve(__dirname, 'customDomains.js')
if (fs.existsSync(customDomainsPath)) {
  const customDomains = require('./customDomains.js')
  config.inputs.apigw.customDomains = customDomains
}
module.exports = config
