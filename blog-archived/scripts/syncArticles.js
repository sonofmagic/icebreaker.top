// require('dotenv').config()
const fsp = require('node:fs').promises
const path = require('node:path')

const privateRepositoryPath = path.resolve(
  __dirname,
  '../../article/content',
)
const currentDir = path.resolve(__dirname, '..', 'content')
  ; (async () => {
  await fsp.symlink(privateRepositoryPath, currentDir, 'dir')
})()
