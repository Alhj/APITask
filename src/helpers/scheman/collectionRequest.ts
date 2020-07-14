import { model, Schema } from 'mongoose'


const CollectionRequest: Schema = new Schema({
  requestCollection: {
    type:String
  },
  user:{
    type:String
  }
})


export default model('collectionRequst', CollectionRequest)