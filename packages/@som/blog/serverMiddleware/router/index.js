// const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
// const session = require('express-session')
// const FileStore = require('session-file-store')(session)
// const { passport } = require('../passport')

// const { mountedPath } = require('../utils')
// const fileStoreOptions = {
//   path: path.resolve(mountedPath, 'sessions'),
//   ttl: 1800, // seconds
//   reapInterval: -1,
// }
const app = express()

app.use(require('cookie-parser')())
app.use(bodyParser.json())
// 其实倒是可以用cloudbase的db自己实现一套
// app.use(
//   session({
//     store: new FileStore(fileStoreOptions),
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//   })
// )
const userRouter = require('./user')
const articleRouter = require('./article')
// const authRouter = require('./auth')
// app.use(passport.initialize())
// app.use(passport.session())
app.use('/user', userRouter)
app.use('/article', articleRouter)
// app.use('/auth', authRouter)

module.exports = app
