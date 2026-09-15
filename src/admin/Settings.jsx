import {useEffect, useState} from 'react'
import {api} from '../api'

const empty = {
  office: {city:'', address:'', phones:'', emails:'', whatsapp:''},
  hero: {eyebrow:'', title:'', copy:'', pills:''},
  about: {headline:'', copy:'', values:''},
}

export default function Settings(){
  const [form, setForm] = useState(empty)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/api/admin/settings').then(s => {
      setForm({
        office: {
          city: s.office?.city || '',
          address: s.office?.address || '',
          phones: (s.office?.phones || []).join('\n'),
          emails: (s.office?.emails || []).join('\n'),
          whatsapp: s.office?.whatsapp || '',
        },
        hero: {
          eyebrow: s.hero?.eyebrow || '',
          title: s.hero?.title || '',
          copy: s.hero?.copy || '',
          pills: (s.hero?.pills || []).join('\n'),
        },
        about: {
          headline: s.about?.headline || '',
          copy: s.about?.copy || '',
          values: (s.about?.values || []).map(v => `${v.title}|${v.text || ''}|${v.image || ''}`).join('\n'),
        },
      })
    })
  }, [])

  const setOffice = (k, v) => setForm(f => ({...f, office: {...f.office, [k]: v}}))
  const setHero = (k, v) => setForm(f => ({...f, hero: {...f.hero, [k]: v}}))
  const setAbout = (k, v) => setForm(f => ({...f, about: {...f.about, [k]: v}}))

  const save = async e => {
    e.preventDefault()
    setMsg('')
    const payload = {
      office: {
        ...form.office,
        phones: form.office.phones.split('\n').map(x => x.trim()).filter(Boolean),
        emails: form.office.emails.split('\n').map(x => x.trim()).filter(Boolean),
      },
      hero: {
        ...form.hero,
        pills: form.hero.pills.split('\n').map(x => x.trim()).filter(Boolean),
      },
      about: {
        headline: form.about.headline,
        copy: form.about.copy,
        values: form.about.values.split('\n').filter(Boolean).map(line => {
          const [title, text, image] = line.split('|')
          return {title: title?.trim() || '', text: text?.trim() || '', image: image?.trim() || ''}
        }),
      },
    }
    await api.put('/api/admin/settings', payload)
    setMsg('Saved')
  }

  return (
    <div>
      <div className="admin-top"><h1>Site settings</h1></div>
      <form className="admin-form" onSubmit={save}>
        <h3>Office</h3>
        <label>City<input value={form.office.city} onChange={e => setOffice('city', e.target.value)}/></label>
        <label>Address<textarea value={form.office.address} onChange={e => setOffice('address', e.target.value)}/></label>
        <label>Phones<textarea value={form.office.phones} onChange={e => setOffice('phones', e.target.value)} placeholder="One per line"/></label>
        <label>Emails<textarea value={form.office.emails} onChange={e => setOffice('emails', e.target.value)} placeholder="One per line"/></label>
        <label>WhatsApp<input value={form.office.whatsapp} onChange={e => setOffice('whatsapp', e.target.value)}/></label>
        <h3>Hero</h3>
        <label>Eyebrow<input value={form.hero.eyebrow} onChange={e => setHero('eyebrow', e.target.value)}/></label>
        <label>Title<input value={form.hero.title} onChange={e => setHero('title', e.target.value)}/></label>
        <label>Copy<textarea value={form.hero.copy} onChange={e => setHero('copy', e.target.value)}/></label>
        <label>Pills<textarea value={form.hero.pills} onChange={e => setHero('pills', e.target.value)} placeholder="One per line"/></label>
        <h3>About</h3>
        <label>Headline<input value={form.about.headline} onChange={e => setAbout('headline', e.target.value)}/></label>
        <label>Copy<textarea value={form.about.copy} onChange={e => setAbout('copy', e.target.value)}/></label>
        <label>Values<textarea value={form.about.values} onChange={e => setAbout('values', e.target.value)} placeholder="title|text|image per line"/></label>
        {msg && <p className="admin-ok">{msg}</p>}
        <button className="admin-btn" type="submit">Save settings</button>
      </form>
    </div>
  )
}
