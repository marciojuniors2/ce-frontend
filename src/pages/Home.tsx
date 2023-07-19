import React from 'react'
import LoginForm from '../components/Login'
import RegisterForm from '../components/Register'
import { Box } from '@mui/material'
import NavBar from '../components/NavBar'

function Home() {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          width: '100%',
          alignItems: 'center',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: {
            xs: 5,
          },
        }}
      >
        <LoginForm />
        <RegisterForm />
      </Box>
    </>
  )
}

export default Home
