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

    return tokenDecrypt.data === process.env.DATA

  } catch (e) {
    return false
  }
}

export const genereateLinkKey: (collectionId: string) => string = (collectionId: string) => {
  const secret: string = process.env.SECREAT

  return sign({ data: collectionId }, secret, { expiresIn: '24h' })
}

export const validateLinkKey: (key: string, id:string) => boolean = (key: string, id:string) => {
  const keyDecrypt: any = verify(key, process.env.SECREAT)

  return keyDecrypt.data === id

}