const esbuild = require('esbuild')
const config = require('./esbuild.config.js')
;(async () => {
  await esbuild.build({
    ...config,
    entryPoints: ['./src/listener.js'],
    outfile: '.dev/index.js'
  })
  // const server = await esbuild.serve({ servedir: './' }, {
  //   ...config,
  //   entryPoints: ['./src/listener.js'],
  //   outfile: '.dev/index.js'
  // })
  // console.log(server.host, server.port)
})()
