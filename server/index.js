import {loadEnv} from './config/env.js'
loadEnv()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import {fileURLToPath} from 'url'
import {connectDb} from './config/db.js'
import {seedContent} from './seed.js'
import authRoutes from './routes/auth.js'
import publicRoutes from './routes/public.js'
import adminRoutes from './routes/admin.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = Number(process.env.PORT) || 5000

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json({limit: '2mb'}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/public', publicRoutes)
app.use('/api/admin', adminRoutes)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status || 500).json({error: err.message || 'Server error'})
})

await connectDb()
await seedContent()

const server = app.listen({port, host: '127.0.0.1', exclusive: true}, () => {
  console.log(`API http://127.0.0.1:${port}`)
})
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Change PORT in .env.`)
    process.exit(1)
  }
  throw err
})
