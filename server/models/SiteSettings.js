import mongoose from 'mongoose'

const siteSettingsSchema = new mongoose.Schema({
  office: {
    city: {type: String, default: ''},
    address: {type: String, default: ''},
    phones: {type: [String], default: []},
    emails: {type: [String], default: []},
    whatsapp: {type: String, default: ''},
  },
  hero: {
    eyebrow: {type: String, default: ''},
    title: {type: String, default: ''},
    copy: {type: String, default: ''},
    pills: {type: [String], default: []},
  },
  about: {
    headline: {type: String, default: ''},
    copy: {type: String, default: ''},
    values: {type: [{title: String, text: String, image: String}], default: []},
  },
}, {timestamps: true})

export const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema)
