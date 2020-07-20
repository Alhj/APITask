import { model, Schema } from 'mongoose'
import { genSalt, hash, compare } from 'bcrypt'
import { IUser } from '../../models/interface/user'

const userSchema: Schema = new Schema({
  name: { type: String, required: true, unique:true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre<IUser>('save', async function (next: Function) {
  const salt = await genSalt(10)
  const hashPassword = await hash(this.password, salt)
  this.password = hashPassword;
  next()
})

export default model('user', userSchema);