// require('dotenv').config()
const fsp = require('fs').promises
const path = require('path')
const privateRepositoryPath = path.resolve(
  __dirname,
  '../../../../article/content'
)
const currentDir = path.resolve(__dirname, '..', 'content')
// spider niubi!
;(async () => {
  await fsp.symlink(privateRepositoryPath, currentDir, 'dir')
})()
