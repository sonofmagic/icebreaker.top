const { Router } = require('express')
const router = Router()
const { db } = require('../cloudbase')
const article = db.collection('article')
const _ = db.command

router.put('/readcount/inc', async (req, res) => {
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
