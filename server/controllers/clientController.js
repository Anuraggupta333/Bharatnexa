import {Client} from '../models/Client.js'
import {crud} from './crud.js'

const c = crud(Client)
export const list = c.list
export const get = c.get
export const create = c.create
export const update = c.update
export const remove = c.remove

export async function publicList(_req, res){
  const items = await Client.find().sort({order: 1, createdAt: -1})
  res.json(items)
}
