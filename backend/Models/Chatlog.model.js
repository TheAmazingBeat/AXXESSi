import mongoose from 'mongoose'

const chatlogSchema = ({
    username: {
        type: String,
        required: true
    },
    chatlog: {
        type: [], 
        required: true
    }
})

const Chatlog = mongoose.model('chatlog', chatlogSchema)

export { Chatlog }