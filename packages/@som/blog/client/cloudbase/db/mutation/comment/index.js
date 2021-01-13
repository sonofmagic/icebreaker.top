import { article, comment } from '../..'

// id 文章或者页面的 id,path等等
export async function commitComment(id, content, user) {
  // const user = mapGetters('user', ['user'])
  const type = 'text'
  return await comment.add({
    uid: user.uid, // user.uid,
    nickName: user.nickName,
    id,
    content,
    type,
    ts: Date.now(),
  })
}
