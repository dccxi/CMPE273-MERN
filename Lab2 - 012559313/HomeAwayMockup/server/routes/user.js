import { Router } from 'express'
import { requireAuth } from './../passport'
import { createUser, findUser, getProfile, updateProfile } from './../db'

let router = Router()

router.post('/register', (req, res) => {
  let user = req.body
  if (!user.email || !user.password) res.json({ success: false })
  else createUser(user)
    .then(() => res.json({ success: true }))
    .catch((err) => res.json({ success: false, error: err }))
})

router.post('/login', (req, res) => {
  let user = req.body
  if (!user.email || !user.password) res.json({ success: false })
  else findUser(user)
    .then((token) => res.json({ success: true, token: `JWT ${token}` }))
    .catch((err) => res.json({ success: false, error: err }))
})

router.get('/profile', requireAuth, (req, res) => {
  getProfile(req.user.email)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})

router.put('/update', requireAuth, (req, res) => {
  const { email } = req.user
  const userProfile = req.body
  updateProfile(email, userProfile)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})

export default router
