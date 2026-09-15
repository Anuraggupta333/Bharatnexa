import {Button, Eyebrow, ProjectCard, Reveal} from '../components/UI'
import {useCms} from '../cms'

export default function Projects(){
  const {projects} = useCms()
  return (
    <div>
      <section className="page-hero">
        <img className="page-hero-bg" src="/assets/project-1.jpg" alt=""/>
        <div className="container">
          <Reveal>
            <Eyebrow>Portfolio</Eyebrow>
            <h1>Crafting success stories with <span className="lime">digital solutions.</span></h1>
            <p className="hero-copy">A snapshot of the products, platforms and industries we design and engineer.</p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i%3)*80}>
                <ProjectCard to={`/projects/${p.slug}`} category={p.category} title={p.title} desc={p.desc} image={p.image}/>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="mid-cta">
        <div className="container">
          <Reveal>
            <p>Have a challenge worth solving?</p>
            <Button to="/contact" arrow>Connect / discuss</Button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
