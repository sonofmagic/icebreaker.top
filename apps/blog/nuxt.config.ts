import { defineNuxtConfig } from 'nuxt/config'
// import IconsResolver from 'unplugin-icons/resolver'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// const WebpackAutoImport = require('unplugin-auto-import/webpack')
// const WebpackComponents = require('unplugin-vue-components/webpack')
import ElementPlus from 'unplugin-element-plus/vite'
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
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/scss/index.scss'
  ],
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    cssPath: '~/assets/scss/tailwind.scss'
  },
  colorMode: {
    classPrefix: '',
    classSuffix: ''
  },
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
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //   },
  // },
  // webpack: {
  //   plugins: [
  //     WebpackAutoImport({
  //       resolvers: [ElementPlusResolver()]
  //     }),
  //     WebpackComponents({
  //       resolvers: [ElementPlusResolver()]
  //     })
  //   ]
  // },

  vite: {
    // mode: 'development',
    plugins: [
      ElementPlus()
      // Components({
      //   dts: true,
      //   resolvers: [IconsResolver({})]
      // }),
      // AutoImport({
      //   resolvers: [ElementPlusResolver()]
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()]
      // })
    ]
  },
  build: {
    transpile: ['element-plus/es']
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
