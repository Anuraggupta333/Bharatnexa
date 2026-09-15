import {Inquiry} from '../models/Inquiry.js'

export async function create(req, res){
  const {firstName, lastName, email, phone, city, message} = req.body || {}
  if (!email) return res.status(400).json({error: 'Email is required'})
  const item = await Inquiry.create({firstName, lastName, email, phone, city, message})
  res.status(201).json({ok: true, id: item._id})
}

export async function list(_req, res){
  const items = await Inquiry.find().sort({createdAt: -1})
  res.json(items)
}

export async function markRead(req, res){
  const item = await Inquiry.findByIdAndUpdate(req.params.id, {read: true}, {new: true})
  if (!item) return res.status(404).json({error: 'Not found'})
  res.json(item)
}

export async function remove(req, res){
  const item = await Inquiry.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({error: 'Not found'})
  res.json({ok: true})
}
