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
        },
        // override default filepath
        outfile: path.resolve(__dirname, 'extendColors.js')
      },
      // variables.scss for global scss variables
      variables: {
        getVarName (str) {
          return str.substring(8)
        }
      },
      // object | true | undefined -> generate this file
      // false -> not generate this file
      export: {
        replacement: {
          '{{filepath}}': '../constants.scss',
          '{{variableName}}': '$root-vars'
        }
      },
      // replacement : Record<string,string>
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
