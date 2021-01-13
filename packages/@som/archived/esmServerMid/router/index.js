import { Router } from 'express'
import pick from 'lodash/pick'
import { auth } from '@som/cloudbase-server-sdk'
// import tcb from '~/cloudbase/index.js'
// import db from '~/cloudbase/db.js'
// import mongoose from 'mongoose'
const router = Router()

// router.post('/blog', async (req, res) => {})

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
// router.post('/comment', async (req, res) => {
//   const userInfo = auth.getEndUserInfo()
//   console.log(userInfo)
// })

export default router
