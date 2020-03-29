import { connect, connection, ConnectionOptions } from 'mongoose'
const dotenv = require('dotenv')

const connectToDb = () => {
  dotenv.config()

  const connectPath: string = process.env.DBCONFIG

  const connectOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  connection.on('connected', () => {
    // tslint:disable-next-line:no-console
    console.log('connectet to Db')
  })
  connection.on('error', () => {
    // tslint:disable-next-line:no-console
    console.log('error')
  })

  return connect(connectPath, connectOptions)
}

export {
  connectToDb
}