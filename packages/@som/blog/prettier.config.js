/**
 * @type {import('prettier').Config}
 */
const config = {
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  bracketSameLine: true,
  htmlWhitespaceSensitivity: 'ignore',
  plugins: [require('prettier-plugin-tailwindcss')],
}

module.exports = config
