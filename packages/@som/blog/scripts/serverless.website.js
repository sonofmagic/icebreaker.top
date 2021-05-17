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
  },
}

module.exports = config
