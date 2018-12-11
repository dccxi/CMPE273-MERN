import { Users, Trips, Properties } from './dbConnector'
import _ from 'lodash'

export const resolvers = {
  Query: {
    getProfile: (root, { email }) => {
      return new Promise((res, rej) => {
        Users.findOne({ email })
          .then(u => {
            let ret = _.omit(u, ['_id', 'passwordHash', '__v'])
            console.log('profile retrived', ret);
            res(ret)
          }).catch(err => {
            console.error(err.errmsg)
            rej(err.errmsg)
          })
      })
    },
    getProperty: (root, { email }) => {
      return new Promise((res, rej) => {
        Properties.find({ owner: email }, { _id: 0 })
          .then(properties => {
            console.log('returning properties', properties);
            res(properties)
          })
          .catch(err => {
            console.error(err.errmsg)
            rej(err.errmsg)
          })
      })
    },
    getTrip: (root, { email }) => {
      return new Promise((res, rej) => {
        Trips.find({ traveler: email }, { _id: 0 })
          .then(trips => {
            console.log('returning trips', trips);
            res(trips)
          })
          .catch(err => {
            console.error(err.errmsg)
            rej(err.errmsg)
          })
      })
    }
  },
  Mutation: {
    updateProfile: (root, { input }) => {
      return new Promise((res, rej) => {
        Users.findOneAndUpdate({ email: input.email }, input)
          .then((ret) => res(ret))
          .catch(err => rej(err))
      })
    },
    bookTrip: (root, { houseId }) => {
      return new Promise((res, rej) => {
        const newTrip = new Trips({ houseId, traveler: "claire@claire.com" })
        newTrip.save().then(() => {
          console.log('trip booked')
          res('trip booked')
        }).catch(err => {
          rej(err.errmsg)
        })
      })
    }
  }
}
