import express from 'express'
import createHttpError from 'http-errors'
import { User, validate } from '../Models/User.models.js'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const router = express.Router()

//Get all users - for us only
router.get('/', async(req, res, next) => {
    try {
        const result = User.find({})
        res.send(result)
    } catch (error) {
        res.send(error.message)
    }
})

//create a user
router.post('/', async (req,res, next) => {
    try {
        console.log(validate(req.body))
        const { error } = validate(req.body) // Check if request body is parsed correctly
        if (error)
          return res.status(400).send({ message: error.details[0].message })
    
        // Checks if user already exists
        const user = await User.findOne({ email: req.body.email })
        if (user)
          return res.status(409).send({
            message: 'There is a user that already exists with the same email!',
          })
    
        // Hashing password
        const salt = await bcrypt.genSalt(Number(10))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const result = await new User({
          ...req.body,
          password: hashPassword,
        }).save()
    
        res.send(result)
      } catch (error) {
        console.log(error.message)
        if (error.name === 'ValidationError')
          next(createHttpError(422, error.message))
      }
})

//updating patient data
router.patch('/:username', async (req,res, next) => {
    try {
        const username = req.params.username
        const update = req.body.newPatientData
        const options = {new: true}

        console.log(username)
        console.log(update)
        const result = await User.findOneAndUpdate(
        {
            username: username
        },
        {
            patient_Data: update
        },
        {
            options
        });

        res.send(result)
    } catch (error) {
        res.send(error.message)
    }
})

export {router as UserRoute}