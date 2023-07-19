import React, { ReactNode, createContext, useEffect, useState } from 'react'
interface AuthContextProps {
  children: ReactNode
}

export const AuthContext = createContext({})

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const authentic = token !== null

    if (authentic) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (userId: string, token: string) => {
    localStorage.setItem('userId', userId)
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
