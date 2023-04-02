import React, { useState } from 'react'
import Banner from '../../components/banner/Banner'
import './Chat.css'
import SendIcon from '@mui/icons-material/Send'
import heart from '../../images/axxessHeart.png'

export default function Chat() {
  const [symptoms, setSymptoms] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setSymptoms(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage(`My symptoms are: ${symptoms}`)
    setSymptoms('')
  }

  return (
    <div className='chat-outer'>
      <div className='float'></div>
      <Banner />
      <div className='chat-inner'>
        <div className='symptom-bar'>
          <input
            required
            type='text'
            className='symptom-field'
            name='symptoms'
            id='symptoms'
            value={symptoms}
            onChange={handleChange}
            placeholder='&nbsp;Enter your symptoms....'
          />

          <SendIcon onClick={handleSubmit} className='send-icon' />
        </div>
        {message && (
          <div className='chat-message'>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}
