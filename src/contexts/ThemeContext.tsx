import React, { createContext, useState, ReactNode, useEffect } from 'react'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness3Icon from '@mui/icons-material/Brightness3'

interface ThemeContextProps {
  children: ReactNode
}

interface ThemeContextValue {
  theme: string
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
)

export const ThemeProvider = ({ children }: ThemeContextProps) => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const themeContextValue: ThemeContextValue = {
    theme,
    toggleTheme,
  }

  const renderThemeIcon = () => {
    if (theme === 'light') {
      return <Brightness7Icon />
    } else {
      return <Brightness3Icon />
    }
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
      <div
        style={{ position: 'fixed', top: 10, left: '10px', zIndex: 10 }}
        onClick={toggleTheme}
      >
        {renderThemeIcon()}
      </div>
    </ThemeContext.Provider>
  )
}
