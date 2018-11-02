import { Router } from 'express'
import { requireAuth } from './../services/passport'
import multer from 'multer'
import uuid from 'uuidv4'
import fs from 'fs'
import path from 'path'

let router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { propertyId } = req.body
    if (propertyId) {
      const propertyDir = `uploads/${propertyId}`
      if (!fs.existsSync(propertyDir))
        fs.mkdir(propertyDir, err => { console.log(err) })
      cb(null, propertyDir)
    } else {
      cb(null, 'uploads')
    }
  },
  filename: function (req, file, cb) {
    const { propertyId } = req.body
    if (propertyId) {
      cb(null, uuid())
    } else {
      cb(null, uuid.fromString(req.user.email))
    }

  }
})
const upload = multer({ storage })

router.post('/', requireAuth, upload.single('photo'), (req, res) => {
  res.json({ success: true })
})
router.get('/:id', requireAuth, (req, res) => {
  const id = req.params.id
  const dirLocation = path.join(__dirname + './../uploads', id)
  const files = fs.readdirSync(dirLocation)
  let ret = []
  files.forEach(file => {
    let img = fs.readFileSync(path.join(dirLocation, file))
    let base64img = new Buffer(img).toString('base64')
    ret.push(base64img)
  })
  res.json(ret)
  // res.writeHead(200, { 'Content-Type': 'text/plain' })
  // res.end(ret)
})

export default router
