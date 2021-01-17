const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'
const isRelease = process.env.SLS_ENV === 'release'
const mountedPath = isRelease ? '/mnt/' : './mnt/'

module.exports = {
  isDev,
  isProd,
  isRelease,
  mountedPath,
}
