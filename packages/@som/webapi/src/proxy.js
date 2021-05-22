import { ServerlessProxy } from '@slsplus/serverless-http'
import app from './app.js'

const proxy = new ServerlessProxy({
  requestListener: app
})

export default proxy
