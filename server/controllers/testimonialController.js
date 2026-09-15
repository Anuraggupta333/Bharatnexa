import {Testimonial} from '../models/Testimonial.js'
import {crud, publishedList} from './crud.js'

const c = crud(Testimonial)
export const list = c.list
export const get = c.get
export const create = c.create
export const update = c.update
export const remove = c.remove
export const publicList = publishedList(Testimonial)
