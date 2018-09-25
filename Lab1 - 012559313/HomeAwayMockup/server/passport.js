import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from './config'
import { findUser } from './db'

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: config.secret,
}, (jwt_payload, done) => {
  let user = (({ username, password }) => ({ username, password }))(jwt_payload)
  findUser(user, () => done(false, false), (token) => {
    delete user.password
    done(null, user)
  })
}))

export let requireAuth = passport.authenticate('jwt', { session: false })
