import { Document } from 'mongoose'


export interface IGetRequestLinkCredidsels {
  name: string
  collectionId: string
}

export interface IRequestLink {
  name: string
  requestLinkId: string
  collectionId:string
}

export interface IReqLink {
  linkId: string
  collectionId: string
}

export interface IReqLinkDoc extends Document {
  linkId?: string
  collectionId?: string
}