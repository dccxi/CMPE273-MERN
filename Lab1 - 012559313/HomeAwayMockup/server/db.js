import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mysql from 'mysql'
import config from './config'
import _ from 'lodash'
import moment from 'moment'

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
        if (err) console.error(err.sqlMessage)
        else {
          let passwordHash = hash
          let queryString =
            `INSERT INTO users
             (EMAIL, PASSWORDHASH, FIRSTNAME, LASTNAME, ISOWNER)
             VALUES (
               ${mysql.escape(user.email)},
               ${mysql.escape(passwordHash)},
               ${mysql.escape(user.firstName)},
               ${mysql.escape(user.lastName)},
               ${mysql.escape(+user.isOwner)});`
          con.query(queryString, (err, row, fields) => {
            if (err) {
              console.error(err)
              fail(err)
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
      let queryString =
        `SELECT *
         FROM users
         WHERE email = ${mysql.escape(user.email)};`
      con.query(queryString, (err, row, fields) => {
        if (err) {
          console.error(err)
          fail(err)
        } else if (row.length > 0) {
          let { passwordHash } = row[0]
          bcrypt.compare(user.password, passwordHash, (err, isMatched) => {
            if (err) {
              console.error(err)
              fail(err)
            } else if (isMatched) {
              let token = jwt.sign(user, config.secret, { expiresIn: 10800 })
              succ(token)
            } else fail('password no match')
          })
        } else fail('not found')
      })
      con.release()
    }
  })
}

export function getProfile(email) {
  return new Promise((res, rej) => {
    pool.getConnection((err, con) => {
      if (err) rej(err)
      else {
        let queryString =
          `SELECT *
           FROM users
           WHERE email = ${mysql.escape(email)};`
        con.query(queryString, (err, row) => {
          if (err) {
            rej(err)
          } else if (row.length > 0) {
            let ret = _.omit(row[0], ['id', 'email', 'passwordHash'])
            res(ret)
          }
        })
        con.release()
      }
    })
  })
}

export function updateProfile(email, userProfile) {
  return new Promise((res, rej) => {
    pool.getConnection((err, con) => {
      if (err) rej(err)
      else {
        let queryString =
          `UPDATE users
              SET firstName = ${mysql.escape(userProfile.firstName)},
                  lastName = ${mysql.escape(userProfile.lastName)},
                  image = ${mysql.escape(userProfile.image)},
                  phone = ${mysql.escape(userProfile.phone)},
                  about = ${mysql.escape(userProfile.about)},
                  city = ${mysql.escape(userProfile.city)},
                  country = ${mysql.escape(userProfile.country)},
                  company = ${mysql.escape(userProfile.company)},
                  school = ${mysql.escape(userProfile.school)},
                  hometown = ${mysql.escape(userProfile.hometown)},
                  language = ${mysql.escape(userProfile.language)},
                  gender = ${mysql.escape(userProfile.gender)}
            WHERE email = ${mysql.escape(email)};`
        con.query(queryString, (err, row) => {
          if (err)
            rej(err)
          else
            res({ success: true })
        })
        con.release()
      }
    })
  })
}

export function createProperty(owner, property) {
  return new Promise((res, rej) => {
    pool.getConnection((err, con) => {
      if (err) rej(err)
      else {
        let queryString =
          `INSERT INTO properties
           SET propertyId = ${mysql.escape(property.propertyId)},
               location = ${mysql.escape(property.location)},
               headline = ${mysql.escape(property.headline)},
               description = ${mysql.escape(property.description)},
               type = ${mysql.escape(property.type)},
               bedrooms = ${mysql.escape(property.bedrooms)},
               accommodates = ${mysql.escape(property.accommodates)},
               bathrooms = ${mysql.escape(property.bathrooms)},
               bookingOption = ${mysql.escape(property.bookingOption)},
               rate = ${mysql.escape(property.rate)},
               minimumStay = ${mysql.escape(property.minimumStay)},
               startDate = ${mysql.escape(property.startDate)},
               endDate = ${mysql.escape(property.endDate)},
               owner = ${mysql.escape(owner)};`
        con.query(queryString, (err, row) => {
          if (err)
            rej(err)
          else
            res({ success: true })
        })
        con.release()
      }
    })
  })
}

