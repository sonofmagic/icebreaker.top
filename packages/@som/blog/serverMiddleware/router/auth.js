const { Router } = require('express')
const router = Router()
const { passport } = require('../passport')
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  }
)

module.exports = router
