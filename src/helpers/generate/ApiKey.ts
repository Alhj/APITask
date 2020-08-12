import { sign, verify } from 'jsonwebtoken'
import { config } from 'dotenv'

import { IToken } from '../../models/interface/auth'

config()

export const generateKey: () => string = () => {
  const data: string = process.env.DATA
  const secret: string = process.env.SECREAT

  const token: string = sign({ data: data }, secret)

  return token
}

export const checkKey: (token: string) => boolean = (token: string) => {
  try {
    const tokenDecrypt: any = verify(token, process.env.SECREAT)

    const matchData = tokenDecrypt.data === process.env.DATA

    if (matchData) {
      return true
    } else {
      return false
    }

  } catch (e) {
    return false
  }
}

export const genereateLinkKey: () => string = () => {
  const request: string = process.env.REQUEST
  const secret: string = process.env.SECREAT

  return sign({ data: request }, secret, {expiresIn: '24h'})
}