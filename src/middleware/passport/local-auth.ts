import passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from '../../db/models/user'

import { validPassword } from '../../utils/validPassword'

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (id, done) => {
  const user: any = await User.findById(id)

  done(null, { _id: user._id, email: user.email })
})

//* SINGUP
passport.use(
  'local-signup',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const userExists = await User.find({ email })
        console.log(userExists)
        if (userExists.length > 0) {
          return done(null, false, { message: 'Email already exists' })
        } else {
          const newUser = new User()

          newUser.email = email

          newUser.password = newUser.encryptPassword(password)

          await newUser.save()
          // TODO: VER POR QUE ME DA ERROR AL USER IUser
          const userFromDatabase: any = await User.findOne({ email })

          done(null, {
            _id: userFromDatabase._id,
            email: userFromDatabase.email
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
  )
)

// * SIGNIN
passport.use(
  'local-signin',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email })
        console.log(user)
        if (user === null) {
          return done(null, false, { message: 'User not found' })
        } else if (!validPassword(password, user.password)) {
          return done(null, false, { message: 'Wrong password' })
        } else {
          return done(null, { _id: user._id, email: user.email })
        }
      } catch (error) {
        console.log(error)
      }
    }
  )
)
