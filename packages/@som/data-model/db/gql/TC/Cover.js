import { composeMongoose } from 'graphql-compose-mongoose'
import CoverModel from '~/db/models/Cover.js'
const CoverTC = composeMongoose(CoverModel, {})

export default CoverTC
