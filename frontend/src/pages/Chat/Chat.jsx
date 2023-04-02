import React, { useEffect, useState } from 'react'
import Banner from '../../components/banner/Banner'
import './Chat.css'
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send'
import heart from '../../images/axxessHeart.png'
import { Container, Box, Grid } from '@mui/material'
import UserBubble from '../../components/chat-bubble/UserBubble'
import AIBubble from '../../components/chat-bubble/AIBubble'

export default function Chat({ isLoggedIn }) {
  // Get existing chatlog with useEffect
  const [chatLog, setChatLog] = useState([])
  // useEffect(()=>{

  // })

  const [userData, setUserData] = useState({
    prompt: '',
    email: 'test3@test3.com',
  })
  const [message, setMessage] = useState('')
  const [res, setRes] = useState()
  const [sickArr, setSickArr] = useState([])

  let { prompt, email } = userData

  const handleChange = (e) => {
    setUserData({
      prompt: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const postUrl = 'http://localhost:8080/symptoms'

    try {
      const response = await axios.post(postUrl, userData)
      if (response.status === 200) {
        setRes(response.data.response)
        let diagnosis_list = response.data.response.split('\n')
        diagnosis_list = diagnosis_list.slice(2)
        setSickArr(diagnosis_list)
      }
      console.log(`User data here is ${userData}`)
    } catch (error) {
      console.log(`The error is ${error}`)
    }
    setUserData({
      prompt: '',
    })
  }

  return (
    <>
      <Banner />
      <Container className='chat-outer' maxWidth={'sm'}>
        <Box className='backdrop'>
          {/* <div className='icon-container'></div> */}
        </Box>
        <Box className='chat-inner'>
          <Container className='chat-log'>
            {/* {message && (
              <div className='chat-message'>
                <p>{message}</p>
              </div>
            )} */}
            {res ? <UserBubble prompt={'Hello World!'} /> : <></>}
            {sickArr.length == 0 ? <></> : <AIBubble diseases={sickArr} />}
            {/* <UserBubble prompt={'Hello World!'} /> */}
          </Container>
          <Container className='symptom-bar'>
            <input
              required
              type='text'
              className='symptom-field'
              name='prompt'
              id='prompt'
              value={prompt}
              onChange={handleChange}
              placeholder='&nbsp;Enter your symptoms....'
            />

            <SendIcon onClick={handleSubmit} className='send-icon' />
          </Container>
        </Box>
      </Container>
    </>
  )
}
