const {
  // NODE_ENV,
  // SLS_ENV,
  TENCENT_CLOUDBASE_ENVID,
  TENCENT_SECRET_KEY,
  TENCENT_SECRET_ID,
  TENCENT_APIGATEWAY_SERVICEID
} = process.env

const name = 'icebreaker99'
const functionName = name + '_Handler'
const serviceName = functionName + '_Gateway'
const layerName = functionName + '_Layer'

const config = {
  component: 'koa',
  name,
  stage: 'dev',
  inputs: {
    region: 'ap-shanghai',
    functionName,
    runtime: 'Nodejs12.16',
    serviceName,
    // serviceId
    entryFile: 'sls.js',
    src: {
      src: './src',
      bucket: 'sls-cloudfunction-ap-shanghai-code'
      // exclude,
    },
    layers: [{
      name: layerName,
      version: '2'
    }],
    functionConf: {
      timeout: 30,
      memorySize: 128,
      eip: true,
      environment: {
        variables: {
          NODE_ENV: 'production',
          // SLS_ENV,
          SLS_ENTRY_FILE: 'sls.js',
          TENCENT_CLOUDBASE_ENVID,
          TENCENT_SECRET_KEY,
          TENCENT_SECRET_ID
        }
      }
      // vpcConfig: {
      //   vpcId: '',
      //   subnetId: ''
      // }
    },
    apigatewayConf: {
      isDisabled: false,
      enableCORS: false
    }
  }
}
if (TENCENT_APIGATEWAY_SERVICEID) {
  config.inputs.serviceId = TENCENT_APIGATEWAY_SERVICEID
}

module.exports = config

// 未找到指定的Layer，请创建后再试。

// 要先创建好layer进行绑定
