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
  }

}

module.exports = config
