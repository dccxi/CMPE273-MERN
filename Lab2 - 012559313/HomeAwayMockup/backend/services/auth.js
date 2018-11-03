import { findUser } from './db'

export default function isAuthenticated(user) {
  return new Promise((res, rej) => {
    console.log(user);
    findUser(user)
      .then((token) => {
        res()
      }).catch((err) => {
        rej()
      })
  })
}
