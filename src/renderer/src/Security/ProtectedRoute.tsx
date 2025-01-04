import React, { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  isLoggedin: boolean
  redirectPath?: string // Allows flexibility to redirect to any path
  children?: ReactNode // Add children prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isLoggedin,
  redirectPath = '/login',
  children
}) => {
  if (!isLoggedin) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to={redirectPath} replace />
  }

  // If the user is authenticated, allow access to the route
  return <>{children || <Outlet />}</>
}

export default ProtectedRoute
