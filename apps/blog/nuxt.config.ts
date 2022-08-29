import { defineNuxtConfig } from 'nuxt'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
const lifecycle = process.env.npm_lifecycle_event
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  head: {
    title: "icebreaker's blog build with nuxt3",
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'www.icebreaker.top'
      }
    ]
  },
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
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
        'jsx'
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {}
    }
  },
  vite: {
    // mode: 'development',
    plugins: [
      Components({
        dts: true,
        resolvers: [IconsResolver({})]
      })
    ]
  },
  build: {
    transpile: lifecycle === 'build' ? ['element-plus'] : []
  },
  buildModules: [
    '@pinia/nuxt',
    '@nuxtjs/svg',
    '@vueuse/nuxt',
    'unplugin-icons/nuxt'
  ],
  components: true,
  vueuse: {
    ssrHandlers: true
  }
})
