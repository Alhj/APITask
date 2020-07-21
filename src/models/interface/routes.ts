import { IUserDb } from './user'
import { ICollection, ICollectionDoc } from './collection'

export interface IRoutes {
  statusCode: number
  message: string
}

export interface IRouteCollection extends IRoutes {
  taskCollection: any
}

export interface IRotueAuth extends IRoutes {
  user: string
  authState: boolean
}

export interface IRotueDbUser extends IRoutes {
  user: IUserDb
}

export interface IRotueUpdate extends IRoutes {
  updated: boolean
}

export interface IRotueUserV extends IRoutes {
  validUser: boolean
}