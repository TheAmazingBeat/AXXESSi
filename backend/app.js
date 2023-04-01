import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8080

app.listen(8080, () => {
  console.log(`Server is listening on port 3000!`)
})
