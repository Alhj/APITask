import { model, Schema } from 'mongoose'


const CollectionRequest: Schema = new Schema({
  requestCollectionId: {
    type:String
  },
  user:{
    type:String
  }
})


export default model('collectionRequst', CollectionRequest)