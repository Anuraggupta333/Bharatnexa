import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import mongoose from 'mongoose'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'data', 'mongo')

export async function connectDb(){
  mongoose.set('strictQuery', true)
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ss-mobile'
  try {
    await mongoose.connect(uri, {serverSelectionTimeoutMS: 3000})
    console.log('MongoDB connected')
    return
  } catch (err) {
    console.warn(`MongoDB not reachable (${err.message}). Starting embedded MongoDB...`)
  }

  fs.mkdirSync(dbPath, {recursive: true})
  try { fs.unlinkSync(path.join(dbPath, 'mongod.lock')) } catch { /* no lock */ }
  const {MongoMemoryServer} = await import('mongodb-memory-server')
  const mongod = await MongoMemoryServer.create({
    instance: {
      dbName: 'ss-mobile',
      dbPath,
      port: 27017,
      storageEngine: 'wiredTiger',
    },
  })
  globalThis.__embeddedMongo = mongod
  await mongoose.connect(mongod.getUri('ss-mobile'), {serverSelectionTimeoutMS: 8000})
  console.log('Embedded MongoDB connected — data stored in server/data/mongo')
}
