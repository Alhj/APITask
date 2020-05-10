import { Router } from 'express'
import { Request, Response } from 'express'
import { Document } from 'mongoose'


import Collection from '../../helpers/scheman/collection'
import { checkKey } from '../../helpers/generate/ApiKey'
import TaskCollection from '../../helpers/scheman/collection'

import { IRoutes, IRouteCollection } from '../../models/interface/routes'
import { ICollection, ICollectionDoc } from '../../models/interface/collection'


const side: Router = Router()


side.route('/')
  .get(async (req: Request, res: Response) => {

    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {

      let collections: ICollection[] = []

      const userName: string = req.body.name;

      const findCollection: any = await Collection.find();

      findCollection.forEach((collection: ICollection) => {
        let userFound: boolean

        collection.users.forEach((user: string) => {
          if (user === userName) {
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

      const name: string = req.body.name

      const projectName:String = req.body.projectName

      const newCollection: Document = new TaskCollection({
        project: projectName,
        taskCollection: [],
        users: [name]
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

    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: 'not a valid token in the header on no token in the header'
      }

      res.status(403).send(obj);
    }
  })

module.exports = side