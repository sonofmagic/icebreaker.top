import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/color-mode'],
  content: {
    highlight: {
      preload: [
        'javascript',
        'typescript',
        'vue',
        'vue-html',
        'bash',
        'yaml',
        'cmd',
        'json',
        'jsx',
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
    },
  },
})