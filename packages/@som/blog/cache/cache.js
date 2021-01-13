// 组件缓存思路
// link: https://ssr.vuejs.org/api/#cache
// 类似实现 https://github.com/nuxt-community/component-cache-module
// 思路也很简单
// 我不用了，因为定义 serverCacheKey 比较烦，命名也烦
/**
 *
const LRU = require('lru-cache')

module.exports = function nuxtComponentCache (options) {
  if (this.options.render.ssr === false) {
    // SSR Disabled
    return
  }

  // Create empty bundleRenderer object if not defined
  if (typeof this.options.render.bundleRenderer !== 'object' || this.options.render.bundleRenderer === null) {
    this.options.render.bundleRenderer = {}
  }

  // Disable if cache explicitly provided in project
  if (this.options.render.bundleRenderer.cache) {
    return
  }

  this.options.render.bundleRenderer.cache = new LRU(Object.assign({
    max: 10000,
    maxAge: 1000 * 60 * 15
  }, options))
}

module.exports.meta = require('./package.json')
 */
export class FileCache {
  /**
   * @typedef {Object} FileCacheOption
   * @property {String} basedir
   * @param {FileCacheOption} opt
   */
  constructor(opt) {
    this.options = Object.assign({}, opt)
  }

  /**
   *
   * @param {string} key
   * @param {Function} cb
   * @returns {string | void}
   */
  get(key, cb) {}
  /**
   *
   * @param {string} key
   * @param {string} val
   * @returns
   */
  set(key, val) {}
  /**
   *
   * @param {string} key
   * @param {Function} cb
   * @returns {boolean | void}
   */
  has(key, cb) {}
}
