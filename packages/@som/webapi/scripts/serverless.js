// https://github.com/serverless-components/tencent-scf/blob/master/docs/configure.md
const { API_GW_SECRETNAME, API_GW_SECRETIDS } = process.env
module.exports = {
  name: 'icebreaker-backend',
  app: 'restful-api',
  stage: 'dev',
  component: 'scf',
  inputs: {
    src: './dist',
    exclude: ['*.map'],
    region: 'ap-shanghai',
    runtime: 'Nodejs12.16',
    handler: 'index.handler',
    memorySize: 128,
    events: [
      {
        apigw: {
          parameters: {
            protocols: ['http', 'https'],
            environment: 'release',
            endpoints: [
              {
                netTypes: ['OUTER'],
                path: '/',
                method: 'ANY',
                enableCORS: true,
                description: '博客站后台',
                function: {
                  isIntegratedResponse: true,
                  functionQualifier: '$DEFAULT'
                }
                // auth: {
                //   secretName: API_GW_SECRETNAME,
                //   secretIds: API_GW_SECRETIDS
                // }
              }
            ]
          }
        }
      }
    ]
  }
}
