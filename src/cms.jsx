import {createContext, useContext, useEffect, useState} from 'react'
import {office as officeFb, serviceList as servicesFb, projects as projectsFb, testimonials as quotesFb, clients as clientsFb} from './data'

const jobsFb = [
  {title: 'Senior React Developer', desc: 'Build modular interfaces and product experiences across web platforms.', image: '/assets/web.jpg'},
  {title: 'Node.js Developer', desc: 'Design secure APIs, integrations and scalable backend services.', image: '/assets/hero-code.jpg'},
  {title: 'UI/UX Designer', desc: 'Shape intuitive product flows, design systems and prototypes.', image: '/assets/india-team.jpg'},
  {title: 'Business Development', desc: 'Build relationships and turn business needs into technology opportunities.', image: '/assets/india-office.jpg'},
]

const CmsContext = createContext(null)

async function getJson(url){
  const res = await fetch(url)
  if (!res.ok) throw new Error('fail')
  return res.json()
}

export function CmsProvider({children}){
  const [cms, setCms] = useState({
    office: officeFb,
    site: {office: officeFb, hero: {}, about: {}},
    serviceList: servicesFb,
    projects: projectsFb,
    jobs: jobsFb,
    testimonials: quotesFb.map(([name, role, quote]) => ({name, role, quote})),
    clients: clientsFb,
    ready: false,
  })

  useEffect(() => {
    Promise.all([
      getJson('/api/public/site'),
      getJson('/api/public/services'),
      getJson('/api/public/projects'),
      getJson('/api/public/jobs'),
      getJson('/api/public/testimonials'),
      getJson('/api/public/clients'),
    ]).then(([site, services, projects, jobs, testimonials, clients]) => {
      setCms({
        office: site?.office?.city ? site.office : officeFb,
        site: site || {},
        serviceList: services?.length ? services : servicesFb,
        projects: projects?.length ? projects : projectsFb,
        jobs: jobs?.length ? jobs : jobsFb,
        testimonials: testimonials?.length ? testimonials : quotesFb.map(([name, role, quote]) => ({name, role, quote})),
        clients: clients?.length ? clients.map(c => c.name || c) : clientsFb,
        ready: true,
      })
    }).catch(() => setCms(c => ({...c, ready: true})))
  }, [])

  return <CmsContext.Provider value={cms}>{children}</CmsContext.Provider>
}

export function useCms(){
  return useContext(CmsContext)
}
