import { Router } from 'express'
import { Request, Response } from 'express'
import { Document } from 'mongoose'


import Collection from '../../helpers/scheman/collection'
import { checkKey } from '../../helpers/generate/ApiKey'
import { dealteCollection, dealteTaskCollection } from '../../helpers/dbhelp'
import { updateCollection, dealteTask } from '../../helpers/dbhelp'
import TaskCollection from '../../helpers/scheman/collection'
import UserCollection from '../../helpers/scheman/user'


import { IRoutes, IRouteCollection } from '../../models/interface/routes'
import { IRotueUpdate } from '../../models/interface/routes'
import { ICollectionDoc } from '../../models/interface/collection'
import { IUpdate } from '../../models/interface/respons'


const side: Router = Router()


side.route('/')
  .get(async (req: Request, res: Response) => {

    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {

      let collections: ICollectionDoc[] = []

      const userName: string = req.query.name;

      const findCollection: ICollectionDoc[] = await Collection.find();

      findCollection.forEach((collection: ICollectionDoc) => {
        let userFound: boolean

        collection.users.forEach((user: string) => {
          if (user.toLowerCase() === userName.toLowerCase()) {
            userFound = true
          }
        })

        if (userFound) {
          collections.push(collection)
        }
      });

      const obj: IRouteCollection = {
        statusCode: 200,
        message: '',
        taskCollection: collections
      }

      res.status(200).send(obj)

    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: 'not a valid token in the header on no token in the header'
      }

      res.status(403).send(obj);
    }
  })
  .post(async (req: Request, res: Response) => {

    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {

      const userName: string = req.body.name

      const findUser = await UserCollection.findOne({ name: userName })

      if (!findUser) {
        const obj: IRoutes = {
          statusCode: 403,
          message: 'no user found'
        }
        res.status(403).send(obj)
        return;
      }

      const projectName: String = req.body.projectName

      const newCollection: Document = new TaskCollection({
        project: projectName,
        taskCollection: [],
        users: [userName]
      })

      await newCollection.save()

      const obj: IRoutes = {
        statusCode: 201,
        message: 'collection has been added'
      }

      res.status(201).send(obj)
    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: 'not a valid token in the header on no token in the header'
      }

      res.status(403).send(obj);
    }
  })

side.route('/:id')
  .get(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {

      const id: string = req.params.id

      try {
        const taskCollection: ICollectionDoc = await TaskCollection.findById(id);

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

    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: 'not a valid token in the header on no token in the header'
      }

      res.status(403).send(obj);
    }
  })
  .post(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {

      const body: IUpdate = req.body

      const update: boolean = await updateCollection(body)

      if (update) {
        const obj: IRotueUpdate = {
          statusCode: 201,
          message: 'collection have been updated',
          updated: true
        }

        res.status(201).send(obj)

      } else {
        const obj: IRotueUpdate = {
          statusCode: 204,
          message: 'somthing when wrong with the update',
          updated: false
        }

        res.status(204).send(obj)
      }
    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: 'not a valid token in the header on no token in the header'
      }

      res.status(403).send(obj);
    }
  })
  .delete(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {
      await dealteCollection(req.params.id);

      res.status(204).send()
    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: 'not a valid token in the header on no token in the header'
      }

      res.status(403).send(obj);
    }
  })

side.route('/tasks/taskCollection/:id')
  .delete(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {

      await dealteTaskCollection(req.params.id, req.query.name);

      res.status(204).send()

    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: 'not a valid token in the header on no token in the header'
      }

      res.status(403).send(obj)
    }
  })

side.route('/tasks/task/:id')
  .put(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {
      const update: boolean = await updateCollection(req.body.tasks)

      if (update) {
        const obj: IRotueUpdate = {
          statusCode: 201,
          message: 'collection have been updated',
          updated: true
        }

        res.status(201).send(obj)
      } else {
        const obj: IRotueUpdate = {
          statusCode: 204,
          message: 'somthing when wrong with the update',
          updated: false
        }

        res.status(204).send(obj)
      }

    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: 'not a valid token in the header on no token in the header'
      }

      res.status(403).send(obj);
    }
  })
  .delete(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {

      await dealteTask(req.params.id, req.query.taskId);

      const obj: IRoutes = {
        statusCode: 204,
        message: 'task dealate'
      }

      res.status(204).send(obj)
    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: 'not a valid token in the header on no token in the header'
      }

      res.status(403).send(obj);
    }
  })

module.exports = side