import {Link} from 'react-router-dom'
import {Button, Eyebrow, Reveal, ServiceCard} from '../components/UI'
import {useCms} from '../cms'

export default function Services(){
  const {serviceList} = useCms()
  return (
    <div>
      <section className="page-hero">
        <img className="page-hero-bg" src="/assets/ai.jpg" alt=""/>
        <div className="container">
          <Reveal>
            <Eyebrow>Our services</Eyebrow>
            <h1>Digital services designed to <span className="lime">amplify your brand.</span></h1>
            <p className="hero-copy">Discover how our digital services can elevate your brand, drive growth, and create lasting success.</p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {serviceList.map((s, i) => (
              <Reveal key={s.slug} delay={(i%3)*70}>
                <Link to={`/services/${s.slug}`} className="plain-link">
                  <ServiceCard title={s.title} index={i} image={s.image}>{s.blurb}</ServiceCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container split">
          <Reveal>
            <Eyebrow>Staff augmentation</Eyebrow>
            <h2 className="section-title">Add the specialists you need.</h2>
            <p className="section-copy" style={{marginTop:18}}>Scale your delivery capacity with senior developers, designers, QA engineers or product specialists who integrate into your workflow.</p>
            <div className="checks">
              {['Flexible team sizes','Monthly or project engagements','Transparent delivery tracking'].map(x => (
                <div className="check" key={x}><span className="check-dot">✓</span><strong>{x}</strong></div>
              ))}
            </div>
            <Button to="/contact" arrow>Connect / hire a team</Button>
          </Reveal>
          <Reveal delay={100}>
            <div className="visual-panel">
              <img src="/assets/staff.jpg" alt="Engineering workspace"/>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
