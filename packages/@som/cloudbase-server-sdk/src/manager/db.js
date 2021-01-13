import { dbCollectionName } from './enum.js'
import app from './index.js'
const database = app.database

async function init() {
  for (const key of Object.values(dbCollectionName)) {
    const res = await database.createCollectionIfNotExists(key)
    if (res.IsCreated) {
      console.log(`collection ${key} is created`)
    }
  }
}

init()

export default database
