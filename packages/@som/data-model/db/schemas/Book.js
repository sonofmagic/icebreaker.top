import { Schema } from 'mongoose'
// import Cover from '~/db/models/Cover.js'
const BookSchema = new Schema(
  {
    // _id: { type: Number, alias: 'id' }, // String,
    title: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: {
      type: String,
      required: true,
      enum: ['MEAP', 'PUBLISH'],
    },
    authors: [String],
    categories: [String],

    // Populate
    // covers: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Cover',
    //   },
    // ],
  },
  {
    collection: 'books',
  }
)
// 添加 virtual 这种写法在使用时 很怪异，还是使用 method 吧
// BookSchema.virtual('covers').get(async function () {
//   return await Cover.find({
//     book_id: this.id,
//   })
// })

// BookSchema.method({
//   getCovers(opt) {
//     return Cover.find({
//       book_id: this._id,
//     })
//   },
// })

BookSchema.virtual('covers', {
  ref: 'Cover',
  localField: '_id',
  foreignField: 'book_id',
})

export default BookSchema
