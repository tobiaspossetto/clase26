import passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from '../../db/models/user'

import { validPassword } from '../../utils/validPassword'
passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)

  // @ts-ignore
  done(null, { id: user._id, email: user.email })
})

passport.use('local-signup', new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const userExists = await User.find({ email })

  if (userExists) {
    return done(null, false)
  } else {
    const newUser = new User()
    // @ts-ignore
    newUser.email = email
    // @ts-ignore
    newUser.password = newUser.encryptPassword(password)

    await newUser.save()

    done(null, newUser)
  }
}))

passport.use('local-signin', new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true

}, async (req, email, password, done) => {
  try {
    console.log('BUSCANDO...')

    const user = await User.findOne({ email })

    if (!user) {
      // @ts-ignore
      return done(null, false)
    }
    // @ts-ignore
    if (!validPassword(password, user.password)) {
      console.log('contra incorrecta')
      return done(null, false)
    }

    return done(null, user)
  } catch (error) {
    console.log(error)
  }
}))
