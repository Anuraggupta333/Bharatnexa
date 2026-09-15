import {useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import {api} from '../api'
import './admin.css'

export function RequireAuth({children}){
  const [state, setState] = useState('loading')
  useEffect(() => {
    api.get('/api/auth/me').then(() => setState('ok')).catch(() => setState('no'))
  }, [])
  if (state === 'loading') return <div className="admin-root" style={{padding:40}}>Loading…</div>
  if (state === 'no') return <Navigate to="/admin/login" replace/>
  return children
}
