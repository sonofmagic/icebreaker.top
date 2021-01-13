import { Schema } from 'mongoose'
// import Book from '~/db/models/Book.js'
const CoverSchema = new Schema(
  {
    // _id: { type: Schema.Types.ObjectId, alias: 'id' },
    book_id: Number,
    ratingcount: {
      type: Number,
      required: true,
    },
    ratingval: {
      type: Number,
      required: true,
    },

    // book: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Book',
    // },
  },
  {
    collection: 'covers',
  }
)

CoverSchema.virtual('book', {
  ref: 'Book',
  localField: 'book_id',
  foreignField: '_id',
  justOne: true,
})

// CoverSchema.method({
//   getBook(opt) {
//     return Book.find({
//       _id: this.book_id,
//     })
//   },
// })

export default CoverSchema
