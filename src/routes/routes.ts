import { Router, Request, Response } from 'express'
import { fakeProducts } from '../controllers/testController'
import { isAuth, apiAuth } from '../middleware/auth'
import passport from 'passport'
const router = Router()

// VISTAS WEB
router.get('/signin', (req: Request, res: Response) => {
  // @ts-ignore
  res.render('signin.pug')
})
router.get('/signup', (req: Request, res: Response) => {
  // @ts-ignore
  res.render('signup.pug')
})

router.get('/', isAuth, (req:Request, res:Response) => {
  res.render('products.pug')
})

router.get('/test', (req:Request, res:Response) => {
  res.render('test.pug')
})

// API
router.get('/api/productos-test', isAuth, (req:Request, res:Response) => {
  const result = fakeProducts()
  res.json(result)
})

router.post('/api/signin', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/errorAuth',
  passReqToCallback: true
}))

router.post('/api/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/errorAuth',
  passReqToCallback: true
}))

router.get('/api/logout', isAuth, (req, res, next) => {
  // @ts-ignore
  req.logout(function (err) {
    if (err) { return next(err) }
    res.render('/logout.pug')
  })
})

router.get('/errorAuth', (req, res) => {
  res.send('error auth')
})

export default router
