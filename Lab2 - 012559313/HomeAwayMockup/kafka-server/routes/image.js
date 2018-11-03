import { Router } from 'express'
import make_requests from '../kafka/client'

let router = Router()

router.get('/:id', (req, res) => {
  console.log('in get image')
  let payloads = {
    token: req.headers.authorization,
    id: req.params.id
  }
  make_requests('image_get', payloads)
    .then(ret => res.json(ret))
    .catch(err => console.log('get image error:', err))
})

export default router
