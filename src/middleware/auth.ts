import { Request, Response, NextFunction } from 'express'
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    // @ts-ignore
    // console.log(req.user)
    return next()
  } else {
    res.redirect('/signin')
  }
}

export function apiAuth (req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (req.session.nombre) {
    next()
  } else {
    res.status(401).json({ error: 'no autorizado!' })
  }
}
