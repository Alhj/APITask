import { Router } from 'express'
import { Request, Response } from 'express'
import { config } from 'dotenv'

import User from '../../helpers/scheman/user'
import { comparePassword } from '../../helpers/validation/comparePass'
import { generateKey } from '../../helpers/generate'
import validateAuth from '../../helpers/validation/validateAuth'

import { IAuthSigin } from '../../models/interface/auth'
import { IUser } from '../../models/interface/user'
import { IRoutes, IRotueAuth } from '../../models/interface/routes'

config()

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
      const user: IUser = await User.findOne({ email: authCredentials.email })

      const passwordCheck: boolean = await comparePassword(authCredentials.password, user.password)

      if (passwordCheck) {

        const token = generateKey()

        res.header('authorization', 'Bearer ' + token)

        const obj: IRotueAuth = {
          statusCode: 202,
          message: 'token can be found in header',
          user: user.name,
          authState: true
        }

        res.status(202).send(obj)

      } else {
        throw new Error();
      }
    } catch (e) {

      const obj: IRotueAuth = {
        statusCode: 400,
        message: "email or password don't match",
        user: 'none',
        authState: false
      }
      res.status(400).send(obj)
    }
  })


module.exports = side;