/** @type {import('prettier').Config} */
module.exports = {
  useTabs: false,
  semi: false,
  singleQuote: true,
  endOfLine: 'lf',
  trailingComma: 'none',
  bracketSameLine: true,
  htmlWhitespaceSensitivity: 'ignore',
  plugins: [require('prettier-plugin-tailwindcss')]
}
