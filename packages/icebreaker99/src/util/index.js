/**
 * @param {String} str
 */
function encode (str) {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/&/g, '&amp;')
}

exports.isDev = process.env.NODE_ENV === 'development'

exports.isProd = process.env.NODE_ENV === 'production'

exports.mountedPath = exports.isProd ? '/mnt/' : './mnt/'

exports.generateMsgLink = (href, content) => {
  return encode('<a href="') + href + encode('">') + content + encode('</a>')
}
