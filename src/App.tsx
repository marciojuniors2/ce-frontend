import React from 'react'
import MyRoutes from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { CarsListContextProvider } from './contexts/CarListContext'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <CarsListContextProvider>
      <AuthProvider>
        <Toaster position="bottom-left" />
        <MyRoutes />
      </AuthProvider>
    </CarsListContextProvider>
  )
}

export default App
