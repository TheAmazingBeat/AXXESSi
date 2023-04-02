import express from 'express'
import createHttpError from 'http-errors'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import db from './db.js'

import { UserRoute } from './Routes/User.routes.js'
import { SymptomsRouter } from './Routes/Symptoms.routes.js'
import { ChatlogRouter } from './Routes/Chatlog.routes.js'

const app = express()
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(cors())

db()

app.get('/', (req, res) => {
    res.send('Hello World')
  })

app.use('/users', UserRoute)
app.use('/symptoms', SymptomsRouter)
app.use('/chatlog', ChatlogRouter)

// 404 handler and pass to error handler
app.use((req, res, next) => {
    next(createHttpError(404, 'Not found'))
  })
  
  // Error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    })
  })

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })