import express from 'express'
import { connectToDb } from './helpers/db/'
import cors ,{ CorsOptions } from 'cors'
import { json } from 'body-parser'
const app = express()
const port = 8080

connectToDb()

const corsOption: CorsOptions = {
  origin:'http://localhost:4200/',
  optionsSuccessStatus:200
}

app.use(json())

app.use('/user', cors(corsOption), require('./routes/user'))

app.use('/collection', cors(corsOption), require('./routes/collection'))

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server is running on http://localhost:${port}`)
});