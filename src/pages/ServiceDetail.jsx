import {Link, Navigate, useParams} from 'react-router-dom'
import {Button, Eyebrow, Reveal, ServiceCard} from '../components/UI'
import {useCms} from '../cms'

export default function ServiceDetail(){
  const {slug} = useParams()
  const {serviceList, ready} = useCms()
  if (!ready) return null
  const item = serviceList.find(s => s.slug === slug)
  if (!item) return <Navigate to="/services" replace/>
  const others = serviceList.filter(s => s.slug !== slug).slice(0, 3)

  return (
    <div>
      <section className="page-hero">
        <img className="page-hero-bg" src={item.image} alt=""/>
        <div className="container">
          <Reveal>
            <Eyebrow>Services</Eyebrow>
            <h1>{item.title.split(' ').slice(0, -1).join(' ') || item.title} <span className="lime">{item.title.split(' ').slice(-1)}</span></h1>
            <p className="hero-copy">{item.blurb}</p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container detail-layout">
          <Reveal>
            <h2 className="section-title">What we deliver</h2>
            <p className="section-copy" style={{marginTop:18}}>{item.details}</p>
            <div className="detail-points">
              {item.points?.map(x => (
                <div className="check" key={x}><span className="check-dot">✓</span><strong>{x}</strong></div>
              ))}
            </div>
            <div className="actions" style={{justifyContent:'flex-start', marginTop:28}}>
              <Button to="/contact" arrow>Connect on this service</Button>
              <Button to="/services" ghost>All services</Button>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="detail-photo">
              <img src={item.image} alt={item.title}/>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <Eyebrow>More capabilities</Eyebrow>
              <h2 className="section-title">Related services</h2>
            </div>
          </Reveal>
          <div className="related-grid">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link to={`/services/${s.slug}`} className="plain-link">
                  <ServiceCard title={s.title} index={i} image={s.image}>{s.blurb}</ServiceCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
