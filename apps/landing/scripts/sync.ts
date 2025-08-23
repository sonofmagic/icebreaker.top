import fsp from 'fs/promises'
import path from 'path'

const privateRepositoryPath = path.resolve(
  __dirname,
  '../../../article/content/articles',
)
const currentDir = path.resolve(__dirname, '../content/articles')
  ; (async () => {
    await fsp.symlink(privateRepositoryPath, currentDir, 'dir')
  })()
