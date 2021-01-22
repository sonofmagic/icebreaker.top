import path from 'path'
import dotenv from 'dotenv'
import { loadNuxt, build } from 'nuxt'
import express from 'express'
// import * as Sentry from '@sentry/node'
// import * as Tracing from '@sentry/tracing'
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
})
const app = express()
const isDev = process.env.NODE_ENV !== 'production'

// Sentry.init({
//   dsn: process.env.SENTRY_NUXT_DSN,
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Tracing.Integrations.Express({
//       // to trace all requests to the default router
//       app,
//       // alternatively, you can specify the routes you want to trace:
//       // router: someRouter,
//     }),
//   ],
//   tracesSampleRate: 1.0,
// })
// // if (process.env.SENTRY_NUXT_DSN) {
// //   Sentry.init({ dsn: process.env.SENTRY_NUXT_DSN })
// // }
// app.use(Sentry.Handlers.requestHandler())
// app.use(Sentry.Handlers.tracingHandler())
// const noReportRoutes = ['/_nuxt', '/static', '/favicon.ico']
// https://github.com/nuxt/content/issues/136
async function createServer() {
  // We get Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')
  // await init()
  // Render every route with Nuxt.js
  // nuxt.render.use(function (err, req, res, next) {
  //   console.error(err.stack)
  //   // res.status(500).send('Something broke!')
  // })
  app.use(nuxt.render)

  // app.use(function (err, req, res, next) {
  //   console.error(err.stack)
  //   res.status(500).send('Something broke!')
  // })
  // app.all('*', (req, res, next) => {
  //   noReportRoutes.forEach((route) => {
  //     if (req.path.indexOf(route) === 0) {
  //       req.__SLS_NO_REPORT__ = true
  //     }
  //   })
  //   return nuxt.render(req, res, next)
  // })
  // Build only in dev mode with hot-reloading
  if (isDev) {
    build(nuxt)
  }
  app.binaryTypes = ['*/*']
  // app.use(Sentry.Handlers.errorHandler())

  return app
}

export default createServer
