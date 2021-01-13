// import express from 'express'
import sitemap from '~/serverMiddleware/sitemap/index.js'
import api from '~/serverMiddleware/router/index.js'
// import graphql from '~/serverMiddleware/graphql/index.js'
// const isRelease = process.env.SLS_ENV === 'release'
// const app = express()
const middlewares = [
  {
    handler: sitemap,
  },
  {
    path: '/api',
    handler: api,
  },
  // {
  //   path: '/graphql',
  //   handler: graphql,
  // },
]

// if (isRelease) {
//   app.use((req, res, next) => {
//     if (req.secure) {
//       return next()
//     }
//     res.redirect('https://' + req.hostname + req.url)
//   })
//   middlewares.unshift(app)
// }
export default middlewares
