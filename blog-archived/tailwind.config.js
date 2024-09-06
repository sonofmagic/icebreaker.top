const { addIconSelectors } = require('@iconify/tailwind')
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const extendColors = require('./client/assets/scss/expose/extendColors')
/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  darkMode: ['selector', '[data-color-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        // neutral: 'rgb(241,248,255)',
        primary: {
          100: '#E6FAF2',
          200: '#BFF3E0',
          300: '#99EBCD',
          400: '#4DDCA7',
          500: '#00CD81',
          600: '#00B974',
          700: '#007B4D',
          800: '#005C3A',
          900: '#003E27',
        },
        // accents: {
        //   100: '#111',
        //   200: '#333',
        //   300: '#444',
        //   400: '#666',
        //   500: '#999',
        //   600: '#999',
        //   700: '#eaeaea',
        //   800: '#fafafa',
        //   900: '#ffffff',
        // },
        ...extendColors.colors,
      },
      typography: (theme) => {
        const fontDefaultColor = 'rgb(var(--color-fg-default))'
        const headerBottonBorder = '1px solid rgb(var(--color-border-muted))'
        return {
          DEFAULT: {
            css: {
              'a': {
                color: theme('colors.primary.500'),
                textDecoration: 'underline',
              },
              'h2': {
                paddingBottom: theme('padding.2'),
                borderBottomWidth: '1px',
                borderBottomColor: theme('colors.gray.200'),
              },
              'h3': {
                paddingBottom: theme('padding.2'),
                borderBottomWidth: '1px',
                borderBottomColor: theme('colors.gray.200'),
              },
              'blockquote': {
                fontWeight: '400',
                color: theme('colors.gray.600'),
                fontStyle: 'normal',
                quotes: 'none',
                borderLeftWidth: '0.25rem',
                borderLeftColor: theme('colors.gray.300'),
                // quotes: '"\\201C""\\201D""\\2018""\\2019"',
              },
              'blockquote p:first-of-type::before': {
                content: '',
              },
              'blockquote p:last-of-type::after': {
                content: '',
              },
              'code': {
                fontWeight: '400',
                backgroundColor: theme('colors.gray.100'),
                padding: theme('padding.1'),
                borderWidth: 1,
                borderColor: theme('colors.gray.200'),
                borderRadius: theme('borderRadius.default'),
              },
              'code::before': {
                content: '',
              },
              'code::after': {
                content: '',
              },
              'h3 code': {
                fontWeight: '600',
              },
              'pre code': {
                fontFamily: 'DM Mono',
                backgroundColor: 'transparent',
                borderWidth: 0,
                borderRadius: '0',
                padding: 0,
                fontWeight: '400',
                color: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit',
              },
              'a code': {
                color: theme('colors.primary.500'),
              },
            },
          },

          invert: {
            css: {
              'color': fontDefaultColor,
              'a': {
                'color': 'rgb(var(--color-accent-fg))',
                'text-decoration': 'none',
                '&:hover': {
                  'text-decoration': 'underline',
                },
              },
              'blockquote': {
                'padding': '0 1em',
                'color': 'rgb(var(--color-fg-muted))',
                'border-left': '.25em solid rgb(var(--color-border-default))',
              },
              'h1': {
                'color': fontDefaultColor,
                'borderBottom': headerBottonBorder,
                'font-size': '2em',
                'padding-bottom': '0.3em',
              },
              'h2': {
                color: fontDefaultColor,
                borderBottom: headerBottonBorder,
                // borderBottomColor: theme('colors.gray.800'),
              },
              'h3': {
                color: fontDefaultColor,
                borderBottom: headerBottonBorder,
              },
              'h4': {
                color: fontDefaultColor,
              },
              'strong': {
                color: fontDefaultColor,
              },
              // 'figure figcaption': {
              //   color: theme('colors.gray.400'),
              // },
              'code': {
                'color': 'rgb(var(--color-fg-default))',
                'backgroundColor': 'rgb(var(--color-neutral-muted) / 0.2)',
                'borderWidth': 0,
                'padding': '.2em .4em',
                'margin': 0,
                'fontSize': '85%',
                'border-radius': '6px',
                'border-width': '0px',
                'border-color': 'transparent',
              },
              'a code': {
                'color': 'rgb(var(--color-accent-fg))',
                'text-decoration': 'none',
                '&:hover': {
                  'text-decoration': 'underline',
                },
              },
              'pre > code': {
                'background-color': 'transparent',
                'padding': 0,
                'border-radius': '0px',
                'color': 'inherit',
              },
            },
          },
        }
      },
    },
    cursor: {
      ...defaultTheme.cursor,
      // pointer:
      //   'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC) 14 0,pointer',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    },
  },
  // variants: {},
  // future: {
  //   removeDeprecatedGapUtilities: true,
  //   purgeLayersByDefault: true,
  //   defaultLineHeights: true,
  //   standardFontWeights: true,
  // },
  plugins: [
    require('@tailwindcss/typography'),
    addIconSelectors(['line-md']),
  ],
  content: [
    'content/**/*.md',
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js',
  ],
}
