import React, { useContext, ReactElement, ComponentType } from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  RouteProps,
  Routes,
  useNavigate,
} from 'react-router-dom'
import { AuthContext } from '../src/contexts/AuthContext'
import Cars from './pages/Cars'
import Home from './pages/Home'
import BaseLayout from './layout/BaseLayout'

interface ProtectedRouteProps extends RouteProps {
  element: ReactElement | null
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  ...rest
}) => {
  const { isAuthenticated }: any = useContext(AuthContext)
  const navigate = useNavigate()

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace={true} />
  )
}

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Cars />} /> */}
        {/* <Route path="/authenticate" element={<Home />} /> */}
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Cars />} />
          <Route path="/authenticate" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default MyRoutes
