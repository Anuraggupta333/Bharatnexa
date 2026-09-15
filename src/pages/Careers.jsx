import {Button, Eyebrow, Reveal} from '../components/UI'
import {useCms} from '../cms'

const perks = [
  ['Indore HQ + remote', 'Work from Sapphire Plaza or from anywhere in India with IST overlap.', '/assets/india-office.jpg'],
  ['Real products', 'Shipping to users — kiranas, clinics, plants — not only pitch decks.', '/assets/india-dev.jpg'],
  ['Mentorship', 'Sit with seniors who still write code and review design.', '/assets/india-work.jpg'],
  ['Growth', 'Learning budget, conference days and room to own a module.', '/assets/careers.jpg'],
]

export default function Careers(){
  const {jobs} = useCms()
  return (
    <div>
      <section className="page-hero">
        <img className="page-hero-bg" src="/assets/careers.jpg" alt=""/>
        <div className="container">
          <Reveal>
            <Eyebrow>Join the studio</Eyebrow>
            <h1>Join the team where <span className="lime">ideas come to life.</span></h1>
            <p className="hero-copy">Work from Indore HQ or remote across India. IST hours, real products, senior mentorship.</p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <Reveal>
            <Eyebrow>Culture</Eyebrow>
            <h2 className="section-title">Smart people. Honest collaboration.</h2>
            <p className="section-copy" style={{marginTop:18}}>Connect, share insights, and grow with other builders in a studio that ships. We keep teams small, feedback direct, and the work close to the customer.</p>
            <Button to="/contact" arrow>Connect / send resume</Button>
          </Reveal>
          <Reveal delay={100}>
            <div className="visual-panel"><img src="/assets/india-office.jpg" alt="Team culture in Indore"/></div>
          </Reveal>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head"><div><Eyebrow>Life here</Eyebrow><h2 className="section-title">Why people stay.</h2></div></Reveal>
          <div className="grid grid-3">
            {perks.map(([t,d,img],i) => (
              <Reveal key={t} delay={i*70}>
                <article className="feature-card">
                  <img src={img} alt={t}/>
                  <h3>{t}</h3>
                  <p className="muted">{d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Reveal className="section-head"><div><Eyebrow>Open roles</Eyebrow><h2 className="section-title">Find your next challenge.</h2></div></Reveal>
          <div className="grid grid-3">
            {jobs.map((job, i) => (
              <Reveal key={job._id || job.title} delay={i*70}>
                <article className="service-card">
                  <div className="card-photo"><img src={job.image} alt={job.title}/></div>
                  <div className="service-icon">OPEN</div>
                  <h3>{job.title}</h3>
                  <p>{job.desc}</p>
                  <Button to="/contact" ghost>Connect & apply</Button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
