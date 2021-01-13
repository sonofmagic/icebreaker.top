export default {
  hostname: 'https://www.icebreaker.top',
  gzip: true,
  path: '/sitemap.xml',
  cacheTime: 1000 * 60 * 15,
  exclude: ['/gql/**'],
  defaults: {
    changefreq: 'daily',
    priority: 1,
  },
}
