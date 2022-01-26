const { generate } = require('tailwind-css-variables-theme-generator')
const path = require('path')

;(async () => {
  await generate({
    entryPoint: path.resolve(__dirname, '../src/assets/scss/expose.scss'),
    outdir: 'expose',
    files: {
      // extendColors.js for tailwindcss v3
      extendColors: {
        getVarName (str) {
          return str.substring(8)
        },
        getVarValue (str) {
          if (str.includes('shadow')) {
            return `'${str}'`
          }
          return `withOpacityValue('${str}')`
        }
      },
      variables: {
        getVarName (str) {
          return str.substring(8)
        }
      },
      export: {
        replacement: {
          '{{filepath}}': '../constants.scss',
          '{{variableName}}': '$root-vars'
        }
      },
      root: {
        replacement: {
          '{{filepath}}': '../constants.scss',
          '{{variableName}}': '$root-vars'
        }
      },
      // boolean: false -> not generate this file
      util: true
    }
  })
})()
