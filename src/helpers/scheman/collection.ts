import { model, Schema } from 'mongoose'
import { ITask } from '../../models/interface/task'

const collectionScheman: Schema = new Schema({
  project: {
    type: String,
    required: true,
  },
  taskCollection: {
    type: []
  }
})

export default model('taskCollection', collectionScheman)