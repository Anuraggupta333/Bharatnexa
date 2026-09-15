import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  title: {type: String, required: true, trim: true},
  desc: {type: String, default: ''},
  image: {type: String, default: ''},
  order: {type: Number, default: 0},
  published: {type: Boolean, default: true},
}, {timestamps: true})

export const Job = mongoose.model('Job', jobSchema)
