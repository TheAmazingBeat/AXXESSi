import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
import axios from 'axios'
import { Chatlog } from '../Models/Chatlog.model.js'

const router = express.Router()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
openai.apiKey = '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'

router.post('/', async (req, res)=>{
  try {

const {prompt, username} = req.body
const templatePrompt = `Given these symptoms: ${prompt}. What are most likely health issues one could have?`

const response = await axios.post('https://api.openai.com/v1/completions', {
  "model": "text-davinci-003",
    "prompt": templatePrompt,
    "max_tokens": 100,
    "temperature": 0.0
}, {
  headers: {'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`}
})

const chatResponse = response.data.choices[0].text

console.log('Response from GPT :: ',chatResponse)

// Adding prompt to database
// Adding chatResponse to database
    let existingChat = await Chatlog.findOne({username: username})
    existingChat.chatlog.push(templatePrompt, chatResponse)
    const addChat = await Chatlog.updateOne({username: username}, {
      chatlog: existingChat.chatlog
    })
    
    res.json({
      message: 'Success',
      response: chatResponse, 
      addedToChat: addChat.chatlog
    })
  } catch (error) {
    console.log('From Symptoms Route :: ', error.message)
    res.send(error.message)
  }
})

export {router as SymptomsRouter}