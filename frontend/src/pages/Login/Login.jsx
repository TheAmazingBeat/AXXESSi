import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'
import Banner from '../../components/banner/Banner'
import { Container, Box, TextField, Grid } from '@mui/material'

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  let { email, password } = userData

  const handleChange = (e) => {
    e.preventDefault()
    setProjectData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = {
        email: email,
        password: password,
      }
      const response = await axios.post('/users/login', body)
      if (response.status === 200) {
        console.log(response.data.data.token)
        if (response.data.data.token) sessionStorage.setItem('token', token)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Banner />
      <Container className='login-form' maxWidth={'lg'}>
        <Box
          className='login-form-inner'
          component='form'
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <h1 className='login-title'>Welcome!</h1>
              <h2 className='login-subtitle'>
                Sign in to your Axxess account.
              </h2>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    variant='standard'
                    label='Email'
                    type='email'
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant='standard'
                    label='Password'
                    type='password'
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <button type='submit' className='login-btn'>
                    Log In
                  </button>
                  <p className='login-sign-link'>Need an account? Sign Up.</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* <div className='login-form'>
        <form className='login-form-inner'>
          <div className='login-form-group'>
            {/* <input
              required
              type='email'
              className='login-form-field'
              name='email'
              id='email'
              value={email}
              onChange={handleChange}
              placeholder='Email'
            /> */}
      {/* </div> */}
      {/* <div className='login-form-group'> */}
      {/* <input
              required
              type='password'
              className='login-form-field'
              name='password'
              id='password'
              value={password}
              onChange={handleChange}
              placeholder='Password'
            /> */}
      {/* </div>
        </form> */}
      {/* </div> */}
    </>
  )
}

export default Login
