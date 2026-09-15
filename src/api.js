const opts = {credentials: 'include', headers: {'Content-Type': 'application/json'}}

async function parse(res){
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  get: (url) => fetch(url, {credentials: 'include'}).then(parse),
  post: (url, body) => fetch(url, {...opts, method: 'POST', body: JSON.stringify(body)}).then(parse),
  put: (url, body) => fetch(url, {...opts, method: 'PUT', body: JSON.stringify(body)}).then(parse),
  patch: (url, body) => fetch(url, {...opts, method: 'PATCH', body: JSON.stringify(body || {})}).then(parse),
  del: (url) => fetch(url, {credentials: 'include', method: 'DELETE'}).then(parse),
  upload: async (file) => {
    const fd = new FormData()
    fd.append('image', file)
    const res = await fetch('/api/admin/upload', {method: 'POST', credentials: 'include', body: fd})
    return parse(res)
  },
}
