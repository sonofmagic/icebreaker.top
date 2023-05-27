// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // [
    //   '@nuxtjs/eslint-module',
    //   {
    //     /* module options */
    //   },
    // ],
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/content',
  ],
  content: {},
  // devServer: {
  //   host: '',
  //   port: 3000,
  // },
})
