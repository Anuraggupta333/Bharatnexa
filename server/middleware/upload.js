import fs from 'fs'
import path from 'path'
import multer from 'multer'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dir = path.join(__dirname, '..', 'uploads')
fs.mkdirSync(dir, {recursive: true})

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, dir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg'
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`)
  },
})

export const upload = multer({
  storage,
  limits: {fileSize: 8 * 1024 * 1024},
  fileFilter: (_req, file, cb) => {
    if (!/^image\//.test(file.mimetype)) return cb(new Error('Images only'))
    cb(null, true)
  },
})