export function findProperty(input) {
  return new Promise((res, rej) => {
    pool.getConnection((err, con) => {
      if (err) rej(err)
      else {
        let queryString =
          `SELECT  *
             FROM properties
            WHERE location
             LIKE ${mysql.escape('%' + input.location + '%')};`
        con.query(queryString, (err, rows) => {
          if (err)
            rej()
          else if (rows.length > 0) {
            let noMatch = false
            for (let row of rows) {
              let startDateInp = moment(input.startDate)
              let endDateInp = moment(input.endDate)
              let startDate = moment(row.startDate)
              let endDate = moment(row.endDate)
              // TODO： 加入已订的验证
              if (startDateInp < startDate || endDateInp > endDate || input.accommodates > row.accommodates) {
                noMatch = true
              }
            }
            if (noMatch)
              rej()
            else
              res(rows)
          } else {
            console.log('no found');
          }
        })
        con.release()
      }
    })
  })
}

export function createTrip(traveler, trip) {
  return new Promise((res, rej) => {
    pool.getConnection((err, con) => {
      if (err) rej(err)
      else {
        let queryString =
          `INSERT INTO trips
           SET houseId = ${mysql.escape(trip.houseId)},
               startDate = ${mysql.escape(trip.startDate)},
               endDate = ${mysql.escape(trip.endDate)},
               traveler = ${mysql.escape(traveler)};`
        con.query(queryString, (err, row) => {
          if (err)
            rej(err)
          else
            res({ success: true })
        })
        con.release()
      }
    })
  })
}

export function getTrips(traveler) {
  return new Promise((res, rej) => {
    pool.getConnection((err, con) => {
      if (err) rej(err)
      else {
        let queryString =
          `SELECT  *
             FROM trips
            WHERE traveler = ${mysql.escape(traveler)};`
        con.query(queryString, (err, rows) => {
          if (err)
            rej()
          else if (rows.length > 0) {
            res(rows)
          } else {
            rej()
          }
        })
        con.release()
      }
    })
  })
}

export function getBookings(owner) {
  return new Promise((res, rej) => {
    pool.getConnection((err, con) => {
      if (err) rej(err)
      else {
        let queryString =
          `SELECT  T.*
             FROM trips T
            WHERE T.houseId in (
              SELECT P.propertyId
                FROM properties P
               WHERE P.owner = ${mysql.escape(owner)}
            );`
        con.query(queryString, (err, rows) => {
          if (err)
            rej()
          else if (rows.length > 0) {
            res(rows)
          } else {
            rej()
          }
        })
        con.release()
      }
    })
  })
}
// SQL TESTING
export function testWithPooling(user, fail, succ) {
  pool.getConnection((err, con) => {
    if (err) console.error(err)
    else {
      let queryString =
        `SELECT *
         FROM users
         WHERE email = ${mysql.escape(user.email)};`
      con.query(queryString, (err, row, fields) => {
        if (err) {
          console.error(err)
          fail(err)
        } else if (row.length > 0) {
          let { passwordHash } = row[0]
          bcrypt.compare(user.password, passwordHash, (err, isMatched) => {
            if (err) {
              console.error(err)
              fail(err)
            } else if (isMatched) {
              let token = jwt.sign(user, config.secret, { expiresIn: 10800 })
              succ(token)
            } else fail('password no match')
          })
        } else fail('not found')
      })
      con.release()
    }
  })
}

var connection = mysql.createConnection({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name
})
export function testWithoutPooling(user, fail, succ) {
  // connection.connect()
  let queryString =
    `SELECT *
         FROM users
         WHERE email = ${mysql.escape(user.email)};`
  connection.query(queryString, (err, row, fields) => {
    if (err) {
      console.error(err)
      fail(err)
    } else if (row.length > 0) {
      let { passwordHash } = row[0]
      bcrypt.compare(user.password, passwordHash, (err, isMatched) => {
        if (err) {
          console.error(err)
          fail(err)
        } else if (isMatched) {
          let token = jwt.sign(user, config.secret, { expiresIn: 10800 })
          succ(token)
        } else fail('password no match')
      })
    } else fail('not found')
  })
  // connection.end()
}
