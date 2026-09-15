import mongoose from 'mongoose'

export function crud(Model, {slug = false} = {}){
  return {
    async list(_req, res){
      const items = await Model.find().sort({order: 1, createdAt: -1})
      res.json(items)
    },
    async get(req, res){
      let item = null
      if (mongoose.isValidObjectId(req.params.id)) item = await Model.findById(req.params.id)
      if (!item && slug) item = await Model.findOne({slug: req.params.id})
      if (!item) return res.status(404).json({error: 'Not found'})
      res.json(item)
    },
    async create(req, res){
      try {
        const item = await Model.create(req.body)
        res.status(201).json(item)
      } catch (err) {
        if (err.code === 11000) return res.status(400).json({error: 'That slug is already in use'})
        throw err
      }
    },
    async update(req, res){
      try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!item) return res.status(404).json({error: 'Not found'})
        res.json(item)
      } catch (err) {
        if (err.code === 11000) return res.status(400).json({error: 'That slug is already in use'})
        throw err
      }
    },
    async remove(req, res){
      const item = await Model.findByIdAndDelete(req.params.id)
      if (!item) return res.status(404).json({error: 'Not found'})
      res.json({ok: true})
    },
  }
}

export function publishedList(Model){
  return async (_req, res) => {
    const filter = Model.schema.path('published') ? {published: true} : {}
    const items = await Model.find(filter).sort({order: 1, createdAt: -1})
    res.json(items)
  }
}
