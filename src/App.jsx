import {useCallback, useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {CmsProvider} from './cms'
import Layout from './components/Layout'
import BootLoader from './components/BootLoader'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import AdminLayout from './admin/AdminLayout'
import {RequireAuth} from './admin/RequireAuth'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'
import {ServicesAdmin, ProjectsAdmin, JobsAdmin, TestimonialsAdmin, ClientsAdmin} from './admin/ResourcePage'
import Inquiries from './admin/Inquiries'
import Settings from './admin/Settings'

export default function App(){
  const [ready, setReady] = useState(false)
  const finish = useCallback(() => setReady(true), [])

  const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')

  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) setReady(true)
  }, [])

  return (
    <>
      {!ready && !isAdmin && <BootLoader onDone={finish}/>}
      <CmsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/login" element={<Login/>}/>
            <Route path="/admin" element={<RequireAuth><AdminLayout/></RequireAuth>}>
              <Route index element={<Dashboard/>}/>
              <Route path="services" element={<ServicesAdmin/>}/>
              <Route path="projects" element={<ProjectsAdmin/>}/>
              <Route path="jobs" element={<JobsAdmin/>}/>
              <Route path="testimonials" element={<TestimonialsAdmin/>}/>
              <Route path="clients" element={<ClientsAdmin/>}/>
              <Route path="inquiries" element={<Inquiries/>}/>
              <Route path="settings" element={<Settings/>}/>
            </Route>
            <Route element={<Layout/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/services" element={<Services/>}/>
              <Route path="/services/:slug" element={<ServiceDetail/>}/>
              <Route path="/projects" element={<Projects/>}/>
              <Route path="/projects/:slug" element={<ProjectDetail/>}/>
              <Route path="/careers" element={<Careers/>}/>
              <Route path="/contact" element={<Contact/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </CmsProvider>
    </>
  )
}
