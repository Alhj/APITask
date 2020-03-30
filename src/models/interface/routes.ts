import { User } from './user'

export interface IRoutes {
  statusCode:number
  message:string
}

export interface IRotueDbUser extends IRoutes {
  user:User
}