const {
  resolve
} = require('path')
/**
 * @type {import('@nuxt/types').Module}
 */
const monacoModule = function MonacoEditorModule (_moduleOptions) {
  const options = Object.assign({}, this.options.monaco, _moduleOptions)
  const pluginOption = {
    src: resolve(__dirname, 'plugin.js'),
    mode: 'client',
    options: {
      componentName: 'MonacoEditor'
    }
  }

  const monacoOptions = {}

  if (options.languages) {
    monacoOptions.languages = options.languages
  }
  if (options.customLanguages) {
    monacoOptions.customLanguages = options.customLanguages
  }
  if (options.features) {
    monacoOptions.features = options.features
  }
  if (options.filename) {
    monacoOptions.filename = options.filename
  }
  if (options.publicPath) {
    monacoOptions.publicPath = options.publicPath
  }
  console.log(monacoOptions)
  this.extendBuild((config, {
    isClient
  }) => {
    if (isClient) {
      const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
      config.plugins.push(new MonacoWebpackPlugin(monacoOptions))
    }
  })

  if (options.templateOptions) {
    pluginOption.options = Object.assign({},
      pluginOption.options,
      options.templateOptions
    )
  }
  this.addPlugin(pluginOption)
  console.log(pluginOption)
}

module.exports = monacoModule
module.exports.meta = require('../package.json')
