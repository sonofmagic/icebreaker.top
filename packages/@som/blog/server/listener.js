import createServer from './index.js'

const port = process.env.PORT || 3000

async function start() {
  const app = await createServer()
  app.listen(port)
  console.log('Server listening on `localhost:' + port + '`.')
}

start()
