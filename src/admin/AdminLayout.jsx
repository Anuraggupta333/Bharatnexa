import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import {api} from '../api'
import './admin.css'

const links = [
  ['/admin', 'Dashboard', true],
  ['/admin/services', 'Services'],
  ['/admin/projects', 'Projects'],
  ['/admin/jobs', 'Jobs'],
  ['/admin/testimonials', 'Testimonials'],
  ['/admin/clients', 'Clients'],
  ['/admin/inquiries', 'Inquiries'],
  ['/admin/settings', 'Site settings'],
]

export default function AdminLayout(){
  const navigate = useNavigate()
  const logout = async () => {
    await api.post('/api/auth/logout', {})
    navigate('/admin/login')
  }
  return (
    <div className="admin-root admin-shell">
      <aside className="admin-side">
        <div className="admin-brand">
          <img src="/assets/ss-logo.png" alt=""/>
          CMS
        </div>
        <nav className="admin-nav">
          {links.map(([to, label, end]) => (
            <NavLink key={to} to={to} end={!!end}>{label}</NavLink>
          ))}
          <button type="button" onClick={logout}>Logout</button>
        </nav>
      </aside>
      <div className="admin-main">
        <Outlet/>
      </div>
    </div>
  )
}
