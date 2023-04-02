import React from 'react'
import './Button.css'

const Button = (props) => {
  return (
    <div className='Button-comp'>
      <button className='main-btn'>{props.label}</button>
    </div>
  )
}

export default Button
