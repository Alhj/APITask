import { model, Schema } from 'mongoose'
import { ITask } from '../../models/interface/task'

const collectionScheman: Schema = new Schema({
  project: String,
  taskCollection: {
    type: [String]
  },
  users: {
    type: [String]
  }
})

export default model('taskCollection', collectionScheman)