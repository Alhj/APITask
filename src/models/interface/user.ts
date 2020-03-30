import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
}

export interface User {
  name: string
  email: string
  password: string
}