/* eslint-disable node/prefer-global/process */
// 直接搭blog可以使用 link https://content.nuxtjs.org/themes/docs
// import theme from '@nuxt/content-theme-docs'
// fibers
import fs from 'node:fs'

import dotenv from 'dotenv'
import { isProd, isRelease } from './constants.js'
import { sitemap } from './nuxt.config/index'

console.log('[NODE_ENV]:', process.env.NODE_ENV)
dotenv.config()

const script
  = isProd && isRelease
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
        // {
        //   hid: 'google-import',
        //   async: true,
        //   src: 'https://www.googletagmanager.com/gtag/js?id=G-9LFZ3ZM31C',
        // },
        // {
        //   hid: 'google-import-1',
        //   innerHTML: `window.dataLayer = window.dataLayer || [];
        //   function gtag(){dataLayer.push(arguments);}
        //   gtag('js', new Date());

        //   gtag('config', 'G-9LFZ3ZM31C');`,
        // },
      ]
    : [
      // {
      //   hid: 'google-import',
      //   async: true,
      //   src: 'https://www.googletagmanager.com/gtag/js?id=G-9LFZ3ZM31C',
      // },
      // {
      //   hid: 'google-import-1',
      //   innerHTML: `window.dataLayer = window.dataLayer || [];
      // function gtag(){dataLayer.push(arguments);}
      // gtag('js', new Date());
      // gtag('config', 'G-9LFZ3ZM31C');`,
      // },
      ]

// const smp = new SpeedMeasurePlugin()

/**
 * @type {import('@nuxt/types').NuxtConfig}
 */
const config = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  // ssr: false,
  // modern: isProd,
  telemetry: false,
  head: {
    title: '我的技术展示_icebreaker_某某打字员_擅长批量生产邮件_文档和代码',
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
        'content': 'IE=edge, chrome=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    htmlAttrs: {
      lang: 'zh-CN',
      // 'data-color-mode': 'dark',
    },
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `/favicon.ico`,
      },
      // ${isRelease ? cdnSite + 'www/release' : ''}
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
  router: {

  },
  loading: {
    color: 'rgb(121, 184, 255)',
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    // Mark css as having side effects in @fortawesome/fontawesome-svg-core
    // https://github.com/FortAwesome/Font-Awesome/issues/18729
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/scss/global.scss',
  ],
  server: {
    port: 9000,
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vant',
    '@/plugins/main',
    {
      src: '@/plugins/client-only.js',
      mode: 'client',
    },
    // {
    //   src: '@/plugins/server-only.js',
    //   mode: 'server',
    // },
    // {
    //   src: '@/plugins/cloudbase/client.js',
    //   mode: 'client',
    // },
    {
      src: '@/plugins/gsap.js',
      mode: 'client',
    },
    // { src: '@/plugins/persistedState.js' },
  ],
  serverMiddleware: [
    {
      handler(req, res, next) {
        Object.entries({
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': req.headers.origin || '*',
          'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
          'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
          'Content-Type': 'application/json; charset=utf-8',
        }).forEach(([name, value]) => {
          res.setHeader(name, value)
        })

        next()
      },
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
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics',
    '@nuxtjs/composition-api/module',
  ],
  googleAnalytics: {
    id: 'G-9LFZ3ZM31C',
  },
  tailwindcss: {
    cssPath: '~/assets/scss/tailwind.scss',
    configPath: '../tailwind.config.js',
    exposeConfig: false,
    // config: {},
  },
  // pwa: {
  //   manifest: {
  //     name: 'icebreaker.top',
  //     short_name: 'icebreaker',
  //     description: 'icebreaker分享技术的博客站',
  //   },
  // },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // '../loadServerMiddleware/dist',
    // ...require('../serverMiddleware'),
    // '../loadServerMiddleware',
    '@nuxt/content',
    // '@nuxtjs/apollo',
    // '@nuxtjs/svg-sprite',
    '@nuxtjs/sitemap',
    // '@nuxtjs/proxy',
    '@nuxtjs/feed',
    // '@nuxtjs/sentry',
    // [
    //   '@nuxtjs/proxy',
    //   { pathRewrite: { '^/api': { target: 'http://127.0.0.1:9000/api' } } },
    // ],
  ],
  feed() {
    const websiteUrl = 'https://icebreaker.top'
    // const baseUrlArticles = 'https://icebreaker.top/'
    // const baseLinkFeedArticles = '/feed/articles'
    const feedFormats = {
      rss: { type: 'rss2', file: 'rss.xml' },
      json: { type: 'json1', file: 'feed.json' },
    }
    const { $content } = require('@nuxt/content')
    // https://validator.w3.org/feed/docs/rss2.html
    const createFeedArticles = async function (feed) {
      feed.options = {
        title: 'icebreaker',
        description: '一位打字员',
        link: `${websiteUrl}/`,
        language: 'zh-cn',
        copyright: `Copyright ${new Date().getFullYear()} icebreaker.The contents of this feed are available for non-commercial use only.`,
        generator: 'icebreaker.top',
        author: 'icebreaker<1324318532@qq.com>',
        // image:''
      }
      const articles = await $content('articles', {
        deep: true,
      })
        .sortBy('date', 'desc')
        .fetch()

      articles.forEach((article) => {
        const url = `${websiteUrl}${article.path}`
        // console.log(article.body.children)
        feed.addItem({
          title: article.title,
          id: article.id,
          link: url,
          // date: article.published,
          date: new Date(article.date), //  new Date(article.date),
          description: article.description,
          content: article.summary, // toHtml(article.body),// article.summary,
          author: article.authors,
          // const { name, domain } = category;
          category: Array.isArray(article.tags)
            ? article.tags.map((x) => {
                return {
                  name: x,
                }
              })
            : [],
        })
      })
    }

    return Object.values(feedFormats).map(({ file, type }) => ({
      path: `/${file}`,
      type,
      create: createFeedArticles,
    }))
  },
  sitemap,
  // feed,
  content: {
    dir: '../content',
    markdown: {
      prism: {
        theme: 'prismjs/themes/prism-tomorrow.css',
      },
    },
  },
  build: {
    publicPath:
      isRelease && isProd
        ? '/_ice/' /// prodPublicPath
        : '/_nuxt/',
    // quiet: true,
    extractCSS: isProd,
    // optimizeCSS: isProd,
    transpile: [/^element-ui/, /vant.*?less/, /echarts/, /zrender/, /giscus/, /@lit[/\\]reactive-element/, /lit-html/, /lit-element/],
    loaders: {
      scss: {
        // https://github.com/sass/dart-sass/issues/1324
        // --quiet
        additionalData: '@use "@/assets/scss/variables.scss" as *;',
        sassOptions: {
          quietDeps: true,
          silenceDeprecations: ['legacy-js-api', 'import', 'color-functions'],
        },
      },
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import "@/uni.less";`,
          },
        },
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    postcss: {
      postcssOptions: {
        plugins: {
          'postcss-custom-properties': false,
        },
      },
    },
    extend(config) {
      // Can't resolve 'fs'  in graceful-fs'
      config.node = {
        fs: 'empty',
      }
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
  generate: {
    dir: 'dist',
  },
  target: process.env.target || 'static',
  globalName: 'icebreaker',
  // hooks,
  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const { minutes, words } = require('reading-time')(document.text)
        // time,
        document.readingMinutes = Math.round(minutes)
        document.readingWords = words
      }
    },
  },
  srcDir: 'client/',
}

if (isProd) {
  config.build.terser = {
    terserOptions: {
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
