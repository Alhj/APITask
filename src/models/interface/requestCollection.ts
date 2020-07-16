import { Document } from 'mongoose'

export interface ICollectionRequestDoc extends Document {
  requestCollection?: string
  user?: string
}


export interface ICollectionRequestBody {
  requestCollection: string
  user: string
}