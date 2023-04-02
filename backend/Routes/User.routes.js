import express from 'express'
import createHttpError from 'http-errors'
import { User, validate } from '../Models/User.models.js'
import bcrypt from 'bcrypt'
import Joi from 'joi'

const router = express.Router()

// login user
router.post('/login', async (req, res) => {
  try {
    const { error } = validator(req.body)
    if (error)
      return res.status(400).json({ message: error.details[0].message })

    // Get user by email
    const user = await User.findOne({ email: req.body.email })
    if (!user)
      return res.status(401).json({ message: 'Invalid email or password' })

    // Check password
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!passwordCompare)
      return res.status(401).json({ message: 'Invalid email or password' })

    const token = user.generateAuthToken()
    res.status(200).json({
      data: {
        token: token,
      },
    })
  } catch (error) {
    console.log(error)
    res.send(error.message)
  }
})

//create a user
router.post('/', async (req, res, next) => {
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

    res.status(200).send(result)
  } catch (error) {
    console.log(error.message)
    if (error.name === 'ValidationError')
      next(createHttpError(422, error.message))
  }
})

//updating patient data
router.patch('/:email', async (req, res, next) => {
  try {
    const email = req.params.email
    const update = req.body.newPatientData
    const options = { new: true }

    console.log(email)
    console.log(update)
    const result = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        patient_Data: update,
      },
      {
        options,
      }
    )

    res.send(result)
  } catch (error) {
    res.send(error.message)
  }
})

function validator(data) {
  const schema = Joi.object({
    email: Joi.string().required().label('email'),
    password: Joi.string().required().label('Password'),
  })
  return schema.validate(data)
}

export { router as UserRoute }
