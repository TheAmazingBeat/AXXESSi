import React from 'react'
import { useState } from 'react'
import styles from './Bubble.module.css'
import { Grid, Button, Modal, Box, Typography } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function AIBubble({ diseases, infos }) {
  const [boxSize, setBoxSize] = useState(100)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Grid container spacing={2} className='bubble-row'>
        <Grid item xs={6}>
          <div
            className={styles.AIBubble}
            style={{
              width: boxSize,
              height: boxSize,
            }}
          >
            {diseases.map((disease, i) => {
              return <p key={i}>{disease}</p>
            })}

            <Button variant='contained' onClick={handleOpen}>
              Learn More
            </Button>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                More Info
              </Typography>
              {infos.map((info, i) => {
                ;<Typography
                  key={i}
                  id='modal-modal-description'
                  sx={{ mt: 2 }}
                >
                  {info}
                </Typography>
              })}
            </Box>
          </Modal>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </>
  )
}
