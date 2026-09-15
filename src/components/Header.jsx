import {NavLink, Link, useNavigate} from 'react-router-dom'
import {useEffect, useRef, useState} from 'react'
import {BrandLogo} from './UI'
import {useCms} from '../cms'

function Ico({children}){
  return (
    <svg className="nav-ico" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  )
}

const s = {stroke:'currentColor', strokeWidth:1.7, strokeLinecap:'round', strokeLinejoin:'round'}

function HomeIco(){
  return (
    <Ico>
      <path d="M3 11.2 L12 4 l9 7.2" {...s}/>
      <path d="M5.5 10.8 V20 h5 v-6 h3 v6 h5 V10.8" {...s}/>
    </Ico>
  )
}
function AboutIco(){
  return (
    <Ico>
      <circle cx="12" cy="8" r="3.3" {...s}/>
      <path d="M5 20c1.2-3.5 3.6-5.2 7-5.2S17.8 16.5 19 20" {...s}/>
    </Ico>
  )
}
function ProjectsIco(){
  return (
    <Ico>
      <rect x="3.5" y="4" width="7" height="7" rx="1.2" {...s}/>
      <rect x="13.5" y="4" width="7" height="4.4" rx="1.2" {...s}/>
      <rect x="13.5" y="11" width="7" height="9" rx="1.2" {...s}/>
      <rect x="3.5" y="13.4" width="7" height="6.6" rx="1.2" {...s}/>
    </Ico>
  )
}
function ServicesIco(){
  return (
    <Ico>
      <path d="M12 3.2l1.55 5.15 L18.8 10 l-5.25 1.55 L12 16.8 l-1.55-5.25 L5.2 10 l5.25-1.65z" {...s}/>
      <path d="M18.2 16.2l.55 1.85 1.85.55-1.85.55-.55 1.85-.55-1.85-1.85-.55 1.85-.55z" {...s}/>
    </Ico>
  )
}
function CareersIco(){
  return (
    <Ico>
      <rect x="3.4" y="8" width="17.2" height="11.5" rx="2" {...s}/>
      <path d="M8.2 8 V6.4 A2 2 0 0 1 10.2 4.5 h3.6 A2 2 0 0 1 15.8 6.4 V8" {...s}/>
      <path d="M3.4 13.2 h17.2" {...s}/>
    </Ico>
  )
}
function ConnectIco(){
  return (
    <Ico>
      <path d="M10 13.5a4.2 4.2 0 0 0 6 0l1.2-1.2a4.2 4.2 0 1 0-6-6L10 7.5" {...s}/>
      <path d="M14 10.5a4.2 4.2 0 0 0-6 0L6.8 11.7a4.2 4.2 0 1 0 6 6L14 16.5" {...s}/>
    </Ico>
  )
}

function Chevron(){
  return (
    <svg className="nav-chevron" width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 4.5 L6 8.5 L10 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function Item({to, end, label, icon, onClick}){
  return (
    <NavLink to={to} end={end} onClick={onClick} className="nav-item" aria-label={label}>
      {icon}
      <span className="nav-label">{label}</span>
    </NavLink>
  )
}

export default function Header(){
  const {serviceList} = useCms()
  const [open, setOpen] = useState(false)
  const [svc, setSvc] = useState(false)
  const [search, setSearch] = useState(false)
  const [q, setQ] = useState('')
  const [on, setOn] = useState(false)
  const dropTimer = useRef(null)
  const navigate = useNavigate()

  const openDrop = () => {
    clearTimeout(dropTimer.current)
    setSvc(true)
  }
  const closeDrop = () => {
    clearTimeout(dropTimer.current)
    dropTimer.current = setTimeout(() => setSvc(false), 220)
  }

  useEffect(() => {
    const sync = () => setOn(window.scrollY > 56)
    sync()
    window.addEventListener('scroll', sync, {passive: true})
    return () => {
      window.removeEventListener('scroll', sync)
      clearTimeout(dropTimer.current)
    }
  }, [])

  const close = () => {
    setOpen(false)
    setSvc(false)
    clearTimeout(dropTimer.current)
  }
  const visible = on || open || search

  const submitSearch = e => {
    e.preventDefault()
    const s = q.trim().toLowerCase()
    const map = [
      ['home', '/'], ['about', '/about'], ['company', '/about'],
      ['project', '/projects'], ['service', '/services'],
      ['career', '/careers'], ['contact', '/contact'], ['connect', '/contact'], ['quote', '/contact'],
    ]
    const hit = map.find(([k]) => s.includes(k) || k.includes(s))
    navigate(hit ? hit[1] : '/contact')
    setSearch(false)
    setQ('')
    close()
  }

  return (
    <header className={`site-header ${visible ? 'is-on' : ''} ${on ? 'has-edge' : ''}`}>
      <div className="header-bar">
        <div className="container nav-in">
          <NavLink className="brand" to="/" onClick={close}>
            <BrandLogo />
          </NavLink>

          <nav className={`navlinks ${open ? 'open' : ''}`}>
            <Item to="/" end label="Home" icon={<HomeIco/>} onClick={close}/>
            <Item to="/about" label="About Us" icon={<AboutIco/>} onClick={close}/>
            <Item to="/projects" label="Projects" icon={<ProjectsIco/>} onClick={close}/>
            <div
              className={`has-drop ${svc ? 'show' : ''}`}
              onMouseEnter={openDrop}
              onMouseLeave={closeDrop}
              onFocus={openDrop}
            >
              <button
                className="drop-btn nav-item"
                onClick={() => setSvc(v => !v)}
                aria-label="Services"
                aria-expanded={svc}
              >
                <ServicesIco/>
                <span className="nav-label">Services</span>
                <Chevron/>
              </button>
              <div className="dropdown" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                {serviceList.map((item, i) => (
                  <Link
                    key={item.slug}
                    to={`/services/${item.slug}`}
                    onClick={close}
                    className="drop-card"
                    style={{'--i': i}}
                  >
                    <img src={item.image} alt=""/>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.blurb}</small>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <Item to="/careers" label="Careers" icon={<CareersIco/>} onClick={close}/>
            <Item to="/contact" label="Connect" icon={<ConnectIco/>} onClick={close}/>
          </nav>

          <div className="header-tools">
            <button
              className={`icon-btn ${search ? 'on' : ''}`}
              aria-label="Search"
              onClick={() => setSearch(v => !v)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7"/>
                <path d="M16 16 L21 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
            </button>
            <Link className="nav-cta" to="/contact" onClick={close}>Connect</Link>
            <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen(v => !v)}>{open ? '✕' : '☰'}</button>
          </div>
        </div>

        {search && (
          <form className="header-search" onSubmit={submitSearch}>
            <div className="container">
              <input
                autoFocus
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search pages, services, projects…"
                aria-label="Search"
              />
              <button type="submit">Go</button>
            </div>
          </form>
        )}
      </div>

      <svg className="header-edge" viewBox="0 0 1440 20" preserveAspectRatio="none" aria-hidden="true">
        <path className="edge-fill" d="M0 0 H1440 V4 H1360 L1328 16 H112 L80 4 H0 Z"/>
        <path className="edge-line" d="M0 4 H80 L112 16 H1328 L1360 4 H1440"/>
      </svg>
    </header>
  )
}
