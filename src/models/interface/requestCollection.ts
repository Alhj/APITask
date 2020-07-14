import { Document } from 'mongoose'

export interface ICollectionRequest extends Document {
  requestCollection?:string
  user?:string
}


export interface ICollectionRequestBody {
  requestCollection:string
  user:string
}