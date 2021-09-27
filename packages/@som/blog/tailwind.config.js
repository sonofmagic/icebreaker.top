/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
// const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: 'jit',
  important: true,
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
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              textDecoration: 'underline',
            },
            h2: {
              paddingBottom: theme('padding.2'),
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.gray.200'),
            },
            h3: {
              paddingBottom: theme('padding.2'),
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.gray.200'),
            },
            blockquote: {
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
            code: {
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
        dark: {
          css: {
            color: theme('colors.gray.300'),
            '[class~="lead"]': {
              color: theme('colors.gray.300'),
            },
            a: {
              color: theme('colors.primary.500'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            'ol > li::before': {
              color: theme('colors.gray.400'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.600'),
            },
            hr: {
              borderColor: theme('colors.gray.700'),
            },
            blockquote: {
              color: theme('colors.gray.400'),
              borderLeftColor: theme('colors.gray.700'),
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
              borderBottomColor: theme('colors.gray.800'),
            },
            h3: {
              color: theme('colors.gray.100'),
              borderBottomColor: theme('colors.gray.800'),
            },
            h4: {
              color: theme('colors.gray.100'),
            },
            'figure figcaption': {
              color: theme('colors.gray.400'),
            },
            code: {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.800'),
              borderWidth: 0,
            },
            'a code': {
              color: theme('colors.primary.500'),
            },
            thead: {
              color: theme('colors.gray.100'),
              borderBottomColor: theme('colors.gray.600'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
    cursor: {
      ...defaultTheme.cursor,
      pointer:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC) 14 0,pointer',
    },
  },
  variants: {},
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  plugins: [require('@tailwindcss/typography')],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'content/**/*.md',
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
    options: {
      whitelist: [/svg.*/, /fa.*/],
    },
  },
}
