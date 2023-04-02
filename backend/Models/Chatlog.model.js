import mongoose from 'mongoose'

const chatlogSchema = {
  email: {
    type: String,
    required: true,
  },
  chatlog: {
    type: [],
    required: true,
  },
}

const Chatlog = mongoose.model('chatlog', chatlogSchema)

export { Chatlog }
