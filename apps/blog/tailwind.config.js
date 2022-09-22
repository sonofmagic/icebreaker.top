const { createPreset } = require('tailwind-css-variables-theme-generator')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '.dark-mode'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')],
  presets: [
    createPreset({
      entryPoint: './assets/scss/expose.scss',
      outdir: 'expose',
      files: {
        extendColors: {
          getVarName (s) {
            return s.substring(2)
          }
        },
        root: {
          replacement: {
            '{{filepath}}': '../constants.scss',
            '{{variableName}}': '$root-vars'
          }
        },
        util: true
      },
      write: true
    })
  ]
}
