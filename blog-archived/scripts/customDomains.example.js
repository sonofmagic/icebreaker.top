// https://github.com/serverless-components/tencent-express/blob/master/docs/configure.md
module.exports = [
  {
    domain: 'xxx.xxx.xxx',
    certificateId: 'xxxxxxxx',
    isDefaultMapping: false,
    pathMappingSet: [
      {
        path: '/',
        environment: 'release',
      },
    ],
  },
]
