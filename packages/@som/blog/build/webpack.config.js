const path = require('path')
const builtinModules = require('builtin-modules')
module.exports = {
  mode: 'none', // development,production,none
  entry: {
    listener: './server/listener.js',
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        // \\ for Windows, \/ for Mac OS and Linux
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  externals: builtinModules.reduce((acc, cur) => {
    acc[cur] = cur
    return acc
  }, {}),
  plugins: [],
}
