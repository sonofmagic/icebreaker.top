const path = require('path')
const { generate } = require('tailwind-css-variables-theme-generator')

const entryPoint = path.resolve(__dirname, '../client/assets/scss/expose.scss')
;(async () => {
  await generate({
    entryPoint,
    outdir: 'expose',
    files: {
      extendColors: {
        getVarName(str) {
          return str.substring(8)
        },
        getVarValue(str) {
          if (str.includes('shadow')) {
            return `'${str}'`
          }
          return `withOpacityValue('${str}')`
        },
        // outfile: path.resolve(__dirname, 'extendColors.js'),
      },
      variables: {
        getVarName(str) {
          return str.substring(8)
        },
      },
      export: {
        replacement: {
          '{{filepath}}': '../constants.scss',
          '{{variableName}}': '$root-vars',
        },
      },
      root: {
        replacement: {
          '{{filepath}}': '../constants.scss',
          '{{variableName}}': '$root-vars',
        },
      },
      util: true,
    },
  })
})()
