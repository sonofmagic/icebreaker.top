## history-version

借用 **connect-history-api-fallback**

把 wwwroot 打好的包 放入 webapi host

主要 host index.html

其他通通上 cdn

```js
require('./init')

const express = require('express')
const history = require('connect-history-api-fallback')

const app = express()

// app.use(require('./middlewares/require-https'))

const staticFileMiddleware = express.static('wwwroot/dist')
app.use(staticFileMiddleware)
const historyMiddleware = history({
  disableDotRule: true,
  verbose: process.env.NODE_ENV !== 'production'
})
app.use((req, res, next) => {
  if (/^\/api/.test(req.path)) {
    next()
  } else {
    historyMiddleware(req, res, next)
  }
})

app.use('/api', require('./router'))
app.use(staticFileMiddleware)

module.exports = app

```