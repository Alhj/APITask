import { sign, verify } from 'jsonwebtoken'
import { config } from 'dotenv'
import { IRequestLink } from '../../models/interface/requestLink'

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

export const validateLinkKey: (credidsels:IRequestLink) => boolean = (credidsels:IRequestLink) => {
  const keyDecrypt: any = verify(credidsels.requestLinkId, process.env.SECREAT)

  return keyDecrypt.data === credidsels.collectionId

}