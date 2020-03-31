import { Router } from 'express'
import { Request, Response } from 'express'
import { Document } from 'mongoose'
import taskCollection from '../../helpers/scheman/collection'
import { IRoutes } from '../../models/interface/routes'
import { ICollection } from '../../models/interface/collection'

const side = Router()


side.route('/')
  .get((req: Request, res: Response) => {
    const obj: IRoutes = {
      statusCode: 200,
      message: ''
    }

    res.status(200).send(obj)
  })

side.route('/:id')
  .get(async (req: Request, res: Response) => {
    const id: string = req.params.id

    try {
      const idCollection: Document = await taskCollection.findById(id);

      const obj: IRoutes = {
        statusCode: 200,
        message: id
      }

      res.status(200).send(obj)
    } catch (e) {
      const obj: IRoutes = {
        statusCode: 400,
        message: 'no collection find with that id'
      }

      res.status(400).send(obj)
    }
  })
  .post(async (req: Request, res: Response) => {
    const createProjet
  })

module.exports = side