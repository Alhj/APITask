import { Router } from 'express'
import { Request, Response } from 'express'
import { Document } from 'mongoose'
import User from '../../helpers/scheman/user'

import validateAuth from '../../helpers/validation/validateAuth'
import { IAuthSigin } from '../../models/interface/auth'
import { IRoutes } from '../../models/interface/routes'
import { IUser } from '../../models/interface/user'

const side: Router = Router()


side.route('/')
  .post(async (req: Request, res: Response) => {
    const authCredentials: IAuthSigin = req.body

    const checkInput: Boolean = validateAuth(authCredentials)

    if (!checkInput) {

      const obj: IRoutes = {
        statusCode: 400,
        message: 'no valid data in body'
      }

      res.status(400).send(obj)
    }

    try {
      const user:any = await User.findOne({ email: authCredentials.email })

      const passwordCheck = user.comparPassword(authCredentials.password)
      

    } catch (e) {
      res.status(400).send('hello')
    }
  })