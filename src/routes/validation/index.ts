import { Router } from 'express'
import { Request, Response } from 'express'

import { checkKey } from '../../helpers/generate/ApiKey'
import { validateUser } from '../../helpers/dbhelp/index'

import { IRoutes, IRotueUserV } from '../../models/interface/routes'

const side: Router = Router()


side.route('/:name')
  .get(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)
    if (checkKey(token)) {

      const name: string = req.params.name

      console.log(name)

      const userExixt:boolean = await validateUser(name)      

      const obj: IRotueUserV = {
        statusCode:200,
        message:'user validation',
        validUser: userExixt
      }

      res.status(200).send(obj)

    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: ''
      }
      res.status(403).send(obj)
    }
  })

  module.exports = side