/**
 * @type {import('prettier').Config}
 */
const config = {
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  plugins: [require('prettier-plugin-tailwindcss')]
}

module.exports = config
