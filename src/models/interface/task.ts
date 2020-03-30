import { Document } from 'mongoose'

export interface ITask extends Document {
  id:string
  task:string
  priority:string
  done:boolean
  description:string
}