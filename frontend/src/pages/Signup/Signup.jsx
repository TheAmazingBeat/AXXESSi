import './Signup.css'
import React, { useState } from 'react'
import axios from 'axios'
import Button from '../../components/button/Button'
import Banner from '../../components/banner/Banner'
import { Container, Box, Grid, TextField } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup({ setIsLoggedIn }) {
  const navigate = useNavigate('/chat')
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
    console.log(userData)
    const postUrl = 'http://localhost:8080/users'

    try {
      const response = await axios.post(postUrl, userData)
      if (response.status === 200) {
        // Login after signing up
        const res = await axios.post('http://localhost:8080/users/login', {
          email: email,
          password: password,
        })
        if (res.status === 200) {
          const token = res.data.data.token
          console.log(`The response is`, response.data)
          if (token) {
            setIsLoggedIn(true)
            sessionStorage.setItem('token', token)
            navigate('/chat')
          }
        }
      }
    } catch (error) {
      console.log(`The error is ${error}`)
    }
  }

  return (
    <>
      <Banner />
      <Container maxWidth={'lg'}>
        <h2>Welcome!</h2>
        <p>Sign up for your Axxess account</p>
        <Box className='Signup-form' component='form' onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* FIRST NAME */}
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                variant='standard'
                label='First Name'
                className='login-form-field'
                name='firstName'
                value={userData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* LAST NAME */}
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                variant='standard'
                label='Last Name'
                className='login-form-field'
                name='lastName'
                value={userData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* EMAIL */}
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                type='email'
                variant='standard'
                label='Email'
                className='login-form-field'
                name='email'
                value={userData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* PASSWORD */}
            <Grid item xs={12}>
              {/* TODO :: Hide/Show Password */}
              <TextField
                fullWidth={true}
                type='password'
                variant='standard'
                label='Password'
                className='login-form-field'
                name='password'
                value={userData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button label='Sign Up' type='submit' />
            </Grid>
            <Grid item xs={12}>
              <Link to='/login'>
                <p>Have an account? Log in.</p>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* <form className='Signup-form' onSubmit={handleSubmit}>
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
        <button type='submit'>Sign Up</button>
      </form> */}
    </>
  )
}
