import { schemaComposer } from 'graphql-compose'
import { MutationFuncMap, QueryFuncMap, hasLeanOption } from './enum'
import BookTC from './TC/Book.js'
import CoverTC from './TC/Cover.js'
import CreateRelation from './CreateRelation.js'
import './relation.js'
CreateRelation()
;[
  {
    prefix: 'book',
    tc: BookTC,
  },
  {
    prefix: 'cover',
    tc: CoverTC,
  },
].forEach(({ prefix, tc }) => {
  schemaComposer.Query.addFields({
    adminAction: tc.mongooseResolvers.count().wrapResolve((next) => (rp) => {
      if (!rp.context.req.user.isAdmin) {
        throw new Error('You should be admin, to have access to this action.')
      }
      return next(rp)
    }),
  })

  schemaComposer.Query.addFields(
    Object.entries(QueryFuncMap).reduce((acc, [suffix, value]) => {
      const functionName = prefix + suffix
      acc[functionName] = tc.mongooseResolvers[value]()
      if (hasLeanOption(value)) {
        acc[functionName + 'Lean'] = tc.mongooseResolvers[value]({
          lean: true,
        })
      }

      return acc
    }, {})
  )

  schemaComposer.Mutation.addFields(
    Object.entries(MutationFuncMap).reduce((acc, [suffix, value]) => {
      acc[prefix + suffix] = tc.mongooseResolvers[value]()
      return acc
    }, {})
  )
})

// async function main() {
//   // 添加 virtual 这种写法很怪异，还是使用 method 吧
//   // const book = await BookModel.findOne()
//   // console.log(await book.covers)
//   // const book = await BookModel.findOne({
//   //   _id: 1,
//   // })
//   //   .populate('covers')
//   //   .exec()
//   // console.log(book)
//   // const pq = await book.getCovers('pp', 'aa')
//   // console.log(pq)
//   // const cover = await CoverModel.findOne({
//   //   book_id: 1,
//   // })
//   // console.log(cover.book)
//   // await cover.populate('book').execPopulate()
//   // console.log(cover.book)
//   // const bb = await cover.getBook()
//   // console.log(bb)
// }
// main()
const graphqlSchema = schemaComposer.buildSchema()
export default graphqlSchema
