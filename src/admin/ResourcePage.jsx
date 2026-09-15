import {useEffect, useState} from 'react'
import {api} from '../api'

function slugify(s){
  return String(s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function parseList(v){
  return String(v || '').split('\n').map(x => x.trim()).filter(Boolean)
}

export default function ResourcePage({title, path, fields, columns}){
  const [items, setItems] = useState([])
  const [edit, setEdit] = useState(null)
  const [error, setError] = useState('')

  const load = () => api.get(`/api/admin/${path}`).then(setItems)

  useEffect(() => { load() }, [path])

  const startNew = () => {
    const blank = {}
    fields.forEach(f => { blank[f.key] = f.type === 'check' ? true : f.type === 'number' ? 0 : '' })
    setEdit(blank)
  }

  const save = async e => {
    e.preventDefault()
    setError('')
    const body = {...edit}
    fields.forEach(f => {
      if (f.type === 'list') body[f.key] = parseList(body[f.key])
      if (f.type === 'number') body[f.key] = Number(body[f.key] || 0)
    })
    try {
      if (edit._id) await api.put(`/api/admin/${path}/${edit._id}`, body)
      else await api.post(`/api/admin/${path}`, body)
      setEdit(null)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this item?')) return
    await api.del(`/api/admin/${path}/${id}`)
    load()
  }

  const upload = async (file) => {
    if (!file) return
    const {url} = await api.upload(file)
    setEdit(v => ({...v, image: url}))
  }

  const openEdit = (item) => {
    const copy = {...item}
    fields.forEach(f => {
      if (f.type === 'list') copy[f.key] = (item[f.key] || []).join('\n')
    })
    setEdit(copy)
  }

  return (
    <div>
      <div className="admin-top">
        <h1>{title}</h1>
        <button className="admin-btn" type="button" onClick={startNew}>Add new</button>
      </div>
      {edit && (
        <form className="admin-form" onSubmit={save} style={{marginBottom:24}}>
          {fields.map(f => (
            <label key={f.key} className={f.type === 'check' ? 'admin-check' : ''}>
              {f.label}
              {f.type === 'textarea' || f.type === 'list' ? (
                <textarea
                  value={edit[f.key] ?? ''}
                  onChange={e => setEdit(v => ({...v, [f.key]: e.target.value}))}
                  placeholder={f.type === 'list' ? 'One per line' : ''}
                />
              ) : f.type === 'check' ? (
                <input
                  type="checkbox"
                  checked={!!edit[f.key]}
                  onChange={e => setEdit(v => ({...v, [f.key]: e.target.checked}))}
                />
              ) : f.type === 'image' ? (
                <span>
                  <input
                    value={edit[f.key] ?? ''}
                    onChange={e => setEdit(v => ({...v, [f.key]: e.target.value}))}
                  />
                  <input type="file" accept="image/*" onChange={e => upload(e.target.files[0])} style={{marginTop:8}}/>
                  {edit[f.key] && <img className="admin-thumb" src={edit[f.key]} alt="" style={{marginTop:8,display:'block'}}/>}
                </span>
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={edit[f.key] ?? ''}
                  onChange={e => {
                    const val = e.target.value
                    setEdit(v => {
                      const next = {...v, [f.key]: val}
                      if (f.key === 'title' && !v._id) next.slug = slugify(val)
                      return next
                    })
                  }}
                />
              )}
            </label>
          ))}
          {error && <p className="admin-err">{error}</p>}
          <div className="admin-row">
            <button className="admin-btn" type="submit">Save</button>
            <button className="admin-btn ghost" type="button" onClick={() => setEdit(null)}>Cancel</button>
          </div>
        </form>
      )}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map(c => <th key={c.key}>{c.label}</th>)}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id}>
                {columns.map(c => (
                  <td key={c.key}>
                    {c.image ? (item[c.key] ? <img src={item[c.key]} alt=""/> : '—') : String(item[c.key] ?? '')}
                  </td>
                ))}
                <td className="admin-actions">
                  <button className="admin-btn ghost" type="button" onClick={() => openEdit(item)}>Edit</button>
                  <button className="admin-btn danger" type="button" onClick={() => remove(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan={columns.length + 1}>No items</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ServicesAdmin(){
  return (
    <ResourcePage
      title="Services"
      path="services"
      columns={[{key:'image', label:'Image', image:true}, {key:'title', label:'Title'}, {key:'slug', label:'Slug'}, {key:'published', label:'Live'}]}
      fields={[
        {key:'title', label:'Title'},
        {key:'slug', label:'Slug'},
        {key:'blurb', label:'Blurb', type:'textarea'},
        {key:'details', label:'Details', type:'textarea'},
        {key:'image', label:'Image', type:'image'},
        {key:'points', label:'Points', type:'list'},
        {key:'order', label:'Order', type:'number'},
        {key:'published', label:'Published', type:'check'},
      ]}
    />
  )
}

export function ProjectsAdmin(){
  return (
    <ResourcePage
      title="Projects"
      path="projects"
      columns={[{key:'image', label:'Image', image:true}, {key:'title', label:'Title'}, {key:'category', label:'Category'}, {key:'published', label:'Live'}]}
      fields={[
        {key:'title', label:'Title'},
        {key:'slug', label:'Slug'},
        {key:'category', label:'Category'},
        {key:'desc', label:'Short description', type:'textarea'},
        {key:'details', label:'Details', type:'textarea'},
        {key:'image', label:'Image', type:'image'},
        {key:'stack', label:'Stack', type:'list'},
        {key:'results', label:'Results', type:'list'},
        {key:'order', label:'Order', type:'number'},
        {key:'published', label:'Published', type:'check'},
      ]}
    />
  )
}

export function JobsAdmin(){
  return (
    <ResourcePage
      title="Jobs"
      path="jobs"
      columns={[{key:'image', label:'Image', image:true}, {key:'title', label:'Title'}, {key:'published', label:'Live'}]}
      fields={[
        {key:'title', label:'Title'},
        {key:'desc', label:'Description', type:'textarea'},
        {key:'image', label:'Image', type:'image'},
        {key:'order', label:'Order', type:'number'},
        {key:'published', label:'Published', type:'check'},
      ]}
    />
  )
}

export function TestimonialsAdmin(){
  return (
    <ResourcePage
      title="Testimonials"
      path="testimonials"
      columns={[{key:'name', label:'Name'}, {key:'role', label:'Role'}, {key:'published', label:'Live'}]}
      fields={[
        {key:'name', label:'Name'},
        {key:'role', label:'Role'},
        {key:'quote', label:'Quote', type:'textarea'},
        {key:'order', label:'Order', type:'number'},
        {key:'published', label:'Published', type:'check'},
      ]}
    />
  )
}

export function ClientsAdmin(){
  return (
    <ResourcePage
      title="Clients"
      path="clients"
      columns={[{key:'name', label:'Name'}, {key:'order', label:'Order'}]}
      fields={[
        {key:'name', label:'Name'},
        {key:'order', label:'Order', type:'number'},
      ]}
    />
  )
}
