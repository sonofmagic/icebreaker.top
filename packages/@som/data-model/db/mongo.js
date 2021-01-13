import mongoose from 'mongoose'

export default function init(dbName) {
  return mongoose.createConnection(
    process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName,
    }
  )
}
