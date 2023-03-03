import request from './utils/request.js'

export async function contentSearch(content, query) {
  return await content('articles', {
    deep: true,
  })
    .skip((query.page - 1) * query.perPage)
    .limit(query.perPage)
    .sortBy('date', 'desc')
    .only([
      'path',
      'title',
      'description',
      'date',
      'tags',
      'readingMinutes',
      'readingWords',
      'id',
    ])
    .fetch()
}

export async function getArticlesCount(content) {
  return (
    await content('articles', {
      deep: true,
    })
      .only(['slug'])
      .fetch()
  ).length
}

export async function getPageList(content, query) {
  return await Promise.all([
    getArticlesCount(content),
    contentSearch(content, query),
  ])
}

/**
 *
 * @param {String} id
 */
export function incReadCountById(id) {
  return request.post('/blog/article/readcount/date-id-inc/' + id)
}

// export function getBlogLoginQrcode(scene = '') {
//   return request.post('/api/v1/qrcode/blog-mp', {
//     scene,
//   })
// }
