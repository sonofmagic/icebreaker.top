import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import schema from '@som/data-model/db/gql/index.js'

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    return {
      req,
      res,
    }
  },
})

const app = express()

server.applyMiddleware({
  app,
  path: '/gql',
})
// app.use(
//   '/voyager',
//   voyagerMiddleware({
//     endpointUrl: '/gql',
//   })
// )
export default app
