
import { fork } from 'child_process'
import { Request, Response } from 'express'
class RandomController {
  randoms (req:Request, res:Response) {
    const cant = req.query.cant || 10000

    const passCant = ['' + cant + '']

    const randoms = fork('randoms.js', passCant)
    randoms.on('message', (response) => {
      res.send(JSON.stringify(response))
    })
  }
}

export default new RandomController()
