import {Job} from '../models/Job.js'
import {crud, publishedList} from './crud.js'

const c = crud(Job)
export const list = c.list
export const get = c.get
export const create = c.create
export const update = c.update
export const remove = c.remove
export const publicList = publishedList(Job)
