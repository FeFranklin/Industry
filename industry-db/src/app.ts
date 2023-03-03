import * as dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import routes from './routes/index'
import ApiError from './utils/ApiError'
import httpStatus from 'http-status'

dotenv.config()
const app = express()

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
  res.send('Healthy')
})

app.use(process.env.APP_PREFIX_PATH, routes)

app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

export default app