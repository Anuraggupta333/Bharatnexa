import {SiteSettings} from '../models/SiteSettings.js'

export async function getPublic(_req, res){
  const site = await SiteSettings.findOne()
  res.json(site || {})
}

export async function getAdmin(_req, res){
  const site = await SiteSettings.findOne()
  res.json(site || {})
}

export async function update(req, res){
  const site = await SiteSettings.findOneAndUpdate({}, reqBodySafe(req.body), {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  })
  res.json(site)
}

function reqBodySafe(body){
  const {office, hero, about} = body || {}
  return {office, hero, about}
}
