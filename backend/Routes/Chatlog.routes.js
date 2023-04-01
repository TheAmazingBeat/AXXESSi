import express from 'express';
import {Chatlog} from '../Models/Chatlog.model.js'

const router = express.Router()

//creating a new chatlog for a user
router.post('/:username', async (req, res, next) => {
    try {         
        const result = await new Chatlog({username: req.params.username, chatlog: []})
        
        res.send(result.save())
        
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/:username', async (req, res, next) => {
  try{
    const username = req.params.username
    const response = await Chatlog.findOne({username: username})
    res.send(response)

  }catch(error)
  {
    console.log(error.message)
  }
})

router.patch('/:username', async (req, res, next) =>{
    try {
        const options = {new: true}
        const result = await Chatlog.updateOne(
        {username: req.params.username}, 
        {
            chatlog: []
        },
        {
            options
        })

        res.send(result.chatlog)
    } catch (error) {
        res.send(error.send)
    }
    
    
})

// 0
router.delete('/:username', async (req, res, next) => {
  try {
    const response = await Chatlog.deleteOne({username: req.params.username})
    console.log(response)
  } catch (error) {
    console.log('Deleting a chatlog :: ',error.message)
  }
})

export { router as  ChatlogRouter }