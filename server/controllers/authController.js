import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {User} from '../models/User.js'

function cookieOpts(){
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  }
}

export async function login(req, res){
  const email = String(req.body.email || '').toLowerCase().trim()
  const password = String(req.body.password || '')
  const user = await User.findOne({email})
  if (!user) return res.status(401).json({error: 'Invalid credentials'})
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({error: 'Invalid credentials'})
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
  res.cookie('token', token, cookieOpts())
  res.json({email: user.email})
}

export async function logout(_req, res){
  res.clearCookie('token', {path: '/'})
  res.json({ok: true})
}

export async function me(req, res){
  res.json({email: req.user.email})
}
