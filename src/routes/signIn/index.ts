import { Router } from 'express'
import { Request, Response } from 'express'
import validateAuth from '../../helpers/validation/validateAuth'
import { IAuthSigin } from '../../models/interface/auth'

const side: Router = Router()


side.route('/')
  .post((req: Request, res: Response) => {
    const authCredentials: IAuthSigin = req.body

  })