module.exports = async function getArticle() {
  if (process.server) {
    const path = require('path')
    const klaw = require('klaw')
    const contentPath = path.resolve(process.cwd(), 'content')
    const result = []

    for await (const item of klaw(contentPath)) {
      const link = item.path.replace(contentPath, '')
      if (path.extname(link) === '.md') {
        result.push(link.replace('.md', '').replace(/\\/g, '/'))
      }
    }
    return result
  }
  return []
}
