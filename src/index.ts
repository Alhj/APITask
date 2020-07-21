import express from 'express'
import { Express } from 'express'
import { Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import { json } from 'body-parser'

import { connectToDb } from './helpers/db/'
import { obj404 } from './models/staticRespons/statusCodeObj'

const app: Express = express()
const port = process.env.PORT || 8080

connectToDb()

const corsOption: CorsOptions = {
  exposedHeaders: ['authorization'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOption))

app.use(json())

app.use('/user', require('./routes/signUp'))

app.use('/collection', require('./routes/collection'))

app.use('/signIn', require('./routes/signIn'))

app.use('/validation', require('./routes/validation'))

app.use((req: Request, res: Response) => { res.status(404).send(obj404) })

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server is running on http://localhost:${port}`)
});