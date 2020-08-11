import { Router } from 'express'
import { Request, Response } from 'express'

import { checkKey } from '../../helpers/generate/ApiKey'
import { validateInfo } from '../../helpers/validation/validatRequestLink'
import { validateRequestLink } from '../../helpers/dbhelp/'
import { genereateLinkKey } from '../../helpers/generate/ApiKey'

import RequestCollection from '../../helpers/scheman/collectionRequest'
import RequestLink from '../../helpers/scheman/requestLink'

import { IRoutes, IRotueRequest, IRouteRequestLink } from '../../models/interface/routes'
import { ICollectionRequestDoc } from '../../models/interface/requestCollection'
import { IGetRequestLinkCredidsels } from '../../models/interface/requestLink'
import user from '../../helpers/scheman/user'

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

        const collectionRequest: ICollectionRequestDoc[] = await RequestCollection.find({ requestCollectionId: name })

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


side.route('/genereateLink')
  .get(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {
      const credidsels: IGetRequestLinkCredidsels = {
        name: req.query.name,
        collectionId: req.query.collectionId
      }

      const userFind = await validateRequestLink(credidsels)

      if (userFind) {

        const key: string = genereateLinkKey()

        const obj: IRouteRequestLink = {
          statusCode: 200,
          message: '',
          key: key
        }
        res.status(200).send(obj)
      } else {
        const obj: IRoutes = {
          statusCode: 403,
          message: 'not a user in collection'
        }

        res.status(403).send(obj)
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