import CoverTC from './TC/Cover.js'
import BookTC from './TC/Book.js'
export default function () {
  BookTC.addRelation('covers', {
    resolver: () => CoverTC.mongooseResolvers.dataLoaderMany(),
    prepareArgs: {
      _ids: (source) => source.coverIds,
    },
    // projection: {},
  })
  CoverTC.addRelation('book', {
    resolver: () => BookTC.mongooseResolvers.dataLoader(),
    prepareArgs: {
      _id: (source) => source.book_id,
    },
    // projection
  })
}
