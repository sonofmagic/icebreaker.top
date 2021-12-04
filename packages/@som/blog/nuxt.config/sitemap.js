import path from 'path'
import glob from 'glob'
export default {
  hostname: 'https://www.icebreaker.top',
  gzip: true,
  path: '/sitemap.xml',
  cacheTime: 1000 * 60 * 60 * 2,
  exclude: ['/gql/**'],
  routes() {
    const files = glob.sync(path.join(__dirname, '../docs/**/*.html'))
    const urls = files.map((file) => {
      const url = path
        .relative(path.join(__dirname, '../docs/'), file)
        .replace('index.html', '')
      return {
        url,
        lastmodfile: file,
        changefreq: 'daily',
        priority: 1,
      }
    })
    return urls
  },
  defaults: {
    changefreq: 'daily',
    priority: 1,
  },
}
