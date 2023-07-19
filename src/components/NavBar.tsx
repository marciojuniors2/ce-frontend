import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import { IconButton, Box, MenuItem, Menu } from '@mui/material'

import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

import AccountCircle from '@mui/icons-material/AccountCircle'
import Happy from '@mui/icons-material/EmojiEmotions'

export default function NavBar() {
  const { isAuthenticated, logout }: any = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = true
  const navigate = useNavigate()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const close = () => {
    logout()
    navigate('/')
  }

  const [text, setText] = useState('')

  useEffect(() => {
    const helloText = 'Entre ou cadastre-se para acessar todos os recursos'
    let index = 0

    const animateText = () => {
      setText(helloText.substring(0, index + 1))
      index++
      if (index === helloText.length) {
        index = 0
      }
    }

    const timer = setInterval(animateText, 150)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <AppBar
      position="fixed"
      sx={{
        height: '62px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#4263EB',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          ml: 10,
          fontFamily: 'arial',
          fontSize: '10px',
          gap: 2,
        }}
      >
        {!isAuthenticated && (
          <Box>
            <h1 dangerouslySetInnerHTML={{ __html: text }}></h1>
          </Box>
        )}
      </Box>
      {open && (
        <div style={{ position: 'relative', right: 40 }}>
          <IconButton size="large" onClick={handleMenu} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isAuthenticated && <MenuItem onClick={close}>Logout</MenuItem>}
            {!isAuthenticated && (
              <MenuItem onClick={() => navigate('/authenticate')}>
                Entre ou Cadastra-se
              </MenuItem>
            )}
          </Menu>
        </div>
      )}
    </AppBar>
  )
}
