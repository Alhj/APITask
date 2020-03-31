import { Router } from 'express'
import { Document } from 'mongoose'
import User from '../../helpers/scheman/user'
import validateUser from '../../helpers/validation/checkUser'
import { IRoutes, IRotueDbUser } from '../../models/interface/routes'
import { IUser } from '../../models/interface/user'

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
  .post(async (req, res) => {

    const user: IUser = req.body

    if (validateUser(user)) {
      const obj: IRoutes = {
        statusCode: 201,
        message: 'user created'
      }

      const newUser: Document = new User({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      
      await newUser.save()

      res.status(201).send(obj);
    } else {

      const obj: IRoutes = {
        statusCode: 400,
        message: 'validation of user not right'
      }

      res.status(400).send(obj);

    }
  })

module.exports = router