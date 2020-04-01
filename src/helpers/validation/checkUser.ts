import { IUser } from '../../models/interface/user'

const validateUser: (user: IUser) => Boolean = (user: IUser) => {

  const checkEmail: Boolean = validateEmail(user.email)

  const checkUsername: Boolean = validateUsername(user.name)

  const checkPassword: Boolean = validatePassword(user.password)

  return checkEmail && checkUsername && checkPassword ? true : false
}

export const validateEmail: (email: String) => Boolean = (email: String) => {
  return email.includes('@')
}

const validateUsername: (username: String) => Boolean = (username: String) => {
  return username.length >= 3
}

export const validatePassword: (password: String) => Boolean = (password: String) => {
  return password.length >= 6;
}

export default validateUser