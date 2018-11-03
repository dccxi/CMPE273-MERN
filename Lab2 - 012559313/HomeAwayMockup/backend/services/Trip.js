import { createTrip, getTrips, getBookings } from './db'
import isAuthenticated from './auth'
import jwt_decode from 'jwt-decode'

export function post(payload) {
  console.log('in post trip')
  let { token, trip } = payload
  return new Promise((res, rej) => {
    let { email, password } = jwt_decode(token)
    let user = { email, password }
    isAuthenticated(user)
      .then(() => {
        console.log('authorized')
        createTrip(email, trip)
          .then(ret => res(ret))
          .catch((err) => console.log('no match', err))
      }).catch(() => {
        console.log('not authorized')
      })
  })
}

export function get(token) {
  console.log('in get trip');
  return new Promise((res, rej) => {
    let { email, password } = jwt_decode(token)
    let user = { email, password }
    isAuthenticated(user)
      .then(() => {
        console.log('authorized')
        getTrips(email)
          .then(ret => res(ret))
          .catch(err => console.error(err))
      }).catch(() => {
        console.log('not authorized')
      })
  })
}

export function booking(token) {
  console.log('in get trip booking');
  return new Promise((res, rej) => {
    let { email, password } = jwt_decode(token)
    let user = { email, password }
    isAuthenticated(user)
      .then(() => {
        console.log('authorized')
        getBookings(email)
          .then(ret => res(ret))
          .catch(err => console.error(err))
      }).catch(() => {
        console.log('not authorized')
      })
  })
}
