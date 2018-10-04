import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import { createUser, findUser } from './db'
import { requireAuth } from './passport'

const app = express()

app.set('port', process.env.PORT || 3001)

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/register', (req, res) => {
  let user = req.body
  if (!user.email || !user.password) res.json({ success: false })
  else createUser(
    user,
    () => res.json({ success: false }),
    () => res.json({ success: true })
  )
})

app.post('/login', (req, res) => {
  let user = req.body
  if (!user.email || !user.password) res.json({ success: false })
  else findUser(
    user,
    () => res.json({ success: false }),
    (token) => res.json({ success: true, token: `JWT ${token}` })
  )
})

app.get('/',
  requireAuth,
  (req, res) => {
    res.send(`email: ${req.user.email}`)
  })

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))
