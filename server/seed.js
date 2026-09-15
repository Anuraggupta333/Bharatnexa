import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import {User} from './models/User.js'
import {Service} from './models/Service.js'
import {Project} from './models/Project.js'
import {Job} from './models/Job.js'
import {Testimonial} from './models/Testimonial.js'
import {Client} from './models/Client.js'
import {SiteSettings} from './models/SiteSettings.js'
import {office, serviceList, projects, testimonials, clients} from '../src/data.js'

const jobs = [
  {title: 'Senior React Developer', desc: 'Build modular interfaces and product experiences across web platforms.', image: '/assets/web.jpg'},
  {title: 'Node.js Developer', desc: 'Design secure APIs, integrations and scalable backend services.', image: '/assets/hero-code.jpg'},
  {title: 'UI/UX Designer', desc: 'Shape intuitive product flows, design systems and prototypes.', image: '/assets/india-team.jpg'},
  {title: 'Business Development', desc: 'Build relationships and turn business needs into technology opportunities.', image: '/assets/india-office.jpg'},
]

export async function seedContent(){
  const email = (process.env.ADMIN_EMAIL || 'admin@ss-technologies.com').toLowerCase()
  const password = process.env.ADMIN_PASSWORD || 'Admin@123'
  const passwordHash = await bcrypt.hash(password, 10)
  await User.findOneAndUpdate({email}, {email, passwordHash}, {upsert: true})

  if (await Service.countDocuments() === 0) {
    await Service.insertMany(serviceList.map((s, i) => ({...s, order: i, published: true})))
  }
  if (await Project.countDocuments() === 0) {
    await Project.insertMany(projects.map((p, i) => ({...p, order: i, published: true})))
  }
  if (await Job.countDocuments() === 0) {
    await Job.insertMany(jobs.map((j, i) => ({...j, order: i, published: true})))
  }
  if (await Testimonial.countDocuments() === 0) {
    await Testimonial.insertMany(testimonials.map(([name, role, quote], i) => ({name, role, quote, order: i, published: true})))
  }
  if (await Client.countDocuments() === 0) {
    await Client.insertMany(clients.map((name, i) => ({name, order: i})))
  }
  if (await SiteSettings.countDocuments() === 0) {
    await SiteSettings.create({
      office,
      hero: {
        eyebrow: 'Indore · India',
        title: 'Next-Gen Solutions For',
        copy: 'SS Mobile builds AI, apps and web products for Indian startups, SMEs and enterprises — with IST delivery, UPI-ready flows and real business outcomes.',
        pills: ['120+ Indian projects', 'Indore HQ', 'UPI · GST · IST'],
      },
      about: {
        headline: 'A technology partner, not just a vendor.',
        copy: 'Founded in 2019 in Vijay Nagar, Indore, we combine product thinking, engineering and design.',
        values: [
          {title: 'Own the outcome', text: 'We care about the business result, not only the deliverable.', image: '/assets/office.jpg'},
          {title: 'Be clear', text: 'Simple communication creates better decisions and faster delivery.', image: '/assets/web.jpg'},
          {title: 'Keep learning', text: 'Technology changes quickly; our craft keeps moving with it.', image: '/assets/ai.jpg'},
          {title: 'Build trust', text: 'Reliable systems and reliable relationships are equally important.', image: '/assets/team.jpg'},
        ],
      },
    })
  }

  console.log(`CMS ready. Admin login: ${email}`)
}

const isCli = process.argv[1] && pathToFile(process.argv[1]).endsWith('seed.js')

function pathToFile(p){
  return p.replace(/\\/g, '/')
}

if (isCli) {
  const {loadEnv} = await import('./config/env.js')
  loadEnv()
  const {connectDb} = await import('./config/db.js')
  try {
    await connectDb()
    await seedContent()
  } catch (err) {
    console.error('Seed failed:', err.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
    if (globalThis.__embeddedMongo) await globalThis.__embeddedMongo.stop()
  }
}
