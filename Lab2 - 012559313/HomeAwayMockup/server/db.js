import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mysql from 'mysql'
import config from './config'
import _ from 'lodash'
import moment from 'moment'
import { Users, Properties, Trips } from './schema'

export function createUser(user) {
  return new Promise((res, rej) => {
    let saltRounds = 12
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
      if (err) console.error(err)
      else {
        const newUser = new Users({
          email: user.email,
          passwordHash: hash,
          firstName: user.firstName,
          lastName: user.lastName,
          isOwner: !!user.isOwner
        })
        newUser.save().then(() => {
          console.log('user created')
          res()
        }).catch(err => {
          console.error(err.errmsg)
          rej(err.errmsg)
        })
      }
    })
  })
}

export function findUser(user) {
  return new Promise((res, rej) => {
    Users.findOne({ email: user.email })
      .then(u => {
        bcrypt.compare(user.password, u.passwordHash,
          (err, isMatched) => {
            if (err) {
              console.error(err)
              rej(err)
            } else if (isMatched) {
              let token = jwt.sign(user, config.secret, { expiresIn: 10800 })
              res(token)
            } else rej('password no match')
          })
      }).catch(err => {
        console.error(err.errmsg)
        rej(err.errmsg)
      })
  })
}

export function getProfile(email) {
  return new Promise((res, rej) => {
    Users.findOne({ email })
      .then(u => {
        let ret = _.omit(u, ['_id', 'email', 'passwordHash', '__v'])
        res(ret)
      }).catch(err => {
        console.error(err.errmsg)
        rej(err.errmsg)
      })
  })
}

export function updateProfile(email, userProfile) {
  return new Promise((res, rej) => {
    Users.findOneAndUpdate({ email }, userProfile)
      .then(() => res({ success: true }))
      .catch(err => rej(err))
  })
}

export function createProperty(owner, property) {
  return new Promise((res, rej) => {
    const newProperty = new Properties(Object.assign(property, { owner }))
    newProperty.save().then(() => {
      console.log('property listed')
      res({ success: true })
    }).catch(err => {
      console.error(err.errmsg)
      rej(err.errmsg)
    })
  })
}

export function findProperty(input) {
  return new Promise((res, rej) => {
    Properties.find({ location: /[input.location]/i })
      .then(us => {
        let users = us.filter(u => moment(input.startDate) >=
          moment(u.startDate) && moment(input.endDate) <=
          moment(u.endDate) && input.guest <=
          u.accommodates)
        if (users.length)
          res(users)
        else
          rej()
      }).catch((err) => {
        console.log(err)
        rej()
      })
  })
}

export function createTrip(traveler, trip) {
  return new Promise((res, rej) => {
    const newTrip = new Trips(Object.assign(trip, { traveler }))
    newTrip.save().then(() => {
      console.log('trip booked')
      res({ success: true })
    }).catch(err => {
      rej(err.errmsg)
    })
  })
}

export function getTrips(traveler) {
  return new Promise((res, rej) => {
    Trips.find({ traveler })
      .then(trips => {
        res(trips)
      }).catch((err) => {
        console.log(err)
        rej()
      })
  })
}

export function getBookings(owner) {
  return new Promise((res, rej) => {
    Properties.find({ owner })
      .then(properties => {
        let ret = []
        let promises = properties.map(propertyId => {
          Trips.find({ propertyId })
            .then(trips => {
              ret.concat(trips)
            })
        })
        Promise.all(promises).then(() => { res(ret) })
      })
  })
}

// // SQL TESTING
// export function testWithPooling(user, fail, succ) {
//   pool.getConnection((err, con) => {
//     if (err) console.error(err)
//     else {
//       let queryString =
//         `SELECT *
//          FROM users
//          WHERE email = ${mysql.escape(user.email)};`
//       con.query(queryString, (err, row, fields) => {
//         if (err) {
//           console.error(err)
//           fail(err)
//         } else if (row.length > 0) {
//           let { passwordHash } = row[0]
//           bcrypt.compare(user.password, passwordHash, (err, isMatched) => {
//             if (err) {
//               console.error(err)
//               fail(err)
//             } else if (isMatched) {
//               let token = jwt.sign(user, config.secret, { expiresIn: 10800 })
//               succ(token)
//             } else fail('password no match')
//           })
//         } else fail('not found')
//       })
//       con.release()
//     }
//   })
// }

// export function testWithoutPooling(user, fail, succ) {
//   // connection.connect()
//   let queryString =
//     `SELECT *
//          FROM users
//          WHERE email = ${mysql.escape(user.email)};`
//   connection.query(queryString, (err, row, fields) => {
//     if (err) {
//       console.error(err)
//       fail(err)
//     } else if (row.length > 0) {
//       let { passwordHash } = row[0]
//       bcrypt.compare(user.password, passwordHash, (err, isMatched) => {
//         if (err) {
//           console.error(err)
//           fail(err)
//         } else if (isMatched) {
//           let token = jwt.sign(user, config.secret, { expiresIn: 10800 })
//           succ(token)
//         } else fail('password no match')
//       })
//     } else fail('not found')
//   })
//   // connection.end()
// }
