const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',
  plugins: [new HtmlWebpackPlugin(), new BundleAnalyzerPlugin()],
}
