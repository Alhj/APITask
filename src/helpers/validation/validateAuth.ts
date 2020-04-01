import { validateEmail, validatePassword } from './checkUser'
import { IAuthSigin } from '../../models/interface/auth'

const validateAuth: (authCredentails: IAuthSigin) => Boolean = (authCredentails: IAuthSigin) => {
  const epostValidation: Boolean = validateEmail(authCredentails.email)
  const passwordValidation: Boolean = validatePassword(authCredentails.password)


  return epostValidation && passwordValidation ? true : false
}

export default validateAuth