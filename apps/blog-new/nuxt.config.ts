// import path from 'path'
// import routesV1 from './routes-v1.json'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  extends: [
    process.env.THEME_ELEMENTS || '@nuxt-themes/elements',
    process.env.THEME_TYPOGRAPHY || '@nuxt-themes/typography'
  ],
  app: {
    // keepalive: true
  },
  css: ['@/assets/css/main.scss'],
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    'nuxt-config-schema'
  ],
  // https://color-mode.nuxtjs.org
  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
    preference: 'dark'
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.scss'
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
  },
  hooks: {
    'pages:extend'(routes) {
      // console.log(routes)
      // for (let i = 0; i < routesV1.length; i++) {
      //   const r = routesV1[i];
      //   if(r.path === '/'){
      //     continue
      //   }
      //   routes.push({
      //     ...r,
      //     redirect: to => {
      //       debugger
      //       console.log(to)
      //       // the function receives the target route as the argument
      //       // we return a redirect path/location here.
      //       return { path: '/v1' }
      //     },
      //     // component
      //     // file: path.resolve(__dirname,'./pages/v1/[...slug].vue')
      //   })
      // }
      // console.log(routes)
      //
    }
  }
})
