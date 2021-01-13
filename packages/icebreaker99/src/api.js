// const { promises: fsp } = require('fs')
const { appid, appSecret } = require('./wechatConfig')
const API = require('co-wechat-api')
const cache = require('./cache')
module.exports = new API(
  appid,
  appSecret,
  () => {
    return cache.getKey('token')
  },
  async (token) => {
    const expireTime = token.expireTime
    cache.setKey('token', {
      entity: token,
      expired: expireTime
    })
    cache.save()
  }
)
