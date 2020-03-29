import { Document, Model, model, Types, Schema, Query } from 'mongoose'
import { genSalt, hash, compare } from 'bcrypt'
import { IUser } from '../../models/interface/user'

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre<IUser>('save', async next => {
  const salt = await genSalt(10)
  const hashPassword = await hash(this.password, salt)
  this.password = hashPassword;
  next()
})

userSchema.methods.comparPassword = async (candidatePassword:string) => {
  const comparePassword:boolean = await compare(candidatePassword, this.password);
  return comparePassword
}

export default model('user', userSchema);