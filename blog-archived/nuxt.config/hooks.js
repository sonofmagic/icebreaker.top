import process from 'node:process'

function log(...args) {
  process.stdout.write(`${args.join(' ')}\n`)
}
export default {
  build: {
    before() {
      log('build before')
      // console.log('Before Nuxt build started')
    },
    templates() {
      log('build templates')
      // console.log('Generating .nuxt template files')
    },
    extendRoutes() {
      log('build extendRoutes')
      // console.log('Generating routes')
    },
    compile({ name }) {
      log(`${name} build compile `)
      // console.log(`Before webpack compile (compiler is a webpack Compiler instance), if universal mode, called twice with name 'client' and 'server'`)
    },
    compiled({ name, stats }) {
      log(`${name} build compiled ms:${stats.endTime - stats.startTime}`)
      // console.log('webpack build finished')
    },
    done() {
      log('build done')
      // console.log('Nuxt build finished')
    },
  },
}
