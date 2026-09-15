import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  slug: {type: String, required: true, unique: true, trim: true},
  category: {type: String, default: ''},
  title: {type: String, required: true, trim: true},
  desc: {type: String, default: ''},
  details: {type: String, default: ''},
  image: {type: String, default: ''},
  stack: {type: [String], default: []},
  results: {type: [String], default: []},
  order: {type: Number, default: 0},
  published: {type: Boolean, default: true},
}, {timestamps: true})

export const Project = mongoose.model('Project', projectSchema)
