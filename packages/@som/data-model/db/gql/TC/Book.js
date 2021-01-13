import { composeMongoose } from 'graphql-compose-mongoose'
import BookModel from '~/db/models/Book.js'
const BookTC = composeMongoose(BookModel, {})

export default BookTC
