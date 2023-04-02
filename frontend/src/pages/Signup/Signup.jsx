import './Signup.css'
import React, { useState } from 'react'
import axios from 'axios'
import Banner from '../../components/banner/Banner'
import { TextField } from '@mui/material'
import OurInput from '../../components/our-input/OurInput'

export default function Signup() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  let { firstName, lastName, email, password } = userData

  function handleChange(event) {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const postUrl = 'http://localhost:8080/users'

    try {
      const response = await axios.post(postUrl, userData)
      console.log(`The response is ${response.data}`)
    } catch (error) {
      console.log(`The error is ${error}`)
    }
  }

  return (
    <div>
      <Banner />
      <h2>Welcome!</h2>
      <p>Sign up for your Axxess account</p>
      <form className='Signup-form' onSubmit={handleSubmit}>
        <TextField
          variant='standard'
          label='First name'
          className='login-form-field'
          name='firstName'
          value={userData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          placeholder='First name'
          className='login-form-field'
          name='firstName'
          value={userData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          placeholder='Last name'
          className='login-form-field'
          name='lastName'
          value={userData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          placeholder='Email'
          className='login-form-field'
          name='email'
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          placeholder='Password'
          className='login-form-field'
          name='password'
          value={userData.password}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Confirm Password'
          className='login-form-field'
          name='confirmPassword'
          value={userData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}
