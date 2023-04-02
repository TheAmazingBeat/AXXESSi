import React from 'react'
import styles from './Bubble.module.css'
import { Grid } from '@mui/material'

export default function AIBubble({ diseases }) {
  const [boxSize, setBoxSize] = useState(100)
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div
            className={styles.userBubble}
            style={{
              width: boxSize,
              height: boxSize,
            }}
          >
            {diseases.map((disease, i) => {
              ;<p key={i}>{disease}</p>
            })}
          </div>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </>
  )
}
