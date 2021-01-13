import { article, comment, command as _ } from '../..'

export async function getCommentByArticleId(
  id,
  opt = {
    limit: 10,
    skip: 0,
    // field,
  }
) {
  return await comment
    .where({
      id,
    })
    .limit(opt.limit)
    .skip(opt.skip)
    .field({
      _id: false,
      _openid: false,
    })
    .orderBy('ts', 'desc')
    .get()
}

export async function getCommentCountByArticleId(
  id,
  opt = {
    limit: 10,
    skip: 0,
    // field,
  }
) {
  return await comment
    .where({
      id,
    })
    .count()
}

export async function getCommentPagedListByArticleId(
  id,
  opt = {
    page: 1,
    perPage: 10,
  }
) {
  const { page, perPage } = opt
  const option = {
    skip: Math.max(page - 1, 0) * perPage,
    limit: perPage,
  }
  return await Promise.all([
    getCommentByArticleId(id, option),
    getCommentCountByArticleId(id),
  ])
}
