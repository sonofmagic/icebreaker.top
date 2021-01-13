import { incReadCountById } from '@/api/article'
// import { article, comment, command as _ } from '../..'
export async function incReadCount(id) {
  return await incReadCountById(id)
  // article.where({ id: _.eq(id) }).update({
  //   readCount: _.inc(1),
  // })
}
