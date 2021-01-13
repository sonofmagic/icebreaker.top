// https://github.com/lerna/lerna/blob/main/commands/run/index.js
// lerna run 时，只会把 result.stdout 给 output

function log(...args) {
  process.stdout.write(args.join(' ') + '\n')
  // console.log(...args)
}
module.exports = {
  build: {
    before(nuxt, buildOptions) {
      log('build before')
      // console.log('Before Nuxt build started')
    },
    templates({ templatesFiles, templateVars, resolve }) {
      log('build templates')
      // console.log('Generating .nuxt template files')
    },
    extendRoutes(routes, resolve) {
      log('build extendRoutes')
      // console.log('Generating routes')
    },
    compile({ name, compiler }) {
      log(`${name} build compile `)
      // console.log(`Before webpack compile (compiler is a webpack Compiler instance), if universal mode, called twice with name 'client' and 'server'`)
    },
    compiled({ name, compiler, stats }) {
      log(`${name} build compiled ms:${stats.endTime - stats.startTime}`)
      // console.log('webpack build finished')
    },
    done(nuxt) {
      log('build done')
      // console.log('Nuxt build finished')
    },
  },
}
