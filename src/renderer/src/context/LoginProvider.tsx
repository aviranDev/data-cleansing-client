import React, { useState, useEffect, createContext, Fragment, ReactNode, useContext } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../utils/localStorage'
import {
  signin,
  Auth,
  SigninResponse,
  DecodedToken,
  profile,
  refreshtoken,
  logoutService
} from '../services/user'

const removeCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export interface LoginContextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (data: Auth) => Promise<SigninResponse | any>
  isLoggedIn: boolean
  user: DecodedToken | null // Include user in context
  logout: () => void // Include logout in context
}

interface LoginProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<LoginContextProps | undefined>(undefined)

const AuthProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [user, setUser] = useState<DecodedToken | null>(() => getLocalStorage('user', null))
  const [credentials, setCredentials] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!user)

  const refreshThreshold = 120 // 2 minutes (120 seconds) before expiration

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      if (!user) return // Don't fetch if user is not defined

      try {
        const response = await profile()
        setCredentials(response.data)
      } catch (error) {
        console.error('Error fetching profile:', error)
        // You can also set an error state here to inform the user
      }
    }

    fetchProfile()
  }, [user])

  /*   useEffect((): (() => void) => {
    if (!user) return () => {} // Return a no-op function if user is not defined

    const interval = setInterval(
      async () => {
        const accessToken = getLocalStorage('accessToken', null)
        if (accessToken) {
          const decodedToken = jwtDecode<DecodedToken>(accessToken)
          const currentTime = Date.now() / 1000

          if (decodedToken.exp - currentTime < refreshThreshold) {
            console.log('currentTime: ', currentTime)
            console.log('decodedToken.exp: ', decodedToken.exp)

            try {
              const newAcessToken = await refreshtoken()
              if (typeof newAcessToken === 'string') {
                setLocalStorage('accessToken', newAcessToken)
                const newUser = jwtDecode<DecodedToken>(newAcessToken)
                setLocalStorage('user', newUser)
                setUser(newUser)
              }
            } catch (error) {
              logout()
            }
          }
        }
      },
      10 * 60 * 1000
    )

    // Return the cleanup function
    return (): void => clearInterval(interval)
  }, [user]) */

  const login = async (data: Auth): Promise<SigninResponse> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await signin(data)
      setLocalStorage('accessToken', response.data.accessToken)
      const decodedUser = jwtDecode<DecodedToken>(response.data.accessToken)
      setTimeout(() => {
        setIsLoggedIn(true)
      }, 3000)
      setLocalStorage('user', decodedUser)
      setUser(decodedUser)

      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    await logoutService()
    removeCookie('jwt')
    removeLocalStorage('accessToken')
    removeLocalStorage('user')
    setUser(null)
    setIsLoggedIn(false)
    setCredentials({})
  }

  console.log('isLoggedIn: ', isLoggedIn)
  console.log('user: ', user)
  console.log('credentials: ', credentials)

  return (
    <AuthContext.Provider value={{ login, isLoggedIn, logout, user }}>
      <Fragment>{children}</Fragment>
    </AuthContext.Provider>
  )
}

export const useLogin = (): LoginContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider')
  }
  return context
}

export default AuthProvider
