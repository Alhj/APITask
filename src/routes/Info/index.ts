import { Router } from 'express'
import { Request, Response } from 'express'

import { getCollectionName, getCollectionUsers } from '../../helpers/dbhelp'
import { checkKey } from '../../helpers/generate'

import { IRoutes, IRoutueInfoCollection, IRouteCollectionUsers } from '../../models/interface/routes'

const side: Router = Router()

side.route('/collection/:id')
  .get(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {
      const collectionName: string = await getCollectionName(req.params.id)

      if (collectionName.length >= 1) {
        const obj: IRoutueInfoCollection = {
          statusCode: 200,
          message: 'found the collection',
          collectionName: collectionName
        }

        res.status(200).send(obj)
      } else {
        const obj: IRoutes = {
          statusCode: 204,
          message: 'no collection found with that id'
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

side.route('/collectio/users/:id')
  .get(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)
    if (checkKey(token)) {
      const collectionUsers: string[] = await getCollectionUsers(req.params.id)
      if (collectionUsers.length >= 1) {
        const obj: IRouteCollectionUsers = {
          statusCode: 200,
          message: '',
          users: collectionUsers
        }

        res.status(200).send(obj)
      } else {
        const obj: IRoutes = {
          statusCode: 204,
          message: 'no collection found with that id'
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


module.exports = side