import { IUser } from '../../models/interface/user'

export const validateUser: (user: IUser) => Boolean = (user: IUser) => {
  
  const checkEpost:Boolean = validateEpost(user.email)
  
  const checkUsername:Boolean = validateUsername(user.name)
  
  const checkPassword:Boolean = validatePassword(user.password)

  return checkEpost && checkUsername && checkPassword ? true: false
}

const validateEpost: (epost:string) => Boolean = (epost:string) => {
  return epost.includes('@')
}

const validateUsername:(username:string) => Boolean = (username:string) => {
  return username.length >= 3
}

const validatePassword: (password: string) => Boolean = (password: string) => {
  return password.length >= 6;
}