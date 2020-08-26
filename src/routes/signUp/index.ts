import { Router } from 'express'
import { Request, Response } from 'express'
import { Document } from 'mongoose'

import User from '../../helpers/scheman/user'
import validateUser from '../../helpers/validation/checkUser'
import { IRoutes, IRotueDbUser } from '../../models/interface/routes'
import { IUser } from '../../models/interface/user'

const side = Router()

side.route('/')
  .get((req: Request, res: Response) => {
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
  .post(async (req: Request, res: Response) => {
    const user: IUser = req.body

    if (validateUser(user)) {
      try {
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
        res.status(201).send(obj)
      } catch (e) {
        const obj: IRoutes = {
          statusCode: 400,
          message: 'email addres are already register'
        }
        res.status(400).send(obj)
      }


    } else {

      const obj: IRoutes = {
        statusCode: 400,
        message: 'validation of user not right'
      }

      res.status(400).send(obj);

    }
  })

module.exports = side