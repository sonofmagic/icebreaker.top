const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '..'),
})
const fs = require('fs')
const yaml = require('js-yaml')
const config = require('./serverless.js')
try {
  const doc = yaml.dump(config)
  fs.writeFileSync('./serverless.yml', doc)
} catch (error) {
  console.log(error)
}
