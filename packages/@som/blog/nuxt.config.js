// 直接搭blog可以使用 link https://content.nuxtjs.org/themes/docs
// import theme from '@nuxt/content-theme-docs'

import fs from 'fs'
import dayjs from 'dayjs'
import dotenv from 'dotenv'
// import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'
import hooks from './nuxt.config/hooks.js'
import sitemap from './nuxt.config/sitemap.js'

// const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'
const isRelease = process.env.SLS_ENV === 'release'
// import serverMiddleware from './serverMiddleware/index.js'
dotenv.config()

// const isLoadMonaco = false
// console.log(process.env)
const slsEnv = process.env.SLS_ENV
const cdnSite = 'https://cdn.icebreaker.top/'
const script =
  isProd && isRelease
    ? [
        {
          hid: 'hm',
          innerHTML: fs.readFileSync('./statistics/baidu.js', {
            encoding: 'utf-8',
          }),
        },
        {
          hid: 'bp',
          innerHTML: fs.readFileSync('./statistics/baidu-auto-push.js', {
            encoding: 'utf-8',
          }),
        },
      ]
    : []

/**
 * @type {import('@nuxt/types').NuxtConfig}
 */
const config = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  modern: isProd,
  telemetry: false,
  head: {
    title: 'icebreaker_某某前端工程师',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge, chrome=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${isRelease ? cdnSite + 'www/release' : ''}/favicon.ico`,
      },
    ],
    script,
    __dangerouslyDisableSanitizersByTagID: {
      hm: ['innerHTML'],
      bp: ['innerHTML'],
    },
    noscript: [
      {
        innerHTML: '此页面需要javascript支持,请在浏览器中启用javascript',
      },
    ],
  },
  loading: {
    color: 'rgb(121, 184, 255)',
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // 'element-ui/lib/theme-chalk/index.css',

    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/scss/global.scss',
    'github-markdown-css/github-markdown.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vant',
    '@/plugins/main',
    {
      src: '@/plugins/client-only.js',
      mode: 'client',
    },
    {
      src: '@/plugins/server-only.js',
      mode: 'server',
    },
    {
      src: '@/plugins/cloudbase/client.js',
      mode: 'client',
    },
    {
      src: '@/plugins/gsap.js',
      mode: 'client',
    },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    {
      path: '@/components/global',
      global: true,
    },
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/tailwindcss-module
    // https://tailwindcss.nuxtjs.org/setup/
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics',
    // Doc: https://github.com/nuxt-community/color-mode-module
    // '@nuxtjs/color-mode',
    // '@nuxtjs/svg',
  ],
  googleAnalytics: {
    id: 'G-9LFZ3ZM31C',
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '../tailwind.config.js',
    exposeConfig: false,
    // config: {},
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // '../loadServerMiddleware/dist',
    // ...require('../serverMiddleware'),
    '../loadServerMiddleware',
    '@nuxt/content',
    '@nuxtjs/apollo',
    // '@nuxtjs/svg-sprite',
    '@nuxtjs/sitemap',
  ],
  // monaco: {},
  sitemap,
  content: {
    dir: '../content',
    markdown: {
      prism: {
        theme: 'prismjs/themes/prism-tomorrow.css',
      },
    },
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:3000/graphql/gql',
      },
    },
  },

  // serverMiddleware: process.static ? [] : serverMiddleware,
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath:
      isRelease && isProd
        ? `${cdnSite}www/${slsEnv}/${dayjs().format('YYYYMMDD')}`
        : '/_nuxt/',
    quiet: false,
    extractCSS: isProd,
    optimizeCSS: isProd,
    transpile: [/^element-ui/, /vant.*?less/],
    loaders: {
      scss: {
        additionalData: '@import "@/uni.scss";',
      },
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import "@/uni.less";`,
          },
        },
      },
    },
    // optimization: {
    //   minimize: true,
    //   minimizer: [
    //     // terser-webpack-plugin
    //     // optimize-css-assets-webpack-plugin
    //   ],
    //   splitChunks: {
    //     chunks: 'all',
    //     automaticNameDelimiter: '.',
    //     name: undefined,
    //     cacheGroups: {},
    //   },
    // },
    extend(config, { isClient }) {
      config.externals = {
        'hls.js': 'hls.js',
      }
      // if (isClient && isLoadMonaco) {
      //   config.plugins.push(new MonacoWebpackPlugin())
      // }
    },
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
          'element-ui',
        ],
        [
          'import',
          {
            libraryName: 'vant',
            // libraryDirectory: 'es',
            // style: true,
            style: (name) => {
              return `${name}/style/less.js`
            },
          },
          'vant',
        ],
      ],
    },
  },
  env: {
    TENCENT_CLOUDBASE_ENVID: process.env.TENCENT_CLOUDBASE_ENVID,
    SLS_ENV: process.env.SLS_ENV,
  },
  generate: {
    dir: 'docs',
    exclude: [/^\/gql/],
  },
  target: process.env.target || 'server',
  globalName: 'icebreaker',
  hooks,
  srcDir: 'client/',
}

if (isProd) {
  config.build.terser = {
    terserOptions: {
      // output: {
      //   comments: 'some', // /^\**!|@preserve|@license|@cc_on/,
      // },
      compress: {
        drop_console: true,
        // drop_debugger: true,:default: true
        // https://terser.org/docs/api-reference#compress-options
        // pure_funcs: ['console.log'],
      },
    },
  }
}

export default config // theme(config)
