import {useState} from 'react'
import {Link} from 'react-router-dom'
import {Button, Counter, Eyebrow, ProjectCard, Reveal, RotatingText, ServiceCard} from '../components/UI'
import HeroDeck from '../components/HeroDeck'
import {useCms} from '../cms'

const process = ['Analysis','Search','Development','Implementation','Delivery','Support']

export default function Home(){
  const [ti, setTi] = useState(0)
  const {serviceList, projects, testimonials, clients, site} = useCms()
  const words = (serviceList.length ? serviceList : [{title: 'SS Mobile'}]).map(s => s.title)
  const t = testimonials[ti] || {}
  const hero = site?.hero || {}

  return (
    <div>
      <section className="hero">
        <div className="hero-bg"><img src="/assets/india-office.jpg" alt=""/></div>
        <div className="hero-orbs" aria-hidden="true"/>
        <div className="container hero-grid">
          <Reveal>
            <Eyebrow>{hero.eyebrow || 'Indore · India'}</Eyebrow>
            <h1>{hero.title || 'Next-Gen Solutions For'}<br /><RotatingText words={words} /></h1>
            <p className="hero-copy">{hero.copy || 'SS Mobile builds AI, apps and web products for Indian startups, SMEs and enterprises — with IST delivery, UPI-ready flows and real business outcomes.'}</p>
            <div className="actions">
              <Button to="/services" arrow>Explore Our Services</Button>
              <Button to="/contact" ghost>Connect</Button>
            </div>
            <div className="hero-pills">
              {(hero.pills?.length ? hero.pills : ['120+ Indian projects', 'Indore HQ', 'UPI · GST · IST']).map(p => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="hero-visual">
            <HeroDeck/>
          </Reveal>
        </div>
      </section>

      <section className="logo-strip">
        <div className="marquee">
          <div className="marquee-track">
            {[...clients, ...clients].map((c, i) => <div className="logo-card" key={c + i}>{c}</div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <div>
              <Eyebrow>Portfolio</Eyebrow>
              <h2 className="section-title">Crafting success stories with digital solutions & stunning designs</h2>
            </div>
          </Reveal>
          <div className="grid grid-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProjectCard to={`/projects/${p.slug}`} category={p.category} title={p.title} desc={p.desc} image={p.image} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <Eyebrow>About agency</Eyebrow>
              <h2 className="section-title">Turning ideas into unforgettable digital moments for your brand</h2>
            </div>
            <Button to="/about" ghost>More about us</Button>
          </Reveal>
          <div className="grid grid-3">
            {[
              ['Your Success, Our Goal', 'Your growth fuels our passion. We deliver impactful digital solutions that elevate your brand.', '/assets/office.jpg'],
              ['Masters of Digital', 'Unleashing creativity to craft tailored digital solutions that spark measurable success.', '/assets/web.jpg'],
              ['Digital Frontier', 'Fueled by creativity and powered by technology, we transform brand connections.', '/assets/ai.jpg'],
              ['Clicks into Triumphs', 'We forge lasting partnerships and deliver strategies that spark real results.', '/assets/marketing.jpg'],
            ].map(([title, d, img], i) => (
              <Reveal key={title} delay={i * 80}>
                <article className="feature-card">
                  <img src={img} alt={title}/>
                  <span className="lime">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p className="muted">{d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <Eyebrow>Our services</Eyebrow>
              <h2 className="section-title">Digital services designed to amplify your brand</h2>
              <p className="section-copy">Discover how our digital services can elevate your brand, drive growth, and create lasting success.</p>
            </div>
            <Button to="/services" ghost>All services</Button>
          </Reveal>
          <div className="grid grid-3">
            {serviceList.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <Link to={`/services/${s.slug}`} className="plain-link">
                  <ServiceCard title={s.title} index={i} image={s.image}>{s.blurb}</ServiceCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mid-cta">
        <div className="container">
          <Reveal>
            <p>Let's make something great work together.</p>
            <Button to="/contact" arrow>Connect with us</Button>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <Eyebrow>Expertise</Eyebrow>
            <h2 className="section-title">Expertise that drives digital success</h2>
            <p className="section-copy">We combine product thinking, design and engineering so every release has a reason to exist.</p>
          </Reveal>
          <div className="stat-duo">
            <Reveal>
              <div className="big-stat">
                <strong>+<Counter to={60} suffix="%" /></strong>
                <span>By optimizing your website for search engines.</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="big-stat">
                <strong>+<Counter to={30} suffix="%" /></strong>
                <span>Rise in revenue as more visitors convert into paying customers.</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <Eyebrow>Why choose</Eyebrow>
              <h2 className="section-title">Leading the way to digital success</h2>
              <p className="section-copy">We go above and beyond so your needs are understood thoroughly. Creative strategies, tangible outcomes, quality and integrity.</p>
            </div>
          </Reveal>
          <div className="grid grid-3">
            {[
              ['Data-driven Approach', 'We use insights, trends and market data to build solutions that actually work.', '/assets/marketing.jpg'],
              ['Competitive Pricing', 'Premium delivery with fair pricing, without compromising quality or accuracy.', '/assets/ecommerce.jpg'],
              ['Ethical Business', 'Integrity, transparency and accountability sit at the center of every engagement.', '/assets/team.jpg'],
            ].map(([title, d, img], i) => (
              <Reveal key={title} delay={i * 90}>
                <article className="why-card">
                  <img src={img} alt={title}/>
                  <h3>{title}</h3>
                  <p>{d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <div>
              <Eyebrow>Our process</Eyebrow>
              <h2 className="section-title">Our tech-savvy process</h2>
              <p className="section-copy" style={{margin:'12px auto 0'}}>A flexible, time-driven delivery process. We hit deadlines with precision while fueling innovation at every stage.</p>
            </div>
          </Reveal>
          <div className="process">
            {process.map((s, i) => (
              <Reveal key={s} delay={i * 70}>
                <div className="step">
                  <div className="step-no">{String(i + 1).padStart(2, '0')}</div>
                  <h4>{s}</h4>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="join-band">
        <div className="container split">
          <Reveal>
            <Eyebrow>Join agency</Eyebrow>
            <h2 className="section-title">Join the team where ideas come to life</h2>
            <p className="section-copy">A community of builders where collaboration leads to better products and bigger possibilities.</p>
            <Button to="/careers" arrow>View Open Roles</Button>
          </Reveal>
          <Reveal delay={100}>
            <div className="join-visual">
              <img src="/assets/india-work.jpg" alt="SS Mobile team" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <Eyebrow>Features</Eyebrow>
              <h2 className="section-title">Smart features to power your digital success</h2>
            </div>
          </Reveal>
          <div className="grid grid-3">
            {[
              ['Custom branding solutions', 'Logos, color systems and brand collateral that stay in people’s minds.', '/assets/web.jpg'],
              ['Data-driven digital marketing', 'SEO, SMO, PPC and content strategies that drive targeted traffic.', '/assets/marketing.jpg'],
              ['Optimization management', 'Performance, reliability and security programs that keep products online.', '/assets/office.jpg'],
            ].map(([title, d, img], i) => (
              <Reveal key={title} delay={i * 80}>
                <article className="feature-card">
                  <img src={img} alt={title}/>
                  <h3>{title}</h3>
                  <p className="muted">{d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <Eyebrow>Testimonials</Eyebrow>
              <h2 className="section-title">Hear their stories: real experiences, real impact</h2>
            </div>
            <div className="rating-box">
              <strong>4.6</strong>
              <span>670+ Reviews</span>
            </div>
          </Reveal>
          <Reveal>
            <article className="quote-card">
              <p>“{t.quote}”</p>
              <div className="person">
                <span className="avatar">{(t.name || 'S').slice(0, 1)}</span>
                <div><strong>{t.name}</strong><small>{t.role}</small></div>
              </div>
              <div className="quote-nav">
                <button aria-label="Previous" onClick={() => setTi(i => testimonials.length ? (i - 1 + testimonials.length) % testimonials.length : 0)}>←</button>
                <button aria-label="Next" onClick={() => setTi(i => testimonials.length ? (i + 1) % testimonials.length : 0)}>→</button>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
