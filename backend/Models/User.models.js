import mongoose, {Schema} from 'mongoose'
import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
      },
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
        type: String,
        require: true,
      },
      sex: {
        type: String, 
        require: true
      },
      patient_Data: {
        type: String,
        require: true,
      },

})

const User = mongoose.model('users', userSchema)

function validate(data) {
    const schema = Joi.object({
      username: Joi.string().required().label('Username'),
      email: Joi.string().required().label('Email'),
      password: passwordComplexity().required().label('Password'),
      firstName: Joi.string().required().label('First Name'),
      lastName: Joi.string().required().label('Last Name'),
      age: Joi.string().required().label("Age"),
      sex: Joi.string().required().label("Sex"),
      patient_Data: Joi.string().required().label("Patient Data")
    })
    return schema.validate(data)
  }

export { User, validate }