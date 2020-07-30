import { model, Schema } from 'mongoose'


const CollectionRequest: Schema = new Schema({
  requestCollectionId: {
    type:String,
    require:true
  },
  user:{
    type:String,
    require: true
  },
  collectionName: {
    type:String
  }
})


export default model('collectionRequst', CollectionRequest)