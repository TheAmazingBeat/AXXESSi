import mongoose, { Schema } from 'mongoose'
import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  sex: {
    type: String,
  },
  patient_Data: {
    type: String,
    require: true,
  },
})

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign(
    { email: email, firstName: firstName, lastName: lastName },
    process.env.JWT_PRIVATE_KEY,
    {
      algorithm: 'RS256',
      expiresIn: '7d',
    }
  )
  return token
}

const User = mongoose.model('users', userSchema)

function validate(data) {
  const schema = Joi.object({
    username: Joi.string().required().label('Username'),
    email: Joi.string().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    age: Joi.string().required().label('Age'),
    sex: Joi.string().required().label('Sex'),
    patient_Data: Joi.string().required().label('Patient Data'),
  })
  return schema.validate(data)
}

export { User, validate }
