import { model, Schema } from 'mongoose'


const requestLink: Schema = new Schema({
  linkId: {
    type: String,
    required: true
  },
  collectionName: {
    type: String,
    required: true
  }
})

export default model('requestLink', requestLink)