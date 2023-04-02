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
  },
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: '7d',
  })
  return token
}

const User = mongoose.model('users', userSchema)

function validate(data) {
  const schema = Joi.object({
    email: Joi.string().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    age: Joi.string().label('Age'),
    sex: Joi.string().label('Sex'),
    patient_Data: Joi.string().label('Patient Data'),
  })
  return schema.validate(data)
}

export { User, validate }
