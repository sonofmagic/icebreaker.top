import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {},
  build: {
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },
})
