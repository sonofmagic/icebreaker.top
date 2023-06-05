import colors from 'tailwindcss/colors'
import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import daisyuiThemes from 'daisyui/src/theming/themes'
export default <Partial<Config>>{
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: colors.gray
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes['[data-theme=light]'],
          primary: '#0969da'
        }
      },
      {
        dark: {
          ...daisyuiThemes['[data-theme=dark]'],
          primary: '#539bf5'
        }
      }
    ]
  }
}
