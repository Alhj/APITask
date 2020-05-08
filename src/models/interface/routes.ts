import { IUserDb } from './user'
import { ICollection, ICollectionDoc } from './collection'

export interface IRoutes {
  statusCode: number
  message: string
}

export interface IRouteCollection extends IRoutes { 
  taskCollection:any
}

export interface IRotueDbUser extends IRoutes {
  user: IUserDb
}