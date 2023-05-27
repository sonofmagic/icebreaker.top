// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['content-wind'],
  experimental: {
    watcher: "chokidar",
  },
})
