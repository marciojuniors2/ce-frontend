import React, { ReactNode } from 'react'
import { Box } from '@mui/material'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router'

function BaseLayout() {
  return (
    <Box>
      <NavBar />

      <Box>
        <Outlet />
      </Box>
    </Box>
  )
}

export default BaseLayout
