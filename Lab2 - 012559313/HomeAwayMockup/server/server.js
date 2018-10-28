import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import {
  createUser,
  findUser,
  getProfile,
  updateProfile,
  createProperty,
  findProperty,
  testWithPooling,
  testWithoutPooling,
  createTrip,
  getTrips,
  getBookings
} from './db'
import multer from 'multer'
import uuid from 'uuidv4'
import { requireAuth } from './passport'
import fs from 'fs'
import path from 'path'

const app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { propertyId } = req.body
    if (propertyId) {
      const propertyDir = `server/uploads/${propertyId}`
      if (!fs.existsSync(propertyDir))
        fs.mkdir(propertyDir, err => { console.log(err) })
      cb(null, propertyDir)
    } else {
      cb(null, 'server/uploads')
    }
  },
  filename: function (req, file, cb) {
    const { propertyId } = req.body
    if (propertyId) {
      cb(null, propertyId)
    } else {
      cb(null, uuid.fromString(req.user.email))
    }

  }
})

const upload = multer({ storage })

app.set('port', process.env.PORT || 3001)

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/register', (req, res) => {
  let user = req.body
  if (!user.email || !user.password) res.json({ success: false })
  else createUser(user)
    .then(() => res.json({ success: true }))
    .catch((err) => res.json({ success: false, error: err }))

})

app.post('/login', (req, res) => {
  let user = req.body
  if (!user.email || !user.password) res.json({ success: false })
  else findUser(user)
    .then((token) => res.json({ success: true, token: `JWT ${token}` }))
    .catch((err) => res.json({ success: false, error: err }))
})

app.get('/profile', requireAuth, (req, res) => {
  getProfile(req.user.email)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})

app.post('/updateProfile', requireAuth, (req, res) => {
  const { email } = req.user
  const userProfile = req.body
  updateProfile(email, userProfile)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})

app.post('/postProperty', requireAuth, (req, res) => {
  const owner = req.user.email
  const property = req.body
  createProperty(owner, property)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})

app.post('/postImage', requireAuth, upload.single('photo'), (req, res) => {
  res.json({ success: true })
})

app.post('/search', requireAuth, (req, res) => {
  const input = req.body
  findProperty(input)
    .then(ret => res.json(ret))
    .catch(() => res.json({ noMatch: true }))
})

app.get('/getPhoto/:id', requireAuth, (req, res) => {
  const id = req.params.id
  const fileLocation = path.join(__dirname + '/uploads', id, id)
  const img = fs.readFileSync(fileLocation)
  const base64img = new Buffer(img).toString('base64')
  res.writeHead(200, { 'Content-Type': 'image/jpg' })
  res.end(base64img)
})

app.post('/postTrip', requireAuth, (req, res) => {
  const traveler = req.user.email
  const trip = req.body
  createTrip(traveler, trip)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})

app.get('/getTrips', requireAuth, (req, res) => {
  const traveler = req.user.email
  getTrips(traveler)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})

app.get('/getBookings', requireAuth, (req, res) => {
  const owner = req.user.email
  getBookings(owner)
    .then(ret => res.json(ret))
    .catch(err => console.error(err))
})

// TEST
app.post('/withPooling', (req, res) => {
  let user = req.body
  if (!user.email || !user.password) res.json({ success: false })
  else testWithPooling(
    user,
    (err) => res.json({ success: false, error: err }),
    (token) => res.json({ success: true, token: `JWT ${token}` })
  )
})
app.post('/withoutPooling', (req, res) => {
  let user = req.body
  if (!user.email || !user.password) res.json({ success: false })
  else testWithoutPooling(
    user,
    (err) => res.json({ success: false, error: err }),
    (token) => res.json({ success: true, token: `JWT ${token}` })
  )
})

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))
