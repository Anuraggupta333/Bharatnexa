import {useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import {useCms} from '../cms'

export function BrandLogo({className=''}){
  return <img className={`brand-img ${className}`} src="/assets/ss-logo.png?v=3" alt="SS Mobile — AI, apps, web and IoT"/>
}

export function Eyebrow({children}){
  return <div className="eyebrow">{children}</div>
}

function useTilt(){
  const ref = useRef(null)
  const onMove = e => {
    const el = ref.current
    if (!el) return
    const b = el.getBoundingClientRect()
    const px = (e.clientX - b.left) / b.width
    const py = (e.clientY - b.top) / b.height
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 14}deg) translateZ(10px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)'
  }
  return {ref, onMove, onLeave}
}

export function ConnectBand(){
  const {office} = useCms()
  const phone = office.phones?.[0] || ''
  const tel = phone.replace(/\s/g,'')
  return (
    <section className="connect-band" id="connect">
      <div className="container connect-in">
        <div>
          <Eyebrow>Connect</Eyebrow>
          <h2>Let’s connect and build together.</h2>
          <p>Call, WhatsApp or write to the Indore studio. We reply in IST business hours.</p>
        </div>
        <div className="connect-actions">
          <a className="btn btn-primary" href={`tel:${tel}`}>Call {phone}</a>
          <a className="btn btn-ghost" href={`https://wa.me/${office.whatsapp || ''}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <Button to="/contact" arrow>Write to us</Button>
        </div>
      </div>
    </section>
  )
}

export function Button({to='#', children, ghost=false, arrow=false, onClick, type}){
  const cls = `btn ${ghost ? 'btn-ghost' : 'btn-primary'} ${arrow ? 'btn-with-arrow' : ''}`
  const arrowEl = arrow ? (
    <span className="btn-arrow" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  ) : null
  if (type === 'submit') {
    return <button className={cls} type="submit" onClick={onClick}>{children}{arrowEl}</button>
  }
  if (to.startsWith('http') || to.startsWith('mailto') || to.startsWith('tel')) {
    return <a className={cls} href={to} onClick={onClick}>{children}{arrowEl}</a>
  }
  return <Link className={cls} to={to} onClick={onClick}>{children}{arrowEl}</Link>
}

export function Reveal({children, className='', delay=0, from='up'}){
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const show = () => setOn(true)
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) show()
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) show() }, {threshold: 0.08, rootMargin: '40px'})
    io.observe(el)
    const t = setTimeout(show, 900)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [])
  return <div ref={ref} className={`reveal from-${from} ${on ? 'in' : ''} ${className}`} style={{transitionDelay: `${delay}ms`}}>{children}</div>
}

export function RotatingText({words, interval=2400}){
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!words?.length) return
    const t = setInterval(() => setI(v => (v + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words, interval])
  return <span key={words[i]} className="rotating-word">{words[i]}</span>
}

export function Counter({to, suffix='', prefix=''}){
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let started = false
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return
      started = true
      const start = performance.now()
      const dur = 1400
      const tick = now => {
        const p = Math.min(1, (now - start) / dur)
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, {threshold: 0.4})
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{prefix}{n}{suffix}</span>
}

export function ServiceCard({title, children, index=0, image}){
  const tilt = useTilt()
  return (
    <article className="service-card tilt-card" ref={tilt.ref} onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}>
      {image && <div className="card-photo"><img src={image} alt={title}/></div>}
      <div className="service-icon">{String(index + 1).padStart(2, '0')}</div>
      <h3>{title}</h3>
      <p>{children}</p>
      <span className="card-link">Learn more →</span>
    </article>
  )
}

export function ProjectCard({category, title, desc, image, to}){
  const tilt = useTilt()
  const card = (
    <article className="project-card tilt-card" ref={tilt.ref} onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}>
      <div className="project-visual">{image ? <img src={image} alt={title}/> : <span>{category.split(' · ')[0]}</span>}</div>
      <div className="project-copy"><small>{category}</small><h3>{title}</h3><p>{desc}</p></div>
    </article>
  )
  return to ? <Link to={to} className="plain-link">{card}</Link> : card
}

export function Tilt3D({children, className=''}){
  const tilt = useTilt()
  return <div className={className} ref={tilt.ref} onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}>{children}</div>
}
