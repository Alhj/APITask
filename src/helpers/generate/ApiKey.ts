import { sign, verify } from 'jsonwebtoken'
import { config } from 'dotenv'

import { IToken } from '../../models/interface/auth'

config()

export const generateKey: () => string = () => {
  const data = process.env.DATA
  const secret = process.env.SECREAT

  const token = sign({ data: data }, secret)

  return token
}

export const checkKey: (token: string) => boolean = (token: string) => {
  const tokenDecrypt = verify(token, process.env.SECREAT)

  console.log(tokenDecrypt)

  return false
}