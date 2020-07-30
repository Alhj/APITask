import { Router } from 'express'
import { Request, Response } from 'express'

import { checkKey } from '../../helpers/generate/ApiKey'
import RequestCollection from '../../helpers/scheman/collectionRequest'

import { IRoutes, IRotueRequest } from '../../models/interface/routes'
import { ICollectionRequestDoc } from '../../models/interface/requestCollection'

const side: Router = Router()

side.route('/')
  .get(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {
      const name: string = req.query.name
      const isCollection: boolean = req.query.isCollection === 'true'

      if (!isCollection) {
        const userRequest: ICollectionRequestDoc[] = await RequestCollection.find({ user: name })

        const obj: IRotueRequest = {
          statusCode: 200,
          message: 'users request',
          requestCollection: userRequest
        }

        res.status(200).send(obj)
      } else { 
        
        const collectionRequest: ICollectionRequestDoc[] = await RequestCollection.find({requestCollectionId:name})

        const obj: IRotueRequest = {
          statusCode: 200,
          message: 'collection request',
          requestCollection: collectionRequest
        }
        res.status(200).send(obj) 
      }

    } else {
      const obj: IRoutes = {
        statusCode: 403,
        message: 'not a valid token in the header on no token in the header'
      }

      res.status(403).send(obj)
    }
  })

  module.exports = side