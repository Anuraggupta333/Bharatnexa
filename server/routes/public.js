import {Router} from 'express'
import * as services from '../controllers/serviceController.js'
import * as projects from '../controllers/projectController.js'
import * as jobs from '../controllers/jobController.js'
import * as testimonials from '../controllers/testimonialController.js'
import * as clients from '../controllers/clientController.js'
import * as settings from '../controllers/settingsController.js'
import * as inquiries from '../controllers/inquiryController.js'

const router = Router()
router.get('/site', settings.getPublic)
router.get('/services', services.publicList)
router.get('/services/:slug', services.publicBySlug)
router.get('/projects', projects.publicList)
router.get('/projects/:slug', projects.publicBySlug)
router.get('/jobs', jobs.publicList)
router.get('/testimonials', testimonials.publicList)
router.get('/clients', clients.publicList)
router.post('/inquiries', inquiries.create)
export default router
