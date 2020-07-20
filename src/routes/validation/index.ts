import { Router } from 'express'
import { Request, Response } from 'express'

import { checkKey } from '../../helpers/generate/ApiKey'


import { IRoutes } from '../../models/interface/routes'

const side: Router = Router()


side.route('/:name')
  .get((req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)
    if (checkKey(token)) {

      const name: string = req.param.name

      

    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: ''
      }
      res.status(403).send(obj)
    }
  })