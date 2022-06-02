import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import routes from './routes/routes'

import minimist from 'minimist'
import cookieParser from 'cookie-parser'
import './middleware/passport/local-auth'
import passport from 'passport'

// exec('ls -lh', (err, stdout, stderr) => {
//   if (err) {
//     console.log('ERROR')
//     console.error(err)
//     return
//   }
//   if (stderr) {
//     console.log('STDERR')
//     console.error(stderr)
//     return
//   }
//   console.log('STDOUT')
//   console.log(stdout)
// })

const app = express()
const args = minimist(process.argv.slice(2))
export const PORT = args._[0] || process.env.PORT || 8080
dotenv.config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
  // store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
//  store: MongoStore.create({ mongoUrl: `mongodb+srv://tobias:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.ulmpx.mongodb.net/ecommerce?retryWrites=true&w=majority`, ttl: 60 }),
  secret: 'iosadyh23bu',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000
  }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.set('views', './src/views')
app.set('view engine', 'pug')

app.use(routes)

// app.listen(app.get('port'));
// console.log('Server on port ', app.get('port'));

export default app
