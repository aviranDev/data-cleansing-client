import React, { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  children?: ReactNode // Add children prop
  isLoggedin: boolean
}

const Prevent: React.FC<ProtectedRouteProps> = ({ isLoggedin }) => {
  const location = useLocation()

  console.log('Prevent Rendered, isLoggedin:', isLoggedin) // Debugging log

  return isLoggedin ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />
}

export default Prevent
