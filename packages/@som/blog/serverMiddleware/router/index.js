const { Router } = require('express')

const router = Router()
const bodyParser = require('body-parser')
const userRouter = require('./user')
const articleRouter = require('./article')
router.use(bodyParser.json())
router.use('/user', userRouter)
router.use('/article', articleRouter)

module.exports = router
