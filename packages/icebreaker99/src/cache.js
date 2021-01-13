const flatCache = require('flat-cache')
const key = 'access_token'
const path = require('path')
const { mountedPath } = require('./util')
const cache = flatCache.load(key, path.resolve(mountedPath))

function expiredCompare (value) {
  if (value.expired) {
    if (Date.now() > value.expired) {
      return null // 重新获取
    } else {
      return value.entity
    }
  } else {
    return value
  }
}

const oldGetKey = cache.getKey
cache.getKey = function newGetKey (key) {
  try {
    const value = oldGetKey.call(cache, key)
    return expiredCompare(value)
  } catch (error) {
    cache.removeKey(key)
    cache.save()
  }
}

module.exports = cache
