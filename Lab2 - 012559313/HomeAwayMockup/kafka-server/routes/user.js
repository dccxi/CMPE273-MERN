import { Router } from 'express'
import make_requests from '../kafka/client'
let router = Router()

router.post('/register', (req, res) => {
  console.log('in register');
  make_requests('user_register', req.body)
    .then(ret => res.json(ret))
    .catch(err => console.log('user register error: ', err))
})

router.post('/login', (req, res) => {
  console.log('in login');
  make_requests('user_login', req.body)
    .then(ret => res.json(ret))
    .catch(err => console.log('user login error: ', err))
})

router.get('/profile', (req, res) => {
  console.log('in get profile');
  make_requests('user_profile', req.headers.authorization)
    .then(ret => res.json(ret))
    .catch(err => console.log('user profile error: ', err))
})

router.put('/update', (req, res) => {
  console.log('in updating profile')
  let payloads = {
    token: req.headers.authorization,
    userProfile: req.body
  }
  make_requests('user_update', payloads)
    .then(ret => res.json(ret))
    .catch(err => console.log('user update error:', err))
})

export default router
