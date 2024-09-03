import path from 'node:path'
import { globSync } from 'glob'

export default {
  hostname: 'https://www.icebreaker.top',
  gzip: true,
  path: '/sitemap.xml',
  cacheTime: 1000 * 60 * 60 * 2,
  //  exclude: ['/gql/**'],
  routes() {
    const files = globSync(path.join(__dirname, '../dist/**/*.html'))
    const urls = files.map((file) => {
      const url = path
        .relative(path.join(__dirname, '../dist/'), file)
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
