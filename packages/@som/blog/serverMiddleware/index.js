const api = require('./router')
const middlewares = [
  {
    path: '/api',
    handler: api,
  },
]
module.exports = middlewares
