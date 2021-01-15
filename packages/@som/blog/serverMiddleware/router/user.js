const { Router } = require('express')
const router = Router()
const { pick } = require('lodash')
const { auth } = require('../cloudbase')

router.get('/info/:uid', async (req, res) => {
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

module.exports = router
