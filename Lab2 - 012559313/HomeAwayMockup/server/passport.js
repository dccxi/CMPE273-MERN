import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from './config'
import { findUser } from './db'

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: config.secret
}, (jwt_payload, done) => {
  let user = (({ email, password }) => ({ email, password }))(jwt_payload)
  findUser(user)
    .then((token) => {
      delete user.password
      done(null, user)
    }).catch((err) => done(false, false))
}))

export let requireAuth = passport.authenticate('jwt', { session: false })
