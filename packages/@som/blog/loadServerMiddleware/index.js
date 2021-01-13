// import serverMiddlewares from '~/serverMiddleware/index.js'

// export default function loadServerMiddleware(moduleOptions) {
//   // Add middleware only with `nuxt dev` or `nuxt start`
//   if (this.options.dev || this.options._start) {
//     serverMiddlewares.forEach((x) => {
//       this.addServerMiddleware(x)
//     })
//   }
// }
const serverMiddlewares = require('../serverMiddleware')

module.exports = function loadServerMiddleware(moduleOptions) {
  if (this.options.dev || this.options._start) {
    serverMiddlewares.forEach((x) => {
      this.addServerMiddleware(x)
    })
  }
}
