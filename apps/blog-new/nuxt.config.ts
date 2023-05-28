// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  extends: [
    process.env.THEME_ELEMENTS || '@nuxt-themes/elements',
    process.env.THEME_TYPOGRAPHY || '@nuxt-themes/typography'
  ],
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    'nuxt-config-schema',
  ],
  // https://color-mode.nuxtjs.org
  colorMode: {
    classSuffix: '',
    dataValue: 'theme'
  },
  // https://content.nuxtjs.org
  content: {

    // documentDriven: true,
    highlight: {

      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: {
        dark: 'github-dark',
        default: 'github-light'
      }
    }
  },
  experimental: {
    inlineSSRStyles: false,
    watcher: 'chokidar'
  }
})
