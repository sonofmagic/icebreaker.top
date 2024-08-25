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
