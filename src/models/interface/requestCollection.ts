import { Document } from 'mongoose'

export interface ICollectionRequestDoc extends Document {
  requestCollectionId?: string
  user?: string
}


export interface ICollectionRequestBody {
  requestCollectionId: string
  user: string
}

export interface Iinfo {
  name: string
  isUser:boolean
}