const Router = require('@koa/router')
const {
  mountedPath
} = require('../util')
const {
  promises: fsp
} = require('fs')
const path = require('path')
const router = new Router()

// const API = require('./api')

router.get('/dir', async (ctx, next) => {
  const files = await fsp.readdir(mountedPath)
  const tree = await files.reduce(async (acc, cur) => {
    const arr = await acc
    const stat = await fsp.stat(path.join(mountedPath, cur))
    if (stat.isDirectory()) {
      arr.push({
        filename: cur,
        type: 'd'
      })
    } else if (stat.isFile()) {
      arr.push({
        filename: cur,
        type: 'f'
      })
    } else {
      arr.push({
        filename: cur,
        type: 'u' // nknown
      })
    }
    return arr
  }, [])
  ctx.body = tree
})

module.exports = router
