require('dotenv').config()
const path = require('path')
const {
  deployTencentLayer,
  overrideLayerVersion,
} = require('serverless-layer-deployer')
const ymlOpt = require('./serverless.layer.js')
// serverless deploy --target=./layer
;(async () => {
  const { version } = await deployTencentLayer(ymlOpt, {
    option: {
      innerPath: 'node_modules',
    },
  })
  const serverlessConfigPath = path.resolve(__dirname, 'serverless.v2.js')
  await overrideLayerVersion(version, serverlessConfigPath)
})()
