import { Router } from 'express'
import { Request, Response } from 'express'
import { Document } from 'mongoose'

import { checkKey } from '../../helpers/generate/ApiKey'
import { validateInfo } from '../../helpers/validation/validatRequestLink'
import { validateRequestLink, addUserToCollection } from '../../helpers/dbhelp/'
import { genereateLinkKey } from '../../helpers/generate/ApiKey'

import RequestCollection from '../../helpers/scheman/collectionRequest'
import RequestLink from '../../helpers/scheman/requestLink'

import { IRoutes, IRotueRequest, IRouteRequestLink } from '../../models/interface/routes'
import { ICollectionRequestDoc } from '../../models/interface/requestCollection'
import { IGetRequestLinkCredidsels, IRequestLink } from '../../models/interface/requestLink'

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


side.route('/requestLink')
  .get(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {
      const credidsels: IGetRequestLinkCredidsels = {
        name: req.query.name,
        collectionId: req.query.collectionId
      }

      const userFind:boolean = await validateRequestLink(credidsels)

      if (userFind) {

        const key: string = genereateLinkKey()

        const doc: Document = new RequestLink({
          linkId: key,
          collectionId: credidsels.collectionId
        })

        doc.save()

        const obj: IRouteRequestLink = {
          statusCode: 200,
          message: 'a request link key have been created',
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
  .post(async (req: Request, res: Response) => {
    const token: string = req.header('authorization').substring(7)

    if (checkKey(token)) {
      const requestLinkInfo: IRequestLink = {
        name: req.query.name,
        requestLinkId: req.query.id
      }
      if (validateInfo(requestLinkInfo.requestLinkId)) {

        const userAdd: boolean = await addUserToCollection(requestLinkInfo)

        if (userAdd) {
          const obj: IRoutes = {
            statusCode: 202,
            message: 'user have been added to collection'
          }

          res.status(202).send(obj)
        } else {
          const obj: IRoutes = {
            statusCode: 409,
            message: 'user alrady in collection'
          }
        }

      } else {
        const obj: IRoutes = {
          statusCode: 403,
          message: 'not a valid key for link'
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