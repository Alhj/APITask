import { Document } from 'mongoose'

export interface ITasks {
  id: string
  name: string
  taskCollection: ITaskCollection[]
}

export interface ITaskCollection {
  name: string
  task: ITask[]
}

export interface ITask {
  id: string
  name: string
  description: string
}