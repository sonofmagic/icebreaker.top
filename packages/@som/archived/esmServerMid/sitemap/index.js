import { createGzip } from 'zlib'
// import { Readable } from 'stream'
import { Router } from 'express'
import {
  SitemapStream,
  streamToPromise,
  // simpleSitemapAndIndex,
  // lineSeparatedURLsToSitemapOptions,
} from 'sitemap'
const router = Router()

const sitemapArray = []

const hostname = 'https://www.icebreaker.top/'
const eachMapSize = 10000

const routeSoureData = ['/articles/2020/10/Window-matchMedia']
router.get('/sitemapindex.xml', (req, res) => {
  res.status(200).send('sitemapindex')
})

router.get('/sitemap:idx.xml', (req, res) => {
  const idx = parseInt(req.params.idx)
  if (idx > -1) {
    res.header('Content-Type', 'application/xml')
    res.header('Content-Encoding', 'gzip')
    if (sitemapArray[idx]) {
      res.send(sitemapArray[idx])
      return
    }
    const max = Math.ceil(routeSoureData.length / eachMapSize)
    // 从 0 开始，超出范围404
    if (idx >= max) {
      res.sendStatus(404)
      return
    }
    try {
      const smStream = new SitemapStream({ hostname })
      const pipeline = smStream.pipe(createGzip())

      smStream.write({
        url: '/articles/2020/10/Window-matchMedia',
        changefreq: 'daily',
        priority: 1,
      })
      streamToPromise(pipeline).then((sm) => (sitemapArray[idx] = sm))
      smStream.end()
      pipeline.pipe(res).on('error', (e) => {
        throw e
      })
    } catch (e) {
      console.error(e)
      res.status(500).end()
    }
  } else {
    res.sendStatus(404)
  }
})

export default router
