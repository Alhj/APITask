import { sign } from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export const generateKey: () => string = () => {
  const data = process.env.DATA
  const secret = process.env.SECREAT

  const token = sign({ data: data }, secret)

  return token
}

export const checkKey = () => {

}