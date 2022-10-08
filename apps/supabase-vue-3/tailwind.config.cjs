module.exports = {
  presets: [require('./element-preset.cjs')],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {},
  plugins: [],
}
