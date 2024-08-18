const { layerName } = require('./base.js')
const config = {
  // component: 'layer',
  name: layerName,
  stage: 'dev',
  inputs: {
    name: layerName,
    region: 'ap-shanghai',
    // src: {
    //   // layer必须这样搞，不然会找不到vue出现error
    //   // "Cannot find module 'vue' from '/opt/@nuxt/vue-renderer/dist'",
    //   src: '../node_modules',
    //   targetDir: '/node_modules',
    // },
    // {
    //   src: '../node_modules',
    //   bucket: 'sls-cloudfunction-ap-shanghai-layer-1257725330',
    // },
    // 'Nodejs10.15',
    // runtimes: ['Nodejs12.16'],
    description: 'auto deploy by serverless-layer-deployer',
  },
}

module.exports = config
