import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  slug: {type: String, required: true, unique: true, trim: true},
  title: {type: String, required: true, trim: true},
  blurb: {type: String, default: ''},
  details: {type: String, default: ''},
  image: {type: String, default: ''},
  points: {type: [String], default: []},
  order: {type: Number, default: 0},
  published: {type: Boolean, default: true},
}, {timestamps: true})

export const Service = mongoose.model('Service', serviceSchema)
