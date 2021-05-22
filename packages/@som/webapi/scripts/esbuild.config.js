
const { isDev } = require('./constants')

module.exports = {
  // entryPoints: ['./src/listener.js'],
  bundle: true,
  platform: 'node',
  target: ['node12'],
  // outfile: 'dist/index.js',
  sourcemap: isDev
}
