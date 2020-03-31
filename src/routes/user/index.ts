import { Router } from 'express'
import User from '../../helpers/scheman/user'
import { IRoutes, IRotueDbUser } from '../../models/interface/routes'

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
  .post((req, res) => {
    // tslint:disable-next-line:no-console
    console.log(req.body)

    const obj: IRoutes = {
      statusCode: 201,
      message: 'user created'
    }

    res.status(201).send(obj);
  })

module.exports = router