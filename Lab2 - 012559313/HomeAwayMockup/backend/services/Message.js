import { postMessage, getMessage, replyMessage } from './db'
import isAuthenticated from './auth'
import jwt_decode from 'jwt-decode'

export function post(payload) {
  console.log('in post message');
  let { token, msg } = payload
  return new Promise((res, rej) => {
    let { email, password } = jwt_decode(token)
    let user = { email, password }
    isAuthenticated(user)
      .then(() => {
        console.log('authorized')
        postMessage(email, msg)
          .then(ret => res(ret))
          .catch(err => console.error('post message failed', err))
      }).catch(() => {
        console.log('not authorized')
      })
  })
}
export function get(token) {
  console.log('in get message');
  return new Promise((res, rej) => {
    let { email, password } = jwt_decode(token)
    let user = { email, password }
    isAuthenticated(user)
      .then(() => {
        console.log('authorized')
        getMessage(email)
          .then(ret => res(ret))
          .catch(err => console.error('get message failed', err))
      }).catch(() => {
        console.log('not authorized')
      })
  })
}
export function reply(payload) {
  console.log('in reply message');
  let { token, msg } = payload
  return new Promise((res, rej) => {
    let { email, password } = jwt_decode(token)
    let user = { email, password }
    isAuthenticated(user)
      .then(() => {
        console.log('authorized')
        replyMessage(msg)
          .then(ret => res(ret))
          .catch(err => console.error('post message failed', err))
      }).catch(() => {
        console.log('not authorized')
      })
  })
}
