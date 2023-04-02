import React, { useState } from 'react'
import styles from './Bubble.module.css'
import { Grid } from '@mui/material'

export default function UserBubble({ prompts }) {
  const [boxSize, setBoxSize] = useState(100)
  return (
    <>
      <Grid container spacing={2} className='bubble-row'>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <div
            className={styles.userBubble}
            style={{
              width: boxSize,
              height: boxSize,
            }}
          >
            {prompts.map((prompt, i) => {
              return <p key={i}>{prompt}</p>
            })}
          </div>
        </Grid>
      </Grid>
    </>
  )
}
