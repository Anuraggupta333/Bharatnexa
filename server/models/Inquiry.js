import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema({
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  email: {type: String, required: true, trim: true},
  phone: {type: String, default: ''},
  city: {type: String, default: ''},
  message: {type: String, default: ''},
  read: {type: Boolean, default: false},
}, {timestamps: true})

export const Inquiry = mongoose.model('Inquiry', inquirySchema)
