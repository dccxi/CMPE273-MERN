import { createProperty, findProperty } from './db'
import isAuthenticated from './auth'
import jwt_decode from 'jwt-decode'

export function post(payload) {
  console.log('in post property');
  let { token, property } = payload
  return new Promise((res, rej) => {
    let { email, password } = jwt_decode(token)
    let user = { email, password }
    isAuthenticated(user)
      .then(() => {
        console.log('authorized')
        createProperty(user.email, property)
          .then(ret => res(ret))
          .catch(err => console.error(err))
      }).catch(() => {
        console.log('not authorized')
      })
  })
}

export function search(payload) {
  console.log('in search property');
  let { token, input } = payload
  return new Promise((res, rej) => {
    let { email, password } = jwt_decode(token)
    let user = { email, password }
    isAuthenticated(user)
      .then(() => {
        console.log('authorized')
        findProperty(input)
          .then(ret => res(ret))
          .catch(() => console.log('no match'))
      }).catch(() => {
        console.log('not authorized')
      })
  })
}
