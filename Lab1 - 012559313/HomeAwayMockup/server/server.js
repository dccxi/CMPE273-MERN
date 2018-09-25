import express from 'express'
import logger from 'morgan'
import mysql from 'mysql'
import bodyParser from 'body-parser'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from './config'

const app = express()

app.set('port', process.env.PORT || 3001)

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: config.secret,
}, (jwt_payload, done) => {
  done(null, jwt_payload)
}))

const pool = mysql.createPool({
  connectionLimit: 100,
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name
})

app.post('/register', (req, res) => {
  let { username, password } = req.body
  if (!username || !password) res.json({ success: false })
  else pool.getConnection((err, con) => {
    if (err) console.error(err)
    else {
      let saltRounds = 12
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) console.error(err)
        else {
          let passwordHash = hash
          let queryString = `INSERT INTO users (USERNAME, PASSWORDHASH) VALUES (${mysql.escape(username)}, ${mysql.escape(passwordHash)});`
          con.query(queryString, (err, row, fields) => {
            if (err) {
              console.error(err)
              res.json({ success: false })
            } else {
              res.json({ success: true })
            }
          })
          con.release()
        }
      })
    }
  })
})

app.post('/login', (req, res) => {
  let { username, password } = req.body
  if (!username || !password) res.json({ success: false })
  else pool.getConnection((err, con) => {
    if (err) console.error(err)
    else {
      let queryString = `SELECT * FROM users WHERE username = ${mysql.escape(username)};`
      con.query(queryString, (err, row, fields) => {
        if (err) {
          console.error(err)
          res.json({ success: false })
        } else if (row.length > 0) {
          let { passwordHash } = row[0]
          bcrypt.compare(password, passwordHash, (err, isMatched) => {
            if (err) {
              console.error(err)
              res.json({ success: false })
            } else if (isMatched) {
              let user = req.body
              let token = jwt.sign(user, config.secret, { expiresIn: 10800 })
              res.json({ success: true, token: `JWT ${token}` })
            }
          })
        } else
          res.json({ success: false })
      })
      con.release()
    }
  })
})

app.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(`id: ${req.user.id}, username: ${req.user.username}`)
  })

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))
