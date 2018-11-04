import { Router } from 'express'
import make_requests from '../kafka/client'

let router = Router()

router.post('/', (req, res) => {
  console.log('in post message')
  let payloads = {
    token: req.headers.authorization,
    msg: req.body
  }
  make_requests('msg_post', payloads)
    .then(ret => res.json(ret))
    .catch(err => console.log('post message error:', err))
})
router.get('/', (req, res) => {
  console.log('in get message')
  make_requests('msg_get', req.headers.authorization)
    .then(ret => res.json(ret))
    .catch(err => console.log('get message error:', err))
})
router.post('/reply', (req, res) => {
  console.log('in reply message')
  let payloads = {
    token: req.headers.authorization,
    msg: req.body
  }
  make_requests('msg_reply', payloads)
    .then(ret => res.json(ret))
    .catch(err => console.log('reply message error:', err))
})

export default router
