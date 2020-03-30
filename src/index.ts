import express from 'express'
import { connectToDb } from './helpers/db/'
import { CorsOptions } from 'cors'
const app = express()
const port = 8080


connectToDb()


const corsOption: CorsOptions = {
  origin:'http://localhost/',
  optionsSuccessStatus:200
}

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server is running on http://localhost:${port}`)
});