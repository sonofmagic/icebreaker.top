// nuxt-ssr-cache 是页面级缓存的一种思路
// 本质上就是，劫持 nuxt.renderer.renderRoute
// 加入自个外置或者内存缓存的一个逻辑
// 这个思路其实就是最传统的那种思路,非常通用
// link: https://ssr.vuejs.org/guide/caching.html#page-level-caching

import { isRelease } from '@/utils/env'

// 一个当前目录，一个磁盘根目录
const mountedPath = isRelease ? '/mnt/' : './mnt/'

module.exports = require('nuxt-ssr-cache')
