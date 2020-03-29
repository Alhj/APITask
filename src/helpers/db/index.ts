import { connect, connection, ConnectionOptions } from 'mongoose'
import { config } from 'dotenv'

const connectToDb = () => {
  config()
  
  const connectPath: any = process.env.DBCONFIG

  // tslint:disable-next-line:no-console
  console.log(connectPath)

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