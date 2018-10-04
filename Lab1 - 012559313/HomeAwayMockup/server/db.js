import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mysql from 'mysql'
import config from './config'

const pool = mysql.createPool({
  connectionLimit: 100,
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name
})

export function createUser(user, fail, succ) {
  pool.getConnection((err, con) => {
    if (err) console.error(err)
    else {
      let saltRounds = 12
      bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) console.error(err)
        else {
          let passwordHash = hash
          let queryString = `INSERT INTO users (EMAIL, PASSWORDHASH, FIRSTNAME, LASTNAME) VALUES (${mysql.escape(user.email)}, ${mysql.escape(passwordHash)}, ${mysql.escape(user.firstname)}, ${mysql.escape(user.lastname)});`
          con.query(queryString, (err, row, fields) => {
            if (err) {
              console.error(err)
              fail()
            } else {
              succ()
            }
          })
          con.release()
        }
      })
    }
  })
}

export function findUser(user, fail, succ) {
  pool.getConnection((err, con) => {
    if (err) console.error(err)
    else {
      let queryString = `SELECT * FROM users WHERE email = ${mysql.escape(user.email)};`
      con.query(queryString, (err, row, fields) => {
        if (err) {
          console.error(err)
          fail()
        } else if (row.length > 0) {
          let { passwordHash } = row[0]
          bcrypt.compare(user.password, passwordHash, (err, isMatched) => {
            if (err) {
              console.error(err)
              fail()
            } else if (isMatched) {
              let token = jwt.sign(user, config.secret, { expiresIn: 10800 })
              succ(token)
            } else fail()
          })
        } else fail()
      })
      con.release()
    }
  })
}
