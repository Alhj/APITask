import { Document } from 'mongoose'

export interface ICollectionDoc extends Document {
  project?:string
  taskCollection?: []
  users?: string[]
}

export interface ICollection {
  project:string
  taskCollection: []
  users: string[]
}