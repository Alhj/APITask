import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  comparPassword: Function
}

export interface IUserDb {
  name: string
  email: string
  password: string
}