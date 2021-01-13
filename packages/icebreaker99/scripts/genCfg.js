// const path = require('path')
// 拿blog栈的环境变量
// require('dotenv').config({
//   path: path.resolve(__dirname, '..', '..', '@som/blog')
// })
// 拿自己的环境变量
require('dotenv').config()
const fs = require('fs')
const yaml = require('js-yaml')
const config = require('./serverless.js')

try {
  const doc = yaml.dump(config)
  fs.writeFileSync('./serverless.yml', doc)
} catch (error) {
  console.log(error)
}
