import Home from '../pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import { useLogin } from '../context/LoginProvider'
import ProtectedRoute from '../Security/ProtectedRoute'
import Prevent from '../Security/PreventRoutes'

const Navigation = (): JSX.Element => {
  const { isLoggedIn } = useLogin()

  return (
    <Routes>
      {/* Use Prevent to redirect logged-in users from these routes */}
      <Route element={<Prevent isLoggedin={isLoggedIn} />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedin={isLoggedIn}>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default Navigation
