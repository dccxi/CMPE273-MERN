import { Router } from 'express'
import { requireAuth } from './../passport'
import { createTrip, getTrips, getBookings } from './../db'

let router = Router()

router.post('/', requireAuth, (req, res) => {
  const traveler = req.user.email
  const trip = req.body
  createTrip(traveler, trip)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})

router.get('/', requireAuth, (req, res) => {
  const traveler = req.user.email
  getTrips(traveler)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})

router.get('/booking', requireAuth, (req, res) => {
  const owner = req.user.email
  getBookings(owner)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})

export default router
