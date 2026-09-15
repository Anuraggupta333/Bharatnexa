import {Project} from '../models/Project.js'
import {crud, publishedList} from './crud.js'

const c = crud(Project, {slug: true})
export const list = c.list
export const get = c.get
export const create = c.create
export const update = c.update
export const remove = c.remove
export const publicList = publishedList(Project)

export async function publicBySlug(req, res){
  const item = await Project.findOne({slug: req.params.slug, published: true})
  if (!item) return res.status(404).json({error: 'Not found'})
  res.json(item)
}
