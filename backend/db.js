import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

export default () => {
  mongoose.set('strictQuery', false)
  
  mongoose
    .connect('mongodb+srv://cluster0.uyvkp1g.mongodb.net/?retryWrites=true&w=majority', {
      dbName: 'axxesshackathon',
      user: process.env.DB_USER,
      pass: process.env.DB_PASS
    }
    ) 
  .catch((err) => console.log(err.message))
  
  // Mongoose Events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to db...')
    })
    mongoose.connection.on('error', (err) => {
      console.log(err.message)
    })
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection is disconnected...')
    })
    // Detects Ctrl+C (server is stopped)
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log(
          'Mongoose connection is disconnected due to app termination...'
        )
        process.exit(0)
      })
    })

}
