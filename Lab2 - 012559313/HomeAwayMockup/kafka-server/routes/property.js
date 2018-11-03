import { Router } from 'express'
import make_requests from '../kafka/client'
let router = Router()

router.post('/', (req, res) => {
  console.log('in post property')
  let payloads = {
    token: req.headers.authorization,
    property: req.body
  }
  console.log(payloads);
  make_requests('property_post', payloads)
    .then(ret => res.json(ret))
    .catch(err => console.log('post property error:', err))
})

router.post('/search', (req, res) => {
  console.log('in search property')
  let payloads = {
    token: req.headers.authorization,
    input: req.body
  }
  make_requests('property_search', payloads)
    .then(ret => res.json(ret))
    .catch(err => console.log('post property error:', err))
})

export default router
