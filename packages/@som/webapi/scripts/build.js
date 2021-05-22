const esbuild = require('esbuild')
const config = require('./esbuild.config.js')
;(async () => {
  await esbuild.build({
    ...config,
    entryPoints: ['./src/handler.js'],
    outfile: 'dist/index.js'
  })
})()
