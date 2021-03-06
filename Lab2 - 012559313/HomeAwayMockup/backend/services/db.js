import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
import _ from 'lodash'
import moment from 'moment'
import { Users, Properties, Trips, Messages } from './schema'

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

export function findPropertyImage(id) {
  return new Promise((res, rej) => {
    Properties.find({ propertyId: id })
      .then(us => {
        console.log('property found');
        if (us.length)
          res(us[0].photos)
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
        let propertyIds = properties.map(a => a.propertyId)
        Promise.all(propertyIds.map(async (houseId) => {
          await Trips.find({ houseId })
            .then(trips => {
              ret = ret.concat(trips)
            }).catch(err => console.error(err))
        })).then(() => {
          console.log(ret);
          res(ret)
        })
      }).catch(err => console.error(err))
  })
}

export function postMessage(sender, msg) {
  return new Promise((res, rej) => {
    const newMessage = new Messages(Object.assign(msg, { sender }))
    newMessage.save().then(() => {
      console.log('message posted')
      res({ success: true })
    }).catch(err => {
      console.error(err.errmsg)
      rej(err.errmsg)
    })
  })
}

export function getMessage(email) {
  return new Promise((res, rej) => {
    Messages.findOne({ receiver: email })
      .then(u => {
        if (u === null) {
          Messages.findOne({ sender: email })
            .then(u => {
              console.log(564736245);
              res(u)
            }).catch(err => {
              console.error(err.errmsg)
              rej(err.errmsg)
            })
        } else
          res(u)
      }).catch(err => {
        console.error(err.errmsg)
        rej(err.errmsg)
      })
  })
}


export function replyMessage(msg) {
  let { sender, receiver } = msg
  return new Promise((res, rej) => {
    Messages.findOneAndUpdate({ sender, receiver }, msg)
      .then(() => {
        console.log('message updated')
        res({ success: true })
      }).catch(err => {
        console.error(err.errmsg)
        rej(err.errmsg)
      })
  })
}
