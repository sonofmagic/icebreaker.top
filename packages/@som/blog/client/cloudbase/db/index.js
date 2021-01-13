import { db } from '..'
import { dbCollectionName } from './enum/index.js'

export const article = db.collection(dbCollectionName.article)

export const comment = db.collection(dbCollectionName.comment)

export const command = db.command

export const RegExp = db.RegExp

export const Geo = db.Geo
