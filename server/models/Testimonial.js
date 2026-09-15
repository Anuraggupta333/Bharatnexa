import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  role: {type: String, default: ''},
  quote: {type: String, default: ''},
  order: {type: Number, default: 0},
  published: {type: Boolean, default: true},
}, {timestamps: true})

export const Testimonial = mongoose.model('Testimonial', testimonialSchema)
