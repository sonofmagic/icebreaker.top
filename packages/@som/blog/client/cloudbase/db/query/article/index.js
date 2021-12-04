import { article, comment, command as _ } from '../..'
import { incReadCount } from '../../mutation/article'
export async function getArticleReadCount(id) {
  const { data } = await incReadCount(id)

  return data.readcount
  // const { data } = await article
  //   .where({ id: _.eq(id) })
  //   .limit(1)
  //   .field({
  //     id: true,
  //     readCount: true,
  //   })
  //   .get()
  // const list = data
  // if (Array.isArray(list) && list.length) {
  //   return list[0].readCount
  // } else {
  //   await article.add({
  //     id,
  //     readCount: 1,
  //   })
  //   return 1
  // }
}
