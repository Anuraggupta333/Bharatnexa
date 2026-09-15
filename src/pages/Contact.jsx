import {useState} from 'react'
import {Button, Eyebrow, Reveal} from '../components/UI'
import {useCms} from '../cms'
import {api} from '../api'

export default function Contact(){
  const {office} = useCms()
  const phone = office.phones?.[0] || ''
  const tel = phone.replace(/\s/g,'')
  const [status, setStatus] = useState('')

  async function submit(e){
    e.preventDefault()
    const fd = new FormData(e.target)
    try {
      await api.post('/api/public/inquiries', {
        firstName: fd.get('firstName'),
        lastName: fd.get('lastName'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        city: fd.get('city'),
        message: fd.get('message'),
      })
      e.target.reset()
      setStatus('Dhanyavaad! Our Indore team will get back to you shortly.')
    } catch {
      setStatus('Could not send. Please call or WhatsApp us.')
    }
  }

  return (
    <div>
      <section className="page-hero">
        <img className="page-hero-bg" src="/assets/contact.jpg" alt=""/>
        <div className="container">
          <Reveal>
            <Eyebrow>Connect · {office.city}</Eyebrow>
            <h1>Let’s connect and make something <span className="lime">great together.</span></h1>
            <p className="hero-copy">Call, WhatsApp or write. The Indore studio replies in IST business hours.</p>
            <div className="connect-actions" style={{marginTop:24}}>
              <a className="btn btn-primary" href={`tel:${tel}`}>Call {phone}</a>
              <a className="btn btn-ghost" href={`https://wa.me/${office.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
              <a className="btn btn-ghost" href={`mailto:${office.emails?.[0] || ''}`}>Email</a>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <Reveal from="left">
            <Eyebrow>Start a conversation</Eyebrow>
            <h2 className="section-title">Tell us what you’re building.</h2>
            <p className="section-copy" style={{marginTop:18}}>Product strategy, UX/UI, mobile, web, AI and long-term support for Indian companies.</p>
            <div className="checks">
              <div className="check"><span className="check-dot">✉</span><div><strong>Email</strong><div className="muted">{(office.emails || []).join(' · ')}</div></div></div>
              <div className="check"><span className="check-dot">☎</span><div><strong>Phone</strong><div className="muted">{(office.phones || []).join(' · ')}</div></div></div>
              <div className="check"><span className="check-dot">⌖</span><div><strong>Office</strong><div className="muted">{office.address}</div></div></div>
            </div>
            <div className="visual-panel" style={{minHeight:220,marginTop:24}}>
              <img src="/assets/india-office.jpg" alt="SS Mobile Indore office"/>
            </div>
          </Reveal>
          <Reveal delay={100} from="right">
            <form className="form card-form" onSubmit={submit}>
              <input name="firstName" placeholder="First Name" required/>
              <input name="lastName" placeholder="Last Name" required/>
              <input name="email" type="email" placeholder="Email" required/>
              <input name="phone" placeholder="Phone"/>
              <input name="city" placeholder="City (e.g. Indore, Pune, Bengaluru)"/>
              <textarea name="message" placeholder="Tell us about your project"/>
              <div className="notice">We’ll use these details only to respond to your enquiry.</div>
              {status && <div className="notice">{status}</div>}
              <Button type="submit" arrow>Connect with us</Button>
            </form>
          </Reveal>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <Eyebrow>Visit</Eyebrow>
              <h2 className="section-title">The studio in Vijay Nagar.</h2>
            </div>
            <Button to={`https://wa.me/${office.whatsapp || ''}`} ghost>WhatsApp the team</Button>
          </Reveal>
          <div className="grid grid-2">
            <Reveal>
              <div className="visual-panel"><img src="/assets/india-work.jpg" alt="Inside the Indore studio"/></div>
            </Reveal>
            <Reveal delay={80}>
              <div className="visual-panel"><img src="/assets/contact.jpg" alt="Connect with SS Mobile"/></div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
