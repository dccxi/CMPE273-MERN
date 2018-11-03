import { findPropertyImage } from './db'
import isAuthenticated from './auth'
import jwt_decode from 'jwt-decode'

export function get(payload) {
  console.log('in get image')
  let { token, id } = payload
  return new Promise((res, rej) => {
    let { email, password } = jwt_decode(token)
    let user = { email, password }
    isAuthenticated(user)
      .then(() => {
        console.log('authorized')
        console.log('retrieving image for', id);
        findPropertyImage(id)
          .then(ret => res(ret))
          .catch(err => console.error(err))
      }).catch(() => {
        console.log('not authorized')
      })
  })
}
