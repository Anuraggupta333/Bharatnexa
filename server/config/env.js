import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

export function loadEnv(){
  dotenv.config({path: path.join(root, '.env')})
}
