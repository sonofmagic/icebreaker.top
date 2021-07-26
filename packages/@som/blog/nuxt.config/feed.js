const path = require('path')
const fs = require('fs')
const matter = require('gray-matter')
const fsp = fs.promises

// https://www.icebreaker.top/articles/2021/7/23-web-custom-image-node-canvas
async function getPosts() {
  const posts = await fsp.readdir(
    path.join(__dirname, '..', 'content', 'articles')
  )

  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith('index.')) return

      const content = await fs.readFile(
        path.join(__dirname, '..', 'pages', 'posts', name)
      )
      const frontmatter = matter(content)
      return {
        frontmatter,
      }
      // feed.item({
      //   title: frontmatter.data.title,
      //   url: '/posts/' + name.replace(/\.mdx?/, ''),
      //   date: frontmatter.data.date,
      //   description: frontmatter.data.description,
      //   categories: frontmatter.data.tag.split(', '),
      //   author: frontmatter.data.author,
      // })
    })
  )
}

const create = (feed) => {
  feed.options = {
    title: `icebreaker_某某打字员_擅长批量生产邮件_文档和代码`,
    site_url: 'https://www.icebreaker.top',
    feed_url: 'https://www.icebreaker.top/feed.xml',
  }
  getPosts().forEach((x) => {
    feed.addItem(x)
  })
}

const feed = () => {
  return [
    {
      path: '/feed.xml', // The route to your feed.
      create, // The create function (see below)
      cacheTime: 1000 * 60 * 24, // How long should the feed be cached
      type: 'rss2', // Can be: rss2, atom1, json1
      // data: ['Some additional data'], // Will be passed as 2nd argument to `create` function
    },
  ]
}

module.exports = {
  feed,
  create,
  getPosts,
}
