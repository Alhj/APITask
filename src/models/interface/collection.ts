import { Document } from 'mongoose'

export interface ICollectionDoc extends Document {
  project:string
  taskCollection: []
}

export interface ICollection {
  project:string
  taskCollection: []
}