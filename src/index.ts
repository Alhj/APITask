import express from 'express'
import { connectToDb } from './helpers/db/'

const app = express()
const port = 8080


connectToDb()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server is running on http://localhost:${port}`)
});