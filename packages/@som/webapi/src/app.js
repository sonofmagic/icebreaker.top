import express from 'express'
import { json } from 'body-parser'
const app = express()
app.use(json())
app.get('/', (req, res) => {
  res.send({
    query: req.query,
    body: req.body
  })
})

export default app
