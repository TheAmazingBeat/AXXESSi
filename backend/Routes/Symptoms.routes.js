import express from 'express'
import axios from 'axios'
import { Chatlog } from '../Models/Chatlog.model.js'
import puppeteer from 'puppeteer'

const router = express.Router()

router.post('/', async (req, res)=>{
  try {

const {prompt, username} = req.body
const templatePrompt = `Given these symptoms: ${prompt}. List the top 4 health issues one could have.`

const response = await axios.post('https://api.openai.com/v1/completions', {
  "model": "text-davinci-003",
    "prompt": templatePrompt,
    "max_tokens": 100,
    "temperature": 0.0
}, {
  headers: {'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`}
})

const chatResponse = response.data.choices[0].text

let diagnosis_list = chatResponse.split('\n')
diagnosis_list = diagnosis_list.slice(2)
for(let i = 0; i < diagnosis_list.length; i++){
    let diagnosis = diagnosis_list[i]
    if(diagnosis.indexOf('the flu') > 0){
        diagnosis = "flu"
        diagnosis_list[0] = diagnosis
    }
    if(diagnosis.indexOf('(') > 0){
        diagnosis_list[i] = diagnosis.substring(diagnosis.indexOf('(')+1,diagnosis.indexOf(')')).toLowerCase().replace(/\s/g, '');
    }
    else{
        diagnosis_list[i] = diagnosis.substring(diagnosis.indexOf(' ')+1, diagnosis.length).toLowerCase().replace(/\s/g, '');
    }
}

console.log(diagnosis_list)
// scrape(diagnosis_list)

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
      moreInfo: await scrape(diagnosis_list),
      addedToChat: addChat.chatlog
    })
  } catch (error) {
    console.log('From Symptoms Route :: ', error.message)
    res.send(error.message)
  }
})

async function scrape(diagnosis_list){
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()
    let textArray = []

    for(let i = 0; i < diagnosis_list.length; i++){     
        try {
            const disease = diagnosis_list[i]
            const url = `https://medlineplus.gov/${disease}.html`
        
            await page.goto(url)
            let element = await page.waitForXPath('//*[@id="topic-summary"]/p[1]')
            let text = await page.evaluate(element => element.textContent, element)
            textArray.push(text)
        } catch (error) {
            console.log(error.message)
        }
    }
    browser.close()
    return textArray
}

export {router as SymptomsRouter}