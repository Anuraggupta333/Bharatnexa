import {Button, Eyebrow, Reveal} from '../components/UI'
import {useCms} from '../cms'

export default function About(){
  const {site} = useCms()
  const about = site?.about || {}
  const values = about.values?.length
    ? about.values.map(v => [v.title, v.text, v.image])
    : [
      ['Own the outcome','We care about the business result, not only the deliverable.','/assets/office.jpg'],
      ['Be clear','Simple communication creates better decisions and faster delivery.','/assets/web.jpg'],
      ['Keep learning','Technology changes quickly; our craft keeps moving with it.','/assets/ai.jpg'],
      ['Build trust','Reliable systems and reliable relationships are equally important.','/assets/team.jpg'],
    ]
  return (
    <div>
      <section className="page-hero">
        <img className="page-hero-bg" src="/assets/office.jpg" alt=""/>
        <div className="container">
          <Reveal>
            <Eyebrow>About SS Mobile</Eyebrow>
            <h1>Turning ideas into unforgettable <span className="lime">digital moments.</span></h1>
            <p className="hero-copy">SS Mobile is an Indore-based digital engineering studio. We help Indian businesses turn messy operations into software, apps and connected systems they can actually run.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="section-title">{about.headline || 'A technology partner, not just a vendor.'}</h2>
            <p className="section-copy" style={{marginTop:18}}>{about.copy || 'Founded in 2019 in Vijay Nagar, Indore, we combine product thinking, engineering and design. Clients come for a website or an app and stay because we own the outcome — UPI flows, GST invoices, IST standups and support after launch.'}</p>
            <div className="checks">
              {['Business-first discovery in your language','Product-minded engineering','Senior ownership from kickoff','Long-term support after launch'].map(x => (
                <div className="check" key={x}><span className="check-dot">✓</span><strong>{x}</strong></div>
              ))}
            </div>
            <Button to="/contact" arrow>Connect with the studio</Button>
          </Reveal>
          <Reveal delay={120}>
            <div className="visual-panel">
              <img src="/assets/india-work.jpg" alt="SS Mobile team at work"/>
              <div className="floating-stat one"><strong>2019</strong><span>Founded in Indore</span></div>
              <div className="floating-stat two"><strong>35+</strong><span>Specialists</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <Reveal>
            <div className="visual-panel">
              <img src="/assets/india-founder.jpg" alt="Studio leadership"/>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="section-title">Built in Indore, shipping across India.</h2>
            <p className="section-copy" style={{marginTop:18}}>Our founders still sit with engineers and designers. That means scope stays honest, demos are real, and you are not handed off to a rotating account team after the first invoice.</p>
            <p className="section-copy">We work with startups, SMEs and enterprise IT groups in Mumbai, Pune, Bengaluru, Delhi NCR and across Madhya Pradesh.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head"><div><Eyebrow>Studio</Eyebrow><h2 className="section-title">People behind the work.</h2></div></Reveal>
          <div className="grid grid-3">
            {[
              ['Product & design', 'Flows, brand systems and prototypes that Indian users understand on the first tap.', '/assets/india-team.jpg'],
              ['Engineering', 'Mobile, web, AI and IoT — written to survive real networks and real operators.', '/assets/india-dev.jpg'],
              ['Delivery', 'IST standups, weekly demos and a single owner who stays on the project.', '/assets/team.jpg'],
            ].map(([t,d,img],i) => (
              <Reveal key={t} delay={i*80}>
                <article className="feature-card">
                  <img src={img} alt={t}/>
                  <span className="lime">0{i+1}</span>
                  <h3>{t}</h3>
                  <p className="muted">{d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal className="section-head"><div><Eyebrow>Our values</Eyebrow><h2 className="section-title">How we work.</h2></div></Reveal>
          <div className="grid grid-3">
            {values.map(([t,d,img],i) => (
              <Reveal key={t} delay={i*80}>
                <article className="feature-card"><img src={img} alt={t}/><span className="lime">0{i+1}</span><h3>{t}</h3><p className="muted">{d}</p></article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
