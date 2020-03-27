import { connect, connection } from 'mongoose'
import { config } from 'dotenv'
config()

const connectToDb = () => {
  const connectPath = process.env.DBCONFIG
  return connect(connectPath)
}