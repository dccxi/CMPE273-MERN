import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import {
  createUser,
  findUser
} from './db'
import authMiddleware from './passport'
import graphqlHTTP from 'express-graphql'
import { schema } from './schema'
import cors from 'cors'

const app = express()

app.set('port', process.env.PORT || 3001)

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

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

app.use(authMiddleware)
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

// app.get('/profile', requireAuth, (req, res) => {
//   getProfile(req.user.email)
//     .then(ret => res.json(ret))
//     .catch(err => console.error(err))
// })

// app.post('/updateProfile', requireAuth, (req, res) => {
//   const { email } = req.user
//   const userProfile = req.body
//   updateProfile(email, userProfile)
//     .then(ret => res.json(ret))
//     .catch(err => console.error(err))
// })

// app.post('/postProperty', requireAuth, (req, res) => {
//   const owner = req.user.email
//   const property = req.body
//   createProperty(owner, property)
//     .then(ret => res.json(ret))
//     .catch(err => console.error(err))
// })


// app.post('/search', requireAuth, (req, res) => {
//   const input = req.body
//   findProperty(input)
//     .then(ret => res.json(ret))
//     .catch(() => res.json({ noMatch: true }))
// })

// app.post('/postTrip', requireAuth, (req, res) => {
//   const traveler = req.user.email
//   const trip = req.body
//   createTrip(traveler, trip)
//     .then(ret => res.json(ret))
//     .catch(err => console.error(err))
// })

// app.get('/getTrips', requireAuth, (req, res) => {
//   const traveler = req.user.email
//   getTrips(traveler)
//     .then(ret => res.json(ret))
//     .catch(err => console.error(err))
// })

// app.get('/getBookings', requireAuth, (req, res) => {
//   const owner = req.user.email
//   getBookings(owner)
//     .then(ret => res.json(ret))
//     .catch(err => console.error(err))
// })

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))
