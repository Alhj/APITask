import { Router } from 'express'
import { Request, Response } from 'express'
import { Document } from 'mongoose'
import TaskCollection from '../../helpers/scheman/collection'
import { IRoutes, IRouteCollection } from '../../models/interface/routes'
import { ICollection, ICollectionDoc } from '../../models/interface/collection'

const side: Router = Router()


side.route('/')
  .get((req: Request, res: Response) => {
    const obj: IRoutes = {
      statusCode: 200,
      message: ''
    }

    res.status(200).send(obj)
  })
  .post(async (req: Request, res: Response) => {
    const createProjet: ICollection = req.body

    const obj: IRoutes = {
      statusCode: 201,
      message: 'collection has been added'
    }

    const newCollection = new TaskCollection({
      project: createProjet.project,
      taskCollection: []
    })

    await newCollection.save()

    res.status(201).send(obj)
  })

side.route('/:id')
  .get(async (req: Request, res: Response) => {
    const id: string = req.params.id

    try {
      const taskCollection: Document = await TaskCollection.findById(id);

      const obj: IRouteCollection = {
        statusCode: 200,
        message: `found a collection with id ${id}`,
        taskCollection: taskCollection
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

module.exports = side