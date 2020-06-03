import { Document } from 'mongoose'
import { ITaskCollection } from './task'

export interface ICollectionDoc extends Document {
  project?: string
  taskCollection?: ITaskCollection[]
  users?: string[]
}

export interface ICollection {
  project: string
  taskCollection: ITaskCollection[]
  users: string[]
}