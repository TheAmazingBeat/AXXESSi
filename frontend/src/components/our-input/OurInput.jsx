import React from 'react'
import { TextField } from '@mui/material'

export default function OurInput({ placeholder }) {
  return (
    <TextField
      variant='standard'
      label={placeholder}
      className='our-input'
    ></TextField>
  )
}
