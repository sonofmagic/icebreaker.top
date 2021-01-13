const { Router } = require('express')
const { pick } = require('lodash')
const router = Router()
const bodyParser = require('body-parser')
const { auth, db } = require('../cloudbase')
const article = db.collection('article')
const _ = db.command
router.use(bodyParser.json())
router.get('/user/info/:uid', async (req, res) => {
  try {
    const { uid } = req.params
    const { userInfo } = await auth.getEndUserInfo(uid)
    const data = pick(userInfo, [
      'uid',
      'isAnonymous',
      'nickName',
      'gender',
      'country',
      'province',
      'city',
      'avatarUrl',
      'email',
    ])

    return res.status(200).json(data)
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
})
router.put('/article/readcount/inc', async (req, res) => {
  const { id } = req.body
  if (!id) {
    res.sendStatus(401)
    return
  }
  let readCount = 1
  const { data } = await article.where({ id: _.eq(id) }).get()
  if (data.length) {
    await article.where({ id: _.eq(id) }).update({
      readCount: _.inc(1),
    })
    readCount = data[0].readCount + 1
  } else {
    await article.add({
      id,
      readCount,
    })
  }
  res.status(200).send({
    id,
    readCount,
  })
})
module.exports = router
