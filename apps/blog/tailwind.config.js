const path = require('path')
const { createPlugin } = require('tailwind-css-variables-theme-generator')
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '.dark'],
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
  plugins: [
    require('@tailwindcss/typography'),
    createPlugin({
      entryPoint: path.resolve(__dirname, './assets/scss/expose.scss')
    })
  ]
}
