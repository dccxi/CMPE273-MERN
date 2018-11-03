import { findUser, createUser, getProfile } from './db'
import isAuthenticated from './auth'
import jwt_decode from 'jwt-decode'

export function register(user) {
  return new Promise((res, rej) => {
    console.log('in register');
    if (!user.email || !user.password)
      res({ success: false, error: "missing password or email" })
    else
      createUser(user)
        .then(() => res({ success: true }))
        .catch((error) => {
          res({ success: false, error })
          // rej(error)
        })
  })
}

export function login(user) {
  console.log('in login');
  console.log(user);
  return new Promise((res, rej) => {
    if (!user.email || !user.password)
      res({ success: false, error: "missing password or email" })
    else
      findUser(user)
        .then((token) => res({ success: true, token: `JWT ${token}` }))
        .catch((error) => {
          res({ success: false, error })
          // rej(error)
        })
  })
}

export function profile(token) {
  console.log('in get profile');
  return new Promise((res, rej) => {
    let { email, password } = jwt_decode(token)
    let user = { email, password }
    isAuthenticated(user)
      .then(() => {
        console.log('authorized')
        getProfile(user.email)
          .then(ret => res(ret))
          .catch(err => console.error(err))
      }).catch(() => {
        console.log('not authorized')
      })
  })
}

export function update(payload) {
  console.log('in update profile');
  let { token, userProfile } = payload
  return new Promise((res, rej) => {
    let { email, password } = jwt_decode(token)
    let user = { email, password }
    isAuthenticated(user)
      .then(() => {
        console.log('authorized')
        updateProfile(email, userProfile)
          .then(ret => res(ret))
          .catch(err => console.error(err))
      }).catch(() => {
        console.log('not authorized')
      })
  })
}
