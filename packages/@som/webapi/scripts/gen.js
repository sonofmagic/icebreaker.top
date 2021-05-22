require('dotenv').config()
const path = require('path')
const { generateSync } = require('serverless-config-generator')
try {
  generateSync({
    input: path.resolve(__dirname, './serverless.js'),
    output: {
      dir: path.resolve(__dirname, '..')
    }
  })
} catch (error) {
  console.log(error)
}
