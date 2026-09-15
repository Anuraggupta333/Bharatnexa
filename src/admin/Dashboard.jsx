import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {api} from '../api'

export default function Dashboard(){
  const [data, setData] = useState(null)
  useEffect(() => { api.get('/api/admin/stats').then(setData).catch(() => setData({})) }, [])
  if (!data) return <p className="admin-muted">Loading…</p>
  const cards = [
    ['Services', data.services],
    ['Projects', data.projects],
    ['Jobs', data.jobs],
    ['Testimonials', data.testimonials],
    ['Clients', data.clients],
    ['Inquiries', data.inquiries],
    ['Unread', data.unread],
  ]
  return (
    <div>
      <div className="admin-top">
        <h1>Dashboard</h1>
        <Link className="admin-btn ghost" to="/" target="_blank" rel="noreferrer">View site</Link>
      </div>
      <div className="admin-stats">
        {cards.map(([k, v]) => (
          <div className="admin-stat" key={k}><strong>{v ?? 0}</strong><span>{k}</span></div>
        ))}
      </div>
      <h2 style={{fontSize:18}}>Recent inquiries</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>When</th></tr></thead>
          <tbody>
            {(data.recent || []).map(i => (
              <tr key={i._id}>
                <td>{i.firstName} {i.lastName}</td>
                <td>{i.email}</td>
                <td>{new Date(i.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {!(data.recent || []).length && <tr><td colSpan={3}>No inquiries yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
