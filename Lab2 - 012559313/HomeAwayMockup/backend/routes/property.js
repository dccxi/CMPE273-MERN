import { Router } from 'express'
import { requireAuth } from '../services/passport'
import { createProperty, findProperty } from '../services/db'

let router = Router()

router.post('/', requireAuth, (req, res) => {
  const owner = req.user.email
  const property = req.body
  createProperty(owner, property)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})//

router.post('/search', requireAuth, (req, res) => {
  const input = req.body
  findProperty(input)
    .then(ret => res.json(ret))
    .catch(() => res.json({ noMatch: true }))
})//

export default router
