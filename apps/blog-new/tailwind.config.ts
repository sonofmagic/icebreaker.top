import colors from 'tailwindcss/colors'
import type { Config } from 'tailwindcss';
import daisyui from 'daisyui'
export default <Partial<Config>>{
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: colors.gray
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
}
