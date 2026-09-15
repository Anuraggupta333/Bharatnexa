import {useEffect, useState} from 'react'
import {api} from '../api'

export default function Inquiries(){
  const [items, setItems] = useState([])
  const load = () => api.get('/api/admin/inquiries').then(setItems)
  useEffect(() => { load() }, [])

  const read = async id => {
    await api.patch(`/api/admin/inquiries/${id}/read`)
    load()
  }
  const remove = async id => {
    if (!confirm('Delete this inquiry?')) return
    await api.del(`/api/admin/inquiries/${id}`)
    load()
  }

  return (
    <div>
      <div className="admin-top"><h1>Inquiries</h1></div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>City</th><th>Message</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i._id}>
                <td>{i.firstName} {i.lastName}</td>
                <td>{i.email}</td>
                <td>{i.phone}</td>
                <td>{i.city}</td>
                <td>{i.message}</td>
                <td>{i.read ? 'Read' : 'New'}</td>
                <td className="admin-actions">
                  {!i.read && <button className="admin-btn ghost" type="button" onClick={() => read(i._id)}>Mark read</button>}
                  <button className="admin-btn danger" type="button" onClick={() => remove(i._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan={7}>No inquiries</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
