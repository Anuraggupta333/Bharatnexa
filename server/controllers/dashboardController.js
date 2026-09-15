import {Service} from '../models/Service.js'
import {Project} from '../models/Project.js'
import {Job} from '../models/Job.js'
import {Testimonial} from '../models/Testimonial.js'
import {Client} from '../models/Client.js'
import {Inquiry} from '../models/Inquiry.js'

export async function stats(_req, res){
  const [services, projects, jobs, testimonials, clients, inquiries, unread] = await Promise.all([
    Service.countDocuments(),
    Project.countDocuments(),
    Job.countDocuments(),
    Testimonial.countDocuments(),
    Client.countDocuments(),
    Inquiry.countDocuments(),
    Inquiry.countDocuments({read: false}),
  ])
  const recent = await Inquiry.find().sort({createdAt: -1}).limit(6)
  res.json({services, projects, jobs, testimonials, clients, inquiries, unread, recent})
}
