import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
}

export interface IUserDb {
  name: string
  email: string
  password: string
}