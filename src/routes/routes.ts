import { Router, Request, Response } from 'express'
import { fakeProducts } from '../controllers/testController'
import { isAuth, apiAuth } from '../middleware/auth'
import passport from 'passport'
import randomController from '../controllers/randomController'
const router = Router()

// VISTAS WEB
router.get('/signin', (req: Request, res: Response) => {
  res.render('signin.pug')
})
router.get('/signup', (req: Request, res: Response) => {
  res.render('signup.pug')
})

router.get('/', isAuth, (req:Request, res:Response) => {
  // @ts-ignore
  res.render('products.pug', { username: req.session.passport.user.email })
})

router.get('/test', (req:Request, res:Response) => {
  res.render('test.pug')
})

router.get('/logout', (req:Request, res:Response) => {
  res.render('logout.pug', { username: req.query.username })
})

// API
router.get('/api/productos-test', isAuth, (req:Request, res:Response) => {
  const result = fakeProducts()
  res.json(result)
})

router.post('/api/signin', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signInError',
  passReqToCallback: true,
  failureMessage: true
}))

router.post('/api/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signUpError',
  passReqToCallback: true,
  failureMessage: true
}))

router.post('/api/logout', isAuth, (req, res, next) => {
  // @ts-ignore
  const username = req.session.passport.user.email
  // @ts-ignore
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect('/logout?username=' + username)
  })
})

router.get('/signUpError', (req, res) => {
  // @ts-ignore
  console.log(req.session)
  // @ts-ignore
  res.render('failSignup.pug', { msg: req.session.messages[req.session.messages.length - 1] })
})

router.get('/signInError', (req, res) => {
  // @ts-ignore
  console.log(req.session)
  // @ts-ignore
  res.render('failSignin.pug', { msg: req.session.messages[req.session.messages.length - 1] })
})

router.get('/randoms', randomController.randoms)

router.get('/info', (req: Request, res: Response) => {
  res.send({
    args: process.argv.slice(2).join(' - '),
    OSName: process.platform,
    nodeVersion: process.version,
    usageOfMemory: process.memoryUsage(),
    execPath: process.execPath,
    PID: process.pid,
    folder: process.cwd()
  })
})

export default router
