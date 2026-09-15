import {Link} from 'react-router-dom'
import {BrandLogo, Button} from './UI'
import {useCms} from '../cms'

const links = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/projects', 'Projects'],
  ['/services', 'Services'],
  ['/careers', 'Careers'],
  ['/contact', 'Connect'],
]

const support = [
  ['/contact', 'Connect'],
  ['/contact', 'Privacy Policy'],
  ['/contact', 'Terms & Conditions'],
]

function Icon({d}){
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Footer(){
  const {office, serviceList} = useCms()
  const phone = office.phones?.[0] || ''
  const email = office.emails?.[0] || ''

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <p className="eyebrow">Let’s collaborate</p>
            <h2>Let’s build from India, for India.</h2>
          </div>
          <Button to="/contact" arrow>Get In Touch</Button>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <BrandLogo className="brand-img-footer" />
            <p>Indore-based product studio. We ship AI, mobile and web systems for Indian businesses.</p>
            <div className="footer-contact">
              <a href={phone ? `tel:${phone.replace(/\s/g,'')}` : '#'}>
                <Icon d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6.3 6.3l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7A2 2 0 0 1 22 16.9z"/>
                {phone}
              </a>
              <a href={`mailto:${email}`}>
                <Icon d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6"/>
                {email}
              </a>
              <span>
                <Icon d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11zM12 10.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                {office.address}
              </span>
            </div>
            <div className="socials footer-socials">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">fb</a>
            </div>
          </div>

          <div>
            <h4>Quick links</h4>
            <div className="footer-links">
              {links.map(([to, label]) => <Link key={label} to={to}>{label}</Link>)}
            </div>
          </div>

          <div>
            <h4>Services</h4>
            <div className="footer-links">
              {serviceList.slice(0, 6).map(s => <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>)}
            </div>
          </div>

          <div>
            <h4>Support</h4>
            <div className="footer-links">
              {support.map(([to, label]) => <Link key={label} to={to}>{label}</Link>)}
            </div>
          </div>
        </div>

        <div className="footer-news">
          <div>
            <h4>Subscribe</h4>
            <p>Studio notes and product updates from Indore. No spam.</p>
          </div>
          <form className="news-form" onSubmit={e => {e.preventDefault(); alert('Thanks for subscribing.')}}>
            <input type="email" placeholder="Email address" required aria-label="Email address"/>
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="copyright">
          <span>Copyright © 2026 SS Mobile, Indore. All rights reserved.</span>
          <span>AI • Apps • Web • IoT</span>
        </div>
      </div>
    </footer>
  )
}
