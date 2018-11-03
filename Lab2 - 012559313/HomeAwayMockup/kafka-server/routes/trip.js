import { Router } from 'express'
import make_requests from '../kafka/client'
let router = Router()

router.post('/', (req, res) => {
  console.log('in post trip')
  let payloads = {
    token: req.headers.authorization,
    trip: req.body
  }
  make_requests('trip_post', payloads)
    .then(ret => res.json(ret))
    .catch(err => console.log('post property error:', err))
})

router.get('/', (req, res) => {
  console.log('in get trip')
  make_requests('trip_get', req.headers.authorization)
    .then(ret => res.json(ret))
    .catch(err => console.log('user profile error: ', err))
})

router.get('/booking', (req, res) => {
  console.log('in get trip booking')
  make_requests('trip_booking', req.headers.authorization)
    .then(ret => res.json(ret))
    .catch(err => console.log('user profile error: ', err))
})

export default router
