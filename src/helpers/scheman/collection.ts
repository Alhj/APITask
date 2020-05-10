import { model, Schema } from 'mongoose'
import { ITask } from '../../models/interface/task'

const collectionScheman: Schema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  taskCollection: {
    type: Array
  },
  users: {
    type: Array
  }
})

export default model('taskCollection', collectionScheman)