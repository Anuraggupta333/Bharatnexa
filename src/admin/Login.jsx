import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {api} from '../api'
import './admin.css'

export default function Login(){
  const [email, setEmail] = useState('admin@ss-technologies.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/api/auth/login', {email, password})
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={submit}>
        <p className="admin-muted">SS Mobile</p>
        <h1>Admin login</h1>
        <p>Manage services, projects, jobs and inquiries.</p>
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
        </label>
        <label style={{marginTop:12}}>Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
        </label>
        {error && <p className="admin-err" style={{marginTop:12}}>{error}</p>}
        <button className="admin-btn" style={{marginTop:18,width:'100%'}} type="submit">Sign in</button>
      </form>
    </div>
  )
}
