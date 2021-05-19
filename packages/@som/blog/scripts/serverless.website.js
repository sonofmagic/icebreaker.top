const config = {
  app: 'icebreaker-top-ssg',
  name: 'icebreaker-top-ssg-doc',
  component: 'website',
  stage: 'dev',
  inputs: {
    src: {
      src: './docs',
      index: 'index.html',
      error: 'index.html',
    },
    region: 'ap-shanghai',
    bucket: 'icebreaker-top-ssg-bucket',
    env: {},
    // https://github.com/serverless-components/tencent-website/blob/master/src/serverless.js
    // if (cdnInputs.autoRefresh) {
    //   cdnInputs.refreshCdn = {
    //     urls: [`http://${cdnInputs.domain}`, `https://${cdnInputs.domain}`]
    //   }
    // }
    hosts: [
      {
        host: 'icebreaker.top',
        async: true,
        autoRefresh: true,
      },
      {
        host: 'www.icebreaker.top',
        async: true,
        autoRefresh: true,
      },
    ],
  },
}

module.exports = config
