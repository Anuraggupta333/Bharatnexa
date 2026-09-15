import {Router} from 'express'
import {auth} from '../middleware/auth.js'
import {upload} from '../middleware/upload.js'
import {stats} from '../controllers/dashboardController.js'
import * as services from '../controllers/serviceController.js'
import * as projects from '../controllers/projectController.js'
import * as jobs from '../controllers/jobController.js'
import * as testimonials from '../controllers/testimonialController.js'
import * as clients from '../controllers/clientController.js'
import * as settings from '../controllers/settingsController.js'
import * as inquiries from '../controllers/inquiryController.js'

const router = Router()
router.use(auth)

router.get('/stats', stats)
router.get('/settings', settings.getAdmin)
router.put('/settings', settings.update)

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({error: 'No file'})
  res.json({url: `/uploads/${req.file.filename}`})
})

function resource(path, c){
  router.get(path, c.list)
  router.post(path, c.create)
  router.get(`${path}/:id`, c.get)
  router.put(`${path}/:id`, c.update)
  router.delete(`${path}/:id`, c.remove)
}

resource('/services', services)
resource('/projects', projects)
resource('/jobs', jobs)
resource('/testimonials', testimonials)
resource('/clients', clients)

router.get('/inquiries', inquiries.list)
router.patch('/inquiries/:id/read', inquiries.markRead)
router.delete('/inquiries/:id', inquiries.remove)

export default router
