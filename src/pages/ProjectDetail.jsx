import {Navigate, useParams} from 'react-router-dom'
import {Button, Eyebrow, ProjectCard, Reveal} from '../components/UI'
import {useCms} from '../cms'

export default function ProjectDetail(){
  const {slug} = useParams()
  const {projects, ready} = useCms()
  if (!ready) return null
  const item = projects.find(p => p.slug === slug)
  if (!item) return <Navigate to="/projects" replace/>
  const others = projects.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <div>
      <section className="page-hero">
        <img className="page-hero-bg" src={item.image} alt=""/>
        <div className="container">
          <Reveal>
            <Eyebrow>{item.category}</Eyebrow>
            <h1>{item.title}</h1>
            <p className="hero-copy">{item.desc}</p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container detail-layout">
          <Reveal>
            <h2 className="section-title">The brief</h2>
            <p className="section-copy" style={{marginTop:18}}>{item.details}</p>
            <div className="chip-row">
              {item.stack?.map(x => <span className="chip" key={x}>{x}</span>)}
            </div>
            <div className="detail-points">
              {item.results?.map(x => (
                <div className="check" key={x}><span className="check-dot">✓</span><strong>{x}</strong></div>
              ))}
            </div>
            <div className="actions" style={{justifyContent:'flex-start', marginTop:28}}>
              <Button to="/contact" arrow>Start a similar project</Button>
              <Button to="/projects" ghost>All projects</Button>
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
              <Eyebrow>More work</Eyebrow>
              <h2 className="section-title">Related projects</h2>
            </div>
          </Reveal>
          <div className="related-grid">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard to={`/projects/${p.slug}`} category={p.category} title={p.title} desc={p.desc} image={p.image}/>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
