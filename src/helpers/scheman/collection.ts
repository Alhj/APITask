import { model, Schema } from 'mongoose'
import { ITask } from '../../models/interface/task'

const collectionScheman: Schema = new Schema({
  project: {
    type: String,
    required: true,
  },
  collection: {
    type: []
  }
})

export default model('collection', collectionScheman)