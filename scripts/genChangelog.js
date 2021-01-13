require('dotenv').config()
const {
  GITHUB_AUTH
} = process.env
const fs = require('fs')
const path = require('path')
const execa = require('execa')

async function genNewRelease() {
  const {
    stdout
  } = await execa.command(`cross-env GITHUB_AUTH=${GITHUB_AUTH} lerna-changelog`)
  return stdout
}

const gen = (module.exports = async () => {
  const newRelease = await genNewRelease()
  const changelogPath = path.resolve(__dirname, '../CHANGELOG.md')

  const newChangelog =
    newRelease + '\n\n\n' + fs.readFileSync(changelogPath, {
      encoding: 'utf8'
    })
  fs.writeFileSync(changelogPath, newChangelog)

  delete process.env.PREFIX
})

if (require.main === module) {
  gen().catch(err => {
    console.error(err)
    process.exit(1)
  })
}