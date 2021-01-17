const passport = require('passport')
const GitHubStrategy = require('passport-github2')
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env
const { auth } = require('../cloudbase')
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return done(err, user)
      // })
    }
  )
)

module.exports = {
  passport,
}
