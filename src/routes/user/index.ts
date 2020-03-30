import { Router } from 'express'
import { IRotueDbUser } from '../../models/interface/routes'

const router = Router()

router.route('/')
  .get((req, res) => {
    const obj: IRotueDbUser = {
      statusCode: 200,
      message: 'add user do database',
      user: {
        name: 'account name',
        email: 'email addres',
        password: 'password for account'
      }
    }
    res.status(200).send(obj)
  })

export default router