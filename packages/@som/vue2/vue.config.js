/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const config = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.t\.html$/i,
          use: 'simple-lodash-template-loader'
        }
      ]
    }
  },
  devServer: {
    port: 8082
  }
}

module.exports = config
