import { model, Schema } from 'mongoose'


const taskScheman:Schema = new Schema({
  collection:{
    type: String,
    required: true
  },
  task:{
    type: String,
    required: true,
  },
  priority:{
    type:String,
    required:true
  },
  done:{
    type:Boolean,
    required:true,
  },
  description: {
    type:String
  }
})

export default model('task', taskScheman)