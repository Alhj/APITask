import { sign } from 'jsonwebtoken'
import { config } from 'dotenv'

config()


export const createToken: (data: string) => string = (data: string) => {
  const secret: string = process.env.SECREAT

  return sign({ data: data }, secret)
}

export const createTokenSecreate: (secret: string) => string = (secret: string) => {
  const data: string = process.env.DATA

  return sign({ data: data }, secret)
} 